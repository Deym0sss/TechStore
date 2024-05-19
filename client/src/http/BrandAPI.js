import { $authHost, $host } from "./index";

export const fetchBrand = async (brandId) => {
  const { data } = await $host.get(`api/brand/${brandId}`);
  return data;
};
export const fetchManyBrands = async (ids) => {
  const { data } = await $authHost.get(`api/brand/many/brands`, {
    params: { ids },
  });
  return data;
};
