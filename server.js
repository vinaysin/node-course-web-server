const express = require('express'); 
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}\n`;
    fs.appendFile('server.log', log, (error) => {
        if (error) {
            console.log('Unable to write log.');
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         message: 'Site is under maintenance. Will be right back.'
//     });
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request.'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port: 3000');
});