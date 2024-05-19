import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { BsPlugin } from "react-icons/bs";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";
import { Context } from "..";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          style={{ color: "white", fontSize: 40, textDecoration: "none" }}
          to={SHOP_ROUTE}
        >
          <BsPlugin />
          TechStore
        </NavLink>
        {user.isAuth ? (
          <Nav style={{ color: "white" }}>
            {user.role === "ADMIN" ? (
              <Button
                variant={"outline-light"}
                onClick={() => {
                  navigate(ADMIN_ROUTE);
                }}
              >
                Admin panel
              </Button>
            ) : null}

            <div style={{ width: "10px" }}></div>
            <Button
              variant={"outline-light"}
              onClick={() => {
                logOut();
              }}
            >
              Exit
            </Button>
            <div style={{ width: "10px" }}></div>
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigate(BASKET_ROUTE);
              }}
            >
              basket
            </Button>
          </Nav>
        ) : (
          <Nav style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => {
                navigate(LOGIN_ROUTE);
              }}
            >
              Authorization
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});
