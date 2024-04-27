const { Author } = require("../models/models");


class AuthorController {
    async create(req, res) {
        const {name} = req.body;

        const author = await Author.create({name});
        return res.json(author);
    }

    async getAll(req, res) {
        const authors = await Author.findAll();
        return res.json(authors);
    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            await Author.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        await Author.destroy({where:{id}}).then(() => {
                            return res.json("Автор книг удален");
                        })
                    } else {
                        return res.json("Такого автора книг нет в базе данных");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new AuthorController();
