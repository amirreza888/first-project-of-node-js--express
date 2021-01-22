const Controller = require(`${config.path.controller}/Controller`);
const {check, body, validationResult} = require('express-validator');

module.exports = new class CourseController extends Controller {
    index(req, res) {
        this.model.Course.find({}, (err, courses) => {
            if (err) throw err;
            if (courses) {
                res.status(401).json(courses);
            }
        })
    }

    single(req, res) {
        Course.find({});
    }

    async store(req, res) {

        await body('title').custom(value => {
            if (value === "ridi") {
                return Promise.reject("ridi");
            }
            return value;
        }).run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array().map(value => {
                    return {msg: value.msg}
                })
            });
        }
        //validation


        let newCourse = new this.model.Course({
            title: req.body.title,
            body: req.body.body,
            price: req.body.price,
            image: req.body.image,
        }).save(err => {
            if (err) throw err;
            return res.json('create course');
        })
    }

    update(req, res) {
        this.model.Course.findByIdAndUpdate(req.params.id, {title: 'course 33'}, (err, doc) => {
            res.json('update success');
        });
    }

    destroy(req, res) {
        this.model.Course.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) throw err;
            return res.json('delete success');
        });
    }
}

