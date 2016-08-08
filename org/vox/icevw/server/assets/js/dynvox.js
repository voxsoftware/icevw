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

	{
	    var VoxScope = function VoxScope() {
	        VoxScope.$constructor ? VoxScope.$constructor.apply(this, arguments) : VoxScope.$superClass && VoxScope.$superClass.apply(this, arguments);
	    };
	    VoxScope.__defineGetter__('Observable', function () {
	        return __webpack_require__(1).default;
	    });
	    VoxScope.__defineGetter__('ObservableList', function () {
	        return __webpack_require__(3).default;
	    });
	    VoxScope.__defineGetter__('ObservableValue', function () {
	        return __webpack_require__(4).default;
	    });
	    VoxScope.__defineGetter__('ObservableObject', function () {
	        return __webpack_require__(6).default;
	    });
	    VoxScope.__defineGetter__('Scope', function () {
	        return __webpack_require__(7).default;
	    });
	    VoxScope.__defineGetter__('Convert', function () {
	        return __webpack_require__(5).default;
	    });
	    VoxScope.__defineGetter__('DomParser', function () {
	        return __webpack_require__(8).default;
	    });
	    VoxScope.__defineGetter__('DomEvents', function () {
	        return __webpack_require__(9).default;
	    });
	}
	exports = module.exports = VoxScope;
	core.dynvox = VoxScope;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$12 = core.VW.Ecma2015.Utils.module(__webpack_require__(2));
	var _id = 0;
	{
	    var Observable = function Observable() {
	        Observable.$constructor ? Observable.$constructor.apply(this, arguments) : Observable.$superClass && Observable.$superClass.apply(this, arguments);
	    };
	    Observable.prototype = Object.create($mod$12.EventEmitter.prototype);
	    Observable.prototype.constructor = Observable;
	    Observable.$super = $mod$12.EventEmitter.prototype;
	    Observable.$superClass = $mod$12.EventEmitter;
	    Observable.$constructor = function () {
	        this.id = _id++;
	        Observable.$superClass.call(this);
	        Object.defineProperty(this, 'm', {
	            enumerable: false,
	            writable: true,
	            value: {}
	        });
	        this.v = {};
	    };
	    Observable.prototype.getObservable = function (index) {
	        return this.v[index];
	    };
	    Observable.prototype.__defineGetter__('parent', function () {
	        return this.m.parent;
	    });
	    Observable.prototype.__defineSetter__('parent', function (parent) {
	        this.m.parent = parent;
	    });
	    Observable.prototype.add = function (obj, name) {
	        if (!name)
	            name = obj.name;
	        this.v[name] = obj;
	        obj.parent = this;
	        this.__defineSetter__(name, function (val) {
	            this.v[name].value = val;
	        });
	        this.__defineGetter__(name, function (val) {
	            return this.v[name].value;
	        });
	        this.emit('add', { object: this });
	    };
	    Observable.prototype.remove = function () {
	        var ev = { object: this };
	        this.emit('remove', ev);
	    };
	    Observable.prototype.initEvents = function () {
	        this.m.inited = true;
	    };
	    Observable.prototype.stopEvents = function () {
	        this.m.inited = false;
	    };
	}
	exports.default = Observable;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	if(global.core && global.core.basic){
		exports= module.exports= global.core.basic.get_events();
	}
	else{
		throw new Error("Debe cargar el archivo core.basic");
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$13 = core.VW.Ecma2015.Utils.module(__webpack_require__(2));
	var $mod$14 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$15 = core.VW.Ecma2015.Utils.module(__webpack_require__(4));
	var $mod$16 = core.VW.Ecma2015.Utils.module(__webpack_require__(5));
	{
	    var ObservableList = function ObservableList() {
	        ObservableList.$constructor ? ObservableList.$constructor.apply(this, arguments) : ObservableList.$superClass && ObservableList.$superClass.apply(this, arguments);
	    };
	    ObservableList.prototype = Object.create($mod$14.default.prototype);
	    ObservableList.prototype.constructor = ObservableList;
	    ObservableList.$super = $mod$14.default.prototype;
	    ObservableList.$superClass = $mod$14.default;
	    ObservableList.$constructor = function (name, value) {
	        ObservableList.$superClass.call(this);
	        Array.call(this);
	        this.m.name = name;
	        this.length = this.length | 0;
	        if (value)
	            this.value = value;
	    };
	    ObservableList.prototype.__defineGetter__('name', function () {
	        return this.m.name;
	    });
	    ObservableList.prototype.__defineGetter__('parent', function () {
	        return this.m.parent;
	    });
	    ObservableList.prototype.__defineSetter__('parent', function (parent) {
	        this.m.parent = parent;
	    });
	    ObservableList.prototype.__defineSetter__('value', function (value) {
	        if (!value instanceof Array) {
	            throw new core.System.ArgumentException('Se esperaba un argumento que fuera del tipo Array');
	        }
	        this.removeAll();
	        for (var i = 0; i < value.length; i++) {
	            this.push(value[i]);
	        }
	    });
	    ObservableList.prototype.__defineGetter__('value', function () {
	        return this;
	    });
	    ObservableList.prototype.toJSON = function () {
	        return Array.prototype.slice.call(this, 0, this.length);
	    };
	    ObservableList.prototype.push = function (value) {
	        var v1 = new $mod$15.default(this.length.toString());
	        v1.value = value;
	        v1.parent = this;
	        this.add(v1);
	        Array.prototype.push.call(this, value);
	        this.emit('push', {
	            object: this,
	            observable: v1
	        });
	    };
	    ObservableList.prototype.pop = function () {
	        var o = this.v[this.length - 1];
	        if (o && o.remove) {
	            o.remove();
	        }
	        Array.prototype.pop.call(this);
	    };
	    ObservableList.prototype.shift = function () {
	        var o = this[0];
	        if (o && o.remove) {
	            o.remove();
	        }
	        Array.prototype.shift.call(this);
	    };
	    ObservableList.prototype.removeIndex = function (index) {
	        if (this.v[index] && this.v[index].remove)
	            this.v[index].remove();
	        this.v[index] = null;
	        for (var i = index; i < this.length; i++) {
	            this.v[i] = this[i + 1];
	        }
	        Array.prototype.pop.call(this);
	    };
	    ObservableList.prototype.removeAll = function () {
	        var ev;
	        ev = { object: this };
	        for (var i = 0; i < this.length; i++) {
	            this.v[i].remove();
	        }
	        Array.prototype.splice.call(0, this.length);
	        this.emit('removeall', ev);
	    };
	}
	for (var id in Array.prototype) {
	    if (!ObservableList.prototype[id])
	        ObservableList.prototype[id] = Array.prototype[id];
	}
	exports.default = ObservableList;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$19 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$20 = core.VW.Ecma2015.Utils.module(__webpack_require__(2));
	{
	    var ObservableValue = function ObservableValue() {
	        ObservableValue.$constructor ? ObservableValue.$constructor.apply(this, arguments) : ObservableValue.$superClass && ObservableValue.$superClass.apply(this, arguments);
	    };
	    ObservableValue.prototype = Object.create($mod$19.default.prototype);
	    ObservableValue.prototype.constructor = ObservableValue;
	    ObservableValue.$super = $mod$19.default.prototype;
	    ObservableValue.$superClass = $mod$19.default;
	    ObservableValue.$constructor = function (name, value) {
	        ObservableValue.$superClass.call(this);
	        this.m.name = name;
	        this.value = value;
	    };
	    ObservableValue.prototype.__defineGetter__('name', function () {
	        return this.m.name;
	    });
	    ObservableValue.prototype.toJSON = function () {
	        return this.value;
	    };
	    ObservableValue.prototype.valueOf = function () {
	        return this.value;
	    };
	    ObservableValue.prototype.__defineSetter__('value', function (value) {
	        this.m.value = value;
	        var ev = {
	            value: value,
	            object: this
	        };
	        this.emit('change', ev);
	    });
	    ObservableValue.prototype.__defineGetter__('value', function () {
	        return this.m.value;
	    });
	}
	exports.default = ObservableValue;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$3 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$4 = core.VW.Ecma2015.Utils.module(__webpack_require__(4));
	var $mod$5 = core.VW.Ecma2015.Utils.module(__webpack_require__(3));
	{
	    var Convert = function Convert() {
	        Convert.$constructor ? Convert.$constructor.apply(this, arguments) : Convert.$superClass && Convert.$superClass.apply(this, arguments);
	    };
	    Convert.toObservable = function (value) {
	        var v1;
	        if (value instanceof $mod$3.default) {
	            return value;
	        } else if (value instanceof Array) {
	            return new $mod$5.default('', value);
	        } else {
	            v1 = new $mod$4.default('');
	            v1.value = value;
	            return v1;
	        }
	    };
	}
	exports.default = Convert;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$17 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$18 = core.VW.Ecma2015.Utils.module(__webpack_require__(4));
	{
	    var ObservableObject = function ObservableObject() {
	        ObservableObject.$constructor ? ObservableObject.$constructor.apply(this, arguments) : ObservableObject.$superClass && ObservableObject.$superClass.apply(this, arguments);
	    };
	    ObservableObject.prototype = Object.create($mod$17.default.prototype);
	    ObservableObject.prototype.constructor = ObservableObject;
	    ObservableObject.$super = $mod$17.default.prototype;
	    ObservableObject.$superClass = $mod$17.default;
	    ObservableObject.$constructor = function (value) {
	        ObservableObject.$superClass.call(this);
	        var v;
	        for (var id in value) {
	            v = new $mod$18.default(id, value[id]);
	            this.add(v);
	        }
	    };
	}
	exports.default = ObservableObject;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$21 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$22 = core.VW.Ecma2015.Utils.module(__webpack_require__(4));
	{
	    var Scope = function Scope() {
	        Scope.$constructor ? Scope.$constructor.apply(this, arguments) : Scope.$superClass && Scope.$superClass.apply(this, arguments);
	    };
	    Scope.prototype = Object.create($mod$21.default.prototype);
	    Scope.prototype.constructor = Scope;
	    Scope.$super = $mod$21.default.prototype;
	    Scope.$superClass = $mod$21.default;
	    Scope.get = function (name) {
	        return Scope.v[name] || Scope.create(name);
	    };
	    Scope.create = function (name) {
	        return Scope.v[name] = new Scope();
	    };
	    Scope.prototype.append = function (scope) {
	        this.scopes.push(scope);
	        scope.parent = this;
	    };
	    Scope.prototype.createVariable = function (name, value) {
	        this.add(new $mod$22.default(name));
	        this[name] = value;
	    };
	    Scope.prototype.remove = function (nameOrObj) {
	        if (typeof nameOrObj === 'string')
	            nameOrObj = this.v[nameOrObj];
	        nameOrObj.remove();
	    };
	    Scope.prototype.clone = function () {
	        var n = Object.getPrototypeOf(this);
	        var no = new n.constructor();
	        for (var id in this.v) {
	            no.add(this.v[id], id);
	        }
	        return no;
	    };
	    Scope.$constructor = function () {
	        Scope.$superClass.call(this);
	        this.scopes = [];
	    };
	}
	Scope.v = {};
	exports.default = Scope;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $mod$9 = core.VW.Ecma2015.Utils.module(__webpack_require__(7));
	var $mod$10 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$11 = core.VW.Ecma2015.Utils.module(__webpack_require__(9));
	if (typeof $ === 'undefined')
	    throw new core.System.ArgumentException('Debe añadir jQuery');
	{
	    var DomParser = function DomParser() {
	        DomParser.$constructor ? DomParser.$constructor.apply(this, arguments) : DomParser.$superClass && DomParser.$superClass.apply(this, arguments);
	    };
	    DomParser.prototype.createEventFunction = function (scope, DOM, Observable, options) {
	        var dom = DOM.get(0), v;
	        if (!dom.VoxSEvents) {
	            dom.VoxSEvents = new $mod$11.default(DOM, this);
	        }
	        v = dom.VoxSEvents;
	        v.setArguments(scope, Observable, options);
	        v.createEventFunction();
	    };
	    DomParser.prototype.createObservableFindEvent = function (scope, DOM, Observable, options) {
	        var self = this;
	        var Fn = function () {
	            if (self.analize(scope, DOM, options))
	                Fn = null;
	        };
	        var Fn2 = function () {
	            if (Fn)
	                Fn();
	        };
	        Observable.on('change', Fn2);
	        Observable.on('add', Fn2);
	    };
	    DomParser.prototype.withScopeVar = function (scope, obj) {
	        var attr = obj.attr('voxs-attr') || 'value';
	        var html = obj.attr('voxs-html') !== undefined;
	        var text = obj.attr('voxs-text') !== undefined;
	        var options = {
	            attr: attr,
	            html: html,
	            text: text,
	            name: obj.attr('voxs-name')
	        };
	        return this.withScopeVar2(scope, obj, options);
	    };
	    DomParser.prototype.withScopeVar2 = function (scope, obj, options) {
	        var prop, varname, name = options.name;
	        if (name) {
	            prop = name.split('>');
	            varname = prop[0].split('.');
	            if (prop.length > 1)
	                prop = prop[1].split('.');
	            else
	                prop = undefined;
	            options.prop = prop;
	            options.varname = varname;
	        } else {
	            throw new core.System.Exception('Se esperaba el nombre de variable');
	        }
	        this.analize(scope, obj, options);
	    };
	    DomParser.prototype.ifScope = function (scope, obj) {
	        var negate = false, prop, varname;
	        prop = obj.attr('voxs-if').split('>');
	        varname = prop[0].split('.');
	        if (prop.length > 1)
	            prop = prop[1].split('.');
	        else
	            prop = undefined;
	        if (varname[0].startsWith('!')) {
	            negate = true;
	            varname[0] = varname[0].substring(1);
	        }
	        var options = {
	            ifcondition: true,
	            varname: varname,
	            negate: negate,
	            prop: prop,
	            name: obj.attr('voxs-if')
	        };
	        this.analize(scope, obj, options);
	    };
	    DomParser.prototype.analize = function (scope, obj, options) {
	        obj.attr('voxs-ya', 'voxs-ya');
	        var Observable = scope, vr, last;
	        var varname = options.varname;
	        if (varname.length == 1) {
	            if (!scope.getObservable(varname[0])) {
	                scope.createVariable(varname[0]);
	            }
	        }
	        for (var i = 0; i < options.varname.length; i++) {
	            options.index = i;
	            vr = options.varname[i].trim();
	            last = Observable;
	            if (i > 0)
	                last = last.value;
	            Observable = last.getObservable ? last.getObservable(vr) : null;
	            if (!Observable || !(Observable instanceof $mod$10.default)) {
	                Observable = null;
	                if (i > 0)
	                    this.createObservableFindEvent(scope, obj, last, options);
	                break;
	            }
	        }
	        if (Observable) {
	            this.createEventFunction(scope, obj, Observable, options);
	            return true;
	        }
	    };
	    DomParser.prototype.withScopeList = function (scope, DOM) {
	        var vname = DOM.attr('voxs-var');
	        var prop = DOM.attr('voxs-name').split('>');
	        var varname = prop[0].split('.');
	        if (prop.length > 1)
	            prop = prop[1].split('.');
	        else
	            prop = undefined;
	        var options = {
	            vname: vname,
	            varname: varname,
	            repeat: true,
	            prop: prop,
	            name: DOM.attr('voxs-name')
	        };
	        DOM.find(DomParser.q).attr('voxs-ya', 'voxs-ya');
	        this.analize(scope, DOM, options);
	    };
	    DomParser.prototype.paso3 = function (jObject, scope) {
	        var attrs, attr, val, val2, i, y, html, varname;
	        if (jObject.attr('voxs-repeat') !== undefined) {
	            this.withScopeList(scope, jObject);
	        } else if (jObject.attr('voxs-if') !== undefined) {
	            this.ifScope(scope, jObject);
	        } else if (jObject.attr('voxs') !== undefined) {
	            attrs = jObject.get(0).attributes;
	            for (var z = 0; z < attrs.length; z++) {
	                attr = attrs[z];
	                val = attr.value;
	                val2 = val;
	                i = val.indexOf('#{');
	                if (i >= 0) {
	                    html = val[i - 1] == '#';
	                    val = val.substring(i + 2);
	                    y = val.indexOf('}');
	                    if (y >= 0) {
	                        varname = val.substring(0, y);
	                        val = val.substring(y + 1);
	                    }
	                    console.info(varname);
	                    attr.value = attr.value.substring(0, i) + val;
	                    this.withScopeVar2(scope, jObject, {
	                        name: varname,
	                        attr: attr.name,
	                        format: val2
	                    });
	                }
	            }
	            val = jObject.html();
	            if (val.indexOf('<') < 0) {
	                val = jObject.text();
	                val2 = val;
	                i = val.indexOf('#{');
	                if (i >= 0) {
	                    html = val[i - 1] == '#';
	                    val = val.substring(i + 2);
	                    y = val.indexOf('}');
	                    if (y >= 0) {
	                        varname = val.substring(0, y);
	                        val = val.substring(y + 1);
	                    }
	                    jObject.html(jObject.html().substring(0, i - (html ? 1 : 0)) + val);
	                    console.info({
	                        name: varname,
	                        format: val2,
	                        html: html,
	                        text: !html
	                    });
	                    this.withScopeVar2(scope, jObject, {
	                        name: varname,
	                        format: val2,
	                        html: html,
	                        text: !html
	                    });
	                }
	            }
	        } else {
	            this.withScopeVar(scope, jObject);
	        }
	    };
	    DomParser.prototype.paso1 = function (Window) {
	        var k, j = Window.find('[voxs-scope]'), s;
	        for (var i = 0; i < j.length; i++) {
	            k = j.eq(i);
	            s = k.attr('voxs-scope');
	            if (s) {
	                this.paso2(k, $mod$9.default.get(s));
	            }
	        }
	    };
	    DomParser.prototype.init = function () {
	        $(function (self$0) {
	            return function () {
	                self$0.paso1($('html'));
	            };
	        }(this));
	    };
	    DomParser.prototype.paso2 = function (Window, scope) {
	        var k, j = Window.find(DomParser.q);
	        for (var i = 0; i < j.length; i++) {
	            k = j.eq(i);
	            if (k.attr('voxs-ya') === undefined) {
	                this.paso3(k, scope);
	            }
	        }
	    };
	}
	DomParser.q = '[voxs-name], [voxs-if], [voxs]';
	exports.default = DomParser;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var _id = 0;
	var $mod$6 = core.VW.Ecma2015.Utils.module(__webpack_require__(3));
	var $mod$7 = core.VW.Ecma2015.Utils.module(__webpack_require__(1));
	var $mod$8 = core.VW.Ecma2015.Utils.module(__webpack_require__(8));
	{
	    var DomEvents = function DomEvents() {
	        DomEvents.$constructor ? DomEvents.$constructor.apply(this, arguments) : DomEvents.$superClass && DomEvents.$superClass.apply(this, arguments);
	    };
	    DomEvents.$constructor = function (DOM, domParser) {
	        this.DOM = DOM;
	        this.id = _id++;
	        this.events = {};
	        this.DomParser = domParser;
	    };
	    DomEvents.prototype.setArguments = function (scope, observable, options) {
	        this.options = options;
	        this.scope = scope;
	        this.observable = observable;
	    };
	    DomEvents.optionsToString = function (options) {
	        return options.name + '#' + (options.attr || '') + '#' + (options.text ? 'text' : '');
	    };
	    DomEvents.prototype.createEventFunction = function () {
	        var Observable = this.observable;
	        var Fn, self = this;
	        var id = Observable.id + DomEvents.optionsToString(self.options);
	        if (this.options.repeat) {
	            if (!this.events[id]) {
	                var procesar, observable2, observable1;
	                var getObservable = function (Observable) {
	                    var v$4 = Observable.value, l$4, saved$4;
	                    try {
	                        if (self.options.prop) {
	                            l$4 = self.options.prop.length;
	                            for (var i = 0; i < l$4; i++) {
	                                v$4 = v$4[self.options.prop[i]];
	                            }
	                        }
	                    } catch (e) {
	                        console.error(e);
	                    }
	                    if (!(v$4 instanceof $mod$6.default)) {
	                        saved$4 = v$4;
	                        v$4 = new $mod$6.default();
	                        if (saved$4 instanceof Array) {
	                            for (var i = 0; i < saved$4.length; i++) {
	                                v$4.push(saved$4[i]);
	                            }
	                        }
	                        if (self.options.prop) {
	                            saved$4 = Observable.value;
	                            l$4 = self.options.prop.length - 1;
	                            for (var i = 0; i < l$4; i++) {
	                                if (saved$4)
	                                    saved$4 = saved$4[self.options.prop[i]];
	                            }
	                            if (saved$4) {
	                                saved$4[self.options.prop[self.options.prop.length - 1]] = v$4;
	                                Observable = v$4;
	                            }
	                        } else {
	                            Observable = Observable.value = v$4;
	                        }
	                    } else {
	                        Observable = v$4;
	                    }
	                    return Observable;
	                };
	                Observable.on('change', function () {
	                    if (observable2 instanceof $mod$6.default)
	                        observable2.removeAll();
	                    if (observable2 != Observable)
	                        procesar();
	                });
	                procesar = function () {
	                    observable2 = getObservable(Observable);
	                    id = observable2.id + DomEvents.optionsToString(self.options);
	                    if (self.events[id])
	                        return;
	                    if (!self.Body) {
	                        self.Body = self.DOM.find('>*');
	                        self.Body.remove();
	                    }
	                    Fn = function (ev) {
	                        console.warn('PUSHED', ev);
	                        var scope2, b = self.Body.clone(true);
	                        var dq = $('<div>');
	                        dq.append(b);
	                        dq.find($mod$8.default.q).removeAttr('voxs-ya');
	                        scope2 = self.scope.clone();
	                        self.scope.append(scope2);
	                        scope2.add(ev.observable, self.options.vname);
	                        self.DomParser.paso2(dq, scope2);
	                        self.DOM.append(b);
	                        ev.observable.on('remove', function () {
	                            b.remove();
	                        });
	                        ev.observable.on('change', function () {
	                            self.DomParser.paso2(self.DOM, scope2);
	                        });
	                    };
	                    observable2.on('push', Fn);
	                    for (var i = 0; i < observable2.length; i++) {
	                        Fn({ observable: observable2.getObservable(i) });
	                    }
	                    id = observable2.id + DomEvents.optionsToString(self.options);
	                    self.events[id] = Fn;
	                };
	                procesar();
	            }
	        } else if (this.options.ifcondition) {
	            if (!this.events[id]) {
	                Fn = function (ev) {
	                    var v$5 = Observable.value, l$5;
	                    if (self.options.prop) {
	                        l$5 = self.options.prop.length;
	                        for (var i = 0; i < l$5; i++) {
	                            if (v$5)
	                                v$5 = v$5[self.options.prop[i]];
	                        }
	                    }
	                    v$5 = !v$5;
	                    if (!self.options.negate)
	                        v$5 = !v$5;
	                    if (v$5)
	                        self.DOM.show();
	                    else
	                        self.DOM.hide();
	                };
	                Fn();
	                Observable.on('change', Fn);
	                if (self.DOM.is('input[type=check]')) {
	                    self.DOM.on('change', function () {
	                        self.noTrigger = true;
	                        if (self.options.prop) {
	                            var v$7 = Observable.value, l$7;
	                            l$7 = self.options.prop.length - 1;
	                            for (var i = 0; i < l$7; i++) {
	                                v$7 = v$7[self.options.prop[i]];
	                            }
	                            v$7[l$7] = this.checked;
	                            Observable.value = Observable.value;
	                        } else {
	                            Observable.value = this.checked;
	                        }
	                    });
	                }
	                this.events[id] = Fn;
	            }
	        } else {
	            if (!this.events[id]) {
	                Fn = function (ev) {
	                    if (self.noTrigger)
	                        return self.noTrigger = false;
	                    var v$6 = Observable.value, l$6;
	                    if (self.options.prop) {
	                        l$6 = self.options.prop.length;
	                        for (var i = 0; i < l$6; i++) {
	                            if (v$6)
	                                v$6 = v$6[self.options.prop[i]];
	                        }
	                    }
	                    if (self.options.html)
	                        self.DOM.html(v$6);
	                    else if (self.options.text)
	                        self.DOM.text(v$6);
	                    else if (self.options.attr == 'value')
	                        self.DOM.val(v$6);
	                    else
	                        self.DOM.attr(self.options.attr, v$6);
	                };
	                Fn();
	                Observable.on('change', Fn);
	                if (self.DOM.is('input,textarea,select')) {
	                    self.DOM.on('change input', function () {
	                        self.noTrigger = true;
	                        if (self.options.prop) {
	                            var v$8 = Observable.value, l$8;
	                            l$8 = self.options.prop.length - 1;
	                            for (var i = 0; i < l$8; i++) {
	                                v$8 = v$8[self.options.prop[i]];
	                            }
	                            v$8[l$8] = this.value;
	                            Observable.value = Observable.value;
	                        } else {
	                            Observable.value = this.value;
	                        }
	                    });
	                }
	                this.events[id] = Fn;
	            }
	        }
	        if (!this.events[id]) {
	            if (this.options.remove) {
	                Observable.on('remove', function (ev) {
	                    self.DOM.remove();
	                });
	            }
	            if (this.options.hide) {
	                Observable.on('remove', function (ev) {
	                    self.DOM.hide();
	                });
	            }
	        }
	    };
	}
	DomEvents.dq = $('<div>');
	exports.default = DomEvents;

/***/ }
/******/ ]);