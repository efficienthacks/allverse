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

	/* WEBPACK VAR INJECTION */(function(global, process, Buffer, __filename) {/*
	 * SystemJS v0.19.41
	 */
	(function() {
	function bootstrap() {// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert URLs to use / always
	  pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = ((err.message || err) + (err.stack ? '\n' + err.stack : '')).toString().split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = '(SystemJS) ' + (newStack ? newStack.join('\n\t') : err.message.substr(11)) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    newErr.stack = newMsg;
	        
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;

	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }

	  // sanitize out the hash and querystring
	  if (baseURI) {
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;

	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  var anonCnt = 0;

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name || '<Anonymous' + ++anonCnt + '>',
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      load.address = load.address || load.name;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined)
	          throw new TypeError('Declarative modules unsupported in the polyfill.');
	        
	        if (typeof instantiateResult != 'object')
	          throw new TypeError('Invalid instantiate return value');

	        load.depsList = instantiateResult.deps || [];
	        load.execute = instantiateResult.execute;
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name] || loader.modules[load.name].module === load.module.module, 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name])
	          return loader.modules[name].module;

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return load.module.module;
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return load.module.module;
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {},
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;

	/*
	 * ES6 Module Declarative Linking Code
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	})();

	var System;

	  var fetchTextFromURL;
	  if (typeof XMLHttpRequest != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var xhr = new XMLHttpRequest();
	      var sameDomain = true;
	      var doTimeout = false;
	      if (!('withCredentials' in xhr)) {
	        // check if same domain
	        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
	        if (domainCheck) {
	          sameDomain = domainCheck[2] === window.location.host;
	          if (domainCheck[1])
	            sameDomain &= domainCheck[1] === window.location.protocol;
	        }
	      }
	      if (!sameDomain && typeof XDomainRequest != 'undefined') {
	        xhr = new XDomainRequest();
	        xhr.onload = load;
	        xhr.onerror = error;
	        xhr.ontimeout = error;
	        xhr.onprogress = function() {};
	        xhr.timeout = 0;
	        doTimeout = true;
	      }
	      function load() {
	        fulfill(xhr.responseText);
	      }
	      function error() {
	        reject(new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
	      }

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	          // in Chrome on file:/// URLs, status is 0
	          if (xhr.status == 0) {
	            if (xhr.responseText) {
	              load();
	            }
	            else {
	              // when responseText is empty, wait for load or error event
	              // to inform if it is a 404 or empty file
	              xhr.addEventListener('error', error);
	              xhr.addEventListener('load', load);
	            }
	          }
	          else if (xhr.status === 200) {
	            load();
	          }
	          else {
	            error();
	          }
	        }
	      };
	      xhr.open("GET", url, true);

	      if (xhr.setRequestHeader) {
	        xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
	        // can set "authorization: true" to enable withCredentials only
	        if (authorization) {
	          if (typeof authorization == 'string')
	            xhr.setRequestHeader('Authorization', authorization);
	          xhr.withCredentials = true;
	        }
	      }

	      if (doTimeout) {
	        setTimeout(function() {
	          xhr.send();
	        }, 0);
	      } else {
	        xhr.send(null);
	      }
	    };
	  }
	  else if ("function" != 'undefined' && typeof process != 'undefined') {
	    var fs;
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      if (url.substr(0, 8) != 'file:///')
	        throw new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// allowed running in Node.');
	      fs = fs || __webpack_require__(6);
	      if (isWindows)
	        url = url.replace(/\//g, '\\').substr(8);
	      else
	        url = url.substr(7);
	      return fs.readFile(url, function(err, data) {
	        if (err) {
	          return reject(err);
	        }
	        else {
	          // Strip Byte Order Mark out if it's the leading char
	          var dataString = data + '';
	          if (dataString[0] === '\ufeff')
	            dataString = dataString.substr(1);

	          fulfill(dataString);
	        }
	      });
	    };
	  }
	  else if (typeof self != 'undefined' && typeof self.fetch != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var opts = {
	        headers: {'Accept': 'application/x-es-module, */*'}
	      };

	      if (authorization) {
	        if (typeof authorization == 'string')
	          opts.headers['Authorization'] = authorization;
	        opts.credentials = 'include';
	      }

	      fetch(url, opts)
	        .then(function (r) {
	          if (r.ok) {
	            return r.text();
	          } else {
	            throw new Error('Fetch error: ' + r.status + ' ' + r.statusText);
	          }
	        })
	        .then(fulfill, reject);
	    }
	  }
	  else {
	    throw new TypeError('No environment fetch API available.');
	  }
	/*
	 * Traceur, Babel and TypeScript transpile hook for Loader
	 */
	var transpile = (function() {

	  // use Traceur by default
	  Loader.prototype.transpiler = 'traceur';

	  function transpile(load) {
	    var self = this;

	    return Promise.resolve(__global[self.transpiler == 'typescript' ? 'ts' : self.transpiler]
	        || (self.pluginLoader || self)['import'](self.transpiler))
	    .then(function(transpiler) {
	      if (transpiler.__useDefault)
	        transpiler = transpiler['default'];

	      var transpileFunction;
	      if (transpiler.Compiler)
	        transpileFunction = traceurTranspile;
	      else if (transpiler.createLanguageService)
	        transpileFunction = typescriptTranspile;
	      else
	        transpileFunction = babelTranspile;

	      // note __moduleName will be part of the transformer meta in future when we have the spec for this
	      return '(function(__moduleName){' + transpileFunction.call(self, load, transpiler) + '\n})("' + load.name + '");\n//# sourceURL=' + load.address + '!transpiled';
	    });
	  };

	  function traceurTranspile(load, traceur) {
	    var options = this.traceurOptions || {};
	    options.modules = 'instantiate';
	    options.script = false;
	    if (options.sourceMaps === undefined)
	      options.sourceMaps = 'inline';
	    options.filename = load.address;
	    options.inputSourceMap = load.metadata.sourceMap;
	    options.moduleName = false;

	    var compiler = new traceur.Compiler(options);

	    return doTraceurCompile(load.source, compiler, options.filename);
	  }
	  function doTraceurCompile(source, compiler, filename) {
	    try {
	      return compiler.compile(source, filename);
	    }
	    catch(e) {
	      // on older versions of traceur (<0.9.3), an array of errors is thrown
	      // rather than a single error.
	      if (e.length) {
	        throw e[0];
	      }
	      throw e;
	    }
	  }

	  function babelTranspile(load, babel) {
	    var options = this.babelOptions || {};
	    options.modules = 'system';
	    if (options.sourceMap === undefined)
	      options.sourceMap = 'inline';
	    options.inputSourceMap = load.metadata.sourceMap;
	    options.filename = load.address;
	    options.code = true;
	    options.ast = false;

	    return babel.transform(load.source, options).code;
	  }

	  function typescriptTranspile(load, ts) {
	    var options = this.typescriptOptions || {};
	    options.target = options.target || ts.ScriptTarget.ES5;
	    if (options.sourceMap === undefined)
	      options.sourceMap = true;
	    if (options.sourceMap && options.inlineSourceMap !== false)
	      options.inlineSourceMap = true;

	    options.module = ts.ModuleKind.System;

	    return ts.transpile(load.source, options, load.address);
	  }

	  return transpile;
	})();
	// SystemJS Loader Class and Extension helpers
	function SystemJSLoader() {
	  Loader.call(this);

	  this.paths = {};
	  this._loader.paths = {};

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = Loader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}


	var absURLRegEx = /^[^\/]+:\/\//;
	function isAbsolute(name) {
	  return name.match(absURLRegEx);
	}
	function isRel(name) {
	  return (name[0] == '.' && (!name[1] || name[1] == '/' || name[1] == '.')) || name[0] == '/';
	}
	function isPlain(name) {
	  return !isRel(name) && !isAbsolute(name);
	}

	var baseURIObj = new URL(baseURI);

	function urlResolve(name, parent) {
	  // url resolution shortpaths
	  if (name[0] == '.') {
	    // dot-relative url normalization
	    if (name[1] == '/' && name[2] != '.')
	      return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name.substr(2);
	  }
	  else if (name[0] != '/' && name.indexOf(':') == -1) {
	    // plain parent normalization
	    return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name;
	  }

	  return new URL(name, parent && parent.replace(/#/g, '%05') || baseURIObj).href.replace(/%05/g, '#');
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(loader, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  var paths = loader.paths;
	  var pathsCache = loader._loader.paths;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    if (paths.hasOwnProperty && !paths.hasOwnProperty(p))
	      continue;

	    // paths sanitization
	    var path = paths[p];
	    if (path !== pathsCache[p])
	      path = paths[p] = pathsCache[p] = urlResolve(paths[p], isRel(paths[p]) ? baseURI : loader.baseURL);

	    // exact path match
	    if (p.indexOf('*') === -1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && (paths[p][paths[p].length - 1] == '/' || paths[p] == '')) {
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? (paths[p] && '/' || '') + name.substr(p.length) : '');
	      }
	    }
	    // wildcard path match
	    else {
	      var pathParts = p.split('*');
	      if (pathParts.length > 2)
	        throw new TypeError('Only one wildcard in a path is permitted');

	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if ((typeof exports == 'object' || typeof exports == 'function') && exports !== __global) {
	      if (getOwnPropertyDescriptor) {
	        for (var p in exports) {
	          // The default property is copied to esModule later on
	          if (p === 'default')
	            continue;
	          defineOrCopyProperty(esModule, exports, p);
	        }
	      }
	      else {
	        extend(esModule, exports);
	      }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function defineOrCopyProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);
	  }
	  catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property
	    // we dont need hasOwnProperty here because getOwnPropertyDescriptor would have returned undefined above
	    targetObj[propName] = sourceObj[propName];
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function extendPkgConfig(pkgCfgA, pkgCfgB, pkgName, loader, warnInvalidProperties) {
	  for (var prop in pkgCfgB) {
	    if (indexOf.call(['main', 'format', 'defaultExtension', 'basePath'], prop) != -1) {
	      pkgCfgA[prop] = pkgCfgB[prop];
	    }
	    else if (prop == 'map') {
	      extend(pkgCfgA.map = pkgCfgA.map || {}, pkgCfgB.map);
	    }
	    else if (prop == 'meta') {
	      extend(pkgCfgA.meta = pkgCfgA.meta || {}, pkgCfgB.meta);
	    }
	    else if (prop == 'depCache') {
	      for (var d in pkgCfgB.depCache) {
	        var dNormalized;

	        if (d.substr(0, 2) == './')
	          dNormalized = pkgName + '/' + d.substr(2);
	        else
	          dNormalized = coreResolve.call(loader, d);
	        loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(pkgCfgB.depCache[d]);
	      }
	    }
	    else if (warnInvalidProperties && indexOf.call(['browserConfig', 'nodeConfig', 'devConfig', 'productionConfig'], prop) == -1 && 
	        (!pkgCfgB.hasOwnProperty || pkgCfgB.hasOwnProperty(prop))) {
	      warn.call(loader, '"' + prop + '" is not a valid package configuration option in package ' + pkgName);
	    }
	  }
	}

	// deeply-merge (to first level) config with any existing package config
	function setPkgConfig(loader, pkgName, cfg, prependConfig) {
	  var pkg;

	  // first package is config by reference for fast path, cloned after that
	  if (!loader.packages[pkgName]) {
	    pkg = loader.packages[pkgName] = cfg;
	  }
	  else {
	    var basePkg = loader.packages[pkgName];
	    pkg = loader.packages[pkgName] = {};

	    extendPkgConfig(pkg, prependConfig ? cfg : basePkg, pkgName, loader, prependConfig);
	    extendPkgConfig(pkg, prependConfig ? basePkg : cfg, pkgName, loader, !prependConfig);
	  }
	  
	  // main object becomes main map
	  if (typeof pkg.main == 'object') {
	    pkg.map = pkg.map || {};
	    pkg.map['./@main'] = pkg.main;
	    pkg.main['default'] = pkg.main['default'] || './';
	    pkg.main = '@main';
	  }

	  return pkg;
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	// we define a __exec for globally-scoped execution
	// used by module format implementations
	var __exec;

	(function() {

	  var hasBuffer = typeof Buffer != 'undefined';
	  try {
	    if (hasBuffer && new Buffer('a').toString('base64') != 'YQ==')
	      hasBuffer = false;
	  }
	  catch(e) {
	    hasBuffer = false;
	  }

	  var sourceMapPrefix = '\n//# sourceMappingURL=data:application/json;base64,';
	  function inlineSourceMap(sourceMapString) {
	    if (hasBuffer)
	      return sourceMapPrefix + new Buffer(sourceMapString).toString('base64');
	    else if (typeof btoa != 'undefined')
	      return sourceMapPrefix + btoa(unescape(encodeURIComponent(sourceMapString)));
	    else
	      return '';
	  }

	  function getSource(load, wrap) {
	    var lastLineIndex = load.source.lastIndexOf('\n');

	    // wrap ES formats with a System closure for System global encapsulation
	    if (load.metadata.format == 'global')
	      wrap = false;

	    var sourceMap = load.metadata.sourceMap;
	    if (sourceMap) {
	      if (typeof sourceMap != 'object')
	        throw new TypeError('load.metadata.sourceMap must be set to an object.');

	      sourceMap = JSON.stringify(sourceMap);
	    }

	    return (wrap ? '(function(System, SystemJS) {' : '') + load.source + (wrap ? '\n})(System, System);' : '')
	        // adds the sourceURL comment if not already present
	        + (load.source.substr(lastLineIndex, 15) != '\n//# sourceURL='
	          ? '\n//# sourceURL=' + load.address + (sourceMap ? '!transpiled' : '') : '')
	        // add sourceMappingURL if load.metadata.sourceMap is set
	        + (sourceMap && inlineSourceMap(sourceMap) || '');
	  }

	  var curLoad;

	  // System.register, System.registerDynamic, AMD define pipeline
	  // if currently evalling code here, immediately reduce the registered entry against the load record
	  hook('pushRegister_', function() {
	    return function(register) {
	      if (!curLoad)
	        return false;

	      this.reduceRegister_(curLoad, register);
	      return true;
	    };
	  });

	  // System clobbering protection (mostly for Traceur)
	  var curSystem;
	  var callCounter = 0;
	  function preExec(loader, load) {
	    curLoad = load;
	    if (callCounter++ == 0)
	      curSystem = __global.System;
	    __global.System = __global.SystemJS = loader;
	  }
	  function postExec() {
	    if (--callCounter == 0)
	      __global.System = __global.SystemJS = curSystem;
	    curLoad = undefined;
	  }

	  var useVm;
	  var vm;
	  __exec = function(load) {
	    if (!load.source)
	      return;
	    if ((load.metadata.integrity || load.metadata.nonce) && supportsScriptExec)
	      return scriptExec.call(this, load);
	    try {
	      preExec(this, load);
	      curLoad = load;
	      // global scoped eval for node (avoids require scope leak)
	      if (!vm && this._nodeRequire) {
	        vm = this._nodeRequire('vm');
	        useVm = vm.runInThisContext("typeof System !== 'undefined' && System") === this;
	      }
	      if (useVm)
	        vm.runInThisContext(getSource(load, true), { filename: load.address + (load.metadata.sourceMap ? '!transpiled' : '') });
	      else
	        (0, eval)(getSource(load, true));
	      postExec();
	    }
	    catch(e) {
	      postExec();
	      throw addToError(e, 'Evaluating ' + load.address);
	    }
	  };

	  var supportsScriptExec = false;
	  if (isBrowser && typeof document != 'undefined' && document.getElementsByTagName) {
	    if (!(window.chrome && window.chrome.extension || navigator.userAgent.match(/^Node\.js/)))
	      supportsScriptExec = true;
	  }

	  // script execution via injecting a script tag into the page
	  // this allows CSP integrity and nonce to be set for CSP environments
	  var head;
	  function scriptExec(load) {
	    if (!head)
	      head = document.head || document.body || document.documentElement;

	    var script = document.createElement('script');
	    script.text = getSource(load, false);
	    var onerror = window.onerror;
	    var e;
	    window.onerror = function(_e) {
	      e = addToError(_e, 'Evaluating ' + load.address);
	      if (onerror)
	        onerror.apply(this, arguments);
	    }
	    preExec(this, load);

	    if (load.metadata.integrity)
	      script.setAttribute('integrity', load.metadata.integrity);
	    if (load.metadata.nonce)
	      script.setAttribute('nonce', load.metadata.nonce);

	    head.appendChild(script);
	    head.removeChild(script);
	    postExec();
	    window.onerror = onerror;
	    if (e)
	      throw e;
	  }

	})();
	function readMemberExpression(p, value) {
	  var pParts = p.split('.');
	  while (pParts.length)
	    value = value[pParts.shift()];
	  return value;
	}

	function getMapMatch(map, name) {
	  var bestMatch, bestMatchLength = 0;

	  for (var p in map) {
	    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
	      var curMatchLength = p.split('/').length;
	      if (curMatchLength <= bestMatchLength)
	        continue;
	      bestMatch = p;
	      bestMatchLength = curMatchLength;
	    }
	  }

	  return bestMatch;
	}

	function prepareBaseURL(loader) {
	  // ensure baseURl is fully normalized
	  if (this._loader.baseURL !== this.baseURL) {
	    if (this.baseURL[this.baseURL.length - 1] != '/')
	      this.baseURL += '/';

	    this._loader.baseURL = this.baseURL = new URL(this.baseURL, baseURIObj).href;
	  }
	}

	var envModule;
	function setProduction(isProduction, isBuilder) {
	  this.set('@system-env', envModule = this.newModule({
	    browser: isBrowser,
	    node: !!this._nodeRequire,
	    production: !isBuilder && isProduction,
	    dev: isBuilder || !isProduction,
	    build: isBuilder,
	    'default': true
	  }));
	}

	hookConstructor(function(constructor) {
	  return function() {
	    constructor.call(this);

	    // support baseURL
	    this.baseURL = baseURI;

	    // support map and paths
	    this.map = {};

	    // make the location of the system.js script accessible
	    if (typeof $__curScript != 'undefined')
	      this.scriptSrc = $__curScript.src;

	    // global behaviour flags
	    this.warnings = false;
	    this.defaultJSExtensions = false;
	    this.pluginFirst = false;
	    this.loaderErrorStack = false;

	    // by default load ".json" files as json
	    // leading * meta doesn't need normalization
	    // NB add this in next breaking release
	    // this.meta['*.json'] = { format: 'json' };

	    // support the empty module, as a concept
	    this.set('@empty', this.newModule({}));

	    setProduction.call(this, false, false);
	  };
	});

	// include the node require since we're overriding it
	if ("function" != 'undefined' && typeof process != 'undefined' && !process.browser)
	  SystemJSLoader.prototype._nodeRequire = __webpack_require__(7);

	/*
	  Core SystemJS Normalization

	  If a name is relative, we apply URL normalization to the page
	  If a name is an absolute URL, we leave it as-is

	  Plain names (neither of the above) run through the map and paths
	  normalization phases.

	  The paths normalization phase applies last (paths extension), which
	  defines the `decanonicalize` function and normalizes everything into
	  a URL.
	 */

	var parentModuleContext;
	function getNodeModule(name, baseURL) {
	  if (!isPlain(name))
	    throw new Error('Node module ' + name + ' can\'t be loaded as it is not a package require.');

	  if (!parentModuleContext) {
	    var Module = this._nodeRequire('module');
	    var base = baseURL.substr(isWindows ? 8 : 7);
	    parentModuleContext = new Module(base);
	    parentModuleContext.paths = Module._nodeModulePaths(base);
	  }
	  return parentModuleContext.require(name);
	}

	function coreResolve(name, parentName) {
	  // standard URL resolution
	  if (isRel(name))
	    return urlResolve(name, parentName);
	  else if (isAbsolute(name))
	    return name;

	  // plain names not starting with './', '://' and '/' go through custom resolution
	  var mapMatch = getMapMatch(this.map, name);

	  if (mapMatch) {
	    name = this.map[mapMatch] + name.substr(mapMatch.length);

	    if (isRel(name))
	      return urlResolve(name);
	    else if (isAbsolute(name))
	      return name;
	  }

	  if (this.has(name))
	    return name;

	  // dynamically load node-core modules when requiring `@node/fs` for example
	  if (name.substr(0, 6) == '@node/') {
	    if (!this._nodeRequire)
	      throw new TypeError('Error loading ' + name + '. Can only load node core modules in Node.');
	    if (this.builder)
	      this.set(name, this.newModule({}));
	    else
	      this.set(name, this.newModule(getESModule(getNodeModule.call(this, name.substr(6), this.baseURL))));
	    return name;
	  }

	  // prepare the baseURL to ensure it is normalized
	  prepareBaseURL.call(this);

	  return applyPaths(this, name) || this.baseURL + name;
	}

	hook('normalize', function(normalize) {
	  return function(name, parentName, skipExt) {
	    var resolved = coreResolve.call(this, name, parentName);
	    if (this.defaultJSExtensions && !skipExt && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	      resolved += '.js';
	    return resolved;
	  };
	});

	// percent encode just '#' in urls if using HTTP requests
	var httpRequest = typeof XMLHttpRequest != 'undefined';
	hook('locate', function(locate) {
	  return function(load) {
	    return Promise.resolve(locate.call(this, load))
	    .then(function(address) {
	      if (httpRequest)
	        return address.replace(/#/g, '%23');
	      return address;
	    });
	  };
	});

	/*
	 * Fetch with authorization
	 */
	hook('fetch', function() {
	  return function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, load.metadata.authorization, resolve, reject);
	    });
	  };
	});

	/*
	  __useDefault

	  When a module object looks like:
	  newModule(
	    __useDefault: true,
	    default: 'some-module'
	  })

	  Then importing that module provides the 'some-module'
	  result directly instead of the full module.

	  Useful for eg module.exports = function() {}
	*/
	hook('import', function(systemImport) {
	  return function(name, parentName, parentAddress) {
	    if (parentName && parentName.name)
	      warn.call(this, 'SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing ' + name + ' from ' + parentName.name);
	    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
	      return module.__useDefault ? module['default'] : module;
	    });
	  };
	});

	/*
	 * Allow format: 'detect' meta to enable format detection
	 */
	hook('translate', function(systemTranslate) {
	  return function(load) {
	    if (load.metadata.format == 'detect')
	      load.metadata.format = undefined;
	    return systemTranslate.apply(this, arguments);
	  };
	});


	/*
	 * JSON format support
	 *
	 * Supports loading JSON files as a module format itself
	 *
	 * Usage:
	 *
	 * SystemJS.config({
	 *   meta: {
	 *     '*.json': { format: 'json' }
	 *   }
	 * });
	 *
	 * Module is returned as if written:
	 *
	 * export default {JSON}
	 *
	 * No named exports are provided
	 *
	 * Files ending in ".json" are treated as json automatically by SystemJS
	 */
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    if (load.metadata.format == 'json' && !this.builder) {
	      var entry = load.metadata.entry = createEntry();
	      entry.deps = [];
	      entry.execute = function() {
	        try {
	          return JSON.parse(load.source);
	        }
	        catch(e) {
	          throw new Error("Invalid JSON file " + load.name);
	        }
	      };
	    }
	  };
	})

	/*
	 Extend config merging one deep only

	  loader.config({
	    some: 'random',
	    config: 'here',
	    deep: {
	      config: { too: 'too' }
	    }
	  });

	  <=>

	  loader.some = 'random';
	  loader.config = 'here'
	  loader.deep = loader.deep || {};
	  loader.deep.config = { too: 'too' };


	  Normalizes meta and package configs allowing for:

	  SystemJS.config({
	    meta: {
	      './index.js': {}
	    }
	  });

	  To become

	  SystemJS.meta['https://thissite.com/index.js'] = {};

	  For easy normalization canonicalization with latest URL support.

	*/
	function envSet(loader, cfg, envCallback) {
	  if (envModule.browser && cfg.browserConfig)
	    envCallback(cfg.browserConfig);
	  if (envModule.node && cfg.nodeConfig)
	    envCallback(cfg.nodeConfig);
	  if (envModule.dev && cfg.devConfig)
	    envCallback(cfg.devConfig);
	  if (envModule.build && cfg.buildConfig)
	    envCallback(cfg.buildConfig);
	  if (envModule.production && cfg.productionConfig)
	    envCallback(cfg.productionConfig);
	}

	SystemJSLoader.prototype.getConfig = function(name) {
	  var cfg = {};
	  var loader = this;
	  for (var p in loader) {
	    if (loader.hasOwnProperty && !loader.hasOwnProperty(p) || p in SystemJSLoader.prototype && p != 'transpiler')
	      continue;
	    if (indexOf.call(['_loader', 'amdDefine', 'amdRequire', 'defined', 'failed', 'version', 'loads'], p) == -1)
	      cfg[p] = loader[p];
	  }
	  cfg.production = envModule.production;
	  return cfg;
	};

	var curCurScript;
	SystemJSLoader.prototype.config = function(cfg, isEnvConfig) {
	  var loader = this;

	  if ('loaderErrorStack' in cfg) {
	    curCurScript = $__curScript;
	    if (cfg.loaderErrorStack)
	      $__curScript = undefined;
	    else
	      $__curScript = curCurScript;
	  }

	  if ('warnings' in cfg)
	    loader.warnings = cfg.warnings;

	  // transpiler deprecation path
	  if (cfg.transpilerRuntime === false)
	    loader._loader.loadedTranspilerRuntime = true;

	  if ('production' in cfg || 'build' in cfg)
	    setProduction.call(loader, !!cfg.production, !!(cfg.build || envModule && envModule.build));

	  if (!isEnvConfig) {
	    // if using nodeConfig / browserConfig / productionConfig, take baseURL from there
	    // these exceptions will be unnecessary when we can properly implement config queuings
	    var baseURL;
	    envSet(loader, cfg, function(cfg) {
	      baseURL = baseURL || cfg.baseURL;
	    });
	    baseURL = baseURL || cfg.baseURL;

	    // always configure baseURL first
	    if (baseURL) {
	      var hasConfig = false;
	      function checkHasConfig(obj) {
	        for (var p in obj)
	          if (obj.hasOwnProperty(p))
	            return true;
	      }
	      if (checkHasConfig(loader.packages) || checkHasConfig(loader.meta) || checkHasConfig(loader.depCache) || checkHasConfig(loader.bundles) || checkHasConfig(loader.packageConfigPaths))
	        throw new TypeError('Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.');

	      this.baseURL = baseURL;
	      prepareBaseURL.call(this);
	    }

	    if (cfg.paths)
	      extend(loader.paths, cfg.paths);

	    envSet(loader, cfg, function(cfg) {
	      if (cfg.paths)
	        extend(loader.paths, cfg.paths);
	    });

	    // warn on wildcard path deprecations
	    if (this.warnings) {
	      for (var p in loader.paths)
	        if (p.indexOf('*') != -1)
	          warn.call(loader, 'Paths configuration "' + p + '" -> "' + loader.paths[p] + '" uses wildcards which are being deprecated for just leaving a trailing "/" to indicate folder paths.');
	    }
	  }

	  if (cfg.defaultJSExtensions) {
	    loader.defaultJSExtensions = cfg.defaultJSExtensions;
	    warn.call(loader, 'The defaultJSExtensions configuration option is deprecated, use packages configuration instead.');
	  }

	  if (cfg.pluginFirst)
	    loader.pluginFirst = cfg.pluginFirst;

	  if (cfg.map) {
	    for (var p in cfg.map) {
	      var v = cfg.map[p];

	      // object map backwards-compat into packages configuration
	      if (typeof v !== 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	        var prop = loader.decanonicalize(p);
	        if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	          prop = prop.substr(0, prop.length - 3);

	        // if a package main, revert it
	        var pkgMatch = '';
	        for (var pkg in loader.packages) {
	          if (prop.substr(0, pkg.length) == pkg
	              && (!prop[pkg.length] || prop[pkg.length] == '/')
	              && pkgMatch.split('/').length < pkg.split('/').length)
	            pkgMatch = pkg;
	        }
	        if (pkgMatch && loader.packages[pkgMatch].main)
	          prop = prop.substr(0, prop.length - loader.packages[pkgMatch].main.length - 1);

	        var pkg = loader.packages[prop] = loader.packages[prop] || {};
	        pkg.map = v;
	      }
	      else {
	        loader.map[p] = v;
	      }
	    }
	  }

	  if (cfg.packageConfigPaths) {
	    var packageConfigPaths = [];
	    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
	      var path = cfg.packageConfigPaths[i];
	      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
	      var normalized = coreResolve.call(loader, path.substr(0, packageLength));
	      packageConfigPaths[i] = normalized + path.substr(packageLength);
	    }
	    loader.packageConfigPaths = packageConfigPaths;
	  }

	  if (cfg.bundles) {
	    for (var p in cfg.bundles) {
	      var bundle = [];
	      for (var i = 0; i < cfg.bundles[p].length; i++) {
	        var defaultJSExtension = loader.defaultJSExtensions && cfg.bundles[p][i].substr(cfg.bundles[p][i].length - 3, 3) != '.js';
	        var normalizedBundleDep = loader.decanonicalize(cfg.bundles[p][i]);
	        if (defaultJSExtension && normalizedBundleDep.substr(normalizedBundleDep.length - 3, 3) == '.js')
	          normalizedBundleDep = normalizedBundleDep.substr(0, normalizedBundleDep.length - 3);
	        bundle.push(normalizedBundleDep);
	      }
	      loader.bundles[p] = bundle;
	    }
	  }

	  if (cfg.packages) {
	    for (var p in cfg.packages) {
	      if (p.match(/^([^\/]+:)?\/\/$/))
	        throw new TypeError('"' + p + '" is not a valid package name.');

	      var prop = coreResolve.call(loader, p);

	      // allow trailing slash in packages
	      if (prop[prop.length - 1] == '/')
	        prop = prop.substr(0, prop.length - 1);

	      setPkgConfig(loader, prop, cfg.packages[p], false);
	    }
	  }

	  for (var c in cfg) {
	    var v = cfg[c];

	    if (indexOf.call(['baseURL', 'map', 'packages', 'bundles', 'paths', 'warnings', 'packageConfigPaths',
	          'loaderErrorStack', 'browserConfig', 'nodeConfig', 'devConfig', 'buildConfig', 'productionConfig'], c) != -1)
	      continue;

	    if (typeof v != 'object' || v instanceof Array) {
	      loader[c] = v;
	    }
	    else {
	      loader[c] = loader[c] || {};

	      for (var p in v) {
	        // base-level wildcard meta does not normalize to retain catch-all quality
	        if (c == 'meta' && p[0] == '*') {
	          extend(loader[c][p] = loader[c][p] || {}, v[p]);
	        }
	        else if (c == 'meta') {
	          // meta can go through global map, with defaultJSExtensions adding
	          var resolved = coreResolve.call(loader, p);
	          if (loader.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	            resolved += '.js';
	          extend(loader[c][resolved] = loader[c][resolved] || {}, v[p]);
	        }
	        else if (c == 'depCache') {
	          var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	          var prop = loader.decanonicalize(p);
	          if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	            prop = prop.substr(0, prop.length - 3);
	          loader[c][prop] = [].concat(v[p]);
	        }
	        else {
	          loader[c][p] = v[p];
	        }
	      }
	    }
	  }

	  envSet(loader, cfg, function(cfg) {
	    loader.config(cfg, true);
	  });
	};
	/*
	 * Package Configuration Extension
	 *
	 * Example:
	 *
	 * SystemJS.packages = {
	 *   jquery: {
	 *     main: 'index.js', // when not set, package name is requested directly
	 *     format: 'amd',
	 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
	 *     modules: {
	 *       '*.ts': {
	 *         loader: 'typescript'
	 *       },
	 *       'vendor/sizzle.js': {
	 *         format: 'global'
	 *       }
	 *     },
	 *     map: {
	 *        // map internal require('sizzle') to local require('./vendor/sizzle')
	 *        sizzle: './vendor/sizzle.js',
	 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
	 *        './vendor/another.js': './another/index.js',
	 *        // test.js / test -> lib/test.js
	 *        './test.js': './lib/test.js',
	 *
	 *        // environment-specific map configurations
	 *        './index.js': {
	 *          '~browser': './index-node.js',
	 *          './custom-condition.js|~export': './index-custom.js'
	 *        }
	 *     },
	 *     // allows for setting package-prefixed depCache
	 *     // keys are normalized module names relative to the package itself
	 *     depCache: {
	 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
	 *       './index.js': ['./test'],
	 *       './test.js': ['external-dep'],
	 *       'external-dep/path.js': ['./another.js']
	 *     }
	 *   }
	 * };
	 *
	 * Then:
	 *   import 'jquery'                       -> jquery/index.js
	 *   import 'jquery/submodule'             -> jquery/submodule.js
	 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
	 *   import 'jquery/vendor/another'        -> another/index.js
	 *
	 * Detailed Behaviours
	 * - main can have a leading "./" can be added optionally
	 * - map and defaultExtension are applied to the main
	 * - defaultExtension adds the extension only if the exact extension is not present
	 * - defaultJSExtensions applies after map when defaultExtension is not set
	 * - if a meta value is available for a module, map and defaultExtension are skipped
	 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
	 * - condition module map is '@env' module in package or '@system-env' globally
	 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
	 * - internal package map targets cannot use boolean conditionals
	 *
	 * Package Configuration Loading
	 *
	 * Not all packages may already have their configuration present in the System config
	 * For these cases, a list of packageConfigPaths can be provided, which when matched against
	 * a request, will first request a ".json" file by the package name to derive the package
	 * configuration from. This allows dynamic loading of non-predetermined code, a key use
	 * case in SystemJS.
	 *
	 * Example:
	 *
	 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
	 *
	 *   // will first request 'packages/new-package/package.json' for the package config
	 *   // before completing the package request to 'packages/new-package/path'
	 *   SystemJS.import('packages/new-package/path');
	 *
	 *   // will first request 'packages/test/package.json' before the main
	 *   SystemJS.import('packages/test');
	 *
	 * When a package matches packageConfigPaths, it will always send a config request for
	 * the package configuration.
	 * The package name itself is taken to be the match up to and including the last wildcard
	 * or trailing slash.
	 * The most specific package config path will be used.
	 * Any existing package configurations for the package will deeply merge with the
	 * package config, with the existing package configurations taking preference.
	 * To opt-out of the package configuration request for a package that matches
	 * packageConfigPaths, use the { configured: true } package config option.
	 *
	 */
	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.packages = {};
	      this.packageConfigPaths = [];
	    };
	  });

	  function getPackage(loader, normalized) {
	    // use most specific package
	    var curPkg, curPkgLen = 0, pkgLen;
	    for (var p in loader.packages) {
	      if (normalized.substr(0, p.length) === p && (normalized.length === p.length || normalized[p.length] === '/')) {
	        pkgLen = p.split('/').length;
	        if (pkgLen > curPkgLen) {
	          curPkg = p;
	          curPkgLen = pkgLen;
	        }
	      }
	    }
	    return curPkg;
	  }

	  function addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions) {
	    // don't apply extensions to folders or if defaultExtension = false
	    if (!subPath || subPath[subPath.length - 1] == '/' || skipExtensions || pkg.defaultExtension === false)
	      return subPath;

	    var metaMatch = false;

	    // exact meta or meta with any content after the last wildcard skips extension
	    if (pkg.meta)
	      getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    // exact global meta or meta with any content after the last wildcard skips extension
	    if (!metaMatch && loader.meta)
	      getMetaMatches(loader.meta, pkgName + '/' + subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    if (metaMatch)
	      return subPath;

	    // work out what the defaultExtension is and add if not there already
	    // NB reconsider if default should really be ".js"?
	    var defaultExtension = '.' + (pkg.defaultExtension || 'js');
	    if (subPath.substr(subPath.length - defaultExtension.length) != defaultExtension)
	      return subPath + defaultExtension;
	    else
	      return subPath;
	  }

	  function applyPackageConfigSync(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return pkgName + (loader.defaultJSExtensions ? '.js' : '');
	    }

	    // map config checking without then with extensions
	    if (pkg.map) {
	      var mapPath = './' + subPath;

	      var mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	      if (mapMatch) {
	        var mapped = doMapSync(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions);
	        if (mapped)
	          return mapped;
	      }
	    }

	    // normal package resolution
	    return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	  }

	  function validMapping(mapMatch, mapped, pkgName, path) {
	    // disallow internal to subpath maps
	    if (mapMatch == '.')
	      throw new Error('Package ' + pkgName + ' has a map entry for "." which is not permitted.');
	    
	    // allow internal ./x -> ./x/y or ./x/ -> ./x/y recursive maps
	    // but only if the path is exactly ./x and not ./x/z
	    if (mapped.substr(0, mapMatch.length) == mapMatch && path.length > mapMatch.length)
	      return false;

	    return true;
	  }

	  function doMapSync(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    if (path[path.length - 1] == '/')
	      path = path.substr(0, path.length - 1);
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'object')
	      throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgName);

	    if (!validMapping(mapMatch, mapped, pkgName, path) || typeof mapped != 'string')
	      return;

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;

	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions);
	    
	    // external map reference
	    return loader.normalizeSync(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function applyPackageConfig(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return Promise.resolve(pkgName + (loader.defaultJSExtensions ? '.js' : ''));
	    }

	    // map config checking without then with extensions
	    var mapPath, mapMatch;

	    if (pkg.map) {
	      mapPath = './' + subPath;
	      mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	    }

	    return (mapMatch ? doMap(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions) : Promise.resolve())
	    .then(function(mapped) {
	      if (mapped)
	        return Promise.resolve(mapped);

	      // normal package resolution / fallback resolution for no conditional match
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions));
	    });
	  }

	  function doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions) {
	    // NB the interpolation cases should strictly skip subsequent interpolation
	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;
	    
	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions))
	      .then(function(name) {
	        return interpolateConditional.call(loader, name, pkgName + '/');
	      });
	    
	    // external map reference
	    return loader.normalize(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function doMap(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    if (path[path.length - 1] == '/')
	      path = path.substr(0, path.length - 1);

	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'string') {
	      if (!validMapping(mapMatch, mapped, pkgName, path))
	        return Promise.resolve();
	      return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	    }

	    // we use a special conditional syntax to allow the builder to handle conditional branch points further
	    if (loader.builder)
	      return Promise.resolve(pkgName + '/#:' + path);

	    // we load all conditions upfront
	    var conditionPromises = [];
	    var conditions = [];
	    for (var e in mapped) {
	      var c = parseCondition(e);
	      conditions.push({
	        condition: c,
	        map: mapped[e]
	      });
	      conditionPromises.push(loader['import'](c.module, pkgName));
	    }

	    // map object -> conditional map
	    return Promise.all(conditionPromises)
	    .then(function(conditionValues) {
	      // first map condition to match is used
	      for (var i = 0; i < conditions.length; i++) {
	        var c = conditions[i].condition;
	        var value = readMemberExpression(c.prop, conditionValues[i]);
	        if (!c.negate && value || c.negate && !value)
	          return conditions[i].map;
	      }
	    })
	    .then(function(mapped) {
	      if (mapped) {
	        if (!validMapping(mapMatch, mapped, pkgName, path))
	          return;
	        return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	      }

	      // no environment match -> fallback to original subPath by returning undefined
	    });
	  }

	  // normalizeSync = decanonicalize + package resolution
	  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.decanonicalize = SystemJSLoader.prototype.normalize;

	  // decanonicalize must JUST handle package defaultExtension: false case when defaultJSExtensions is set
	  // to be deprecated!
	  hook('decanonicalize', function(decanonicalize) {
	    return function(name, parentName) {
	      if (this.builder)
	        return decanonicalize.call(this, name, parentName, true);

	      var decanonicalized = decanonicalize.call(this, name, parentName, false);

	      if (!this.defaultJSExtensions)
	        return decanonicalized;
	    
	      var pkgName = getPackage(this, decanonicalized);

	      var pkg = this.packages[pkgName];
	      var defaultExtension = pkg && pkg.defaultExtension;

	      if (defaultExtension == undefined && pkg && pkg.meta)
	        getMetaMatches(pkg.meta, decanonicalized.substr(pkgName), function(metaPattern, matchMeta, matchDepth) {
	          if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1) {
	            defaultExtension = false;
	            return true;
	          }
	        });
	      
	      if ((defaultExtension === false || defaultExtension && defaultExtension != '.js') && name.substr(name.length - 3, 3) != '.js' && decanonicalized.substr(decanonicalized.length - 3, 3) == '.js')
	        decanonicalized = decanonicalized.substr(0, decanonicalized.length - 3);

	      return decanonicalized;
	    };
	  });

	  hook('normalizeSync', function(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      // apply contextual package map first
	      // (we assume the parent package config has already been loaded)
	      if (parentName)
	        var parentPackageName = getPackage(loader, parentName) ||
	            loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	            getPackage(loader, parentName.substr(0, parentName.length - 3));

	      var parentPackage = parentPackageName && loader.packages[parentPackageName];

	      // ignore . since internal maps handled by standard package resolution
	      if (parentPackage && name[0] != '.') {
	        var parentMap = parentPackage.map;
	        var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	        if (parentMapMatch && typeof parentMap[parentMapMatch] == 'string') {
	          var mapped = doMapSync(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);      
	          if (mapped)
	            return mapped;
	        }
	      }

	      var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	      // apply map, core, paths, contextual package map
	      var normalized = normalizeSync.call(loader, name, parentName, false);

	      // undo defaultJSExtension
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	        defaultJSExtension = false;
	      if (defaultJSExtension)
	        normalized = normalized.substr(0, normalized.length - 3);

	      var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	      var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	      if (!pkgName)
	        return normalized + (defaultJSExtension ? '.js' : '');

	      var subPath = normalized.substr(pkgName.length + 1);

	      return applyPackageConfigSync(loader, loader.packages[pkgName] || {}, pkgName, subPath, isPlugin);
	    };
	  });

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      return Promise.resolve()
	      .then(function() {
	        // apply contextual package map first
	        // (we assume the parent package config has already been loaded)
	        if (parentName)
	          var parentPackageName = getPackage(loader, parentName) ||
	              loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	              getPackage(loader, parentName.substr(0, parentName.length - 3));

	        var parentPackage = parentPackageName && loader.packages[parentPackageName];

	        // ignore . since internal maps handled by standard package resolution
	        if (parentPackage && name.substr(0, 2) != './') {
	          var parentMap = parentPackage.map;
	          var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	          if (parentMapMatch)
	            return doMap(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	        }

	        return Promise.resolve();
	      })
	      .then(function(mapped) {
	        if (mapped)
	          return mapped;

	        var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	        // apply map, core, paths, contextual package map
	        var normalized = normalize.call(loader, name, parentName, false);

	        // undo defaultJSExtension
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	          defaultJSExtension = false;
	        if (defaultJSExtension)
	          normalized = normalized.substr(0, normalized.length - 3);

	        var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	        var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	        if (!pkgName)
	          return Promise.resolve(normalized + (defaultJSExtension ? '.js' : ''));

	        var pkg = loader.packages[pkgName];

	        // if package is already configured or not a dynamic config package, use existing package config
	        var isConfigured = pkg && (pkg.configured || !pkgConfigMatch);
	        return (isConfigured ? Promise.resolve(pkg) : loadPackageConfigPath(loader, pkgName, pkgConfigMatch.configPath))
	        .then(function(pkg) {
	          var subPath = normalized.substr(pkgName.length + 1);

	          return applyPackageConfig(loader, pkg, pkgName, subPath, isPlugin);
	        });
	      });
	    };
	  });

	  // check if the given normalized name matches a packageConfigPath
	  // if so, loads the config
	  var packageConfigPaths = {};

	  // data object for quick checks against package paths
	  function createPkgConfigPathObj(path) {
	    var lastWildcard = path.lastIndexOf('*');
	    var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
	    return {
	      length: length,
	      regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
	      wildcard: lastWildcard != -1
	    };
	  }

	  // most specific match wins
	  function getPackageConfigMatch(loader, normalized) {
	    var pkgName, exactMatch = false, configPath;
	    for (var i = 0; i < loader.packageConfigPaths.length; i++) {
	      var packageConfigPath = loader.packageConfigPaths[i];
	      var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
	      if (normalized.length < p.length)
	        continue;
	      var match = normalized.match(p.regEx);
	      if (match && (!pkgName || (!(exactMatch && p.wildcard) && pkgName.length < match[1].length))) {
	        pkgName = match[1];
	        exactMatch = !p.wildcard;
	        configPath = pkgName + packageConfigPath.substr(p.length);
	      }
	    }

	    if (!pkgName)
	      return;

	    return {
	      packageName: pkgName,
	      configPath: configPath
	    };
	  }

	  function loadPackageConfigPath(loader, pkgName, pkgConfigPath) {
	    var configLoader = loader.pluginLoader || loader;

	    // NB remove this when json is default
	    (configLoader.meta[pkgConfigPath] = configLoader.meta[pkgConfigPath] || {}).format = 'json';
	    configLoader.meta[pkgConfigPath].loader = null;

	    return configLoader.load(pkgConfigPath)
	    .then(function() {
	      var cfg = configLoader.get(pkgConfigPath)['default'];

	      // support "systemjs" prefixing
	      if (cfg.systemjs)
	        cfg = cfg.systemjs;

	      // modules backwards compatibility
	      if (cfg.modules) {
	        cfg.meta = cfg.modules;
	        warn.call(loader, 'Package config file ' + pkgConfigPath + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	      }

	      return setPkgConfig(loader, pkgName, cfg, true);
	    });
	  }

	  function getMetaMatches(pkgMeta, subPath, matchFn) {
	    // wildcard meta
	    var meta = {};
	    var wildcardIndex;
	    for (var module in pkgMeta) {
	      // allow meta to start with ./ for flexibility
	      var dotRel = module.substr(0, 2) == './' ? './' : '';
	      if (dotRel)
	        module = module.substr(2);

	      wildcardIndex = module.indexOf('*');
	      if (wildcardIndex === -1)
	        continue;

	      if (module.substr(0, wildcardIndex) == subPath.substr(0, wildcardIndex)
	          && module.substr(wildcardIndex + 1) == subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
	        // alow match function to return true for an exit path
	        if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
	          return;
	      }
	    }
	    // exact meta
	    var exactMeta = pkgMeta[subPath] && pkgMeta.hasOwnProperty && pkgMeta.hasOwnProperty(subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
	    if (exactMeta)
	      matchFn(exactMeta, exactMeta, 0);
	  }

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      return Promise.resolve(locate.call(this, load))
	      .then(function(address) {
	        var pkgName = getPackage(loader, load.name);
	        if (pkgName) {
	          var pkg = loader.packages[pkgName];
	          var subPath = load.name.substr(pkgName.length + 1);

	          var meta = {};
	          if (pkg.meta) {
	            var bestDepth = 0;

	            // NB support a main shorthand in meta here?
	            getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	              if (matchDepth > bestDepth)
	                bestDepth = matchDepth;
	              extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
	            });

	            extendMeta(load.metadata, meta);
	          }

	          // format
	          if (pkg.format && !load.metadata.loader)
	            load.metadata.format = load.metadata.format || pkg.format;
	        }

	        return address;
	      });
	    };
	  });

	})();
	/*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && !curMeta.entry && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, startEntry, loader) {
	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          var setter = importerModule.setters[importerIndex];
	          if (setter)
	            setter(exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });

	    if (typeof declaration == 'function')
	      declaration = { setters: [], execute: declaration };

	    // allowing undefined declaration was a mistake! To be deprecated.
	    declaration = declaration || { setters: [], execute: function() {} };
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, entry, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output !== undefined)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = loader.newModule(exports);
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = loader.newModule(getESModule(exports));
	    // just use the 'default' export
	    else
	      entry.esModule = loader.newModule({ 'default': exports, __useDefault: true });
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, entry, seen, loader) {
	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, loader.defined[depName], seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.apply(this, arguments)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  // implement a perforance shortpath for System.load with no deps
	  hook('load', function(doLoad) {
	    return function(normalized) {
	      var loader = this;
	      var entry = loader.defined[normalized];

	      if (!entry || entry.deps.length)
	        return doLoad.apply(this, arguments);

	      entry.originalIndices = entry.normalizedDeps = [];

	      // recursively ensure that the module and all its 
	      // dependencies are linked (with dependency group handling)
	      link(normalized, entry, loader);

	      // now handle dependency execution in correct order
	      ensureEvaluated(normalized, entry, [], loader);
	      if (!entry.esModule)
	        entry.esModule = loader.newModule(entry.module.exports);

	      // remove from the registry
	      if (!loader.trace)
	        loader.defined[normalized] = undefined;

	      // return the defined module object
	      loader.set(normalized, entry.esModule);

	      return Promise.resolve();
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, entry, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, entry, [], loader);

	            if (!entry.esModule)
	              entry.esModule = loader.newModule(entry.module.exports);

	            // remove from the registry
	            if (!loader.trace)
	              loader.defined[load.name] = undefined;

	            // return the defined module object
	            return entry.esModule;
	          }
	        };
	      });
	    };
	  });
	})();
	/*
	 * Extension to detect ES6 and auto-load Traceur or Babel for processing
	 */
	(function() {
	  // good enough ES6 module detection regex - format detections not designed to be accurate, but to handle the 99% use case
	  var esmRegEx = /(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/;

	  var traceurRuntimeRegEx = /\$traceurRuntime\s*\./;
	  var babelHelpersRegEx = /babelHelpers\s*\./;

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      var args = arguments;
	      return translate.apply(loader, args)
	      .then(function(source) {
	        // detect & transpile ES6
	        if (load.metadata.format == 'esm' || load.metadata.format == 'es6' || !load.metadata.format && source.match(esmRegEx)) {
	          if (load.metadata.format == 'es6')
	            warn.call(loader, 'Module ' + load.name + ' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".');

	          load.metadata.format = 'esm';

	          if (load.metadata.deps) {
	            var depInject = '';
	            for (var i = 0; i < load.metadata.deps.length; i++)
	              depInject += 'import "' + load.metadata.deps[i] + '"; ';
	            load.source = depInject + source;
	          }

	          if (loader.transpiler === false) {
	            // we accept translation to esm for builds though to enable eg rollup optimizations
	            if (loader.builder)
	              return source;
	            throw new TypeError('Unable to dynamically transpile ES module as SystemJS.transpiler set to false.');
	          }

	          // setting _loader.loadedTranspiler = false tells the next block to
	          // do checks for setting transpiler metadata
	          loader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;
	          if (loader.pluginLoader)
	            loader.pluginLoader._loader.loadedTranspiler = loader._loader.loadedTranspiler || false;

	          // do transpilation
	          return (loader._loader.transpilerPromise || (
	            loader._loader.transpilerPromise = Promise.resolve(
	              __global[loader.transpiler == 'typescript' ? 'ts' : loader.transpiler] || (loader.pluginLoader || loader)['import'](loader.transpiler)
	          ))).then(function(transpiler) {
	            loader._loader.loadedTranspilerRuntime = true;

	            // translate hooks means this is a transpiler plugin instead of a raw implementation
	            if (transpiler.translate) {
	              // if transpiler is the same as the plugin loader, then don't run twice
	              if (transpiler == load.metadata.loaderModule)
	                return load.source;

	              // convert the source map into an object for transpilation chaining
	              if (typeof load.metadata.sourceMap == 'string')
	                load.metadata.sourceMap = JSON.parse(load.metadata.sourceMap);

	              return Promise.resolve(transpiler.translate.apply(loader, args))
	              .then(function(source) {
	                // sanitize sourceMap if an object not a JSON string
	                var sourceMap = load.metadata.sourceMap;
	                if (sourceMap && typeof sourceMap == 'object') {
	                  var originalName = load.address.split('!')[0];
	                  
	                  // force set the filename of the original file
	                  if (!sourceMap.file || sourceMap.file == load.address)
	                    sourceMap.file = originalName + '!transpiled';

	                  // force set the sources list if only one source
	                  if (!sourceMap.sources || sourceMap.sources.length <= 1 && (!sourceMap.sources[0] || sourceMap.sources[0] == load.address))
	                    sourceMap.sources = [originalName];
	                }

	                if (load.metadata.format == 'esm' && !loader.builder && detectRegisterFormat(source))
	                  load.metadata.format = 'register';
	                return source;
	              });
	            }

	            // legacy builder support
	            if (loader.builder)
	              load.metadata.originalSource = load.source;
	            
	            // defined in es6-module-loader/src/transpile.js
	            return transpile.call(loader, load)
	            .then(function(source) {
	              // clear sourceMap as transpiler embeds it
	              load.metadata.sourceMap = undefined;
	              return source;
	            });            
	          }, function(err) {
	            throw addToError(err, 'Unable to load transpiler to transpile ' + load.name);
	          });
	        }

	        // skip transpiler and transpiler runtime loading when transpiler is disabled
	        if (loader.transpiler === false)
	          return source;

	        // load the transpiler correctly
	        if (loader._loader.loadedTranspiler === false && (loader.transpiler == 'traceur' || loader.transpiler == 'typescript' || loader.transpiler == 'babel')
	            && load.name == loader.normalizeSync(loader.transpiler)) {

	          // always load transpiler as a global
	          if (source.length > 100 && !load.metadata.format) {
	            load.metadata.format = 'global';

	            if (loader.transpiler === 'traceur')
	              load.metadata.exports = 'traceur';
	            if (loader.transpiler === 'typescript')
	              load.metadata.exports = 'ts';
	          }

	          loader._loader.loadedTranspiler = true;
	        }

	        // load the transpiler runtime correctly
	        if (loader._loader.loadedTranspilerRuntime === false) {
	          if (load.name == loader.normalizeSync('traceur-runtime')
	              || load.name == loader.normalizeSync('babel/external-helpers*')) {
	            if (source.length > 100)
	              load.metadata.format = load.metadata.format || 'global';

	            loader._loader.loadedTranspilerRuntime = true;
	          }
	        }

	        // detect transpiler runtime usage to load runtimes
	        if ((load.metadata.format == 'register' || load.metadata.bundle) && loader._loader.loadedTranspilerRuntime !== true) {
	          if (loader.transpiler == 'traceur' && !__global.$traceurRuntime && load.source.match(traceurRuntimeRegEx)) {
	            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
	            return loader['import']('traceur-runtime').then(function() {
	              return source;
	            });
	          }
	          if (loader.transpiler == 'babel' && !__global.babelHelpers && load.source.match(babelHelpersRegEx)) {
	            loader._loader.loadedTranspilerRuntime = loader._loader.loadedTranspilerRuntime || false;
	            return loader['import']('babel/external-helpers').then(function() {
	              return source;
	            });
	          }
	        }

	        return source;
	      });
	    };
	  });

	})();
	/*
	  SystemJS Global Format

	  Supports
	    metadata.deps
	    metadata.globals
	    metadata.exports

	  Without metadata.exports, detects writes to the global object.
	*/
	var __globalName = typeof self != 'undefined' ? 'self' : 'global';

	hook('fetch', function(fetch) {
	  return function(load) {
	    if (load.metadata.exports && !load.metadata.format)
	      load.metadata.format = 'global';
	    return fetch.call(this, load);
	  };
	});

	// ideally we could support script loading for globals, but the issue with that is that
	// we can't do it with AMD support side-by-side since AMD support means defining the
	// global define, and global support means not definining it, yet we don't have any hook
	// into the "pre-execution" phase of a script tag being loaded to handle both cases
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    var loader = this;

	    if (!load.metadata.format)
	      load.metadata.format = 'global';

	    // global is a fallback module format
	    if (load.metadata.format == 'global' && !load.metadata.entry) {

	      var entry = createEntry();

	      load.metadata.entry = entry;

	      entry.deps = [];

	      for (var g in load.metadata.globals) {
	        var gl = load.metadata.globals[g];
	        if (gl)
	          entry.deps.push(gl);
	      }

	      entry.execute = function(require, exports, module) {

	        var globals;
	        if (load.metadata.globals) {
	          globals = {};
	          for (var g in load.metadata.globals)
	            if (load.metadata.globals[g])
	              globals[g] = require(load.metadata.globals[g]);
	        }
	        
	        var exportName = load.metadata.exports;

	        if (exportName)
	          load.source += '\n' + __globalName + '["' + exportName + '"] = ' + exportName + ';';

	        var retrieveGlobal = loader.get('@@global-helpers').prepareGlobal(module.id, exportName, globals, !!load.metadata.encapsulateGlobal);
	        __exec.call(loader, load);

	        return retrieveGlobal();
	      }
	    }
	    return instantiate.call(this, load);
	  };
	});


	function getGlobalValue(exports) {
	  if (typeof exports == 'string')
	    return readMemberExpression(exports, __global);

	  if (!(exports instanceof Array))
	    throw new Error('Global exports must be a string or array.');

	  var globalValue = {};
	  var first = true;
	  for (var i = 0; i < exports.length; i++) {
	    var val = readMemberExpression(exports[i], __global);
	    if (first) {
	      globalValue['default'] = val;
	      first = false;
	    }
	    globalValue[exports[i].split('.').pop()] = val;
	  }
	  return globalValue;
	}

	hook('reduceRegister_', function(reduceRegister) {
	  return function(load, register) {
	    if (register || (!load.metadata.exports && !(isWorker && load.metadata.format == 'global')))
	      return reduceRegister.call(this, load, register);

	    load.metadata.format = 'global';
	    var entry = load.metadata.entry = createEntry();
	    entry.deps = load.metadata.deps;
	    var globalValue = getGlobalValue(load.metadata.exports);
	    entry.execute = function() {
	      return globalValue;
	    };
	  };
	});

	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // bare minimum ignores
	    var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external', 
	      'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

	    var globalSnapshot;

	    function forEachGlobal(callback) {
	      if (Object.keys)
	        Object.keys(__global).forEach(callback);
	      else
	        for (var g in __global) {
	          if (!hasOwnProperty.call(__global, g))
	            continue;
	          callback(g);
	        }
	    }

	    function forEachGlobalValue(callback) {
	      forEachGlobal(function(globalName) {
	        if (indexOf.call(ignoredGlobalProps, globalName) != -1)
	          return;
	        try {
	          var value = __global[globalName];
	        }
	        catch (e) {
	          ignoredGlobalProps.push(globalName);
	        }
	        callback(globalName, value);
	      });
	    }

	    loader.set('@@global-helpers', loader.newModule({
	      prepareGlobal: function(moduleName, exports, globals, encapsulate) {
	        // disable module detection
	        var curDefine = __global.define;
	        
	        __global.define = undefined;

	        // set globals
	        var oldGlobals;
	        if (globals) {
	          oldGlobals = {};
	          for (var g in globals) {
	            oldGlobals[g] = __global[g];
	            __global[g] = globals[g];
	          }
	        }

	        // store a complete copy of the global object in order to detect changes
	        if (!exports) {
	          globalSnapshot = {};

	          forEachGlobalValue(function(name, value) {
	            globalSnapshot[name] = value;
	          });
	        }

	        // return function to retrieve global
	        return function() {
	          var globalValue = exports ? getGlobalValue(exports) : {};

	          var singleGlobal;
	          var multipleExports = !!exports;

	          if (!exports || encapsulate)
	            forEachGlobalValue(function(name, value) {
	              if (globalSnapshot[name] === value)
	                return;
	              if (typeof value == 'undefined')
	                return;
	              
	              // allow global encapsulation where globals are removed
	              if (encapsulate)
	                __global[name] = undefined;

	              if (!exports) {
	                globalValue[name] = value;

	                if (typeof singleGlobal != 'undefined') {
	                  if (!multipleExports && singleGlobal !== value)
	                    multipleExports = true;
	                }
	                else {
	                  singleGlobal = value;
	                }
	              }
	            });

	          globalValue = multipleExports ? globalValue : singleGlobal;

	          // revert globals
	          if (oldGlobals) {
	            for (var g in oldGlobals)
	              __global[g] = oldGlobals[g];
	          }
	          __global.define = curDefine;

	          return globalValue;
	        };
	      }
	    }));
	  };
	});
	/*
	  SystemJS CommonJS Format
	*/
	(function() {
	  // CJS Module Format
	  // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
	  var cjsExportsRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/;
	  // RegEx adjusted from https://github.com/jbrantly/yabble/blob/master/lib/yabble.js#L339
	  var cjsRequireRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g;
	  var commentRegEx = /(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

	  var stringRegEx = /("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g;

	  // used to support leading #!/usr/bin/env in scripts as supported in Node
	  var hashBangRegEx = /^\#\!.*/;

	  function getCJSDeps(source) {
	    cjsRequireRegEx.lastIndex = commentRegEx.lastIndex = stringRegEx.lastIndex = 0;

	    var deps = [];

	    var match;

	    // track string and comment locations for unminified source    
	    var stringLocations = [], commentLocations = [];

	    function inLocation(locations, match) {
	      for (var i = 0; i < locations.length; i++)
	        if (locations[i][0] < match.index && locations[i][1] > match.index)
	          return true;
	      return false;
	    }

	    if (source.length / source.split('\n').length < 200) {
	      while (match = stringRegEx.exec(source))
	        stringLocations.push([match.index, match.index + match[0].length]);

	      // TODO: track template literals here before comments
	      
	      while (match = commentRegEx.exec(source)) {
	        // only track comments not starting in strings
	        if (!inLocation(stringLocations, match))
	          commentLocations.push([match.index + match[1].length, match.index + match[0].length - 1]);
	      }
	    }

	    while (match = cjsRequireRegEx.exec(source)) {
	      // ensure we're not within a string or comment location
	      if (!inLocation(stringLocations, match) && !inLocation(commentLocations, match)) {
	        var dep = match[1].substr(1, match[1].length - 2);
	        // skip cases like require('" + file + "')
	        if (dep.match(/"|'/))
	          continue;
	        // trailing slash requires are removed as they don't map mains in SystemJS
	        if (dep[dep.length - 1] == '/')
	          dep = dep.substr(0, dep.length - 1);
	        deps.push(dep);
	      }
	    }

	    return deps;
	  }

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      if (!load.metadata.format) {
	        cjsExportsRegEx.lastIndex = 0;
	        cjsRequireRegEx.lastIndex = 0;
	        if (cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source))
	          load.metadata.format = 'cjs';
	      }

	      if (load.metadata.format == 'cjs') {
	        var metaDeps = load.metadata.deps;
	        var deps = load.metadata.cjsRequireDetection === false ? [] : getCJSDeps(load.source);

	        for (var g in load.metadata.globals)
	          if (load.metadata.globals[g])
	            deps.push(load.metadata.globals[g]);

	        var entry = createEntry();

	        load.metadata.entry = entry;

	        entry.deps = deps;
	        entry.executingRequire = true;
	        entry.execute = function(_require, exports, module) {
	          function require(name) {
	            if (name[name.length - 1] == '/')
	              name = name.substr(0, name.length - 1);
	            return _require.apply(this, arguments);
	          }
	          require.resolve = function(name) {
	            return loader.get('@@cjs-helpers').requireResolve(name, module.id);
	          };
	          // support module.paths ish
	          module.paths = [];
	          module.require = _require;

	          // ensure meta deps execute first
	          if (!load.metadata.cjsDeferDepsExecute)
	            for (var i = 0; i < metaDeps.length; i++)
	              require(metaDeps[i]);

	          var pathVars = loader.get('@@cjs-helpers').getPathVars(module.id);
	          var __cjsWrapper = {
	            exports: exports,
	            args: [require, exports, module, pathVars.filename, pathVars.dirname, __global, __global]
	          };

	          var cjsWrapper = "(function(require, exports, module, __filename, __dirname, global, GLOBAL";

	          // add metadata.globals to the wrapper arguments
	          if (load.metadata.globals)
	            for (var g in load.metadata.globals) {
	              __cjsWrapper.args.push(require(load.metadata.globals[g]));
	              cjsWrapper += ", " + g;
	            }

	          // disable AMD detection
	          var define = __global.define;
	          __global.define = undefined;
	          __global.__cjsWrapper = __cjsWrapper;

	          load.source = cjsWrapper + ") {" + load.source.replace(hashBangRegEx, '') + "\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);";

	          __exec.call(loader, load);

	          __global.__cjsWrapper = undefined;
	          __global.define = define;
	        };
	      }

	      return instantiate.call(loader, load);
	    };
	  });
	})();
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)
	      var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

	    function stripOrigin(path) {
	      if (path.substr(0, 8) == 'file:///')
	        return path.substr(7 + !!isWindows);
	      
	      if (windowOrigin && path.substr(0, windowOrigin.length) == windowOrigin)
	        return path.substr(windowOrigin.length);

	      return path;
	    }

	    loader.set('@@cjs-helpers', loader.newModule({
	      requireResolve: function(request, parentId) {
	        return stripOrigin(loader.normalizeSync(request, parentId));
	      },
	      getPathVars: function(moduleId) {
	        // remove any plugin syntax
	        var pluginIndex = moduleId.lastIndexOf('!');
	        var filename;
	        if (pluginIndex != -1)
	          filename = moduleId.substr(0, pluginIndex);
	        else
	          filename = moduleId;

	        var dirname = filename.split('/');
	        dirname.pop();
	        dirname = dirname.join('/');

	        return {
	          filename: stripOrigin(filename),
	          dirname: stripOrigin(dirname)
	        };
	      }
	    }))
	  };
	});/*
	 * AMD Helper function module
	 * Separated into its own file as this is the part needed for full AMD support in SFX builds
	 * NB since implementations have now diverged this can be merged back with amd.js
	 */

	hook('fetch', function(fetch) {
	  return function(load) {
	    // script load implies define global leak
	    if (load.metadata.scriptLoad && isBrowser)
	      __global.define = this.amdDefine;
	    return fetch.call(this, load);
	  };
	});
	 
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(this);

	    var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	    var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
	    var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
	    var fnBracketRegEx = /\(([^\)]*)\)/;
	    var wsRegEx = /^\s+|\s+$/g;
	    
	    var requireRegExs = {};

	    function getCJSDeps(source, requireIndex) {

	      // remove comments
	      source = source.replace(commentRegEx, '');

	      // determine the require alias
	      var params = source.match(fnBracketRegEx);
	      var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

	      // find or generate the regex for this requireAlias
	      var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

	      requireRegEx.lastIndex = 0;

	      var deps = [];

	      var match;
	      while (match = requireRegEx.exec(source))
	        deps.push(match[2] || match[3]);

	      return deps;
	    }

	    /*
	      AMD-compatible require
	      To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
	    */
	    function require(names, callback, errback, referer) {
	      // in amd, first arg can be a config object... we just ignore
	      if (typeof names == 'object' && !(names instanceof Array))
	        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

	      // amd require
	      if (typeof names == 'string' && typeof callback == 'function')
	        names = [names];
	      if (names instanceof Array) {
	        var dynamicRequires = [];
	        for (var i = 0; i < names.length; i++)
	          dynamicRequires.push(loader['import'](names[i], referer));
	        Promise.all(dynamicRequires).then(function(modules) {
	          if (callback)
	            callback.apply(null, modules);
	        }, errback);
	      }

	      // commonjs require
	      else if (typeof names == 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && names.substr(names.length - 3, 3) != '.js';
	        var normalized = loader.decanonicalize(names, referer);
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	          normalized = normalized.substr(0, normalized.length - 3);
	        var module = loader.get(normalized);
	        if (!module)
	          throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
	        return module.__useDefault ? module['default'] : module;
	      }

	      else
	        throw new TypeError('Invalid require');
	    }

	    function define(name, deps, factory) {
	      if (typeof name != 'string') {
	        factory = deps;
	        deps = name;
	        name = null;
	      }
	      if (!(deps instanceof Array)) {
	        factory = deps;
	        deps = ['require', 'exports', 'module'].splice(0, factory.length);
	      }

	      if (typeof factory != 'function')
	        factory = (function(factory) {
	          return function() { return factory; }
	        })(factory);

	      // in IE8, a trailing comma becomes a trailing undefined entry
	      if (deps[deps.length - 1] === undefined)
	        deps.pop();

	      // remove system dependencies
	      var requireIndex, exportsIndex, moduleIndex;
	      
	      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
	        
	        deps.splice(requireIndex, 1);

	        // only trace cjs requires for non-named
	        // named defines assume the trace has already been done
	        if (!name)
	          deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
	      }

	      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
	        deps.splice(exportsIndex, 1);
	      
	      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
	        deps.splice(moduleIndex, 1);

	      function execute(req, exports, module) {
	        var depValues = [];
	        for (var i = 0; i < deps.length; i++)
	          depValues.push(req(deps[i]));

	        module.uri = module.id;

	        module.config = function() {};

	        // add back in system dependencies
	        if (moduleIndex != -1)
	          depValues.splice(moduleIndex, 0, module);
	        
	        if (exportsIndex != -1)
	          depValues.splice(exportsIndex, 0, exports);
	        
	        if (requireIndex != -1) {
	          function contextualRequire(names, callback, errback) {
	            if (typeof names == 'string' && typeof callback != 'function')
	              return req(names);
	            return require.call(loader, names, callback, errback, module.id);
	          }
	          contextualRequire.toUrl = function(name) {
	            // normalize without defaultJSExtensions
	            var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
	            var url = loader.decanonicalize(name, module.id);
	            if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
	              url = url.substr(0, url.length - 3);
	            return url;
	          };
	          depValues.splice(requireIndex, 0, contextualRequire);
	        }

	        // set global require to AMD require
	        var curRequire = __global.require;
	        __global.require = require;

	        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

	        __global.require = curRequire;

	        if (typeof output == 'undefined' && module)
	          output = module.exports;

	        if (typeof output != 'undefined')
	          return output;
	      }

	      var entry = createEntry();
	      entry.name = name && (loader.decanonicalize || loader.normalize).call(loader, name);
	      entry.deps = deps;
	      entry.execute = execute;

	      loader.pushRegister_({
	        amd: true,
	        entry: entry
	      });
	    }
	    define.amd = {};

	    // reduction function to attach defines to a load record
	    hook('reduceRegister_', function(reduceRegister) {
	      return function(load, register) {
	        // only handle AMD registers here
	        if (!register || !register.amd)
	          return reduceRegister.call(this, load, register);

	        var curMeta = load && load.metadata;
	        var entry = register.entry;

	        if (curMeta) {
	          if (!curMeta.format || curMeta.format == 'detect')
	            curMeta.format = 'amd';
	          else if (!entry.name && curMeta.format != 'amd')
	            throw new Error('AMD define called while executing ' + curMeta.format + ' module ' + load.name);
	        }

	        // anonymous define
	        if (!entry.name) {
	          if (!curMeta)
	            throw new TypeError('Unexpected anonymous AMD define.');

	          if (curMeta.entry && !curMeta.entry.name)
	            throw new Error('Multiple anonymous defines in module ' + load.name);
	          
	          curMeta.entry = entry;
	        }
	        // named define
	        else {
	          // if we don't have any other defines, 
	          // then let this be an anonymous define
	          // this is just to support single modules of the form:
	          // define('jquery')
	          // still loading anonymously
	          // because it is done widely enough to be useful
	          // as soon as there is more than one define, this gets removed though
	          if (curMeta) {
	            if (!curMeta.entry && !curMeta.bundle)
	              curMeta.entry = entry;
	            else if (curMeta.entry && curMeta.entry.name && curMeta.entry.name != load.name)
	              curMeta.entry = undefined;

	            // note this is now a bundle
	            curMeta.bundle = true;
	          }

	          // define the module through the register registry
	          if (!(entry.name in this.defined))
	            this.defined[entry.name] = entry;
	        }
	      };
	    });

	    loader.amdDefine = define;
	    loader.amdRequire = require;
	  };
	});/*
	  SystemJS AMD Format
	*/
	(function() {
	  // AMD Module Format Detection RegEx
	  // define([.., .., ..], ...)
	  // define(varName); || define(function(require, exports) {}); || define({})
	  var amdRegEx = /(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      
	      if (load.metadata.format == 'amd' || !load.metadata.format && load.source.match(amdRegEx)) {
	        load.metadata.format = 'amd';
	        
	        if (!loader.builder && loader.execute !== false) {
	          var curDefine = __global.define;
	          __global.define = this.amdDefine;

	          try {
	            __exec.call(loader, load);
	          }
	          finally {
	            __global.define = curDefine;
	          }

	          if (!load.metadata.entry && !load.metadata.bundle)
	            throw new TypeError('AMD module ' + load.name + ' did not define');
	        }
	        else {
	          load.metadata.execute = function() {
	            return load.metadata.builderExecute.apply(this, arguments);
	          };
	        }
	      }

	      return instantiate.call(loader, load);
	    };
	  });

	})();
	/*
	  SystemJS Loader Plugin Support

	  Supports plugin loader syntax with "!", or via metadata.loader

	  The plugin name is loaded as a module itself, and can override standard loader hooks
	  for the plugin resource. See the plugin section of the systemjs readme.
	*/

	(function() {
	  function getParentName(loader, parentName) {
	    // if parent is a plugin, normalize against the parent plugin argument only
	    if (parentName) {
	      var parentPluginIndex;
	      if (loader.pluginFirst) {
	        if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
	          return parentName.substr(parentPluginIndex + 1);
	      }
	      else {
	        if ((parentPluginIndex = parentName.indexOf('!')) != -1)
	          return parentName.substr(0, parentPluginIndex);
	      }

	      return parentName;
	    }
	  }

	  function parsePlugin(loader, name) {
	    var argumentName;
	    var pluginName;

	    var pluginIndex = name.lastIndexOf('!');

	    if (pluginIndex == -1)
	      return;

	    if (loader.pluginFirst) {
	      argumentName = name.substr(pluginIndex + 1);
	      pluginName = name.substr(0, pluginIndex);
	    }
	    else {
	      argumentName = name.substr(0, pluginIndex);
	      pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
	    }

	    return {
	      argument: argumentName,
	      plugin: pluginName
	    };
	  }

	  // put name back together after parts have been normalized
	  function combinePluginParts(loader, argumentName, pluginName, defaultExtension) {
	    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
	      argumentName = argumentName.substr(0, argumentName.length - 3);

	    if (loader.pluginFirst) {
	      return pluginName + '!' + argumentName;
	    }
	    else {
	      return argumentName + '!' + pluginName;
	    }
	  }

	  // note if normalize will add a default js extension
	  // if so, remove for backwards compat
	  // this is strange and sucks, but will be deprecated
	  function checkDefaultExtension(loader, arg) {
	    return loader.defaultJSExtensions && arg.substr(arg.length - 3, 3) != '.js';
	  }

	  function createNormalizeSync(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      var parsed = parsePlugin(loader, name);
	      parentName = getParentName(this, parentName);

	      if (!parsed)
	        return normalizeSync.call(this, name, parentName, isPlugin);

	      // if this is a plugin, normalize the plugin name and the argument
	      var argumentName = loader.normalizeSync(parsed.argument, parentName, true);
	      var pluginName = loader.normalizeSync(parsed.plugin, parentName, true);
	      return combinePluginParts(loader, argumentName, pluginName, checkDefaultExtension(loader, parsed.argument));
	    };
	  }

	  hook('decanonicalize', createNormalizeSync);
	  hook('normalizeSync', createNormalizeSync);

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      parentName = getParentName(this, parentName);

	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalize.call(loader, name, parentName, isPlugin);

	      return Promise.all([
	        loader.normalize(parsed.argument, parentName, true),
	        loader.normalize(parsed.plugin, parentName, false)
	      ])
	      .then(function(normalized) {
	        return combinePluginParts(loader, normalized[0], normalized[1], checkDefaultExtension(loader, parsed.argument));
	      });
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;

	      var name = load.name;

	      // plugin syntax
	      var pluginSyntaxIndex;
	      if (loader.pluginFirst) {
	        if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
	          load.metadata.loader = name.substr(0, pluginSyntaxIndex);
	          load.name = name.substr(pluginSyntaxIndex + 1);
	        }
	      }
	      else {
	        if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
	          load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
	          load.name = name.substr(0, pluginSyntaxIndex);
	        }
	      }

	      return locate.call(loader, load)
	      .then(function(address) {
	        if (pluginSyntaxIndex != -1 || !load.metadata.loader)
	          return address;

	        // normalize plugin relative to parent in locate here when
	        // using plugin via loader metadata
	        return (loader.pluginLoader || loader).normalize(load.metadata.loader, load.name)
	        .then(function(loaderNormalized) {
	          load.metadata.loader = loaderNormalized;
	          return address;
	        });
	      })
	      .then(function(address) {
	        var plugin = load.metadata.loader;

	        if (!plugin)
	          return address;

	        // don't allow a plugin to load itself
	        if (load.name == plugin)
	          throw new Error('Plugin ' + plugin + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

	        // only fetch the plugin itself if this name isn't defined
	        if (loader.defined && loader.defined[name])
	          return address;

	        var pluginLoader = loader.pluginLoader || loader;

	        // load the plugin module and run standard locate
	        return pluginLoader['import'](plugin)
	        .then(function(loaderModule) {
	          // store the plugin module itself on the metadata
	          load.metadata.loaderModule = loaderModule;

	          load.address = address;
	          if (loaderModule.locate)
	            return loaderModule.locate.call(loader, load);

	          return address;
	        });
	      });
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch && load.metadata.format != 'defined') {
	        load.metadata.scriptLoad = false;
	        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
	          return fetch.call(loader, load);
	        });
	      }
	      else {
	        return fetch.call(loader, load);
	      }
	    };
	  });

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      var args = arguments;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.translate && load.metadata.format != 'defined') {
	        return Promise.resolve(load.metadata.loaderModule.translate.apply(loader, args)).then(function(result) {
	          var sourceMap = load.metadata.sourceMap;

	          // sanitize sourceMap if an object not a JSON string
	          if (sourceMap) {
	            if (typeof sourceMap != 'object')
	              throw new Error('load.metadata.sourceMap must be set to an object.');

	            var originalName = load.address.split('!')[0];

	            // force set the filename of the original file
	            if (!sourceMap.file || sourceMap.file == load.address)
	              sourceMap.file = originalName + '!transpiled';

	            // force set the sources list if only one source
	            if (!sourceMap.sources || sourceMap.sources.length <= 1 && (!sourceMap.sources[0] || sourceMap.sources[0] == load.address))
	              sourceMap.sources = [originalName];
	          }

	          // if running on file:/// URLs, sourcesContent is necessary
	          // load.metadata.sourceMap.sourcesContent = [load.source];

	          if (typeof result == 'string')
	            load.source = result;

	          return translate.apply(loader, args);
	        });
	      }
	      else {
	        return translate.apply(loader, args);
	      }
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      var calledInstantiate = false;

	      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate && !loader.builder && load.metadata.format != 'defined')
	        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load, function(load) {
	          if (calledInstantiate)
	            throw new Error('Instantiate must only be called once.');
	          calledInstantiate = true;
	          return instantiate.call(loader, load);
	        })).then(function(result) {
	          if (calledInstantiate)
	            return result;

	          if (result !== undefined) {
	            load.metadata.entry = createEntry();
	            load.metadata.entry.execute = function() {
	              return result;
	            }
	            load.metadata.entry.deps = load.metadata.deps;
	            load.metadata.format = 'defined';
	          }
	          return instantiate.call(loader, load);
	        });
	      else
	        return instantiate.call(loader, load);
	    };
	  });

	})();
	/*
	 * Conditions Extension
	 *
	 *   Allows a condition module to alter the resolution of an import via syntax:
	 *
	 *     import $ from 'jquery/#{browser}';
	 *
	 *   Will first load the module 'browser' via `SystemJS.import('browser')` and 
	 *   take the default export of that module.
	 *   If the default export is not a string, an error is thrown.
	 * 
	 *   We then substitute the string into the require to get the conditional resolution
	 *   enabling environment-specific variations like:
	 * 
	 *     import $ from 'jquery/ie'
	 *     import $ from 'jquery/firefox'
	 *     import $ from 'jquery/chrome'
	 *     import $ from 'jquery/safari'
	 *
	 *   It can be useful for a condition module to define multiple conditions.
	 *   This can be done via the `|` modifier to specify an export member expression:
	 *
	 *     import 'jquery/#{./browser.js|grade.version}'
	 *
	 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
	 *
	 *
	 * Boolean Conditionals
	 *
	 *   For polyfill modules, that are used as imports but have no module value,
	 *   a binary conditional allows a module not to be loaded at all if not needed:
	 *
	 *     import 'es5-shim#?./conditions.js|needs-es5shim'
	 *
	 *   These conditions can also be negated via:
	 *     
	 *     import 'es5-shim#?./conditions.js|~es6'
	 *
	 */

	  var sysConditions = ['browser', 'node', 'dev', 'build', 'production', 'default'];

	  function parseCondition(condition) {
	    var conditionExport, conditionModule, negation;

	    var negation = condition[0] == '~';
	    var conditionExportIndex = condition.lastIndexOf('|');
	    if (conditionExportIndex != -1) {
	      conditionExport = condition.substr(conditionExportIndex + 1);
	      conditionModule = condition.substr(negation, conditionExportIndex - negation);
	      
	      if (negation)
	        warn.call(this, 'Condition negation form "' + condition + '" is deprecated for "' + conditionModule + '|~' + conditionExport + '"');

	      if (conditionExport[0] == '~') {
	        negation = true;
	        conditionExport = conditionExport.substr(1);
	      }
	    }
	    else {
	      conditionExport = 'default';
	      conditionModule = condition.substr(negation);
	      if (sysConditions.indexOf(conditionModule) != -1) {
	        conditionExport = conditionModule;
	        conditionModule = null;
	      }
	    }

	    return {
	      module: conditionModule || '@system-env',
	      prop: conditionExport,
	      negate: negation
	    };
	  }

	  function serializeCondition(conditionObj) {
	    return conditionObj.module + '|' + (conditionObj.negate ? '~' : '') + conditionObj.prop;
	  }

	  function resolveCondition(conditionObj, parentName, bool) {
	    var self = this;
	    return this.normalize(conditionObj.module, parentName)
	    .then(function(normalizedCondition) {
	      return self.load(normalizedCondition)
	      .then(function(q) {
	        var m = readMemberExpression(conditionObj.prop, self.get(normalizedCondition));

	        if (bool && typeof m != 'boolean')
	          throw new TypeError('Condition ' + serializeCondition(conditionObj) + ' did not resolve to a boolean.');

	        return conditionObj.negate ? !m : m;
	      });
	    });
	  }

	  var interpolationRegEx = /#\{[^\}]+\}/;
	  function interpolateConditional(name, parentName) {
	    // first we normalize the conditional
	    var conditionalMatch = name.match(interpolationRegEx);

	    if (!conditionalMatch)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition.call(this, conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
	      });

	    return resolveCondition.call(this, conditionObj, parentName, false)
	    .then(function(conditionValue) {
	      if (typeof conditionValue !== 'string')
	        throw new TypeError('The condition value for ' + name + ' doesn\'t resolve to a string.');

	      if (conditionValue.indexOf('/') != -1)
	        throw new TypeError('Unabled to interpolate conditional ' + name + (parentName ? ' in ' + parentName : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

	      return name.replace(interpolationRegEx, conditionValue);
	    });
	  }

	  function booleanConditional(name, parentName) {
	    // first we normalize the conditional
	    var booleanIndex = name.lastIndexOf('#?');

	    if (booleanIndex == -1)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition.call(this, name.substr(booleanIndex + 2));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
	      });

	    return resolveCondition.call(this, conditionObj, parentName, true)
	    .then(function(conditionValue) {
	      return conditionValue ? name.substr(0, booleanIndex) : '@empty';
	    });
	  }

	  // normalizeSync does not parse conditionals at all although it could
	  hook('normalize', function(normalize) {
	    return function(name, parentName, skipExt) {
	      var loader = this;
	      return booleanConditional.call(loader, name, parentName)
	      .then(function(name) {
	        return normalize.call(loader, name, parentName, skipExt);
	      })
	      .then(function(normalized) {
	        return interpolateConditional.call(loader, normalized, parentName);
	      });
	    };
	  });
	/*
	 * Alias Extension
	 *
	 * Allows a module to be a plain copy of another module by module name
	 *
	 * SystemJS.meta['mybootstrapalias'] = { alias: 'bootstrap' };
	 *
	 */
	(function() {
	  // aliases
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var alias = load.metadata.alias;
	      var aliasDeps = load.metadata.deps || [];
	      if (alias) {
	        load.metadata.format = 'defined';
	        var entry = createEntry();
	        this.defined[load.name] = entry;
	        entry.declarative = true;
	        entry.deps = aliasDeps.concat([alias]);
	        entry.declare = function(_export) {
	          return {
	            setters: [function(module) {
	              for (var p in module)
	                _export(p, module[p]);
	              if (module.__useDefault)
	                entry.module.exports.__useDefault = true;
	            }],
	            execute: function() {}
	          };
	        };
	        return '';
	      }

	      return fetch.call(this, load);
	    };
	  });
	})();/*
	 * Meta Extension
	 *
	 * Sets default metadata on a load record (load.metadata) from
	 * loader.metadata via SystemJS.meta function.
	 *
	 *
	 * Also provides an inline meta syntax for module meta in source.
	 *
	 * Eg:
	 *
	 * loader.meta({
	 *   'my/module': { deps: ['jquery'] }
	 *   'my/*': { format: 'amd' }
	 * });
	 *
	 * Which in turn populates loader.metadata.
	 *
	 * load.metadata.deps and load.metadata.format will then be set
	 * for 'my/module'
	 *
	 * The same meta could be set with a my/module.js file containing:
	 *
	 * my/module.js
	 *   "format amd";
	 *   "deps[] jquery";
	 *   "globals.some value"
	 *   console.log('this is my/module');
	 *
	 * Configuration meta always takes preference to inline meta.
	 *
	 * Multiple matches in wildcards are supported and ammend the meta.
	 *
	 *
	 * The benefits of the function form is that paths are URL-normalized
	 * supporting say
	 *
	 * loader.meta({ './app': { format: 'cjs' } });
	 *
	 * Instead of needing to set against the absolute URL (https://site.com/app.js)
	 *
	 */

	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      this.meta = {};
	      constructor.call(this);
	    };
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var meta = this.meta;
	      var name = load.name;

	      // NB for perf, maybe introduce a fast-path wildcard lookup cache here
	      // which is checked first

	      // apply wildcard metas
	      var bestDepth = 0;
	      var wildcardIndex;
	      for (var module in meta) {
	        wildcardIndex = module.indexOf('*');
	        if (wildcardIndex === -1)
	          continue;
	        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)
	            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
	          var depth = module.split('/').length;
	          if (depth > bestDepth)
	            bestDepth = depth;
	          extendMeta(load.metadata, meta[module], bestDepth != depth);
	        }
	      }

	      // apply exact meta
	      if (meta[name])
	        extendMeta(load.metadata, meta[name]);

	      return locate.call(this, load);
	    };
	  });

	  // detect any meta header syntax
	  // only set if not already set
	  var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
	  var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

	  function setMetaProperty(target, p, value) {
	    var pParts = p.split('.');
	    var curPart;
	    while (pParts.length > 1) {
	      curPart = pParts.shift();
	      target = target[curPart] = target[curPart] || {};
	    }
	    curPart = pParts.shift();
	    if (!(curPart in target))
	      target[curPart] = value;
	  }

	  hook('translate', function(translate) {
	    return function(load) {
	      // shortpath for bundled
	      if (load.metadata.format == 'defined') {
	        load.metadata.deps = load.metadata.deps || [];
	        return Promise.resolve(load.source);
	      }

	      // NB meta will be post-translate pending transpiler conversion to plugins
	      var meta = load.source.match(metaRegEx);
	      if (meta) {
	        var metaParts = meta[0].match(metaPartRegEx);

	        for (var i = 0; i < metaParts.length; i++) {
	          var curPart = metaParts[i];
	          var len = curPart.length;

	          var firstChar = curPart.substr(0, 1);
	          if (curPart.substr(len - 1, 1) == ';')
	            len--;

	          if (firstChar != '"' && firstChar != "'")
	            continue;

	          var metaString = curPart.substr(1, curPart.length - 3);
	          var metaName = metaString.substr(0, metaString.indexOf(' '));

	          if (metaName) {
	            var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

	            if (metaName.substr(metaName.length - 2, 2) == '[]') {
	              metaName = metaName.substr(0, metaName.length - 2);
	              load.metadata[metaName] = load.metadata[metaName] || [];
	              load.metadata[metaName].push(metaValue);
	            }
	            else if (load.metadata[metaName] instanceof Array) {
	              // temporary backwards compat for previous "deps" syntax
	              warn.call(this, 'Module ' + load.name + ' contains deprecated "deps ' + metaValue + '" meta syntax.\nThis should be updated to "deps[] ' + metaValue + '" for pushing to array meta.');
	              load.metadata[metaName].push(metaValue);
	            }
	            else {
	              setMetaProperty(load.metadata, metaName, metaValue);
	            }
	          }
	          else {
	            load.metadata[metaString] = true;
	          }
	        }
	      }

	      return translate.apply(this, arguments);
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Dependency Tree Cache
	 * 
	 * Allows a build to pre-populate a dependency trace tree on the loader of 
	 * the expected dependency tree, to be loaded upfront when requesting the
	 * module, avoinding the n round trips latency of module loading, where 
	 * n is the dependency tree depth.
	 *
	 * eg:
	 * SystemJS.depCache = {
	 *  'app': ['normalized', 'deps'],
	 *  'normalized': ['another'],
	 *  'deps': ['tree']
	 * };
	 * 
	 * SystemJS.import('app') 
	 * // simultaneously starts loading all of:
	 * // 'normalized', 'deps', 'another', 'tree'
	 * // before "app" source is even loaded
	 *
	 */

	(function() {
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.depCache = {};
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      // load direct deps, in turn will pick up their trace trees
	      var deps = loader.depCache[load.name];
	      if (deps)
	        for (var i = 0; i < deps.length; i++)
	          loader['import'](deps[i], load.name);

	      return locate.call(loader, load);
	    };
	  });
	})();
	  
	System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.41 Standard';
	  if (typeof module == 'object' && module.exports && typeof exports == 'object')
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);}

	// auto-load Promise polyfill if needed in the browser
	var doPolyfill = typeof Promise === 'undefined';

	// document.write
	if (typeof document !== 'undefined') {
	  var scripts = document.getElementsByTagName('script');
	  $__curScript = scripts[scripts.length - 1];
	  if (document.currentScript && ($__curScript.defer || $__curScript.async))
	    $__curScript = document.currentScript;
	  if (!$__curScript.src)
	    $__curScript = undefined;
	  if (doPolyfill) {
	    var curPath = $__curScript.src;
	    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
	    window.systemJSBootstrap = bootstrap;
	    document.write(
	      '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'
	    );
	  }
	  else {
	    bootstrap();
	  }
	}
	// importScripts
	else if (typeof importScripts !== 'undefined') {
	  var basePath = '';
	  try {
	    throw new Error('_');
	  } catch (e) {
	    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
	      $__curScript = { src: url };
	      basePath = url.replace(/\/[^\/]*$/, '/');
	    });
	  }
	  if (doPolyfill)
	    importScripts(basePath + 'system-polyfills.js');
	  bootstrap();
	}
	else {
	  $__curScript =  true ? { src: __filename } : null;
	  bootstrap();
	}


	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), __webpack_require__(2).Buffer, "/index.js"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(3)
	var ieee754 = __webpack_require__(4)
	var isArray = __webpack_require__(5)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()

	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer.poolSize = 8192 // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}

	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)

	  var actual = that.write(string, encoding)

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }

	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len)
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8'

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true

	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0

	  if (this === target) return 0

	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)

	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }

	  return len
	}

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0

	  if (!val) val = 0

	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }

	  return this
	}

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict'

	exports.byteLength = byteLength
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray

	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i]
	  revLookup[code.charCodeAt(i)] = i
	}

	revLookup['-'.charCodeAt(0)] = 62
	revLookup['_'.charCodeAt(0)] = 63

	function placeHoldersCount (b64) {
	  var len = b64.length
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	}

	function byteLength (b64) {
	  // base64 is 4/3 + up to two characters of the original data
	  return b64.length * 3 / 4 - placeHoldersCount(b64)
	}

	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	  placeHolders = placeHoldersCount(b64)

	  arr = new Arr(len * 3 / 4 - placeHolders)

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len

	  var L = 0

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }

	  parts.push(output)

	  return parts.join('')
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./system": 8,
		"./system-csp-production": 9,
		"./system-csp-production.js": 9,
		"./system-csp-production.src": 11,
		"./system-csp-production.src.js": 11,
		"./system-polyfills": 12,
		"./system-polyfills.js": 12,
		"./system-polyfills.src": 14,
		"./system-polyfills.src.js": 14,
		"./system-register-only": 15,
		"./system-register-only.js": 15,
		"./system-register-only.src": 17,
		"./system-register-only.src.js": 17,
		"./system.js": 8
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, Buffer, __filename) {/*
	 * SystemJS v0.19.41
	 */
	!function(){function e(){!function(e){function t(e,r){if("string"!=typeof e)throw new TypeError("URL must be a string");var n=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!n)throw new RangeError("Invalid URL format");var a=n[1]||"",o=n[2]||"",i=n[3]||"",s=n[4]||"",l=n[5]||"",u=n[6]||"",d=n[7]||"",c=n[8]||"",f=n[9]||"";if(void 0!==r){var m=r instanceof t?r:new t(r),p=!a&&!s&&!o;!p||d||c||(c=m.search),p&&"/"!==d[0]&&(d=d?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+d:m.pathname);var h=[];d.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),d=h.join("").replace(/^\//,"/"===d[0]?"/":""),p&&(u=m.port,l=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}d=d.replace(/\\/g,"/"),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+d+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=l,this.port=u,this.pathname=d,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var r=((e.message||e)+(e.stack?"\n"+e.stack:"")).toString().split("\n"),n=[],a=0;a<r.length;a++)"undefined"!=typeof $__curScript&&r[a].indexOf($__curScript.src)!=-1||n.push(r[a]);var o="(SystemJS) "+(n?n.join("\n\t"):e.message.substr(11))+"\n\t"+t;F||(o=o.replace(D?/file:\/\/\//g:/file:\/\//g,""));var i=J?new Error(o,e.fileName,e.lineNumber):new Error(o);return i.stack=o,i.originalErr=e.originalErr||e,i}function r(){}function n(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},q(this,"global",{get:function(){return e}})}function a(){n.call(this),this.paths={},this._loader.paths={},V.call(this)}function o(){}function i(e,t){a.prototype[e]=t(a.prototype[e]||function(){})}function s(e){V=e(V||function(){})}function l(e){return e.match(Y)}function u(e){return"."==e[0]&&(!e[1]||"/"==e[1]||"."==e[1])||"/"==e[0]}function d(e){return!u(e)&&!l(e)}function c(e,t){if("."==e[0]){if("/"==e[1]&&"."!=e[2])return(t&&t.substr(0,t.lastIndexOf("/")+1)||$)+e.substr(2)}else if("/"!=e[0]&&e.indexOf(":")==-1)return(t&&t.substr(0,t.lastIndexOf("/")+1)||$)+e;return new H(e,t&&t.replace(/#/g,"%05")||K).href.replace(/%05/g,"#")}function f(e,t){var r,n="",a=0,o=e.paths,i=e._loader.paths;for(var s in o)if(!o.hasOwnProperty||o.hasOwnProperty(s)){var l=o[s];if(l!==i[s]&&(l=o[s]=i[s]=c(o[s],u(o[s])?$:e.baseURL)),s.indexOf("*")===-1){if(t==s)return o[s];if(t.substr(0,s.length-1)==s.substr(0,s.length-1)&&(t.length<s.length||t[s.length-1]==s[s.length-1])&&("/"==o[s][o[s].length-1]||""==o[s]))return o[s].substr(0,o[s].length-1)+(t.length>s.length?(o[s]&&"/"||"")+t.substr(s.length):"")}else{var d=s.split("*");if(d.length>2)throw new TypeError("Only one wildcard in a path is permitted");var f=d[0].length;f>=a&&t.substr(0,d[0].length)==d[0]&&t.substr(t.length-d[1].length)==d[1]&&(a=f,n=s,r=t.substr(d[0].length,t.length-d[1].length-d[0].length))}}var m=o[n];return"string"==typeof r&&(m=m.replace("*",r)),m}function m(e){for(var t=[],r=[],n=0,a=e.length;n<a;n++){var o=U.call(t,e[n]);o===-1?(t.push(e[n]),r.push([n])):r[o].push(n)}return{names:t,indices:r}}function p(t){var r={};if(("object"==typeof t||"function"==typeof t)&&t!==e)if(Q)for(var n in t)"default"!==n&&h(r,t,n);else g(r,t);return r.default=t,q(r,"__useDefault",{value:!0}),r}function h(e,t,r){try{var n;(n=Object.getOwnPropertyDescriptor(t,r))&&q(e,r,n)}catch(n){return e[r]=t[r],!1}}function g(e,t,r){var n=t&&t.hasOwnProperty;for(var a in t)n&&!t.hasOwnProperty(a)||r&&a in e||(e[a]=t[a]);return e}function v(e,t,r){var n=t&&t.hasOwnProperty;for(var a in t)if(!n||t.hasOwnProperty(a)){var o=t[a];a in e?o instanceof Array&&e[a]instanceof Array?e[a]=[].concat(r?o:e[a]).concat(r?e[a]:o):"object"==typeof o&&null!==o&&"object"==typeof e[a]?e[a]=g(g({},e[a]),o,r):r||(e[a]=o):e[a]=o}}function b(e,t,r,n,a){for(var o in t)if(U.call(["main","format","defaultExtension","basePath"],o)!=-1)e[o]=t[o];else if("map"==o)g(e.map=e.map||{},t.map);else if("meta"==o)g(e.meta=e.meta||{},t.meta);else if("depCache"==o)for(var i in t.depCache){var s;s="./"==i.substr(0,2)?r+"/"+i.substr(2):P.call(n,i),n.depCache[s]=(n.depCache[s]||[]).concat(t.depCache[i])}else!a||U.call(["browserConfig","nodeConfig","devConfig","productionConfig"],o)!=-1||t.hasOwnProperty&&!t.hasOwnProperty(o)||w.call(n,'"'+o+'" is not a valid package configuration option in package '+r)}function y(e,t,r,n){var a;if(e.packages[t]){var o=e.packages[t];a=e.packages[t]={},b(a,n?r:o,t,e,n),b(a,n?o:r,t,e,!n)}else a=e.packages[t]=r;return"object"==typeof a.main&&(a.map=a.map||{},a.map["./@main"]=a.main,a.main.default=a.main.default||"./",a.main="@main"),a}function w(e){this.warnings&&"undefined"!=typeof console&&console.warn}function x(e,t){for(var r=e.split(".");r.length;)t=t[r.shift()];return t}function S(e,t){var r,n=0;for(var a in e)if(t.substr(0,a.length)==a&&(t.length==a.length||"/"==t[a.length])){var o=a.split("/").length;if(o<=n)continue;r=a,n=o}return r}function _(e){this._loader.baseURL!==this.baseURL&&("/"!=this.baseURL[this.baseURL.length-1]&&(this.baseURL+="/"),this._loader.baseURL=this.baseURL=new H(this.baseURL,K).href)}function E(e,t){this.set("@system-env",te=this.newModule({browser:F,node:!!this._nodeRequire,production:!t&&e,dev:t||!e,build:t,default:!0}))}function j(e,t){if(!d(e))throw new Error("Node module "+e+" can't be loaded as it is not a package require.");if(!re){var r=this._nodeRequire("module"),n=t.substr(D?8:7);re=new r(n),re.paths=r._nodeModulePaths(n)}return re.require(e)}function P(e,t){if(u(e))return c(e,t);if(l(e))return e;var r=S(this.map,e);if(r){if(e=this.map[r]+e.substr(r.length),u(e))return c(e);if(l(e))return e}if(this.has(e))return e;if("@node/"==e.substr(0,6)){if(!this._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return this.builder?this.set(e,this.newModule({})):this.set(e,this.newModule(p(j.call(this,e.substr(6),this.baseURL)))),e}return _.call(this),f(this,e)||this.baseURL+e}function O(e,t,r){te.browser&&t.browserConfig&&r(t.browserConfig),te.node&&t.nodeConfig&&r(t.nodeConfig),te.dev&&t.devConfig&&r(t.devConfig),te.build&&t.buildConfig&&r(t.buildConfig),te.production&&t.productionConfig&&r(t.productionConfig)}function M(e){var t=e.match(oe);return t&&"System.register"==e.substr(t[0].length,15)}function k(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}function R(t){if("string"==typeof t)return x(t,e);if(!(t instanceof Array))throw new Error("Global exports must be a string or array.");for(var r={},n=!0,a=0;a<t.length;a++){var o=x(t[a],e);n&&(r.default=o,n=!1),r[t[a].split(".").pop()]=o}return r}function z(e){var t,r,n,n="~"==e[0],a=e.lastIndexOf("|");return a!=-1?(t=e.substr(a+1),r=e.substr(n,a-n),n&&w.call(this,'Condition negation form "'+e+'" is deprecated for "'+r+"|~"+t+'"'),"~"==t[0]&&(n=!0,t=t.substr(1))):(t="default",r=e.substr(n),se.indexOf(r)!=-1&&(t=r,r=null)),{module:r||"@system-env",prop:t,negate:n}}function I(e){return e.module+"|"+(e.negate?"~":"")+e.prop}function T(e,t,r){var n=this;return this.normalize(e.module,t).then(function(t){return n.load(t).then(function(a){var o=x(e.prop,n.get(t));if(r&&"boolean"!=typeof o)throw new TypeError("Condition "+I(e)+" did not resolve to a boolean.");return e.negate?!o:o})})}function C(e,t){var r=e.match(le);if(!r)return Promise.resolve(e);var n=z.call(this,r[0].substr(2,r[0].length-3));return this.builder?this.normalize(n.module,t).then(function(t){return n.module=t,e.replace(le,"#{"+I(n)+"}")}):T.call(this,n,t,!1).then(function(r){if("string"!=typeof r)throw new TypeError("The condition value for "+e+" doesn't resolve to a string.");if(r.indexOf("/")!=-1)throw new TypeError("Unabled to interpolate conditional "+e+(t?" in "+t:"")+"\n\tThe condition value "+r+' cannot contain a "/" separator.');return e.replace(le,r)})}function L(e,t){var r=e.lastIndexOf("#?");if(r==-1)return Promise.resolve(e);var n=z.call(this,e.substr(r+2));return this.builder?this.normalize(n.module,t).then(function(t){return n.module=t,e.substr(0,r)+"#?"+I(n)}):T.call(this,n,t,!0).then(function(t){return t?e.substr(0,r):"@empty"})}var A="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,F="undefined"!=typeof window&&"undefined"!=typeof document,D="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var q,U=Array.prototype.indexOf||function(e){for(var t=0,r=this.length;t<r;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(q=Object.defineProperty)}catch(e){q=function(e,t,r){try{e[t]=r.value||r.get.call(e)}catch(e){}}}}();var $,J="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if($=document.baseURI,!$){var N=document.getElementsByTagName("base");$=N[0]&&N[0].href||window.location.href}}else"undefined"!=typeof location&&($=e.location.href);if($)$=$.split("#")[0].split("?")[0],$=$.substr(0,$.lastIndexOf("/")+1);else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");$="file://"+(D?"/":"")+process.cwd()+"/",D&&($=$.replace(/\\/g,"/"))}try{var B="test:"==new e.URL("test:///").protocol}catch(e){}var H=B?e.URL:e.URLPolyfill;q(r.prototype,"toString",{value:function(){return"Module"}}),function(){function e(e){return{status:"loading",name:e||"<Anonymous"+ ++y+">",linkSets:[],dependencies:[],metadata:{}}}function a(e,t,r){return new Promise(u({step:r.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:r&&r.metadata||{},moduleSource:r.source,moduleAddress:r.address}))}function o(t,r,n,a){return new Promise(function(e,o){e(t.loaderObj.normalize(r,n,a))}).then(function(r){var n;if(t.modules[r])return n=e(r),n.status="linked",n.module=t.modules[r],n;for(var a=0,o=t.loads.length;a<o;a++)if(n=t.loads[a],n.name==r)return n;return n=e(r),t.loads.push(n),i(t,n),n})}function i(e,t){s(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function s(e,t,r){l(e,t,r.then(function(r){if("loading"==t.status)return t.address=r,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:r})}))}function l(e,t,r){r.then(function(r){if("loading"==t.status)return t.address=t.address||t.name,Promise.resolve(e.loaderObj.translate({name:t.name,metadata:t.metadata,address:t.address,source:r})).then(function(r){return t.source=r,e.loaderObj.instantiate({name:t.name,metadata:t.metadata,address:t.address,source:r})}).then(function(e){if(void 0===e)throw new TypeError("Declarative modules unsupported in the polyfill.");if("object"!=typeof e)throw new TypeError("Invalid instantiate return value");t.depsList=e.deps||[],t.execute=e.execute}).then(function(){t.dependencies=[];for(var r=t.depsList,n=[],a=0,i=r.length;a<i;a++)(function(r,a){n.push(o(e,r,t.name,t.address).then(function(e){if(t.dependencies[a]={key:r,value:e.name},"linked"!=e.status)for(var n=t.linkSets.concat([]),o=0,i=n.length;o<i;o++)c(n[o],e)}))})(r[a],a);return Promise.all(n)}).then(function(){t.status="loaded";for(var e=t.linkSets.concat([]),r=0,n=e.length;r<n;r++)m(e[r],t)})}).catch(function(e){t.status="failed",t.exception=e;for(var r=t.linkSets.concat([]),n=0,a=r.length;n<a;n++)p(r[n],t,e)})}function u(t){return function(r,n){var a=t.loader,o=t.moduleName,u=t.step;if(a.modules[o])throw new TypeError('"'+o+'" already exists in the module table');for(var c,f=0,m=a.loads.length;f<m;f++)if(a.loads[f].name==o&&(c=a.loads[f],"translate"!=u||c.source||(c.address=t.moduleAddress,l(a,c,Promise.resolve(t.moduleSource))),c.linkSets.length&&c.linkSets[0].loads[0].name==c.name))return c.linkSets[0].done.then(function(){r(c)});var p=c||e(o);p.metadata=t.moduleMetadata;var h=d(a,p);a.loads.push(p),r(h.done),"locate"==u?i(a,p):"fetch"==u?s(a,p,Promise.resolve(t.moduleAddress)):(p.address=t.moduleAddress,l(a,p,Promise.resolve(t.moduleSource)))}}function d(e,t){var r={loader:e,loads:[],startingLoad:t,loadingCount:0};return r.done=new Promise(function(e,t){r.resolve=e,r.reject=t}),c(r,t),r}function c(e,t){if("failed"!=t.status){for(var r=0,n=e.loads.length;r<n;r++)if(e.loads[r]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,r=0,n=t.dependencies.length;r<n;r++)if(t.dependencies[r]){var o=t.dependencies[r].value;if(!a.modules[o])for(var i=0,s=a.loads.length;i<s;i++)if(a.loads[i].name==o){c(e,a.loads[i]);break}}}}function f(e){var t=!1;try{b(e,function(r,n){p(e,r,n),t=!0})}catch(r){p(e,null,r),t=!0}return t}function m(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var r=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var n=[].concat(e.loads),a=0,o=n.length;a<o;a++){var t=n[a];t.module={name:t.name,module:w({}),evaluated:!0},t.status="linked",h(e.loader,t)}return e.resolve(r)}var i=f(e);i||e.resolve(r)}}function p(e,r,n){var a=e.loader;e:if(r)if(e.loads[0].name==r.name)n=t(n,"Error loading "+r.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var l=i.dependencies[s];if(l.value==r.name){n=t(n,"Error loading "+r.name+' as "'+l.key+'" from '+i.name);break e}}n=t(n,"Error loading "+r.name+" from "+e.loads[0].name)}else n=t(n,"Error linking "+e.loads[0].name);for(var u=e.loads.concat([]),o=0,d=u.length;o<d;o++){var r=u[o];a.loaderObj.failed=a.loaderObj.failed||[],U.call(a.loaderObj.failed,r)==-1&&a.loaderObj.failed.push(r);var c=U.call(r.linkSets,e);if(r.linkSets.splice(c,1),0==r.linkSets.length){var f=U.call(e.loader.loads,r);f!=-1&&e.loader.loads.splice(f,1)}}e.reject(n)}function h(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var r={};t.dependencies.forEach(function(e){r[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:r,address:t.address,metadata:t.metadata,source:t.source}}t.name&&(e.modules[t.name]=t.module);var n=U.call(e.loads,t);n!=-1&&e.loads.splice(n,1);for(var a=0,o=t.linkSets.length;a<o;a++)n=U.call(t.linkSets[a].loads,t),n!=-1&&t.linkSets[a].loads.splice(n,1);t.linkSets.splice(0,t.linkSets.length)}function g(e,t,n){try{var a=t.execute()}catch(e){return void n(t,e)}return a&&a instanceof r?a:void n(t,new TypeError("Execution must define a Module instance"))}function v(e,t,r){var n=e._loader.importPromises;return n[t]=r.then(function(e){return n[t]=void 0,e},function(e){throw n[t]=void 0,e})}function b(e,t){var r=e.loader;if(e.loads.length)for(var n=e.loads.concat([]),a=0;a<n.length;a++){var o=n[a],i=g(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",h(r,o)}}var y=0;n.prototype={constructor:n,define:function(e,t,r){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return v(this,e,new Promise(u({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:r&&r.metadata||{},moduleSource:t,moduleAddress:r&&r.address})))},delete:function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],!!t.modules[e]&&delete t.modules[e]},get:function(e){if(this._loader.modules[e])return this._loader.modules[e].module},has:function(e){return!!this._loader.modules[e]},import:function(e,t,r){"object"==typeof t&&(t=t.name);var n=this;return Promise.resolve(n.normalize(e,t)).then(function(e){var t=n._loader;return t.modules[e]?t.modules[e].module:t.importPromises[e]||v(n,e,a(t,e,{}).then(function(r){return delete t.importPromises[e],r.module.module}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||v(this,e,new Promise(u({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(t,r){var n=e();n.address=r&&r.address;var a=d(this._loader,n),o=Promise.resolve(t),i=this._loader,s=a.done.then(function(){return n.module.module});return l(i,n,o),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new r,n=[];if(Object.getOwnPropertyNames&&null!=e)n=Object.getOwnPropertyNames(e);else for(var a in e)n.push(a);for(var o=0;o<n.length;o++)(function(r){q(t,r,{configurable:!1,enumerable:!0,get:function(){return e[r]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(n[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof r))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,r){},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var w=n.prototype.newModule}();var X,G;if("undefined"!=typeof XMLHttpRequest)G=function(e,t,r,n){function a(){r(i.responseText)}function o(){n(new Error("XHR error"+(i.status?" ("+i.status+(i.statusText?" "+i.statusText:"")+")":"")+" loading "+e))}var i=new XMLHttpRequest,s=!0,l=!1;if(!("withCredentials"in i)){var u=/^(\w+:)?\/\/([^\/]+)/.exec(e);u&&(s=u[2]===window.location.host,u[1]&&(s&=u[1]===window.location.protocol))}s||"undefined"==typeof XDomainRequest||(i=new XDomainRequest,i.onload=a,i.onerror=o,i.ontimeout=o,i.onprogress=function(){},i.timeout=0,l=!0),i.onreadystatechange=function(){4===i.readyState&&(0==i.status?i.responseText?a():(i.addEventListener("error",o),i.addEventListener("load",a)):200===i.status?a():o())},i.open("GET",e,!0),i.setRequestHeader&&(i.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&i.setRequestHeader("Authorization",t),i.withCredentials=!0)),l?setTimeout(function(){i.send()},0):i.send(null)};else if("undefined"!="function"&&"undefined"!=typeof process){var Z;G=function(e,t,r,n){if("file:///"!=e.substr(0,8))throw new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// allowed running in Node.');return Z=Z||__webpack_require__(6),e=D?e.replace(/\//g,"\\").substr(8):e.substr(7),Z.readFile(e,function(e,t){if(e)return n(e);var a=t+"";"\ufeff"===a[0]&&(a=a.substr(1)),r(a)})}}else{if("undefined"==typeof self||"undefined"==typeof self.fetch)throw new TypeError("No environment fetch API available.");G=function(e,t,r,n){var a={headers:{Accept:"application/x-es-module, */*"}};t&&("string"==typeof t&&(a.headers.Authorization=t),a.credentials="include"),fetch(e,a).then(function(e){if(e.ok)return e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)}).then(r,n)}}var W=function(){function t(t){var n=this;return Promise.resolve(e["typescript"==n.transpiler?"ts":n.transpiler]||(n.pluginLoader||n).import(n.transpiler)).then(function(e){e.__useDefault&&(e=e.default);var a;return a=e.Compiler?r:e.createLanguageService?i:o,"(function(__moduleName){"+a.call(n,t,e)+'\n})("'+t.name+'");\n//# sourceURL='+t.address+"!transpiled"})}function r(e,t){var r=this.traceurOptions||{};r.modules="instantiate",r.script=!1,void 0===r.sourceMaps&&(r.sourceMaps="inline"),r.filename=e.address,r.inputSourceMap=e.metadata.sourceMap,r.moduleName=!1;var n=new t.Compiler(r);return a(e.source,n,r.filename)}function a(e,t,r){try{return t.compile(e,r)}catch(e){if(e.length)throw e[0];throw e}}function o(e,t){var r=this.babelOptions||{};return r.modules="system",void 0===r.sourceMap&&(r.sourceMap="inline"),r.inputSourceMap=e.metadata.sourceMap,r.filename=e.address,r.code=!0,r.ast=!1,t.transform(e.source,r).code}function i(e,t){var r=this.typescriptOptions||{};return r.target=r.target||t.ScriptTarget.ES5,void 0===r.sourceMap&&(r.sourceMap=!0),r.sourceMap&&r.inlineSourceMap!==!1&&(r.inlineSourceMap=!0),r.module=t.ModuleKind.System,t.transpile(e.source,r,e.address)}return n.prototype.transpiler="traceur",t}();o.prototype=n.prototype,a.prototype=new o,a.prototype.constructor=a;var V,Y=/^[^\/]+:\/\//,K=new H($),Q=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(e){Q=!1}var ee;!function(){function r(e){return l?d+new Buffer(e).toString("base64"):"undefined"!=typeof btoa?d+btoa(unescape(encodeURIComponent(e))):""}function n(e,t){var n=e.source.lastIndexOf("\n");"global"==e.metadata.format&&(t=!1);var a=e.metadata.sourceMap;if(a){if("object"!=typeof a)throw new TypeError("load.metadata.sourceMap must be set to an object.");a=JSON.stringify(a)}return(t?"(function(System, SystemJS) {":"")+e.source+(t?"\n})(System, System);":"")+("\n//# sourceURL="!=e.source.substr(n,15)?"\n//# sourceURL="+e.address+(a?"!transpiled":""):"")+(a&&r(a)||"")}function a(t,r){u=r,0==p++&&(c=e.System),e.System=e.SystemJS=t}function o(){0==--p&&(e.System=e.SystemJS=c),u=void 0}function s(e){g||(g=document.head||document.body||document.documentElement);var r=document.createElement("script");r.text=n(e,!1);var i,s=window.onerror;if(window.onerror=function(r){i=t(r,"Evaluating "+e.address),s&&s.apply(this,arguments)},a(this,e),e.metadata.integrity&&r.setAttribute("integrity",e.metadata.integrity),e.metadata.nonce&&r.setAttribute("nonce",e.metadata.nonce),g.appendChild(r),g.removeChild(r),o(),window.onerror=s,i)throw i}var l="undefined"!=typeof Buffer;try{l&&"YQ=="!=new Buffer("a").toString("base64")&&(l=!1)}catch(e){l=!1}var u,d="\n//# sourceMappingURL=data:application/json;base64,";i("pushRegister_",function(){return function(e){return!!u&&(this.reduceRegister_(u,e),!0)}});var c,f,m,p=0;ee=function(e){if(e.source){if((e.metadata.integrity||e.metadata.nonce)&&h)return s.call(this,e);try{a(this,e),u=e,!m&&this._nodeRequire&&(m=this._nodeRequire("vm"),f=m.runInThisContext("typeof System !== 'undefined' && System")===this),f?m.runInThisContext(n(e,!0),{filename:e.address+(e.metadata.sourceMap?"!transpiled":"")}):(0,eval)(n(e,!0)),o()}catch(r){throw o(),t(r,"Evaluating "+e.address)}}};var h=!1;F&&"undefined"!=typeof document&&document.getElementsByTagName&&(window.chrome&&window.chrome.extension||navigator.userAgent.match(/^Node\.js/)||(h=!0));var g}();var te;s(function(e){return function(){e.call(this),this.baseURL=$,this.map={},"undefined"!=typeof $__curScript&&(this.scriptSrc=$__curScript.src),this.warnings=!1,this.defaultJSExtensions=!1,this.pluginFirst=!1,this.loaderErrorStack=!1,this.set("@empty",this.newModule({})),E.call(this,!1,!1)}}),"undefined"=="function"||"undefined"==typeof process||process.browser||(a.prototype._nodeRequire=__webpack_require__(7));var re;i("normalize",function(e){return function(e,t,r){var n=P.call(this,e,t);return!this.defaultJSExtensions||r||".js"==n.substr(n.length-3,3)||d(n)||(n+=".js"),n}});var ne="undefined"!=typeof XMLHttpRequest;i("locate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return ne?e.replace(/#/g,"%23"):e})}}),i("fetch",function(){return function(e){return new Promise(function(t,r){G(e.address,e.metadata.authorization,t,r)})}}),i("import",function(e){return function(t,r,n){return r&&r.name&&w.call(this,"SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing "+t+" from "+r.name),e.call(this,t,r,n).then(function(e){return e.__useDefault?e.default:e})}}),i("translate",function(e){return function(t){return"detect"==t.metadata.format&&(t.metadata.format=void 0),e.apply(this,arguments)}}),i("instantiate",function(e){return function(e){if("json"==e.metadata.format&&!this.builder){var t=e.metadata.entry=k();t.deps=[],t.execute=function(){try{return JSON.parse(e.source)}catch(t){throw new Error("Invalid JSON file "+e.name)}}}}}),a.prototype.getConfig=function(e){var t={},r=this;for(var n in r)r.hasOwnProperty&&!r.hasOwnProperty(n)||n in a.prototype&&"transpiler"!=n||U.call(["_loader","amdDefine","amdRequire","defined","failed","version","loads"],n)==-1&&(t[n]=r[n]);return t.production=te.production,t};var ae;a.prototype.config=function(e,t){function r(e){for(var t in e)if(e.hasOwnProperty(t))return!0}var n=this;if("loaderErrorStack"in e&&(ae=$__curScript,e.loaderErrorStack?$__curScript=void 0:$__curScript=ae),"warnings"in e&&(n.warnings=e.warnings),e.transpilerRuntime===!1&&(n._loader.loadedTranspilerRuntime=!0),("production"in e||"build"in e)&&E.call(n,!!e.production,!!(e.build||te&&te.build)),!t){var a;if(O(n,e,function(e){a=a||e.baseURL}),a=a||e.baseURL){if(r(n.packages)||r(n.meta)||r(n.depCache)||r(n.bundles)||r(n.packageConfigPaths))throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");this.baseURL=a,_.call(this)}if(e.paths&&g(n.paths,e.paths),O(n,e,function(e){e.paths&&g(n.paths,e.paths)}),this.warnings)for(var o in n.paths)o.indexOf("*")!=-1&&w.call(n,'Paths configuration "'+o+'" -> "'+n.paths[o]+'" uses wildcards which are being deprecated for just leaving a trailing "/" to indicate folder paths.')}if(e.defaultJSExtensions&&(n.defaultJSExtensions=e.defaultJSExtensions,w.call(n,"The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")),e.pluginFirst&&(n.pluginFirst=e.pluginFirst),e.map)for(var o in e.map){var i=e.map[o];if("string"!=typeof i){var s=n.defaultJSExtensions&&".js"!=o.substr(o.length-3,3),l=n.decanonicalize(o);s&&".js"==l.substr(l.length-3,3)&&(l=l.substr(0,l.length-3));var u="";for(var c in n.packages)l.substr(0,c.length)==c&&(!l[c.length]||"/"==l[c.length])&&u.split("/").length<c.split("/").length&&(u=c);u&&n.packages[u].main&&(l=l.substr(0,l.length-n.packages[u].main.length-1));var c=n.packages[l]=n.packages[l]||{};c.map=i}else n.map[o]=i}if(e.packageConfigPaths){for(var f=[],m=0;m<e.packageConfigPaths.length;m++){var p=e.packageConfigPaths[m],h=Math.max(p.lastIndexOf("*")+1,p.lastIndexOf("/")),v=P.call(n,p.substr(0,h));f[m]=v+p.substr(h)}n.packageConfigPaths=f}if(e.bundles)for(var o in e.bundles){for(var b=[],m=0;m<e.bundles[o].length;m++){var s=n.defaultJSExtensions&&".js"!=e.bundles[o][m].substr(e.bundles[o][m].length-3,3),x=n.decanonicalize(e.bundles[o][m]);s&&".js"==x.substr(x.length-3,3)&&(x=x.substr(0,x.length-3)),b.push(x)}n.bundles[o]=b}if(e.packages)for(var o in e.packages){if(o.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+o+'" is not a valid package name.');var l=P.call(n,o);"/"==l[l.length-1]&&(l=l.substr(0,l.length-1)),y(n,l,e.packages[o],!1)}for(var S in e){var i=e[S];if(U.call(["baseURL","map","packages","bundles","paths","warnings","packageConfigPaths","loaderErrorStack","browserConfig","nodeConfig","devConfig","buildConfig","productionConfig"],S)==-1)if("object"!=typeof i||i instanceof Array)n[S]=i;else{n[S]=n[S]||{};for(var o in i)if("meta"==S&&"*"==o[0])g(n[S][o]=n[S][o]||{},i[o]);else if("meta"==S){var j=P.call(n,o);n.defaultJSExtensions&&".js"!=j.substr(j.length-3,3)&&!d(j)&&(j+=".js"),g(n[S][j]=n[S][j]||{},i[o])}else if("depCache"==S){var s=n.defaultJSExtensions&&".js"!=o.substr(o.length-3,3),l=n.decanonicalize(o);s&&".js"==l.substr(l.length-3,3)&&(l=l.substr(0,l.length-3)),n[S][l]=[].concat(i[o])}else n[S][o]=i[o]}}O(n,e,function(e){n.config(e,!0)})},function(){function e(e,t){var r,n,a=0;for(var o in e.packages)t.substr(0,o.length)!==o||t.length!==o.length&&"/"!==t[o.length]||(n=o.split("/").length,n>a&&(r=o,a=n));return r}function t(e,t,r,n,a){if(!n||"/"==n[n.length-1]||a||t.defaultExtension===!1)return n;var o=!1;if(t.meta&&p(t.meta,n,function(e,t,r){if(0==r||e.lastIndexOf("*")!=e.length-1)return o=!0}),!o&&e.meta&&p(e.meta,r+"/"+n,function(e,t,r){if(0==r||e.lastIndexOf("*")!=e.length-1)return o=!0}),o)return n;var i="."+(t.defaultExtension||"js");return n.substr(n.length-i.length)!=i?n+i:n}function r(e,r,n,a,i){if(!a){if(!r.main)return n+(e.defaultJSExtensions?".js":"");a="./"==r.main.substr(0,2)?r.main.substr(2):r.main}if(r.map){var s="./"+a,l=S(r.map,s);if(l||(s="./"+t(e,r,n,a,i),s!="./"+a&&(l=S(r.map,s))),l){var u=o(e,r,n,l,s,i);if(u)return u}}return n+"/"+t(e,r,n,a,i)}function n(e,t,r,n){if("."==e)throw new Error("Package "+r+' has a map entry for "." which is not permitted.');return!(t.substr(0,e.length)==e&&n.length>e.length)}function o(e,r,a,o,i,s){"/"==i[i.length-1]&&(i=i.substr(0,i.length-1));var l=r.map[o];if("object"==typeof l)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+a);if(n(o,l,a,i)&&"string"==typeof l){if("."==l)l=a;else if("./"==l.substr(0,2))return a+"/"+t(e,r,a,l.substr(2)+i.substr(o.length),s);return e.normalizeSync(l+i.substr(o.length),a+"/")}}function l(e,r,n,a,o){if(!a){if(!r.main)return Promise.resolve(n+(e.defaultJSExtensions?".js":""));a="./"==r.main.substr(0,2)?r.main.substr(2):r.main}var i,s;return r.map&&(i="./"+a,s=S(r.map,i),s||(i="./"+t(e,r,n,a,o),i!="./"+a&&(s=S(r.map,i)))),(s?d(e,r,n,s,i,o):Promise.resolve()).then(function(i){return i?Promise.resolve(i):Promise.resolve(n+"/"+t(e,r,n,a,o))})}function u(e,r,n,a,o,i,s){if("."==o)o=n;else if("./"==o.substr(0,2))return Promise.resolve(n+"/"+t(e,r,n,o.substr(2)+i.substr(a.length),s)).then(function(t){return C.call(e,t,n+"/")});return e.normalize(o+i.substr(a.length),n+"/")}function d(e,t,r,a,o,i){"/"==o[o.length-1]&&(o=o.substr(0,o.length-1));var s=t.map[a];if("string"==typeof s)return n(a,s,r,o)?u(e,t,r,a,s,o,i):Promise.resolve();if(e.builder)return Promise.resolve(r+"/#:"+o);var l=[],d=[];for(var c in s){var f=z(c);d.push({condition:f,map:s[c]}),l.push(e.import(f.module,r))}return Promise.all(l).then(function(e){for(var t=0;t<d.length;t++){var r=d[t].condition,n=x(r.prop,e[t]);if(!r.negate&&n||r.negate&&!n)return d[t].map}}).then(function(s){if(s){if(!n(a,s,r,o))return;return u(e,t,r,a,s,o,i)}})}function c(e){var t=e.lastIndexOf("*"),r=Math.max(t+1,e.lastIndexOf("/"));return{length:r,regEx:new RegExp("^("+e.substr(0,r).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:t!=-1}}function f(e,t){for(var r,n,a=!1,o=0;o<e.packageConfigPaths.length;o++){var i=e.packageConfigPaths[o],s=h[i]||(h[i]=c(i));if(!(t.length<s.length)){var l=t.match(s.regEx);!l||r&&(a&&s.wildcard||!(r.length<l[1].length))||(r=l[1],a=!s.wildcard,n=r+i.substr(s.length))}}if(r)return{packageName:r,configPath:n}}function m(e,t,r){var n=e.pluginLoader||e;return(n.meta[r]=n.meta[r]||{}).format="json",n.meta[r].loader=null,n.load(r).then(function(){var a=n.get(r).default;return a.systemjs&&(a=a.systemjs),a.modules&&(a.meta=a.modules,w.call(e,"Package config file "+r+' is configured with "modules", which is deprecated as it has been renamed to "meta".')),y(e,t,a,!0)})}function p(e,t,r){var n;for(var a in e){var o="./"==a.substr(0,2)?"./":"";if(o&&(a=a.substr(2)),n=a.indexOf("*"),n!==-1&&a.substr(0,n)==t.substr(0,n)&&a.substr(n+1)==t.substr(t.length-a.length+n+1)&&r(a,e[o+a],a.split("/").length))return}var i=e[t]&&e.hasOwnProperty&&e.hasOwnProperty(t)?e[t]:e["./"+t];i&&r(i,i,0)}s(function(e){return function(){e.call(this),this.packages={},this.packageConfigPaths=[]}}),a.prototype.normalizeSync=a.prototype.decanonicalize=a.prototype.normalize,i("decanonicalize",function(t){return function(r,n){if(this.builder)return t.call(this,r,n,!0);var a=t.call(this,r,n,!1);if(!this.defaultJSExtensions)return a;var o=e(this,a),i=this.packages[o],s=i&&i.defaultExtension;return void 0==s&&i&&i.meta&&p(i.meta,a.substr(o),function(e,t,r){if(0==r||e.lastIndexOf("*")!=e.length-1)return s=!1,!0}),(s===!1||s&&".js"!=s)&&".js"!=r.substr(r.length-3,3)&&".js"==a.substr(a.length-3,3)&&(a=a.substr(0,a.length-3)),a}}),i("normalizeSync",function(t){return function(n,a,i){var s=this;if(i=i===!0,a)var l=e(s,a)||s.defaultJSExtensions&&".js"==a.substr(a.length-3,3)&&e(s,a.substr(0,a.length-3));var u=l&&s.packages[l];if(u&&"."!=n[0]){var d=u.map,c=d&&S(d,n);if(c&&"string"==typeof d[c]){var m=o(s,u,l,c,n,i);if(m)return m}}var p=s.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),h=t.call(s,n,a,!1);p&&".js"!=h.substr(h.length-3,3)&&(p=!1),p&&(h=h.substr(0,h.length-3));var g=f(s,h),v=g&&g.packageName||e(s,h);
	if(!v)return h+(p?".js":"");var b=h.substr(v.length+1);return r(s,s.packages[v]||{},v,b,i)}}),i("normalize",function(t){return function(r,n,a){var o=this;return a=a===!0,Promise.resolve().then(function(){if(n)var t=e(o,n)||o.defaultJSExtensions&&".js"==n.substr(n.length-3,3)&&e(o,n.substr(0,n.length-3));var i=t&&o.packages[t];if(i&&"./"!=r.substr(0,2)){var s=i.map,l=s&&S(s,r);if(l)return d(o,i,t,l,r,a)}return Promise.resolve()}).then(function(i){if(i)return i;var s=o.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),u=t.call(o,r,n,!1);s&&".js"!=u.substr(u.length-3,3)&&(s=!1),s&&(u=u.substr(0,u.length-3));var d=f(o,u),c=d&&d.packageName||e(o,u);if(!c)return Promise.resolve(u+(s?".js":""));var p=o.packages[c],h=p&&(p.configured||!d);return(h?Promise.resolve(p):m(o,c,d.configPath)).then(function(e){var t=u.substr(c.length+1);return l(o,e,c,t,a)})})}});var h={};i("locate",function(t){return function(r){var n=this;return Promise.resolve(t.call(this,r)).then(function(t){var a=e(n,r.name);if(a){var o=n.packages[a],i=r.name.substr(a.length+1),s={};if(o.meta){var l=0;p(o.meta,i,function(e,t,r){r>l&&(l=r),v(s,t,r&&l>r)}),v(r.metadata,s)}o.format&&!r.metadata.loader&&(r.metadata.format=r.metadata.format||o.format)}return t})}})}(),function(){function t(){if(s&&"interactive"===s.script.readyState)return s.load;for(var e=0;e<d.length;e++)if("interactive"==d[e].script.readyState)return s=d[e],s.load}function r(e,t){return new Promise(function(e,r){t.metadata.integrity&&r(new Error("Subresource integrity checking is not supported in web workers.")),l=t;try{importScripts(t.address)}catch(e){l=null,r(e)}l=null,t.metadata.entry||r(new Error(t.address+" did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.")),e("")})}if("undefined"!=typeof document)var n=document.getElementsByTagName("head")[0];var a,o,s,l=null,u=n&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),d=[],c=0,f=[];i("pushRegister_",function(e){return function(r){return!e.call(this,r)&&(l?this.reduceRegister_(l,r):u?this.reduceRegister_(t(),r):c?f.push(r):this.reduceRegister_(null,r),!0)}}),i("fetch",function(t){return function(i){var l=this;return"json"!=i.metadata.format&&i.metadata.scriptLoad&&(F||A)?A?r(l,i):new Promise(function(t,r){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){if(c--,i.metadata.entry||f.length){if(!u){for(var n=0;n<f.length;n++)l.reduceRegister_(i,f[n]);f=[]}}else l.reduceRegister_(i);h(),i.metadata.entry||i.metadata.bundle||r(new Error(i.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),r(new Error("Unable to load script "+i.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<d.length;t++)d[t].script==g&&(s&&s.script==g&&(s=null),d.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);n.removeChild(g)}var g=document.createElement("script");g.async=!0,i.metadata.crossOrigin&&(g.crossOrigin=i.metadata.crossOrigin),i.metadata.integrity&&g.setAttribute("integrity",i.metadata.integrity),u?(g.attachEvent("onreadystatechange",m),d.push({script:g,load:i})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,g.src=i.address,n.appendChild(g)}):t.call(this,i)}})}();var oe=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,r,n){if(n[e.groupIndex]=n[e.groupIndex]||[],U.call(n[e.groupIndex],e)==-1){n[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;a<o;a++){var i=e.normalizedDeps[a],s=r.defined[i];if(s&&!s.evaluated){var l=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<l){if(null!==s.groupIndex&&(n[s.groupIndex].splice(U.call(n[s.groupIndex],s),1),0==n[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=l}t(s,r,n)}}}}function n(e,r,n){if(!r.module){r.groupIndex=0;var a=[];t(r,n,a);for(var o=!!r.declarative==a.length%2,i=a.length-1;i>=0;i--){for(var s=a[i],l=0;l<s.length;l++){var d=s[l];o?u(d,n):c(d,n)}o=!o}}}function o(){}function l(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new o,importers:[]})}function u(t,r){if(!t.module){var n=r._loader.moduleRecords,a=t.module=l(t.name,n),o=t.module.exports,i=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var r in e)o[r]=e[r];else o[e]=t;for(var n=0,i=a.importers.length;n<i;n++){var s=a.importers[n];if(!s.locked){var l=U.call(s.dependencies,a),u=s.setters[l];u&&u(o)}}return a.locked=!1,t},{id:t.name});if("function"==typeof i&&(i={setters:[],execute:i}),i=i||{setters:[],execute:function(){}},a.setters=i.setters,a.execute=i.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var s=0,d=t.normalizedDeps.length;s<d;s++){var c,f=t.normalizedDeps[s],m=r.defined[f],p=n[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(u(m,r),p=m.module,c=p.exports):c=r.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[s],g=0,v=h.length;g<v;++g){var b=h[g];a.setters[b]&&a.setters[b](c)}}}}function d(e,t){var r,n=t.defined[e];if(n)n.declarative?f(e,n,[],t):n.evaluated||c(n,t),r=n.module.exports;else if(r=t.get(e),!r)throw new Error("Unable to load dependency "+e+".");return(!n||n.declarative)&&r&&r.__useDefault?r.default:r}function c(t,n){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,s=t.normalizedDeps.length;i<s;i++){var l=t.normalizedDeps[i],u=n.defined[l];u&&c(u,n)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var r=0,a=t.deps.length;r<a;r++)if(t.deps[r]==e)return d(t.normalizedDeps[r],n);var o=n.normalizeSync(e,t.name);if(U.call(t.normalizedDeps,o)!=-1)return d(o,n);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);void 0!==f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof r)?t.esModule=n.newModule(a):t.esmExports&&a!==e?t.esModule=n.newModule(p(a)):t.esModule=n.newModule({default:a,__useDefault:!0})}}function f(t,r,n,a){if(r&&!r.evaluated&&r.declarative){n.push(t);for(var o=0,i=r.normalizedDeps.length;o<i;o++){var s=r.normalizedDeps[o];U.call(n,s)==-1&&(a.defined[s]?f(s,a.defined[s],n,a):a.get(s))}r.evaluated||(r.evaluated=!0,r.module.execute.call(e))}}a.prototype.register=function(e,t,r){if("string"!=typeof e&&(r=t,t=e,e=null),"boolean"==typeof r)return this.registerDynamic.apply(this,arguments);var n=k();n.name=e&&(this.decanonicalize||this.normalize).call(this,e),n.declarative=!0,n.deps=t,n.declare=r,this.pushRegister_({amd:!1,entry:n})},a.prototype.registerDynamic=function(e,t,r,n){"string"!=typeof e&&(n=r,r=t,t=e,e=null);var a=k();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=n,a.executingRequire=r,this.pushRegister_({amd:!1,entry:a})},i("reduceRegister_",function(){return function(e,t){if(t){var r=t.entry,n=e&&e.metadata;if(r.name&&(r.name in this.defined||(this.defined[r.name]=r),n&&(n.bundle=!0)),!r.name||e&&!n.entry&&r.name==e.name){if(!n)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(n.entry)throw"register"==n.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+n.format+" module format, but called System.register.");n.format||(n.format="register"),n.entry=r}}}}),s(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),q(o,"toString",{value:function(){return"Module"}}),i("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),i("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),i("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.apply(this,arguments)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&M(t.source))&&(t.metadata.format="register"),e})}}),i("load",function(e){return function(t){var r=this,a=r.defined[t];return!a||a.deps.length?e.apply(this,arguments):(a.originalIndices=a.normalizedDeps=[],n(t,a,r),f(t,a,[],r),a.esModule||(a.esModule=r.newModule(a.module.exports)),r.trace||(r.defined[t]=void 0),r.set(t,a.esModule),Promise.resolve())}}),i("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var r,a=this;if(a.defined[t.name])r=a.defined[t.name],r.declarative||(r.deps=r.deps.concat(t.metadata.deps)),r.deps=r.deps.concat(t.metadata.deps);else if(t.metadata.entry)r=t.metadata.entry,r.deps=r.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof ee&&ee.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");r=t.metadata.entry,r&&t.metadata.deps&&(r.deps=r.deps.concat(t.metadata.deps))}r||(r=k(),r.deps=t.metadata.deps,r.execute=function(){}),a.defined[t.name]=r;var o=m(r.deps);r.deps=o.names,r.originalIndices=o.indices,r.name=t.name,r.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,l=r.deps.length;s<l;s++)i.push(Promise.resolve(a.normalize(r.deps[s],t.name)));return Promise.all(i).then(function(e){return r.normalizedDeps=e,{deps:r.deps,execute:function(){return n(t.name,r,a),f(t.name,r,[],a),r.esModule||(r.esModule=a.newModule(r.module.exports)),a.trace||(a.defined[t.name]=void 0),r.esModule}}})}})}(),function(){var r=/(^\s*|[}\);\n]\s*)(import\s*(['"]|(\*\s+as\s+)?[^"'\(\)\n;]+\s*from\s*['"]|\{)|export\s+\*\s+from\s+["']|export\s*(\{|default|function|class|var|const|let|async\s+function))/,n=/\$traceurRuntime\s*\./,a=/babelHelpers\s*\./;i("translate",function(o){return function(i){var s=this,l=arguments;return o.apply(s,l).then(function(o){if("esm"==i.metadata.format||"es6"==i.metadata.format||!i.metadata.format&&o.match(r)){if("es6"==i.metadata.format&&w.call(s,"Module "+i.name+' has metadata setting its format to "es6", which is deprecated.\nThis should be updated to "esm".'),i.metadata.format="esm",i.metadata.deps){for(var u="",d=0;d<i.metadata.deps.length;d++)u+='import "'+i.metadata.deps[d]+'"; ';i.source=u+o}if(s.transpiler===!1){if(s.builder)return o;throw new TypeError("Unable to dynamically transpile ES module as SystemJS.transpiler set to false.")}return s._loader.loadedTranspiler=s._loader.loadedTranspiler||!1,s.pluginLoader&&(s.pluginLoader._loader.loadedTranspiler=s._loader.loadedTranspiler||!1),(s._loader.transpilerPromise||(s._loader.transpilerPromise=Promise.resolve(e["typescript"==s.transpiler?"ts":s.transpiler]||(s.pluginLoader||s).import(s.transpiler)))).then(function(e){return s._loader.loadedTranspilerRuntime=!0,e.translate?e==i.metadata.loaderModule?i.source:("string"==typeof i.metadata.sourceMap&&(i.metadata.sourceMap=JSON.parse(i.metadata.sourceMap)),Promise.resolve(e.translate.apply(s,l)).then(function(e){var t=i.metadata.sourceMap;if(t&&"object"==typeof t){var r=i.address.split("!")[0];t.file&&t.file!=i.address||(t.file=r+"!transpiled"),(!t.sources||t.sources.length<=1&&(!t.sources[0]||t.sources[0]==i.address))&&(t.sources=[r])}return"esm"==i.metadata.format&&!s.builder&&M(e)&&(i.metadata.format="register"),e})):(s.builder&&(i.metadata.originalSource=i.source),W.call(s,i).then(function(e){return i.metadata.sourceMap=void 0,e}))},function(e){throw t(e,"Unable to load transpiler to transpile "+i.name)})}if(s.transpiler===!1)return o;if(s._loader.loadedTranspiler!==!1||"traceur"!=s.transpiler&&"typescript"!=s.transpiler&&"babel"!=s.transpiler||i.name!=s.normalizeSync(s.transpiler)||(o.length>100&&!i.metadata.format&&(i.metadata.format="global","traceur"===s.transpiler&&(i.metadata.exports="traceur"),"typescript"===s.transpiler&&(i.metadata.exports="ts")),s._loader.loadedTranspiler=!0),s._loader.loadedTranspilerRuntime===!1&&(i.name!=s.normalizeSync("traceur-runtime")&&i.name!=s.normalizeSync("babel/external-helpers*")||(o.length>100&&(i.metadata.format=i.metadata.format||"global"),s._loader.loadedTranspilerRuntime=!0)),("register"==i.metadata.format||i.metadata.bundle)&&s._loader.loadedTranspilerRuntime!==!0){if("traceur"==s.transpiler&&!e.$traceurRuntime&&i.source.match(n))return s._loader.loadedTranspilerRuntime=s._loader.loadedTranspilerRuntime||!1,s.import("traceur-runtime").then(function(){return o});if("babel"==s.transpiler&&!e.babelHelpers&&i.source.match(a))return s._loader.loadedTranspilerRuntime=s._loader.loadedTranspilerRuntime||!1,s.import("babel/external-helpers").then(function(){return o})}return o})}})}();var ie="undefined"!=typeof self?"self":"global";i("fetch",function(e){return function(t){return t.metadata.exports&&!t.metadata.format&&(t.metadata.format="global"),e.call(this,t)}}),i("instantiate",function(e){return function(t){var r=this;if(t.metadata.format||(t.metadata.format="global"),"global"==t.metadata.format&&!t.metadata.entry){var n=k();t.metadata.entry=n,n.deps=[];for(var a in t.metadata.globals){var o=t.metadata.globals[a];o&&n.deps.push(o)}n.execute=function(e,n,a){var o;if(t.metadata.globals){o={};for(var i in t.metadata.globals)t.metadata.globals[i]&&(o[i]=e(t.metadata.globals[i]))}var s=t.metadata.exports;s&&(t.source+="\n"+ie+'["'+s+'"] = '+s+";");var l=r.get("@@global-helpers").prepareGlobal(a.id,s,o,!!t.metadata.encapsulateGlobal);return ee.call(r,t),l()}}return e.call(this,t)}}),i("reduceRegister_",function(e){return function(t,r){if(r||!t.metadata.exports&&(!A||"global"!=t.metadata.format))return e.call(this,t,r);t.metadata.format="global";var n=t.metadata.entry=k();n.deps=t.metadata.deps;var a=R(t.metadata.exports);n.execute=function(){return a}}}),s(function(t){return function(){function r(t){if(Object.keys)Object.keys(e).forEach(t);else for(var r in e)i.call(e,r)&&t(r)}function n(t){r(function(r){if(U.call(s,r)==-1){try{var n=e[r]}catch(e){s.push(r)}t(r,n)}})}var a=this;t.call(a);var o,i=Object.prototype.hasOwnProperty,s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];a.set("@@global-helpers",a.newModule({prepareGlobal:function(t,r,a,i){var s=e.define;e.define=void 0;var l;if(a){l={};for(var u in a)l[u]=e[u],e[u]=a[u]}return r||(o={},n(function(e,t){o[e]=t})),function(){var t,a=r?R(r):{},u=!!r;if(r&&!i||n(function(n,s){o[n]!==s&&"undefined"!=typeof s&&(i&&(e[n]=void 0),r||(a[n]=s,"undefined"!=typeof t?u||t===s||(u=!0):t=s))}),a=u?a:t,l)for(var d in l)e[d]=l[d];return e.define=s,a}}}))}}),function(){function t(e){function t(e,t){for(var r=0;r<e.length;r++)if(e[r][0]<t.index&&e[r][1]>t.index)return!0;return!1}n.lastIndex=a.lastIndex=o.lastIndex=0;var r,i=[],s=[],l=[];if(e.length/e.split("\n").length<200){for(;r=o.exec(e);)s.push([r.index,r.index+r[0].length]);for(;r=a.exec(e);)t(s,r)||l.push([r.index+r[1].length,r.index+r[0].length-1])}for(;r=n.exec(e);)if(!t(s,r)&&!t(l,r)){var u=r[1].substr(1,r[1].length-2);if(u.match(/"|'/))continue;"/"==u[u.length-1]&&(u=u.substr(0,u.length-1)),i.push(u)}return i}var r=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])(exports\s*(\[['"]|\.)|module(\.exports|\['exports'\]|\["exports"\])\s*(\[['"]|[=,\.]))/,n=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF."'])require\s*\(\s*("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')\s*\)/g,a=/(^|[^\\])(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,o=/("[^"\\\n\r]*(\\.[^"\\\n\r]*)*"|'[^'\\\n\r]*(\\.[^'\\\n\r]*)*')/g,s=/^\#\!.*/;i("instantiate",function(a){return function(o){var i=this;if(o.metadata.format||(r.lastIndex=0,n.lastIndex=0,(n.exec(o.source)||r.exec(o.source))&&(o.metadata.format="cjs")),"cjs"==o.metadata.format){var l=o.metadata.deps,u=o.metadata.cjsRequireDetection===!1?[]:t(o.source);for(var d in o.metadata.globals)o.metadata.globals[d]&&u.push(o.metadata.globals[d]);var c=k();o.metadata.entry=c,c.deps=u,c.executingRequire=!0,c.execute=function(t,r,n){function a(e){return"/"==e[e.length-1]&&(e=e.substr(0,e.length-1)),t.apply(this,arguments)}if(a.resolve=function(e){return i.get("@@cjs-helpers").requireResolve(e,n.id)},n.paths=[],n.require=t,!o.metadata.cjsDeferDepsExecute)for(var u=0;u<l.length;u++)a(l[u]);var d=i.get("@@cjs-helpers").getPathVars(n.id),c={exports:r,args:[a,r,n,d.filename,d.dirname,e,e]},f="(function(require, exports, module, __filename, __dirname, global, GLOBAL";if(o.metadata.globals)for(var m in o.metadata.globals)c.args.push(a(o.metadata.globals[m])),f+=", "+m;var p=e.define;e.define=void 0,e.__cjsWrapper=c,o.source=f+") {"+o.source.replace(s,"")+"\n}).apply(__cjsWrapper.exports, __cjsWrapper.args);",ee.call(i,o),e.__cjsWrapper=void 0,e.define=p}}return a.call(i,o)}})}(),s(function(e){return function(){function t(e){return"file:///"==e.substr(0,8)?e.substr(7+!!D):n&&e.substr(0,n.length)==n?e.substr(n.length):e}var r=this;if(e.call(r),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var n=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");r.set("@@cjs-helpers",r.newModule({requireResolve:function(e,n){return t(r.normalizeSync(e,n))},getPathVars:function(e){var r,n=e.lastIndexOf("!");r=n!=-1?e.substr(0,n):e;var a=r.split("/");return a.pop(),a=a.join("/"),{filename:t(r),dirname:t(a)}}}))}}),i("fetch",function(t){return function(r){return r.metadata.scriptLoad&&F&&(e.define=this.amdDefine),t.call(this,r)}}),s(function(t){return function(){function r(e,t){e=e.replace(s,"");var r=e.match(d),n=(r[1].split(",")[t]||"require").replace(c,""),a=f[n]||(f[n]=new RegExp(l+n+u,"g"));a.lastIndex=0;for(var o,i=[];o=a.exec(e);)i.push(o[2]||o[3]);return i}function n(e,t,r,a){if("object"==typeof e&&!(e instanceof Array))return n.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var i=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),s=o.decanonicalize(e,a);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l=o.get(s);if(!l)throw new Error('Module not already loaded loading "'+e+'" as '+s+(a?' from "'+a+'".':"."));return l.__useDefault?l.default:l}throw new TypeError("Invalid require")}for(var u=[],d=0;d<e.length;d++)u.push(o.import(e[d],a));Promise.all(u).then(function(e){t&&t.apply(null,e)},r)}function a(t,a,i){function s(t,r,s){function c(e,r,a){return"string"==typeof e&&"function"!=typeof r?t(e):n.call(o,e,r,a,s.id)}for(var f=[],m=0;m<a.length;m++)f.push(t(a[m]));s.uri=s.id,s.config=function(){},d!=-1&&f.splice(d,0,s),u!=-1&&f.splice(u,0,r),l!=-1&&(c.toUrl=function(e){var t=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),r=o.decanonicalize(e,s.id);return t&&".js"==r.substr(r.length-3,3)&&(r=r.substr(0,r.length-3)),r},f.splice(l,0,c));var p=e.require;e.require=n;var h=i.apply(u==-1?e:r,f);if(e.require=p,"undefined"==typeof h&&s&&(h=s.exports),"undefined"!=typeof h)return h}"string"!=typeof t&&(i=a,a=t,t=null),a instanceof Array||(i=a,a=["require","exports","module"].splice(0,i.length)),"function"!=typeof i&&(i=function(e){return function(){return e}}(i)),void 0===a[a.length-1]&&a.pop();var l,u,d;(l=U.call(a,"require"))!=-1&&(a.splice(l,1),t||(a=a.concat(r(i.toString(),l)))),(u=U.call(a,"exports"))!=-1&&a.splice(u,1),(d=U.call(a,"module"))!=-1&&a.splice(d,1);var c=k();c.name=t&&(o.decanonicalize||o.normalize).call(o,t),c.deps=a,c.execute=s,o.pushRegister_({amd:!0,entry:c})}var o=this;t.call(this);var s=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,l="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",u="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",d=/\(([^\)]*)\)/,c=/^\s+|\s+$/g,f={};a.amd={},i("reduceRegister_",function(e){return function(t,r){if(!r||!r.amd)return e.call(this,t,r);var n=t&&t.metadata,a=r.entry;if(n)if(n.format&&"detect"!=n.format){if(!a.name&&"amd"!=n.format)throw new Error("AMD define called while executing "+n.format+" module "+t.name)}else n.format="amd";if(a.name)n&&(n.entry||n.bundle?n.entry&&n.entry.name&&n.entry.name!=t.name&&(n.entry=void 0):n.entry=a,n.bundle=!0),a.name in this.defined||(this.defined[a.name]=a);else{if(!n)throw new TypeError("Unexpected anonymous AMD define.");if(n.entry&&!n.entry.name)throw new Error("Multiple anonymous defines in module "+t.name);n.entry=a}}}),o.amdDefine=a,o.amdRequire=n}}),function(){var t=/(?:^\uFEFF?|[^$_a-zA-Z\xA0-\uFFFF.])define\s*\(\s*("[^"]+"\s*,\s*|'[^']+'\s*,\s*)?\s*(\[(\s*(("[^"]+"|'[^']+')\s*,|\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*(\s*("[^"]+"|'[^']+')\s*,?)?(\s*(\/\/.*\r?\n|\/\*(.|\s)*?\*\/))*\s*\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;i("instantiate",function(r){return function(n){var a=this;if("amd"==n.metadata.format||!n.metadata.format&&n.source.match(t))if(n.metadata.format="amd",a.builder||a.execute===!1)n.metadata.execute=function(){return n.metadata.builderExecute.apply(this,arguments)};else{var o=e.define;e.define=this.amdDefine;try{ee.call(a,n)}finally{e.define=o}if(!n.metadata.entry&&!n.metadata.bundle)throw new TypeError("AMD module "+n.name+" did not define")}return r.call(a,n)}})}(),function(){function e(e,t){if(t){var r;if(e.pluginFirst){if((r=t.lastIndexOf("!"))!=-1)return t.substr(r+1)}else if((r=t.indexOf("!"))!=-1)return t.substr(0,r);return t}}function t(e,t){var r,n,a=t.lastIndexOf("!");if(a!=-1)return e.pluginFirst?(r=t.substr(a+1),n=t.substr(0,a)):(r=t.substr(0,a),n=t.substr(a+1)||r.substr(r.lastIndexOf(".")+1)),{argument:r,plugin:n}}function r(e,t,r,n){return n&&".js"==t.substr(t.length-3,3)&&(t=t.substr(0,t.length-3)),e.pluginFirst?r+"!"+t:t+"!"+r}function n(e,t){return e.defaultJSExtensions&&".js"!=t.substr(t.length-3,3)}function a(a){return function(o,i,s){var l=this,u=t(l,o);if(i=e(this,i),!u)return a.call(this,o,i,s);var d=l.normalizeSync(u.argument,i,!0),c=l.normalizeSync(u.plugin,i,!0);return r(l,d,c,n(l,u.argument))}}i("decanonicalize",a),i("normalizeSync",a),i("normalize",function(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);return u?Promise.all([l.normalize(u.argument,i,!0),l.normalize(u.plugin,i,!1)]).then(function(e){return r(l,e[0],e[1],n(l,u.argument))}):a.call(l,o,i,s)}}),i("locate",function(e){return function(t){var r,n=this,a=t.name;return n.pluginFirst?(r=a.indexOf("!"))!=-1&&(t.metadata.loader=a.substr(0,r),t.name=a.substr(r+1)):(r=a.lastIndexOf("!"))!=-1&&(t.metadata.loader=a.substr(r+1),t.name=a.substr(0,r)),e.call(n,t).then(function(e){return r==-1&&t.metadata.loader?(n.pluginLoader||n).normalize(t.metadata.loader,t.name).then(function(r){return t.metadata.loader=r,e}):e}).then(function(e){var r=t.metadata.loader;if(!r)return e;if(t.name==r)throw new Error("Plugin "+r+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");if(n.defined&&n.defined[a])return e;var o=n.pluginLoader||n;return o.import(r).then(function(r){return t.metadata.loaderModule=r,t.address=e,r.locate?r.locate.call(n,t):e})})}}),i("fetch",function(e){return function(t){var r=this;return t.metadata.loaderModule&&t.metadata.loaderModule.fetch&&"defined"!=t.metadata.format?(t.metadata.scriptLoad=!1,t.metadata.loaderModule.fetch.call(r,t,function(t){return e.call(r,t)})):e.call(r,t)}}),i("translate",function(e){return function(t){var r=this,n=arguments;return t.metadata.loaderModule&&t.metadata.loaderModule.translate&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.translate.apply(r,n)).then(function(a){var o=t.metadata.sourceMap;if(o){if("object"!=typeof o)throw new Error("load.metadata.sourceMap must be set to an object.");var i=t.address.split("!")[0];o.file&&o.file!=t.address||(o.file=i+"!transpiled"),(!o.sources||o.sources.length<=1&&(!o.sources[0]||o.sources[0]==t.address))&&(o.sources=[i])}return"string"==typeof a&&(t.source=a),e.apply(r,n)}):e.apply(r,n)}}),i("instantiate",function(e){return function(t){var r=this,n=!1;return t.metadata.loaderModule&&t.metadata.loaderModule.instantiate&&!r.builder&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.instantiate.call(r,t,function(t){if(n)throw new Error("Instantiate must only be called once.");return n=!0,e.call(r,t)})).then(function(a){return n?a:(void 0!==a&&(t.metadata.entry=k(),t.metadata.entry.execute=function(){return a},t.metadata.entry.deps=t.metadata.deps,t.metadata.format="defined"),e.call(r,t))}):e.call(r,t)}})}();var se=["browser","node","dev","build","production","default"],le=/#\{[^\}]+\}/;i("normalize",function(e){return function(t,r,n){var a=this;return L.call(a,t,r).then(function(t){return e.call(a,t,r,n)}).then(function(e){return C.call(a,e,r)})}}),function(){i("fetch",function(e){return function(t){var r=t.metadata.alias,n=t.metadata.deps||[];if(r){t.metadata.format="defined";var a=k();return this.defined[t.name]=a,a.declarative=!0,a.deps=n.concat([r]),a.declare=function(e){return{setters:[function(t){for(var r in t)e(r,t[r]);t.__useDefault&&(a.module.exports.__useDefault=!0)}],execute:function(){}}},""}return e.call(this,t)}})}(),function(){function e(e,t,r){for(var n,a=t.split(".");a.length>1;)n=a.shift(),e=e[n]=e[n]||{};n=a.shift(),n in e||(e[n]=r)}s(function(e){return function(){this.meta={},e.call(this)}}),i("locate",function(e){return function(t){var r,n=this.meta,a=t.name,o=0;for(var i in n)if(r=i.indexOf("*"),r!==-1&&i.substr(0,r)===a.substr(0,r)&&i.substr(r+1)===a.substr(a.length-i.length+r+1)){var s=i.split("/").length;s>o&&(o=s),v(t.metadata,n[i],o!=s)}return n[a]&&v(t.metadata,n[a]),e.call(this,t)}});var t=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,r=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;i("translate",function(n){return function(a){if("defined"==a.metadata.format)return a.metadata.deps=a.metadata.deps||[],Promise.resolve(a.source);var o=a.source.match(t);if(o)for(var i=o[0].match(r),s=0;s<i.length;s++){var l=i[s],u=l.length,d=l.substr(0,1);if(";"==l.substr(u-1,1)&&u--,'"'==d||"'"==d){var c=l.substr(1,l.length-3),f=c.substr(0,c.indexOf(" "));if(f){var m=c.substr(f.length+1,c.length-f.length-1);"[]"==f.substr(f.length-2,2)?(f=f.substr(0,f.length-2),a.metadata[f]=a.metadata[f]||[],a.metadata[f].push(m)):a.metadata[f]instanceof Array?(w.call(this,"Module "+a.name+' contains deprecated "deps '+m+'" meta syntax.\nThis should be updated to "deps[] '+m+'" for pushing to array meta.'),a.metadata[f].push(m)):e(a.metadata,f,m)}else a.metadata[c]=!0}}return n.apply(this,arguments)}})}(),function(){s(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),i("locate",function(e){return function(t){var r=this,n=!1;if(!(t.name in r.defined))for(var a in r.bundles){for(var o=0;o<r.bundles[a].length;o++){var i=r.bundles[a][o];if(i==t.name){n=!0;break}if(i.indexOf("*")!=-1){var s=i.split("*");if(2!=s.length){r.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")==-1){n=!0;break}}}if(n)return r.import(a).then(function(){return e.call(r,t)})}return e.call(r,t)}})}(),function(){s(function(e){return function(){e.call(this),this.depCache={}}}),i("locate",function(e){return function(t){var r=this,n=r.depCache[t.name];if(n)for(var a=0;a<n.length;a++)r.import(n[a],t.name);return e.call(r,t)}})}(),X=new a,e.SystemJS=X,X.version="0.19.41 Standard","object"==typeof module&&module.exports&&"object"==typeof exports&&(module.exports=X),e.System=X}("undefined"!=typeof self?self:global)}var t="undefined"==typeof Promise;if("undefined"!=typeof document){var r=document.getElementsByTagName("script");if($__curScript=r[r.length-1],document.currentScript&&($__curScript.defer||$__curScript.async)&&($__curScript=document.currentScript),$__curScript.src||($__curScript=void 0),t){var n=$__curScript.src,a=n.substr(0,n.lastIndexOf("/")+1);window.systemJSBootstrap=e,document.write('<script type="text/javascript" src="'+a+'system-polyfills.js"></script>')}else e()}else if("undefined"!=typeof importScripts){var a="";try{throw new Error("_")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){$__curScript={src:t},a=t.replace(/\/[^\/]*$/,"/")})}t&&importScripts(a+"system-polyfills.js"),e()}else $__curScript= true?{src:__filename}:null,e()}();
	//# sourceMappingURL=system.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), __webpack_require__(2).Buffer, "/index.js"))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.41
	 */
	!function(){function e(){!function(e){function t(e,n){if("string"!=typeof e)throw new TypeError("URL must be a string");var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!r)throw new RangeError("Invalid URL format");var a=r[1]||"",o=r[2]||"",i=r[3]||"",s=r[4]||"",l=r[5]||"",u=r[6]||"",d=r[7]||"",c=r[8]||"",f=r[9]||"";if(void 0!==n){var m=n instanceof t?n:new t(n),p=!a&&!s&&!o;!p||d||c||(c=m.search),p&&"/"!==d[0]&&(d=d?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+d:m.pathname);var h=[];d.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),d=h.join("").replace(/^\//,"/"===d[0]?"/":""),p&&(u=m.port,l=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}d=d.replace(/\\/g,"/"),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+d+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=l,this.port=u,this.pathname=d,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var n=((e.message||e)+(e.stack?"\n"+e.stack:"")).toString().split("\n"),r=[],a=0;a<n.length;a++)"undefined"!=typeof $__curScript&&n[a].indexOf($__curScript.src)!=-1||r.push(n[a]);var o="(SystemJS) "+(r?r.join("\n\t"):e.message.substr(11))+"\n\t"+t;q||(o=o.replace(U?/file:\/\/\//g:/file:\/\//g,""));var i=N?new Error(o,e.fileName,e.lineNumber):new Error(o);return i.stack=o,i.originalErr=e.originalErr||e,i}function n(){}function r(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},A(this,"global",{get:function(){return e}})}function a(){r.call(this),this.paths={},this._loader.paths={},G.call(this)}function o(){}function i(e,t){a.prototype[e]=t(a.prototype[e]||function(){})}function s(e){G=e(G||function(){})}function l(e){return e.match(V)}function u(e){return"."==e[0]&&(!e[1]||"/"==e[1]||"."==e[1])||"/"==e[0]}function d(e){return!u(e)&&!l(e)}function c(e,t){if("."==e[0]){if("/"==e[1]&&"."!=e[2])return(t&&t.substr(0,t.lastIndexOf("/")+1)||$)+e.substr(2)}else if("/"!=e[0]&&e.indexOf(":")==-1)return(t&&t.substr(0,t.lastIndexOf("/")+1)||$)+e;return new H(e,t&&t.replace(/#/g,"%05")||Y).href.replace(/%05/g,"#")}function f(e,t){var n,r="",a=0,o=e.paths,i=e._loader.paths;for(var s in o)if(!o.hasOwnProperty||o.hasOwnProperty(s)){var l=o[s];if(l!==i[s]&&(l=o[s]=i[s]=c(o[s],u(o[s])?$:e.baseURL)),s.indexOf("*")===-1){if(t==s)return o[s];if(t.substr(0,s.length-1)==s.substr(0,s.length-1)&&(t.length<s.length||t[s.length-1]==s[s.length-1])&&("/"==o[s][o[s].length-1]||""==o[s]))return o[s].substr(0,o[s].length-1)+(t.length>s.length?(o[s]&&"/"||"")+t.substr(s.length):"")}else{var d=s.split("*");if(d.length>2)throw new TypeError("Only one wildcard in a path is permitted");var f=d[0].length;f>=a&&t.substr(0,d[0].length)==d[0]&&t.substr(t.length-d[1].length)==d[1]&&(a=f,r=s,n=t.substr(d[0].length,t.length-d[1].length-d[0].length))}}var m=o[r];return"string"==typeof n&&(m=m.replace("*",n)),m}function m(e){for(var t=[],n=[],r=0,a=e.length;r<a;r++){var o=J.call(t,e[r]);o===-1?(t.push(e[r]),n.push([r])):n[o].push(r)}return{names:t,indices:n}}function p(t){var n={};if(("object"==typeof t||"function"==typeof t)&&t!==e)if(Z)for(var r in t)"default"!==r&&h(n,t,r);else g(n,t);return n.default=t,A(n,"__useDefault",{value:!0}),n}function h(e,t,n){try{var r;(r=Object.getOwnPropertyDescriptor(t,n))&&A(e,n,r)}catch(r){return e[n]=t[n],!1}}function g(e,t,n){var r=t&&t.hasOwnProperty;for(var a in t)r&&!t.hasOwnProperty(a)||n&&a in e||(e[a]=t[a]);return e}function v(e,t,n){var r=t&&t.hasOwnProperty;for(var a in t)if(!r||t.hasOwnProperty(a)){var o=t[a];a in e?o instanceof Array&&e[a]instanceof Array?e[a]=[].concat(n?o:e[a]).concat(n?e[a]:o):"object"==typeof o&&null!==o&&"object"==typeof e[a]?e[a]=g(g({},e[a]),o,n):n||(e[a]=o):e[a]=o}}function y(e,t,n,r,a){for(var o in t)if(J.call(["main","format","defaultExtension","basePath"],o)!=-1)e[o]=t[o];else if("map"==o)g(e.map=e.map||{},t.map);else if("meta"==o)g(e.meta=e.meta||{},t.meta);else if("depCache"==o)for(var i in t.depCache){var s;s="./"==i.substr(0,2)?n+"/"+i.substr(2):j.call(r,i),r.depCache[s]=(r.depCache[s]||[]).concat(t.depCache[i])}else!a||J.call(["browserConfig","nodeConfig","devConfig","productionConfig"],o)!=-1||t.hasOwnProperty&&!t.hasOwnProperty(o)||w.call(r,'"'+o+'" is not a valid package configuration option in package '+n)}function b(e,t,n,r){var a;if(e.packages[t]){var o=e.packages[t];a=e.packages[t]={},y(a,r?n:o,t,e,r),y(a,r?o:n,t,e,!r)}else a=e.packages[t]=n;return"object"==typeof a.main&&(a.map=a.map||{},a.map["./@main"]=a.main,a.main.default=a.main.default||"./",a.main="@main"),a}function w(e){this.warnings&&"undefined"!=typeof console&&console.warn}function x(e,t){for(var n=e.split(".");n.length;)t=t[n.shift()];return t}function S(e,t){var n,r=0;for(var a in e)if(t.substr(0,a.length)==a&&(t.length==a.length||"/"==t[a.length])){var o=a.split("/").length;if(o<=r)continue;n=a,r=o}return n}function E(e){this._loader.baseURL!==this.baseURL&&("/"!=this.baseURL[this.baseURL.length-1]&&(this.baseURL+="/"),this._loader.baseURL=this.baseURL=new H(this.baseURL,Y).href)}function _(e,t){this.set("@system-env",W=this.newModule({browser:q,node:!!this._nodeRequire,production:!t&&e,dev:t||!e,build:t,default:!0}))}function P(e,t){if(!d(e))throw new Error("Node module "+e+" can't be loaded as it is not a package require.");if(!ee){var n=this._nodeRequire("module"),r=t.substr(U?8:7);ee=new n(r),ee.paths=n._nodeModulePaths(r)}return ee.require(e)}function j(e,t){if(u(e))return c(e,t);if(l(e))return e;var n=S(this.map,e);if(n){if(e=this.map[n]+e.substr(n.length),u(e))return c(e);if(l(e))return e}if(this.has(e))return e;if("@node/"==e.substr(0,6)){if(!this._nodeRequire)throw new TypeError("Error loading "+e+". Can only load node core modules in Node.");return this.builder?this.set(e,this.newModule({})):this.set(e,this.newModule(p(P.call(this,e.substr(6),this.baseURL)))),e}return E.call(this),f(this,e)||this.baseURL+e}function k(e,t,n){W.browser&&t.browserConfig&&n(t.browserConfig),W.node&&t.nodeConfig&&n(t.nodeConfig),W.dev&&t.devConfig&&n(t.devConfig),W.build&&t.buildConfig&&n(t.buildConfig),W.production&&t.productionConfig&&n(t.productionConfig)}function O(e){var t=e.match(re);return t&&"System.register"==e.substr(t[0].length,15)}function R(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}function M(t){if("string"==typeof t)return x(t,e);if(!(t instanceof Array))throw new Error("Global exports must be a string or array.");for(var n={},r=!0,a=0;a<t.length;a++){var o=x(t[a],e);r&&(n.default=o,r=!1),n[t[a].split(".").pop()]=o}return n}function z(e){var t,n,r,r="~"==e[0],a=e.lastIndexOf("|");return a!=-1?(t=e.substr(a+1),n=e.substr(r,a-r),r&&w.call(this,'Condition negation form "'+e+'" is deprecated for "'+n+"|~"+t+'"'),"~"==t[0]&&(r=!0,t=t.substr(1))):(t="default",n=e.substr(r),ae.indexOf(n)!=-1&&(t=n,n=null)),{module:n||"@system-env",prop:t,negate:r}}function I(e){return e.module+"|"+(e.negate?"~":"")+e.prop}function C(e,t,n){var r=this;return this.normalize(e.module,t).then(function(t){return r.load(t).then(function(a){var o=x(e.prop,r.get(t));if(n&&"boolean"!=typeof o)throw new TypeError("Condition "+I(e)+" did not resolve to a boolean.");return e.negate?!o:o})})}function L(e,t){var n=e.match(oe);if(!n)return Promise.resolve(e);var r=z.call(this,n[0].substr(2,n[0].length-3));return this.builder?this.normalize(r.module,t).then(function(t){return r.module=t,e.replace(oe,"#{"+I(r)+"}")}):C.call(this,r,t,!1).then(function(n){if("string"!=typeof n)throw new TypeError("The condition value for "+e+" doesn't resolve to a string.");if(n.indexOf("/")!=-1)throw new TypeError("Unabled to interpolate conditional "+e+(t?" in "+t:"")+"\n\tThe condition value "+n+' cannot contain a "/" separator.');return e.replace(oe,n)})}function T(e,t){var n=e.lastIndexOf("#?");if(n==-1)return Promise.resolve(e);var r=z.call(this,e.substr(n+2));return this.builder?this.normalize(r.module,t).then(function(t){return r.module=t,e.substr(0,n)+"#?"+I(r)}):C.call(this,r,t,!0).then(function(t){return t?e.substr(0,n):"@empty"})}var D="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,q="undefined"!=typeof window&&"undefined"!=typeof document,U="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var A,J=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(A=Object.defineProperty)}catch(e){A=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(e){}}}}();var $,N="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if($=document.baseURI,!$){var F=document.getElementsByTagName("base");$=F[0]&&F[0].href||window.location.href}}else"undefined"!=typeof location&&($=e.location.href);if($)$=$.split("#")[0].split("?")[0],$=$.substr(0,$.lastIndexOf("/")+1);else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");$="file://"+(U?"/":"")+process.cwd()+"/",U&&($=$.replace(/\\/g,"/"))}try{var B="test:"==new e.URL("test:///").protocol}catch(e){}var H=B?e.URL:e.URLPolyfill;A(n.prototype,"toString",{value:function(){return"Module"}}),function(){function e(e){return{status:"loading",name:e||"<Anonymous"+ ++b+">",linkSets:[],dependencies:[],metadata:{}}}function a(e,t,n){return new Promise(u({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function o(t,n,r,a){return new Promise(function(e,o){e(t.loaderObj.normalize(n,r,a))}).then(function(n){var r;if(t.modules[n])return r=e(n),r.status="linked",r.module=t.modules[n],r;for(var a=0,o=t.loads.length;a<o;a++)if(r=t.loads[a],r.name==n)return r;return r=e(n),t.loads.push(r),i(t,r),r})}function i(e,t){s(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function s(e,t,n){l(e,t,n.then(function(n){if("loading"==t.status)return t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})}))}function l(e,t,n){n.then(function(n){if("loading"==t.status)return t.address=t.address||t.name,Promise.resolve(e.loaderObj.translate({name:t.name,metadata:t.metadata,address:t.address,source:n})).then(function(n){return t.source=n,e.loaderObj.instantiate({name:t.name,metadata:t.metadata,address:t.address,source:n})}).then(function(e){if(void 0===e)throw new TypeError("Declarative modules unsupported in the polyfill.");if("object"!=typeof e)throw new TypeError("Invalid instantiate return value");t.depsList=e.deps||[],t.execute=e.execute}).then(function(){t.dependencies=[];for(var n=t.depsList,r=[],a=0,i=n.length;a<i;a++)(function(n,a){r.push(o(e,n,t.name,t.address).then(function(e){if(t.dependencies[a]={key:n,value:e.name},"linked"!=e.status)for(var r=t.linkSets.concat([]),o=0,i=r.length;o<i;o++)c(r[o],e)}))})(n[a],a);return Promise.all(r)}).then(function(){t.status="loaded";for(var e=t.linkSets.concat([]),n=0,r=e.length;n<r;n++)m(e[n],t)})}).catch(function(e){t.status="failed",t.exception=e;for(var n=t.linkSets.concat([]),r=0,a=n.length;r<a;r++)p(n[r],t,e)})}function u(t){return function(n,r){var a=t.loader,o=t.moduleName,u=t.step;if(a.modules[o])throw new TypeError('"'+o+'" already exists in the module table');for(var c,f=0,m=a.loads.length;f<m;f++)if(a.loads[f].name==o&&(c=a.loads[f],"translate"!=u||c.source||(c.address=t.moduleAddress,l(a,c,Promise.resolve(t.moduleSource))),c.linkSets.length&&c.linkSets[0].loads[0].name==c.name))return c.linkSets[0].done.then(function(){n(c)});var p=c||e(o);p.metadata=t.moduleMetadata;var h=d(a,p);a.loads.push(p),n(h.done),"locate"==u?i(a,p):"fetch"==u?s(a,p,Promise.resolve(t.moduleAddress)):(p.address=t.moduleAddress,l(a,p,Promise.resolve(t.moduleSource)))}}function d(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),c(n,t),n}function c(e,t){if("failed"!=t.status){for(var n=0,r=e.loads.length;n<r;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;n<r;n++)if(t.dependencies[n]){var o=t.dependencies[n].value;if(!a.modules[o])for(var i=0,s=a.loads.length;i<s;i++)if(a.loads[i].name==o){c(e,a.loads[i]);break}}}}function f(e){var t=!1;try{y(e,function(n,r){p(e,n,r),t=!0})}catch(n){p(e,null,n),t=!0}return t}function m(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;a<o;a++){var t=r[a];t.module={name:t.name,module:w({}),evaluated:!0},t.status="linked",h(e.loader,t)}return e.resolve(n)}var i=f(e);i||e.resolve(n)}}function p(e,n,r){var a=e.loader;e:if(n)if(e.loads[0].name==n.name)r=t(r,"Error loading "+n.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var l=i.dependencies[s];if(l.value==n.name){r=t(r,"Error loading "+n.name+' as "'+l.key+'" from '+i.name);break e}}r=t(r,"Error loading "+n.name+" from "+e.loads[0].name)}else r=t(r,"Error linking "+e.loads[0].name);for(var u=e.loads.concat([]),o=0,d=u.length;o<d;o++){var n=u[o];a.loaderObj.failed=a.loaderObj.failed||[],J.call(a.loaderObj.failed,n)==-1&&a.loaderObj.failed.push(n);var c=J.call(n.linkSets,e);if(n.linkSets.splice(c,1),0==n.linkSets.length){var f=J.call(e.loader.loads,n);f!=-1&&e.loader.loads.splice(f,1)}}e.reject(r)}function h(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source}}t.name&&(e.modules[t.name]=t.module);var r=J.call(e.loads,t);r!=-1&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;a<o;a++)r=J.call(t.linkSets[a].loads,t),r!=-1&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function g(e,t,r){try{var a=t.execute()}catch(e){return void r(t,e)}return a&&a instanceof n?a:void r(t,new TypeError("Execution must define a Module instance"))}function v(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function y(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],i=g(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",h(n,o)}}var b=0;r.prototype={constructor:r,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return v(this,e,new Promise(u({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},delete:function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],!!t.modules[e]&&delete t.modules[e]},get:function(e){if(this._loader.modules[e])return this._loader.modules[e].module},has:function(e){return!!this._loader.modules[e]},import:function(e,t,n){"object"==typeof t&&(t=t.name);var r=this;return Promise.resolve(r.normalize(e,t)).then(function(e){var t=r._loader;return t.modules[e]?t.modules[e].module:t.importPromises[e]||v(r,e,a(t,e,{}).then(function(n){return delete t.importPromises[e],n.module.module}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||v(this,e,new Promise(u({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(t,n){var r=e();r.address=n&&n.address;var a=d(this._loader,r),o=Promise.resolve(t),i=this._loader,s=a.done.then(function(){return r.module.module});return l(i,r,o),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new n,r=[];if(Object.getOwnPropertyNames&&null!=e)r=Object.getOwnPropertyNames(e);else for(var a in e)r.push(a);for(var o=0;o<r.length;o++)(function(n){A(t,n,{configurable:!1,enumerable:!0,get:function(){return e[n]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(r[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof n))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,n){},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var w=r.prototype.newModule}();var X;o.prototype=r.prototype,a.prototype=new o,a.prototype.constructor=a;var G,V=/^[^\/]+:\/\//,Y=new H($),Z=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(e){Z=!1}var K;if("undefined"!=typeof XMLHttpRequest)K=function(e,t,n,r){function a(){n(i.responseText)}function o(){r(new Error("XHR error"+(i.status?" ("+i.status+(i.statusText?" "+i.statusText:"")+")":"")+" loading "+e))}var i=new XMLHttpRequest,s=!0,l=!1;if(!("withCredentials"in i)){var u=/^(\w+:)?\/\/([^\/]+)/.exec(e);u&&(s=u[2]===window.location.host,u[1]&&(s&=u[1]===window.location.protocol))}s||"undefined"==typeof XDomainRequest||(i=new XDomainRequest,i.onload=a,i.onerror=o,i.ontimeout=o,i.onprogress=function(){},i.timeout=0,l=!0),i.onreadystatechange=function(){4===i.readyState&&(0==i.status?i.responseText?a():(i.addEventListener("error",o),i.addEventListener("load",a)):200===i.status?a():o())},i.open("GET",e,!0),i.setRequestHeader&&(i.setRequestHeader("Accept","application/x-es-module, */*"),t&&("string"==typeof t&&i.setRequestHeader("Authorization",t),i.withCredentials=!0)),l?setTimeout(function(){i.send()},0):i.send(null)};else if("undefined"!="function"&&"undefined"!=typeof process){var Q;K=function(e,t,n,r){if("file:///"!=e.substr(0,8))throw new Error('Unable to fetch "'+e+'". Only file URLs of the form file:/// allowed running in Node.');return Q=Q||__webpack_require__(6),e=U?e.replace(/\//g,"\\").substr(8):e.substr(7),Q.readFile(e,function(e,t){if(e)return r(e);var a=t+"";"\ufeff"===a[0]&&(a=a.substr(1)),n(a)})}}else{if("undefined"==typeof self||"undefined"==typeof self.fetch)throw new TypeError("No environment fetch API available.");K=function(e,t,n,r){var a={headers:{Accept:"application/x-es-module, */*"}};t&&("string"==typeof t&&(a.headers.Authorization=t),a.credentials="include"),fetch(e,a).then(function(e){if(e.ok)return e.text();throw new Error("Fetch error: "+e.status+" "+e.statusText)}).then(n,r)}}var W;s(function(e){return function(){e.call(this),this.baseURL=$,this.map={},"undefined"!=typeof $__curScript&&(this.scriptSrc=$__curScript.src),this.warnings=!1,this.defaultJSExtensions=!1,this.pluginFirst=!1,this.loaderErrorStack=!1,this.set("@empty",this.newModule({})),_.call(this,!1,!1)}}),"undefined"=="function"||"undefined"==typeof process||process.browser||(a.prototype._nodeRequire=__webpack_require__(7));var ee;i("normalize",function(e){return function(e,t,n){var r=j.call(this,e,t);return!this.defaultJSExtensions||n||".js"==r.substr(r.length-3,3)||d(r)||(r+=".js"),r}});var te="undefined"!=typeof XMLHttpRequest;i("locate",function(e){return function(t){return Promise.resolve(e.call(this,t)).then(function(e){return te?e.replace(/#/g,"%23"):e})}}),i("fetch",function(){return function(e){return new Promise(function(t,n){K(e.address,e.metadata.authorization,t,n)})}}),i("import",function(e){return function(t,n,r){return n&&n.name&&w.call(this,"SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing "+t+" from "+n.name),e.call(this,t,n,r).then(function(e){return e.__useDefault?e.default:e})}}),i("translate",function(e){return function(t){return"detect"==t.metadata.format&&(t.metadata.format=void 0),e.apply(this,arguments)}}),i("instantiate",function(e){return function(e){if("json"==e.metadata.format&&!this.builder){var t=e.metadata.entry=R();t.deps=[],t.execute=function(){try{return JSON.parse(e.source)}catch(t){throw new Error("Invalid JSON file "+e.name)}}}}}),a.prototype.getConfig=function(e){var t={},n=this;for(var r in n)n.hasOwnProperty&&!n.hasOwnProperty(r)||r in a.prototype&&"transpiler"!=r||J.call(["_loader","amdDefine","amdRequire","defined","failed","version","loads"],r)==-1&&(t[r]=n[r]);return t.production=W.production,t};var ne;a.prototype.config=function(e,t){function n(e){for(var t in e)if(e.hasOwnProperty(t))return!0}var r=this;if("loaderErrorStack"in e&&(ne=$__curScript,e.loaderErrorStack?$__curScript=void 0:$__curScript=ne),"warnings"in e&&(r.warnings=e.warnings),e.transpilerRuntime===!1&&(r._loader.loadedTranspilerRuntime=!0),("production"in e||"build"in e)&&_.call(r,!!e.production,!!(e.build||W&&W.build)),!t){var a;if(k(r,e,function(e){a=a||e.baseURL}),a=a||e.baseURL){if(n(r.packages)||n(r.meta)||n(r.depCache)||n(r.bundles)||n(r.packageConfigPaths))throw new TypeError("Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.");this.baseURL=a,E.call(this)}if(e.paths&&g(r.paths,e.paths),k(r,e,function(e){e.paths&&g(r.paths,e.paths)}),this.warnings)for(var o in r.paths)o.indexOf("*")!=-1&&w.call(r,'Paths configuration "'+o+'" -> "'+r.paths[o]+'" uses wildcards which are being deprecated for just leaving a trailing "/" to indicate folder paths.')}if(e.defaultJSExtensions&&(r.defaultJSExtensions=e.defaultJSExtensions,w.call(r,"The defaultJSExtensions configuration option is deprecated, use packages configuration instead.")),e.pluginFirst&&(r.pluginFirst=e.pluginFirst),e.map)for(var o in e.map){var i=e.map[o];if("string"!=typeof i){var s=r.defaultJSExtensions&&".js"!=o.substr(o.length-3,3),l=r.decanonicalize(o);s&&".js"==l.substr(l.length-3,3)&&(l=l.substr(0,l.length-3));var u="";for(var c in r.packages)l.substr(0,c.length)==c&&(!l[c.length]||"/"==l[c.length])&&u.split("/").length<c.split("/").length&&(u=c);u&&r.packages[u].main&&(l=l.substr(0,l.length-r.packages[u].main.length-1));var c=r.packages[l]=r.packages[l]||{};c.map=i}else r.map[o]=i}if(e.packageConfigPaths){for(var f=[],m=0;m<e.packageConfigPaths.length;m++){var p=e.packageConfigPaths[m],h=Math.max(p.lastIndexOf("*")+1,p.lastIndexOf("/")),v=j.call(r,p.substr(0,h));f[m]=v+p.substr(h)}r.packageConfigPaths=f}if(e.bundles)for(var o in e.bundles){for(var y=[],m=0;m<e.bundles[o].length;m++){var s=r.defaultJSExtensions&&".js"!=e.bundles[o][m].substr(e.bundles[o][m].length-3,3),x=r.decanonicalize(e.bundles[o][m]);s&&".js"==x.substr(x.length-3,3)&&(x=x.substr(0,x.length-3)),y.push(x)}r.bundles[o]=y}if(e.packages)for(var o in e.packages){if(o.match(/^([^\/]+:)?\/\/$/))throw new TypeError('"'+o+'" is not a valid package name.');var l=j.call(r,o);"/"==l[l.length-1]&&(l=l.substr(0,l.length-1)),b(r,l,e.packages[o],!1)}for(var S in e){var i=e[S];if(J.call(["baseURL","map","packages","bundles","paths","warnings","packageConfigPaths","loaderErrorStack","browserConfig","nodeConfig","devConfig","buildConfig","productionConfig"],S)==-1)if("object"!=typeof i||i instanceof Array)r[S]=i;else{r[S]=r[S]||{};for(var o in i)if("meta"==S&&"*"==o[0])g(r[S][o]=r[S][o]||{},i[o]);else if("meta"==S){var P=j.call(r,o);r.defaultJSExtensions&&".js"!=P.substr(P.length-3,3)&&!d(P)&&(P+=".js"),g(r[S][P]=r[S][P]||{},i[o])}else if("depCache"==S){var s=r.defaultJSExtensions&&".js"!=o.substr(o.length-3,3),l=r.decanonicalize(o);s&&".js"==l.substr(l.length-3,3)&&(l=l.substr(0,l.length-3)),r[S][l]=[].concat(i[o])}else r[S][o]=i[o]}}k(r,e,function(e){r.config(e,!0)})},function(){function e(e,t){var n,r,a=0;for(var o in e.packages)t.substr(0,o.length)!==o||t.length!==o.length&&"/"!==t[o.length]||(r=o.split("/").length,r>a&&(n=o,a=r));return n}function t(e,t,n,r,a){if(!r||"/"==r[r.length-1]||a||t.defaultExtension===!1)return r;var o=!1;if(t.meta&&p(t.meta,r,function(e,t,n){if(0==n||e.lastIndexOf("*")!=e.length-1)return o=!0}),!o&&e.meta&&p(e.meta,n+"/"+r,function(e,t,n){if(0==n||e.lastIndexOf("*")!=e.length-1)return o=!0}),o)return r;var i="."+(t.defaultExtension||"js");return r.substr(r.length-i.length)!=i?r+i:r}function n(e,n,r,a,i){if(!a){if(!n.main)return r+(e.defaultJSExtensions?".js":"");a="./"==n.main.substr(0,2)?n.main.substr(2):n.main}if(n.map){var s="./"+a,l=S(n.map,s);if(l||(s="./"+t(e,n,r,a,i),s!="./"+a&&(l=S(n.map,s))),l){var u=o(e,n,r,l,s,i);if(u)return u}}return r+"/"+t(e,n,r,a,i)}function r(e,t,n,r){if("."==e)throw new Error("Package "+n+' has a map entry for "." which is not permitted.');return!(t.substr(0,e.length)==e&&r.length>e.length)}function o(e,n,a,o,i,s){"/"==i[i.length-1]&&(i=i.substr(0,i.length-1));var l=n.map[o];if("object"==typeof l)throw new Error("Synchronous conditional normalization not supported sync normalizing "+o+" in "+a);if(r(o,l,a,i)&&"string"==typeof l){if("."==l)l=a;else if("./"==l.substr(0,2))return a+"/"+t(e,n,a,l.substr(2)+i.substr(o.length),s);return e.normalizeSync(l+i.substr(o.length),a+"/")}}function l(e,n,r,a,o){if(!a){if(!n.main)return Promise.resolve(r+(e.defaultJSExtensions?".js":""));a="./"==n.main.substr(0,2)?n.main.substr(2):n.main}var i,s;return n.map&&(i="./"+a,s=S(n.map,i),s||(i="./"+t(e,n,r,a,o),i!="./"+a&&(s=S(n.map,i)))),(s?d(e,n,r,s,i,o):Promise.resolve()).then(function(i){return i?Promise.resolve(i):Promise.resolve(r+"/"+t(e,n,r,a,o))})}function u(e,n,r,a,o,i,s){if("."==o)o=r;else if("./"==o.substr(0,2))return Promise.resolve(r+"/"+t(e,n,r,o.substr(2)+i.substr(a.length),s)).then(function(t){return L.call(e,t,r+"/")});return e.normalize(o+i.substr(a.length),r+"/")}function d(e,t,n,a,o,i){"/"==o[o.length-1]&&(o=o.substr(0,o.length-1));var s=t.map[a];if("string"==typeof s)return r(a,s,n,o)?u(e,t,n,a,s,o,i):Promise.resolve();if(e.builder)return Promise.resolve(n+"/#:"+o);var l=[],d=[];for(var c in s){var f=z(c);d.push({condition:f,map:s[c]}),l.push(e.import(f.module,n))}return Promise.all(l).then(function(e){for(var t=0;t<d.length;t++){var n=d[t].condition,r=x(n.prop,e[t]);if(!n.negate&&r||n.negate&&!r)return d[t].map}}).then(function(s){if(s){if(!r(a,s,n,o))return;return u(e,t,n,a,s,o,i)}})}function c(e){var t=e.lastIndexOf("*"),n=Math.max(t+1,e.lastIndexOf("/"));return{length:n,regEx:new RegExp("^("+e.substr(0,n).replace(/[.+?^${}()|[\]\\]/g,"\\$&").replace(/\*/g,"[^\\/]+")+")(\\/|$)"),wildcard:t!=-1}}function f(e,t){for(var n,r,a=!1,o=0;o<e.packageConfigPaths.length;o++){var i=e.packageConfigPaths[o],s=h[i]||(h[i]=c(i));if(!(t.length<s.length)){var l=t.match(s.regEx);!l||n&&(a&&s.wildcard||!(n.length<l[1].length))||(n=l[1],a=!s.wildcard,r=n+i.substr(s.length))}}if(n)return{packageName:n,configPath:r}}function m(e,t,n){var r=e.pluginLoader||e;return(r.meta[n]=r.meta[n]||{}).format="json",r.meta[n].loader=null,r.load(n).then(function(){var a=r.get(n).default;return a.systemjs&&(a=a.systemjs),a.modules&&(a.meta=a.modules,w.call(e,"Package config file "+n+' is configured with "modules", which is deprecated as it has been renamed to "meta".')),b(e,t,a,!0)})}function p(e,t,n){var r;for(var a in e){var o="./"==a.substr(0,2)?"./":"";if(o&&(a=a.substr(2)),r=a.indexOf("*"),r!==-1&&a.substr(0,r)==t.substr(0,r)&&a.substr(r+1)==t.substr(t.length-a.length+r+1)&&n(a,e[o+a],a.split("/").length))return}var i=e[t]&&e.hasOwnProperty&&e.hasOwnProperty(t)?e[t]:e["./"+t];i&&n(i,i,0)}s(function(e){return function(){e.call(this),this.packages={},this.packageConfigPaths=[]}}),a.prototype.normalizeSync=a.prototype.decanonicalize=a.prototype.normalize,i("decanonicalize",function(t){return function(n,r){if(this.builder)return t.call(this,n,r,!0);var a=t.call(this,n,r,!1);if(!this.defaultJSExtensions)return a;var o=e(this,a),i=this.packages[o],s=i&&i.defaultExtension;return void 0==s&&i&&i.meta&&p(i.meta,a.substr(o),function(e,t,n){if(0==n||e.lastIndexOf("*")!=e.length-1)return s=!1,!0}),(s===!1||s&&".js"!=s)&&".js"!=n.substr(n.length-3,3)&&".js"==a.substr(a.length-3,3)&&(a=a.substr(0,a.length-3)),a}}),i("normalizeSync",function(t){return function(r,a,i){var s=this;if(i=i===!0,a)var l=e(s,a)||s.defaultJSExtensions&&".js"==a.substr(a.length-3,3)&&e(s,a.substr(0,a.length-3));var u=l&&s.packages[l];if(u&&"."!=r[0]){var d=u.map,c=d&&S(d,r);if(c&&"string"==typeof d[c]){var m=o(s,u,l,c,r,i);if(m)return m}}var p=s.defaultJSExtensions&&".js"!=r.substr(r.length-3,3),h=t.call(s,r,a,!1);p&&".js"!=h.substr(h.length-3,3)&&(p=!1),p&&(h=h.substr(0,h.length-3));var g=f(s,h),v=g&&g.packageName||e(s,h);if(!v)return h+(p?".js":"");var y=h.substr(v.length+1);return n(s,s.packages[v]||{},v,y,i)}}),i("normalize",function(t){return function(n,r,a){var o=this;return a=a===!0,Promise.resolve().then(function(){if(r)var t=e(o,r)||o.defaultJSExtensions&&".js"==r.substr(r.length-3,3)&&e(o,r.substr(0,r.length-3));var i=t&&o.packages[t];if(i&&"./"!=n.substr(0,2)){var s=i.map,l=s&&S(s,n);if(l)return d(o,i,t,l,n,a)}return Promise.resolve()}).then(function(i){if(i)return i;var s=o.defaultJSExtensions&&".js"!=n.substr(n.length-3,3),u=t.call(o,n,r,!1);s&&".js"!=u.substr(u.length-3,3)&&(s=!1),s&&(u=u.substr(0,u.length-3));var d=f(o,u),c=d&&d.packageName||e(o,u);if(!c)return Promise.resolve(u+(s?".js":""));var p=o.packages[c],h=p&&(p.configured||!d);return(h?Promise.resolve(p):m(o,c,d.configPath)).then(function(e){var t=u.substr(c.length+1);return l(o,e,c,t,a)})})}});var h={};i("locate",function(t){return function(n){var r=this;return Promise.resolve(t.call(this,n)).then(function(t){var a=e(r,n.name);if(a){var o=r.packages[a],i=n.name.substr(a.length+1),s={};if(o.meta){var l=0;p(o.meta,i,function(e,t,n){n>l&&(l=n),v(s,t,n&&l>n)}),v(n.metadata,s)}o.format&&!n.metadata.loader&&(n.metadata.format=n.metadata.format||o.format)}return t})}})}(),function(){function t(){if(s&&"interactive"===s.script.readyState)return s.load;for(var e=0;e<d.length;e++)if("interactive"==d[e].script.readyState)return s=d[e],s.load}function n(e,t){return new Promise(function(e,n){t.metadata.integrity&&n(new Error("Subresource integrity checking is not supported in web workers.")),l=t;try{importScripts(t.address)}catch(e){l=null,n(e)}l=null,t.metadata.entry||n(new Error(t.address+" did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.")),e("")})}if("undefined"!=typeof document)var r=document.getElementsByTagName("head")[0];var a,o,s,l=null,u=r&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),d=[],c=0,f=[];i("pushRegister_",function(e){return function(n){return!e.call(this,n)&&(l?this.reduceRegister_(l,n):u?this.reduceRegister_(t(),n):c?f.push(n):this.reduceRegister_(null,n),!0)}}),i("fetch",function(t){return function(i){var l=this;return"json"!=i.metadata.format&&i.metadata.scriptLoad&&(q||D)?D?n(l,i):new Promise(function(t,n){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){if(c--,i.metadata.entry||f.length){if(!u){for(var r=0;r<f.length;r++)l.reduceRegister_(i,f[r]);f=[]}}else l.reduceRegister_(i);h(),i.metadata.entry||i.metadata.bundle||n(new Error(i.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),n(new Error("Unable to load script "+i.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<d.length;t++)d[t].script==g&&(s&&s.script==g&&(s=null),d.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);
	r.removeChild(g)}var g=document.createElement("script");g.async=!0,i.metadata.crossOrigin&&(g.crossOrigin=i.metadata.crossOrigin),i.metadata.integrity&&g.setAttribute("integrity",i.metadata.integrity),u?(g.attachEvent("onreadystatechange",m),d.push({script:g,load:i})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,g.src=i.address,r.appendChild(g)}):t.call(this,i)}})}();var re=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,n,r){if(r[e.groupIndex]=r[e.groupIndex]||[],J.call(r[e.groupIndex],e)==-1){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;a<o;a++){var i=e.normalizedDeps[a],s=n.defined[i];if(s&&!s.evaluated){var l=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<l){if(null!==s.groupIndex&&(r[s.groupIndex].splice(J.call(r[s.groupIndex],s),1),0==r[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=l}t(s,n,r)}}}}function r(e,n,r){if(!n.module){n.groupIndex=0;var a=[];t(n,r,a);for(var o=!!n.declarative==a.length%2,i=a.length-1;i>=0;i--){for(var s=a[i],l=0;l<s.length;l++){var d=s[l];o?u(d,r):c(d,r)}o=!o}}}function o(){}function l(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new o,importers:[]})}function u(t,n){if(!t.module){var r=n._loader.moduleRecords,a=t.module=l(t.name,r),o=t.module.exports,i=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var n in e)o[n]=e[n];else o[e]=t;for(var r=0,i=a.importers.length;r<i;r++){var s=a.importers[r];if(!s.locked){var l=J.call(s.dependencies,a),u=s.setters[l];u&&u(o)}}return a.locked=!1,t},{id:t.name});if("function"==typeof i&&(i={setters:[],execute:i}),i=i||{setters:[],execute:function(){}},a.setters=i.setters,a.execute=i.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var s=0,d=t.normalizedDeps.length;s<d;s++){var c,f=t.normalizedDeps[s],m=n.defined[f],p=r[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(u(m,n),p=m.module,c=p.exports):c=n.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[s],g=0,v=h.length;g<v;++g){var y=h[g];a.setters[y]&&a.setters[y](c)}}}}function d(e,t){var n,r=t.defined[e];if(r)r.declarative?f(e,r,[],t):r.evaluated||c(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n.default:n}function c(t,r){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,s=t.normalizedDeps.length;i<s;i++){var l=t.normalizedDeps[i],u=r.defined[l];u&&c(u,r)}t.evaluated=!0;var f=t.execute.call(e,function(e){for(var n=0,a=t.deps.length;n<a;n++)if(t.deps[n]==e)return d(t.normalizedDeps[n],r);var o=r.normalizeSync(e,t.name);if(J.call(t.normalizedDeps,o)!=-1)return d(o,r);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);void 0!==f&&(o.exports=f),a=o.exports,a&&(a.__esModule||a instanceof n)?t.esModule=r.newModule(a):t.esmExports&&a!==e?t.esModule=r.newModule(p(a)):t.esModule=r.newModule({default:a,__useDefault:!0})}}function f(t,n,r,a){if(n&&!n.evaluated&&n.declarative){r.push(t);for(var o=0,i=n.normalizedDeps.length;o<i;o++){var s=n.normalizedDeps[o];J.call(r,s)==-1&&(a.defined[s]?f(s,a.defined[s],r,a):a.get(s))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}a.prototype.register=function(e,t,n){if("string"!=typeof e&&(n=t,t=e,e=null),"boolean"==typeof n)return this.registerDynamic.apply(this,arguments);var r=R();r.name=e&&(this.decanonicalize||this.normalize).call(this,e),r.declarative=!0,r.deps=t,r.declare=n,this.pushRegister_({amd:!1,entry:r})},a.prototype.registerDynamic=function(e,t,n,r){"string"!=typeof e&&(r=n,n=t,t=e,e=null);var a=R();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=r,a.executingRequire=n,this.pushRegister_({amd:!1,entry:a})},i("reduceRegister_",function(){return function(e,t){if(t){var n=t.entry,r=e&&e.metadata;if(n.name&&(n.name in this.defined||(this.defined[n.name]=n),r&&(r.bundle=!0)),!n.name||e&&!r.entry&&n.name==e.name){if(!r)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(r.entry)throw"register"==r.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+r.format+" module format, but called System.register.");r.format||(r.format="register"),r.entry=n}}}}),s(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),A(o,"toString",{value:function(){return"Module"}}),i("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),i("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),i("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.apply(this,arguments)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&O(t.source))&&(t.metadata.format="register"),e})}}),i("load",function(e){return function(t){var n=this,a=n.defined[t];return!a||a.deps.length?e.apply(this,arguments):(a.originalIndices=a.normalizedDeps=[],r(t,a,n),f(t,a,[],n),a.esModule||(a.esModule=n.newModule(a.module.exports)),n.trace||(n.defined[t]=void 0),n.set(t,a.esModule),Promise.resolve())}}),i("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var n,a=this;if(a.defined[t.name])n=a.defined[t.name],n.declarative||(n.deps=n.deps.concat(t.metadata.deps)),n.deps=n.deps.concat(t.metadata.deps);else if(t.metadata.entry)n=t.metadata.entry,n.deps=n.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof __exec&&__exec.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");n=t.metadata.entry,n&&t.metadata.deps&&(n.deps=n.deps.concat(t.metadata.deps))}n||(n=R(),n.deps=t.metadata.deps,n.execute=function(){}),a.defined[t.name]=n;var o=m(n.deps);n.deps=o.names,n.originalIndices=o.indices,n.name=t.name,n.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,l=n.deps.length;s<l;s++)i.push(Promise.resolve(a.normalize(n.deps[s],t.name)));return Promise.all(i).then(function(e){return n.normalizedDeps=e,{deps:n.deps,execute:function(){return r(t.name,n,a),f(t.name,n,[],a),n.esModule||(n.esModule=a.newModule(n.module.exports)),a.trace||(a.defined[t.name]=void 0),n.esModule}}})}})}(),i("reduceRegister_",function(e){return function(t,n){if(n||!t.metadata.exports&&(!D||"global"!=t.metadata.format))return e.call(this,t,n);t.metadata.format="global";var r=t.metadata.entry=R();r.deps=t.metadata.deps;var a=M(t.metadata.exports);r.execute=function(){return a}}}),s(function(t){return function(){function n(t){if(Object.keys)Object.keys(e).forEach(t);else for(var n in e)i.call(e,n)&&t(n)}function r(t){n(function(n){if(J.call(s,n)==-1){try{var r=e[n]}catch(e){s.push(n)}t(n,r)}})}var a=this;t.call(a);var o,i=Object.prototype.hasOwnProperty,s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];a.set("@@global-helpers",a.newModule({prepareGlobal:function(t,n,a,i){var s=e.define;e.define=void 0;var l;if(a){l={};for(var u in a)l[u]=e[u],e[u]=a[u]}return n||(o={},r(function(e,t){o[e]=t})),function(){var t,a=n?M(n):{},u=!!n;if(n&&!i||r(function(r,s){o[r]!==s&&"undefined"!=typeof s&&(i&&(e[r]=void 0),n||(a[r]=s,"undefined"!=typeof t?u||t===s||(u=!0):t=s))}),a=u?a:t,l)for(var d in l)e[d]=l[d];return e.define=s,a}}}))}}),s(function(e){return function(){function t(e){return"file:///"==e.substr(0,8)?e.substr(7+!!U):r&&e.substr(0,r.length)==r?e.substr(r.length):e}var n=this;if(e.call(n),"undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var r=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");n.set("@@cjs-helpers",n.newModule({requireResolve:function(e,r){return t(n.normalizeSync(e,r))},getPathVars:function(e){var n,r=e.lastIndexOf("!");n=r!=-1?e.substr(0,r):e;var a=n.split("/");return a.pop(),a=a.join("/"),{filename:t(n),dirname:t(a)}}}))}}),i("fetch",function(t){return function(n){return n.metadata.scriptLoad&&q&&(e.define=this.amdDefine),t.call(this,n)}}),s(function(t){return function(){function n(e,t){e=e.replace(s,"");var n=e.match(d),r=(n[1].split(",")[t]||"require").replace(c,""),a=f[r]||(f[r]=new RegExp(l+r+u,"g"));a.lastIndex=0;for(var o,i=[];o=a.exec(e);)i.push(o[2]||o[3]);return i}function r(e,t,n,a){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof t&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var i=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),s=o.decanonicalize(e,a);i&&".js"==s.substr(s.length-3,3)&&(s=s.substr(0,s.length-3));var l=o.get(s);if(!l)throw new Error('Module not already loaded loading "'+e+'" as '+s+(a?' from "'+a+'".':"."));return l.__useDefault?l.default:l}throw new TypeError("Invalid require")}for(var u=[],d=0;d<e.length;d++)u.push(o.import(e[d],a));Promise.all(u).then(function(e){t&&t.apply(null,e)},n)}function a(t,a,i){function s(t,n,s){function c(e,n,a){return"string"==typeof e&&"function"!=typeof n?t(e):r.call(o,e,n,a,s.id)}for(var f=[],m=0;m<a.length;m++)f.push(t(a[m]));s.uri=s.id,s.config=function(){},d!=-1&&f.splice(d,0,s),u!=-1&&f.splice(u,0,n),l!=-1&&(c.toUrl=function(e){var t=o.defaultJSExtensions&&".js"!=e.substr(e.length-3,3),n=o.decanonicalize(e,s.id);return t&&".js"==n.substr(n.length-3,3)&&(n=n.substr(0,n.length-3)),n},f.splice(l,0,c));var p=e.require;e.require=r;var h=i.apply(u==-1?e:n,f);if(e.require=p,"undefined"==typeof h&&s&&(h=s.exports),"undefined"!=typeof h)return h}"string"!=typeof t&&(i=a,a=t,t=null),a instanceof Array||(i=a,a=["require","exports","module"].splice(0,i.length)),"function"!=typeof i&&(i=function(e){return function(){return e}}(i)),void 0===a[a.length-1]&&a.pop();var l,u,d;(l=J.call(a,"require"))!=-1&&(a.splice(l,1),t||(a=a.concat(n(i.toString(),l)))),(u=J.call(a,"exports"))!=-1&&a.splice(u,1),(d=J.call(a,"module"))!=-1&&a.splice(d,1);var c=R();c.name=t&&(o.decanonicalize||o.normalize).call(o,t),c.deps=a,c.execute=s,o.pushRegister_({amd:!0,entry:c})}var o=this;t.call(this);var s=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,l="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",u="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",d=/\(([^\)]*)\)/,c=/^\s+|\s+$/g,f={};a.amd={},i("reduceRegister_",function(e){return function(t,n){if(!n||!n.amd)return e.call(this,t,n);var r=t&&t.metadata,a=n.entry;if(r)if(r.format&&"detect"!=r.format){if(!a.name&&"amd"!=r.format)throw new Error("AMD define called while executing "+r.format+" module "+t.name)}else r.format="amd";if(a.name)r&&(r.entry||r.bundle?r.entry&&r.entry.name&&r.entry.name!=t.name&&(r.entry=void 0):r.entry=a,r.bundle=!0),a.name in this.defined||(this.defined[a.name]=a);else{if(!r)throw new TypeError("Unexpected anonymous AMD define.");if(r.entry&&!r.entry.name)throw new Error("Multiple anonymous defines in module "+t.name);r.entry=a}}}),o.amdDefine=a,o.amdRequire=r}}),function(){function e(e,t){if(t){var n;if(e.pluginFirst){if((n=t.lastIndexOf("!"))!=-1)return t.substr(n+1)}else if((n=t.indexOf("!"))!=-1)return t.substr(0,n);return t}}function t(e,t){var n,r,a=t.lastIndexOf("!");if(a!=-1)return e.pluginFirst?(n=t.substr(a+1),r=t.substr(0,a)):(n=t.substr(0,a),r=t.substr(a+1)||n.substr(n.lastIndexOf(".")+1)),{argument:n,plugin:r}}function n(e,t,n,r){return r&&".js"==t.substr(t.length-3,3)&&(t=t.substr(0,t.length-3)),e.pluginFirst?n+"!"+t:t+"!"+n}function r(e,t){return e.defaultJSExtensions&&".js"!=t.substr(t.length-3,3)}function a(a){return function(o,i,s){var l=this,u=t(l,o);if(i=e(this,i),!u)return a.call(this,o,i,s);var d=l.normalizeSync(u.argument,i,!0),c=l.normalizeSync(u.plugin,i,!0);return n(l,d,c,r(l,u.argument))}}i("decanonicalize",a),i("normalizeSync",a),i("normalize",function(a){return function(o,i,s){var l=this;i=e(this,i);var u=t(l,o);return u?Promise.all([l.normalize(u.argument,i,!0),l.normalize(u.plugin,i,!1)]).then(function(e){return n(l,e[0],e[1],r(l,u.argument))}):a.call(l,o,i,s)}}),i("locate",function(e){return function(t){var n,r=this,a=t.name;return r.pluginFirst?(n=a.indexOf("!"))!=-1&&(t.metadata.loader=a.substr(0,n),t.name=a.substr(n+1)):(n=a.lastIndexOf("!"))!=-1&&(t.metadata.loader=a.substr(n+1),t.name=a.substr(0,n)),e.call(r,t).then(function(e){return n==-1&&t.metadata.loader?(r.pluginLoader||r).normalize(t.metadata.loader,t.name).then(function(n){return t.metadata.loader=n,e}):e}).then(function(e){var n=t.metadata.loader;if(!n)return e;if(t.name==n)throw new Error("Plugin "+n+" cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.");if(r.defined&&r.defined[a])return e;var o=r.pluginLoader||r;return o.import(n).then(function(n){return t.metadata.loaderModule=n,t.address=e,n.locate?n.locate.call(r,t):e})})}}),i("fetch",function(e){return function(t){var n=this;return t.metadata.loaderModule&&t.metadata.loaderModule.fetch&&"defined"!=t.metadata.format?(t.metadata.scriptLoad=!1,t.metadata.loaderModule.fetch.call(n,t,function(t){return e.call(n,t)})):e.call(n,t)}}),i("translate",function(e){return function(t){var n=this,r=arguments;return t.metadata.loaderModule&&t.metadata.loaderModule.translate&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.translate.apply(n,r)).then(function(a){var o=t.metadata.sourceMap;if(o){if("object"!=typeof o)throw new Error("load.metadata.sourceMap must be set to an object.");var i=t.address.split("!")[0];o.file&&o.file!=t.address||(o.file=i+"!transpiled"),(!o.sources||o.sources.length<=1&&(!o.sources[0]||o.sources[0]==t.address))&&(o.sources=[i])}return"string"==typeof a&&(t.source=a),e.apply(n,r)}):e.apply(n,r)}}),i("instantiate",function(e){return function(t){var n=this,r=!1;return t.metadata.loaderModule&&t.metadata.loaderModule.instantiate&&!n.builder&&"defined"!=t.metadata.format?Promise.resolve(t.metadata.loaderModule.instantiate.call(n,t,function(t){if(r)throw new Error("Instantiate must only be called once.");return r=!0,e.call(n,t)})).then(function(a){return r?a:(void 0!==a&&(t.metadata.entry=R(),t.metadata.entry.execute=function(){return a},t.metadata.entry.deps=t.metadata.deps,t.metadata.format="defined"),e.call(n,t))}):e.call(n,t)}})}();var ae=["browser","node","dev","build","production","default"],oe=/#\{[^\}]+\}/;i("normalize",function(e){return function(t,n,r){var a=this;return T.call(a,t,n).then(function(t){return e.call(a,t,n,r)}).then(function(e){return L.call(a,e,n)})}}),function(){i("fetch",function(e){return function(t){var n=t.metadata.alias,r=t.metadata.deps||[];if(n){t.metadata.format="defined";var a=R();return this.defined[t.name]=a,a.declarative=!0,a.deps=r.concat([n]),a.declare=function(e){return{setters:[function(t){for(var n in t)e(n,t[n]);t.__useDefault&&(a.module.exports.__useDefault=!0)}],execute:function(){}}},""}return e.call(this,t)}})}(),function(){function e(e,t,n){for(var r,a=t.split(".");a.length>1;)r=a.shift(),e=e[r]=e[r]||{};r=a.shift(),r in e||(e[r]=n)}s(function(e){return function(){this.meta={},e.call(this)}}),i("locate",function(e){return function(t){var n,r=this.meta,a=t.name,o=0;for(var i in r)if(n=i.indexOf("*"),n!==-1&&i.substr(0,n)===a.substr(0,n)&&i.substr(n+1)===a.substr(a.length-i.length+n+1)){var s=i.split("/").length;s>o&&(o=s),v(t.metadata,r[i],o!=s)}return r[a]&&v(t.metadata,r[a]),e.call(this,t)}});var t=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/,n=/\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;i("translate",function(r){return function(a){if("defined"==a.metadata.format)return a.metadata.deps=a.metadata.deps||[],Promise.resolve(a.source);var o=a.source.match(t);if(o)for(var i=o[0].match(n),s=0;s<i.length;s++){var l=i[s],u=l.length,d=l.substr(0,1);if(";"==l.substr(u-1,1)&&u--,'"'==d||"'"==d){var c=l.substr(1,l.length-3),f=c.substr(0,c.indexOf(" "));if(f){var m=c.substr(f.length+1,c.length-f.length-1);"[]"==f.substr(f.length-2,2)?(f=f.substr(0,f.length-2),a.metadata[f]=a.metadata[f]||[],a.metadata[f].push(m)):a.metadata[f]instanceof Array?(w.call(this,"Module "+a.name+' contains deprecated "deps '+m+'" meta syntax.\nThis should be updated to "deps[] '+m+'" for pushing to array meta.'),a.metadata[f].push(m)):e(a.metadata,f,m)}else a.metadata[c]=!0}}return r.apply(this,arguments)}})}(),function(){s(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),i("locate",function(e){return function(t){var n=this,r=!1;if(!(t.name in n.defined))for(var a in n.bundles){for(var o=0;o<n.bundles[a].length;o++){var i=n.bundles[a][o];if(i==t.name){r=!0;break}if(i.indexOf("*")!=-1){var s=i.split("*");if(2!=s.length){n.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")==-1){r=!0;break}}}if(r)return n.import(a).then(function(){return e.call(n,t)})}return e.call(n,t)}})}(),function(){s(function(e){return function(){e.call(this),this.depCache={}}}),i("locate",function(e){return function(t){var n=this,r=n.depCache[t.name];if(r)for(var a=0;a<r.length;a++)n.import(r[a],t.name);return e.call(n,t)}})}(),s(function(t){return function(){t.apply(this,arguments),e.define=this.amdDefine}}),i("fetch",function(e){return function(t){return t.metadata.scriptLoad=!0,e.call(this,t)}}),X=new a,e.SystemJS=X,X.version="0.19.41 CSP","object"==typeof module&&module.exports&&"object"==typeof exports&&(module.exports=X),e.System=X}("undefined"!=typeof self?self:global)}var t="undefined"==typeof Promise;if("undefined"!=typeof document){var n=document.getElementsByTagName("script");if($__curScript=n[n.length-1],document.currentScript&&($__curScript.defer||$__curScript.async)&&($__curScript=document.currentScript),$__curScript.src||($__curScript=void 0),t){var r=$__curScript.src,a=r.substr(0,r.lastIndexOf("/")+1);window.systemJSBootstrap=e,document.write('<script type="text/javascript" src="'+a+'system-polyfills.js"></script>')}else e()}else if("undefined"!=typeof importScripts){var a="";try{throw new Error("_")}catch(e){e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/,function(e,t){$__curScript={src:t},a=t.replace(/\/[^\/]*$/,"/")})}t&&importScripts(a+"system-polyfills.js"),e()}else $__curScript= true?{src:__filename}:null,e()}();
	//# sourceMappingURL=system-csp-production.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process, __filename) {/*
	 * SystemJS v0.19.41
	 */
	(function() {
	function bootstrap() {// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert URLs to use / always
	  pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = ((err.message || err) + (err.stack ? '\n' + err.stack : '')).toString().split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = '(SystemJS) ' + (newStack ? newStack.join('\n\t') : err.message.substr(11)) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    newErr.stack = newMsg;
	        
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;

	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }

	  // sanitize out the hash and querystring
	  if (baseURI) {
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;

	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  var anonCnt = 0;

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name || '<Anonymous' + ++anonCnt + '>',
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      load.address = load.address || load.name;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined)
	          throw new TypeError('Declarative modules unsupported in the polyfill.');
	        
	        if (typeof instantiateResult != 'object')
	          throw new TypeError('Invalid instantiate return value');

	        load.depsList = instantiateResult.deps || [];
	        load.execute = instantiateResult.execute;
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name] || loader.modules[load.name].module === load.module.module, 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name])
	          return loader.modules[name].module;

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return load.module.module;
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return load.module.module;
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {},
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;

	/*
	 * ES6 Module Declarative Linking Code
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	})();

	var System;

	// SystemJS Loader Class and Extension helpers
	function SystemJSLoader() {
	  Loader.call(this);

	  this.paths = {};
	  this._loader.paths = {};

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = Loader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}


	var absURLRegEx = /^[^\/]+:\/\//;
	function isAbsolute(name) {
	  return name.match(absURLRegEx);
	}
	function isRel(name) {
	  return (name[0] == '.' && (!name[1] || name[1] == '/' || name[1] == '.')) || name[0] == '/';
	}
	function isPlain(name) {
	  return !isRel(name) && !isAbsolute(name);
	}

	var baseURIObj = new URL(baseURI);

	function urlResolve(name, parent) {
	  // url resolution shortpaths
	  if (name[0] == '.') {
	    // dot-relative url normalization
	    if (name[1] == '/' && name[2] != '.')
	      return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name.substr(2);
	  }
	  else if (name[0] != '/' && name.indexOf(':') == -1) {
	    // plain parent normalization
	    return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name;
	  }

	  return new URL(name, parent && parent.replace(/#/g, '%05') || baseURIObj).href.replace(/%05/g, '#');
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(loader, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  var paths = loader.paths;
	  var pathsCache = loader._loader.paths;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    if (paths.hasOwnProperty && !paths.hasOwnProperty(p))
	      continue;

	    // paths sanitization
	    var path = paths[p];
	    if (path !== pathsCache[p])
	      path = paths[p] = pathsCache[p] = urlResolve(paths[p], isRel(paths[p]) ? baseURI : loader.baseURL);

	    // exact path match
	    if (p.indexOf('*') === -1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && (paths[p][paths[p].length - 1] == '/' || paths[p] == '')) {
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? (paths[p] && '/' || '') + name.substr(p.length) : '');
	      }
	    }
	    // wildcard path match
	    else {
	      var pathParts = p.split('*');
	      if (pathParts.length > 2)
	        throw new TypeError('Only one wildcard in a path is permitted');

	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if ((typeof exports == 'object' || typeof exports == 'function') && exports !== __global) {
	      if (getOwnPropertyDescriptor) {
	        for (var p in exports) {
	          // The default property is copied to esModule later on
	          if (p === 'default')
	            continue;
	          defineOrCopyProperty(esModule, exports, p);
	        }
	      }
	      else {
	        extend(esModule, exports);
	      }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function defineOrCopyProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);
	  }
	  catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property
	    // we dont need hasOwnProperty here because getOwnPropertyDescriptor would have returned undefined above
	    targetObj[propName] = sourceObj[propName];
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function extendPkgConfig(pkgCfgA, pkgCfgB, pkgName, loader, warnInvalidProperties) {
	  for (var prop in pkgCfgB) {
	    if (indexOf.call(['main', 'format', 'defaultExtension', 'basePath'], prop) != -1) {
	      pkgCfgA[prop] = pkgCfgB[prop];
	    }
	    else if (prop == 'map') {
	      extend(pkgCfgA.map = pkgCfgA.map || {}, pkgCfgB.map);
	    }
	    else if (prop == 'meta') {
	      extend(pkgCfgA.meta = pkgCfgA.meta || {}, pkgCfgB.meta);
	    }
	    else if (prop == 'depCache') {
	      for (var d in pkgCfgB.depCache) {
	        var dNormalized;

	        if (d.substr(0, 2) == './')
	          dNormalized = pkgName + '/' + d.substr(2);
	        else
	          dNormalized = coreResolve.call(loader, d);
	        loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(pkgCfgB.depCache[d]);
	      }
	    }
	    else if (warnInvalidProperties && indexOf.call(['browserConfig', 'nodeConfig', 'devConfig', 'productionConfig'], prop) == -1 && 
	        (!pkgCfgB.hasOwnProperty || pkgCfgB.hasOwnProperty(prop))) {
	      warn.call(loader, '"' + prop + '" is not a valid package configuration option in package ' + pkgName);
	    }
	  }
	}

	// deeply-merge (to first level) config with any existing package config
	function setPkgConfig(loader, pkgName, cfg, prependConfig) {
	  var pkg;

	  // first package is config by reference for fast path, cloned after that
	  if (!loader.packages[pkgName]) {
	    pkg = loader.packages[pkgName] = cfg;
	  }
	  else {
	    var basePkg = loader.packages[pkgName];
	    pkg = loader.packages[pkgName] = {};

	    extendPkgConfig(pkg, prependConfig ? cfg : basePkg, pkgName, loader, prependConfig);
	    extendPkgConfig(pkg, prependConfig ? basePkg : cfg, pkgName, loader, !prependConfig);
	  }
	  
	  // main object becomes main map
	  if (typeof pkg.main == 'object') {
	    pkg.map = pkg.map || {};
	    pkg.map['./@main'] = pkg.main;
	    pkg.main['default'] = pkg.main['default'] || './';
	    pkg.main = '@main';
	  }

	  return pkg;
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	  var fetchTextFromURL;
	  if (typeof XMLHttpRequest != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var xhr = new XMLHttpRequest();
	      var sameDomain = true;
	      var doTimeout = false;
	      if (!('withCredentials' in xhr)) {
	        // check if same domain
	        var domainCheck = /^(\w+:)?\/\/([^\/]+)/.exec(url);
	        if (domainCheck) {
	          sameDomain = domainCheck[2] === window.location.host;
	          if (domainCheck[1])
	            sameDomain &= domainCheck[1] === window.location.protocol;
	        }
	      }
	      if (!sameDomain && typeof XDomainRequest != 'undefined') {
	        xhr = new XDomainRequest();
	        xhr.onload = load;
	        xhr.onerror = error;
	        xhr.ontimeout = error;
	        xhr.onprogress = function() {};
	        xhr.timeout = 0;
	        doTimeout = true;
	      }
	      function load() {
	        fulfill(xhr.responseText);
	      }
	      function error() {
	        reject(new Error('XHR error' + (xhr.status ? ' (' + xhr.status + (xhr.statusText ? ' ' + xhr.statusText  : '') + ')' : '') + ' loading ' + url));
	      }

	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	          // in Chrome on file:/// URLs, status is 0
	          if (xhr.status == 0) {
	            if (xhr.responseText) {
	              load();
	            }
	            else {
	              // when responseText is empty, wait for load or error event
	              // to inform if it is a 404 or empty file
	              xhr.addEventListener('error', error);
	              xhr.addEventListener('load', load);
	            }
	          }
	          else if (xhr.status === 200) {
	            load();
	          }
	          else {
	            error();
	          }
	        }
	      };
	      xhr.open("GET", url, true);

	      if (xhr.setRequestHeader) {
	        xhr.setRequestHeader('Accept', 'application/x-es-module, */*');
	        // can set "authorization: true" to enable withCredentials only
	        if (authorization) {
	          if (typeof authorization == 'string')
	            xhr.setRequestHeader('Authorization', authorization);
	          xhr.withCredentials = true;
	        }
	      }

	      if (doTimeout) {
	        setTimeout(function() {
	          xhr.send();
	        }, 0);
	      } else {
	        xhr.send(null);
	      }
	    };
	  }
	  else if ("function" != 'undefined' && typeof process != 'undefined') {
	    var fs;
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      if (url.substr(0, 8) != 'file:///')
	        throw new Error('Unable to fetch "' + url + '". Only file URLs of the form file:/// allowed running in Node.');
	      fs = fs || __webpack_require__(6);
	      if (isWindows)
	        url = url.replace(/\//g, '\\').substr(8);
	      else
	        url = url.substr(7);
	      return fs.readFile(url, function(err, data) {
	        if (err) {
	          return reject(err);
	        }
	        else {
	          // Strip Byte Order Mark out if it's the leading char
	          var dataString = data + '';
	          if (dataString[0] === '\ufeff')
	            dataString = dataString.substr(1);

	          fulfill(dataString);
	        }
	      });
	    };
	  }
	  else if (typeof self != 'undefined' && typeof self.fetch != 'undefined') {
	    fetchTextFromURL = function(url, authorization, fulfill, reject) {
	      var opts = {
	        headers: {'Accept': 'application/x-es-module, */*'}
	      };

	      if (authorization) {
	        if (typeof authorization == 'string')
	          opts.headers['Authorization'] = authorization;
	        opts.credentials = 'include';
	      }

	      fetch(url, opts)
	        .then(function (r) {
	          if (r.ok) {
	            return r.text();
	          } else {
	            throw new Error('Fetch error: ' + r.status + ' ' + r.statusText);
	          }
	        })
	        .then(fulfill, reject);
	    }
	  }
	  else {
	    throw new TypeError('No environment fetch API available.');
	  }
	function readMemberExpression(p, value) {
	  var pParts = p.split('.');
	  while (pParts.length)
	    value = value[pParts.shift()];
	  return value;
	}

	function getMapMatch(map, name) {
	  var bestMatch, bestMatchLength = 0;

	  for (var p in map) {
	    if (name.substr(0, p.length) == p && (name.length == p.length || name[p.length] == '/')) {
	      var curMatchLength = p.split('/').length;
	      if (curMatchLength <= bestMatchLength)
	        continue;
	      bestMatch = p;
	      bestMatchLength = curMatchLength;
	    }
	  }

	  return bestMatch;
	}

	function prepareBaseURL(loader) {
	  // ensure baseURl is fully normalized
	  if (this._loader.baseURL !== this.baseURL) {
	    if (this.baseURL[this.baseURL.length - 1] != '/')
	      this.baseURL += '/';

	    this._loader.baseURL = this.baseURL = new URL(this.baseURL, baseURIObj).href;
	  }
	}

	var envModule;
	function setProduction(isProduction, isBuilder) {
	  this.set('@system-env', envModule = this.newModule({
	    browser: isBrowser,
	    node: !!this._nodeRequire,
	    production: !isBuilder && isProduction,
	    dev: isBuilder || !isProduction,
	    build: isBuilder,
	    'default': true
	  }));
	}

	hookConstructor(function(constructor) {
	  return function() {
	    constructor.call(this);

	    // support baseURL
	    this.baseURL = baseURI;

	    // support map and paths
	    this.map = {};

	    // make the location of the system.js script accessible
	    if (typeof $__curScript != 'undefined')
	      this.scriptSrc = $__curScript.src;

	    // global behaviour flags
	    this.warnings = false;
	    this.defaultJSExtensions = false;
	    this.pluginFirst = false;
	    this.loaderErrorStack = false;

	    // by default load ".json" files as json
	    // leading * meta doesn't need normalization
	    // NB add this in next breaking release
	    // this.meta['*.json'] = { format: 'json' };

	    // support the empty module, as a concept
	    this.set('@empty', this.newModule({}));

	    setProduction.call(this, false, false);
	  };
	});

	// include the node require since we're overriding it
	if ("function" != 'undefined' && typeof process != 'undefined' && !process.browser)
	  SystemJSLoader.prototype._nodeRequire = __webpack_require__(7);

	/*
	  Core SystemJS Normalization

	  If a name is relative, we apply URL normalization to the page
	  If a name is an absolute URL, we leave it as-is

	  Plain names (neither of the above) run through the map and paths
	  normalization phases.

	  The paths normalization phase applies last (paths extension), which
	  defines the `decanonicalize` function and normalizes everything into
	  a URL.
	 */

	var parentModuleContext;
	function getNodeModule(name, baseURL) {
	  if (!isPlain(name))
	    throw new Error('Node module ' + name + ' can\'t be loaded as it is not a package require.');

	  if (!parentModuleContext) {
	    var Module = this._nodeRequire('module');
	    var base = baseURL.substr(isWindows ? 8 : 7);
	    parentModuleContext = new Module(base);
	    parentModuleContext.paths = Module._nodeModulePaths(base);
	  }
	  return parentModuleContext.require(name);
	}

	function coreResolve(name, parentName) {
	  // standard URL resolution
	  if (isRel(name))
	    return urlResolve(name, parentName);
	  else if (isAbsolute(name))
	    return name;

	  // plain names not starting with './', '://' and '/' go through custom resolution
	  var mapMatch = getMapMatch(this.map, name);

	  if (mapMatch) {
	    name = this.map[mapMatch] + name.substr(mapMatch.length);

	    if (isRel(name))
	      return urlResolve(name);
	    else if (isAbsolute(name))
	      return name;
	  }

	  if (this.has(name))
	    return name;

	  // dynamically load node-core modules when requiring `@node/fs` for example
	  if (name.substr(0, 6) == '@node/') {
	    if (!this._nodeRequire)
	      throw new TypeError('Error loading ' + name + '. Can only load node core modules in Node.');
	    if (this.builder)
	      this.set(name, this.newModule({}));
	    else
	      this.set(name, this.newModule(getESModule(getNodeModule.call(this, name.substr(6), this.baseURL))));
	    return name;
	  }

	  // prepare the baseURL to ensure it is normalized
	  prepareBaseURL.call(this);

	  return applyPaths(this, name) || this.baseURL + name;
	}

	hook('normalize', function(normalize) {
	  return function(name, parentName, skipExt) {
	    var resolved = coreResolve.call(this, name, parentName);
	    if (this.defaultJSExtensions && !skipExt && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	      resolved += '.js';
	    return resolved;
	  };
	});

	// percent encode just '#' in urls if using HTTP requests
	var httpRequest = typeof XMLHttpRequest != 'undefined';
	hook('locate', function(locate) {
	  return function(load) {
	    return Promise.resolve(locate.call(this, load))
	    .then(function(address) {
	      if (httpRequest)
	        return address.replace(/#/g, '%23');
	      return address;
	    });
	  };
	});

	/*
	 * Fetch with authorization
	 */
	hook('fetch', function() {
	  return function(load) {
	    return new Promise(function(resolve, reject) {
	      fetchTextFromURL(load.address, load.metadata.authorization, resolve, reject);
	    });
	  };
	});

	/*
	  __useDefault

	  When a module object looks like:
	  newModule(
	    __useDefault: true,
	    default: 'some-module'
	  })

	  Then importing that module provides the 'some-module'
	  result directly instead of the full module.

	  Useful for eg module.exports = function() {}
	*/
	hook('import', function(systemImport) {
	  return function(name, parentName, parentAddress) {
	    if (parentName && parentName.name)
	      warn.call(this, 'SystemJS.import(name, { name: parentName }) is deprecated for SystemJS.import(name, parentName), while importing ' + name + ' from ' + parentName.name);
	    return systemImport.call(this, name, parentName, parentAddress).then(function(module) {
	      return module.__useDefault ? module['default'] : module;
	    });
	  };
	});

	/*
	 * Allow format: 'detect' meta to enable format detection
	 */
	hook('translate', function(systemTranslate) {
	  return function(load) {
	    if (load.metadata.format == 'detect')
	      load.metadata.format = undefined;
	    return systemTranslate.apply(this, arguments);
	  };
	});


	/*
	 * JSON format support
	 *
	 * Supports loading JSON files as a module format itself
	 *
	 * Usage:
	 *
	 * SystemJS.config({
	 *   meta: {
	 *     '*.json': { format: 'json' }
	 *   }
	 * });
	 *
	 * Module is returned as if written:
	 *
	 * export default {JSON}
	 *
	 * No named exports are provided
	 *
	 * Files ending in ".json" are treated as json automatically by SystemJS
	 */
	hook('instantiate', function(instantiate) {
	  return function(load) {
	    if (load.metadata.format == 'json' && !this.builder) {
	      var entry = load.metadata.entry = createEntry();
	      entry.deps = [];
	      entry.execute = function() {
	        try {
	          return JSON.parse(load.source);
	        }
	        catch(e) {
	          throw new Error("Invalid JSON file " + load.name);
	        }
	      };
	    }
	  };
	})

	/*
	 Extend config merging one deep only

	  loader.config({
	    some: 'random',
	    config: 'here',
	    deep: {
	      config: { too: 'too' }
	    }
	  });

	  <=>

	  loader.some = 'random';
	  loader.config = 'here'
	  loader.deep = loader.deep || {};
	  loader.deep.config = { too: 'too' };


	  Normalizes meta and package configs allowing for:

	  SystemJS.config({
	    meta: {
	      './index.js': {}
	    }
	  });

	  To become

	  SystemJS.meta['https://thissite.com/index.js'] = {};

	  For easy normalization canonicalization with latest URL support.

	*/
	function envSet(loader, cfg, envCallback) {
	  if (envModule.browser && cfg.browserConfig)
	    envCallback(cfg.browserConfig);
	  if (envModule.node && cfg.nodeConfig)
	    envCallback(cfg.nodeConfig);
	  if (envModule.dev && cfg.devConfig)
	    envCallback(cfg.devConfig);
	  if (envModule.build && cfg.buildConfig)
	    envCallback(cfg.buildConfig);
	  if (envModule.production && cfg.productionConfig)
	    envCallback(cfg.productionConfig);
	}

	SystemJSLoader.prototype.getConfig = function(name) {
	  var cfg = {};
	  var loader = this;
	  for (var p in loader) {
	    if (loader.hasOwnProperty && !loader.hasOwnProperty(p) || p in SystemJSLoader.prototype && p != 'transpiler')
	      continue;
	    if (indexOf.call(['_loader', 'amdDefine', 'amdRequire', 'defined', 'failed', 'version', 'loads'], p) == -1)
	      cfg[p] = loader[p];
	  }
	  cfg.production = envModule.production;
	  return cfg;
	};

	var curCurScript;
	SystemJSLoader.prototype.config = function(cfg, isEnvConfig) {
	  var loader = this;

	  if ('loaderErrorStack' in cfg) {
	    curCurScript = $__curScript;
	    if (cfg.loaderErrorStack)
	      $__curScript = undefined;
	    else
	      $__curScript = curCurScript;
	  }

	  if ('warnings' in cfg)
	    loader.warnings = cfg.warnings;

	  // transpiler deprecation path
	  if (cfg.transpilerRuntime === false)
	    loader._loader.loadedTranspilerRuntime = true;

	  if ('production' in cfg || 'build' in cfg)
	    setProduction.call(loader, !!cfg.production, !!(cfg.build || envModule && envModule.build));

	  if (!isEnvConfig) {
	    // if using nodeConfig / browserConfig / productionConfig, take baseURL from there
	    // these exceptions will be unnecessary when we can properly implement config queuings
	    var baseURL;
	    envSet(loader, cfg, function(cfg) {
	      baseURL = baseURL || cfg.baseURL;
	    });
	    baseURL = baseURL || cfg.baseURL;

	    // always configure baseURL first
	    if (baseURL) {
	      var hasConfig = false;
	      function checkHasConfig(obj) {
	        for (var p in obj)
	          if (obj.hasOwnProperty(p))
	            return true;
	      }
	      if (checkHasConfig(loader.packages) || checkHasConfig(loader.meta) || checkHasConfig(loader.depCache) || checkHasConfig(loader.bundles) || checkHasConfig(loader.packageConfigPaths))
	        throw new TypeError('Incorrect configuration order. The baseURL must be configured with the first SystemJS.config call.');

	      this.baseURL = baseURL;
	      prepareBaseURL.call(this);
	    }

	    if (cfg.paths)
	      extend(loader.paths, cfg.paths);

	    envSet(loader, cfg, function(cfg) {
	      if (cfg.paths)
	        extend(loader.paths, cfg.paths);
	    });

	    // warn on wildcard path deprecations
	    if (this.warnings) {
	      for (var p in loader.paths)
	        if (p.indexOf('*') != -1)
	          warn.call(loader, 'Paths configuration "' + p + '" -> "' + loader.paths[p] + '" uses wildcards which are being deprecated for just leaving a trailing "/" to indicate folder paths.');
	    }
	  }

	  if (cfg.defaultJSExtensions) {
	    loader.defaultJSExtensions = cfg.defaultJSExtensions;
	    warn.call(loader, 'The defaultJSExtensions configuration option is deprecated, use packages configuration instead.');
	  }

	  if (cfg.pluginFirst)
	    loader.pluginFirst = cfg.pluginFirst;

	  if (cfg.map) {
	    for (var p in cfg.map) {
	      var v = cfg.map[p];

	      // object map backwards-compat into packages configuration
	      if (typeof v !== 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	        var prop = loader.decanonicalize(p);
	        if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	          prop = prop.substr(0, prop.length - 3);

	        // if a package main, revert it
	        var pkgMatch = '';
	        for (var pkg in loader.packages) {
	          if (prop.substr(0, pkg.length) == pkg
	              && (!prop[pkg.length] || prop[pkg.length] == '/')
	              && pkgMatch.split('/').length < pkg.split('/').length)
	            pkgMatch = pkg;
	        }
	        if (pkgMatch && loader.packages[pkgMatch].main)
	          prop = prop.substr(0, prop.length - loader.packages[pkgMatch].main.length - 1);

	        var pkg = loader.packages[prop] = loader.packages[prop] || {};
	        pkg.map = v;
	      }
	      else {
	        loader.map[p] = v;
	      }
	    }
	  }

	  if (cfg.packageConfigPaths) {
	    var packageConfigPaths = [];
	    for (var i = 0; i < cfg.packageConfigPaths.length; i++) {
	      var path = cfg.packageConfigPaths[i];
	      var packageLength = Math.max(path.lastIndexOf('*') + 1, path.lastIndexOf('/'));
	      var normalized = coreResolve.call(loader, path.substr(0, packageLength));
	      packageConfigPaths[i] = normalized + path.substr(packageLength);
	    }
	    loader.packageConfigPaths = packageConfigPaths;
	  }

	  if (cfg.bundles) {
	    for (var p in cfg.bundles) {
	      var bundle = [];
	      for (var i = 0; i < cfg.bundles[p].length; i++) {
	        var defaultJSExtension = loader.defaultJSExtensions && cfg.bundles[p][i].substr(cfg.bundles[p][i].length - 3, 3) != '.js';
	        var normalizedBundleDep = loader.decanonicalize(cfg.bundles[p][i]);
	        if (defaultJSExtension && normalizedBundleDep.substr(normalizedBundleDep.length - 3, 3) == '.js')
	          normalizedBundleDep = normalizedBundleDep.substr(0, normalizedBundleDep.length - 3);
	        bundle.push(normalizedBundleDep);
	      }
	      loader.bundles[p] = bundle;
	    }
	  }

	  if (cfg.packages) {
	    for (var p in cfg.packages) {
	      if (p.match(/^([^\/]+:)?\/\/$/))
	        throw new TypeError('"' + p + '" is not a valid package name.');

	      var prop = coreResolve.call(loader, p);

	      // allow trailing slash in packages
	      if (prop[prop.length - 1] == '/')
	        prop = prop.substr(0, prop.length - 1);

	      setPkgConfig(loader, prop, cfg.packages[p], false);
	    }
	  }

	  for (var c in cfg) {
	    var v = cfg[c];

	    if (indexOf.call(['baseURL', 'map', 'packages', 'bundles', 'paths', 'warnings', 'packageConfigPaths',
	          'loaderErrorStack', 'browserConfig', 'nodeConfig', 'devConfig', 'buildConfig', 'productionConfig'], c) != -1)
	      continue;

	    if (typeof v != 'object' || v instanceof Array) {
	      loader[c] = v;
	    }
	    else {
	      loader[c] = loader[c] || {};

	      for (var p in v) {
	        // base-level wildcard meta does not normalize to retain catch-all quality
	        if (c == 'meta' && p[0] == '*') {
	          extend(loader[c][p] = loader[c][p] || {}, v[p]);
	        }
	        else if (c == 'meta') {
	          // meta can go through global map, with defaultJSExtensions adding
	          var resolved = coreResolve.call(loader, p);
	          if (loader.defaultJSExtensions && resolved.substr(resolved.length - 3, 3) != '.js' && !isPlain(resolved))
	            resolved += '.js';
	          extend(loader[c][resolved] = loader[c][resolved] || {}, v[p]);
	        }
	        else if (c == 'depCache') {
	          var defaultJSExtension = loader.defaultJSExtensions && p.substr(p.length - 3, 3) != '.js';
	          var prop = loader.decanonicalize(p);
	          if (defaultJSExtension && prop.substr(prop.length - 3, 3) == '.js')
	            prop = prop.substr(0, prop.length - 3);
	          loader[c][prop] = [].concat(v[p]);
	        }
	        else {
	          loader[c][p] = v[p];
	        }
	      }
	    }
	  }

	  envSet(loader, cfg, function(cfg) {
	    loader.config(cfg, true);
	  });
	};
	/*
	 * Package Configuration Extension
	 *
	 * Example:
	 *
	 * SystemJS.packages = {
	 *   jquery: {
	 *     main: 'index.js', // when not set, package name is requested directly
	 *     format: 'amd',
	 *     defaultExtension: 'ts', // defaults to 'js', can be set to false
	 *     modules: {
	 *       '*.ts': {
	 *         loader: 'typescript'
	 *       },
	 *       'vendor/sizzle.js': {
	 *         format: 'global'
	 *       }
	 *     },
	 *     map: {
	 *        // map internal require('sizzle') to local require('./vendor/sizzle')
	 *        sizzle: './vendor/sizzle.js',
	 *        // map any internal or external require of 'jquery/vendor/another' to 'another/index.js'
	 *        './vendor/another.js': './another/index.js',
	 *        // test.js / test -> lib/test.js
	 *        './test.js': './lib/test.js',
	 *
	 *        // environment-specific map configurations
	 *        './index.js': {
	 *          '~browser': './index-node.js',
	 *          './custom-condition.js|~export': './index-custom.js'
	 *        }
	 *     },
	 *     // allows for setting package-prefixed depCache
	 *     // keys are normalized module names relative to the package itself
	 *     depCache: {
	 *       // import 'package/index.js' loads in parallel package/lib/test.js,package/vendor/sizzle.js
	 *       './index.js': ['./test'],
	 *       './test.js': ['external-dep'],
	 *       'external-dep/path.js': ['./another.js']
	 *     }
	 *   }
	 * };
	 *
	 * Then:
	 *   import 'jquery'                       -> jquery/index.js
	 *   import 'jquery/submodule'             -> jquery/submodule.js
	 *   import 'jquery/submodule.ts'          -> jquery/submodule.ts loaded as typescript
	 *   import 'jquery/vendor/another'        -> another/index.js
	 *
	 * Detailed Behaviours
	 * - main can have a leading "./" can be added optionally
	 * - map and defaultExtension are applied to the main
	 * - defaultExtension adds the extension only if the exact extension is not present
	 * - defaultJSExtensions applies after map when defaultExtension is not set
	 * - if a meta value is available for a module, map and defaultExtension are skipped
	 * - like global map, package map also applies to subpaths (sizzle/x, ./vendor/another/sub)
	 * - condition module map is '@env' module in package or '@system-env' globally
	 * - map targets support conditional interpolation ('./x': './x.#{|env}.js')
	 * - internal package map targets cannot use boolean conditionals
	 *
	 * Package Configuration Loading
	 *
	 * Not all packages may already have their configuration present in the System config
	 * For these cases, a list of packageConfigPaths can be provided, which when matched against
	 * a request, will first request a ".json" file by the package name to derive the package
	 * configuration from. This allows dynamic loading of non-predetermined code, a key use
	 * case in SystemJS.
	 *
	 * Example:
	 *
	 *   SystemJS.packageConfigPaths = ['packages/test/package.json', 'packages/*.json'];
	 *
	 *   // will first request 'packages/new-package/package.json' for the package config
	 *   // before completing the package request to 'packages/new-package/path'
	 *   SystemJS.import('packages/new-package/path');
	 *
	 *   // will first request 'packages/test/package.json' before the main
	 *   SystemJS.import('packages/test');
	 *
	 * When a package matches packageConfigPaths, it will always send a config request for
	 * the package configuration.
	 * The package name itself is taken to be the match up to and including the last wildcard
	 * or trailing slash.
	 * The most specific package config path will be used.
	 * Any existing package configurations for the package will deeply merge with the
	 * package config, with the existing package configurations taking preference.
	 * To opt-out of the package configuration request for a package that matches
	 * packageConfigPaths, use the { configured: true } package config option.
	 *
	 */
	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.packages = {};
	      this.packageConfigPaths = [];
	    };
	  });

	  function getPackage(loader, normalized) {
	    // use most specific package
	    var curPkg, curPkgLen = 0, pkgLen;
	    for (var p in loader.packages) {
	      if (normalized.substr(0, p.length) === p && (normalized.length === p.length || normalized[p.length] === '/')) {
	        pkgLen = p.split('/').length;
	        if (pkgLen > curPkgLen) {
	          curPkg = p;
	          curPkgLen = pkgLen;
	        }
	      }
	    }
	    return curPkg;
	  }

	  function addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions) {
	    // don't apply extensions to folders or if defaultExtension = false
	    if (!subPath || subPath[subPath.length - 1] == '/' || skipExtensions || pkg.defaultExtension === false)
	      return subPath;

	    var metaMatch = false;

	    // exact meta or meta with any content after the last wildcard skips extension
	    if (pkg.meta)
	      getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    // exact global meta or meta with any content after the last wildcard skips extension
	    if (!metaMatch && loader.meta)
	      getMetaMatches(loader.meta, pkgName + '/' + subPath, function(metaPattern, matchMeta, matchDepth) {
	        if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1)
	          return metaMatch = true;
	      });

	    if (metaMatch)
	      return subPath;

	    // work out what the defaultExtension is and add if not there already
	    // NB reconsider if default should really be ".js"?
	    var defaultExtension = '.' + (pkg.defaultExtension || 'js');
	    if (subPath.substr(subPath.length - defaultExtension.length) != defaultExtension)
	      return subPath + defaultExtension;
	    else
	      return subPath;
	  }

	  function applyPackageConfigSync(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return pkgName + (loader.defaultJSExtensions ? '.js' : '');
	    }

	    // map config checking without then with extensions
	    if (pkg.map) {
	      var mapPath = './' + subPath;

	      var mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	      if (mapMatch) {
	        var mapped = doMapSync(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions);
	        if (mapped)
	          return mapped;
	      }
	    }

	    // normal package resolution
	    return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	  }

	  function validMapping(mapMatch, mapped, pkgName, path) {
	    // disallow internal to subpath maps
	    if (mapMatch == '.')
	      throw new Error('Package ' + pkgName + ' has a map entry for "." which is not permitted.');
	    
	    // allow internal ./x -> ./x/y or ./x/ -> ./x/y recursive maps
	    // but only if the path is exactly ./x and not ./x/z
	    if (mapped.substr(0, mapMatch.length) == mapMatch && path.length > mapMatch.length)
	      return false;

	    return true;
	  }

	  function doMapSync(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    if (path[path.length - 1] == '/')
	      path = path.substr(0, path.length - 1);
	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'object')
	      throw new Error('Synchronous conditional normalization not supported sync normalizing ' + mapMatch + ' in ' + pkgName);

	    if (!validMapping(mapMatch, mapped, pkgName, path) || typeof mapped != 'string')
	      return;

	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;

	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions);
	    
	    // external map reference
	    return loader.normalizeSync(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function applyPackageConfig(loader, pkg, pkgName, subPath, skipExtensions) {
	    // main
	    if (!subPath) {
	      if (pkg.main)
	        subPath = pkg.main.substr(0, 2) == './' ? pkg.main.substr(2) : pkg.main;
	      // also no submap if name is package itself (import 'pkg' -> 'path/to/pkg.js')
	      else
	        // NB can add a default package main convention here when defaultJSExtensions is deprecated
	        // if it becomes internal to the package then it would no longer be an exit path
	        return Promise.resolve(pkgName + (loader.defaultJSExtensions ? '.js' : ''));
	    }

	    // map config checking without then with extensions
	    var mapPath, mapMatch;

	    if (pkg.map) {
	      mapPath = './' + subPath;
	      mapMatch = getMapMatch(pkg.map, mapPath);

	      // we then check map with the default extension adding
	      if (!mapMatch) {
	        mapPath = './' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions);
	        if (mapPath != './' + subPath)
	          mapMatch = getMapMatch(pkg.map, mapPath);
	      }
	    }

	    return (mapMatch ? doMap(loader, pkg, pkgName, mapMatch, mapPath, skipExtensions) : Promise.resolve())
	    .then(function(mapped) {
	      if (mapped)
	        return Promise.resolve(mapped);

	      // normal package resolution / fallback resolution for no conditional match
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, subPath, skipExtensions));
	    });
	  }

	  function doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions) {
	    // NB the interpolation cases should strictly skip subsequent interpolation
	    // package map to main / base-level
	    if (mapped == '.')
	      mapped = pkgName;
	    
	    // internal package map
	    else if (mapped.substr(0, 2) == './')
	      return Promise.resolve(pkgName + '/' + addDefaultExtension(loader, pkg, pkgName, mapped.substr(2) + path.substr(mapMatch.length), skipExtensions))
	      .then(function(name) {
	        return interpolateConditional.call(loader, name, pkgName + '/');
	      });
	    
	    // external map reference
	    return loader.normalize(mapped + path.substr(mapMatch.length), pkgName + '/');
	  }

	  function doMap(loader, pkg, pkgName, mapMatch, path, skipExtensions) {
	    if (path[path.length - 1] == '/')
	      path = path.substr(0, path.length - 1);

	    var mapped = pkg.map[mapMatch];

	    if (typeof mapped == 'string') {
	      if (!validMapping(mapMatch, mapped, pkgName, path))
	        return Promise.resolve();
	      return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	    }

	    // we use a special conditional syntax to allow the builder to handle conditional branch points further
	    if (loader.builder)
	      return Promise.resolve(pkgName + '/#:' + path);

	    // we load all conditions upfront
	    var conditionPromises = [];
	    var conditions = [];
	    for (var e in mapped) {
	      var c = parseCondition(e);
	      conditions.push({
	        condition: c,
	        map: mapped[e]
	      });
	      conditionPromises.push(loader['import'](c.module, pkgName));
	    }

	    // map object -> conditional map
	    return Promise.all(conditionPromises)
	    .then(function(conditionValues) {
	      // first map condition to match is used
	      for (var i = 0; i < conditions.length; i++) {
	        var c = conditions[i].condition;
	        var value = readMemberExpression(c.prop, conditionValues[i]);
	        if (!c.negate && value || c.negate && !value)
	          return conditions[i].map;
	      }
	    })
	    .then(function(mapped) {
	      if (mapped) {
	        if (!validMapping(mapMatch, mapped, pkgName, path))
	          return;
	        return doStringMap(loader, pkg, pkgName, mapMatch, mapped, path, skipExtensions);
	      }

	      // no environment match -> fallback to original subPath by returning undefined
	    });
	  }

	  // normalizeSync = decanonicalize + package resolution
	  SystemJSLoader.prototype.normalizeSync = SystemJSLoader.prototype.decanonicalize = SystemJSLoader.prototype.normalize;

	  // decanonicalize must JUST handle package defaultExtension: false case when defaultJSExtensions is set
	  // to be deprecated!
	  hook('decanonicalize', function(decanonicalize) {
	    return function(name, parentName) {
	      if (this.builder)
	        return decanonicalize.call(this, name, parentName, true);

	      var decanonicalized = decanonicalize.call(this, name, parentName, false);

	      if (!this.defaultJSExtensions)
	        return decanonicalized;
	    
	      var pkgName = getPackage(this, decanonicalized);

	      var pkg = this.packages[pkgName];
	      var defaultExtension = pkg && pkg.defaultExtension;

	      if (defaultExtension == undefined && pkg && pkg.meta)
	        getMetaMatches(pkg.meta, decanonicalized.substr(pkgName), function(metaPattern, matchMeta, matchDepth) {
	          if (matchDepth == 0 || metaPattern.lastIndexOf('*') != metaPattern.length - 1) {
	            defaultExtension = false;
	            return true;
	          }
	        });
	      
	      if ((defaultExtension === false || defaultExtension && defaultExtension != '.js') && name.substr(name.length - 3, 3) != '.js' && decanonicalized.substr(decanonicalized.length - 3, 3) == '.js')
	        decanonicalized = decanonicalized.substr(0, decanonicalized.length - 3);

	      return decanonicalized;
	    };
	  });

	  hook('normalizeSync', function(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      // apply contextual package map first
	      // (we assume the parent package config has already been loaded)
	      if (parentName)
	        var parentPackageName = getPackage(loader, parentName) ||
	            loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	            getPackage(loader, parentName.substr(0, parentName.length - 3));

	      var parentPackage = parentPackageName && loader.packages[parentPackageName];

	      // ignore . since internal maps handled by standard package resolution
	      if (parentPackage && name[0] != '.') {
	        var parentMap = parentPackage.map;
	        var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	        if (parentMapMatch && typeof parentMap[parentMapMatch] == 'string') {
	          var mapped = doMapSync(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);      
	          if (mapped)
	            return mapped;
	        }
	      }

	      var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	      // apply map, core, paths, contextual package map
	      var normalized = normalizeSync.call(loader, name, parentName, false);

	      // undo defaultJSExtension
	      if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	        defaultJSExtension = false;
	      if (defaultJSExtension)
	        normalized = normalized.substr(0, normalized.length - 3);

	      var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	      var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	      if (!pkgName)
	        return normalized + (defaultJSExtension ? '.js' : '');

	      var subPath = normalized.substr(pkgName.length + 1);

	      return applyPackageConfigSync(loader, loader.packages[pkgName] || {}, pkgName, subPath, isPlugin);
	    };
	  });

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;
	      isPlugin = isPlugin === true;

	      return Promise.resolve()
	      .then(function() {
	        // apply contextual package map first
	        // (we assume the parent package config has already been loaded)
	        if (parentName)
	          var parentPackageName = getPackage(loader, parentName) ||
	              loader.defaultJSExtensions && parentName.substr(parentName.length - 3, 3) == '.js' &&
	              getPackage(loader, parentName.substr(0, parentName.length - 3));

	        var parentPackage = parentPackageName && loader.packages[parentPackageName];

	        // ignore . since internal maps handled by standard package resolution
	        if (parentPackage && name.substr(0, 2) != './') {
	          var parentMap = parentPackage.map;
	          var parentMapMatch = parentMap && getMapMatch(parentMap, name);

	          if (parentMapMatch)
	            return doMap(loader, parentPackage, parentPackageName, parentMapMatch, name, isPlugin);
	        }

	        return Promise.resolve();
	      })
	      .then(function(mapped) {
	        if (mapped)
	          return mapped;

	        var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';

	        // apply map, core, paths, contextual package map
	        var normalized = normalize.call(loader, name, parentName, false);

	        // undo defaultJSExtension
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) != '.js')
	          defaultJSExtension = false;
	        if (defaultJSExtension)
	          normalized = normalized.substr(0, normalized.length - 3);

	        var pkgConfigMatch = getPackageConfigMatch(loader, normalized);
	        var pkgName = pkgConfigMatch && pkgConfigMatch.packageName || getPackage(loader, normalized);

	        if (!pkgName)
	          return Promise.resolve(normalized + (defaultJSExtension ? '.js' : ''));

	        var pkg = loader.packages[pkgName];

	        // if package is already configured or not a dynamic config package, use existing package config
	        var isConfigured = pkg && (pkg.configured || !pkgConfigMatch);
	        return (isConfigured ? Promise.resolve(pkg) : loadPackageConfigPath(loader, pkgName, pkgConfigMatch.configPath))
	        .then(function(pkg) {
	          var subPath = normalized.substr(pkgName.length + 1);

	          return applyPackageConfig(loader, pkg, pkgName, subPath, isPlugin);
	        });
	      });
	    };
	  });

	  // check if the given normalized name matches a packageConfigPath
	  // if so, loads the config
	  var packageConfigPaths = {};

	  // data object for quick checks against package paths
	  function createPkgConfigPathObj(path) {
	    var lastWildcard = path.lastIndexOf('*');
	    var length = Math.max(lastWildcard + 1, path.lastIndexOf('/'));
	    return {
	      length: length,
	      regEx: new RegExp('^(' + path.substr(0, length).replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^\\/]+') + ')(\\/|$)'),
	      wildcard: lastWildcard != -1
	    };
	  }

	  // most specific match wins
	  function getPackageConfigMatch(loader, normalized) {
	    var pkgName, exactMatch = false, configPath;
	    for (var i = 0; i < loader.packageConfigPaths.length; i++) {
	      var packageConfigPath = loader.packageConfigPaths[i];
	      var p = packageConfigPaths[packageConfigPath] || (packageConfigPaths[packageConfigPath] = createPkgConfigPathObj(packageConfigPath));
	      if (normalized.length < p.length)
	        continue;
	      var match = normalized.match(p.regEx);
	      if (match && (!pkgName || (!(exactMatch && p.wildcard) && pkgName.length < match[1].length))) {
	        pkgName = match[1];
	        exactMatch = !p.wildcard;
	        configPath = pkgName + packageConfigPath.substr(p.length);
	      }
	    }

	    if (!pkgName)
	      return;

	    return {
	      packageName: pkgName,
	      configPath: configPath
	    };
	  }

	  function loadPackageConfigPath(loader, pkgName, pkgConfigPath) {
	    var configLoader = loader.pluginLoader || loader;

	    // NB remove this when json is default
	    (configLoader.meta[pkgConfigPath] = configLoader.meta[pkgConfigPath] || {}).format = 'json';
	    configLoader.meta[pkgConfigPath].loader = null;

	    return configLoader.load(pkgConfigPath)
	    .then(function() {
	      var cfg = configLoader.get(pkgConfigPath)['default'];

	      // support "systemjs" prefixing
	      if (cfg.systemjs)
	        cfg = cfg.systemjs;

	      // modules backwards compatibility
	      if (cfg.modules) {
	        cfg.meta = cfg.modules;
	        warn.call(loader, 'Package config file ' + pkgConfigPath + ' is configured with "modules", which is deprecated as it has been renamed to "meta".');
	      }

	      return setPkgConfig(loader, pkgName, cfg, true);
	    });
	  }

	  function getMetaMatches(pkgMeta, subPath, matchFn) {
	    // wildcard meta
	    var meta = {};
	    var wildcardIndex;
	    for (var module in pkgMeta) {
	      // allow meta to start with ./ for flexibility
	      var dotRel = module.substr(0, 2) == './' ? './' : '';
	      if (dotRel)
	        module = module.substr(2);

	      wildcardIndex = module.indexOf('*');
	      if (wildcardIndex === -1)
	        continue;

	      if (module.substr(0, wildcardIndex) == subPath.substr(0, wildcardIndex)
	          && module.substr(wildcardIndex + 1) == subPath.substr(subPath.length - module.length + wildcardIndex + 1)) {
	        // alow match function to return true for an exit path
	        if (matchFn(module, pkgMeta[dotRel + module], module.split('/').length))
	          return;
	      }
	    }
	    // exact meta
	    var exactMeta = pkgMeta[subPath] && pkgMeta.hasOwnProperty && pkgMeta.hasOwnProperty(subPath) ? pkgMeta[subPath] : pkgMeta['./' + subPath];
	    if (exactMeta)
	      matchFn(exactMeta, exactMeta, 0);
	  }

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      return Promise.resolve(locate.call(this, load))
	      .then(function(address) {
	        var pkgName = getPackage(loader, load.name);
	        if (pkgName) {
	          var pkg = loader.packages[pkgName];
	          var subPath = load.name.substr(pkgName.length + 1);

	          var meta = {};
	          if (pkg.meta) {
	            var bestDepth = 0;

	            // NB support a main shorthand in meta here?
	            getMetaMatches(pkg.meta, subPath, function(metaPattern, matchMeta, matchDepth) {
	              if (matchDepth > bestDepth)
	                bestDepth = matchDepth;
	              extendMeta(meta, matchMeta, matchDepth && bestDepth > matchDepth);
	            });

	            extendMeta(load.metadata, meta);
	          }

	          // format
	          if (pkg.format && !load.metadata.loader)
	            load.metadata.format = load.metadata.format || pkg.format;
	        }

	        return address;
	      });
	    };
	  });

	})();
	/*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && !curMeta.entry && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, startEntry, loader) {
	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          var setter = importerModule.setters[importerIndex];
	          if (setter)
	            setter(exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });

	    if (typeof declaration == 'function')
	      declaration = { setters: [], execute: declaration };

	    // allowing undefined declaration was a mistake! To be deprecated.
	    declaration = declaration || { setters: [], execute: function() {} };
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, entry, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output !== undefined)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = loader.newModule(exports);
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = loader.newModule(getESModule(exports));
	    // just use the 'default' export
	    else
	      entry.esModule = loader.newModule({ 'default': exports, __useDefault: true });
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, entry, seen, loader) {
	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, loader.defined[depName], seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.apply(this, arguments)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  // implement a perforance shortpath for System.load with no deps
	  hook('load', function(doLoad) {
	    return function(normalized) {
	      var loader = this;
	      var entry = loader.defined[normalized];

	      if (!entry || entry.deps.length)
	        return doLoad.apply(this, arguments);

	      entry.originalIndices = entry.normalizedDeps = [];

	      // recursively ensure that the module and all its 
	      // dependencies are linked (with dependency group handling)
	      link(normalized, entry, loader);

	      // now handle dependency execution in correct order
	      ensureEvaluated(normalized, entry, [], loader);
	      if (!entry.esModule)
	        entry.esModule = loader.newModule(entry.module.exports);

	      // remove from the registry
	      if (!loader.trace)
	        loader.defined[normalized] = undefined;

	      // return the defined module object
	      loader.set(normalized, entry.esModule);

	      return Promise.resolve();
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, entry, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, entry, [], loader);

	            if (!entry.esModule)
	              entry.esModule = loader.newModule(entry.module.exports);

	            // remove from the registry
	            if (!loader.trace)
	              loader.defined[load.name] = undefined;

	            // return the defined module object
	            return entry.esModule;
	          }
	        };
	      });
	    };
	  });
	})();


	function getGlobalValue(exports) {
	  if (typeof exports == 'string')
	    return readMemberExpression(exports, __global);

	  if (!(exports instanceof Array))
	    throw new Error('Global exports must be a string or array.');

	  var globalValue = {};
	  var first = true;
	  for (var i = 0; i < exports.length; i++) {
	    var val = readMemberExpression(exports[i], __global);
	    if (first) {
	      globalValue['default'] = val;
	      first = false;
	    }
	    globalValue[exports[i].split('.').pop()] = val;
	  }
	  return globalValue;
	}

	hook('reduceRegister_', function(reduceRegister) {
	  return function(load, register) {
	    if (register || (!load.metadata.exports && !(isWorker && load.metadata.format == 'global')))
	      return reduceRegister.call(this, load, register);

	    load.metadata.format = 'global';
	    var entry = load.metadata.entry = createEntry();
	    entry.deps = load.metadata.deps;
	    var globalValue = getGlobalValue(load.metadata.exports);
	    entry.execute = function() {
	      return globalValue;
	    };
	  };
	});

	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    // bare minimum ignores
	    var ignoredGlobalProps = ['_g', 'sessionStorage', 'localStorage', 'clipboardData', 'frames', 'frameElement', 'external', 
	      'mozAnimationStartTime', 'webkitStorageInfo', 'webkitIndexedDB', 'mozInnerScreenY', 'mozInnerScreenX'];

	    var globalSnapshot;

	    function forEachGlobal(callback) {
	      if (Object.keys)
	        Object.keys(__global).forEach(callback);
	      else
	        for (var g in __global) {
	          if (!hasOwnProperty.call(__global, g))
	            continue;
	          callback(g);
	        }
	    }

	    function forEachGlobalValue(callback) {
	      forEachGlobal(function(globalName) {
	        if (indexOf.call(ignoredGlobalProps, globalName) != -1)
	          return;
	        try {
	          var value = __global[globalName];
	        }
	        catch (e) {
	          ignoredGlobalProps.push(globalName);
	        }
	        callback(globalName, value);
	      });
	    }

	    loader.set('@@global-helpers', loader.newModule({
	      prepareGlobal: function(moduleName, exports, globals, encapsulate) {
	        // disable module detection
	        var curDefine = __global.define;
	        
	        __global.define = undefined;

	        // set globals
	        var oldGlobals;
	        if (globals) {
	          oldGlobals = {};
	          for (var g in globals) {
	            oldGlobals[g] = __global[g];
	            __global[g] = globals[g];
	          }
	        }

	        // store a complete copy of the global object in order to detect changes
	        if (!exports) {
	          globalSnapshot = {};

	          forEachGlobalValue(function(name, value) {
	            globalSnapshot[name] = value;
	          });
	        }

	        // return function to retrieve global
	        return function() {
	          var globalValue = exports ? getGlobalValue(exports) : {};

	          var singleGlobal;
	          var multipleExports = !!exports;

	          if (!exports || encapsulate)
	            forEachGlobalValue(function(name, value) {
	              if (globalSnapshot[name] === value)
	                return;
	              if (typeof value == 'undefined')
	                return;
	              
	              // allow global encapsulation where globals are removed
	              if (encapsulate)
	                __global[name] = undefined;

	              if (!exports) {
	                globalValue[name] = value;

	                if (typeof singleGlobal != 'undefined') {
	                  if (!multipleExports && singleGlobal !== value)
	                    multipleExports = true;
	                }
	                else {
	                  singleGlobal = value;
	                }
	              }
	            });

	          globalValue = multipleExports ? globalValue : singleGlobal;

	          // revert globals
	          if (oldGlobals) {
	            for (var g in oldGlobals)
	              __global[g] = oldGlobals[g];
	          }
	          __global.define = curDefine;

	          return globalValue;
	        };
	      }
	    }));
	  };
	});
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(loader);

	    if (typeof window != 'undefined' && typeof document != 'undefined' && window.location)
	      var windowOrigin = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');

	    function stripOrigin(path) {
	      if (path.substr(0, 8) == 'file:///')
	        return path.substr(7 + !!isWindows);
	      
	      if (windowOrigin && path.substr(0, windowOrigin.length) == windowOrigin)
	        return path.substr(windowOrigin.length);

	      return path;
	    }

	    loader.set('@@cjs-helpers', loader.newModule({
	      requireResolve: function(request, parentId) {
	        return stripOrigin(loader.normalizeSync(request, parentId));
	      },
	      getPathVars: function(moduleId) {
	        // remove any plugin syntax
	        var pluginIndex = moduleId.lastIndexOf('!');
	        var filename;
	        if (pluginIndex != -1)
	          filename = moduleId.substr(0, pluginIndex);
	        else
	          filename = moduleId;

	        var dirname = filename.split('/');
	        dirname.pop();
	        dirname = dirname.join('/');

	        return {
	          filename: stripOrigin(filename),
	          dirname: stripOrigin(dirname)
	        };
	      }
	    }))
	  };
	});/*
	 * AMD Helper function module
	 * Separated into its own file as this is the part needed for full AMD support in SFX builds
	 * NB since implementations have now diverged this can be merged back with amd.js
	 */

	hook('fetch', function(fetch) {
	  return function(load) {
	    // script load implies define global leak
	    if (load.metadata.scriptLoad && isBrowser)
	      __global.define = this.amdDefine;
	    return fetch.call(this, load);
	  };
	});
	 
	hookConstructor(function(constructor) {
	  return function() {
	    var loader = this;
	    constructor.call(this);

	    var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;
	    var cjsRequirePre = "(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])";
	    var cjsRequirePost = "\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)";
	    var fnBracketRegEx = /\(([^\)]*)\)/;
	    var wsRegEx = /^\s+|\s+$/g;
	    
	    var requireRegExs = {};

	    function getCJSDeps(source, requireIndex) {

	      // remove comments
	      source = source.replace(commentRegEx, '');

	      // determine the require alias
	      var params = source.match(fnBracketRegEx);
	      var requireAlias = (params[1].split(',')[requireIndex] || 'require').replace(wsRegEx, '');

	      // find or generate the regex for this requireAlias
	      var requireRegEx = requireRegExs[requireAlias] || (requireRegExs[requireAlias] = new RegExp(cjsRequirePre + requireAlias + cjsRequirePost, 'g'));

	      requireRegEx.lastIndex = 0;

	      var deps = [];

	      var match;
	      while (match = requireRegEx.exec(source))
	        deps.push(match[2] || match[3]);

	      return deps;
	    }

	    /*
	      AMD-compatible require
	      To copy RequireJS, set window.require = window.requirejs = loader.amdRequire
	    */
	    function require(names, callback, errback, referer) {
	      // in amd, first arg can be a config object... we just ignore
	      if (typeof names == 'object' && !(names instanceof Array))
	        return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

	      // amd require
	      if (typeof names == 'string' && typeof callback == 'function')
	        names = [names];
	      if (names instanceof Array) {
	        var dynamicRequires = [];
	        for (var i = 0; i < names.length; i++)
	          dynamicRequires.push(loader['import'](names[i], referer));
	        Promise.all(dynamicRequires).then(function(modules) {
	          if (callback)
	            callback.apply(null, modules);
	        }, errback);
	      }

	      // commonjs require
	      else if (typeof names == 'string') {
	        var defaultJSExtension = loader.defaultJSExtensions && names.substr(names.length - 3, 3) != '.js';
	        var normalized = loader.decanonicalize(names, referer);
	        if (defaultJSExtension && normalized.substr(normalized.length - 3, 3) == '.js')
	          normalized = normalized.substr(0, normalized.length - 3);
	        var module = loader.get(normalized);
	        if (!module)
	          throw new Error('Module not already loaded loading "' + names + '" as ' + normalized + (referer ? ' from "' + referer + '".' : '.'));
	        return module.__useDefault ? module['default'] : module;
	      }

	      else
	        throw new TypeError('Invalid require');
	    }

	    function define(name, deps, factory) {
	      if (typeof name != 'string') {
	        factory = deps;
	        deps = name;
	        name = null;
	      }
	      if (!(deps instanceof Array)) {
	        factory = deps;
	        deps = ['require', 'exports', 'module'].splice(0, factory.length);
	      }

	      if (typeof factory != 'function')
	        factory = (function(factory) {
	          return function() { return factory; }
	        })(factory);

	      // in IE8, a trailing comma becomes a trailing undefined entry
	      if (deps[deps.length - 1] === undefined)
	        deps.pop();

	      // remove system dependencies
	      var requireIndex, exportsIndex, moduleIndex;
	      
	      if ((requireIndex = indexOf.call(deps, 'require')) != -1) {
	        
	        deps.splice(requireIndex, 1);

	        // only trace cjs requires for non-named
	        // named defines assume the trace has already been done
	        if (!name)
	          deps = deps.concat(getCJSDeps(factory.toString(), requireIndex));
	      }

	      if ((exportsIndex = indexOf.call(deps, 'exports')) != -1)
	        deps.splice(exportsIndex, 1);
	      
	      if ((moduleIndex = indexOf.call(deps, 'module')) != -1)
	        deps.splice(moduleIndex, 1);

	      function execute(req, exports, module) {
	        var depValues = [];
	        for (var i = 0; i < deps.length; i++)
	          depValues.push(req(deps[i]));

	        module.uri = module.id;

	        module.config = function() {};

	        // add back in system dependencies
	        if (moduleIndex != -1)
	          depValues.splice(moduleIndex, 0, module);
	        
	        if (exportsIndex != -1)
	          depValues.splice(exportsIndex, 0, exports);
	        
	        if (requireIndex != -1) {
	          function contextualRequire(names, callback, errback) {
	            if (typeof names == 'string' && typeof callback != 'function')
	              return req(names);
	            return require.call(loader, names, callback, errback, module.id);
	          }
	          contextualRequire.toUrl = function(name) {
	            // normalize without defaultJSExtensions
	            var defaultJSExtension = loader.defaultJSExtensions && name.substr(name.length - 3, 3) != '.js';
	            var url = loader.decanonicalize(name, module.id);
	            if (defaultJSExtension && url.substr(url.length - 3, 3) == '.js')
	              url = url.substr(0, url.length - 3);
	            return url;
	          };
	          depValues.splice(requireIndex, 0, contextualRequire);
	        }

	        // set global require to AMD require
	        var curRequire = __global.require;
	        __global.require = require;

	        var output = factory.apply(exportsIndex == -1 ? __global : exports, depValues);

	        __global.require = curRequire;

	        if (typeof output == 'undefined' && module)
	          output = module.exports;

	        if (typeof output != 'undefined')
	          return output;
	      }

	      var entry = createEntry();
	      entry.name = name && (loader.decanonicalize || loader.normalize).call(loader, name);
	      entry.deps = deps;
	      entry.execute = execute;

	      loader.pushRegister_({
	        amd: true,
	        entry: entry
	      });
	    }
	    define.amd = {};

	    // reduction function to attach defines to a load record
	    hook('reduceRegister_', function(reduceRegister) {
	      return function(load, register) {
	        // only handle AMD registers here
	        if (!register || !register.amd)
	          return reduceRegister.call(this, load, register);

	        var curMeta = load && load.metadata;
	        var entry = register.entry;

	        if (curMeta) {
	          if (!curMeta.format || curMeta.format == 'detect')
	            curMeta.format = 'amd';
	          else if (!entry.name && curMeta.format != 'amd')
	            throw new Error('AMD define called while executing ' + curMeta.format + ' module ' + load.name);
	        }

	        // anonymous define
	        if (!entry.name) {
	          if (!curMeta)
	            throw new TypeError('Unexpected anonymous AMD define.');

	          if (curMeta.entry && !curMeta.entry.name)
	            throw new Error('Multiple anonymous defines in module ' + load.name);
	          
	          curMeta.entry = entry;
	        }
	        // named define
	        else {
	          // if we don't have any other defines, 
	          // then let this be an anonymous define
	          // this is just to support single modules of the form:
	          // define('jquery')
	          // still loading anonymously
	          // because it is done widely enough to be useful
	          // as soon as there is more than one define, this gets removed though
	          if (curMeta) {
	            if (!curMeta.entry && !curMeta.bundle)
	              curMeta.entry = entry;
	            else if (curMeta.entry && curMeta.entry.name && curMeta.entry.name != load.name)
	              curMeta.entry = undefined;

	            // note this is now a bundle
	            curMeta.bundle = true;
	          }

	          // define the module through the register registry
	          if (!(entry.name in this.defined))
	            this.defined[entry.name] = entry;
	        }
	      };
	    });

	    loader.amdDefine = define;
	    loader.amdRequire = require;
	  };
	});/*
	  SystemJS Loader Plugin Support

	  Supports plugin loader syntax with "!", or via metadata.loader

	  The plugin name is loaded as a module itself, and can override standard loader hooks
	  for the plugin resource. See the plugin section of the systemjs readme.
	*/

	(function() {
	  function getParentName(loader, parentName) {
	    // if parent is a plugin, normalize against the parent plugin argument only
	    if (parentName) {
	      var parentPluginIndex;
	      if (loader.pluginFirst) {
	        if ((parentPluginIndex = parentName.lastIndexOf('!')) != -1)
	          return parentName.substr(parentPluginIndex + 1);
	      }
	      else {
	        if ((parentPluginIndex = parentName.indexOf('!')) != -1)
	          return parentName.substr(0, parentPluginIndex);
	      }

	      return parentName;
	    }
	  }

	  function parsePlugin(loader, name) {
	    var argumentName;
	    var pluginName;

	    var pluginIndex = name.lastIndexOf('!');

	    if (pluginIndex == -1)
	      return;

	    if (loader.pluginFirst) {
	      argumentName = name.substr(pluginIndex + 1);
	      pluginName = name.substr(0, pluginIndex);
	    }
	    else {
	      argumentName = name.substr(0, pluginIndex);
	      pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);
	    }

	    return {
	      argument: argumentName,
	      plugin: pluginName
	    };
	  }

	  // put name back together after parts have been normalized
	  function combinePluginParts(loader, argumentName, pluginName, defaultExtension) {
	    if (defaultExtension && argumentName.substr(argumentName.length - 3, 3) == '.js')
	      argumentName = argumentName.substr(0, argumentName.length - 3);

	    if (loader.pluginFirst) {
	      return pluginName + '!' + argumentName;
	    }
	    else {
	      return argumentName + '!' + pluginName;
	    }
	  }

	  // note if normalize will add a default js extension
	  // if so, remove for backwards compat
	  // this is strange and sucks, but will be deprecated
	  function checkDefaultExtension(loader, arg) {
	    return loader.defaultJSExtensions && arg.substr(arg.length - 3, 3) != '.js';
	  }

	  function createNormalizeSync(normalizeSync) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      var parsed = parsePlugin(loader, name);
	      parentName = getParentName(this, parentName);

	      if (!parsed)
	        return normalizeSync.call(this, name, parentName, isPlugin);

	      // if this is a plugin, normalize the plugin name and the argument
	      var argumentName = loader.normalizeSync(parsed.argument, parentName, true);
	      var pluginName = loader.normalizeSync(parsed.plugin, parentName, true);
	      return combinePluginParts(loader, argumentName, pluginName, checkDefaultExtension(loader, parsed.argument));
	    };
	  }

	  hook('decanonicalize', createNormalizeSync);
	  hook('normalizeSync', createNormalizeSync);

	  hook('normalize', function(normalize) {
	    return function(name, parentName, isPlugin) {
	      var loader = this;

	      parentName = getParentName(this, parentName);

	      var parsed = parsePlugin(loader, name);

	      if (!parsed)
	        return normalize.call(loader, name, parentName, isPlugin);

	      return Promise.all([
	        loader.normalize(parsed.argument, parentName, true),
	        loader.normalize(parsed.plugin, parentName, false)
	      ])
	      .then(function(normalized) {
	        return combinePluginParts(loader, normalized[0], normalized[1], checkDefaultExtension(loader, parsed.argument));
	      });
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;

	      var name = load.name;

	      // plugin syntax
	      var pluginSyntaxIndex;
	      if (loader.pluginFirst) {
	        if ((pluginSyntaxIndex = name.indexOf('!')) != -1) {
	          load.metadata.loader = name.substr(0, pluginSyntaxIndex);
	          load.name = name.substr(pluginSyntaxIndex + 1);
	        }
	      }
	      else {
	        if ((pluginSyntaxIndex = name.lastIndexOf('!')) != -1) {
	          load.metadata.loader = name.substr(pluginSyntaxIndex + 1);
	          load.name = name.substr(0, pluginSyntaxIndex);
	        }
	      }

	      return locate.call(loader, load)
	      .then(function(address) {
	        if (pluginSyntaxIndex != -1 || !load.metadata.loader)
	          return address;

	        // normalize plugin relative to parent in locate here when
	        // using plugin via loader metadata
	        return (loader.pluginLoader || loader).normalize(load.metadata.loader, load.name)
	        .then(function(loaderNormalized) {
	          load.metadata.loader = loaderNormalized;
	          return address;
	        });
	      })
	      .then(function(address) {
	        var plugin = load.metadata.loader;

	        if (!plugin)
	          return address;

	        // don't allow a plugin to load itself
	        if (load.name == plugin)
	          throw new Error('Plugin ' + plugin + ' cannot load itself, make sure it is excluded from any wildcard meta configuration via a custom loader: false rule.');

	        // only fetch the plugin itself if this name isn't defined
	        if (loader.defined && loader.defined[name])
	          return address;

	        var pluginLoader = loader.pluginLoader || loader;

	        // load the plugin module and run standard locate
	        return pluginLoader['import'](plugin)
	        .then(function(loaderModule) {
	          // store the plugin module itself on the metadata
	          load.metadata.loaderModule = loaderModule;

	          load.address = address;
	          if (loaderModule.locate)
	            return loaderModule.locate.call(loader, load);

	          return address;
	        });
	      });
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.fetch && load.metadata.format != 'defined') {
	        load.metadata.scriptLoad = false;
	        return load.metadata.loaderModule.fetch.call(loader, load, function(load) {
	          return fetch.call(loader, load);
	        });
	      }
	      else {
	        return fetch.call(loader, load);
	      }
	    };
	  });

	  hook('translate', function(translate) {
	    return function(load) {
	      var loader = this;
	      var args = arguments;
	      if (load.metadata.loaderModule && load.metadata.loaderModule.translate && load.metadata.format != 'defined') {
	        return Promise.resolve(load.metadata.loaderModule.translate.apply(loader, args)).then(function(result) {
	          var sourceMap = load.metadata.sourceMap;

	          // sanitize sourceMap if an object not a JSON string
	          if (sourceMap) {
	            if (typeof sourceMap != 'object')
	              throw new Error('load.metadata.sourceMap must be set to an object.');

	            var originalName = load.address.split('!')[0];

	            // force set the filename of the original file
	            if (!sourceMap.file || sourceMap.file == load.address)
	              sourceMap.file = originalName + '!transpiled';

	            // force set the sources list if only one source
	            if (!sourceMap.sources || sourceMap.sources.length <= 1 && (!sourceMap.sources[0] || sourceMap.sources[0] == load.address))
	              sourceMap.sources = [originalName];
	          }

	          // if running on file:/// URLs, sourcesContent is necessary
	          // load.metadata.sourceMap.sourcesContent = [load.source];

	          if (typeof result == 'string')
	            load.source = result;

	          return translate.apply(loader, args);
	        });
	      }
	      else {
	        return translate.apply(loader, args);
	      }
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      var loader = this;
	      var calledInstantiate = false;

	      if (load.metadata.loaderModule && load.metadata.loaderModule.instantiate && !loader.builder && load.metadata.format != 'defined')
	        return Promise.resolve(load.metadata.loaderModule.instantiate.call(loader, load, function(load) {
	          if (calledInstantiate)
	            throw new Error('Instantiate must only be called once.');
	          calledInstantiate = true;
	          return instantiate.call(loader, load);
	        })).then(function(result) {
	          if (calledInstantiate)
	            return result;

	          if (result !== undefined) {
	            load.metadata.entry = createEntry();
	            load.metadata.entry.execute = function() {
	              return result;
	            }
	            load.metadata.entry.deps = load.metadata.deps;
	            load.metadata.format = 'defined';
	          }
	          return instantiate.call(loader, load);
	        });
	      else
	        return instantiate.call(loader, load);
	    };
	  });

	})();
	/*
	 * Conditions Extension
	 *
	 *   Allows a condition module to alter the resolution of an import via syntax:
	 *
	 *     import $ from 'jquery/#{browser}';
	 *
	 *   Will first load the module 'browser' via `SystemJS.import('browser')` and 
	 *   take the default export of that module.
	 *   If the default export is not a string, an error is thrown.
	 * 
	 *   We then substitute the string into the require to get the conditional resolution
	 *   enabling environment-specific variations like:
	 * 
	 *     import $ from 'jquery/ie'
	 *     import $ from 'jquery/firefox'
	 *     import $ from 'jquery/chrome'
	 *     import $ from 'jquery/safari'
	 *
	 *   It can be useful for a condition module to define multiple conditions.
	 *   This can be done via the `|` modifier to specify an export member expression:
	 *
	 *     import 'jquery/#{./browser.js|grade.version}'
	 *
	 *   Where the `grade` export `version` member in the `browser.js` module  is substituted.
	 *
	 *
	 * Boolean Conditionals
	 *
	 *   For polyfill modules, that are used as imports but have no module value,
	 *   a binary conditional allows a module not to be loaded at all if not needed:
	 *
	 *     import 'es5-shim#?./conditions.js|needs-es5shim'
	 *
	 *   These conditions can also be negated via:
	 *     
	 *     import 'es5-shim#?./conditions.js|~es6'
	 *
	 */

	  var sysConditions = ['browser', 'node', 'dev', 'build', 'production', 'default'];

	  function parseCondition(condition) {
	    var conditionExport, conditionModule, negation;

	    var negation = condition[0] == '~';
	    var conditionExportIndex = condition.lastIndexOf('|');
	    if (conditionExportIndex != -1) {
	      conditionExport = condition.substr(conditionExportIndex + 1);
	      conditionModule = condition.substr(negation, conditionExportIndex - negation);
	      
	      if (negation)
	        warn.call(this, 'Condition negation form "' + condition + '" is deprecated for "' + conditionModule + '|~' + conditionExport + '"');

	      if (conditionExport[0] == '~') {
	        negation = true;
	        conditionExport = conditionExport.substr(1);
	      }
	    }
	    else {
	      conditionExport = 'default';
	      conditionModule = condition.substr(negation);
	      if (sysConditions.indexOf(conditionModule) != -1) {
	        conditionExport = conditionModule;
	        conditionModule = null;
	      }
	    }

	    return {
	      module: conditionModule || '@system-env',
	      prop: conditionExport,
	      negate: negation
	    };
	  }

	  function serializeCondition(conditionObj) {
	    return conditionObj.module + '|' + (conditionObj.negate ? '~' : '') + conditionObj.prop;
	  }

	  function resolveCondition(conditionObj, parentName, bool) {
	    var self = this;
	    return this.normalize(conditionObj.module, parentName)
	    .then(function(normalizedCondition) {
	      return self.load(normalizedCondition)
	      .then(function(q) {
	        var m = readMemberExpression(conditionObj.prop, self.get(normalizedCondition));

	        if (bool && typeof m != 'boolean')
	          throw new TypeError('Condition ' + serializeCondition(conditionObj) + ' did not resolve to a boolean.');

	        return conditionObj.negate ? !m : m;
	      });
	    });
	  }

	  var interpolationRegEx = /#\{[^\}]+\}/;
	  function interpolateConditional(name, parentName) {
	    // first we normalize the conditional
	    var conditionalMatch = name.match(interpolationRegEx);

	    if (!conditionalMatch)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition.call(this, conditionalMatch[0].substr(2, conditionalMatch[0].length - 3));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.replace(interpolationRegEx, '#{' + serializeCondition(conditionObj) + '}');
	      });

	    return resolveCondition.call(this, conditionObj, parentName, false)
	    .then(function(conditionValue) {
	      if (typeof conditionValue !== 'string')
	        throw new TypeError('The condition value for ' + name + ' doesn\'t resolve to a string.');

	      if (conditionValue.indexOf('/') != -1)
	        throw new TypeError('Unabled to interpolate conditional ' + name + (parentName ? ' in ' + parentName : '') + '\n\tThe condition value ' + conditionValue + ' cannot contain a "/" separator.');

	      return name.replace(interpolationRegEx, conditionValue);
	    });
	  }

	  function booleanConditional(name, parentName) {
	    // first we normalize the conditional
	    var booleanIndex = name.lastIndexOf('#?');

	    if (booleanIndex == -1)
	      return Promise.resolve(name);

	    var conditionObj = parseCondition.call(this, name.substr(booleanIndex + 2));

	    // in builds, return normalized conditional
	    if (this.builder)
	      return this['normalize'](conditionObj.module, parentName)
	      .then(function(conditionModule) {
	        conditionObj.module = conditionModule;
	        return name.substr(0, booleanIndex) + '#?' + serializeCondition(conditionObj);
	      });

	    return resolveCondition.call(this, conditionObj, parentName, true)
	    .then(function(conditionValue) {
	      return conditionValue ? name.substr(0, booleanIndex) : '@empty';
	    });
	  }

	  // normalizeSync does not parse conditionals at all although it could
	  hook('normalize', function(normalize) {
	    return function(name, parentName, skipExt) {
	      var loader = this;
	      return booleanConditional.call(loader, name, parentName)
	      .then(function(name) {
	        return normalize.call(loader, name, parentName, skipExt);
	      })
	      .then(function(normalized) {
	        return interpolateConditional.call(loader, normalized, parentName);
	      });
	    };
	  });
	/*
	 * Alias Extension
	 *
	 * Allows a module to be a plain copy of another module by module name
	 *
	 * SystemJS.meta['mybootstrapalias'] = { alias: 'bootstrap' };
	 *
	 */
	(function() {
	  // aliases
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var alias = load.metadata.alias;
	      var aliasDeps = load.metadata.deps || [];
	      if (alias) {
	        load.metadata.format = 'defined';
	        var entry = createEntry();
	        this.defined[load.name] = entry;
	        entry.declarative = true;
	        entry.deps = aliasDeps.concat([alias]);
	        entry.declare = function(_export) {
	          return {
	            setters: [function(module) {
	              for (var p in module)
	                _export(p, module[p]);
	              if (module.__useDefault)
	                entry.module.exports.__useDefault = true;
	            }],
	            execute: function() {}
	          };
	        };
	        return '';
	      }

	      return fetch.call(this, load);
	    };
	  });
	})();/*
	 * Meta Extension
	 *
	 * Sets default metadata on a load record (load.metadata) from
	 * loader.metadata via SystemJS.meta function.
	 *
	 *
	 * Also provides an inline meta syntax for module meta in source.
	 *
	 * Eg:
	 *
	 * loader.meta({
	 *   'my/module': { deps: ['jquery'] }
	 *   'my/*': { format: 'amd' }
	 * });
	 *
	 * Which in turn populates loader.metadata.
	 *
	 * load.metadata.deps and load.metadata.format will then be set
	 * for 'my/module'
	 *
	 * The same meta could be set with a my/module.js file containing:
	 *
	 * my/module.js
	 *   "format amd";
	 *   "deps[] jquery";
	 *   "globals.some value"
	 *   console.log('this is my/module');
	 *
	 * Configuration meta always takes preference to inline meta.
	 *
	 * Multiple matches in wildcards are supported and ammend the meta.
	 *
	 *
	 * The benefits of the function form is that paths are URL-normalized
	 * supporting say
	 *
	 * loader.meta({ './app': { format: 'cjs' } });
	 *
	 * Instead of needing to set against the absolute URL (https://site.com/app.js)
	 *
	 */

	(function() {

	  hookConstructor(function(constructor) {
	    return function() {
	      this.meta = {};
	      constructor.call(this);
	    };
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var meta = this.meta;
	      var name = load.name;

	      // NB for perf, maybe introduce a fast-path wildcard lookup cache here
	      // which is checked first

	      // apply wildcard metas
	      var bestDepth = 0;
	      var wildcardIndex;
	      for (var module in meta) {
	        wildcardIndex = module.indexOf('*');
	        if (wildcardIndex === -1)
	          continue;
	        if (module.substr(0, wildcardIndex) === name.substr(0, wildcardIndex)
	            && module.substr(wildcardIndex + 1) === name.substr(name.length - module.length + wildcardIndex + 1)) {
	          var depth = module.split('/').length;
	          if (depth > bestDepth)
	            bestDepth = depth;
	          extendMeta(load.metadata, meta[module], bestDepth != depth);
	        }
	      }

	      // apply exact meta
	      if (meta[name])
	        extendMeta(load.metadata, meta[name]);

	      return locate.call(this, load);
	    };
	  });

	  // detect any meta header syntax
	  // only set if not already set
	  var metaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)+/;
	  var metaPartRegEx = /\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\/\/[^\n]*|"[^"]+"\s*;?|'[^']+'\s*;?/g;

	  function setMetaProperty(target, p, value) {
	    var pParts = p.split('.');
	    var curPart;
	    while (pParts.length > 1) {
	      curPart = pParts.shift();
	      target = target[curPart] = target[curPart] || {};
	    }
	    curPart = pParts.shift();
	    if (!(curPart in target))
	      target[curPart] = value;
	  }

	  hook('translate', function(translate) {
	    return function(load) {
	      // shortpath for bundled
	      if (load.metadata.format == 'defined') {
	        load.metadata.deps = load.metadata.deps || [];
	        return Promise.resolve(load.source);
	      }

	      // NB meta will be post-translate pending transpiler conversion to plugins
	      var meta = load.source.match(metaRegEx);
	      if (meta) {
	        var metaParts = meta[0].match(metaPartRegEx);

	        for (var i = 0; i < metaParts.length; i++) {
	          var curPart = metaParts[i];
	          var len = curPart.length;

	          var firstChar = curPart.substr(0, 1);
	          if (curPart.substr(len - 1, 1) == ';')
	            len--;

	          if (firstChar != '"' && firstChar != "'")
	            continue;

	          var metaString = curPart.substr(1, curPart.length - 3);
	          var metaName = metaString.substr(0, metaString.indexOf(' '));

	          if (metaName) {
	            var metaValue = metaString.substr(metaName.length + 1, metaString.length - metaName.length - 1);

	            if (metaName.substr(metaName.length - 2, 2) == '[]') {
	              metaName = metaName.substr(0, metaName.length - 2);
	              load.metadata[metaName] = load.metadata[metaName] || [];
	              load.metadata[metaName].push(metaValue);
	            }
	            else if (load.metadata[metaName] instanceof Array) {
	              // temporary backwards compat for previous "deps" syntax
	              warn.call(this, 'Module ' + load.name + ' contains deprecated "deps ' + metaValue + '" meta syntax.\nThis should be updated to "deps[] ' + metaValue + '" for pushing to array meta.');
	              load.metadata[metaName].push(metaValue);
	            }
	            else {
	              setMetaProperty(load.metadata, metaName, metaValue);
	            }
	          }
	          else {
	            load.metadata[metaString] = true;
	          }
	        }
	      }

	      return translate.apply(this, arguments);
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Dependency Tree Cache
	 * 
	 * Allows a build to pre-populate a dependency trace tree on the loader of 
	 * the expected dependency tree, to be loaded upfront when requesting the
	 * module, avoinding the n round trips latency of module loading, where 
	 * n is the dependency tree depth.
	 *
	 * eg:
	 * SystemJS.depCache = {
	 *  'app': ['normalized', 'deps'],
	 *  'normalized': ['another'],
	 *  'deps': ['tree']
	 * };
	 * 
	 * SystemJS.import('app') 
	 * // simultaneously starts loading all of:
	 * // 'normalized', 'deps', 'another', 'tree'
	 * // before "app" source is even loaded
	 *
	 */

	(function() {
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.depCache = {};
	    }
	  });

	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      // load direct deps, in turn will pick up their trace trees
	      var deps = loader.depCache[load.name];
	      if (deps)
	        for (var i = 0; i < deps.length; i++)
	          loader['import'](deps[i], load.name);

	      return locate.call(loader, load);
	    };
	  });
	})();
	  
	/*
	 * Script-only addition used for production loader
	 *
	 */
	hookConstructor(function(constructor) {
	  return function() {
	    constructor.apply(this, arguments);
	    __global.define = this.amdDefine;
	  };
	});

	hook('fetch', function(fetch) {
	  return function(load) {
	    load.metadata.scriptLoad = true;
	    return fetch.call(this, load);
	  };
	});System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.41 CSP';
	  if (typeof module == 'object' && module.exports && typeof exports == 'object')
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);}

	// auto-load Promise polyfill if needed in the browser
	var doPolyfill = typeof Promise === 'undefined';

	// document.write
	if (typeof document !== 'undefined') {
	  var scripts = document.getElementsByTagName('script');
	  $__curScript = scripts[scripts.length - 1];
	  if (document.currentScript && ($__curScript.defer || $__curScript.async))
	    $__curScript = document.currentScript;
	  if (!$__curScript.src)
	    $__curScript = undefined;
	  if (doPolyfill) {
	    var curPath = $__curScript.src;
	    var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
	    window.systemJSBootstrap = bootstrap;
	    document.write(
	      '<' + 'script type="text/javascript" src="' + basePath + 'system-polyfills.js">' + '<' + '/script>'
	    );
	  }
	  else {
	    bootstrap();
	  }
	}
	// importScripts
	else if (typeof importScripts !== 'undefined') {
	  var basePath = '';
	  try {
	    throw new Error('_');
	  } catch (e) {
	    e.stack.replace(/(?:at|@).*(http.+):[\d]+:[\d]+/, function(m, url) {
	      $__curScript = { src: url };
	      basePath = url.replace(/\/[^\/]*$/, '/');
	    });
	  }
	  if (doPolyfill)
	    importScripts(basePath + 'system-polyfills.js');
	  bootstrap();
	}
	else {
	  $__curScript =  true ? { src: __filename } : null;
	  bootstrap();
	}


	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1), "/index.js"))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS Promise Polyfill
	 */
	!function(t){!function(e){ true?module.exports=e():"function"==typeof t&&t.amd?t(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var t;return function t(e,n,o){function r(u,c){if(!n[u]){if(!e[u]){var f="function"==typeof require&&require;if(!c&&f)return require(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var s=n[u]={exports:{}};e[u][0].call(s.exports,function(t){var n=e[u][1][t];return r(n?n:t)},s,s.exports,t,e,n,o)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<o.length;u++)r(o[u]);return r}({1:[function(t,e,n){var o=t("../lib/decorators/unhandledRejection"),r=o(t("../lib/Promise"));e.exports="undefined"!=typeof global?global.Promise=r:"undefined"!=typeof self?self.Promise=r:r},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(e,n,o){!function(t){"use strict";t(function(t){var e=t("./makePromise"),n=t("./Scheduler"),o=t("./env").asap;return e({scheduler:new n(o)})})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){this._async=t,this._running=!1,this._queue=this,this._queueLen=0,this._afterQueue={},this._afterQueueLen=0;var e=this;this.drain=function(){e._drain()}}return t.prototype.enqueue=function(t){this._queue[this._queueLen++]=t,this.run()},t.prototype.afterQueue=function(t){this._afterQueue[this._afterQueueLen++]=t,this.run()},t.prototype.run=function(){this._running||(this._running=!0,this._async(this.drain))},t.prototype._drain=function(){for(var t=0;t<this._queueLen;++t)this._queue[t].run(),this._queue[t]=void 0;for(this._queueLen=0,this._running=!1,t=0;t<this._afterQueueLen;++t)this._afterQueue[t].run(),this._afterQueue[t]=void 0;this._afterQueueLen=0},t})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],4:[function(e,n,o){!function(t){"use strict";t(function(t){function e(t){throw t}function n(){}var o=t("../env").setTimer,r=t("../format");return function(t){function i(t){t.handled||(l.push(t),a("Potentially unhandled rejection ["+t.id+"] "+r.formatError(t.value)))}function u(t){var e=l.indexOf(t);e>=0&&(l.splice(e,1),h("Handled previous rejection ["+t.id+"] "+r.formatObject(t.value)))}function c(t,e){p.push(t,e),null===d&&(d=o(f,0))}function f(){for(d=null;p.length>0;)p.shift()(p.shift())}var s,a=n,h=n;"undefined"!=typeof console&&(s=console,a="undefined"!=typeof s.error?function(t){s.error(t)}:function(t){s.log(t)},h="undefined"!=typeof s.info?function(t){s.info(t)}:function(t){s.log(t)}),t.onPotentiallyUnhandledRejection=function(t){c(i,t)},t.onPotentiallyUnhandledRejectionHandled=function(t){c(u,t)},t.onFatalRejection=function(t){c(e,t.value)};var p=[],l=[],d=null;return t}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{"../env":5,"../format":6}],5:[function(e,n,o){!function(t){"use strict";t(function(t){function e(){return"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process)}function n(){return"function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver}function o(t){function e(){var t=n;n=void 0,t()}var n,o=document.createTextNode(""),r=new t(e);r.observe(o,{characterData:!0});var i=0;return function(t){n=t,o.data=i^=1}}var r,i="undefined"!=typeof setTimeout&&setTimeout,u=function(t,e){return setTimeout(t,e)},c=function(t){return clearTimeout(t)},f=function(t){return i(t,0)};if(e())f=function(t){return process.nextTick(t)};else if(r=n())f=o(r);else if(!i){var s=t,a=s("vertx");u=function(t,e){return a.setTimer(e,t)},c=a.cancelTimer,f=a.runOnLoop||a.runOnContext}return{setTimer:u,clearTimer:c,asap:f}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t(e)})},{}],6:[function(e,n,o){!function(t){"use strict";t(function(){function t(t){var n="object"==typeof t&&null!==t&&(t.stack||t.message)?t.stack||t.message:e(t);return t instanceof Error?n:n+" (WARNING: non-Error used)"}function e(t){var e=String(t);return"[object Object]"===e&&"undefined"!=typeof JSON&&(e=n(t,e)),e}function n(t,e){try{return JSON.stringify(t)}catch(t){return e}}return{formatError:t,formatObject:e,tryStringify:n}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}],7:[function(e,n,o){!function(t){"use strict";t(function(){return function(t){function e(t,e){this._handler=t===_?e:n(t)}function n(t){function e(t){r.resolve(t)}function n(t){r.reject(t)}function o(t){r.notify(t)}var r=new b;try{t(e,n,o)}catch(t){n(t)}return r}function o(t){return k(t)?t:new e(_,new x(v(t)))}function r(t){return new e(_,new x(new P(t)))}function i(){return $}function u(){return new e(_,new b)}function c(t,e){var n=new b(t.receiver,t.join().context);return new e(_,n)}function f(t){return a(B,null,t)}function s(t,e){return a(M,t,e)}function a(t,n,o){function r(e,r,u){u.resolved||h(o,i,e,t(n,r,e),u)}function i(t,e,n){a[t]=e,0===--s&&n.become(new q(a))}for(var u,c="function"==typeof n?r:i,f=new b,s=o.length>>>0,a=new Array(s),p=0;p<o.length&&!f.resolved;++p)u=o[p],void 0!==u||p in o?h(o,c,p,u,f):--s;return 0===s&&f.become(new q(a)),new e(_,f)}function h(t,e,n,o,r){if(U(o)){var i=m(o),u=i.state();0===u?i.fold(e,n,void 0,r):u>0?e(n,i.value,r):(r.become(i),p(t,n+1,i))}else e(n,o,r)}function p(t,e,n){for(var o=e;o<t.length;++o)l(v(t[o]),n)}function l(t,e){if(t!==e){var n=t.state();0===n?t.visit(t,void 0,t._unreport):n<0&&t._unreport()}}function d(t){return"object"!=typeof t||null===t?r(new TypeError("non-iterable passed to race()")):0===t.length?i():1===t.length?o(t[0]):y(t)}function y(t){var n,o,r,i=new b;for(n=0;n<t.length;++n)if(o=t[n],void 0!==o||n in t){if(r=v(o),0!==r.state()){i.become(r),p(t,n+1,r);break}r.visit(i,i.resolve,i.reject)}return new e(_,i)}function v(t){return k(t)?t._handler.join():U(t)?j(t):new q(t)}function m(t){return k(t)?t._handler.join():j(t)}function j(t){try{var e=t.then;return"function"==typeof e?new g(e,t):new q(t)}catch(t){return new P(t)}}function _(){}function w(){}function b(t,n){e.createContext(this,n),this.consumers=void 0,this.receiver=t,this.handler=void 0,this.resolved=!1}function x(t){this.handler=t}function g(t,e){b.call(this),G.enqueue(new E(t,e,this))}function q(t){e.createContext(this),this.value=t}function P(t){e.createContext(this),this.id=++Y,this.value=t,this.handled=!1,this.reported=!1,this._report()}function R(t,e){this.rejection=t,this.context=e}function C(t){this.rejection=t}function O(){return new P(new TypeError("Promise cycle"))}function T(t,e){this.continuation=t,this.handler=e}function Q(t,e){this.handler=e,this.value=t}function E(t,e,n){this._then=t,this.thenable=e,this.resolver=n}function L(t,e,n,o,r){try{t.call(e,n,o,r)}catch(t){o(t)}}function S(t,e,n,o){this.f=t,this.z=e,this.c=n,this.to=o,this.resolver=X,this.receiver=this}function k(t){return t instanceof e}function U(t){return("object"==typeof t||"function"==typeof t)&&null!==t}function H(t,n,o,r){return"function"!=typeof t?r.become(n):(e.enterContext(n),F(t,n.value,o,r),void e.exitContext())}function N(t,n,o,r,i){return"function"!=typeof t?i.become(o):(e.enterContext(o),W(t,n,o.value,r,i),void e.exitContext())}function J(t,n,o,r,i){return"function"!=typeof t?i.notify(n):(e.enterContext(o),z(t,n,r,i),void e.exitContext())}function M(t,e,n){try{return t(e,n)}catch(t){return r(t)}}function F(t,e,n,o){try{o.become(v(t.call(n,e)))}catch(t){o.become(new P(t))}}function W(t,e,n,o,r){try{t.call(o,e,n,r)}catch(t){r.become(new P(t))}}function z(t,e,n,o){try{o.notify(t.call(n,e))}catch(t){o.notify(t)}}function A(t,e){e.prototype=V(t.prototype),e.prototype.constructor=e}function B(t,e){return e}function K(){}function D(){return"undefined"!=typeof process&&null!==process&&"function"==typeof process.emit?function(t,e){return"unhandledRejection"===t?process.emit(t,e.value,e):process.emit(t,e)}:"undefined"!=typeof self&&"function"==typeof CustomEvent?function(t,e,n){var o=!1;try{var r=new n("unhandledRejection");o=r instanceof n}catch(t){}return o?function(t,o){var r=new n(t,{detail:{reason:o.value,key:o},bubbles:!1,cancelable:!0});return!e.dispatchEvent(r)}:t}(K,self,CustomEvent):K}var G=t.scheduler,I=D(),V=Object.create||function(t){function e(){}return e.prototype=t,new e};e.resolve=o,e.reject=r,e.never=i,e._defer=u,e._handler=v,e.prototype.then=function(t,e,n){var o=this._handler,r=o.join().state();if("function"!=typeof t&&r>0||"function"!=typeof e&&r<0)return new this.constructor(_,o);var i=this._beget(),u=i._handler;return o.chain(u,o.receiver,t,e,n),i},e.prototype.catch=function(t){return this.then(void 0,t)},e.prototype._beget=function(){return c(this._handler,this.constructor)},e.all=f,e.race=d,e._traverse=s,e._visitRemaining=p,_.prototype.when=_.prototype.become=_.prototype.notify=_.prototype.fail=_.prototype._unreport=_.prototype._report=K,_.prototype._state=0,_.prototype.state=function(){return this._state},_.prototype.join=function(){for(var t=this;void 0!==t.handler;)t=t.handler;return t},_.prototype.chain=function(t,e,n,o,r){this.when({resolver:t,receiver:e,fulfilled:n,rejected:o,progress:r})},_.prototype.visit=function(t,e,n,o){this.chain(X,t,e,n,o)},_.prototype.fold=function(t,e,n,o){this.when(new S(t,e,n,o))},A(_,w),w.prototype.become=function(t){t.fail()};var X=new w;A(_,b),b.prototype._state=0,b.prototype.resolve=function(t){this.become(v(t))},b.prototype.reject=function(t){this.resolved||this.become(new P(t))},b.prototype.join=function(){if(!this.resolved)return this;for(var t=this;void 0!==t.handler;)if(t=t.handler,t===this)return this.handler=O();return t},b.prototype.run=function(){var t=this.consumers,e=this.handler;this.handler=this.handler.join(),this.consumers=void 0;for(var n=0;n<t.length;++n)e.when(t[n])},b.prototype.become=function(t){this.resolved||(this.resolved=!0,this.handler=t,void 0!==this.consumers&&G.enqueue(this),void 0!==this.context&&t._report(this.context))},b.prototype.when=function(t){this.resolved?G.enqueue(new T(t,this.handler)):void 0===this.consumers?this.consumers=[t]:this.consumers.push(t)},b.prototype.notify=function(t){this.resolved||G.enqueue(new Q(t,this))},b.prototype.fail=function(t){var e="undefined"==typeof t?this.context:t;this.resolved&&this.handler.join().fail(e)},b.prototype._report=function(t){this.resolved&&this.handler.join()._report(t)},b.prototype._unreport=function(){this.resolved&&this.handler.join()._unreport()},A(_,x),x.prototype.when=function(t){G.enqueue(new T(t,this))},x.prototype._report=function(t){this.join()._report(t)},x.prototype._unreport=function(){this.join()._unreport()},A(b,g),A(_,q),q.prototype._state=1,q.prototype.fold=function(t,e,n,o){N(t,e,this,n,o)},q.prototype.when=function(t){H(t.fulfilled,this,t.receiver,t.resolver)};var Y=0;A(_,P),P.prototype._state=-1,P.prototype.fold=function(t,e,n,o){o.become(this)},P.prototype.when=function(t){"function"==typeof t.rejected&&this._unreport(),H(t.rejected,this,t.receiver,t.resolver)},P.prototype._report=function(t){G.afterQueue(new R(this,t))},P.prototype._unreport=function(){this.handled||(this.handled=!0,G.afterQueue(new C(this)))},P.prototype.fail=function(t){this.reported=!0,I("unhandledRejection",this),e.onFatalRejection(this,void 0===t?this.context:t)},R.prototype.run=function(){this.rejection.handled||this.rejection.reported||(this.rejection.reported=!0,I("unhandledRejection",this.rejection)||e.onPotentiallyUnhandledRejection(this.rejection,this.context))},C.prototype.run=function(){this.rejection.reported&&(I("rejectionHandled",this.rejection)||e.onPotentiallyUnhandledRejectionHandled(this.rejection))},e.createContext=e.enterContext=e.exitContext=e.onPotentiallyUnhandledRejection=e.onPotentiallyUnhandledRejectionHandled=e.onFatalRejection=K;var Z=new _,$=new e(_,Z);return T.prototype.run=function(){this.handler.join().when(this.continuation)},Q.prototype.run=function(){var t=this.handler.consumers;if(void 0!==t)for(var e,n=0;n<t.length;++n)e=t[n],J(e.progress,this.value,this.handler,e.receiver,e.resolver)},E.prototype.run=function(){function t(t){o.resolve(t)}function e(t){o.reject(t)}function n(t){o.notify(t)}var o=this.resolver;L(this._then,this.thenable,t,e,n)},S.prototype.fulfilled=function(t){this.f.call(this.c,this.z,t,this.to)},S.prototype.rejected=function(t){this.to.reject(t)},S.prototype.progress=function(t){this.to.notify(t)},e}})}("function"==typeof t&&t.amd?t:function(t){n.exports=t()})},{}]},{},[1])(1)}),"undefined"!=typeof systemJSBootstrap&&systemJSBootstrap()}();
	//# sourceMappingURL=system-polyfills.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS Promise Polyfill
	 */
	(function(define) {

	!function(e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Promise=e():"undefined"!=typeof global?global.Promise=e():"undefined"!=typeof self&&(self.Promise=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/**
	 * ES6 global Promise shim
	 */
	var unhandledRejections = require('../lib/decorators/unhandledRejection');
	var PromiseConstructor = unhandledRejections(require('../lib/Promise'));

	module.exports = typeof global != 'undefined' ? (global.Promise = PromiseConstructor)
		           : typeof self   != 'undefined' ? (self.Promise   = PromiseConstructor)
		           : PromiseConstructor;

	},{"../lib/Promise":2,"../lib/decorators/unhandledRejection":4}],2:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function (require) {

		var makePromise = require('./makePromise');
		var Scheduler = require('./Scheduler');
		var async = require('./env').asap;

		return makePromise({
			scheduler: new Scheduler(async)
		});

	});
	})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

	},{"./Scheduler":3,"./env":5,"./makePromise":7}],3:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.

		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._running = false;

			this._queue = this;
			this._queueLen = 0;
			this._afterQueue = {};
			this._afterQueueLen = 0;

			var self = this;
			this.drain = function() {
				self._drain();
			};
		}

		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._queue[this._queueLen++] = task;
			this.run();
		};

		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._afterQueue[this._afterQueueLen++] = task;
			this.run();
		};

		Scheduler.prototype.run = function() {
			if (!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};

		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			var i = 0;
			for (; i < this._queueLen; ++i) {
				this._queue[i].run();
				this._queue[i] = void 0;
			}

			this._queueLen = 0;
			this._running = false;

			for (i = 0; i < this._afterQueueLen; ++i) {
				this._afterQueue[i].run();
				this._afterQueue[i] = void 0;
			}

			this._afterQueueLen = 0;
		};

		return Scheduler;

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}],4:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function(require) {

		var setTimer = require('../env').setTimer;
		var format = require('../format');

		return function unhandledRejection(Promise) {

			var logError = noop;
			var logInfo = noop;
			var localConsole;

			if(typeof console !== 'undefined') {
				// Alias console to prevent things like uglify's drop_console option from
				// removing console.log/error. Unhandled rejections fall into the same
				// category as uncaught exceptions, and build tools shouldn't silence them.
				localConsole = console;
				logError = typeof localConsole.error !== 'undefined'
					? function (e) { localConsole.error(e); }
					: function (e) { localConsole.log(e); };

				logInfo = typeof localConsole.info !== 'undefined'
					? function (e) { localConsole.info(e); }
					: function (e) { localConsole.log(e); };
			}

			Promise.onPotentiallyUnhandledRejection = function(rejection) {
				enqueue(report, rejection);
			};

			Promise.onPotentiallyUnhandledRejectionHandled = function(rejection) {
				enqueue(unreport, rejection);
			};

			Promise.onFatalRejection = function(rejection) {
				enqueue(throwit, rejection.value);
			};

			var tasks = [];
			var reported = [];
			var running = null;

			function report(r) {
				if(!r.handled) {
					reported.push(r);
					logError('Potentially unhandled rejection [' + r.id + '] ' + format.formatError(r.value));
				}
			}

			function unreport(r) {
				var i = reported.indexOf(r);
				if(i >= 0) {
					reported.splice(i, 1);
					logInfo('Handled previous rejection [' + r.id + '] ' + format.formatObject(r.value));
				}
			}

			function enqueue(f, x) {
				tasks.push(f, x);
				if(running === null) {
					running = setTimer(flush, 0);
				}
			}

			function flush() {
				running = null;
				while(tasks.length > 0) {
					tasks.shift()(tasks.shift());
				}
			}

			return Promise;
		};

		function throwit(e) {
			throw e;
		}

		function noop() {}

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

	},{"../env":5,"../format":6}],5:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	/*global process,document,setTimeout,clearTimeout,MutationObserver,WebKitMutationObserver*/
	(function(define) { 'use strict';
	define(function(require) {
		/*jshint maxcomplexity:6*/

		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// setTimeout, and finally vertx, since its the only env that doesn't
		// have setTimeout

		var MutationObs;
		var capturedSetTimeout = typeof setTimeout !== 'undefined' && setTimeout;

		// Default env
		var setTimer = function(f, ms) { return setTimeout(f, ms); };
		var clearTimer = function(t) { return clearTimeout(t); };
		var asap = function (f) { return capturedSetTimeout(f, 0); };

		// Detect specific env
		if (isNode()) { // Node
			asap = function (f) { return process.nextTick(f); };

		} else if (MutationObs = hasMutationObserver()) { // Modern browser
			asap = initMutationObserver(MutationObs);

		} else if (!capturedSetTimeout) { // vert.x
			var vertxRequire = require;
			var vertx = vertxRequire('vertx');
			setTimer = function (f, ms) { return vertx.setTimer(ms, f); };
			clearTimer = vertx.cancelTimer;
			asap = vertx.runOnLoop || vertx.runOnContext;
		}

		return {
			setTimer: setTimer,
			clearTimer: clearTimer,
			asap: asap
		};

		function isNode () {
			return typeof process !== 'undefined' &&
				Object.prototype.toString.call(process) === '[object process]';
		}

		function hasMutationObserver () {
			return (typeof MutationObserver === 'function' && MutationObserver) ||
				(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver);
		}

		function initMutationObserver(MutationObserver) {
			var scheduled;
			var node = document.createTextNode('');
			var o = new MutationObserver(run);
			o.observe(node, { characterData: true });

			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}

			var i = 0;
			return function (f) {
				scheduled = f;
				node.data = (i ^= 1);
			};
		}
	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

	},{}],6:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		return {
			formatError: formatError,
			formatObject: formatObject,
			tryStringify: tryStringify
		};

		/**
		 * Format an error into a string.  If e is an Error and has a stack property,
		 * it's returned.  Otherwise, e is formatted using formatObject, with a
		 * warning added about e not being a proper Error.
		 * @param {*} e
		 * @returns {String} formatted string, suitable for output to developers
		 */
		function formatError(e) {
			var s = typeof e === 'object' && e !== null && (e.stack || e.message) ? e.stack || e.message : formatObject(e);
			return e instanceof Error ? s : s + ' (WARNING: non-Error used)';
		}

		/**
		 * Format an object, detecting "plain" objects and running them through
		 * JSON.stringify if possible.
		 * @param {Object} o
		 * @returns {string}
		 */
		function formatObject(o) {
			var s = String(o);
			if(s === '[object Object]' && typeof JSON !== 'undefined') {
				s = tryStringify(o, s);
			}
			return s;
		}

		/**
		 * Try to return the result of JSON.stringify(x).  If that fails, return
		 * defaultValue
		 * @param {*} x
		 * @param {*} defaultValue
		 * @returns {String|*} JSON.stringify(x) or defaultValue
		 */
		function tryStringify(x, defaultValue) {
			try {
				return JSON.stringify(x);
			} catch(e) {
				return defaultValue;
			}
		}

	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}],7:[function(require,module,exports){
	/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */

	(function(define) { 'use strict';
	define(function() {

		return function makePromise(environment) {

			var tasks = environment.scheduler;
			var emitRejection = initEmitRejection();

			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};

			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}

			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();

				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}

				return handler;

				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}

				/**
				 * @deprecated
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}

			// Creation

			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;

			Promise._defer = defer;
			Promise._handler = getHandler;

			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}

			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}

			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}

			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}

			// Transformation and flow control

			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @param {function=} onProgress @deprecated progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected, onProgress) {
				var parent = this._handler;
				var state = parent.join().state();

				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}

				var p = this._beget();
				var child = p._handler;

				parent.chain(child, parent.receiver, onFulfilled, onRejected, onProgress);

				return p;
			};

			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};

			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				return begetFrom(this._handler, this.constructor);
			};

			function begetFrom(parent, Promise) {
				var child = new Pending(parent.receiver, parent.join().context);
				return new Promise(Handler, child);
			}

			// Array combinators

			Promise.all = all;
			Promise.race = race;
			Promise._traverse = traverse;

			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				return traverseWith(snd, null, promises);
			}

			/**
			 * Array<Promise<X>> -> Promise<Array<f(X)>>
			 * @private
			 * @param {function} f function to apply to each promise's value
			 * @param {Array} promises array of promises
			 * @returns {Promise} promise for transformed values
			 */
			function traverse(f, promises) {
				return traverseWith(tryCatch2, f, promises);
			}

			function traverseWith(tryMap, f, promises) {
				var handler = typeof f === 'function' ? mapAt : settleAt;

				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);

				for (var i = 0, x; i < promises.length && !resolver.resolved; ++i) {
					x = promises[i];

					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}

					traverseAt(promises, handler, i, x, resolver);
				}

				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}

				return new Promise(Handler, resolver);

				function mapAt(i, x, resolver) {
					if(!resolver.resolved) {
						traverseAt(promises, settleAt, i, tryMap(f, x, i), resolver);
					}
				}

				function settleAt(i, x, resolver) {
					results[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(results));
					}
				}
			}

			function traverseAt(promises, handler, i, x, resolver) {
				if (maybeThenable(x)) {
					var h = getHandlerMaybeThenable(x);
					var s = h.state();

					if (s === 0) {
						h.fold(handler, i, void 0, resolver);
					} else if (s > 0) {
						handler(i, h.value, resolver);
					} else {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
					}
				} else {
					handler(i, x, resolver);
				}
			}

			Promise._visitRemaining = visitRemaining;
			function visitRemaining(promises, start, handler) {
				for(var i=start; i<promises.length; ++i) {
					markAsHandled(getHandler(promises[i]), handler);
				}
			}

			function markAsHandled(h, handler) {
				if(h === handler) {
					return;
				}

				var s = h.state();
				if(s === 0) {
					h.visit(h, void 0, h._unreport);
				} else if(s < 0) {
					h._unreport();
				}
			}

			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				if(typeof promises !== 'object' || promises === null) {
					return reject(new TypeError('non-iterable passed to race()'));
				}

				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				return promises.length === 0 ? never()
					 : promises.length === 1 ? resolve(promises[0])
					 : runRace(promises);
			}

			function runRace(promises) {
				var resolver = new Pending();
				var i, x, h;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x === void 0 && !(i in promises)) {
						continue;
					}

					h = getHandler(x);
					if(h.state() !== 0) {
						resolver.become(h);
						visitRemaining(promises, i+1, h);
						break;
					} else {
						h.visit(resolver, resolver.resolve, resolver.reject);
					}
				}
				return new Promise(Handler, resolver);
			}

			// Promise internals
			// Below this, everything is @private

			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}

			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}

			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}

			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}

			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify // deprecated
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;

			Handler.prototype._state = 0;

			Handler.prototype.state = function() {
				return this._state;
			};

			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};

			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};

			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};

			Handler.prototype.fold = function(f, z, c, to) {
				this.when(new Fold(f, z, c, to));
			};

			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}

			inherit(Handler, FailIfRejected);

			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};

			var failIfRejected = new FailIfRejected();

			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);

				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}

			inherit(Handler, Pending);

			Pending.prototype._state = 0;

			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};

			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}

				this.become(new Rejected(x));
			};

			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}

				var h = this;

				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}

				return h;
			};

			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.handler;
				this.handler = this.handler.join();
				this.consumers = void 0;

				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};

			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}

				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}

				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};

			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};

			/**
			 * @deprecated
			 */
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};

			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};

			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};

			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};

			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}

			inherit(Handler, Async);

			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};

			Async.prototype._report = function(context) {
				this.join()._report(context);
			};

			Async.prototype._unreport = function() {
				this.join()._unreport();
			};

			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}

			inherit(Pending, Thenable);

			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}

			inherit(Handler, Fulfilled);

			Fulfilled.prototype._state = 1;

			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};

			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};

			var errorId = 0;

			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);

				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;

				this._report();
			}

			inherit(Handler, Rejected);

			Rejected.prototype._state = -1;

			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};

			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};

			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};

			Rejected.prototype._unreport = function() {
				if(this.handled) {
					return;
				}
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};

			Rejected.prototype.fail = function(context) {
				this.reported = true;
				emitRejection('unhandledRejection', this);
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};

			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}

			ReportTask.prototype.run = function() {
				if(!this.rejection.handled && !this.rejection.reported) {
					this.rejection.reported = true;
					emitRejection('unhandledRejection', this.rejection) ||
						Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};

			function UnreportTask(rejection) {
				this.rejection = rejection;
			}

			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					emitRejection('rejectionHandled', this.rejection) ||
						Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};

			// Unhandled rejection hooks
			// By default, everything is a noop

			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;

			// Errors and singletons

			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}

			// Task runners

			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}

			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};

			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}

			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}

				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};

			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}

			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};

			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}

			/**
			 * Fold a handler value with z
			 * @constructor
			 */
			function Fold(f, z, c, to) {
				this.f = f; this.z = z; this.c = c; this.to = to;
				this.resolver = failIfRejected;
				this.receiver = this;
			}

			Fold.prototype.fulfilled = function(x) {
				this.f.call(this.c, this.z, x, this.to);
			};

			Fold.prototype.rejected = function(x) {
				this.to.reject(x);
			};

			Fold.prototype.progress = function(x) {
				this.to.notify(x);
			};

			// Other helpers

			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}

			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}

			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}

			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}

				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}

			/**
			 * @deprecated
			 */
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}

				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}

			function tryCatch2(f, a, b) {
				try {
					return f(a, b);
				} catch(e) {
					return reject(e);
				}
			}

			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}

			/**
			 * @deprecated
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}

			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}

			function snd(x, y) {
				return y;
			}

			function noop() {}

			function initEmitRejection() {
				/*global process, self, CustomEvent*/
				if(typeof process !== 'undefined' && process !== null
					&& typeof process.emit === 'function') {
					// Returning falsy here means to call the default
					// onPotentiallyUnhandledRejection API.  This is safe even in
					// browserify since process.emit always returns falsy in browserify:
					// https://github.com/defunctzombie/node-process/blob/master/browser.js#L40-L46
					return function(type, rejection) {
						return type === 'unhandledRejection'
							? process.emit(type, rejection.value, rejection)
							: process.emit(type, rejection);
					};
				} else if(typeof self !== 'undefined' && typeof CustomEvent === 'function') {
					return (function(noop, self, CustomEvent) {
						var hasCustomEvent = false;
						try {
							var ev = new CustomEvent('unhandledRejection');
							hasCustomEvent = ev instanceof CustomEvent;
						} catch (e) {}

						return !hasCustomEvent ? noop : function(type, rejection) {
							var ev = new CustomEvent(type, {
								detail: {
									reason: rejection.value,
									key: rejection
								},
								bubbles: false,
								cancelable: true
							});

							return !self.dispatchEvent(ev);
						};
					}(noop, self, CustomEvent));
				}

				return noop;
			}

			return Promise;
		};
	});
	}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

	},{}]},{},[1])
	//# sourceMappingURL=Promise.js.map
	(1)
	});
	;if (typeof systemJSBootstrap !== 'undefined')
	  systemJSBootstrap();})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS v0.19.41
	 */
	!function(e){function t(e,n){if("string"!=typeof e)throw new TypeError("URL must be a string");var r=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!r)throw new RangeError("Invalid URL format");var a=r[1]||"",o=r[2]||"",i=r[3]||"",s=r[4]||"",d=r[5]||"",l=r[6]||"",u=r[7]||"",c=r[8]||"",f=r[9]||"";if(void 0!==n){var m=n instanceof t?n:new t(n),p=!a&&!s&&!o;!p||u||c||(c=m.search),p&&"/"!==u[0]&&(u=u?(!m.host&&!m.username||m.pathname?"":"/")+m.pathname.slice(0,m.pathname.lastIndexOf("/")+1)+u:m.pathname);var h=[];u.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?h.pop():h.push(e)}),u=h.join("").replace(/^\//,"/"===u[0]?"/":""),p&&(l=m.port,d=m.hostname,s=m.host,i=m.password,o=m.username),a||(a=m.protocol)}u=u.replace(/\\/g,"/"),this.origin=s?a+(""!==a||""!==s?"//":"")+s:"",this.href=a+(a&&s||"file:"==a?"//":"")+(""!==o?o+(""!==i?":"+i:"")+"@":"")+s+u+c+f,this.protocol=a,this.username=o,this.password=i,this.host=s,this.hostname=d,this.port=l,this.pathname=u,this.search=c,this.hash=f}e.URLPolyfill=t}("undefined"!=typeof self?self:global),function(e){function t(e,t){if(!e.originalErr)for(var n=((e.message||e)+(e.stack?"\n"+e.stack:"")).toString().split("\n"),r=[],a=0;a<n.length;a++)"undefined"!=typeof $__curScript&&n[a].indexOf($__curScript.src)!=-1||r.push(n[a]);var o="(SystemJS) "+(r?r.join("\n\t"):e.message.substr(11))+"\n\t"+t;y||(o=o.replace(b?/file:\/\/\//g:/file:\/\//g,""));var i=E?new Error(o,e.fileName,e.lineNumber):new Error(o);return i.stack=o,i.originalErr=e.originalErr||e,i}function n(){}function r(t){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},w(this,"global",{get:function(){return e}})}function a(){r.call(this),this.paths={},this._loader.paths={},k.call(this)}function o(){}function i(e,t){a.prototype[e]=t(a.prototype[e]||function(){})}function s(e){k=e(k||function(){})}function d(e){return"."==e[0]&&(!e[1]||"/"==e[1]||"."==e[1])||"/"==e[0]}function l(e,t){if("."==e[0]){if("/"==e[1]&&"."!=e[2])return(t&&t.substr(0,t.lastIndexOf("/")+1)||S)+e.substr(2)}else if("/"!=e[0]&&e.indexOf(":")==-1)return(t&&t.substr(0,t.lastIndexOf("/")+1)||S)+e;return new P(e,t&&t.replace(/#/g,"%05")||I).href.replace(/%05/g,"#")}function u(e,t){var n,r="",a=0,o=e.paths,i=e._loader.paths;for(var s in o)if(!o.hasOwnProperty||o.hasOwnProperty(s)){var u=o[s];if(u!==i[s]&&(u=o[s]=i[s]=l(o[s],d(o[s])?S:e.baseURL)),s.indexOf("*")===-1){if(t==s)return o[s];if(t.substr(0,s.length-1)==s.substr(0,s.length-1)&&(t.length<s.length||t[s.length-1]==s[s.length-1])&&("/"==o[s][o[s].length-1]||""==o[s]))return o[s].substr(0,o[s].length-1)+(t.length>s.length?(o[s]&&"/"||"")+t.substr(s.length):"")}else{var c=s.split("*");if(c.length>2)throw new TypeError("Only one wildcard in a path is permitted");var f=c[0].length;f>=a&&t.substr(0,c[0].length)==c[0]&&t.substr(t.length-c[1].length)==c[1]&&(a=f,r=s,n=t.substr(c[0].length,t.length-c[1].length-c[0].length))}}var m=o[r];return"string"==typeof n&&(m=m.replace("*",n)),m}function c(e){for(var t=[],n=[],r=0,a=e.length;r<a;r++){var o=x.call(t,e[r]);o===-1?(t.push(e[r]),n.push([r])):n[o].push(r)}return{names:t,indices:n}}function f(t){var n={};if(("object"==typeof t||"function"==typeof t)&&t!==e)if(R)for(var r in t)"default"!==r&&m(n,t,r);else p(n,t);return n.default=t,w(n,"__useDefault",{value:!0}),n}function m(e,t,n){try{var r;(r=Object.getOwnPropertyDescriptor(t,n))&&w(e,n,r)}catch(r){return e[n]=t[n],!1}}function p(e,t,n){var r=t&&t.hasOwnProperty;for(var a in t)r&&!t.hasOwnProperty(a)||n&&a in e||(e[a]=t[a]);return e}function h(e){var t=e.match(z);return t&&"System.register"==e.substr(t[0].length,15)}function g(){return{name:null,deps:null,originalIndices:null,declare:null,execute:null,executingRequire:!1,declarative:!1,normalizedDeps:null,groupIndex:null,evaluated:!1,module:null,esModule:null,esmExports:!1}}var v="undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,y="undefined"!=typeof window&&"undefined"!=typeof document,b="undefined"!=typeof process&&"undefined"!=typeof process.platform&&!!process.platform.match(/^win/);e.console||(e.console={assert:function(){}});var w,x=Array.prototype.indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(this[t]===e)return t;return-1};!function(){try{Object.defineProperty({},"a",{})&&(w=Object.defineProperty)}catch(e){w=function(e,t,n){try{e[t]=n.value||n.get.call(e)}catch(e){}}}}();var S,E="_"==new Error(0,"_").fileName;if("undefined"!=typeof document&&document.getElementsByTagName){if(S=document.baseURI,!S){var O=document.getElementsByTagName("base");S=O[0]&&O[0].href||window.location.href}}else"undefined"!=typeof location&&(S=e.location.href);if(S)S=S.split("#")[0].split("?")[0],S=S.substr(0,S.lastIndexOf("/")+1);else{if("undefined"==typeof process||!process.cwd)throw new TypeError("No environment baseURI");S="file://"+(b?"/":"")+process.cwd()+"/",b&&(S=S.replace(/\\/g,"/"))}try{var _="test:"==new e.URL("test:///").protocol}catch(e){}var P=_?e.URL:e.URLPolyfill;w(n.prototype,"toString",{value:function(){return"Module"}}),function(){function e(e){return{status:"loading",name:e||"<Anonymous"+ ++b+">",linkSets:[],dependencies:[],metadata:{}}}function a(e,t,n){return new Promise(l({step:n.address?"fetch":"locate",loader:e,moduleName:t,moduleMetadata:n&&n.metadata||{},moduleSource:n.source,moduleAddress:n.address}))}function o(t,n,r,a){return new Promise(function(e,o){e(t.loaderObj.normalize(n,r,a))}).then(function(n){var r;if(t.modules[n])return r=e(n),r.status="linked",r.module=t.modules[n],r;for(var a=0,o=t.loads.length;a<o;a++)if(r=t.loads[a],r.name==n)return r;return r=e(n),t.loads.push(r),i(t,r),r})}function i(e,t){s(e,t,Promise.resolve().then(function(){return e.loaderObj.locate({name:t.name,metadata:t.metadata})}))}function s(e,t,n){d(e,t,n.then(function(n){if("loading"==t.status)return t.address=n,e.loaderObj.fetch({name:t.name,metadata:t.metadata,address:n})}))}function d(e,t,n){n.then(function(n){if("loading"==t.status)return t.address=t.address||t.name,Promise.resolve(e.loaderObj.translate({name:t.name,metadata:t.metadata,address:t.address,source:n})).then(function(n){return t.source=n,e.loaderObj.instantiate({name:t.name,metadata:t.metadata,address:t.address,source:n})}).then(function(e){if(void 0===e)throw new TypeError("Declarative modules unsupported in the polyfill.");if("object"!=typeof e)throw new TypeError("Invalid instantiate return value");t.depsList=e.deps||[],t.execute=e.execute}).then(function(){t.dependencies=[];for(var n=t.depsList,r=[],a=0,i=n.length;a<i;a++)(function(n,a){r.push(o(e,n,t.name,t.address).then(function(e){if(t.dependencies[a]={key:n,value:e.name},"linked"!=e.status)for(var r=t.linkSets.concat([]),o=0,i=r.length;o<i;o++)c(r[o],e)}))})(n[a],a);return Promise.all(r)}).then(function(){t.status="loaded";for(var e=t.linkSets.concat([]),n=0,r=e.length;n<r;n++)m(e[n],t)})}).catch(function(e){t.status="failed",t.exception=e;for(var n=t.linkSets.concat([]),r=0,a=n.length;r<a;r++)p(n[r],t,e)})}function l(t){return function(n,r){var a=t.loader,o=t.moduleName,l=t.step;if(a.modules[o])throw new TypeError('"'+o+'" already exists in the module table');for(var c,f=0,m=a.loads.length;f<m;f++)if(a.loads[f].name==o&&(c=a.loads[f],"translate"!=l||c.source||(c.address=t.moduleAddress,d(a,c,Promise.resolve(t.moduleSource))),c.linkSets.length&&c.linkSets[0].loads[0].name==c.name))return c.linkSets[0].done.then(function(){n(c)});var p=c||e(o);p.metadata=t.moduleMetadata;var h=u(a,p);a.loads.push(p),n(h.done),"locate"==l?i(a,p):"fetch"==l?s(a,p,Promise.resolve(t.moduleAddress)):(p.address=t.moduleAddress,d(a,p,Promise.resolve(t.moduleSource)))}}function u(e,t){var n={loader:e,loads:[],startingLoad:t,loadingCount:0};return n.done=new Promise(function(e,t){n.resolve=e,n.reject=t}),c(n,t),n}function c(e,t){if("failed"!=t.status){for(var n=0,r=e.loads.length;n<r;n++)if(e.loads[n]==t)return;e.loads.push(t),t.linkSets.push(e),"loaded"!=t.status&&e.loadingCount++;for(var a=e.loader,n=0,r=t.dependencies.length;n<r;n++)if(t.dependencies[n]){var o=t.dependencies[n].value;if(!a.modules[o])for(var i=0,s=a.loads.length;i<s;i++)if(a.loads[i].name==o){c(e,a.loads[i]);break}}}}function f(e){var t=!1;try{y(e,function(n,r){p(e,n,r),t=!0})}catch(n){p(e,null,n),t=!0}return t}function m(e,t){if(e.loadingCount--,!(e.loadingCount>0)){var n=e.startingLoad;if(e.loader.loaderObj.execute===!1){for(var r=[].concat(e.loads),a=0,o=r.length;a<o;a++){var t=r[a];t.module={name:t.name,module:S({}),evaluated:!0},t.status="linked",h(e.loader,t)}return e.resolve(n)}var i=f(e);i||e.resolve(n)}}function p(e,n,r){var a=e.loader;e:if(n)if(e.loads[0].name==n.name)r=t(r,"Error loading "+n.name);else{for(var o=0;o<e.loads.length;o++)for(var i=e.loads[o],s=0;s<i.dependencies.length;s++){var d=i.dependencies[s];if(d.value==n.name){r=t(r,"Error loading "+n.name+' as "'+d.key+'" from '+i.name);break e}}r=t(r,"Error loading "+n.name+" from "+e.loads[0].name)}else r=t(r,"Error linking "+e.loads[0].name);for(var l=e.loads.concat([]),o=0,u=l.length;o<u;o++){var n=l[o];a.loaderObj.failed=a.loaderObj.failed||[],x.call(a.loaderObj.failed,n)==-1&&a.loaderObj.failed.push(n);var c=x.call(n.linkSets,e);if(n.linkSets.splice(c,1),0==n.linkSets.length){var f=x.call(e.loader.loads,n);f!=-1&&e.loader.loads.splice(f,1)}}e.reject(r)}function h(e,t){if(e.loaderObj.trace){e.loaderObj.loads||(e.loaderObj.loads={});var n={};t.dependencies.forEach(function(e){n[e.key]=e.value}),e.loaderObj.loads[t.name]={name:t.name,deps:t.dependencies.map(function(e){return e.key}),depMap:n,address:t.address,metadata:t.metadata,source:t.source}}t.name&&(e.modules[t.name]=t.module);var r=x.call(e.loads,t);r!=-1&&e.loads.splice(r,1);for(var a=0,o=t.linkSets.length;a<o;a++)r=x.call(t.linkSets[a].loads,t),r!=-1&&t.linkSets[a].loads.splice(r,1);t.linkSets.splice(0,t.linkSets.length)}function g(e,t,r){try{var a=t.execute()}catch(e){return void r(t,e)}return a&&a instanceof n?a:void r(t,new TypeError("Execution must define a Module instance"))}function v(e,t,n){var r=e._loader.importPromises;return r[t]=n.then(function(e){return r[t]=void 0,e},function(e){throw r[t]=void 0,e})}function y(e,t){var n=e.loader;if(e.loads.length)for(var r=e.loads.concat([]),a=0;a<r.length;a++){var o=r[a],i=g(e,o,t);if(!i)return;o.module={name:o.name,module:i},o.status="linked",h(n,o)}}var b=0;r.prototype={constructor:r,define:function(e,t,n){if(this._loader.importPromises[e])throw new TypeError("Module is already loading.");return v(this,e,new Promise(l({step:"translate",loader:this._loader,moduleName:e,moduleMetadata:n&&n.metadata||{},moduleSource:t,moduleAddress:n&&n.address})))},delete:function(e){var t=this._loader;return delete t.importPromises[e],delete t.moduleRecords[e],!!t.modules[e]&&delete t.modules[e]},get:function(e){if(this._loader.modules[e])return this._loader.modules[e].module},has:function(e){return!!this._loader.modules[e]},import:function(e,t,n){"object"==typeof t&&(t=t.name);var r=this;return Promise.resolve(r.normalize(e,t)).then(function(e){var t=r._loader;return t.modules[e]?t.modules[e].module:t.importPromises[e]||v(r,e,a(t,e,{}).then(function(n){return delete t.importPromises[e],n.module.module}))})},load:function(e){var t=this._loader;return t.modules[e]?Promise.resolve():t.importPromises[e]||v(this,e,new Promise(l({step:"locate",loader:t,moduleName:e,moduleMetadata:{},moduleSource:void 0,moduleAddress:void 0})).then(function(){delete t.importPromises[e]}))},module:function(t,n){var r=e();r.address=n&&n.address;var a=u(this._loader,r),o=Promise.resolve(t),i=this._loader,s=a.done.then(function(){return r.module.module});return d(i,r,o),s},newModule:function(e){if("object"!=typeof e)throw new TypeError("Expected object");var t=new n,r=[];if(Object.getOwnPropertyNames&&null!=e)r=Object.getOwnPropertyNames(e);else for(var a in e)r.push(a);for(var o=0;o<r.length;o++)(function(n){w(t,n,{configurable:!1,enumerable:!0,get:function(){return e[n]},set:function(){throw new Error("Module exports cannot be changed externally.")}})})(r[o]);return Object.freeze&&Object.freeze(t),t},set:function(e,t){if(!(t instanceof n))throw new TypeError("Loader.set("+e+", module) must be a module");this._loader.modules[e]={module:t}},normalize:function(e,t,n){},locate:function(e){return e.name},fetch:function(e){},translate:function(e){return e.source},instantiate:function(e){}};var S=r.prototype.newModule}();var j;o.prototype=r.prototype,a.prototype=new o,a.prototype.constructor=a;var k,M=/^[^\/]+:\/\//,I=new P(S),R=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(e){R=!1}var M=/^([^\/]+:\/\/|\/)/;a.prototype.normalize=function(e,t,n){return e=e.match(M)||"."==e[0]?new P(e,t||S).href:new P(u(this,e)||e,S).href},function(){function t(){if(s&&"interactive"===s.script.readyState)return s.load;for(var e=0;e<u.length;e++)if("interactive"==u[e].script.readyState)return s=u[e],s.load}function n(e,t){return new Promise(function(e,n){t.metadata.integrity&&n(new Error("Subresource integrity checking is not supported in web workers.")),d=t;try{importScripts(t.address)}catch(e){d=null,n(e)}d=null,t.metadata.entry||n(new Error(t.address+" did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.")),e("")})}if("undefined"!=typeof document)var r=document.getElementsByTagName("head")[0];var a,o,s,d=null,l=r&&function(){var e=document.createElement("script"),t="undefined"!=typeof opera&&"[object Opera]"===opera.toString();return e.attachEvent&&!(e.attachEvent.toString&&e.attachEvent.toString().indexOf("[native code")<0)&&!t}(),u=[],c=0,f=[];i("pushRegister_",function(e){return function(n){return!e.call(this,n)&&(d?this.reduceRegister_(d,n):l?this.reduceRegister_(t(),n):c?f.push(n):this.reduceRegister_(null,n),!0)}}),i("fetch",function(t){return function(i){var d=this;return"json"!=i.metadata.format&&i.metadata.scriptLoad&&(y||v)?v?n(d,i):new Promise(function(t,n){function m(e){if(!g.readyState||"loaded"==g.readyState||"complete"==g.readyState){if(c--,i.metadata.entry||f.length){if(!l){for(var r=0;r<f.length;r++)d.reduceRegister_(i,f[r]);f=[]}}else d.reduceRegister_(i);h(),i.metadata.entry||i.metadata.bundle||n(new Error(i.name+" did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.")),t("")}}function p(e){h(),n(new Error("Unable to load script "+i.address))}function h(){if(e.System=a,e.require=o,g.detachEvent){g.detachEvent("onreadystatechange",m);for(var t=0;t<u.length;t++)u[t].script==g&&(s&&s.script==g&&(s=null),u.splice(t,1))}else g.removeEventListener("load",m,!1),g.removeEventListener("error",p,!1);r.removeChild(g)}var g=document.createElement("script");g.async=!0,i.metadata.crossOrigin&&(g.crossOrigin=i.metadata.crossOrigin),i.metadata.integrity&&g.setAttribute("integrity",i.metadata.integrity),l?(g.attachEvent("onreadystatechange",m),u.push({script:g,load:i})):(g.addEventListener("load",m,!1),g.addEventListener("error",p,!1)),c++,a=e.System,o=e.require,g.src=i.address,r.appendChild(g)}):t.call(this,i)}})}();var z=/^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;!function(){function t(e,n,r){if(r[e.groupIndex]=r[e.groupIndex]||[],x.call(r[e.groupIndex],e)==-1){r[e.groupIndex].push(e);for(var a=0,o=e.normalizedDeps.length;a<o;a++){var i=e.normalizedDeps[a],s=n.defined[i];if(s&&!s.evaluated){var d=e.groupIndex+(s.declarative!=e.declarative);if(null===s.groupIndex||s.groupIndex<d){if(null!==s.groupIndex&&(r[s.groupIndex].splice(x.call(r[s.groupIndex],s),1),0==r[s.groupIndex].length))throw new Error("Mixed dependency cycle detected");s.groupIndex=d}t(s,n,r)}}}}function r(e,n,r){if(!n.module){n.groupIndex=0;var a=[];t(n,r,a);for(var o=!!n.declarative==a.length%2,i=a.length-1;i>=0;i--){for(var s=a[i],d=0;d<s.length;d++){var u=s[d];o?l(u,r):m(u,r)}o=!o}}}function o(){}function d(e,t){return t[e]||(t[e]={name:e,dependencies:[],exports:new o,importers:[]})}function l(t,n){if(!t.module){var r=n._loader.moduleRecords,a=t.module=d(t.name,r),o=t.module.exports,i=t.declare.call(e,function(e,t){if(a.locked=!0,"object"==typeof e)for(var n in e)o[n]=e[n];else o[e]=t;for(var r=0,i=a.importers.length;r<i;r++){var s=a.importers[r];if(!s.locked){var d=x.call(s.dependencies,a),l=s.setters[d];l&&l(o)}}return a.locked=!1,t},{id:t.name});if("function"==typeof i&&(i={setters:[],execute:i}),i=i||{setters:[],execute:function(){}},a.setters=i.setters,a.execute=i.execute,!a.setters||!a.execute)throw new TypeError("Invalid System.register form for "+t.name);for(var s=0,u=t.normalizedDeps.length;s<u;s++){var c,f=t.normalizedDeps[s],m=n.defined[f],p=r[f];p?c=p.exports:m&&!m.declarative?c=m.esModule:m?(l(m,n),p=m.module,c=p.exports):c=n.get(f),p&&p.importers?(p.importers.push(a),a.dependencies.push(p)):a.dependencies.push(null);for(var h=t.originalIndices[s],g=0,v=h.length;g<v;++g){var y=h[g];a.setters[y]&&a.setters[y](c)}}}}function u(e,t){var n,r=t.defined[e];if(r)r.declarative?p(e,r,[],t):r.evaluated||m(r,t),n=r.module.exports;else if(n=t.get(e),!n)throw new Error("Unable to load dependency "+e+".");return(!r||r.declarative)&&n&&n.__useDefault?n.default:n}function m(t,r){if(!t.module){var a={},o=t.module={exports:a,id:t.name};if(!t.executingRequire)for(var i=0,s=t.normalizedDeps.length;i<s;i++){var d=t.normalizedDeps[i],l=r.defined[d];l&&m(l,r)}t.evaluated=!0;var c=t.execute.call(e,function(e){for(var n=0,a=t.deps.length;n<a;n++)if(t.deps[n]==e)return u(t.normalizedDeps[n],r);var o=r.normalizeSync(e,t.name);if(x.call(t.normalizedDeps,o)!=-1)return u(o,r);throw new Error("Module "+e+" not declared as a dependency of "+t.name)},a,o);void 0!==c&&(o.exports=c),a=o.exports,a&&(a.__esModule||a instanceof n)?t.esModule=r.newModule(a):t.esmExports&&a!==e?t.esModule=r.newModule(f(a)):t.esModule=r.newModule({default:a,__useDefault:!0})}}function p(t,n,r,a){if(n&&!n.evaluated&&n.declarative){r.push(t);for(var o=0,i=n.normalizedDeps.length;o<i;o++){var s=n.normalizedDeps[o];x.call(r,s)==-1&&(a.defined[s]?p(s,a.defined[s],r,a):a.get(s))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}a.prototype.register=function(e,t,n){if("string"!=typeof e&&(n=t,t=e,e=null),"boolean"==typeof n)return this.registerDynamic.apply(this,arguments);var r=g();r.name=e&&(this.decanonicalize||this.normalize).call(this,e),r.declarative=!0,r.deps=t,r.declare=n,this.pushRegister_({amd:!1,entry:r})},a.prototype.registerDynamic=function(e,t,n,r){"string"!=typeof e&&(r=n,n=t,t=e,e=null);var a=g();a.name=e&&(this.decanonicalize||this.normalize).call(this,e),a.deps=t,a.execute=r,a.executingRequire=n,this.pushRegister_({amd:!1,entry:a})},i("reduceRegister_",function(){return function(e,t){if(t){var n=t.entry,r=e&&e.metadata;if(n.name&&(n.name in this.defined||(this.defined[n.name]=n),r&&(r.bundle=!0)),!n.name||e&&!r.entry&&n.name==e.name){if(!r)throw new TypeError("Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.");if(r.entry)throw"register"==r.format?new Error("Multiple anonymous System.register calls in module "+e.name+". If loading a bundle, ensure all the System.register calls are named."):new Error("Module "+e.name+" interpreted as "+r.format+" module format, but called System.register.");r.format||(r.format="register"),r.entry=n}}}}),s(function(e){return function(){e.call(this),this.defined={},this._loader.moduleRecords={}}}),w(o,"toString",{value:function(){return"Module"}}),i("delete",function(e){return function(t){return delete this._loader.moduleRecords[t],delete this.defined[t],e.call(this,t)}}),i("fetch",function(e){return function(t){return this.defined[t.name]?(t.metadata.format="defined",""):(t.metadata.deps=t.metadata.deps||[],e.call(this,t))}}),i("translate",function(e){return function(t){return t.metadata.deps=t.metadata.deps||[],Promise.resolve(e.apply(this,arguments)).then(function(e){return("register"==t.metadata.format||!t.metadata.format&&h(t.source))&&(t.metadata.format="register"),e})}}),i("load",function(e){return function(t){var n=this,a=n.defined[t];return!a||a.deps.length?e.apply(this,arguments):(a.originalIndices=a.normalizedDeps=[],r(t,a,n),p(t,a,[],n),a.esModule||(a.esModule=n.newModule(a.module.exports)),n.trace||(n.defined[t]=void 0),n.set(t,a.esModule),Promise.resolve())}}),i("instantiate",function(e){return function(t){"detect"==t.metadata.format&&(t.metadata.format=void 0),e.call(this,t);var n,a=this;if(a.defined[t.name])n=a.defined[t.name],n.declarative||(n.deps=n.deps.concat(t.metadata.deps)),n.deps=n.deps.concat(t.metadata.deps);else if(t.metadata.entry)n=t.metadata.entry,n.deps=n.deps.concat(t.metadata.deps);else if(!(a.builder&&t.metadata.bundle||"register"!=t.metadata.format&&"esm"!=t.metadata.format&&"es6"!=t.metadata.format)){if("undefined"!=typeof __exec&&__exec.call(a,t),!t.metadata.entry&&!t.metadata.bundle)throw new Error(t.name+" detected as "+t.metadata.format+" but didn't execute.");n=t.metadata.entry,n&&t.metadata.deps&&(n.deps=n.deps.concat(t.metadata.deps))}n||(n=g(),n.deps=t.metadata.deps,n.execute=function(){}),a.defined[t.name]=n;var o=c(n.deps);n.deps=o.names,n.originalIndices=o.indices,n.name=t.name,n.esmExports=t.metadata.esmExports!==!1;for(var i=[],s=0,d=n.deps.length;s<d;s++)i.push(Promise.resolve(a.normalize(n.deps[s],t.name)));return Promise.all(i).then(function(e){return n.normalizedDeps=e,{deps:n.deps,execute:function(){return r(t.name,n,a),p(t.name,n,[],a),n.esModule||(n.esModule=a.newModule(n.module.exports)),a.trace||(a.defined[t.name]=void 0),n.esModule}}})}})}(),function(){s(function(e){return function(){e.call(this),this.bundles={},this._loader.loadedBundles={}}}),i("locate",function(e){return function(t){var n=this,r=!1;if(!(t.name in n.defined))for(var a in n.bundles){for(var o=0;o<n.bundles[a].length;o++){var i=n.bundles[a][o];if(i==t.name){r=!0;break}if(i.indexOf("*")!=-1){var s=i.split("*");if(2!=s.length){n.bundles[a].splice(o--,1);continue}if(t.name.substring(0,s[0].length)==s[0]&&t.name.substr(t.name.length-s[1].length,s[1].length)==s[1]&&t.name.substr(s[0].length,t.name.length-s[1].length-s[0].length).indexOf("/")==-1){r=!0;break}}}if(r)return n.import(a).then(function(){return e.call(n,t)})}return e.call(n,t)}})}(),s(function(t){return function(){t.apply(this,arguments),e.define=this.amdDefine}}),i("fetch",function(e){return function(t){return t.metadata.scriptLoad=!0,e.call(this,t)}}),j=new a,e.SystemJS=j,j.version="0.19.41 Register Only","object"==typeof module&&module.exports&&"object"==typeof exports&&(module.exports=j),e.System=j}("undefined"!=typeof self?self:global);
	//# sourceMappingURL=system-register-only.js.map

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/*
	 * SystemJS v0.19.41
	 */
	// from https://gist.github.com/Yaffle/1088850
	(function(global) {
	function URLPolyfill(url, baseURL) {
	  if (typeof url != 'string')
	    throw new TypeError('URL must be a string');
	  var m = String(url).replace(/^\s+|\s+$/g, "").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
	  if (!m)
	    throw new RangeError('Invalid URL format');
	  var protocol = m[1] || "";
	  var username = m[2] || "";
	  var password = m[3] || "";
	  var host = m[4] || "";
	  var hostname = m[5] || "";
	  var port = m[6] || "";
	  var pathname = m[7] || "";
	  var search = m[8] || "";
	  var hash = m[9] || "";
	  if (baseURL !== undefined) {
	    var base = baseURL instanceof URLPolyfill ? baseURL : new URLPolyfill(baseURL);
	    var flag = !protocol && !host && !username;
	    if (flag && !pathname && !search)
	      search = base.search;
	    if (flag && pathname[0] !== "/")
	      pathname = (pathname ? (((base.host || base.username) && !base.pathname ? "/" : "") + base.pathname.slice(0, base.pathname.lastIndexOf("/") + 1) + pathname) : base.pathname);
	    // dot segments removal
	    var output = [];
	    pathname.replace(/^(\.\.?(\/|$))+/, "")
	      .replace(/\/(\.(\/|$))+/g, "/")
	      .replace(/\/\.\.$/, "/../")
	      .replace(/\/?[^\/]*/g, function (p) {
	        if (p === "/..")
	          output.pop();
	        else
	          output.push(p);
	      });
	    pathname = output.join("").replace(/^\//, pathname[0] === "/" ? "/" : "");
	    if (flag) {
	      port = base.port;
	      hostname = base.hostname;
	      host = base.host;
	      password = base.password;
	      username = base.username;
	    }
	    if (!protocol)
	      protocol = base.protocol;
	  }

	  // convert URLs to use / always
	  pathname = pathname.replace(/\\/g, '/');

	  this.origin = host ? protocol + (protocol !== "" || host !== "" ? "//" : "") + host : "";
	  this.href = protocol + (protocol && host || protocol == "file:" ? "//" : "") + (username !== "" ? username + (password !== "" ? ":" + password : "") + "@" : "") + host + pathname + search + hash;
	  this.protocol = protocol;
	  this.username = username;
	  this.password = password;
	  this.host = host;
	  this.hostname = hostname;
	  this.port = port;
	  this.pathname = pathname;
	  this.search = search;
	  this.hash = hash;
	}
	global.URLPolyfill = URLPolyfill;
	})(typeof self != 'undefined' ? self : global);(function(__global) {

	  var isWorker = typeof window == 'undefined' && typeof self != 'undefined' && typeof importScripts != 'undefined';
	  var isBrowser = typeof window != 'undefined' && typeof document != 'undefined';
	  var isWindows = typeof process != 'undefined' && typeof process.platform != 'undefined' && !!process.platform.match(/^win/);

	  if (!__global.console)
	    __global.console = { assert: function() {} };

	  // IE8 support
	  var indexOf = Array.prototype.indexOf || function(item) {
	    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
	      if (this[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  };
	  
	  var defineProperty;
	  (function () {
	    try {
	      if (!!Object.defineProperty({}, 'a', {}))
	        defineProperty = Object.defineProperty;
	    }
	    catch (e) {
	      defineProperty = function(obj, prop, opt) {
	        try {
	          obj[prop] = opt.value || opt.get.call(obj);
	        }
	        catch(e) {}
	      }
	    }
	  })();

	  var errArgs = new Error(0, '_').fileName == '_';

	  function addToError(err, msg) {
	    // parse the stack removing loader code lines for simplification
	    if (!err.originalErr) {
	      var stack = ((err.message || err) + (err.stack ? '\n' + err.stack : '')).toString().split('\n');
	      var newStack = [];
	      for (var i = 0; i < stack.length; i++) {
	        if (typeof $__curScript == 'undefined' || stack[i].indexOf($__curScript.src) == -1)
	          newStack.push(stack[i]);
	      }
	    }

	    var newMsg = '(SystemJS) ' + (newStack ? newStack.join('\n\t') : err.message.substr(11)) + '\n\t' + msg;

	    // Convert file:/// URLs to paths in Node
	    if (!isBrowser)
	      newMsg = newMsg.replace(isWindows ? /file:\/\/\//g : /file:\/\//g, '');

	    var newErr = errArgs ? new Error(newMsg, err.fileName, err.lineNumber) : new Error(newMsg);
	    
	    newErr.stack = newMsg;
	        
	    // track the original error
	    newErr.originalErr = err.originalErr || err;

	    return newErr;
	  }

	  function __eval(source, debugName, context) {
	    try {
	      new Function(source).call(context);
	    }
	    catch(e) {
	      throw addToError(e, 'Evaluating ' + debugName);
	    }
	  }

	  var baseURI;

	  // environent baseURI detection
	  if (typeof document != 'undefined' && document.getElementsByTagName) {
	    baseURI = document.baseURI;

	    if (!baseURI) {
	      var bases = document.getElementsByTagName('base');
	      baseURI = bases[0] && bases[0].href || window.location.href;
	    }
	  }
	  else if (typeof location != 'undefined') {
	    baseURI = __global.location.href;
	  }

	  // sanitize out the hash and querystring
	  if (baseURI) {
	    baseURI = baseURI.split('#')[0].split('?')[0];
	    baseURI = baseURI.substr(0, baseURI.lastIndexOf('/') + 1);
	  }
	  else if (typeof process != 'undefined' && process.cwd) {
	    baseURI = 'file://' + (isWindows ? '/' : '') + process.cwd() + '/';
	    if (isWindows)
	      baseURI = baseURI.replace(/\\/g, '/');
	  }
	  else {
	    throw new TypeError('No environment baseURI');
	  }

	  try {
	    var nativeURL = new __global.URL('test:///').protocol == 'test:';
	  }
	  catch(e) {}

	  var URL = nativeURL ? __global.URL : __global.URLPolyfill;

	/*
	*********************************************************************************************

	  Dynamic Module Loader Polyfill

	    - Implemented exactly to the former 2014-08-24 ES6 Specification Draft Rev 27, Section 15
	      http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts#august_24_2014_draft_rev_27

	    - Functions are commented with their spec numbers, with spec differences commented.

	    - Spec bugs are commented in this code with links.

	    - Abstract functions have been combined where possible, and their associated functions
	      commented.

	    - Realm implementation is entirely omitted.

	*********************************************************************************************
	*/

	function Module() {}
	// http://www.ecma-international.org/ecma-262/6.0/#sec-@@tostringtag
	defineProperty(Module.prototype, 'toString', {
	  value: function() {
	    return 'Module';
	  }
	});
	function Loader(options) {
	  this._loader = {
	    loaderObj: this,
	    loads: [],
	    modules: {},
	    importPromises: {},
	    moduleRecords: {}
	  };

	  // 26.3.3.6
	  defineProperty(this, 'global', {
	    get: function() {
	      return __global;
	    }
	  });

	  // 26.3.3.13 realm not implemented
	}

	(function() {

	// Some Helpers

	// logs a linkset snapshot for debugging
	/* function snapshot(loader) {
	  console.log('---Snapshot---');
	  for (var i = 0; i < loader.loads.length; i++) {
	    var load = loader.loads[i];
	    var linkSetLog = '  ' + load.name + ' (' + load.status + '): ';

	    for (var j = 0; j < load.linkSets.length; j++) {
	      linkSetLog += '{' + logloads(load.linkSets[j].loads) + '} ';
	    }
	    console.log(linkSetLog);
	  }
	  console.log('');
	}
	function logloads(loads) {
	  var log = '';
	  for (var k = 0; k < loads.length; k++)
	    log += loads[k].name + (k != loads.length - 1 ? ' ' : '');
	  return log;
	} */


	/* function checkInvariants() {
	  // see https://bugs.ecmascript.org/show_bug.cgi?id=2603#c1

	  var loads = System._loader.loads;
	  var linkSets = [];

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    console.assert(load.status == 'loading' || load.status == 'loaded', 'Each load is loading or loaded');

	    for (var j = 0; j < load.linkSets.length; j++) {
	      var linkSet = load.linkSets[j];

	      for (var k = 0; k < linkSet.loads.length; k++)
	        console.assert(loads.indexOf(linkSet.loads[k]) != -1, 'linkSet loads are a subset of loader loads');

	      if (linkSets.indexOf(linkSet) == -1)
	        linkSets.push(linkSet);
	    }
	  }

	  for (var i = 0; i < loads.length; i++) {
	    var load = loads[i];
	    for (var j = 0; j < linkSets.length; j++) {
	      var linkSet = linkSets[j];

	      if (linkSet.loads.indexOf(load) != -1)
	        console.assert(load.linkSets.indexOf(linkSet) != -1, 'linkSet contains load -> load contains linkSet');

	      if (load.linkSets.indexOf(linkSet) != -1)
	        console.assert(linkSet.loads.indexOf(load) != -1, 'load contains linkSet -> linkSet contains load');
	    }
	  }

	  for (var i = 0; i < linkSets.length; i++) {
	    var linkSet = linkSets[i];
	    for (var j = 0; j < linkSet.loads.length; j++) {
	      var load = linkSet.loads[j];

	      for (var k = 0; k < load.dependencies.length; k++) {
	        var depName = load.dependencies[k].value;
	        var depLoad;
	        for (var l = 0; l < loads.length; l++) {
	          if (loads[l].name != depName)
	            continue;
	          depLoad = loads[l];
	          break;
	        }

	        // loading records are allowed not to have their dependencies yet
	        // if (load.status != 'loading')
	        //  console.assert(depLoad, 'depLoad found');

	        // console.assert(linkSet.loads.indexOf(depLoad) != -1, 'linkset contains all dependencies');
	      }
	    }
	  }
	} */

	  // 15.2.3 - Runtime Semantics: Loader State

	  // 15.2.3.11
	  function createLoaderLoad(object) {
	    return {
	      // modules is an object for ES5 implementation
	      modules: {},
	      loads: [],
	      loaderObj: object
	    };
	  }

	  // 15.2.3.2 Load Records and LoadRequest Objects

	  var anonCnt = 0;

	  // 15.2.3.2.1
	  function createLoad(name) {
	    return {
	      status: 'loading',
	      name: name || '<Anonymous' + ++anonCnt + '>',
	      linkSets: [],
	      dependencies: [],
	      metadata: {}
	    };
	  }

	  // 15.2.3.2.2 createLoadRequestObject, absorbed into calling functions

	  // 15.2.4

	  // 15.2.4.1
	  function loadModule(loader, name, options) {
	    return new Promise(asyncStartLoadPartwayThrough({
	      step: options.address ? 'fetch' : 'locate',
	      loader: loader,
	      moduleName: name,
	      // allow metadata for import https://bugs.ecmascript.org/show_bug.cgi?id=3091
	      moduleMetadata: options && options.metadata || {},
	      moduleSource: options.source,
	      moduleAddress: options.address
	    }));
	  }

	  // 15.2.4.2
	  function requestLoad(loader, request, refererName, refererAddress) {
	    // 15.2.4.2.1 CallNormalize
	    return new Promise(function(resolve, reject) {
	      resolve(loader.loaderObj.normalize(request, refererName, refererAddress));
	    })
	    // 15.2.4.2.2 GetOrCreateLoad
	    .then(function(name) {
	      var load;
	      if (loader.modules[name]) {
	        load = createLoad(name);
	        load.status = 'linked';
	        // https://bugs.ecmascript.org/show_bug.cgi?id=2795
	        load.module = loader.modules[name];
	        return load;
	      }

	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        load = loader.loads[i];
	        if (load.name != name)
	          continue;
	        return load;
	      }

	      load = createLoad(name);
	      loader.loads.push(load);

	      proceedToLocate(loader, load);

	      return load;
	    });
	  }

	  // 15.2.4.3
	  function proceedToLocate(loader, load) {
	    proceedToFetch(loader, load,
	      Promise.resolve()
	      // 15.2.4.3.1 CallLocate
	      .then(function() {
	        return loader.loaderObj.locate({ name: load.name, metadata: load.metadata });
	      })
	    );
	  }

	  // 15.2.4.4
	  function proceedToFetch(loader, load, p) {
	    proceedToTranslate(loader, load,
	      p
	      // 15.2.4.4.1 CallFetch
	      .then(function(address) {
	        // adjusted, see https://bugs.ecmascript.org/show_bug.cgi?id=2602
	        if (load.status != 'loading')
	          return;
	        load.address = address;

	        return loader.loaderObj.fetch({ name: load.name, metadata: load.metadata, address: address });
	      })
	    );
	  }

	  // 15.2.4.5
	  function proceedToTranslate(loader, load, p) {
	    p
	    // 15.2.4.5.1 CallTranslate
	    .then(function(source) {
	      if (load.status != 'loading')
	        return;

	      load.address = load.address || load.name;

	      return Promise.resolve(loader.loaderObj.translate({ name: load.name, metadata: load.metadata, address: load.address, source: source }))

	      // 15.2.4.5.2 CallInstantiate
	      .then(function(source) {
	        load.source = source;
	        return loader.loaderObj.instantiate({ name: load.name, metadata: load.metadata, address: load.address, source: source });
	      })

	      // 15.2.4.5.3 InstantiateSucceeded
	      .then(function(instantiateResult) {
	        if (instantiateResult === undefined)
	          throw new TypeError('Declarative modules unsupported in the polyfill.');
	        
	        if (typeof instantiateResult != 'object')
	          throw new TypeError('Invalid instantiate return value');

	        load.depsList = instantiateResult.deps || [];
	        load.execute = instantiateResult.execute;
	      })
	      // 15.2.4.6 ProcessLoadDependencies
	      .then(function() {
	        load.dependencies = [];
	        var depsList = load.depsList;

	        var loadPromises = [];
	        for (var i = 0, l = depsList.length; i < l; i++) (function(request, index) {
	          loadPromises.push(
	            requestLoad(loader, request, load.name, load.address)

	            // 15.2.4.6.1 AddDependencyLoad (load is parentLoad)
	            .then(function(depLoad) {

	              // adjusted from spec to maintain dependency order
	              // this is due to the System.register internal implementation needs
	              load.dependencies[index] = {
	                key: request,
	                value: depLoad.name
	              };

	              if (depLoad.status != 'linked') {
	                var linkSets = load.linkSets.concat([]);
	                for (var i = 0, l = linkSets.length; i < l; i++)
	                  addLoadToLinkSet(linkSets[i], depLoad);
	              }

	              // console.log('AddDependencyLoad ' + depLoad.name + ' for ' + load.name);
	              // snapshot(loader);
	            })
	          );
	        })(depsList[i], i);

	        return Promise.all(loadPromises);
	      })

	      // 15.2.4.6.2 LoadSucceeded
	      .then(function() {
	        // console.log('LoadSucceeded ' + load.name);
	        // snapshot(loader);

	        load.status = 'loaded';

	        var linkSets = load.linkSets.concat([]);
	        for (var i = 0, l = linkSets.length; i < l; i++)
	          updateLinkSetOnLoad(linkSets[i], load);
	      });
	    })
	    // 15.2.4.5.4 LoadFailed
	    ['catch'](function(exc) {
	      load.status = 'failed';
	      load.exception = exc;

	      var linkSets = load.linkSets.concat([]);
	      for (var i = 0, l = linkSets.length; i < l; i++) {
	        linkSetFailed(linkSets[i], load, exc);
	      }

	      console.assert(load.linkSets.length == 0, 'linkSets not removed');
	    });
	  }

	  // 15.2.4.7 PromiseOfStartLoadPartwayThrough absorbed into calling functions

	  // 15.2.4.7.1
	  function asyncStartLoadPartwayThrough(stepState) {
	    return function(resolve, reject) {
	      var loader = stepState.loader;
	      var name = stepState.moduleName;
	      var step = stepState.step;

	      if (loader.modules[name])
	        throw new TypeError('"' + name + '" already exists in the module table');

	      // adjusted to pick up existing loads
	      var existingLoad;
	      for (var i = 0, l = loader.loads.length; i < l; i++) {
	        if (loader.loads[i].name == name) {
	          existingLoad = loader.loads[i];

	          if (step == 'translate' && !existingLoad.source) {
	            existingLoad.address = stepState.moduleAddress;
	            proceedToTranslate(loader, existingLoad, Promise.resolve(stepState.moduleSource));
	          }

	          // a primary load -> use that existing linkset if it is for the direct load here
	          // otherwise create a new linkset unit
	          if (existingLoad.linkSets.length && existingLoad.linkSets[0].loads[0].name == existingLoad.name)
	            return existingLoad.linkSets[0].done.then(function() {
	              resolve(existingLoad);
	            });
	        }
	      }

	      var load = existingLoad || createLoad(name);

	      load.metadata = stepState.moduleMetadata;

	      var linkSet = createLinkSet(loader, load);

	      loader.loads.push(load);

	      resolve(linkSet.done);

	      if (step == 'locate')
	        proceedToLocate(loader, load);

	      else if (step == 'fetch')
	        proceedToFetch(loader, load, Promise.resolve(stepState.moduleAddress));

	      else {
	        console.assert(step == 'translate', 'translate step');
	        load.address = stepState.moduleAddress;
	        proceedToTranslate(loader, load, Promise.resolve(stepState.moduleSource));
	      }
	    }
	  }

	  // Declarative linking functions run through alternative implementation:
	  // 15.2.5.1.1 CreateModuleLinkageRecord not implemented
	  // 15.2.5.1.2 LookupExport not implemented
	  // 15.2.5.1.3 LookupModuleDependency not implemented

	  // 15.2.5.2.1
	  function createLinkSet(loader, startingLoad) {
	    var linkSet = {
	      loader: loader,
	      loads: [],
	      startingLoad: startingLoad, // added see spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	      loadingCount: 0
	    };
	    linkSet.done = new Promise(function(resolve, reject) {
	      linkSet.resolve = resolve;
	      linkSet.reject = reject;
	    });
	    addLoadToLinkSet(linkSet, startingLoad);
	    return linkSet;
	  }
	  // 15.2.5.2.2
	  function addLoadToLinkSet(linkSet, load) {
	    if (load.status == 'failed')
	      return;

	    for (var i = 0, l = linkSet.loads.length; i < l; i++)
	      if (linkSet.loads[i] == load)
	        return;

	    linkSet.loads.push(load);
	    load.linkSets.push(linkSet);

	    // adjustment, see https://bugs.ecmascript.org/show_bug.cgi?id=2603
	    if (load.status != 'loaded') {
	      linkSet.loadingCount++;
	    }

	    var loader = linkSet.loader;

	    for (var i = 0, l = load.dependencies.length; i < l; i++) {
	      if (!load.dependencies[i])
	        continue;

	      var name = load.dependencies[i].value;

	      if (loader.modules[name])
	        continue;

	      for (var j = 0, d = loader.loads.length; j < d; j++) {
	        if (loader.loads[j].name != name)
	          continue;

	        addLoadToLinkSet(linkSet, loader.loads[j]);
	        break;
	      }
	    }
	    // console.log('add to linkset ' + load.name);
	    // snapshot(linkSet.loader);
	  }

	  // linking errors can be generic or load-specific
	  // this is necessary for debugging info
	  function doLink(linkSet) {
	    var error = false;
	    try {
	      link(linkSet, function(load, exc) {
	        linkSetFailed(linkSet, load, exc);
	        error = true;
	      });
	    }
	    catch(e) {
	      linkSetFailed(linkSet, null, e);
	      error = true;
	    }
	    return error;
	  }

	  // 15.2.5.2.3
	  function updateLinkSetOnLoad(linkSet, load) {
	    // console.log('update linkset on load ' + load.name);
	    // snapshot(linkSet.loader);

	    console.assert(load.status == 'loaded' || load.status == 'linked', 'loaded or linked');

	    linkSet.loadingCount--;

	    if (linkSet.loadingCount > 0)
	      return;

	    // adjusted for spec bug https://bugs.ecmascript.org/show_bug.cgi?id=2995
	    var startingLoad = linkSet.startingLoad;

	    // non-executing link variation for loader tracing
	    // on the server. Not in spec.
	    /***/
	    if (linkSet.loader.loaderObj.execute === false) {
	      var loads = [].concat(linkSet.loads);
	      for (var i = 0, l = loads.length; i < l; i++) {
	        var load = loads[i];
	        load.module = {
	          name: load.name,
	          module: _newModule({}),
	          evaluated: true
	        };
	        load.status = 'linked';
	        finishLoad(linkSet.loader, load);
	      }
	      return linkSet.resolve(startingLoad);
	    }
	    /***/

	    var abrupt = doLink(linkSet);

	    if (abrupt)
	      return;

	    console.assert(linkSet.loads.length == 0, 'loads cleared');

	    linkSet.resolve(startingLoad);
	  }

	  // 15.2.5.2.4
	  function linkSetFailed(linkSet, load, exc) {
	    var loader = linkSet.loader;
	    var requests;

	    checkError: 
	    if (load) {
	      if (linkSet.loads[0].name == load.name) {
	        exc = addToError(exc, 'Error loading ' + load.name);
	      }
	      else {
	        for (var i = 0; i < linkSet.loads.length; i++) {
	          var pLoad = linkSet.loads[i];
	          for (var j = 0; j < pLoad.dependencies.length; j++) {
	            var dep = pLoad.dependencies[j];
	            if (dep.value == load.name) {
	              exc = addToError(exc, 'Error loading ' + load.name + ' as "' + dep.key + '" from ' + pLoad.name);
	              break checkError;
	            }
	          }
	        }
	        exc = addToError(exc, 'Error loading ' + load.name + ' from ' + linkSet.loads[0].name);
	      }
	    }
	    else {
	      exc = addToError(exc, 'Error linking ' + linkSet.loads[0].name);
	    }


	    var loads = linkSet.loads.concat([]);
	    for (var i = 0, l = loads.length; i < l; i++) {
	      var load = loads[i];

	      // store all failed load records
	      loader.loaderObj.failed = loader.loaderObj.failed || [];
	      if (indexOf.call(loader.loaderObj.failed, load) == -1)
	        loader.loaderObj.failed.push(load);

	      var linkIndex = indexOf.call(load.linkSets, linkSet);
	      console.assert(linkIndex != -1, 'link not present');
	      load.linkSets.splice(linkIndex, 1);
	      if (load.linkSets.length == 0) {
	        var globalLoadsIndex = indexOf.call(linkSet.loader.loads, load);
	        if (globalLoadsIndex != -1)
	          linkSet.loader.loads.splice(globalLoadsIndex, 1);
	      }
	    }
	    linkSet.reject(exc);
	  }

	  // 15.2.5.2.5
	  function finishLoad(loader, load) {
	    // add to global trace if tracing
	    if (loader.loaderObj.trace) {
	      if (!loader.loaderObj.loads)
	        loader.loaderObj.loads = {};
	      var depMap = {};
	      load.dependencies.forEach(function(dep) {
	        depMap[dep.key] = dep.value;
	      });
	      loader.loaderObj.loads[load.name] = {
	        name: load.name,
	        deps: load.dependencies.map(function(dep){ return dep.key }),
	        depMap: depMap,
	        address: load.address,
	        metadata: load.metadata,
	        source: load.source
	      };
	    }
	    // if not anonymous, add to the module table
	    if (load.name) {
	      console.assert(!loader.modules[load.name] || loader.modules[load.name].module === load.module.module, 'load not in module table');
	      loader.modules[load.name] = load.module;
	    }
	    var loadIndex = indexOf.call(loader.loads, load);
	    if (loadIndex != -1)
	      loader.loads.splice(loadIndex, 1);
	    for (var i = 0, l = load.linkSets.length; i < l; i++) {
	      loadIndex = indexOf.call(load.linkSets[i].loads, load);
	      if (loadIndex != -1)
	        load.linkSets[i].loads.splice(loadIndex, 1);
	    }
	    load.linkSets.splice(0, load.linkSets.length);
	  }

	  function doDynamicExecute(linkSet, load, linkError) {
	    try {
	      var module = load.execute();
	    }
	    catch(e) {
	      linkError(load, e);
	      return;
	    }
	    if (!module || !(module instanceof Module))
	      linkError(load, new TypeError('Execution must define a Module instance'));
	    else
	      return module;
	  }

	  // 26.3 Loader

	  // 26.3.1.1
	  // defined at top

	  // importPromises adds ability to import a module twice without error - https://bugs.ecmascript.org/show_bug.cgi?id=2601
	  function createImportPromise(loader, name, promise) {
	    var importPromises = loader._loader.importPromises;
	    return importPromises[name] = promise.then(function(m) {
	      importPromises[name] = undefined;
	      return m;
	    }, function(e) {
	      importPromises[name] = undefined;
	      throw e;
	    });
	  }

	  Loader.prototype = {
	    // 26.3.3.1
	    constructor: Loader,
	    // 26.3.3.2
	    define: function(name, source, options) {
	      // check if already defined
	      if (this._loader.importPromises[name])
	        throw new TypeError('Module is already loading.');
	      return createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'translate',
	        loader: this._loader,
	        moduleName: name,
	        moduleMetadata: options && options.metadata || {},
	        moduleSource: source,
	        moduleAddress: options && options.address
	      })));
	    },
	    // 26.3.3.3
	    'delete': function(name) {
	      var loader = this._loader;
	      delete loader.importPromises[name];
	      delete loader.moduleRecords[name];
	      return loader.modules[name] ? delete loader.modules[name] : false;
	    },
	    // 26.3.3.4 entries not implemented
	    // 26.3.3.5
	    get: function(key) {
	      if (!this._loader.modules[key])
	        return;
	      return this._loader.modules[key].module;
	    },
	    // 26.3.3.7
	    has: function(name) {
	      return !!this._loader.modules[name];
	    },
	    // 26.3.3.8
	    'import': function(name, parentName, parentAddress) {
	      if (typeof parentName == 'object')
	        parentName = parentName.name;

	      // run normalize first
	      var loaderObj = this;

	      // added, see https://bugs.ecmascript.org/show_bug.cgi?id=2659
	      return Promise.resolve(loaderObj.normalize(name, parentName))
	      .then(function(name) {
	        var loader = loaderObj._loader;

	        if (loader.modules[name])
	          return loader.modules[name].module;

	        return loader.importPromises[name] || createImportPromise(loaderObj, name,
	          loadModule(loader, name, {})
	          .then(function(load) {
	            delete loader.importPromises[name];
	            return load.module.module;
	          }));
	      });
	    },
	    // 26.3.3.9 keys not implemented
	    // 26.3.3.10
	    load: function(name) {
	      var loader = this._loader;
	      if (loader.modules[name])
	        return Promise.resolve();
	      return loader.importPromises[name] || createImportPromise(this, name, new Promise(asyncStartLoadPartwayThrough({
	        step: 'locate',
	        loader: loader,
	        moduleName: name,
	        moduleMetadata: {},
	        moduleSource: undefined,
	        moduleAddress: undefined
	      }))
	      .then(function() {
	        delete loader.importPromises[name];
	      }));
	    },
	    // 26.3.3.11
	    module: function(source, options) {
	      var load = createLoad();
	      load.address = options && options.address;
	      var linkSet = createLinkSet(this._loader, load);
	      var sourcePromise = Promise.resolve(source);
	      var loader = this._loader;
	      var p = linkSet.done.then(function() {
	        return load.module.module;
	      });
	      proceedToTranslate(loader, load, sourcePromise);
	      return p;
	    },
	    // 26.3.3.12
	    newModule: function (obj) {
	      if (typeof obj != 'object')
	        throw new TypeError('Expected object');

	      var m = new Module();

	      var pNames = [];
	      if (Object.getOwnPropertyNames && obj != null)
	        pNames = Object.getOwnPropertyNames(obj);
	      else
	        for (var key in obj)
	          pNames.push(key);

	      for (var i = 0; i < pNames.length; i++) (function(key) {
	        defineProperty(m, key, {
	          configurable: false,
	          enumerable: true,
	          get: function () {
	            return obj[key];
	          },
	          set: function() {
	            throw new Error('Module exports cannot be changed externally.');
	          }
	        });
	      })(pNames[i]);

	      if (Object.freeze)
	        Object.freeze(m);

	      return m;
	    },
	    // 26.3.3.14
	    set: function(name, module) {
	      if (!(module instanceof Module))
	        throw new TypeError('Loader.set(' + name + ', module) must be a module');
	      this._loader.modules[name] = {
	        module: module
	      };
	    },
	    // 26.3.3.15 values not implemented
	    // 26.3.3.16 @@iterator not implemented
	    // 26.3.3.17 @@toStringTag not implemented

	    // 26.3.3.18.1
	    normalize: function(name, referrerName, referrerAddress) {},
	    // 26.3.3.18.2
	    locate: function(load) {
	      return load.name;
	    },
	    // 26.3.3.18.3
	    fetch: function(load) {
	    },
	    // 26.3.3.18.4
	    translate: function(load) {
	      return load.source;
	    },
	    // 26.3.3.18.5
	    instantiate: function(load) {
	    }
	  };

	  var _newModule = Loader.prototype.newModule;

	/*
	 * ES6 Module Declarative Linking Code
	 */
	  function link(linkSet, linkError) {

	    var loader = linkSet.loader;

	    if (!linkSet.loads.length)
	      return;

	    var loads = linkSet.loads.concat([]);

	    for (var i = 0; i < loads.length; i++) {
	      var load = loads[i];

	      var module = doDynamicExecute(linkSet, load, linkError);
	      if (!module)
	        return;
	      load.module = {
	        name: load.name,
	        module: module
	      };
	      load.status = 'linked';

	      finishLoad(loader, load);
	    }
	  }

	})();

	var System;

	// SystemJS Loader Class and Extension helpers
	function SystemJSLoader() {
	  Loader.call(this);

	  this.paths = {};
	  this._loader.paths = {};

	  systemJSConstructor.call(this);
	}

	// inline Object.create-style class extension
	function SystemProto() {};
	SystemProto.prototype = Loader.prototype;
	SystemJSLoader.prototype = new SystemProto();
	SystemJSLoader.prototype.constructor = SystemJSLoader;

	var systemJSConstructor;

	function hook(name, hook) {
	  SystemJSLoader.prototype[name] = hook(SystemJSLoader.prototype[name] || function() {});
	}
	function hookConstructor(hook) {
	  systemJSConstructor = hook(systemJSConstructor || function() {});
	}


	var absURLRegEx = /^[^\/]+:\/\//;
	function isAbsolute(name) {
	  return name.match(absURLRegEx);
	}
	function isRel(name) {
	  return (name[0] == '.' && (!name[1] || name[1] == '/' || name[1] == '.')) || name[0] == '/';
	}
	function isPlain(name) {
	  return !isRel(name) && !isAbsolute(name);
	}

	var baseURIObj = new URL(baseURI);

	function urlResolve(name, parent) {
	  // url resolution shortpaths
	  if (name[0] == '.') {
	    // dot-relative url normalization
	    if (name[1] == '/' && name[2] != '.')
	      return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name.substr(2);
	  }
	  else if (name[0] != '/' && name.indexOf(':') == -1) {
	    // plain parent normalization
	    return (parent && parent.substr(0, parent.lastIndexOf('/') + 1) || baseURI) + name;
	  }

	  return new URL(name, parent && parent.replace(/#/g, '%05') || baseURIObj).href.replace(/%05/g, '#');
	}

	// NB no specification provided for System.paths, used ideas discussed in https://github.com/jorendorff/js-loaders/issues/25
	function applyPaths(loader, name) {
	  // most specific (most number of slashes in path) match wins
	  var pathMatch = '', wildcard, maxWildcardPrefixLen = 0;

	  var paths = loader.paths;
	  var pathsCache = loader._loader.paths;

	  // check to see if we have a paths entry
	  for (var p in paths) {
	    if (paths.hasOwnProperty && !paths.hasOwnProperty(p))
	      continue;

	    // paths sanitization
	    var path = paths[p];
	    if (path !== pathsCache[p])
	      path = paths[p] = pathsCache[p] = urlResolve(paths[p], isRel(paths[p]) ? baseURI : loader.baseURL);

	    // exact path match
	    if (p.indexOf('*') === -1) {
	      if (name == p)
	        return paths[p];
	      
	      // support trailing / in paths rules
	      else if (name.substr(0, p.length - 1) == p.substr(0, p.length - 1) && (name.length < p.length || name[p.length - 1] == p[p.length - 1]) && (paths[p][paths[p].length - 1] == '/' || paths[p] == '')) {
	        return paths[p].substr(0, paths[p].length - 1) + (name.length > p.length ? (paths[p] && '/' || '') + name.substr(p.length) : '');
	      }
	    }
	    // wildcard path match
	    else {
	      var pathParts = p.split('*');
	      if (pathParts.length > 2)
	        throw new TypeError('Only one wildcard in a path is permitted');

	      var wildcardPrefixLen = pathParts[0].length;
	      if (wildcardPrefixLen >= maxWildcardPrefixLen &&
	          name.substr(0, pathParts[0].length) == pathParts[0] &&
	          name.substr(name.length - pathParts[1].length) == pathParts[1]) {
	            maxWildcardPrefixLen = wildcardPrefixLen;
	            pathMatch = p;
	            wildcard = name.substr(pathParts[0].length, name.length - pathParts[1].length - pathParts[0].length);
	          }
	    }
	  }

	  var outPath = paths[pathMatch];
	  if (typeof wildcard == 'string')
	    outPath = outPath.replace('*', wildcard);

	  return outPath;
	}

	function dedupe(deps) {
	  var newDeps = [];
	  for (var i = 0, l = deps.length; i < l; i++)
	    if (indexOf.call(newDeps, deps[i]) == -1)
	      newDeps.push(deps[i])
	  return newDeps;
	}

	function group(deps) {
	  var names = [];
	  var indices = [];
	  for (var i = 0, l = deps.length; i < l; i++) {
	    var index = indexOf.call(names, deps[i]);
	    if (index === -1) {
	      names.push(deps[i]);
	      indices.push([i]);
	    }
	    else {
	      indices[index].push(i);
	    }
	  }
	  return { names: names, indices: indices };
	}

	var getOwnPropertyDescriptor = true;
	try {
	  Object.getOwnPropertyDescriptor({ a: 0 }, 'a');
	}
	catch(e) {
	  getOwnPropertyDescriptor = false;
	}

	// converts any module.exports object into an object ready for SystemJS.newModule
	function getESModule(exports) {
	  var esModule = {};
	  // don't trigger getters/setters in environments that support them
	  if ((typeof exports == 'object' || typeof exports == 'function') && exports !== __global) {
	      if (getOwnPropertyDescriptor) {
	        for (var p in exports) {
	          // The default property is copied to esModule later on
	          if (p === 'default')
	            continue;
	          defineOrCopyProperty(esModule, exports, p);
	        }
	      }
	      else {
	        extend(esModule, exports);
	      }
	  }
	  esModule['default'] = exports;
	  defineProperty(esModule, '__useDefault', {
	    value: true
	  });
	  return esModule;
	}

	function defineOrCopyProperty(targetObj, sourceObj, propName) {
	  try {
	    var d;
	    if (d = Object.getOwnPropertyDescriptor(sourceObj, propName))
	      defineProperty(targetObj, propName, d);
	  }
	  catch (ex) {
	    // Object.getOwnPropertyDescriptor threw an exception, fall back to normal set property
	    // we dont need hasOwnProperty here because getOwnPropertyDescriptor would have returned undefined above
	    targetObj[propName] = sourceObj[propName];
	    return false;
	  }
	}

	function extend(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    if (!prepend || !(p in a))
	      a[p] = b[p];
	  }
	  return a;
	}

	// meta first-level extends where:
	// array + array appends
	// object + object extends
	// other properties replace
	function extendMeta(a, b, prepend) {
	  var hasOwnProperty = b && b.hasOwnProperty;
	  for (var p in b) {
	    if (hasOwnProperty && !b.hasOwnProperty(p))
	      continue;
	    var val = b[p];
	    if (!(p in a))
	      a[p] = val;
	    else if (val instanceof Array && a[p] instanceof Array)
	      a[p] = [].concat(prepend ? val : a[p]).concat(prepend ? a[p] : val);
	    else if (typeof val == 'object' && val !== null && typeof a[p] == 'object')
	      a[p] = extend(extend({}, a[p]), val, prepend);
	    else if (!prepend)
	      a[p] = val;
	  }
	}

	function extendPkgConfig(pkgCfgA, pkgCfgB, pkgName, loader, warnInvalidProperties) {
	  for (var prop in pkgCfgB) {
	    if (indexOf.call(['main', 'format', 'defaultExtension', 'basePath'], prop) != -1) {
	      pkgCfgA[prop] = pkgCfgB[prop];
	    }
	    else if (prop == 'map') {
	      extend(pkgCfgA.map = pkgCfgA.map || {}, pkgCfgB.map);
	    }
	    else if (prop == 'meta') {
	      extend(pkgCfgA.meta = pkgCfgA.meta || {}, pkgCfgB.meta);
	    }
	    else if (prop == 'depCache') {
	      for (var d in pkgCfgB.depCache) {
	        var dNormalized;

	        if (d.substr(0, 2) == './')
	          dNormalized = pkgName + '/' + d.substr(2);
	        else
	          dNormalized = coreResolve.call(loader, d);
	        loader.depCache[dNormalized] = (loader.depCache[dNormalized] || []).concat(pkgCfgB.depCache[d]);
	      }
	    }
	    else if (warnInvalidProperties && indexOf.call(['browserConfig', 'nodeConfig', 'devConfig', 'productionConfig'], prop) == -1 && 
	        (!pkgCfgB.hasOwnProperty || pkgCfgB.hasOwnProperty(prop))) {
	      warn.call(loader, '"' + prop + '" is not a valid package configuration option in package ' + pkgName);
	    }
	  }
	}

	// deeply-merge (to first level) config with any existing package config
	function setPkgConfig(loader, pkgName, cfg, prependConfig) {
	  var pkg;

	  // first package is config by reference for fast path, cloned after that
	  if (!loader.packages[pkgName]) {
	    pkg = loader.packages[pkgName] = cfg;
	  }
	  else {
	    var basePkg = loader.packages[pkgName];
	    pkg = loader.packages[pkgName] = {};

	    extendPkgConfig(pkg, prependConfig ? cfg : basePkg, pkgName, loader, prependConfig);
	    extendPkgConfig(pkg, prependConfig ? basePkg : cfg, pkgName, loader, !prependConfig);
	  }
	  
	  // main object becomes main map
	  if (typeof pkg.main == 'object') {
	    pkg.map = pkg.map || {};
	    pkg.map['./@main'] = pkg.main;
	    pkg.main['default'] = pkg.main['default'] || './';
	    pkg.main = '@main';
	  }

	  return pkg;
	}

	function warn(msg) {
	  if (this.warnings && typeof console != 'undefined' && console.warn)
	    console.warn(msg);
	}
	var absURLRegEx = /^([^\/]+:\/\/|\/)/;

	// Normalization with module names as absolute URLs
	SystemJSLoader.prototype.normalize = function(name, parentName, parentAddress) {
	  // NB does `import 'file.js'` import relative to the parent name or baseURL?
	  //    have assumed that it is baseURL-relative here, but spec may well align with URLs to be the latter
	  //    safe option for users is to always use "./file.js" for relative

	  // not absolute or relative -> apply paths (what will be sites)
	  if (!name.match(absURLRegEx) && name[0] != '.')
	    name = new URL(applyPaths(this, name) || name, baseURI).href;
	  // apply parent-relative normalization, parentAddress is already normalized
	  else
	    name = new URL(name, parentName || baseURI).href;

	  return name;
	};

	// default locate is this
	/*
	SystemJSLoader.prototype.locate = function(load) {
	  return load.name;
	};
	*//*
	 * Script tag fetch
	 *
	 * When load.metadata.scriptLoad is true, we load via script tag injection.
	 */
	(function() {

	  if (typeof document != 'undefined')
	    var head = document.getElementsByTagName('head')[0];

	  var curSystem;
	  var curRequire;

	  // if doing worker executing, this is set to the load record being executed
	  var workerLoad = null;
	  
	  // interactive mode handling method courtesy RequireJS
	  var ieEvents = head && (function() {
	    var s = document.createElement('script');
	    var isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]';
	    return s.attachEvent && !(s.attachEvent.toString && s.attachEvent.toString().indexOf('[native code') < 0) && !isOpera;
	  })();

	  // IE interactive-only part
	  // we store loading scripts array as { script: <script>, load: {...} }
	  var interactiveLoadingScripts = [];
	  var interactiveScript;
	  function getInteractiveScriptLoad() {
	    if (interactiveScript && interactiveScript.script.readyState === 'interactive')
	      return interactiveScript.load;

	    for (var i = 0; i < interactiveLoadingScripts.length; i++)
	      if (interactiveLoadingScripts[i].script.readyState == 'interactive') {
	        interactiveScript = interactiveLoadingScripts[i];
	        return interactiveScript.load;
	      }
	  }
	  
	  // System.register, System.registerDynamic, AMD define pipeline
	  // this is called by the above methods when they execute
	  // we then run the reduceRegister_ collection function either immediately
	  // if we are in IE and know the currently executing script (interactive)
	  // or later if we need to wait for the synchronous load callback to know the script
	  var loadingCnt = 0;
	  var registerQueue = [];
	  hook('pushRegister_', function(pushRegister) {
	    return function(register) {
	      // if using eval-execution then skip
	      if (pushRegister.call(this, register))
	        return false;

	      // if using worker execution, then we're done
	      if (workerLoad)
	        this.reduceRegister_(workerLoad, register);

	      // detect if we know the currently executing load (IE)
	      // if so, immediately call reduceRegister
	      else if (ieEvents)
	        this.reduceRegister_(getInteractiveScriptLoad(), register);

	      // otherwise, add to our execution queue
	      // to call reduceRegister on sync script load event
	      else if (loadingCnt)
	        registerQueue.push(register);

	      // if we're not currently loading anything though
	      // then do the reduction against a null load
	      // (out of band named define or named register)
	      // note even in non-script environments, this catch is used
	      else
	        this.reduceRegister_(null, register);

	      return true;
	    };
	  });

	  function webWorkerImport(loader, load) {
	    return new Promise(function(resolve, reject) {
	      if (load.metadata.integrity)
	        reject(new Error('Subresource integrity checking is not supported in web workers.'));

	      workerLoad = load;
	      try {
	        importScripts(load.address);
	      }
	      catch(e) {
	        workerLoad = null;
	        reject(e);
	      }
	      workerLoad = null;

	      // if nothing registered, then something went wrong
	      if (!load.metadata.entry)
	        reject(new Error(load.address + ' did not call System.register or AMD define. If loading a global, ensure the meta format is set to global.'));

	      resolve('');
	    });
	  }

	  // override fetch to use script injection
	  hook('fetch', function(fetch) {
	    return function(load) {
	      var loader = this;

	      if (load.metadata.format == 'json' || !load.metadata.scriptLoad || (!isBrowser && !isWorker))
	        return fetch.call(this, load);

	      if (isWorker)
	        return webWorkerImport(loader, load);

	      return new Promise(function(resolve, reject) {
	        var s = document.createElement('script');
	        
	        s.async = true;

	        if (load.metadata.crossOrigin)
	          s.crossOrigin = load.metadata.crossOrigin;

	        if (load.metadata.integrity)
	          s.setAttribute('integrity', load.metadata.integrity);

	        if (ieEvents) {
	          s.attachEvent('onreadystatechange', complete);
	          interactiveLoadingScripts.push({
	            script: s,
	            load: load
	          });
	        }
	        else {
	          s.addEventListener('load', complete, false);
	          s.addEventListener('error', error, false);
	        }

	        loadingCnt++;

	        curSystem = __global.System;
	        curRequire = __global.require;

	        s.src = load.address;
	        head.appendChild(s);

	        function complete(evt) {
	          if (s.readyState && s.readyState != 'loaded' && s.readyState != 'complete')
	            return;

	          loadingCnt--;

	          // complete call is sync on execution finish
	          // (in ie already done reductions)
	          if (!load.metadata.entry && !registerQueue.length) {
	            loader.reduceRegister_(load);
	          }
	          else if (!ieEvents) {
	            for (var i = 0; i < registerQueue.length; i++)
	              loader.reduceRegister_(load, registerQueue[i]);
	            registerQueue = [];
	          }

	          cleanup();

	          // if nothing registered, then something went wrong
	          if (!load.metadata.entry && !load.metadata.bundle)
	            reject(new Error(load.name + ' did not call System.register or AMD define. If loading a global module configure the global name via the meta exports property for script injection support.'));

	          resolve('');
	        }

	        function error(evt) {
	          cleanup();
	          reject(new Error('Unable to load script ' + load.address));
	        }

	        function cleanup() {
	          __global.System = curSystem;
	          __global.require = curRequire;

	          if (s.detachEvent) {
	            s.detachEvent('onreadystatechange', complete);
	            for (var i = 0; i < interactiveLoadingScripts.length; i++)
	              if (interactiveLoadingScripts[i].script == s) {
	                if (interactiveScript && interactiveScript.script == s)
	                  interactiveScript = null;
	                interactiveLoadingScripts.splice(i, 1);
	              }
	          }
	          else {
	            s.removeEventListener('load', complete, false);
	            s.removeEventListener('error', error, false);
	          }

	          head.removeChild(s);
	        }
	      });
	    };
	  });
	})();
	/*
	 * Instantiate registry extension
	 *
	 * Supports Traceur System.register 'instantiate' output for loading ES6 as ES5.
	 *
	 * - Creates the loader.register function
	 * - Also supports metadata.format = 'register' in instantiate for anonymous register modules
	 * - Also supports metadata.deps, metadata.execute and metadata.executingRequire
	 *     for handling dynamic modules alongside register-transformed ES6 modules
	 *
	 *
	 * The code here replicates the ES6 linking groups algorithm to ensure that
	 * circular ES6 compiled into System.register can work alongside circular AMD 
	 * and CommonJS, identically to the actual ES6 loader.
	 *
	 */


	/*
	 * Registry side table entries in loader.defined
	 * Registry Entry Contains:
	 *    - name
	 *    - deps 
	 *    - declare for declarative modules
	 *    - execute for dynamic modules, different to declarative execute on module
	 *    - executingRequire indicates require drives execution for circularity of dynamic modules
	 *    - declarative optional boolean indicating which of the above
	 *
	 * Can preload modules directly on SystemJS.defined['my/module'] = { deps, execute, executingRequire }
	 *
	 * Then the entry gets populated with derived information during processing:
	 *    - normalizedDeps derived from deps, created in instantiate
	 *    - groupIndex used by group linking algorithm
	 *    - evaluated indicating whether evaluation has happend
	 *    - module the module record object, containing:
	 *      - exports actual module exports
	 *
	 *    For dynamic we track the es module with:
	 *    - esModule actual es module value
	 *    - esmExports whether to extend the esModule with named exports
	 *      
	 *    Then for declarative only we track dynamic bindings with the 'module' records:
	 *      - name
	 *      - exports
	 *      - setters declarative setter functions
	 *      - dependencies, module records of dependencies
	 *      - importers, module records of dependents
	 *
	 * After linked and evaluated, entries are removed, declarative module records remain in separate
	 * module binding table
	 *
	 */

	var leadingCommentAndMetaRegEx = /^(\s*\/\*[^\*]*(\*(?!\/)[^\*]*)*\*\/|\s*\/\/[^\n]*|\s*"[^"]+"\s*;?|\s*'[^']+'\s*;?)*\s*/;
	function detectRegisterFormat(source) {
	  var leadingCommentAndMeta = source.match(leadingCommentAndMetaRegEx);
	  return leadingCommentAndMeta && source.substr(leadingCommentAndMeta[0].length, 15) == 'System.register';
	}

	function createEntry() {
	  return {
	    name: null,
	    deps: null,
	    originalIndices: null,
	    declare: null,
	    execute: null,
	    executingRequire: false,
	    declarative: false,
	    normalizedDeps: null,
	    groupIndex: null,
	    evaluated: false,
	    module: null,
	    esModule: null,
	    esmExports: false
	  };
	}

	(function() {

	  /*
	   * There are two variations of System.register:
	   * 1. System.register for ES6 conversion (2-3 params) - System.register([name, ]deps, declare)
	   *    see https://github.com/ModuleLoader/es6-module-loader/wiki/System.register-Explained
	   *
	   * 2. System.registerDynamic for dynamic modules (3-4 params) - System.registerDynamic([name, ]deps, executingRequire, execute)
	   * the true or false statement 
	   *
	   * this extension implements the linking algorithm for the two variations identical to the spec
	   * allowing compiled ES6 circular references to work alongside AMD and CJS circular references.
	   *
	   */
	  SystemJSLoader.prototype.register = function(name, deps, declare) {
	    if (typeof name != 'string') {
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic backwards-compatibility
	    // can be deprecated eventually
	    if (typeof declare == 'boolean')
	      return this.registerDynamic.apply(this, arguments);

	    var entry = createEntry();
	    // ideally wouldn't apply map config to bundle names but 
	    // dependencies go through map regardless so we can't restrict
	    // could reconsider in shift to new spec
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.declarative = true;
	    entry.deps = deps;
	    entry.declare = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  SystemJSLoader.prototype.registerDynamic = function(name, deps, declare, execute) {
	    if (typeof name != 'string') {
	      execute = declare;
	      declare = deps;
	      deps = name;
	      name = null;
	    }

	    // dynamic
	    var entry = createEntry();
	    entry.name = name && (this.decanonicalize || this.normalize).call(this, name);
	    entry.deps = deps;
	    entry.execute = execute;
	    entry.executingRequire = declare;

	    this.pushRegister_({
	      amd: false,
	      entry: entry
	    });
	  };
	  hook('reduceRegister_', function() {
	    return function(load, register) {
	      if (!register)
	        return;

	      var entry = register.entry;
	      var curMeta = load && load.metadata;

	      // named register
	      if (entry.name) {
	        if (!(entry.name in this.defined))
	          this.defined[entry.name] = entry;

	        if (curMeta)
	          curMeta.bundle = true;
	      }
	      // anonymous register
	      if (!entry.name || load && !curMeta.entry && entry.name == load.name) {
	        if (!curMeta)
	          throw new TypeError('Invalid System.register call. Anonymous System.register calls can only be made by modules loaded by SystemJS.import and not via script tags.');
	        if (curMeta.entry) {
	          if (curMeta.format == 'register')
	            throw new Error('Multiple anonymous System.register calls in module ' + load.name + '. If loading a bundle, ensure all the System.register calls are named.');
	          else
	            throw new Error('Module ' + load.name + ' interpreted as ' + curMeta.format + ' module format, but called System.register.');
	        }
	        if (!curMeta.format)
	          curMeta.format = 'register';
	        curMeta.entry = entry;
	      }
	    };
	  });

	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);

	      this.defined = {};
	      this._loader.moduleRecords = {};
	    };
	  });

	  function buildGroups(entry, loader, groups) {
	    groups[entry.groupIndex] = groups[entry.groupIndex] || [];

	    if (indexOf.call(groups[entry.groupIndex], entry) != -1)
	      return;

	    groups[entry.groupIndex].push(entry);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      
	      // not in the registry means already linked / ES6
	      if (!depEntry || depEntry.evaluated)
	        continue;
	      
	      // now we know the entry is in our unlinked linkage group
	      var depGroupIndex = entry.groupIndex + (depEntry.declarative != entry.declarative);

	      // the group index of an entry is always the maximum
	      if (depEntry.groupIndex === null || depEntry.groupIndex < depGroupIndex) {
	        
	        // if already in a group, remove from the old group
	        if (depEntry.groupIndex !== null) {
	          groups[depEntry.groupIndex].splice(indexOf.call(groups[depEntry.groupIndex], depEntry), 1);

	          // if the old group is empty, then we have a mixed depndency cycle
	          if (groups[depEntry.groupIndex].length == 0)
	            throw new Error("Mixed dependency cycle detected");
	        }

	        depEntry.groupIndex = depGroupIndex;
	      }

	      buildGroups(depEntry, loader, groups);
	    }
	  }

	  function link(name, startEntry, loader) {
	    // skip if already linked
	    if (startEntry.module)
	      return;

	    startEntry.groupIndex = 0;

	    var groups = [];

	    buildGroups(startEntry, loader, groups);

	    var curGroupDeclarative = !!startEntry.declarative == groups.length % 2;
	    for (var i = groups.length - 1; i >= 0; i--) {
	      var group = groups[i];
	      for (var j = 0; j < group.length; j++) {
	        var entry = group[j];

	        // link each group
	        if (curGroupDeclarative)
	          linkDeclarativeModule(entry, loader);
	        else
	          linkDynamicModule(entry, loader);
	      }
	      curGroupDeclarative = !curGroupDeclarative; 
	    }
	  }

	  // module binding records
	  function ModuleRecord() {}
	  defineProperty(ModuleRecord, 'toString', {
	    value: function() {
	      return 'Module';
	    }
	  });

	  function getOrCreateModuleRecord(name, moduleRecords) {
	    return moduleRecords[name] || (moduleRecords[name] = {
	      name: name,
	      dependencies: [],
	      exports: new ModuleRecord(), // start from an empty module and extend
	      importers: []
	    });
	  }

	  function linkDeclarativeModule(entry, loader) {
	    // only link if already not already started linking (stops at circular)
	    if (entry.module)
	      return;

	    var moduleRecords = loader._loader.moduleRecords;
	    var module = entry.module = getOrCreateModuleRecord(entry.name, moduleRecords);
	    var exports = entry.module.exports;

	    var declaration = entry.declare.call(__global, function(name, value) {
	      module.locked = true;

	      if (typeof name == 'object') {
	        for (var p in name)
	          exports[p] = name[p];
	      }
	      else {
	        exports[name] = value;
	      }

	      for (var i = 0, l = module.importers.length; i < l; i++) {
	        var importerModule = module.importers[i];
	        if (!importerModule.locked) {
	          var importerIndex = indexOf.call(importerModule.dependencies, module);
	          var setter = importerModule.setters[importerIndex];
	          if (setter)
	            setter(exports);
	        }
	      }

	      module.locked = false;
	      return value;
	    }, { id: entry.name });

	    if (typeof declaration == 'function')
	      declaration = { setters: [], execute: declaration };

	    // allowing undefined declaration was a mistake! To be deprecated.
	    declaration = declaration || { setters: [], execute: function() {} };
	    
	    module.setters = declaration.setters;
	    module.execute = declaration.execute;

	    if (!module.setters || !module.execute) {
	      throw new TypeError('Invalid System.register form for ' + entry.name);
	    }

	    // now link all the module dependencies
	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      var depEntry = loader.defined[depName];
	      var depModule = moduleRecords[depName];

	      // work out how to set depExports based on scenarios...
	      var depExports;

	      if (depModule) {
	        depExports = depModule.exports;
	      }
	      // dynamic, already linked in our registry
	      else if (depEntry && !depEntry.declarative) {
	        depExports = depEntry.esModule;
	      }
	      // in the loader registry
	      else if (!depEntry) {
	        depExports = loader.get(depName);
	      }
	      // we have an entry -> link
	      else {
	        linkDeclarativeModule(depEntry, loader);
	        depModule = depEntry.module;
	        depExports = depModule.exports;
	      }

	      // only declarative modules have dynamic bindings
	      if (depModule && depModule.importers) {
	        depModule.importers.push(module);
	        module.dependencies.push(depModule);
	      }
	      else {
	        module.dependencies.push(null);
	      }
	      
	      // run setters for all entries with the matching dependency name
	      var originalIndices = entry.originalIndices[i];
	      for (var j = 0, len = originalIndices.length; j < len; ++j) {
	        var index = originalIndices[j];
	        if (module.setters[index]) {
	          module.setters[index](depExports);
	        }
	      }
	    }
	  }

	  // An analog to loader.get covering execution of all three layers (real declarative, simulated declarative, simulated dynamic)
	  function getModule(name, loader) {
	    var exports;
	    var entry = loader.defined[name];

	    if (!entry) {
	      exports = loader.get(name);
	      if (!exports)
	        throw new Error('Unable to load dependency ' + name + '.');
	    }

	    else {
	      if (entry.declarative)
	        ensureEvaluated(name, entry, [], loader);
	    
	      else if (!entry.evaluated)
	        linkDynamicModule(entry, loader);

	      exports = entry.module.exports;
	    }

	    if ((!entry || entry.declarative) && exports && exports.__useDefault)
	      return exports['default'];
	    
	    return exports;
	  }

	  function linkDynamicModule(entry, loader) {
	    if (entry.module)
	      return;

	    var exports = {};

	    var module = entry.module = { exports: exports, id: entry.name };

	    // AMD requires execute the tree first
	    if (!entry.executingRequire) {
	      for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	        var depName = entry.normalizedDeps[i];
	        // we know we only need to link dynamic due to linking algorithm
	        var depEntry = loader.defined[depName];
	        if (depEntry)
	          linkDynamicModule(depEntry, loader);
	      }
	    }

	    // now execute
	    entry.evaluated = true;
	    var output = entry.execute.call(__global, function(name) {
	      for (var i = 0, l = entry.deps.length; i < l; i++) {
	        if (entry.deps[i] != name)
	          continue;
	        return getModule(entry.normalizedDeps[i], loader);
	      }
	      // try and normalize the dependency to see if we have another form
	      var nameNormalized = loader.normalizeSync(name, entry.name);
	      if (indexOf.call(entry.normalizedDeps, nameNormalized) != -1)
	        return getModule(nameNormalized, loader);

	      throw new Error('Module ' + name + ' not declared as a dependency of ' + entry.name);
	    }, exports, module);
	    
	    if (output !== undefined)
	      module.exports = output;

	    // create the esModule object, which allows ES6 named imports of dynamics
	    exports = module.exports;

	    // __esModule flag treats as already-named
	    if (exports && (exports.__esModule || exports instanceof Module))
	      entry.esModule = loader.newModule(exports);
	    // set module as 'default' export, then fake named exports by iterating properties
	    else if (entry.esmExports && exports !== __global)
	      entry.esModule = loader.newModule(getESModule(exports));
	    // just use the 'default' export
	    else
	      entry.esModule = loader.newModule({ 'default': exports, __useDefault: true });
	  }

	  /*
	   * Given a module, and the list of modules for this current branch,
	   *  ensure that each of the dependencies of this module is evaluated
	   *  (unless one is a circular dependency already in the list of seen
	   *  modules, in which case we execute it)
	   *
	   * Then we evaluate the module itself depth-first left to right 
	   * execution to match ES6 modules
	   */
	  function ensureEvaluated(moduleName, entry, seen, loader) {
	    // if already seen, that means it's an already-evaluated non circular dependency
	    if (!entry || entry.evaluated || !entry.declarative)
	      return;

	    // this only applies to declarative modules which late-execute

	    seen.push(moduleName);

	    for (var i = 0, l = entry.normalizedDeps.length; i < l; i++) {
	      var depName = entry.normalizedDeps[i];
	      if (indexOf.call(seen, depName) == -1) {
	        if (!loader.defined[depName])
	          loader.get(depName);
	        else
	          ensureEvaluated(depName, loader.defined[depName], seen, loader);
	      }
	    }

	    if (entry.evaluated)
	      return;

	    entry.evaluated = true;
	    entry.module.execute.call(__global);
	  }

	  // override the delete method to also clear the register caches
	  hook('delete', function(del) {
	    return function(name) {
	      delete this._loader.moduleRecords[name];
	      delete this.defined[name];
	      return del.call(this, name);
	    };
	  });

	  hook('fetch', function(fetch) {
	    return function(load) {
	      if (this.defined[load.name]) {
	        load.metadata.format = 'defined';
	        return '';
	      }

	      load.metadata.deps = load.metadata.deps || [];
	      
	      return fetch.call(this, load);
	    };
	  });

	  hook('translate', function(translate) {
	    // we run the meta detection here (register is after meta)
	    return function(load) {
	      load.metadata.deps = load.metadata.deps || [];
	      return Promise.resolve(translate.apply(this, arguments)).then(function(source) {
	        // run detection for register format
	        if (load.metadata.format == 'register' || !load.metadata.format && detectRegisterFormat(load.source))
	          load.metadata.format = 'register';
	        return source;
	      });
	    };
	  });

	  // implement a perforance shortpath for System.load with no deps
	  hook('load', function(doLoad) {
	    return function(normalized) {
	      var loader = this;
	      var entry = loader.defined[normalized];

	      if (!entry || entry.deps.length)
	        return doLoad.apply(this, arguments);

	      entry.originalIndices = entry.normalizedDeps = [];

	      // recursively ensure that the module and all its 
	      // dependencies are linked (with dependency group handling)
	      link(normalized, entry, loader);

	      // now handle dependency execution in correct order
	      ensureEvaluated(normalized, entry, [], loader);
	      if (!entry.esModule)
	        entry.esModule = loader.newModule(entry.module.exports);

	      // remove from the registry
	      if (!loader.trace)
	        loader.defined[normalized] = undefined;

	      // return the defined module object
	      loader.set(normalized, entry.esModule);

	      return Promise.resolve();
	    };
	  });

	  hook('instantiate', function(instantiate) {
	    return function(load) {
	      if (load.metadata.format == 'detect')
	        load.metadata.format = undefined;

	      // assumes previous instantiate is sync
	      // (core json support)
	      instantiate.call(this, load);

	      var loader = this;

	      var entry;

	      // first we check if this module has already been defined in the registry
	      if (loader.defined[load.name]) {
	        entry = loader.defined[load.name];
	        // don't support deps for ES modules
	        if (!entry.declarative)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // picked up already by an anonymous System.register script injection
	      // or via the dynamic formats
	      else if (load.metadata.entry) {
	        entry = load.metadata.entry;
	        entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // Contains System.register calls
	      // (dont run bundles in the builder)
	      else if (!(loader.builder && load.metadata.bundle) 
	          && (load.metadata.format == 'register' || load.metadata.format == 'esm' || load.metadata.format == 'es6')) {
	        
	        if (typeof __exec != 'undefined')
	          __exec.call(loader, load);

	        if (!load.metadata.entry && !load.metadata.bundle)
	          throw new Error(load.name + ' detected as ' + load.metadata.format + ' but didn\'t execute.');

	        entry = load.metadata.entry;

	        // support metadata deps for System.register
	        if (entry && load.metadata.deps)
	          entry.deps = entry.deps.concat(load.metadata.deps);
	      }

	      // named bundles are just an empty module
	      if (!entry) {
	        entry = createEntry();
	        entry.deps = load.metadata.deps;
	        entry.execute = function() {};
	      }

	      // place this module onto defined for circular references
	      loader.defined[load.name] = entry;
	      
	      var grouped = group(entry.deps);
	      
	      entry.deps = grouped.names;
	      entry.originalIndices = grouped.indices;
	      entry.name = load.name;
	      entry.esmExports = load.metadata.esmExports !== false;

	      // first, normalize all dependencies
	      var normalizePromises = [];
	      for (var i = 0, l = entry.deps.length; i < l; i++)
	        normalizePromises.push(Promise.resolve(loader.normalize(entry.deps[i], load.name)));

	      return Promise.all(normalizePromises).then(function(normalizedDeps) {

	        entry.normalizedDeps = normalizedDeps;

	        return {
	          deps: entry.deps,
	          execute: function() {
	            // recursively ensure that the module and all its 
	            // dependencies are linked (with dependency group handling)
	            link(load.name, entry, loader);

	            // now handle dependency execution in correct order
	            ensureEvaluated(load.name, entry, [], loader);

	            if (!entry.esModule)
	              entry.esModule = loader.newModule(entry.module.exports);

	            // remove from the registry
	            if (!loader.trace)
	              loader.defined[load.name] = undefined;

	            // return the defined module object
	            return entry.esModule;
	          }
	        };
	      });
	    };
	  });
	})();
	/*
	  System bundles

	  Allows a bundle module to be specified which will be dynamically 
	  loaded before trying to load a given module.

	  For example:
	  SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

	  Will result in a load to "mybundle" whenever a load to "jquery"
	  or "bootstrap/js/bootstrap" is made.

	  In this way, the bundle becomes the request that provides the module
	*/

	(function() {
	  // bundles support (just like RequireJS)
	  // bundle name is module name of bundle itself
	  // bundle is array of modules defined by the bundle
	  // when a module in the bundle is requested, the bundle is loaded instead
	  // of the form SystemJS.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
	  hookConstructor(function(constructor) {
	    return function() {
	      constructor.call(this);
	      this.bundles = {};
	      this._loader.loadedBundles = {};
	    };
	  });

	  // assign bundle metadata for bundle loads
	  hook('locate', function(locate) {
	    return function(load) {
	      var loader = this;
	      var matched = false;

	      if (!(load.name in loader.defined))
	        for (var b in loader.bundles) {
	          for (var i = 0; i < loader.bundles[b].length; i++) {
	            var curModule = loader.bundles[b][i];

	            if (curModule == load.name) {
	              matched = true;
	              break;
	            }

	            // wildcard in bundles does not include / boundaries
	            if (curModule.indexOf('*') != -1) {
	              var parts = curModule.split('*');
	              if (parts.length != 2) {
	                loader.bundles[b].splice(i--, 1);
	                continue;
	              }
	              
	              if (load.name.substring(0, parts[0].length) == parts[0] &&
	                  load.name.substr(load.name.length - parts[1].length, parts[1].length) == parts[1] &&
	                  load.name.substr(parts[0].length, load.name.length - parts[1].length - parts[0].length).indexOf('/') == -1) {
	                matched = true;
	                break;
	              }
	            }
	          }

	          if (matched)
	            return loader['import'](b)
	            .then(function() {
	              return locate.call(loader, load);
	            });
	        }

	      return locate.call(loader, load);
	    };
	  });
	})();
	/*
	 * Script-only addition used for production loader
	 *
	 */
	hookConstructor(function(constructor) {
	  return function() {
	    constructor.apply(this, arguments);
	    __global.define = this.amdDefine;
	  };
	});

	hook('fetch', function(fetch) {
	  return function(load) {
	    load.metadata.scriptLoad = true;
	    return fetch.call(this, load);
	  };
	});System = new SystemJSLoader();

	__global.SystemJS = System;
	System.version = '0.19.41 Register Only';
	  if (typeof module == 'object' && module.exports && typeof exports == 'object')
	    module.exports = System;

	  __global.System = System;

	})(typeof self != 'undefined' ? self : global);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(1)))

/***/ }
/******/ ]);