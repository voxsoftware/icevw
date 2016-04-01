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
	var Icevw= __webpack_require__(2).default
	var icevw= core.org.icevw
	icevw.client.Icevw= Icevw
	exports.default= Icevw

/***/ },
/* 1 */
/***/ function(module, exports) {

	core.org= core.org||{}
	var icevw= core.org.icevw= core.org.icevw||{}
	icevw.client= icevw.client||{}
	module.exports= exports= icevw

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var uniqid = __webpack_require__(3);
	var Func = __webpack_require__(4).default;
	var $ = core.VW.Web.JQuery;
	var root = {};
	var vox = core.VW.Web.Vox;
	if (typeof window == 'object')
	    root = window;
	{
	    var Icevw = function Icevw() {
	        Icevw.constructor ? Icevw.constructor.apply(this, arguments) : Icevw.$super && Icevw.$super.constructor.apply(this, arguments);
	    };
	    Icevw.constructor = function () {
	        this.url = 'http://localhost:49671';
	        this.uid = uniqid();
	        this.Funcs = {};
	        this.init();
	    };
	    Icevw.prototype.hab = function () {
	        var self = this;
	        var task = this.apiCall('??');
	        task.oncomplete = function () {
	            if (task.exception) {
	                console.error('Error al poner la aplicación como activa: ', task.exception);
	            }
	            setTimeout(function () {
	                self.hab();
	            }, 15000);
	        };
	    };
	    Icevw.prototype.apiCall = function (method, args) {
	        var req = new core.VW.Http.Request(this.url + '/api/call');
	        req.method = 'POST';
	        req.body = {
	            'method': method,
	            'uid': this.uid,
	            'arguments': JSON.stringify(args || [])
	        };
	        var task = vox.platform.getJsonResponseAsync(req);
	        return task;
	    };
	    Icevw.prototype.adquire = function (args) {
	        var task = new core.VW.Task();
	        var self = this;
	        var url = args.url || '';
	        if (url.substring(0, 7) != 'http://' && url.substring(0, 8) != 'https://' && url.substring(0, 5) != 'ws://') {
	            url = location.origin + '/' + url;
	        }
	        var spars = [];
	        spars.push('domain=' + encodeURIComponent(location.origin));
	        spars.push('&');
	        spars.push('url=' + encodeURIComponent(url));
	        spars.push('&');
	        spars.push('uid=' + self.uid);
	        spars.push('&');
	        spars.push('app=' + args.app);
	        var iframe = self.iframe;
	        iframe.attr('src', self.url + '/require?' + spars.join(''));
	        iframe.css('width', '100%');
	        iframe.css('height', '100%');
	        iframe.css('position', 'fixed');
	        iframe.css('top', '0');
	        iframe.css('left', '0');
	        iframe.css('z-index', '99999');
	        iframe.show();
	        if (this.callback && this.callback.task) {
	            var t = this.callback.task;
	            if (t.executing) {
	                t.cancel();
	            }
	        }
	        this.callback = function (er, data) {
	            if (er) {
	                task.exception = er;
	            } else {
	                task.result = data;
	            }
	            task.finish();
	        };
	        this.callback.task = task;
	        return task;
	    };
	    Icevw.prototype.func = function (name) {
	        var f = this.Funcs;
	        if (!f[name]) {
	            f[name] = new Func(this, name);
	        }
	        return f[name];
	    };
	    Icevw.prototype.init = function () {
	        this.iframe = $('<iframe>');
	        this.iframe.hide();
	        this.iframe.css('border', 'none');
	        $('body').append(this.iframe);
	        root.addEventListener('message', function (self$0) {
	            return function (event) {
	                if (event.origin == self$0.url) {
	                    var data = JSON.parse(event.data);
	                    if (data.type == 'icevw.notauthorized') {
	                        var er = new core.System.Exception(data.error);
	                        er.type = data.type;
	                        self$0.iframe.hide();
	                        return self$0.callback(er);
	                    } else if (data.type == 'icevw.adquireerror') {
	                        var er = data.error;
	                        if (!er.message) {
	                            er = new core.System.Exception(er);
	                        }
	                        er.type = data.type;
	                        self$0.iframe.hide();
	                        return self$0.callback(er);
	                    } else if (data.type == 'icevw.adquiredandloaded') {
	                        self$0.iframe.hide();
	                        self$0.hab();
	                        return self$0.callback(undefined, data.data);
	                    }
	                }
	            };
	        }(this));
	    };
	}
	exports.default = Icevw;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* 
	(The MIT License)

	Copyright (c) 2014 Halász Ádám <mail@adamhalasz.com>

	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/

	// Unique Hexatridecimal ID Generator
	module.exports = function(){
		var time = new Date().getTime();
		while (time == new Date().getTime());
		return new Date().getTime().toString(36);
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	{
	    var Func = function Func() {
	        Func.constructor ? Func.constructor.apply(this, arguments) : Func.$super && Func.$super.constructor.apply(this, arguments);
	    };
	    Func.constructor = function (icevw, name, prefix) {
	        this.icevw = icevw;
	        this.name = name;
	        this.prefix = prefix || '';
	    };
	    Func.prototype.__defineGetter__('invoke', function () {
	        if (this.$func)
	            return this.$func;
	        var self = this;
	        var icevw = this.icevw;
	        return this.$func = function () {
	            var args = Array.prototype.slice.call(arguments, 0, arguments.length);
	            return icevw.apiCall(self.prefix + self.name, args);
	        };
	    });
	}
	exports.default = Func;

/***/ }
/******/ ]);