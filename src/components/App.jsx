import { useState } from 'react';
import { useLocalStorage } from './shared/hooks/useLocalStorage';
import ContactForm from './modules/ContactForm/ContactForm';
import ContactList from './modules/ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const formSubmitHundler = addedContact => {
    setContacts([addedContact, ...contacts]);
  };

  const findContact = e => {
    setFilter(e.currentTarget.value);
  };

  const renderContacts = () => {
    let filtered = contacts;
    if (filter.toLowerCase()) {
      filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter)
      );
    }
    return filtered;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <ContactForm onSubmit={formSubmitHundler} contacts={contacts} />
      <ContactList
        findContact={findContact}
        contacts={renderContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
};
