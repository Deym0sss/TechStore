const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRoleMiddleWare = require("../middleware/checkRoleMiddleware");

router.post("/", checkRoleMiddleWare("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);
router.delete("/:id", checkRoleMiddleWare("ADMIN"), TypeController.deleteOne);
module.exports = router;
