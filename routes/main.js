var express = require('express');
var router = express.Router();
var mock = require('../models/mock-user');

var studentsController = require('../controllers/studentsController');
var teachersController = require('../controllers/teachersController');
var subjectsController = require('../controllers/subjectsController');
var classesController = require('../controllers/classesController');

//Home page

router.get('/', function(req,res){
    res.render("main", {title: "Home page", user: mock.user});
})

//Student routes
router.get('/students', studentsController.student_list);
router.get('/students/:id', studentsController.student_details);
router.get('/grades', studentsController.my_grades);
router.get('/schedule', studentsController.my_schedule);

//Teacher routes
router.get('/teachers', teachersController.teacher_list);
router.get('/teachers/:id', teachersController.teacher_details);

//Subject routes
router.get('/subjects', subjectsController.subject_list);
router.get('/subjects/:id', subjectsController.subject_details);

//Class routes
router.get('/classes', classesController.classes_list);
router.get('/classes/:id', classesController.classes_details);
router.get('/classes/:id/students', classesController.class_assigned_students);
router.get('/classes/:id_c/students/:id_s', classesController.student_grades);
router.post('/classes/:id_c/students/:id_s', classesController.grades_crud);

module.exports = router;