
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export interface HeaderProps {
    onCreateContact: () => void;
}

const Header = (props: HeaderProps) => {
    const { onCreateContact } = props;

    return (
        <React.Fragment>
            <Row className='title'>
                <Col sm={2}></Col>
                <Col sm={8}><h1><i className="bi bi-person-lines-fill" /> Phone Book App</h1></Col>
                <Col sm={2}></Col>
            </Row>
            <Row className='header'>
                <Col sm={2}><h2 >Contacts</h2></Col>
                <Col sm={8}></Col>
                <Col sm={2}><button type="button" className="btn btn-primary" onClick={onCreateContact}>+ Add Contact</button></Col>
            </Row>

        </React.Fragment>
    );
}

export default Header;