const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/getall', employeeController.getAllEmployees);
router.get('/getid/:id', employeeController.getEmployeeById);
router.post('/create', employeeController.createEmployee);
router.put('/update/:id', employeeController.updateEmployee);
router.get('/department/:department', employeeController.getEmployeesByDepartment); 
router.delete('/delete/:id', employeeController.deleteEmployee);
router.get('/sendemail/:department', employeeController.getEmployeesAndSendEmail); 
module.exports = router;

