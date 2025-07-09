const http = require('http');
const fs = require('fs');
const _ = require('./utils.js');

const server = http.createServer((req, res) => {
	if (!_.getStatus(req.url) && !_.getSleep(req.url)) {
		fs.createReadStream('./index.html').pipe(res);
	} else {
		_.wait(req.url).then(() => {
			res.setHeader('Content-Type', 'application/json');
			res.statusCode = _.getStatus(req.url) || 200;
			res.end(_.response(req.method, req.url));
		});
	}
});

server.listen(80);
