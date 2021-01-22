

module.exports = new class HomeController {
    index(req, res) {
        res.status(422).json('welcome to apI');
    }
    version(req, res) {
        res.status(200).json('version 1');
    }
}