var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeacherSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 30, min: 6},
        birth_date: {type: Date}
    }
);

TeacherSchema
.virtual('name')
.get(function(){
    return this.first_name + ' ' + this.last_name;
});

TeacherSchema
.virtual('url')
.get(function(){
    return '/main/teachers/' + this._id;
});

module.exports = mongoose.model("Teacher", TeacherSchema);