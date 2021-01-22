const Controller = require(`${config.path.controller}/Controller`);
const CourseTransform = require(`${config.path.transform}/CourseTransform`);


module.exports = new class CourseController extends Controller {
    index(req, res) {
        // this.model.Course.find({}, (err, courses) => {
        //
        //     if (err) throw err;
        //
        //     if (courses) {
        //         return res.json({
        //             data: courses,
        //             success: true
        //         });
        //     }
        // });
        this.model.Course.find({}).populate('episodes').limit(1).skip(0).exec((err, courses) => {
            if (err) throw err;

            if (courses) {
                return res.json({
                    data: CourseTransform.withEpisodes().transformCollection(courses),
                    success: true
                });
            }
        })
    }

}