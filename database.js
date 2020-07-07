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
    let removedArticleIndex = articles.findIndex(function(article){
        return article.id == id;
    });
    console.log('removed article has index ', removedArticleIndex);
    articles.splice(removedArticleIndex,1);
}

exports.addArticle = function(newArticleObj) {
    articles.push(newArticleObj);
}


