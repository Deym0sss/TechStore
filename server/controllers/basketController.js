const { Basket, BasketDevice, User } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
  async createBasket(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.create({ userId });
      return res.json(basket);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getBasketByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const basket = await Basket.findAll({ where: { userId } });

      if (!basket) {
        return next(ApiError.notFound("Basket not found"));
      }

      return res.json(basket);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getBasketDeviceByBasketId(req, res, next) {
    try {
      const { basketId } = req.params;
      const basketDevice = await BasketDevice.findAll({
        where: { basketId: basketId },
      });
      return res.json(basketDevice);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async addToBasket(req, res, next) {
    try {
      const { basketId, deviceId } = req.body;

      const basketWithDevices = await BasketDevice.create({
        basketId,
        deviceId,
      });

      return res.json(basketWithDevices);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async removeFromBasket(req, res, next) {
    try {
      const { basketId, basketDeviceId } = req.query;
      await BasketDevice.destroy({
        where: { basketId, deviceId: basketDeviceId },
      });
      return res.json({ message: "Device removed from basket" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async deleteBasket(req, res, next) {
    try {
      const { userId, basketId } = req.query;
      await BasketDevice.destroy({ where: { basketId } });
      const basket = await Basket.destroy({ where: { userId } });
      if (!basket) {
        return next(ApiError.notFound("Basket not found"));
      }

      return res.json({ message: "Basket removed" });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new BasketController();
