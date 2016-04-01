/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	var Require= __webpack_require__(2).default
	var icevw= core.org.icevw
	icevw.client.Require= Require
	exports.default= Require

/***/ },
/* 1 */
/***/ function(module, exports) {

	core.org= core.org||{}
	var icevw= core.org.icevw= core.org.icevw||{}
	icevw.client= icevw.client||{}
	module.exports= exports= icevw

/***/ },
/* 2 */
/***/ function(module, exports) {

	var vox = core.VW.Web.Vox;
	{
	    var Require = function Require() {
	        Require.constructor ? Require.constructor.apply(this, arguments) : Require.$super && Require.$super.constructor.apply(this, arguments);
	    };
	    Require.constructor = function () {
	        this.initEvents();
	    };
	    Require.prototype.start = function () {
	        var self = this;
	        var form = this.form = $('.modal form');
	        form.find('[name]').each(function () {
	            this.value = self.arguments[this.name];
	        });
	        if (self.arguments.enabled) {
	            self.load();
	        }
	        $('.modal').voxmodal()[0].open();
	    };
	    Require.prototype.load = function callee$0$0() {
	        var self, req;
	        return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
	            while (1)
	                switch (context$1$0.prev = context$1$0.next) {
	                case 0:
	                    $('.modal .load').show();
	                    $('.modal a').hide();
	                    self = this;
	                    req = new core.VW.Http.Request('/api/load');
	                    req.body = self.arguments;
	                    req.method = 'POST';
	                    context$1$0.prev = 6;
	                    context$1$0.next = 9;
	                    return regeneratorRuntime.awrap(vox.platform.getJsonResponseAsync(req));
	                case 9:
	                    response = context$1$0.sent;
	                    context$1$0.next = 17;
	                    break;
	                case 12:
	                    context$1$0.prev = 12;
	                    context$1$0.t0 = context$1$0['catch'](6);
	                    $('.modal').voxmodal()[0].close();
	                    window.parent.postMessage(JSON.stringify({
	                        'type': 'icevw.adquireerror',
	                        'error': context$1$0.t0
	                    }), self.arguments.domain);
	                    return context$1$0.abrupt('return', false);
	                case 17:
	                    window.parent.postMessage(JSON.stringify({
	                        'type': 'icevw.adquiredandloaded',
	                        'data': response
	                    }), self.arguments.domain);
	                    return context$1$0.abrupt('return', true);
	                case 19:
	                case 'end':
	                    return context$1$0.stop();
	                }
	        }, null, this, [[
	                6,
	                12
	            ]]);
	    };
	    Require.prototype.initEvents = function () {
	        this.events = {};
	        var self = this;
	        this.events.permitir = function callee$0$0() {
	            var req, response;
	            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
	                while (1)
	                    switch (context$1$0.prev = context$1$0.next) {
	                    case 0:
	                        context$1$0.prev = 0;
	                        req = new core.VW.Http.Request();
	                        req.form = self.form;
	                        context$1$0.next = 5;
	                        return regeneratorRuntime.awrap(vox.platform.getJsonResponseAsync(req));
	                    case 5:
	                        response = context$1$0.sent;
	                        window.parent.postMessage(JSON.stringify({
	                            'type': 'icevw.adquired',
	                            'data': response
	                        }), self.arguments.domain);
	                        context$1$0.next = 9;
	                        return regeneratorRuntime.awrap(self.load());
	                    case 9:
	                        context$1$0.next = 15;
	                        break;
	                    case 11:
	                        context$1$0.prev = 11;
	                        context$1$0.t0 = context$1$0['catch'](0);
	                        $('.modal').voxmodal()[0].close();
	                        window.parent.postMessage(JSON.stringify({
	                            'type': 'icevw.adquireerror',
	                            'error': context$1$0.t0
	                        }), self.arguments.domain);
	                    case 15:
	                    case 'end':
	                        return context$1$0.stop();
	                    }
	            }, null, this, [[
	                    0,
	                    11
	                ]]);
	        };
	        this.events.nopermitir = function () {
	            $('.modal').voxmodal()[0].close();
	            window.parent.postMessage(JSON.stringify({
	                'type': 'icevw.notauthorized',
	                'error': 'No fue autorizado para ejecutar ICEVW'
	            }), self.arguments.domain);
	        };
	    };
	}
	exports.default = Require;

/***/ }
/******/ ]);