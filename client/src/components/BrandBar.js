import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Context } from "..";

export const BrandBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="d-flex">
      {device.brands.map((brand) => (
        <Card
          style={{
            cursor: "pointer",
            width: "100px",
            alignItems: "center",
            marginLeft: 5,
            marginTop: 5,
            color: "white",
          }}
          key={brand.id}
          className="p-3"
          onClick={() => {
            device.setSelectedBrand(brand);
          }}
          border={brand.id === device._selectedBrand.id ? "light" : "dark"}
          bg={brand.id === device._selectedBrand.id ? "primary" : "dark"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});
