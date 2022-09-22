import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// Create a client

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import PhoneBook from './views/phonebook';
import ContactsApiAccesor from './utils/conactsAccesor';
const queryClient = new QueryClient()
const ContactsContext = React.createContext(new ContactsApiAccesor());

function App() {
  return (
    <div className="App">
      <ContactsContext.Provider  value={new ContactsApiAccesor()}>
        <QueryClientProvider client={queryClient}>
          <PhoneBook />
        </QueryClientProvider>
      </ContactsContext.Provider>
    </div>
  );
}

export default App;
