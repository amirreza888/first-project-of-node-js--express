const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/UserTransform`);



module.exports = new class UserController extends Controller {
    index(req, res) {
        return res.json({

            data: UserTransform.transform(req.user)
        })
    }

    upload(req, res){
        if (req.file)
            return res.json({
                imagePath: req.protocol+'://'+req.get('host')+'/'+req.file.path.replace(/\\/g, '/')
            })
        res.json("no")
    }

}