const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const cors = require('cors')
const { request } = require('express')
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'dads',
    dadsCollection

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        dadsCollection = db.collection('bDays')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.get('/', async (req, res)=>{
    try{
    const users = await dadsCollection.find().toArray()
    const ages = []
    for (let user of users){
        ages.push(calcAge(user.bDay))
    }

    res.render('index.ejs', {users: users, ages: ages})
    } catch{
        console.error('error! Get request failed.')
    }
})

app.post('/addBDay', (req, res)=> {
    if( !req.body.userName || !req.body.dadName || req.body.dadBDay==='Invalid Date'){
        console.log('you done fucked up')
        res.redirect('/')
    }else{
    
    dadsCollection.insertOne({userName: req.body.userName, dadName: req.body.dadName, bDay: req.body.dadBDay})

    .then(result =>{
        console.log('Dad Added')
        res.redirect('/')
    })
    .catch(error => console.error('post request fucked up!'))
    }
})

app.delete('/deleteItem', (req, res)=>{
    dadsCollection.deleteOne({dadName: req.body.itemFromJS})
    .then(result =>{
        console.log('dad deleted')
        res.json('dad deleted')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})

function calcAge(bday){
    bday = new Date(bday + 'T12:00:00');
    let today = new Date();
    let age = today.getFullYear() - bday.getFullYear();;
    let m = today.getMonth() - bday.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < bday.getDate())) {
        age--;
    }
    return age;
}