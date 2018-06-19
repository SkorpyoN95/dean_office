var mongoose = require('mongoose');

var Schema = mongoose.Schema;

function dateFormat(date){
    if(!date) return "unknown"
    return date.toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"});
}

var TeacherSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 30, min: 6},
        birth_date: {type: Date, get: dateFormat}
    }
);

TeacherSchema
.virtual('name')
.get(function(){
    return this.first_name + ' ' + this.last_name;
});

TeacherSchema
.virtual('age')
.get(function(){
    return new Date(Date.now()).getFullYear() - new Date(this.birth_date).getFullYear();
})

TeacherSchema
.virtual('url')
.get(function(){
    return '/main/teachers/' + this._id;
});

module.exports = mongoose.model("Teacher", TeacherSchema);