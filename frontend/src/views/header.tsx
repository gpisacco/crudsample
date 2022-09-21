
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Add from './add';

function Header() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Row className='title'>
                <Col sm={2}></Col>
                <Col sm={8}><h1><i className="bi bi-person-lines-fill" /> Phone Book App</h1></Col>
                <Col sm={2}></Col>
            </Row>
            <Row className='header'>
                <Col sm={2}><h2 >Contacts</h2></Col>
                <Col sm={8}></Col>
                <Col sm={2}><button type="button" className="btn btn-primary" onClick={handleShow}>+ Add Contact</button></Col>
            </Row>
            <Add
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            ></Add>
        </>
    );
}

export default Header;