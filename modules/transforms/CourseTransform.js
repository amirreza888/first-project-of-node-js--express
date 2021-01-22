const Transform = require('./Transform');
const EpisodeTransform = require('./EpisodeTransform');


module.exports = new class CourseTransform extends Transform {
    transform(item){
        return {
            title : item.title,
            body : item.body,
            price : item.price,
            ...this.showEpisodes(item)
        }
    }

    showEpisodes(item){
        if (this.withEpisodesStatus){
            return {
                episodes : EpisodeTransform.transformCollection(item.episodes)
            }
        }
        return {}
    }

    withEpisodes(){
        this.withEpisodesStatus = true;
        return this;
    }
}