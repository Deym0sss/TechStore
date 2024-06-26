import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { registration, login } from "../http/UserApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      user.setRole(data.role);

      navigate(SHOP_ROUTE);
    } catch (error) {
      alert("Wrong email or password");
    }
  };
  useEffect(() => {
    user.setEmail(email);
  }, [email]);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Authorization" : "Register"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          ></Form.Control>
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Doesn`t have account?
                <NavLink className="m-1" to={REGISTRATION_ROUTE}>
                  Register
                </NavLink>
              </div>
            ) : (
              <div>
                Have account?
                <NavLink className="m-1" to={LOGIN_ROUTE}>
                  Login
                </NavLink>
              </div>
            )}
            <Button
              onClick={() => {
                click();
              }}
              className="mt-3 align-self-end"
              variant="outline-success"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});
export default Auth;
