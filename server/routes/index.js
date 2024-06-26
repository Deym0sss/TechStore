const Router = require("express");
const router = new Router();
const deviceRouter = require("./deviceRouter");
const userRouter = require("./usersRouter");
const typeRouter = require("./typeRouter");
const brandRouter = require("./brandRouter");
const basketRouter = require("./basketRouter");

router.use("/user", userRouter);
router.use("/device", deviceRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/basket", basketRouter);

module.exports = router;
