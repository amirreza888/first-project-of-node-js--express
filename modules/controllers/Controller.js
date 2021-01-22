const path = require('path');


//Course Model
const Course = require(`${config.path.model}/course`);
const Episode = require(`${config.path.model}/episode`);
const User = require(`${config.path.model}/user`);

module.exports = class Controller {
    constructor() {
        this.model = {Course, Episode, User};
    }
}