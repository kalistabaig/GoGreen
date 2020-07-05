const fs = require('fs'); //file system - used to interat with file system on computer
const databaseFilename =  './database/database.json'
const db = loadDatabase();
const {brandSites, articles} = db

function loadDatabase() {
    try {
        return JSON.parse(fs.readFileSync(databaseFilename))
    } catch (err) {
        console.error(err)
    }
}

exports.getBrands = function() {
    return brandSites;
}

exports.getArticles = function() {
    return articles;
}

exports.deleteArticle = function(id) {
    let i; 

    for(i =0; i<articles.length; i++) {
        if(articles[i].id == id ) {
            articles.splice(i,1);
        } 
    }
}


