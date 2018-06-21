var classes = require('../models/classes');
var mock = require('../models/mock-user');

exports.classes_list = function(req, res, next){
    classes.find({}, 'subject day start')
    .populate('subject')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Classes', user: mock.user, group: 'students', collection: docs});
    });
};

exports.classes_details = function(req, res){
    classes.findById(req.param.id)
    .populate('subject')
    .populate('teacher')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('class', {title: 'Class\' details', user: mock.user, _class: docs});
    });
};

exports.class_assigned_students = function(req, res){
    res.send('NOT IMPLEMENTED: Students list assigned to class');
};

exports.assign_new_student_to_class = function(req, res){
    res.send('NOT IMPLEMENTED: Assign student to class');
};

exports.kick_student_from_class = function(req, res){
    res.send('NOT IMPLEMENTED: Kick student from class');
};

exports.add_grade_to_student = function(req, res){
    res.send('NOT IMPLEMENTED: Add grade to the student');
};