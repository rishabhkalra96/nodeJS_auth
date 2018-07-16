

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employee');

router.get('/', (req, res, next) => {

    Employee.find()
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    "success": true,
                    "errCode": "",
                    "data": [doc]
                });
            } else {
                res.status(404).json({

                    message: "No Data Found"
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "err": {
                    "code": 500,
                    "msg": err.message,
                    "errAction": err.errAction,

                }
            })
        });
});

router.post('/', (req, res, next) => {

    var emp = new Employee({
        _id: new mongoose.Types.ObjectId(),
        EmpCode: req.body.EmpCode,
        Name: req.body.Name,
        Dept: req.body.Dept,
        SalaryBeforeJoining: req.body.SalaryBeforeJoining,
        ExperienceBeforeJoining: req.body.ExperienceBeforeJoining,
        DOJ: req.body.DOJ,
        TotalExperience: req.body.TotalExperience,
        Position: req.body.Position,
        Cycle: req.body.Cycle,
        Salary: req.body.Salary,
        Photo: req.body.Photo

    });

    emp.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "Handling employee POST request",
            Createdemployee: emp

        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            "success": false,
            "err": {
                "code": err.errCode,
                "msg": err.message,
                "errAction": err.errAction

            }

        })

    });


});

// GET employee
router.get('/:empId', (req, res, next) => {
    const id = req.params.empId;

    Employee.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    "success": true,
                    "errCode": "",
                    "data": [doc]
                });
            } else {
                res.status(404).json({

                    message: "No Data Found"
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "err": {
                    "code": 500,
                    "msg": err.message,
                    "errAction": err.errAction,

                }
            })
        });

});

router.patch('/:empID', (req, res, next) => {
    const id = req.params.empID;
    var updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Employee.update({_id:id},{$set: updateOps})
    .exec()
    .then(result=>{
        res.status(200).json({
            "success": true,
            "message": "Employee Updated"
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            "success": false,
            "err": {
                "code": 500,
                "msg": err.message,
                "errAction": err.errAction,

            }
        })
    });
    
});

// Delete Employee
router.delete('/:empID', (req, res, next) => {
    const id = req.params.empID;
    Employee.remove({ _id: id })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json({
                    "success": true,
                    "message": "Employee Deleted"
                });
            } else {
                res.status(404).json({

                    message: "No Data Found"
                });
            }

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                "success": false,
                "err": {
                    "code": 500,
                    "msg": err.message,
                    "errAction": err.errAction,

                }
            })
        });
});
module.exports = router;