const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'leave_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS leave_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(50) NOT NULL,
    hire_date DATE,
    end_date DATE,
)`;
db.query(createTableQuery, (err, result) => {
    if (err) {
        console.error('Error creating table:', err);
        return;
    }
    console.log('Table created or already exists');
});

app.post('/submit-leave', (req, res) => {
    const { employee_name, hire_date, end_date } = req.body;
    if(!employee_name || !hire_date || !end_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const insertQuery = 'INSERT INTO leave_requests (employee_name, hire_date, end_date) VALUES (?, ?, ?)';
    db.query(insertQuery, [employee_name, hire_date, end_date], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(201).json({ message: 'Leave request submitted successfully', id: result.insertId 
        });
    });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

