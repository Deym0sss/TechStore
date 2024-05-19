import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";

import Button from "react-bootstrap/Button";
import { DeleteType } from "../components/modals/DeleteType";
import { DeleteBrand } from "../components/modals/DeleteBrand";
import { DeleteDevice } from "../components/modals/DeleteDevice";
import { CreateDevice } from "../components/modals/CreateDevice";
import { CreateType } from "../components/modals/CreateType";
import { CreateBrand } from "../components/modals/CreateBrand";
const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteBrandVisible, setDeleteBrandVisible] = useState(false);
  const [deleteTypeVisible, setDeleteTypeVisible] = useState(false);
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState(false);

  return (
    <Container className="d-flex flex-column mt-5" style={{ width: 400 }}>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setTypeVisible(true);
        }}
      >
        Add type
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setBrandVisible(true);
        }}
      >
        Add brand
      </Button>
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => {
          setDeviceVisible(true);
        }}
      >
        Add device
      </Button>

      <Button
        variant="danger"
        className="mt-2"
        onClick={() => {
          setDeleteTypeVisible(true);
        }}
      >
        delete type
      </Button>
      <Button
        variant="danger"
        className="mt-2"
        onClick={() => {
          setDeleteBrandVisible(true);
        }}
      >
        delete brand
      </Button>
      <Button
        variant="danger"
        className="mt-2"
        onClick={() => {
          setDeleteDeviceVisible(true);
        }}
      >
        delete device
      </Button>

      <CreateType
        show={typeVisible}
        onHide={() => {
          setTypeVisible(false);
        }}
      />
      <CreateBrand
        show={brandVisible}
        onHide={() => {
          setBrandVisible(false);
        }}
      />
      <CreateDevice
        show={deviceVisible}
        onHide={() => {
          setDeviceVisible(false);
        }}
      />

      <DeleteType
        show={deleteTypeVisible}
        onHide={() => {
          setDeleteTypeVisible(false);
        }}
      />
      <DeleteBrand
        show={deleteBrandVisible}
        onHide={() => {
          setDeleteBrandVisible(false);
        }}
      />
      <DeleteDevice
        show={deleteDeviceVisible}
        onHide={() => {
          setDeleteDeviceVisible(false);
        }}
      />
    </Container>
  );
};
export default Admin;
