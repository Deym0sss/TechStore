import React, { useContext } from "react";
import { authRoutes, publicRoutes } from "../route";
import { Route, Routes } from "react-router-dom";
import Shop from "../pages/Shop";
import { Context } from "..";
import { observer } from "mobx-react-lite";
export const AppRouter = observer(() => {
  const { user } = useContext(Context);
  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<Shop />} />
    </Routes>
  );
});
