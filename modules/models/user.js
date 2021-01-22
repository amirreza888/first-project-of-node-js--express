const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name: {type: String, required: true,},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    courses: [{type: Schema.Types.ObjectId, ref: 'Course'}]
});

UserSchema.plugin(timestamps);

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10,).then((hash)=> {
        this.password = hash;
        next()
    });
})

module.exports = mongoose.model('User', UserSchema);
