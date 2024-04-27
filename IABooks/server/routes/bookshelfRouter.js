const Router = require("express");
const router = new Router();
const bookshelfController = require("../controllers/bookshelfController");
const authMiddleware = require("../middleware/authMiddleware");
const checkDeleteBookFromBookshelf = require("../middleware/checkDeleteBookFromBookshelf");

router
  .post("/", authMiddleware, bookshelfController.addBook)
  .get("/", authMiddleware, bookshelfController.getBooks)
  .delete(
    "/:id",
    authMiddleware,
    checkDeleteBookFromBookshelf,
    bookshelfController.deleteBook
  );

module.exports = router;
