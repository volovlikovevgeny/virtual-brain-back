const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { json } = require('body-parser');
const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1', //localhost
        user: 'postgres',
        password: 'evgeny1997',
        database: 'smart-brain'
    }
});

// const database = [
//     users = {
//         name: 'evgeny'
//     }
// ]

db.select('*').from('users').then(data => {
    console.log(data);
})

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send(db.users) })
app.post('/signin', (req, res) => { signin.handlesignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleprofileget(req, res, db) })
app.put('/image', (req, res) => { image.handleimage(req, res, db) })

app.listen(3001)


// --> this is working +
// /signin --> post = success/fail
// /register --> post = user
// /profile/:userId --> get = user
// /image --> put --> user