var classes = require('../models/classes');
var mock = require('../models/mock-user');
var student = require('../models/student');

exports.classes_list = function(req, res, next){
    classes.find({}, 'subject day start')
    .populate('subject')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Classes', user: mock.user, group: 'students', collection: docs});
    });
};

exports.classes_details = function(req, res){
    classes.findById(req.params.id)
    .populate('subject')
    .populate('teachers')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('class', {title: 'Class\' details', user: mock.user, _class: docs});
    });
};

exports.class_assigned_students = function(req, res){
    student.find({'classes.class': req.params.id}, 'first_name last_name')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Enrolled students', user: mock.user, group: 'students enrolled on the class', collection: docs});
    });
};

exports.add_grade_to_student = function(req, res){
    res.send('NOT IMPLEMENTED: Add grade to the student');
};