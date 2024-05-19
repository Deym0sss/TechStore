import { $authHost } from "./index";

export const fetchBasket = async (userId) => {
  const { data } = await $authHost.get(`api/basket/${userId}`);
  return data;
};
export const fetchBasketDevices = async (basketId) => {
  const { data } = await $authHost.get(`api/basket/device/${basketId}`);
  return data;
};
export const createBasket = async (userId) => {
  const { data } = await $authHost.post(`api/basket/${userId}`);
  return data;
};
export const addToBasket = async (basketId, deviceId) => {
  const { data } = await $authHost.post(`api/basket`, { basketId, deviceId });
  return data;
};
export const removeFromBasket = async (basketId, basketDeviceId) => {
  const { data } = await $authHost.delete(`api/basket/remove/device`, {
    params: { basketId, basketDeviceId },
  });
  return data;
};
export const removeBasket = async (basketId, userId) => {
  const { data } = await $authHost.delete(`api/basket`, {
    params: { basketId, userId },
  });
  return data;
};
