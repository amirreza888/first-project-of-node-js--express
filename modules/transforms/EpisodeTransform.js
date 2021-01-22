const Transform = require('./Transform');


module.exports = new class EpisodeTransform extends Transform {
    transform(item){
        return {
            title : item.title,
            body : item.body,
        }
    }

}