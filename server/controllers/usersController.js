const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "72h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Uncorrect email or password"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("User with same email already exist"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      next(ApiError.internal("User with this name doesn`t exist"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      next(ApiError.internal("Wrong password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }
  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }
  async getUserById(req, res, next) {
    try {
      const { userId } = req.body;
      const user = await User.findOne({ where: { id: userId } });
      return res.json(user);
    } catch (error) {
      next(ApiError.badRequest("userId doen`t specified"));
    }
  }
  async getUserByEmail(req, res, next) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      return res.json(user);
    } catch (error) {
      next(ApiError.badRequest("email doen`t specified"));
    }
  }
  async deleteUser(req, res, next) {
    try {
      const { userId } = req.body;
      const user = await User.destroy({ where: { id: userId } });
      return res.json(user);
    } catch (error) {
      next(ApiError.badRequest("userId doen`t specified"));
    }
  }
}

module.exports = new UserController();
