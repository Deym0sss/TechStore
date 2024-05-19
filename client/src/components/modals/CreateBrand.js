import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createBrand } from "../../http/DeviceAPI";

export const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState();
  const addBrand = () => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new brand
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              placeholder="Enter name of brand"
            ></Form.Control>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addBrand} variant="outline-success">
            Add new brand
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
