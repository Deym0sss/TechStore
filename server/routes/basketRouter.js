const Router = require("express");
const router = new Router();
const BasketController = require("../controllers/basketController");
const checkRoleMiddleWare = require("../middleware/checkRoleMiddleware");

router.post(
  "/:userId",
  checkRoleMiddleWare("ADMIN"),
  BasketController.createBasket
);
router.get("/:userId", BasketController.getBasketByUserId);
router.get("/device/:basketId", BasketController.getBasketDeviceByBasketId);
router.post("/", checkRoleMiddleWare("ADMIN"), BasketController.addToBasket);
router.delete(
  "/remove/device",
  checkRoleMiddleWare("ADMIN"),
  BasketController.removeFromBasket
);
router.delete("/", checkRoleMiddleWare("ADMIN"), BasketController.deleteBasket);
module.exports = router;
