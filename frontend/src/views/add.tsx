import React, { useState } from 'react';
import { Modal, Form, Button } from "react-bootstrap";
import { Contact, ContactRequest } from "../utils/types";

export interface ModalProps {
  handleShow?: () => void;
  handleClose: () => void;
  onCreateContact: (c: ContactRequest) => void;
  contact?: Contact | null;
  show: boolean;
}

const AddModal = (props: ModalProps) => {
  const { handleClose, onCreateContact, show, contact } = props;
  const [name, setName] = useState<string>(contact?.name || '');
  const [phone, setPhone] = useState<string>(contact?.phone || '');

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              minLength={3}
              placeholder="Jhon Doe"
              defaultValue={contact?.name}
              autoFocus
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput2"
          >
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="telephone"
              minLength={10}
              placeholder="1112223333"
              defaultValue={contact?.phone}
              autoFocus
              onChange={e => setPhone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={async () => {
          onCreateContact({
            name, phone, contactId: contact?.contactId
          })
          handleClose();
        }}>
          {contact?.contactId ? 'Update' : 'Create'}
        </Button>
      </Modal.Footer>
    </Modal>)
}

export default AddModal;