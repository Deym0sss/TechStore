import { makeAutoObservable } from "mobx";
export default class BasketStore {
  constructor() {
    this._basketDevices = [];
    this._basketId = "";
    this._basketDevicesData = [];

    makeAutoObservable(this);
  }

  setBasketDevices(basketDevices) {
    this._basketDevices = basketDevices;
  }
  setBasketId(basketId) {
    this._basketId = basketId;
  }
  setBasketDevicesData(basketDevicesData) {
    this._basketDevicesData = basketDevicesData;
  }

  get basketDevices() {
    return this._basketDevices;
  }
  get basketId() {
    return this._basketId;
  }
  get basketDevicesData() {
    return this._basketDevicesData;
  }
}
