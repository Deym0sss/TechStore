import { BrowserRouter, useNavigate } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { NavBar } from "./components/Navbar";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { check } from "./http/UserApi";
import Spinner from "react-bootstrap/Spinner";
const App = observer(() => {
  const navigate = useNavigate;
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          user.setUser(true);
          user.setIsAuth(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else navigate("/");
  }, []);
  if (loading) {
    return <Spinner animation={"grow"}></Spinner>;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
