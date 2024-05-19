import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteType } from "../../http/DeviceAPI";

export const DeleteType = ({ show, onHide }) => {
  const [value, setValue] = useState();
  const handleDeleteType = () => {
    deleteType(value).then((data) => {
      setValue("");
      onHide();
    });
  };
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter type Id"
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteType} variant="outline-success">
            Delete type
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
