/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	var _path = __webpack_require__(2);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _hapi = __webpack_require__(3);
	
	var _hapi2 = _interopRequireDefault(_hapi);
	
	var _libRoutes = __webpack_require__(4);
	
	var _libRoutes2 = _interopRequireDefault(_libRoutes);
	
	var _libPlugins = __webpack_require__(5);
	
	var _libPlugins2 = _interopRequireDefault(_libPlugins);
	
	var server = new _hapi2['default'].Server();
	var PORT = process.env.PORT || 8000;
	
	function handleRegisterErrors(err) {
	  if (err) {
	    throw err;
	  }
	}
	
	server.connection({
	  host: 'localhost',
	  port: PORT
	});
	
	server.views({
	  engines: {
	    html: __webpack_require__(8)
	  },
	  path: _path2['default'].join(process.cwd(), 'src', 'views'),
	  isCached: true
	});
	
	// Serve the routes
	server.route(_libRoutes2['default']);
	
	// Register the plugins
	server.register(_libPlugins2['default'], handleRegisterErrors);
	
	server.start(function () {
	  console.log('Running app on ' + server.info.uri);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("hapi");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	var _path = __webpack_require__(2);
	
	var _path2 = _interopRequireDefault(_path);
	
	module.exports = [
	// Client routes
	{
	  method: 'GET',
	  path: '/',
	  handler: function handler(request, reply) {
	    reply.view('index.html');
	  }
	},
	
	// Serve static assets
	{
	  method: 'GET',
	  path: '/{path*}',
	  handler: {
	    directory: {
	      path: [_path2['default'].join(process.cwd(), 'dist'), _path2['default'].join(process.cwd(), 'public')]
	    }
	  }
	}];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(1)['default'];
	
	var _good = __webpack_require__(6);
	
	var _good2 = _interopRequireDefault(_good);
	
	module.exports = [{
	  register: _good2['default'],
	  options: {
	    reporters: [{
	      reporter: __webpack_require__(7),
	      events: {
	        response: '*',
	        log: '*'
	      }
	    }]
	  }
	}];

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("good");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("good-console");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("handlebars");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzE5OWRjOTcwMWMxYmFjMjlkZDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaGFwaVwiIiwid2VicGFjazovLy8uL2xpYi9yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3BsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZ29vZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImdvb2QtY29uc29sZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImhhbmRsZWJhcnNcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7aUNDdENpQixDQUFNOzs7O2lDQUNOLENBQU07Ozs7c0NBQ0osQ0FBZTs7Ozt1Q0FDZCxDQUFnQjs7OztBQUVwQyxLQUFJLE1BQU0sR0FBRyxJQUFJLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQy9CLEtBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQzs7QUFFcEMsVUFBUyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUU7QUFDakMsT0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFNLEdBQUcsQ0FBQztJQUNYO0VBQ0Y7O0FBRUQsT0FBTSxDQUFDLFVBQVUsQ0FBQztBQUNoQixPQUFJLEVBQUUsV0FBVztBQUNqQixPQUFJLEVBQUUsSUFBSTtFQUNYLENBQUMsQ0FBQzs7QUFFSCxPQUFNLENBQUMsS0FBSyxDQUFDO0FBQ1gsVUFBTyxFQUFFO0FBQ1AsU0FBSSxFQUFFLG1CQUFPLENBQUMsQ0FBWSxDQUFDO0lBQzVCO0FBQ0QsT0FBSSxFQUFFLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztBQUM5QyxXQUFRLEVBQUUsSUFBSTtFQUNmLENBQUMsQ0FBQzs7O0FBR0gsT0FBTSxDQUFDLEtBQUssd0JBQVEsQ0FBQzs7O0FBR3JCLE9BQU0sQ0FBQyxRQUFRLDBCQUFVLG9CQUFvQixDQUFDLENBQUM7O0FBRS9DLE9BQU0sQ0FBQyxLQUFLLENBQUMsWUFBTTtBQUNqQixVQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDbEQsQ0FBQyxDOzs7Ozs7QUNuQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQjs7Ozs7O0FDUkEsa0M7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7O2lDQ0FpQixDQUFNOzs7O0FBRXZCLE9BQU0sQ0FBQyxPQUFPLEdBQUc7O0FBRWY7QUFDRSxTQUFNLEVBQUUsS0FBSztBQUNiLE9BQUksRUFBRSxHQUFHO0FBQ1QsVUFBTyxtQkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3RCLFVBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUI7RUFDRjs7O0FBR0Q7QUFDRSxTQUFNLEVBQUUsS0FBSztBQUNiLE9BQUksRUFBRSxVQUFVO0FBQ2hCLFVBQU8sRUFBRTtBQUNQLGNBQVMsRUFBRTtBQUNULFdBQUksRUFBRSxDQUNKLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQ2hDLGtCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQ25DO01BQ0Y7SUFDRjtFQUNGLENBQ0YsQzs7Ozs7Ozs7OztpQ0N6QmdCLENBQU07Ozs7QUFFdkIsT0FBTSxDQUFDLE9BQU8sR0FBRyxDQUNmO0FBQ0UsV0FBUSxtQkFBTTtBQUNkLFVBQU8sRUFBRTtBQUNQLGNBQVMsRUFBRSxDQUFDO0FBQ1YsZUFBUSxFQUFFLG1CQUFPLENBQUMsQ0FBYyxDQUFDO0FBQ2pDLGFBQU0sRUFBRTtBQUNOLGlCQUFRLEVBQUUsR0FBRztBQUNiLFlBQUcsRUFBRSxHQUFHO1FBQ1Q7TUFDRixDQUFDO0lBQ0g7RUFDRixDQUNGLEM7Ozs7OztBQ2ZELGtDOzs7Ozs7QUNBQSwwQzs7Ozs7O0FDQUEsd0MiLCJmaWxlIjoic2VydmVyX2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzE5OWRjOTcwMWMxYmFjMjlkZDZcbiAqKi8iLCJpbXBvcnQgUGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBIYXBpIGZyb20gJ2hhcGknO1xuaW1wb3J0IFJvdXRlcyBmcm9tICcuLi9saWIvcm91dGVzJztcbmltcG9ydCBQbHVnaW5zIGZyb20gJy4uL2xpYi9wbHVnaW5zJztcblxubGV0IHNlcnZlciA9IG5ldyBIYXBpLlNlcnZlcigpO1xubGV0IFBPUlQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDgwMDA7XG5cbmZ1bmN0aW9uIGhhbmRsZVJlZ2lzdGVyRXJyb3JzKGVycikge1xuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbnNlcnZlci5jb25uZWN0aW9uKHtcbiAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gIHBvcnQ6IFBPUlRcbn0pO1xuXG5zZXJ2ZXIudmlld3Moe1xuICBlbmdpbmVzOiB7XG4gICAgaHRtbDogcmVxdWlyZSgnaGFuZGxlYmFycycpXG4gIH0sXG4gIHBhdGg6IFBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnc3JjJywgJ3ZpZXdzJyksXG4gIGlzQ2FjaGVkOiB0cnVlXG59KTtcblxuLy8gU2VydmUgdGhlIHJvdXRlc1xuc2VydmVyLnJvdXRlKFJvdXRlcyk7XG5cbi8vIFJlZ2lzdGVyIHRoZSBwbHVnaW5zXG5zZXJ2ZXIucmVnaXN0ZXIoUGx1Z2lucywgaGFuZGxlUmVnaXN0ZXJFcnJvcnMpO1xuXG5zZXJ2ZXIuc3RhcnQoKCkgPT4ge1xuICBjb25zb2xlLmxvZygnUnVubmluZyBhcHAgb24gJyArIHNlcnZlci5pbmZvLnVyaSk7XG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NlcnZlci5qc1xuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICBcImRlZmF1bHRcIjogb2JqXG4gIH07XG59O1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbnRlcm9wLXJlcXVpcmUtZGVmYXVsdC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInBhdGhcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhhcGlcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImhhcGlcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gQ2xpZW50IHJvdXRlc1xuICB7XG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBwYXRoOiAnLycsXG4gICAgaGFuZGxlcihyZXF1ZXN0LCByZXBseSkge1xuICAgICAgcmVwbHkudmlldygnaW5kZXguaHRtbCcpO1xuICAgIH1cbiAgfSxcblxuICAvLyBTZXJ2ZSBzdGF0aWMgYXNzZXRzXG4gIHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHBhdGg6ICcve3BhdGgqfScsXG4gICAgaGFuZGxlcjoge1xuICAgICAgZGlyZWN0b3J5OiB7XG4gICAgICAgIHBhdGg6IFtcbiAgICAgICAgICBQYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2Rpc3QnKSxcbiAgICAgICAgICBQYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycpXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9XG4gIH1cbl07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9yb3V0ZXMuanNcbiAqKi8iLCJpbXBvcnQgR29vZCBmcm9tICdnb29kJztcblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gIHtcbiAgICByZWdpc3RlcjogR29vZCxcbiAgICBvcHRpb25zOiB7XG4gICAgICByZXBvcnRlcnM6IFt7XG4gICAgICAgIHJlcG9ydGVyOiByZXF1aXJlKCdnb29kLWNvbnNvbGUnKSxcbiAgICAgICAgZXZlbnRzOiB7XG4gICAgICAgICAgcmVzcG9uc2U6ICcqJyxcbiAgICAgICAgICBsb2c6ICcqJ1xuICAgICAgICB9XG4gICAgICB9XVxuICAgIH1cbiAgfVxuXTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3BsdWdpbnMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29kXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJnb29kXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnb29kLWNvbnNvbGVcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImdvb2QtY29uc29sZVwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaGFuZGxlYmFyc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiaGFuZGxlYmFyc1wiXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==