const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

//port number vairable 
const port = 7070;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_app',
});

db.connect(err => {
    if (err) {
        console.log("Database connection error " + err)
    }
    else{
        console.log('Database connected');
    }
});

// CRUD Routes
app.post('/api/data', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO crud (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (err, result) => {
        if (err) throw err;
        res.send('User added');
    });
});

app.get('/api/data', (req, res) => {
    const sql = 'SELECT * FROM crud';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE crud SET name = ?, email = ? WHERE id = ?';
    db.query(sql, [name, email, id], (err, result) => {
        if (err) throw err;
        res.send('User updated');
    });
});

app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM crud WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on ${port} port`);
});
