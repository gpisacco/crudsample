import ListGroup from 'react-bootstrap/ListGroup';
import { Contact } from '../utils/types';
import ContactDetail from './contactDetail';

export interface ContactsProps {
  contacts: Contact[] | undefined;
  onContactSelected: (c: Contact) => void;
  onEditClicked: (c: Contact) => void;
  onDeleteClicked: (c: Contact) => void;
}

function Contacts(props: ContactsProps) {
  const { contacts, onContactSelected, onEditClicked, onDeleteClicked, } = props;
  return (
    <ListGroup as="ul">
      {contacts && contacts.sort((a, b) => parseInt(b.contactId) - parseInt(a.contactId)).map(c =>
        <ListGroup.Item as="li" key={c.contactId}  className={'list-group-item list-group-item-action'}>
          <ContactDetail
            contact={c}
            onContactSelected={onContactSelected}
            onEditClicked={onEditClicked}
            onDeleteClicked={onDeleteClicked}
          ></ContactDetail>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default Contacts;