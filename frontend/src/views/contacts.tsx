import ListGroup from 'react-bootstrap/ListGroup';
import { Contact } from '../utils/types';
import ContactDetail from './contactDetail';

export interface ContactsProps {
  contacts: Contact[]
}

function Contacts(props: ContactsProps) {
  const { contacts } = props;
  return (
    <ListGroup as="ul">
      {contacts.map(c =>
        <ListGroup.Item as="li" >
          <ContactDetail contact={c}></ContactDetail>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default Contacts;