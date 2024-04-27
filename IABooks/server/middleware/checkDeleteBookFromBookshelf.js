const { Bookshelf, BookshelfBook } = require("../models/models");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const userBookshelf = await Bookshelf.findOne({
      where: { userId: user.id },
    });
    const bookItem = await BookshelfBook.findOne({
      where: { bookshelfId: userBookshelf.id, filmId: id },
    });

    if (bookItem) {
      return next();
    }
    return res.json("Книга не была найдена на полке");
  } catch (e) {
    res.json(e);
  }
};
