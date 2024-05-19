const { Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      next;
    }
  }
  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }
  async getMany(req, res, next) {
    try {
      const ids = req.query.ids.split(",").map(Number);

      const brands = await Brand.findAll({
        where: { id: ids },
      });
      return res.json(brands);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }
  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const brandToDelete = await Brand.destroy({ where: { id } });
      return res.json(brandToDelete);
    } catch (error) {
      next(ApiError.badRequest("id doesn`t specified"));
    }
  }
}

module.exports = new BrandController();
