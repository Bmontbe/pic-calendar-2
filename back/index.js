const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./conf');
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use(bodyParser.json());
app.use(cors());

connection.connect();

app.get('/api/events', (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query('SELECT * from event', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des évènements');
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

app.post('/api/events', (req, res) => {
  console.log(req.body);
  const data = { event: req.body.event, date_event: req.body.date_event, picture: req.body.picture, comment: req.body.comment };
  const sql = 'INSERT INTO event SET ?';
  connection.query(sql, data, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des évènements');
    } else {
      console.log(results);
      res.sendStatus(200);
    }
  });
});

app.delete('/api/events/:id', (req, res) => {
  console.log(req.body);
  const idEvent = { id: req.params.id };
  const sql = 'DELETE FROM event WHERE id = ';
  connection.query(sql + req.params.id, idEvent, (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la suppression de l'évènement");
    } else {
      res.sendStatus(200);
      console.log(results)
    }
  });
});

app.put('/api/events/:id', (req, res) => {
  console.log(req.body, req.params);
  const idEvent = req.params.id;
  const sql = `UPDATE event SET ? WHERE id = ${idEvent}`;
  const formData = req.body;
  connection.query(sql, [formData], (err, results) =>{
    if (err){
      console.log(err);
      res.status(500).send('erreur de modif title et desc');
    } else {
      res.json(results);
    }
  });
 });

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});