var student = require('../models/student');
var mock = require('../models/mock-user');

exports.student_list = function(req, res, next){
    student.find({}, 'first_name last_name')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Students', user: mock.user, group: 'students', collection: docs});
    });
};

exports.student_details = function(req, res, next){
    student.findById(req.params.id)
    .populate('classes')
    .populate('classes.class')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('profile', {title: 'Student profile', user: mock.user, person: docs,
                                additional_data: docs.classes.map(cl => {return cl.class}), additional_data_title: "Enrolled classes:"});
    });
};

exports.my_grades = function(req, res, next){
    student.findOne({'classes.class': mock.user._id})
    .populate('classes')
    .populate('classes.class')
    //.populate('classes.class.subject')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('grades', {title: 'Your grades', user: mock.user, student: docs});
    });
};