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

function saveDatabase() {
    fs.writeFileSync(databaseFilename, JSON.stringify(db, null, 2))
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
    saveDatabase();
}

exports.addArticle = function(newArticle) {
    newArticle.id = getNewId();
    articles.push(newArticle);
    saveDatabase();
}

function getNewId() {
    let i;
    let biggestId = 0;

    for (i = 0; i < articles.length; i++) {
        if (articles[i].id > biggestId) {
            biggestId = articles[i].id;
        }
    }
    let newId = biggestId + 1;

    return newId;
}


