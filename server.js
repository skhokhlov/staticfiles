var express = require('express'),
    http = require('http'),
    app = express(),
    colors = require('colors');

app.set('port', process.env.PORT || 8000);

app.get('/:name/:version/:type/:file', function (req, res) {
    var adress = {
        name: req.params.name,
        version: req.params.version,
        type: req.params.type,
        file: req.params.file
    };
    if (req.originalUrl.length <= 50) {
        res.sendfile(__dirname + '/static/' + adress.name + '/' + adress.type + '/' + adress.file);
        console.log(req.method.cyan + ' ' + req.path + ' 200'.green)
    } else {
        error414(req, res);
    }
    console.log()
});

app.get('/', function (req, res) {
    if (req.originalUrl.length <= 40) {
        res.set('Content-Type', 'text/html')
            .sendfile(__dirname + '/server/index.html');
        console.log(req.method.cyan + ' ' + req.path + ' 200'.green)
    } else {
        error414(req, res);
    }
});

app.get('/robots.txt', function (req, res) {
    if (req.originalUrl.length <= 40) {
        res.set('Content-Type', 'text/plain')
            .sendfile(__dirname + '/server/robots.txt');
        console.log(req.method.cyan + ' ' + req.path + ' 200'.green)
    } else {
        error414(req, res);
    }
});

app.use(function (req, res) {
    if (req.originalUrl.length <= 40) {
        res.status(404)
            .set('Content-Type', 'text/html')
            .sendfile(__dirname + '/server/404.html');
        console.log(req.method.cyan + ' ' + req.path + ' 404'.red)
    } else {
        error414(req, res);
    }
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

function error414(req, res) {
    res.set('Content-Type', 'text/html')
        .status(414)
        .sendfile(__dirname + '/server/414.html');
    console.log(req.method.cyan + ' ' + req.path + ' 414'.yellow);
}