import React, { useContext, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { TypeBar } from "../components/TypeBar";
import { BrandBar } from "../components/BrandBar";
import { DeviceList } from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/DeviceAPI";
import { Pages } from "../components/Pages";

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((data) => device.setType(data));
    fetchBrands().then((data) => device.setBrand(data));
    fetchDevices(null, null, 1, 3).then((data) => {
      device.setDevice(data.rows);
      device.setTotalCount(data.count);
    });
  }, []);
  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      device.limit
    ).then((data) => {
      device.setDevice(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});
export default Shop;
