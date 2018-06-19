var teacher = require('../models/teacher');
var classes = require('../models/classes');
var mock = require('../models/mock-user');
var async = require('async');

exports.teacher_list = function(req, res, next){
    teacher.find({}, 'first_name last_name')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Teachers', user: mock.user, group: 'teachers', collection: docs});
    });
};

exports.teacher_details = function(req, res, next){
    async.parallel({
       teacher: function(callback){
            teacher.findById(req.params.id)
            .exec(callback);
        },
        data: function(callback){
            classes.find({techers: req.params.id})
            .exec(callback);
        }
    }, function(err, results){
        if(err) return next(err);
        if(results.teacher == null){
            var err = new Error('Teacher not found');
            err.status = 404;
            return next(err);
        }
        res.render('profile', {title: 'Teacher profile', user: mock.user, person: results.teacher,
                                additional_data: results.data, additional_data_title: "Lectured classes:"});
    });
};