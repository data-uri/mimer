var http      = require("http"),
    url       = require("url"),
    path      = require("path"),
    fs        = require("fs"),
    mimer     = require('../mimer'),
    spawn     = require('child_process').spawn,
    port      = 3637,
    readline  = require('readline'),
    phantomjs = null;

http.createServer(function(request, response) {

  var uri = url.parse(request.url).pathname
    , filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) filename += '/index.html';

    fs.readFile(filename, "binary", function(err, file) {
      if(err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200, {"Content-Type": mimer(filename)});

      response.write(file, "binary");
      response.end();
    });
  });
}).listen(parseInt(port, 10));

phantomjs = spawn(path.join(__dirname, '../node_modules/.bin/phantomjs'), ['test/phantom.js', 'http://localhost:' + port + '/test/' + process.argv[2] + '.html']);

readline.createInterface({
  input     : phantomjs.stdout,
  terminal  : false
}).on('line', function(line) {
  console.log(line);
});

phantomjs.on('close', function (code) {
  process.exit(code);
});
