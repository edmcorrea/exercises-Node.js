const express = require('express');

const app = express();

app.use(express.json());

const activities = [
  {
    id: 1,
    description: 'Banho no cachorro',
    status: 'A fazer',
  },
  {
    id: 2,
    description: 'Cortar a grama',
    status: 'A fazer',
  },
  {
    id: 3,
    description: 'Estudar JavaScript',
    status: 'Feito',
  },
];

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!' }));

app.get('/myActivities', (_req, res) => {
  res.status(200).json({ activities });
});

app.get('/myActivities/:id', (req, res) => {
  const { id } = req.params;
  const filter = activities.filter((elem) => elem.id === Number(id));
  res.status(200).json(filter);
});

app.post('/myActivities', (req, res) => {
  const newACT = { ...req.body };
  activities.push(newACT);

  res.status(201).json({ myAct: newACT });
});

app.get('/search/myActivities', (req, res) => {
  const { q } = req.query;
  const filteredDescription = activities.filter(({ description }) => description.includes(q));

  res.status(200).json({ filteredDescription });
});

module.exports = app;
