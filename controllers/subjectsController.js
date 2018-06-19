var subject = require('../models/subject');
var classes = require('../models/classes');
var mock = require('../models/mock-user');
var async = require('async');

exports.subject_list = function(req, res, next){
    subject.find({}, 'title')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Syllabus', user: mock.user, group: 'subjects', collection: docs});
    });
};

exports.subject_details = function(req, res){
    async.parallel({
        subject: function(callback){
            subject.findById(req.params.id)
            .exec(callback);
        },
        terms: function(callback){
            classes.find({subject: req.params.id})
            .populate('teachers')
            .populate('subject')
            .exec(callback);
        }
    }, function(err, results){
        if(err) return next(err);
        if(results.subject == null){
            var err = new Error('Subject not found');
            err.status = 404;
            return next(err);
        }
        res.render('subject', {title: 'Subject info', user: mock.user, subject: results.subject,
                                        terms: results.terms});
    });
};