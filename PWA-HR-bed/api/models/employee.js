const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({

    _id : mongoose.Schema.Types.ObjectId, 
    EmpCode: Number,
    Name: String,
    Dept: String,
    SalaryBeforeJoining: Number,
    ExperienceBeforeJoining: String,
    DOJ: Date,
    TotalExperience: String,
    Position: String,
    Cycle:String,
    Salary:Number,
    Photo:String
});

module.exports = mongoose.model('Employee',employeeSchema);