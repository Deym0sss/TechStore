import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteDevice } from "../../http/DeviceAPI";

export const DeleteDevice = ({ show, onHide }) => {
  const [value, setValue] = useState();
  const handleDeleteDevice = () => {
    deleteDevice(value).then((data) => {
      setValue("");
      onHide();
    });
  };
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter device Id"
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteDevice} variant="outline-success">
            Delete device
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
