const { Op } = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const { Book, Genre, Author, BookshelfBook } = require("../models/models");
const apiError = require("../error/apiError");

class BookController {
  async create(req, res, next) {
    try {
      let { name, description, authorId, genreId } = req.body;
      const { img } = req.files;

      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const book = await Book.create({
        name,
        description,
        authorId,
        genreId,
        img: fileName,
      });

      return res.json(book);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { authorId, genreId, limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;
      let books;
      if (!authorId && !genreId) {
        books = await Book.findAndCountAll({
          include: [{ model: Author }, { model: Genre }],
          limit,
          offset,
        });
      }
      if (authorId && !genreId) {
        books = await Book.findAndCountAll({
          where: { authorId },
          include: [{ model: Author }, { model: Genre }],
          limit,
          offset,
        });
      }
      if (!authorId && genreId) {
        books = await Book.findAndCountAll({
          where: { genreId },
          include: [{ model: Author }, { model: Genre }],
          limit,
          offset,
        });
      }
      if (authorId && genreId) {
        books = await Book.findAndCountAll({
          where: { genreId, authorId },
          include: [{ model: Author }, { model: Genre }],
          limit,
          offset,
        });
      }
      return res.json(books);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }

  async getSearchAllBookByName(req, res, next) {
    try {
      let { limit, page, name, filter } = req.query;

      page = page || 1;
      limit = limit || 7;
      let offset = page * limit - limit;
      if (filter === "All") {
        const books = await Book.findAndCountAll({
          attributes: ["name", "description", "img", "id"],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          include: [
            {
              attributes: ["name"],
              model: Author,
            },
            {
              attributes: ["name"],
              model: Genre,
            },
          ],
          limit,
          offset,
        });

        return res.json(books);
      } else {
        const books = await Book.findAndCountAll({
          attributes: [
            "name",
            "desription",
            "img",
            "id",
            "authorId",
            "genreId",
          ],
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
            [Op.or]: [
              {
                authorId: null,
              },
              {
                genreId: null,
              },
            ],
          },
          include: [
            {
              attributes: ["name"],
              model: Author,
            },
            {
              attributes: ["name"],
              model: Genre,
            },
          ],
          limit,
          offset,
        });

        return res.json(books);
      }
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      let books = await Book.findOne({
        where: { id },
        include: [{ model: Genre }, { model: Author }],
      });
      return res.json(books);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Book.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Book.destroy({ where: { id } }).then(() => {
            return res.json("Книга удалена");
          });
        } else {
          return res.json("Этого фильма нет в базе данных");
        }

        await BookshelfBook.destroy({ where: { bookId: id } });
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { authorId, genreId, name, description } = req.body;

      await Book.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          let newVal = {};
          authorId ? (newVal.authorId = authorId) : false;
          genreId ? (newVal.genreId = genreId) : false;
          name ? (newVal.name = name) : false;
          description ? (newVal.description = description) : false;

          if (req.files) {
            const { img } = req.files;
            const type = img.mimetype.split("/")[1];
            let fileName = uuid.v4() + `.${type}`;
            await img.mv(path.resolve(__dirname, "..", "static", fileName));
            newVal.img = fileName;
          }

          await Book.update(
            {
              ...newVal,
            },
            { where: { id } }
          ).then(() => {
            return res.json("Книга отредактирована");
          });
        } else {
          return res.json("Этой Книги нет в базе данных");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new BookController();
