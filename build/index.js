'use strict';

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _ioredis = require('ioredis');

var _ioredis2 = _interopRequireDefault(_ioredis);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);

app.use((0, _helmet2.default)());

var redis = new _ioredis2.default();

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

http.listen(_env2.default.port, function () {
  console.log('listening on *: ' + _env2.default.port);
});
//# sourceMappingURL=index.js.map