const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo, Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          });
        });
      }

      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async getAll(req, res, next) {
    try {
      let { brandId, typeId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 10;
      let offset = page * limit - limit;
      let devices;
      if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      if (brandId && !typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId },
          limit,
          offset,
        });
      }
      if (!brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { typeId },
          limit,
          offset,
        });
      }
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({
          where: { brandId, typeId },
          limit,
          offset,
        });
      }
      return res.json(devices);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const device = await Device.findOne({
        where: { id },
        include: [{ model: DeviceInfo, as: "info" }],
      });
      return res.json(device);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }

  async getMany(req, res, next) {
    try {
      const ids = req.query.ids.split(",").map(Number);
      const devices = await Device.findAll({
        where: { id: ids },
        include: [{ model: DeviceInfo, as: "info" }],
      });

      return res.json(devices);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const deviceToDelete = await Device.destroy({
        where: { id },
      });
      return res.json(deviceToDelete);
    } catch (error) {
      next(ApiError.badRequest("id doesn`t specified"));
    }
  }
}

module.exports = new DeviceController();
