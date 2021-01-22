const Controller = require(`${config.path.controller}/Controller`);
const {check, body, validationResult, param} = require('express-validator');
const bcrypt = require('bcrypt');
const UserTransform = require(`${config.path.transform}/UserTransform`);

module.exports = new class AuthController extends Controller {
    async register(req, res) {
        await body('name').notEmpty().withMessage('نه').run(req);
        await body('email').notEmpty().withMessage('نه').isEmail().run(req);
        await body('password').notEmpty().withMessage('نه').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }


        new this.model.User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).save(err => {
            if (err) return res.json(err);

            return res.json({
                data: 'created',
                success: true
            })
        })

    }

    async login(req, res) {
        await body('email').notEmpty().withMessage('نه').run(req);
        await body('password').notEmpty().withMessage('نه').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        this.model.User.findOne({email:req.body.email}, (err, user)=>{
            if (err) throw err;

            if (user==null)
                return res.status(422).json({
                    data:"zart",
                    success:false
                });

            bcrypt.compare(req.body.password, user.password, (err, status)=>{
                if (!status)
                    return res.status(422).json({
                        data:"zart",
                        success:false
                    });

                return res.status(200).json({
                    data: UserTransform.transform(user, true),
                    success: true
                })

            })

        })



    }

}