class ContactService {
  constructor() {
    this.contacts = [];
  }

  processContact(contact) {
    if (!contact.name || !contact.email || !contact.message) {
      throw new Error('Invalid contact data');
    }
    
    // Simulate processing
    const processedContact = {
      ...contact,
      id: Date.now(),
      processedAt: new Date().toISOString()
    };
    
    this.contacts.push(processedContact);
    console.log(`Processed contact: ${processedContact.id} from ${processedContact.email}`);
    
    return processedContact;
  }
}

module.exports = new ContactService();
