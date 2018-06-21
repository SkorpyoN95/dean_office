var mongoose = require('mongoose');
var faker = require('faker/locale/pl');

var mongoDB = 'mongodb://127.0.0.1:27017/dean';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var student = require('./models/student');
var teacher = require('./models/teacher');
var subject = require('./models/subject');
var classes = require('./models/classes');
var async = require('async');

for(i = 0; i < 100; i++){
    classes.aggregate([{$project: {_id: 1}}]).sample(7)
    .exec(function(err, docs){
        var cl = [];
        var first = faker.name.firstName(),
            last = faker.name.lastName();
        new student({first_name: first,
                    last_name: last,
                    email: faker.internet.email(first, last),
                    password: faker.internet.password(10, 1),
                    birth_date: faker.date.between('1993-01-01', '1998-12-31'),
                    classes: docs.map(cl => {return {class: cl._id, grades: []} })})
            .save(console.log);
        //console.log(docs);
    });
    
}

/*for(i = 0; i < 30; i++){
    var first = faker.name.firstName(),
        last = faker.name.lastName();
    new teacher({first_name: first,
                last_name: last,
                email: faker.internet.email(first, last),
                password: faker.internet.password(10, 1),
                birth_date: faker.date.between('1980-01-01', '1990-12-31')})
        .save(console.error);
}

for(i = 0; i < 20; i++){
    new subject({title: faker.name.jobArea(),
                total_hours: faker.random.arrayElement([45,60,75]),
                ects: faker.random.number({min: 1, max: 6})})
        .save(console.error);
}*/

/*for(i = 0; i < 50; i++){
    async.parallel({
        subject: function(cb){
            subject.aggregate([{$project: {_id: 1}}]).sample(1)
            .exec(cb);
        },
        teacher: function(cb){
            teacher.aggregate([{$project: {_id: 1}}]).sample(1)
            .exec(cb);
        }
    }, function(err, results){
        if(err) console.error(err);
        new classes({subject: results.subject[0]._id, teachers: [results.teacher[0]._id],
                    day: faker.random.arrayElement(["mon", "tue", "wed", "thu", "fri"]),
                    start: faker.random.arrayElement(["8:00", "9:30", "11:00", "12:30", "14:00", "15:30"]),
                    length: faker.random.arrayElement([45, 90, 135]) })
        .save(console.log);
    });
}*/