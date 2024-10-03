const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb+srv://malavika_prasad:12345@cluster0.yktvn.mongodb.net/empDataBase?retryWrites=true&w=majority&appName=Cluster0')
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
// })//Nn7HK5j7ZnwNs5Rb
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

const employeeSchema = new mongoose.Schema({
    employeeName: String,
    designation: String,
    place: String
});

const Employee = mongoose.model('empdetail', employeeSchema);


app.get('/', (req, res) => {
    res.render('index'); 
});


app.post('/submit', (req, res) => {
    const { employeeName, designation, place } = req.body;

   
    const newEmployee = new Employee({
        employeeName,
        designation,
        place
    });

 
    newEmployee.save()
        .then(() => {
            res.send('Employee details saved successfully!');
        })
        .catch((err) => {
            res.status(500).send('Error saving employee details');
            console.log(err);
        });
});


app.delete('/delete/:id', (req, res) => {
    const employeeId = req.params.id;

    Employee.findByIdAndDelete(employeeId)
        .then(() => {
            res.status(200).send('Employee deleted successfully');
        })
        .catch((err) => {
            res.status(500).send('Error deleting employee');
            console.error(err);
        });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});