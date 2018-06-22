var classes = require('../models/classes');
var mock = require('../models/mock-user');
var student = require('../models/student');

exports.classes_list = function(req, res, next){
    classes.find({}, 'subject day start')
    .populate('subject')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', {title: 'Classes', user: req.user, group: 'students', collection: docs});
    });
};

exports.classes_details = function(req, res){
    classes.findById(req.params.id)
    .populate('subject')
    .populate('teachers')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('class', {title: 'Class\' details', user: req.user, _class: docs});
    });
};

exports.class_assigned_students = function(req, res){
    student.find({'classes.class': req.params.id}, 'first_name last_name')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('listing', { title: 'Enrolled students', user: req.user, group: 'students enrolled on the class',
                                collection: docs, url: "/main/classes/"+req.params.id});
    });
};

exports.student_grades = function(req,res, next){
    student.findOne({'classes.class': req.params.id_c, '_id': req.params.id_s})
    .populate('classes')
    .populate('classes.class')
    //.populate('classes.class.subject')
    .exec(function(err, docs){
        if(err) return next(err);
        res.render('grades_teacher', {title: 'Student\'s grades', user: req.user, student: docs});
    });
}

exports.grades_crud = function(req, res, next){
    student.findOne({'classes.class': req.params.id_c, '_id': req.params.id_s})
    .populate('classes')
    .populate('classes.class')
    //.populate('classes.class.subject')
    .exec(function(err, stud){
        switch(req.body._method){
            case 'put': var class_id = req.body.add_class; 
                        stud.classes[class_id].grades.push(req.body.add_grade);
                        stud.save();
                        break;
            case 'post':var coords = JSON.parse(req.body.update_old); 
                        stud.classes[coords.class_id].grades[coords.grade_id] = req.body.update_new;
                        stud.markModified('classes');
                        stud.save();
                        break;
            case 'delete':  var coords = JSON.parse(req.body.remove);
                            stud.classes[coords.class_id].grades.splice(coords.grade_id, 1);
                            stud.save();
                            break;
            default: var err = new Error('Invalid method');
                    err.status = 404;
                    return next(err);

        }
        
        res.render('grades_teacher', {title: 'Student\'s grades', user: req.user, student: stud});
    });
};