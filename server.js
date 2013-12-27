var express = require('express'),
    http = require('http'),
    app = express();

app.set('port', process.env.PORT || 8000);

app.get('/:name/:version/:type/:file', function (req, res) {
    var address = {
        name: req.params.name,
        version: req.params.version,
        type: req.params.type,
        file: req.params.file
    };
    res.sendfile(__dirname + '/static/' + adress.name + '/' + adress.type + '/' + adress.file);
});

app.get('/', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendfile(__dirname + '/server/index.html');
});

app.get('/robots.txt', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.sendfile(__dirname + '/server/robots.txt');
});

app.use(function (req, res) {
    res.status(404);
    res.set('Content-Type', 'text/html');
    res.sendfile(__dirname + '/server/404.html');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Server listen on port ' + app.get('port'));
});


//function checkHost(host){
//    var response = true;
//    if(host != 'st.worldfly.org' || host != 'st.worldfly.info' || host != 'st.p.worldfly.org'){
//        response = false;
//    }
//    return response;
//}