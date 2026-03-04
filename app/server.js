const express = require('express');
const contactService = require('./contactService');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Acto pide contacto Service');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/contact', (req, res) => {
  try {
    const result = contactService.processContact(req.body);
    res.status(200).json({ success: true, message: 'Contact received', id: result.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app;
