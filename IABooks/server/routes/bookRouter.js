const Router = require("express");
const router = new Router();
const bookController = require("../controllers/BookController");
const checkRole = require("../middleware/checkRoleMiddleware");

router
  .post("/", bookController.create)
  .get("/", bookController.getAll)
  .get("/search", bookController.getSearchAllBookByName)
  .get("/:id", bookController.getOne)
  .delete("/:id", checkRole("ADMIN"), bookController.delete)
  .put("/:id", checkRole("ADMIN"), bookController.update);

module.exports = router;
