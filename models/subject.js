var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubjectSchema = new Schema(
    {
        title: {type: String, required: true, max: 100},
        total_hours: {type: Number, required: true, enum: [45, 60, 75]},
        ects: {type: Number, required: true}
    }
);

SubjectSchema
.virtual('name')
.get(function(){
    return this.title;
})

SubjectSchema
.virtual('url')
.get(function(){
    return '/main/subjects/' + this._id;
});

module.exports = mongoose.model("Subject", SubjectSchema);