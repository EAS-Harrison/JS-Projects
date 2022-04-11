const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app')
const morgan = require('morgan')
const path = require('path')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, './PluralsightTasks/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Globalmantics', data: ['a', 'b', 'c'] });
})
app.listen(3000, () => {
    debug(`listening to port ${chalk.green(PORT)}`)
})
