const Router = require("express");
const router = new Router();
const DeviceController = require("../controllers/deviceController");
const checkRoleMiddleWare = require("../middleware/checkRoleMiddleware");

router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);
router.get("/many/devices", DeviceController.getMany);
router.post("/", checkRoleMiddleWare("ADMIN"), DeviceController.create);
router.delete("/:id", checkRoleMiddleWare("ADMIN"), DeviceController.deleteOne);

module.exports = router;
