import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";
export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  return jwtDecode(data.token);
};
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};
export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const fetchUserByEmail = async (email) => {
  const { data } = await $authHost.get("api/user", { email });
  return data;
};
export const deleteUser = async (userId) => {
  const { data } = await $authHost.delete("api/user", { userId });
  return data;
};
