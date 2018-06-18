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

for(i = 0; i < 100; i++){
    var first = faker.name.firstName(),
        last = faker.name.lastName();
    new student({first_name: first,
                last_name: last,
                email: faker.internet.email(first, last),
                password: faker.internet.password(10, 1),
                birth_date: faker.date.between('1993-01-01', '1998-12-31')})
        .save(console.error);
}

for(i = 0; i < 30; i++){
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
}

/*student.find({first_name: "Katarzyna"}, 'first_name last_name', function(err, results){
    console.log(results);
})*/