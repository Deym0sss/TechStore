import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import {
  fetchBasket,
  fetchBasketDevices,
  removeBasket,
  removeFromBasket,
} from "../http/BasketAPI";
import { jwtDecode } from "jwt-decode";
import { toJS } from "mobx";
import { fetchManyDevices } from "../http/DeviceAPI";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import { fetchManyBrands } from "../http/BrandAPI";
import Button from "react-bootstrap/Button";

export const Basket = observer(() => {
  const { basket, brand } = useContext(Context);
  const navigate = useNavigate();

  const setInitialBasketDevices = () => {
    const token = jwtDecode(localStorage.getItem("token"));
    const { id: userId } = token;
    fetchBasket(userId).then((data) => {
      if (data[0]?.id === undefined) {
        return null;
      } else {
        basket.setBasketId(data[0].id);
        fetchBasketDevices(data[0].id).then((responseData) => {
          basket.setBasketDevices(responseData);
          const arrayOfDevices = toJS(basket.basketDevices)
            .map((device) => device.deviceId)
            .join(",");
          fetchManyDevices(arrayOfDevices).then((data) => {
            basket.setBasketDevicesData(data);
          });
          const arrayOfBrandsId = toJS(basket.basketDevicesData)
            .map((device) => {
              return device.brandId;
            })
            .join(",");

          fetchManyBrands(arrayOfBrandsId).then((data) => {
            brand.setBrandsData(data);
          });
        });
      }
    });
    const isEmpty = toJS(basket.basketDevices);
    if (Array.isArray(isEmpty) && isEmpty.length === 0) {
      navigate("/shop");
    }
  };

  const listenerForInitialBasketDevices = () => {
    setInitialBasketDevices();
  };

  useEffect(() => {
    setInitialBasketDevices();
  }, []);

  const deleteFromBasket = (e) => {
    removeFromBasket(toJS(basket.basketId), e.target.value).then((data) => {
      fetchBasketDevices(basket.basketId).then((data) => {
        basket.setBasketDevices(data);
      });
    });
    listenerForInitialBasketDevices();
  };

  const handleDeleteBasket = () => {
    const token = jwtDecode(localStorage.getItem("token"));
    const { id: userId } = token;
    removeBasket(toJS(basket.basketId), userId).then(navigate("/shop"));
  };

  return (
    <>
      <Container className="mt-2 d-flex flex-column justify-content-between align-items-centre">
        {toJS(basket.basketDevicesData).map((device) => (
          <Col key={device.id} md={3} className="m-2">
            <Card
              className="m-1  d-flex flex-row p-3 "
              style={{
                width: "380%",
                cursor: "pointer",
                border: "2px solid black",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Image
                  className="m-2"
                  width={100}
                  height={100}
                  src={`http://localhost:5001/${device.img}`}
                  alt="Nothing"
                  onClick={() => {
                    navigate(`/device/${device.id}`);
                  }}
                />
                <div style={{ paddingLeft: 30 }}>
                  {toJS(brand.brandsData)
                    .filter((item) => item.id === device.brandId)
                    .map((filteredItem) => filteredItem.name)}{" "}
                  {device.name}
                </div>
                <div style={{ width: 150, height: 100, fontSize: 28 }}>
                  {device.price + " $"}
                  <Button
                    value={device?.id}
                    variant="outline-danger"
                    className="mt-4"
                    style={{ marginLeft: "40%", width: 80 }}
                    onClick={(e) => {
                      deleteFromBasket(e);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </Col>
        ))}
        {basket.basketDevicesData.length === 0 ? null : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 40 }}>
              Total:
              {toJS(basket.basketDevicesData).reduce((acc, device) => {
                return acc + device.price;
              }, 0)}
            </div>
            <Button
              onClick={handleDeleteBasket}
              variant="primary"
              style={{
                width: 200,
                display: "flex",
                alignSelf: "flex-end",
                justifyContent: "center",
                marginRight: 53,
              }}
            >
              Buy
            </Button>
          </div>
        )}
      </Container>
    </>
  );
});
