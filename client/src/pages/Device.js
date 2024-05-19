import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/DeviceAPI";
import { addToBasket, createBasket, fetchBasket } from "../http/BasketAPI";
import { toJS } from "mobx";
import { jwtDecode } from "jwt-decode";
import { Context } from "..";

const Device = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  const { basket } = useContext(Context);
  const userId = jwtDecode(localStorage.getItem("token")).id;

  const handleAddToBasket = (e) => {
    fetchBasket(userId).then((data) => {
      const usersBasket = toJS(data);

      if (usersBasket.length === 0) {
        createBasket(userId).then((responseData) => {
          basket.setBasketId(toJS(responseData).id);
          addToBasket(basket.basketId, e.target.value).then((data) => {});
        });
      } else {
        addToBasket(basket.basketId, e.target.value).then((data) => {});
      }
    });
  };
  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevice(data);
    });
  }, []);
  return (
    <>
      <Container className="mt-2 d-flex flex-row justify-content-between align-items-centre">
        <Col
          md={3}
          className="d-flex justify-content-center align-items-center "
        >
          <Image
            width={300}
            height={300}
            src={`http://localhost:5001/${device.img}`}
            alt="Nothing"
          />
        </Col>

        <Col
          md={3}
          className="d-flex justify-content-center align-items-center"
        >
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 600,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <Row className="d-flex align-item-center justify-content-center">
              <h2>{device.name}</h2>
            </Row>
            <h3>{device.price + "$"}</h3>
            <Button
              value={device.id}
              variant={"outline-dark"}
              onClick={(e) => {
                handleAddToBasket(e);
              }}
            >
              Add to basket
            </Button>
          </Card>
        </Col>
      </Container>

      <Row className="d-flex flex-column m-5">
        <h1 style={{ fontSize: 50 }}>Device info</h1>
        {device.info.map((info, index) => (
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 && "lightgrey", padding: 10 }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </>
  );
};
export default Device;
