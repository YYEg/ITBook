const { Bookshelf, BookshelfBook, Book } = require("../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class BookshelfController {
  async addBook(req, res) {
    try {
      const { id } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const bookshelf = await Bookshelf.findOne({ where: { userId: user.id } });
      await BookshelfBook.create({ bookshelfId: bookshelf.id, bookId: id });
      return res.json("Книга добавлена на полку");
    } catch (e) {
      console.error(e);
    }
  }

  async getBooks(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = await Bookshelf.findOne({ where: { userId: user.id } });
      const bookshelf = await BookshelfBook.findAll({
        where: { bookshelfId: id },
      });

      const bookshelfArray = [];
      for (let i = 0; i < bookshelf.length; i++) {
        const bookshelfBook = await Book.findOne({
          where: {
            id: bookshelf[i].bookId,
          },
        });
        bookshelfArray.push(bookshelfBook);
      }

      return res.json(bookshelfArray);
    } catch (e) {
      console.error(e);
    }
  }
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      await Bookshelf.findOne({ where: { userId: user.id } }).then(
        async (userBookshelf) => {
          if (userBookshelf.userId === user.id) {
            await BookshelfBook.destroy({
              where: { bookshelfId: userBookshelf.id, bookId: id },
            });
          }
          return res.json(
            `У вас нет доступа для удаления книги (${id}) из списка, который вам не пренадлежит`
          );
        }
      );
      return res.json("Книга удалена с полки");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new BookshelfController();
