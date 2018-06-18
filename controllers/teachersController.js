var teacher = require('../models/teacher');
var mock = require('../models/mock-user');

exports.teacher_list = function(req, res, next){
    teacher.find({}, 'first_name last_name')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Teachers', user: mock.user, group: 'teachers', collection: docs});
    });
};

exports.teacher_details = function(req, res){
    res.send('NOT IMPLEMENTED: Teacher profile');
};