var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StudentSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        last_name: {type: String, required: true, max: 100},
        email: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 30, min: 6},
        birth_date: {type: Date},
        classes: [{
            class: {type: Schema.ObjectId, ref: 'Classes'},
            grades: [{type: Number, enum: [2.0, 3.0, 3.5, 4.0, 4.5, 5.0]}]
        }]
    }
);

StudentSchema
.virtual('name')
.get(function(){
    return this.first_name + ' ' + this.last_name;
});

StudentSchema
.virtual('url')
.get(function(){
    return '/main/students/' + this._id;
});

module.exports = mongoose.model("Student", StudentSchema);