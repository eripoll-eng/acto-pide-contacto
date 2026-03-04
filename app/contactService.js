/**
 * Service for handling contact form submissions.
 * Simulates integration with a CRM or database.
 */
class ContactService {
  constructor() {
    // In-memory storage for demo purposes
    // In production, this would be a MongoDB or PostgreSQL connection
    this.contacts = [];
    this.processedCount = 0;
  }

  /**
   * Processes a new contact request.
   * @param {Object} contact - The contact data { name, email, message }
   * @returns {Object} The processed contact record
   * @throws {Error} If validation fails
   */
  processContact(contact) {
    this._validateContact(contact);
    
    // Simulate enrichment processing
    const processedContact = {
      ...contact,
      id: Date.now().toString(),
      status: 'queued',
      receivedAt: new Date().toISOString(),
      metadata: {
        source: 'web-form',
        version: 'v1'
      }
    };
    
    // Simulate database insertion
    this.contacts.push(processedContact);
    this.processedCount++;

    // structured logging for observability
    console.log(`[CONTACT_SERVICE] Processed request ID: ${processedContact.id} | Email: ${processedContact.email} | Time: ${processedContact.receivedAt}`);
    
    return processedContact;
  }

  /**
   * Validates the contact object.
   * @private
   */
  _validateContact(contact) {
    if (!contact) {
      throw new Error('No contact data provided');
    }
    if (!contact.name || typeof contact.name !== 'string' || contact.name.trim().length < 2) {
      throw new Error('Invalid or missing name');
    }
    if (!contact.email || !this._isValidEmail(contact.email)) {
      throw new Error('Invalid email format');
    }
    if (!contact.message || contact.message.trim().length < 10) {
      throw new Error('Message is too short (min 10 chars)');
    }
  }

  _isValidEmail(email) {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  getStatus() {
    return {
      uptime: process.uptime(),
      processed: this.processedCount,
      queueSize: this.contacts.length // Mock queue size
    };
  }
}

module.exports = new ContactService();
