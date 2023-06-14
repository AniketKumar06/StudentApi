const express = require('express');

const router = express.Router();

const Student = require('../models/student.js');
const e = require('express');
/*
** Add student Api
** Method : POST
*/

router.post('/addStudent', async (req, res, next) => {
    // console.log(req.body);
    try {
        const student = await Student.findOne({
            phone: req.body.phone
        });
        if (student) {
            res.json({
                success: false,
                msg: "Student already register with this phone number "
            });
        }
        else {
            let newStudent = await Student.create(req.body);
            res.json({
                success: true,
                message: 'Student added successfully',
                student: newStudent
            });
        }
    }
    catch (error) {
        next(error);
    }

});





/*
** Get student Api
** Method : GET
*/

router.get('/allStudent', async (req, res, next) => {
    try {
        const student = await Student.find({});
        res.json({
            success: true,
            total: student.length,
            students: student
        })
    } catch (error) {
        next(error);
    }

});


/*
** Get Single student Api by id 
** Method : GET
*/

router.get('/singleStudent/:id', async (req, res, next) => {
    try {
        // if user aur not;
        let student = await Student.findById(req.params.id);
        if (!student)
            return res.json({
                success: false,
                msg: "Student is not Exits"
            });
        else {
            res.json({
                success: true,
                msg: "Student found Sucessfully",
                student: student
            })
        }

    } catch (error) {
        next(error);
    }
});


/**
 * Get single student by registration no:
 * Method: GET
 */

router.get('/singleStudentByRegi/:regi_no', async (req, res, next) => {
    try {
        const student = await Student.find({ regi_no: req.params.regi_no });

        res.json({
            success: true,
            msg: "Student found Successfully",
            student: student
        });

    } catch (error) {
        next(error);
    }
});



/*
** Get Single student Api by id and update it
** Method : PUT
*/

router.put('/updateStudent/:id', async (req, res, next) => {
    try {

        let student = await Student.findById(req.params.id);
        if (!student)
            return res.json({
                success: false,
                msg: 'Student not exist'
            });
        else {
            let updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runVaidator: true
            });
            res.json({
                success: true,
                msg: 'Student update sucessfully',
                student: updatedStudent
            });
        }

    } catch (error) {
        next(error);
    }
});


/*
** Delete Single student Api by id
** Method : DELETE
*/


router.delete('/deleteStudent/:id', async (req, res, next) => {
    try {
        let student = await Student.findById(req.params.id);
        if (!student) {
            return res.json({
                success: false,
                msg: 'Student not found'
            });
        }
        else {
            await Student.deleteOne();
            res.json({
                success: true,
                msg: 'Student successfully deleted',
                student: {}
            });
        }
    } catch (error) {
        next(error);
    }


});

/*
** Delete All student Api 
** Method : DELETE
*/


router.delete('/deleteAllStudent', async (req, res, next) => {
    try {
        await Student.deleteMany()
        res.json({
            success: true,
            msg: 'All Students deleted successfully',
            student: {}
        })
    } catch (error) {
        next(error);
    }

});
module.exports = router;