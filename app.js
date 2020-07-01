//require either returns anything a function can return i.e. number array, obj, function
const express = require('express') //returns in this case a function
const path = require('path')
const mustacheExpress = require('mustache-express')
const app = express() //holds what the function returns which is an object
const port = 3000

app.use(express.static('public'))

app.engine('mustache', mustacheExpress()) //setting view engine mustace
app.engine('mustache', mustacheExpress(__dirname + '/views/partials', '.mustache'));
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')





app.get('/', (req, res) => {
    const data = {
        slides: [
            {
                image: "/img/buyLocal.jpg", 
                blurb: "SHOP LOCAL"
            },
            {   
                image: "/img/greenCleaning.jpg", 
                blurb: "CLEAN CLEANER"
            },
            {   
                image: "/img/tinyHome.png", 
                blurb: "SUSTAINABLE LIVING"
            }
        ]
    }

    res.render('index.mustache', data)
})
app.get('/kitchen', (req, res) => {
    res.render('kitchen.mustache');
})

app.listen(port, () => console.log('Example app listening at port 3000'))