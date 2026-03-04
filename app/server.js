const express = require('express');
const contactService = require('./contactService');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Security headers (basic)
app.disable('x-powered-by');

/**
 * Health Check Endpoint
 * Used by Kubernetes/Load Balancer probes
 */
app.get('/health', (req, res) => {
  const serviceStatus = contactService.getStatus();
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'contact-processor',
    metrics: serviceStatus
  });
});

/**
 * Main Entry Point
 */
app.get('/', (req, res) => {
  res.send('Acto pide contacto Service v1.0.0');
});

/**
 * Contact Submission Endpoint
 * Accepts POST requests with { name, email, message }
 */
app.post('/contact', (req, res) => {
  try {
    const result = contactService.processContact(req.body);
    res.status(200).json({
      success: true,
      message: 'Contact received and queued for processing',
      id: result.id
    });
  } catch (error) {
    // Log error for internal tracking (exclude sensitive data in production)
    console.error(`[ERROR] Contact processing failed: ${error.message}`);
    
    // Return client-friendly error
    res.status(400).json({
      error: error.message || 'Invalid request'
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
