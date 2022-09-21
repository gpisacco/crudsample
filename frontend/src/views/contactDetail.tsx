import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Contact } from '../utils/types';
import Add from './add';
import Remove from './remove';

export interface ContactDetailProps {
    contact: Contact;
  }

function ContactDetail(props: ContactDetailProps) {
    const {contact} = props;
    const [curentModal, setCurrentModal] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Row>
                <Col sm={4}>
                    {contact.name}
                </Col>
                <Col sm={8}>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <><i className="bi bi-telephone-fill"></i>{contact.phone}</>
                </Col>
                <Col>
                </Col>
                <Col className='Action-buttons'>
                    <Button className='btn btn-primary' onClick={()=>{setCurrentModal('A');handleShow();}}><i className="bi bi-pencil-fill" /></Button>
                    <Button className='btn btn-danger' onClick={()=>{setCurrentModal('R');handleShow();}}><i className="bi bi-trash-fill" /></Button>
                </Col>
            </Row>
            {curentModal === 'A' && <Add
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            ></Add>
            }
            {curentModal === 'R' &&
                <Remove
                    show={show}
                    handleClose={handleClose}
                    handleShow={handleShow}
                ></Remove>
            }
        </div>
    )
}

export default ContactDetail;