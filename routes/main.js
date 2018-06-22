var express = require('express');
var router = express.Router();
var mock = require('../models/mock-user');
var passport = require('passport');

var studentsController = require('../controllers/studentsController');
var teachersController = require('../controllers/teachersController');
var subjectsController = require('../controllers/subjectsController');
var classesController = require('../controllers/classesController');

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/login');
  }

//Home page

router.get('/', isAuthenticated, function(req,res){
    res.render("main", {title: "Home page", user: req.user});
})

//Student routes
router.get('/students', isAuthenticated, studentsController.student_list);
router.get('/students/:id', isAuthenticated, studentsController.student_details);
router.get('/grades', isAuthenticated, studentsController.my_grades);

//Teacher routes
router.get('/teachers', isAuthenticated, teachersController.teacher_list);
router.get('/teachers/:id', isAuthenticated, teachersController.teacher_details);

//Subject routes
router.get('/subjects', isAuthenticated, subjectsController.subject_list);
router.get('/subjects/:id', isAuthenticated, subjectsController.subject_details);

//Class routes
router.get('/classes', isAuthenticated, classesController.classes_list);
router.get('/classes/:id', isAuthenticated, classesController.classes_details);
router.get('/classes/:id/students', isAuthenticated, classesController.class_assigned_students);
router.get('/classes/:id_c/students/:id_s', isAuthenticated, classesController.student_grades);
router.post('/classes/:id_c/students/:id_s', isAuthenticated, classesController.grades_crud);

module.exports = router;