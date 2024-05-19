import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
export const TypeBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer", borderColor: "black" }}
          active={type.id === device._selectedType.id}
          onClick={() => {
            device.setSelectedType(type);
          }}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
      <Row className="d-flex flex-row justify-content-center align-items-center mt-2">
        <Button
          className="my-1 mx-1"
          style={{ width: 90, height: 40, fontSize: 14, padding: 0 }}
          variant="danger"
          onClick={() => {
            device.setSelectedType("");
          }}
        >
          Clear types
        </Button>
        <Button
          className="my-1 mx-1"
          style={{ width: 90, height: 40, fontSize: 14, padding: 0 }}
          variant="danger"
          onClick={() => {
            device.setSelectedBrand("");
          }}
        >
          Clear brands
        </Button>
        <Button
          className="my-1 mx-1"
          style={{ width: 90, height: 40, fontSize: 14, padding: 0 }}
          variant="danger"
          onClick={() => {
            device.setSelectedBrand("");
            device.setSelectedType("");
          }}
        >
          Clear all
        </Button>
      </Row>
    </ListGroup>
  );
});
