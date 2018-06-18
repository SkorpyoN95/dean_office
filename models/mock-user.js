var student = require('./student');

exports.user = new student({first_name: "Jan", last_name: "Kowalski",
                            email: "jan.kowalski@wp.pl", password: "qwerty123"
                        });