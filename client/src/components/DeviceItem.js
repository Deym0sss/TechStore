import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

export const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className="m-2"
      style={{ width: "150px" }}
      onClick={() => {
        navigate(DEVICE_ROUTE + "/" + device.id);
      }}
    >
      <Card className="m-1" style={{ width: "150px", cursor: "pointer" }}>
        <Image
          className="m-2"
          width={100}
          height={100}
          src={`http://localhost:5001/${device.img}`}
          alt="Nothing"
        />
        <div className=" d-flex justify-content-between align-items-centre">
          <div className="mx-1">{device.name}</div>
        </div>
        <div className="mx-1">{device.price + "$"}</div>
      </Card>
    </Col>
  );
};
