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

        slides: getSlides(),
        products: getProducts()
    }

    res.render('index.mustache', data)
})
app.get('/kitchen', (req, res) => {
    res.render('kitchen.mustache');
})

app.get('/bath-and-body', (req, res) => {
    res.render('bathAndBody.mustache');
})

app.get('/household-cleaning', (req, res) => {
    res.render('houseCleaning.mustache');
})

app.get('/on-the-go', (req, res) => {
    res.render('onTheGo.mustache');
})

app.get('/brands', (req, res) => {
    res.render('brands.mustache');
})

function getSlides() {
    
    return [
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

function getProducts() {
    return [
        {
            image: "/img/tide.jpg", 
            description: "Tide Original Laundry Detergent"
        },
        {   
            image: "/img/windex.png", 
            description: "Windex Glass Cleaner"
        },
        {   
            image: "/img/bounty.png", 
            description: "Paper Towel"
        },
        {
            image: '/img/plasticBag.png',
            description: 'Grocery Bags'
        },
        {
            image: "/img/tide.jpg", 
            description: "Tide Original Laundry Detergent"
        },
        {   
            image: "/img/windex.png", 
            description: "Windex Glass Cleaner"
        },
        {   
            image: "/img/bounty.png", 
            description: "Paper Towel"
        },
        {
            image: '/img/plasticBag.png',
            description: 'Grocery Bags'
        }
    ]

}
app.listen(port, () => console.log('Example app listening at port 3000'))