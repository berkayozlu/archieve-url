const express = require('express')
var webshot = require('webshot');
var fs = require('fs');
var bodyParser = require('body-parser');

const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views','./views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pics'))

app.get('/',function(req,res){

    res.render('main');
});

app.use('/pics', express.static('pics'))

app.post('/saveURL',function(req,res){
    console.log(req.body.URLAddress)
    var urlName = req.body.URLAddress
    var photo = Math.floor(new Date() / 1000)
    var renderStream = webshot(urlName);
    var file = fs.createWriteStream('pics/' + photo + '.png', {encoding: 'binary'});
    
    renderStream.on('data', function(data) {
      file.write(data.toString('binary'), 'binary');
    });
    var degisken = './pics/' + photo + '.png'
    console.log(degisken)
    res.render('photo',{degisken:degisken});

});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))