import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { Context } from "../..";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { fetchTypes, fetchBrands, createDevice } from "../../http/DeviceAPI";
import { observer } from "mobx-react-lite";

export const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  useEffect(() => {
    fetchTypes().then((data) => device.setType(data));
    fetchBrands().then((data) => device.setBrand(data));
  }, []);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("typeId", device.selectedType.id);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("info", JSON.stringify(info));
    createDevice(formData).then((data) => {
      onHide();
    });
  };
  return (
    <>
      <Modal size="lg" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new device
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className="my-2">
              <Dropdown.Toggle>
                {device.selectedType.name || "Select type"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.types.map((type) => (
                  <Dropdown.Item
                    key={type.id}
                    onClick={() => {
                      device.setSelectedType(type);
                    }}
                  >
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="my-2">
              <Dropdown.Toggle>
                {device.selectedBrand.name || "Select brand"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {device.brands.map((brand) => (
                  <Dropdown.Item
                    key={brand.id}
                    onClick={() => {
                      device.setSelectedBrand(brand);
                    }}
                  >
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="my-2"
              placeholder="Enter name of device"
            />
            <Form.Control
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              className="my-2"
              placeholder="Enter price of device"
              type="number"
            />
            <Form.Control className="my-2" type="file" onChange={selectFile} />
            <br />
            <Button
              variant="outline-dark"
              onClick={() => {
                addInfo();
              }}
            >
              Add new specifaction to device info
            </Button>
            {info.map((i) => (
              <Row key={i.number} className="m-2">
                <Col md={4}>
                  <Form.Control
                    placeholder="Title"
                    value={i.title}
                    onChange={(e) => {
                      changeInfo("title", e.target.value, i.number);
                    }}
                  ></Form.Control>
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Description"
                    value={i.description}
                    onChange={(e) => {
                      changeInfo("description", e.target.value, i.number);
                    }}
                  ></Form.Control>
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      removeInfo(i.number);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addDevice} variant="outline-success">
            Add new device
          </Button>
          <Button onClick={onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});
