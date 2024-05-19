const { Type } = require("../models/models");
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      next(ApiError.badRequest("Name doesn`t specified"));
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      next(ApiError.badRequest("Unspecified error"));
    }
  }
  async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      const typeToDelete = await Type.destroy({
        where: { id },
      });
      return res.json(typeToDelete);
    } catch (error) {
      next(ApiError.badRequest("id doesn`t specified"));
    }
  }
}

module.exports = new TypeController();
