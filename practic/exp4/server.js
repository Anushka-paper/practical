const express = require('express'); 
const path = require('path');
const app = express();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'salary.html'));
});
const employees = [
    { id: 1, name: 'John Doe', salary: 50000 ,position:"Manager"},
    { id: 2, name: 'Jane Smith', salary: 60000 ,position:"Manager"},
    { id: 3, name: 'Sam Wilson', salary: 70000 ,position:"Manager"}
];

app.post('/generate', (req, res) => {
    const empId=req.body.empId;
    const emp=employees.find(emp=>emp.id==empId);
    if(employee){
        const basicSalary=path.parse(emp.salary);
        const hra=0.3*basicSalary;
        const da=0.2*basicSalary;   
        const deduction=0.1*basicSalary;
        const netSalary=basicSalary+hra+da-deduction;
        res.send(`
            <h1>Salary Slip</h1>
            <p>Name: ${emp.name}</p>
            <p>Position: ${emp.position}</p>
            <p>Basic Salary: ${basicSalary}</p>
            <p>HRA: ${hra}</p>
            <p>DA: ${da}</p>
            <p>Deduction: ${deduction}</p>
            <p>Net Salary: ${netSalary}</p>
            <a href="/">Back</a>
        `);
    }
    else{
        res.send(`
            <h1>Employee Not Found</h1>
            <a href="/">Back</a>
        `); 
    };
}
);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});