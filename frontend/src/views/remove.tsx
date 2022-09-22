import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { Contact } from "../utils/types";

export interface ModalProps {
  handleClose: () => void;
  onDeleteContact: (c: Contact) => void;
  contact: Contact;
  show: boolean;
}

const RemoveModal = (props: ModalProps) => {
  const { handleClose, contact, onDeleteContact, show } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting Contact: "{contact?.name}"</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={(e)=>onDeleteContact(contact)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveModal;