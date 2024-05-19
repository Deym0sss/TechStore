import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteBrand } from "../../http/DeviceAPI";

export const DeleteBrand = ({ show, onHide }) => {
  const [value, setValue] = useState();
  const handleDeleteBrand = () => {
    deleteBrand(value).then((data) => {
      setValue("");
      onHide();
    });
  };
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter brand Id"
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteBrand} variant="outline-success">
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
