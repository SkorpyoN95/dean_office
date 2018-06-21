var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClassesSchema = new Schema(
    {
        subject: {type: Schema.ObjectId, ref: 'Subject', required: true},
        teachers: [{type: Schema.ObjectId, ref: 'Teacher'}],
        day: {type: String, required: true, enum: ["mon", "tue", "wed", "thu", "fri"]},
        start: {type: String, required: true},
        length: {type: Number, required: true, enum: [45, 90, 135], default: 90}
    }
);

ClassesSchema
.virtual('time')
.get(function(){
    return this.day + ' ' + this.start;
})

ClassesSchema
.virtual('name')
.get(function(){
    return this.subject.title + ' ' + this.time;
})

ClassesSchema
.virtual('url')
.get(function(){
    return '/main/classes/' + this._id;
});

module.exports = mongoose.model("Classes", ClassesSchema);