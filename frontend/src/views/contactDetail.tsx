import { Button, Col, Row } from 'react-bootstrap';
import { Contact } from '../utils/types';


export interface ContactDetailProps {
    contact: Contact;
    onContactSelected: (c: Contact) => void;
    onEditClicked: (c: Contact) => void;
    onDeleteClicked: (c: Contact) => void;
}
/**
 * This components contains the details for Contact
 *
 * @param {ContactDetailProps} props
 * @returns
 */
function ContactDetail(props: ContactDetailProps) {
    const { contact, onContactSelected, onEditClicked, onDeleteClicked } = props;

    return (
        <div
            onMouseOver={(e) => onContactSelected(contact)}
        >
            <Row>
                <Col sm={2} >
                    <p className="d-flex text-sm-left contact-name">{contact.name}</p>
                </Col>
                <Col sm={10}>
                </Col>
            </Row>
            <Row>
                <Col sm={2}>
                    <p className="d-flex text-sm-left text-secondary contact-phone"><i className="bi bi-telephone-fill" ></i>{contact.phone}</p>
                </Col>
                <Col col={8} />
                <Col sm={2} className='Action-buttons '>
                    <Button className='btn btn-primary ' onClick={() => onEditClicked(contact)}><i className="bi bi-pencil-fill" /></Button>
                    <Button className='btn btn-danger' onClick={() => onDeleteClicked(contact)}><i className="bi bi-trash-fill" /></Button>
                </Col>
            </Row>

        </div>
    )
}

export default ContactDetail;