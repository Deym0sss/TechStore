const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const checkRoleMiddleWare = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleWare("ADMIN"), BrandController.create);
router.get("/", BrandController.getAll);
router.get("/many/brands", BrandController.getMany);
router.delete("/:id", checkRoleMiddleWare("ADMIN"), BrandController.deleteOne);
module.exports = router;
