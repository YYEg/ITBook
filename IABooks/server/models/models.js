const sequelize = require("./../db/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Bookshelf = sequelize.define("bookshelf", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BookshelfBook = sequelize.define("bookshelf_book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bookId: { type: DataTypes.INTEGER },
});

const Book = sequelize.define("book", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: false, allowNull: false },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Genre = sequelize.define("genre", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Author = sequelize.define("author", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const GenreAuthor = sequelize.define("genre_author", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Bookshelf);
Bookshelf.belongsTo(User);

Bookshelf.hasMany(BookshelfBook);
BookshelfBook.belongsTo(Bookshelf);

Genre.hasMany(Book);
Book.belongsTo(Genre);

Genre.hasMany(Book);
Book.belongsTo(Genre);

Author.hasMany(Book);
Book.belongsTo(Author);

Genre.belongsToMany(Author, { through: GenreAuthor });
Author.belongsToMany(Genre, { through: GenreAuthor });

module.exports = {
  User,
  Bookshelf,
  BookshelfBook,
  Book,
  Genre,
  Author,
  GenreAuthor,
};
