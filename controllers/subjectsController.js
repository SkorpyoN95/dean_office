var subject = require('../models/subject');
var mock = require('../models/mock-user');

exports.subject_list = function(req, res){
    subject.find({}, 'title')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Syllabus', user: mock.user, group: 'subjects', collection: docs});
    });;
};

exports.subject_details = function(req, res){
    res.send('NOT IMPLEMENTED: Subject info');
};

exports.subject_teachers = function(req, res){
    res.send('NOT IMPLEMENTED: Subject lecturers');
};