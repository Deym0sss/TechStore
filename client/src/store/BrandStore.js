import { makeAutoObservable } from "mobx";
export default class BrandStore {
  constructor() {
    this._brandsData = [];
    makeAutoObservable(this);
  }

  setBrandsData(brandsData) {
    this._brandsData = brandsData;
  }

  get brandsData() {
    return this._brandsData;
  }
}
