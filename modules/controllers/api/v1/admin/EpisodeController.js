const Controller = require(`${config.path.controller}/Controller`);
const {check, body, validationResult, param} = require('express-validator');

module.exports = new class EpisodeController extends Controller {
    index(req, res) {
        this.model.Episode.find({}, (err, episodes) => {
            if (err) throw err;

            if (episodes) {
                res.json({
                    data: episodes,
                    success: true
                })
            }
        })
    }

    async single(req, res) {
        await param('id').isMongoId().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }


        this.model.Episode.findById(req.params.id, (err, episode) => {
            res.json({
                data: episode,
                success: true
            })
        })


    }

    async store(req, res) {
        await check('title').escape().notEmpty().withMessage('نه').run(req);
        await check('body').escape().notEmpty().withMessage('نه').run(req);
        await check('course_id').escape().notEmpty().withMessage('نه').run(req);
        await check('videoUrl').escape().notEmpty().run(req);
        await check('number').escape().notEmpty().withMessage('نه').run(req);

        const errors = validationResult(req);
        console.log(errors.isEmpty())
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }

        let course = this.model.Course.findById(req.body.course_id, (err, course) => {


            let episode = new this.model.Episode({
                course: course._id,
                title: req.body.title,
                body: req.body.body,
                videoUrl: req.body.videoUrl,
                number: req.body.number
            });

            episode.save(err => {
                if (err) throw err;

                course.episodes.push(episode._id);
                course.save()

                res.json({
                    data: 'ویدیو با موفقیت ایجاد شد',
                    success: true
                })
            })

        })

    }

    async update(req, res) {
        await param('id').isMongoId().run(req);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        this.model.Course.findByIdAndUpdate(req.params.id, {title: 'course 33'}, (err, doc) => {
            res.json('update success');
        });
    }

    async destroy(req, res) {
        await param('id').isMongoId().run(req);
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
        this.model.Episode.findById(req.params.id).populate('course').exec((err, episode) => {
            if (err) throw err;
            let course = episode.course;
            let pos = episode.course;
            course.episodes.splice(pos, 1);
            course.save(err => {
                if (err) throw err;

                episode.remove();
                res.json({
                    data: 'ویدیو شما با موفقیت حدف شد',
                    success: true
                });
            });
            return;

        })

    }


}