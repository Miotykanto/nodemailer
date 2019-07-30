var express = require('express')
var app = express.Router();
var controller =require( '../controler/controler.js')


module.exports.route=function (app){

    app.route('/list')
        .post(controller.Postliste)
        .get(controller.GetListe)
  

}


module.exports = app;