
const bcrypt = require('bcrypt');
const {User, Bookshelf} = require('./../models/models');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    );
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Неправильный email или пароль'));
        }

        const candidate = await User.findOne({where: {email}});
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с этим email уже сущесвтует'));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});
        const bookshelf = await Bookshelf.create({userId: user.id});


        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }


    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) {
            return next(ApiError.internal('Пользователя с таким именем не существует'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if(!comparePassword) {
            return next(ApiError.internal('Not valid password'));
        }
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }


    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }}


module.exports = new UserController();
