const Router = require("express");
const router = new Router();
const bookRouter = require("./bookRouter");
const authorRouter = require("./authorRouter");
const genreRouter = require("./genreRouter");
const userRouter = require("./userRouter");
const bookshelfRouter = require("./bookshelfRouter");
router.use("/user", userRouter);
router.use("/genre", genreRouter);
router.use("/author", authorRouter);
router.use("/book", bookRouter);
router.use("/bookshelf", bookshelfRouter);

module.exports = router;
