import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Search from './search';
import Contacts from './contacts';
import Header from './header';
import { Contact, ContactRequest } from '../utils/types';
import ContactsApiAccesor from '../utils/conactsAccesor';
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useEffect, useState } from 'react';
import Add from './add';
import Remove from './remove';
import NotificationMessage from './notificationMessage';

function ResponsiveAutoExample() {
    const queryClient = useQueryClient()
    const [curentModal, setCurrentModal] = useState('');
    const [selectedContact, setSelectedContact] = useState<Contact | null>();
    const [unfilteredContacts, setUnfilterdContacts] = useState<Contact[]>([]);

    const [currentFilter, setCurrentFilter] = useState<string>();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationType, setNotificationType] = useState('success')
    const [message, setMessage] = useState('')

    // Queries
    const { data: contacts } = useQuery(['contacts'], ContactsApiAccesor.listContacts)

    // Mutations
    const mutation = useMutation((c: ContactRequest) => {
        let resp;
        if (c.contactId) {
            resp = ContactsApiAccesor.updateContact(c.contactId, c);
            setMessage('Contact Updated');
            return resp
        }
        else {
            resp = ContactsApiAccesor.createContact(c)
            setMessage('Contact Created');
            return resp
        }
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['contacts']);
            setNotificationType('success');
            setShowNotification(true);
        },
        onError: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['contacts'])
            setMessage('Contact Creation Failed');
            setNotificationType('Danger');
            setShowNotification(true);
        },
    })

    // Deletion
    const deletion = useMutation((c: Contact) => {
        return ContactsApiAccesor.deleteContact(c.contactId)
    }, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['contacts'])
            setMessage('Contact Deleted');
            setNotificationType('success');
            setShowNotification(true);
        },
        onError: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['contacts'])
            setMessage('Contact Deletion Failed');
            setNotificationType('danger');
            setShowNotification(true);
        },
    })

    //This function takes care of doing local filter
    // it also takes care of keeping the cache to improve user experience
    const filter = (value: string) => {
        queryClient.setQueryData(["contacts"], (oldData: Contact[] | undefined) => {
            setCurrentFilter(value);
            let matches: Contact[] = [];
            if(value.length !== 0){
                matches = unfilteredContacts ? unfilteredContacts.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1) : [];
            } else {
                matches = JSON.parse(JSON.stringify(unfilteredContacts));
                setUnfilterdContacts([]);
                setCurrentFilter('');
                // queryClient.invalidateQueries(['contacts']);
            }
            return matches;
        });
    }

    // keep a local copy of the contacts for search purposes
    useEffect(()=>{
        if(contacts && (!currentFilter || currentFilter?.length === 0))
            setUnfilterdContacts(JSON.parse(JSON.stringify(contacts)))
    },[contacts, currentFilter])

    return (
        <div className="d-flex justify-content-center">
            <NotificationMessage
                show={showNotification}
                bg={notificationType}
                message={message}
                onClose={setShowNotification}
            />
            <Container className=' border rounded container bg-light'>
                <Row>
                    <Col sm={12}>
                        <Header
                            onCreateContact={() => {
                                setSelectedContact(null)
                                setCurrentModal('A');
                                handleShow();
                            }} />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}><Search filter={filter}></Search></Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Contacts
                            contacts={contacts}
                            onEditClicked={() => {
                                setCurrentModal('A');
                                handleShow();
                            }}
                            onDeleteClicked={() => {
                                setCurrentModal('R');
                                handleShow();
                            }}
                            onContactSelected={function (c: Contact): void {
                                setSelectedContact(c);
                            }} />
                    </Col>
                </Row>
                {curentModal === 'A' && <Add
                    show={show}
                    contact={selectedContact}
                    onCreateContact={(c: ContactRequest) => mutation.mutate(c)}
                    handleClose={handleClose}
                    handleShow={handleShow}
                ></Add>
                }
                {selectedContact && curentModal === 'R' &&
                    <Remove
                        show={show}
                        contact={selectedContact}
                        onDeleteContact={(c: Contact) => {
                            deletion.mutate(c);
                            handleClose();
                        }}
                        handleClose={handleClose}
                    ></Remove>
                }
            </Container>
        </div>
    );
}

export default ResponsiveAutoExample;

