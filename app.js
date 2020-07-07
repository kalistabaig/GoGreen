//require either returns anything a function can return i.e. number array, obj, function
const express = require('express') //returns in this case a function
const path = require('path')
const mustacheExpress = require('mustache-express')
const database = require('./database')
const bodyParser = require('body-parser');

const app = express() //holds what the function returns which is an object
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))

app.engine('mustache', mustacheExpress()) //setting view engine mustace
app.engine('mustache', mustacheExpress(__dirname + '/views/partials', '.mustache'));
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')





app.get('/', (req, res) => {
    const data = {

        slides: getSlides(),
        products: getProducts(),
        articles: database.getArticles()
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
    const brands = database.getBrands();
    res.render('brands.mustache', {brands});
})

app.get('/trending', (req, res) => {
    res.render('trending.mustache');
})

//Admin

app.get('/admin', (req,res) => {
    res.render('admin/admin.mustache');
})

app.get('/admin/articles', (req,res) => {
    const articles = database.getArticles();
    res.render('admin/articles.mustache', {articles} );
})

app.get('/admin/brands', (req,res) => {
    res.render('admin/brands.mustache');
})

app.get('/admin/addArticle', (req, res) => {
    res.render('admin/addArticle.mustache');

})

app.get('/admin/deleteArticle/:id', (req, res) => {
    const id = req.params.id
    database.deleteArticle(id);
    console.log("Deleted article with id " , id);
    res.redirect('/admin/articles')

})

app.post('/admin/addArticle', (req, res) => {    
    const newArticle ={
        id: req.body.articleId,
        image: req.body.imagePath,
        description: req.body.articleTitle,
        url: req.body.articleUrl
    }
    database.addArticle(newArticle);
    res.redirect('/admin/articles');
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