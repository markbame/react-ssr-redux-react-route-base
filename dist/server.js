'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRedux = require('react-redux');

var _configureStore = require('../src/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _renderFullHTMLPage = require('../renderFullHTMLPage');

var _renderFullHTMLPage2 = _interopRequireDefault(_renderFullHTMLPage);

var _app = require('../src/components/app');

var _app2 = _interopRequireDefault(_app);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var server = (0, _express2.default)();
server.disable('x-powered-by');
server.use('/images', _express2.default.static(_path2.default.join(__dirname, '../src/assets/images')));
server.use('/scripts', _express2.default.static('built'));
server.use('/styles', _express2.default.static('lib'));
server.use('/built', _express2.default.static(_path2.default.join(__dirname, 'built')));
server.use('/built', _express2.default.static('built'));
server.use(_express2.default.static(_path2.default.join(__dirname, '../')));
server.get('/favicon.ico', function (req, res) {
  return res.send('');
});

server.get('*', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
    var data, store, intialHTML, state;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = {};

            try {
              _axios2.default.get('http://api.tvmaze.com/search/shows?q=girls').then(function (res) {
                data = { shows: res.data };
                console.log(res.data);
              }).catch(function (error) {
                console.log(error);
              });
              store = (0, _configureStore2.default)({ data: data });
              intialHTML = (0, _server.renderToString)(_react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(_app2.default, null)
              ));
              state = store.getState();


              res.send((0, _renderFullHTMLPage2.default)(intialHTML, state));
            } catch (err) {
              /* eslint-disable */
              console.error('error', err);
              /* eslint-enable */

              res.status(500).send('' + err);
            }

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var PORT = process.env.PORT || 3000;

server.listen(PORT, function () {
  return console.log('listening on ', PORT);
});