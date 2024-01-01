const Employee = require('../models/employee');
const { sendEmail } = require('../helper/emailHelper');


//getall
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//get by id
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//create
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const newEmployee = new Employee({ name, email, department });
    await newEmployee.save();

    // Sending email to the new employee
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email, // Ensure 'email' variable contains the recipient's email address
      subject: 'Welcome!',
      text: `Welcome, ${name}! You have been added to the ${department} department.`,
    };

    await sendEmail(mailOptions);

    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



//update
exports.updateEmployee = async (req, res) => {
    try {
        const { name, email, department } = req.body;
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        employee.name = name;
        employee.email = email;
        employee.department = department;
        await employee.save();

        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//getbydepartment
exports.getEmployeesByDepartment = async (req, res) => {
  try {
      const department = req.params.department; // Get the department from request parameters
      const employees = await Employee.find({ department }); // Find employees by department
      res.status(200).json(employees);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


// Get employees by department and send them emails
exports.getEmployeesAndSendEmail = async (req, res) => {
  try {
    const department = req.params.department;
    const employees = await Employee.find({ department });

    if (employees.length === 0) {
      return res.status(404).json({ message: 'No employees found in this department' });
    }

    const employeeEmails = employees.map(employee => employee.email);

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: employeeEmails.join(','), // Joining emails with comma for multiple recipients
      subject: 'Subject of the Email',
      text: `Dear colleagues, Your custom message here...`,
    };

    await sendEmail(mailOptions);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete
exports.deleteEmployee = async (req, res) => {
  try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
      }
      await Employee.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to remove the employee

      res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

