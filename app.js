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
    const products = getKichenProducts();
    res.render('comparison.mustache',{products, title:"Kitchen Products"});
})

app.get('/bath-and-body', (req, res) => {
    const products = getBBproducts();
    res.render('comparison.mustache', {products, title:"Bath & Body"});
})

app.get('/household-cleaning', (req, res) => {
    const products = getHouseholdProducts();
    res.render('comparison.mustache', {products, title:"Household Products"});
})

app.get('/on-the-go', (req, res) => {
    const products = getOnTheGoProducts();
    res.render('comparison.mustache', {products, title:"On the Go Products"});
})

app.get('/brands', (req, res) => {
    const brands = database.getBrands();
    console.log(brands);
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

function getBBproducts() {
    return [
        {
            badProduct: {
                image: "/img/estee.jpg",
                header: "Big Names in Beauty",
                blurb: `Go Green is a website designed for people who are wanting to learn how to be more environmentally sustainable and do not know where to start.
                Go Green provides resources. such as articles from popular blogs and news outlets on information about how important it is that humans start 
                thinking about more green options, the environmental impact different industries have on our climate, and my more. not only can you find information
                about why it is so important to be sustainable the site also provides information on ways you can make small changes in your everyday life to reduce your
                impact on the environment.`
            }
            ,
            goodProduct: {
                image: "/img/lush.jpg",
                header: "Lush",
                blurb: "Clean beauty without the expense. Lush is an ",
                url: "https://www.lush.ca",
                siteName: "Lush"
            }
        },
        {
            badProduct: {
                image: "/img/loreal.jpg",
                header: "Big Names in Beauty",
                blurb: `Go Green is a website designed for people who are wanting to learn how to be more environmentally sustainable and do not know where to start.
                Go Green provides resources. such as articles from popular blogs and news outlets on information about how important it is that humans start 
                thinking about more green options, the environmental impact different industries have on our climate, and my more. not only can you find information
                about why it is so important to be sustainable the site also provides information on ways you can make small changes in your everyday life to reduce your
                impact on the environment.`
            }
            ,
            goodProduct: {
                image: "/img/rms.jpg",
                header: "Beautiful inside and out",
                blurb: "Clean beauty without the expense. Lush is an ",
                url: "https://www.rmsbeauty.com/",
                siteName: "RMS"
            }
        }
    ]
}

function getHouseholdProducts() {
    return [
        {
            badProduct: {
                image: "/img/toiletpaper.jpg",
                header: "Toilet Paper",
                blurb: `Toilet paper proably is not one of the first products that come to mind when thinking of items that are causing harm to the planet. We use it 
                        flush it and never have to think about it again, but where does it go. After a study done by the Natural Resources Defence council they found that 
                        Big brands like Charmin and Ultra Soft dont use any recycled material but rather get theyre materal from clear cutting the Boreal Forest in Canada. the Boreal forest is an amzinf lush forest often 
                        referred to as the Amazon of the North. This forest is very important as they release a lot of oxygen into the atmosphere. Cleare cutting these areas
                        also disrupt the natural ecosytems already present.  `
            }
            ,
            goodProduct: {
                image: "/img/seventhgen.jpg",
                header: "Eco Friendly Toilet Paper",
                blurb: `Eco friendly Toilet paper, yup we have that too! Its something you use evryday and making th eswitch is easy.you get all the same 
                        perks that uou have from your old toilet paper plus the added benefit that the one you are using is eco friendly. A great brand that is offered in many 
                        retail stores and online is Seventh Generation that has 100% recycled toilet paper! `,
                url: "https://www.seventhgeneration.com/bathroom-tissue-2-ply",
                siteName: "Seventh Generation"
            }
        },
        {
            badProduct: {
                image: "/img/cleaningproducts.jpg",
                header: "Cleaning Supplies",
                blurb: `So many cleaning supplies on the market are full with harsh chemicals that are not only bad for the environemtn but are bad for people to. They are products that are 
                        key in any home and thus this industry generates a lot of waste from these plastic products people keep reusing. Its a commmon micponception that these chemical rich
                        options are going to do a better job at cleaning becaus ethey have these chemicals. In fact they do not and the green options that are on the market clean just as well AND have the added 
                        benefit of being not as harsh.`
            }
            ,
            goodProduct: {
                image: "/img/cleancleaning.jpg",
                header: "Clean Cleaning",
                blurb: ` The products you use to ensure your personal space is clean should be as clean as the home your trying to keep clean. Their are many brands
                out there that you can choose from depending on your specific needs. A popular brand is Blueland's 'The Clean up Kit'. 
                Using this product, you won't be contributing to landfill waste becasu the cleaning bottle is resuable. Simply fill the bottle with water, and the cleaning solution
                and clean away. You'll never have to throw the bottle out plus you get multiple uses out of it.`,
                url: "https://www.blueland.com/collections/our-kits/products/the-clean-up-kit?utm_source=RAN&utm_medium=affiliates&utm_campaign=10&utm_content=TnL5HPStwNw&ranMID=44816&ranEAID=TnL5HPStwNw&ranSiteID=TnL5HPStwNw-OWmKgKiHWrzGaX94h3AX5Q",
                siteName: "Blueland"
            }
        }
    ]
}
function getKichenProducts() {
    return [
        {
            badProduct: {
                image: "/img/saranwrap.jpg",
                header: "Saran Wrap",
                blurb: `Saran wrap is almost a stap that you can find in any home. And whle they are a necessity to keep your food fresh 
                        longer they are pure plastic and very harmful for the environment. Plastic does not decompose and it also is costly 
                        becomes costly to have to keep buying. It overall genrates a lot of waste. `
            }
            ,
            goodProduct: {
                image: "/img/beeswaxwrap.jpg",
                header: "Beeswax Wraps",
                blurb: `Make your kitchen more green with these all natural bees wax wraps. They are a great alternative to cling wrap that you have to toss away almost everytime
                        you take your food out of the fridge. With the Bees wax wraps you can not only reduce your plastic use, but they are reusable and can be used multiple times before they start to wear out! Some great ones you can buy are
                        from Nature Bee. You can even try and be more adventerous and make your own, all you need is a thin breathable fabric and some bees wax that you can buy online. Simply spread
                        out the cloth and pur melted bess way on it.`,
                url: "https://www.naturebeewraps.ca",
                siteName: "Nature Bees Wraps"
            }
        },
        {
            badProduct: {
                image: "/img/plasticbags.jpg",
                header: "Plastic Produce Bags",
                blurb: `When shppping for your fruits and vegetables there shouldnt e so much plstic involved. Supermarkets these days seem to be increasing their plastic use with not only having th eplastic produce produce
                        bags but also wrapping fresly cut fruit in them, then putting more plastic to keep them in a bag. Single wrapped plastic items all inside another plastic bag. these are the kinds of plastic bags, and i speak from experience, that many people
                        take with them home to use for other things like garbage. single use plastic bags like these are what end up in the ocean. `
            }
            ,
            goodProduct: {
                image: "/img/producebags.jpg",
                header: "Reusable Produce Bags",
                blurb: `Using a reusable produce bag is one of the easiest and cheapest way to be more eco-friendly. Theyre convenient to carry around in a purse or backpack
                        so they are always on you. These bags usually cost $5 and can be bought in many places. A popular option is Ikea's Kungfors bag`,
                url: "https://www.ikea.com/us/en/p/kungsfors-mesh-bag-set-of-2-natural-20372834/",
                siteName: "Ikea"
            }
        }
    ]
}

function getOnTheGoProducts() {
    return [
        {
            badProduct: {
                image: "/img/plasticstraws.jpg",
                header: "Plastic Straws",
                blurb: `Go Green is a website designed for people who are wanting to learn how to be more environmentally sustainable and do not know where to start.
                        Go Green provides resources. such as articles from popular blogs and news outlets on information about how important it is that humans start 
                        thinking about more green options, the environmental impact different industries have on our climate, and my more. not only can you find information
                        about why it is so important to be sustainable the site also provides information on ways you can make small changes in your everyday life to reduce your
                        impact on the environment.`
            }
            ,
            goodProduct: {
                image: "/img/straws.jpg",
                header: "Resuable Straws",
                blurb: `Go Green is a website designed for people who are wanting to learn how to be more environmentally sustainable and do not know where to start.
                Go Green provides resources. such as articles from popular blogs and news outlets on information about how important it is that humans start 
                thinking about more green options, the environmental impact different industries have on our climate, and my more. not only can you find information
                about why it is so important to be sustainable the site also provides information on ways you can make small changes in your everyday life to reduce your
                impact on the environment. Checkout the different straws from bamboo to stainless steel that Straw hut Co has to offer.`,
                url: "https://strawhutco.com",
                siteName: "Starw Hut Co."
            }
        },
        {
            badProduct: {
                image: "/img/plasticbags.jpg",
                header: "Plastic bags",
                blurb: `Simply put plastic bags are one of the worst kinds of forms of plastic. People are careless and litter them when they are done resulting them to harm surrounding wild life. They end up in our
                        oceans polluting them. We are ingrained to use them for everything but with small steps and a lot of work from companies and evryday people we can cut down how much 
                        they are used.`
            }
            ,
            goodProduct: {
                image: "/img/resuablebags.jpg",
                header: "Resuable Bag",
                blurb: `You cant escape the plastic bag, whether your in the shopping mall or the grocery store, plastic bags are the main 
                        kind of bags people use in selling. Its important that we cut down our use of single use plastics as they end up sitting in land fills for hundreds of years.
                        While some companies are making the move from plastic to paper, somsumers also can play a role in reducing the use of these kinds of plastic bags by shopping 
                        with a reusable bag. Reusables bags are eco-friendly with many  designed from upcycled plastic or all sustainable resourced fabrics, but they are also conveniant.
                        Many these days are designed for the person on the go. they are compact to fit in a purse, pocket or backpack but un fold to be quite large. its an easy and cheap way
                        be eco-friendly. Cute reusable bags can be bought almost anywhere now, checkout Baggu's wide variety.`,
                url: "https://baggu.com/collections/reusable-bags",
                siteName: "Baggu"
            }
        }
    ]

}

app.listen(port, () => console.log('Example app listening at port 3000'))