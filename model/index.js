const fs = require('fs/promises')
const path = require("path");
const {v4} = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");
const { NotFound } = require("http-errors");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if (!contact) {
    throw new NotFound();
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
      throw new NotFound();
    }
  const remove = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    
    return {message: "contact deleted"}
}

const addContact = async ({name,email,phone}) => {
  const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

}

const updateContact = async (id, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
      throw new NotFound();
  }
  
  contacts[idx] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
  

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}