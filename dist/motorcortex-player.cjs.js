'use strict';

var motorcortex = require('@donkeyclip/motorcortex');

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$2(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fails$q = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$p = fails$q; // Detect IE8's incomplete defineProperty implementation

var descriptors = !fails$p(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

var fails$o = fails$q;
var functionBindNative = !fails$o(function () {
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$2 = functionBindNative;
var FunctionPrototype$3 = Function.prototype;
var bind = FunctionPrototype$3.bind;
var call$a = FunctionPrototype$3.call;
var uncurryThis$u = NATIVE_BIND$2 && bind.bind(call$a, call$a);
var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
  return fn && uncurryThis$u(fn);
} : function (fn) {
  return fn && function () {
    return call$a.apply(fn, arguments);
  };
};

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global$I = // eslint-disable-next-line es/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

var global$H = global$I;
var TypeError$f = global$H.TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible$8 = function (it) {
  if (it == undefined) throw TypeError$f("Can't call method on " + it);
  return it;
};

var global$G = global$I;
var requireObjectCoercible$7 = requireObjectCoercible$8;
var Object$4 = global$G.Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

var toObject$6 = function (argument) {
  return Object$4(requireObjectCoercible$7(argument));
};

var uncurryThis$t = functionUncurryThis;
var toObject$5 = toObject$6;
var hasOwnProperty = uncurryThis$t({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty

var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$5(it), key);
};

var DESCRIPTORS$c = descriptors;
var hasOwn$8 = hasOwnProperty_1;
var FunctionPrototype$2 = Function.prototype; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS$c && Object.getOwnPropertyDescriptor;
var EXISTS$1 = hasOwn$8(FunctionPrototype$2, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS$1 && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE$1 = EXISTS$1 && (!DESCRIPTORS$c || DESCRIPTORS$c && getDescriptor(FunctionPrototype$2, 'name').configurable);
var functionName = {
  EXISTS: EXISTS$1,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE$1
};

var objectDefineProperty = {};

// https://tc39.es/ecma262/#sec-iscallable

var isCallable$g = function (argument) {
  return typeof argument == 'function';
};

var isCallable$f = isCallable$g;

var isObject$b = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$f(it);
};

var global$F = global$I;
var isObject$a = isObject$b;
var document$1 = global$F.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject$a(document$1) && isObject$a(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

var DESCRIPTORS$b = descriptors;
var fails$n = fails$q;
var createElement = documentCreateElement$1; // Thanks to IE8 for its funny defineProperty

var ie8DomDefine = !DESCRIPTORS$b && !fails$n(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

var DESCRIPTORS$a = descriptors;
var fails$m = fails$q; // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334

var v8PrototypeDefineBug = DESCRIPTORS$a && fails$m(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var global$E = global$I;
var isObject$9 = isObject$b;
var String$5 = global$E.String;
var TypeError$e = global$E.TypeError; // `Assert: Type(argument) is Object`

var anObject$a = function (argument) {
  if (isObject$9(argument)) return argument;
  throw TypeError$e(String$5(argument) + ' is not an object');
};

var NATIVE_BIND$1 = functionBindNative;
var call$9 = Function.prototype.call;
var functionCall = NATIVE_BIND$1 ? call$9.bind(call$9) : function () {
  return call$9.apply(call$9, arguments);
};

var global$D = global$I;
var isCallable$e = isCallable$g;

var aFunction = function (argument) {
  return isCallable$e(argument) ? argument : undefined;
};

var getBuiltIn$7 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$D[namespace]) : global$D[namespace] && global$D[namespace][method];
};

var uncurryThis$s = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$s({}.isPrototypeOf);

var getBuiltIn$6 = getBuiltIn$7;
var engineUserAgent = getBuiltIn$6('navigator', 'userAgent') || '';

var global$C = global$I;
var userAgent$2 = engineUserAgent;
var process = global$C.process;
var Deno = global$C.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent$2) {
  match = userAgent$2.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent$2.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION$2 = engineV8Version;
var fails$l = fails$q; // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$l(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = nativeSymbol;
var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == 'symbol';

var global$B = global$I;
var getBuiltIn$5 = getBuiltIn$7;
var isCallable$d = isCallable$g;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var Object$3 = global$B.Object;
var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$5('Symbol');
  return isCallable$d($Symbol) && isPrototypeOf$3($Symbol.prototype, Object$3(it));
};

var global$A = global$I;
var String$4 = global$A.String;

var tryToString$1 = function (argument) {
  try {
    return String$4(argument);
  } catch (error) {
    return 'Object';
  }
};

var global$z = global$I;
var isCallable$c = isCallable$g;
var tryToString = tryToString$1;
var TypeError$d = global$z.TypeError; // `Assert: IsCallable(argument) is true`

var aCallable$2 = function (argument) {
  if (isCallable$c(argument)) return argument;
  throw TypeError$d(tryToString(argument) + ' is not a function');
};

var aCallable$1 = aCallable$2; // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod

var getMethod$3 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$1(func);
};

var global$y = global$I;
var call$8 = functionCall;
var isCallable$b = isCallable$g;
var isObject$8 = isObject$b;
var TypeError$c = global$y.TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$8(val = call$8(fn, input))) return val;
  if (isCallable$b(fn = input.valueOf) && !isObject$8(val = call$8(fn, input))) return val;
  if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$8(val = call$8(fn, input))) return val;
  throw TypeError$c("Can't convert object to primitive value");
};

var shared$4 = {exports: {}};

var global$x = global$I; // eslint-disable-next-line es/no-object-defineproperty -- safe

var defineProperty$5 = Object.defineProperty;

var setGlobal$3 = function (key, value) {
  try {
    defineProperty$5(global$x, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global$x[key] = value;
  }

  return value;
};

var global$w = global$I;
var setGlobal$2 = setGlobal$3;
var SHARED = '__core-js_shared__';
var store$3 = global$w[SHARED] || setGlobal$2(SHARED, {});
var sharedStore = store$3;

var store$2 = sharedStore;
(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.20.3',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.20.3/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var uncurryThis$r = functionUncurryThis;
var id = 0;
var postfix = Math.random();
var toString$e = uncurryThis$r(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$e(++id + postfix, 36);
};

var global$v = global$I;
var shared$3 = shared$4.exports;
var hasOwn$7 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var WellKnownSymbolsStore = shared$3('wks');
var Symbol$3 = global$v.Symbol;
var symbolFor = Symbol$3 && Symbol$3['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$1;

var wellKnownSymbol$e = function (name) {
  if (!hasOwn$7(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn$7(Symbol$3, name)) {
      WellKnownSymbolsStore[name] = Symbol$3[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

var global$u = global$I;
var call$7 = functionCall;
var isObject$7 = isObject$b;
var isSymbol$2 = isSymbol$3;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$d = wellKnownSymbol$e;
var TypeError$b = global$u.TypeError;
var TO_PRIMITIVE = wellKnownSymbol$d('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

var toPrimitive$2 = function (input, pref) {
  if (!isObject$7(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$7(exoticToPrim, input, pref);
    if (!isObject$7(result) || isSymbol$2(result)) return result;
    throw TypeError$b("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive$1 = toPrimitive$2;
var isSymbol$1 = isSymbol$3; // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey

var toPropertyKey$3 = function (argument) {
  var key = toPrimitive$1(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var global$t = global$I;
var DESCRIPTORS$9 = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$9 = anObject$a;
var toPropertyKey$2 = toPropertyKey$3;
var TypeError$a = global$t.TypeError; // eslint-disable-next-line es/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$9(O);
  P = toPropertyKey$2(P);
  anObject$9(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$9(O);
  P = toPropertyKey$2(P);
  anObject$9(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError$a('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$8 = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis$q = functionUncurryThis;
var defineProperty$4 = objectDefineProperty.f;
var FunctionPrototype$1 = Function.prototype;
var functionToString$1 = uncurryThis$q(FunctionPrototype$1.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec$2 = uncurryThis$q(nameRE.exec);
var NAME = 'name'; // Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name

if (DESCRIPTORS$8 && !FUNCTION_NAME_EXISTS) {
  defineProperty$4(FunctionPrototype$1, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec$2(nameRE, functionToString$1(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$2(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$3 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var uncurryThis$p = functionUncurryThis;
var toString$d = uncurryThis$p({}.toString);
var stringSlice$6 = uncurryThis$p(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$6(toString$d(it), 8, -1);
};

var global$s = global$I;
var uncurryThis$o = functionUncurryThis;
var fails$k = fails$q;
var classof$9 = classofRaw$1;
var Object$2 = global$s.Object;
var split = uncurryThis$o(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails$k(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object$2('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$9(it) == 'String' ? split(it, '') : Object$2(it);
} : Object$2;

var IndexedObject = indexedObject;
var requireObjectCoercible$6 = requireObjectCoercible$8;

var toIndexedObject$5 = function (it) {
  return IndexedObject(requireObjectCoercible$6(it));
};

var DESCRIPTORS$7 = descriptors;
var call$6 = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$2 = createPropertyDescriptor$3;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$3;
var hasOwn$6 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine; // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn$6(O, P)) return createPropertyDescriptor$2(!call$6(propertyIsEnumerableModule.f, O, P), O[P]);
};

var DESCRIPTORS$6 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$3;
var createNonEnumerableProperty$5 = DESCRIPTORS$6 ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var redefine$6 = {exports: {}};

var uncurryThis$n = functionUncurryThis;
var isCallable$a = isCallable$g;
var store$1 = sharedStore;
var functionToString = uncurryThis$n(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable$a(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$r = global$I;
var isCallable$9 = isCallable$g;
var inspectSource$2 = inspectSource$3;
var WeakMap$1 = global$r.WeakMap;
var nativeWeakMap = isCallable$9(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;
var keys$2 = shared$2('keys');

var sharedKey$2 = function (key) {
  return keys$2[key] || (keys$2[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$q = global$I;
var uncurryThis$m = functionUncurryThis;
var isObject$6 = isObject$b;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$5 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$2;
var hiddenKeys$3 = hiddenKeys$4;
var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$9 = global$q.TypeError;
var WeakMap = global$q.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject$6(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$9('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$m(store.get);
  var wmhas = uncurryThis$m(store.has);
  var wmset = uncurryThis$m(store.set);

  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$9(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget(store, it) || {};
  };

  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$3[STATE] = true;

  set = function (it, metadata) {
    if (hasOwn$5(it, STATE)) throw new TypeError$9(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return hasOwn$5(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return hasOwn$5(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var global$p = global$I;
var isCallable$8 = isCallable$g;
var hasOwn$4 = hasOwnProperty_1;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var setGlobal$1 = setGlobal$3;
var inspectSource$1 = inspectSource$3;
var InternalStateModule = internalState;
var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
var getInternalState$3 = InternalStateModule.get;
var enforceInternalState$1 = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(redefine$6.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var name = options && options.name !== undefined ? options.name : key;
  var state;

  if (isCallable$8(value)) {
    if (String(name).slice(0, 7) === 'Symbol(') {
      name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
    }

    if (!hasOwn$4(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
      createNonEnumerableProperty$3(value, 'name', name);
    }

    state = enforceInternalState$1(value);

    if (!state.source) {
      state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
    }
  }

  if (O === global$p) {
    if (simple) O[key] = value;else setGlobal$1(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty$3(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return isCallable$8(this) && getInternalState$3(this).source || inspectSource$1(this);
});

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$3 = Math.floor; // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity

var toIntegerOrInfinity$7 = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- safe

  return number !== number || number === 0 ? 0 : (number > 0 ? floor$3 : ceil)(number);
};

var toIntegerOrInfinity$6 = toIntegerOrInfinity$7;
var max$4 = Math.max;
var min$3 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

var toAbsoluteIndex$4 = function (index, length) {
  var integer = toIntegerOrInfinity$6(index);
  return integer < 0 ? max$4(integer + length, 0) : min$3(integer, length);
};

var toIntegerOrInfinity$5 = toIntegerOrInfinity$7;
var min$2 = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

var toLength$3 = function (argument) {
  return argument > 0 ? min$2(toIntegerOrInfinity$5(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$2 = toLength$3; // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike

var lengthOfArrayLike$6 = function (obj) {
  return toLength$2(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex$3 = toAbsoluteIndex$4;
var lengthOfArrayLike$5 = lengthOfArrayLike$6; // `Array.prototype.{ indexOf, includes }` methods implementation

var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$5(O);
    var index = toAbsoluteIndex$3(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var uncurryThis$l = functionUncurryThis;
var hasOwn$3 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;
var push$2 = uncurryThis$l([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !hasOwn$3(hiddenKeys$2, key) && hasOwn$3(O, key) && push$2(result, key); // Don't enum bug & hidden keys


  while (names.length > i) if (hasOwn$3(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$2(result, key);
  }

  return result;
};

var enumBugKeys$3 = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe

objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$7;
var uncurryThis$k = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$8 = anObject$a;
var concat$1 = uncurryThis$k([].concat); // all object keys, includes non-enumerable and symbols

var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$8(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$2 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$4 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$4.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn$2(target, key) && !(exceptions && hasOwn$2(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$j = fails$q;
var isCallable$7 = isCallable$g;
var replacement = /#|\.prototype\./;

var isForced$3 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$7(detection) ? fails$j(detection) : !!detection;
};

var normalize = isForced$3.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$3.data = {};
var NATIVE = isForced$3.NATIVE = 'N';
var POLYFILL = isForced$3.POLYFILL = 'P';
var isForced_1 = isForced$3;

var global$o = global$I;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var redefine$5 = redefine$6.exports;
var setGlobal = setGlobal$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$2 = isForced_1;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
  options.name        - the .name of the function if it does not match the key
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global$o;
  } else if (STATIC) {
    target = global$o[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global$o[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced$2(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty$2(sourceProperty, 'sham', true);
    } // extend global


    redefine$5(target, key, sourceProperty, options);
  }
};

var wellKnownSymbol$c = wellKnownSymbol$e;
var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
var test$1 = {};
test$1[TO_STRING_TAG$1] = 'z';
var toStringTagSupport = String(test$1) === '[object z]';

var global$n = global$I;
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$6 = isCallable$g;
var classofRaw = classofRaw$1;
var wellKnownSymbol$b = wellKnownSymbol$e;
var TO_STRING_TAG = wellKnownSymbol$b('toStringTag');
var Object$1 = global$n.Object; // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof$8 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object$1(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && isCallable$6(O.callee) ? 'Arguments' : result;
};

var global$m = global$I;
var classof$7 = classof$8;
var String$3 = global$m.String;

var toString$c = function (argument) {
  if (classof$7(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return String$3(argument);
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule$3 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$3;

var createProperty$4 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule$3.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

var global$l = global$I;
var toAbsoluteIndex$2 = toAbsoluteIndex$4;
var lengthOfArrayLike$4 = lengthOfArrayLike$6;
var createProperty$3 = createProperty$4;
var Array$4 = global$l.Array;
var max$3 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$4(O);
  var k = toAbsoluteIndex$2(start, length);
  var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
  var result = Array$4(max$3(fin - k, 0));

  for (var n = 0; k < fin; k++, n++) createProperty$3(result, n, O[k]);

  result.length = n;
  return result;
};

var arraySlice$2 = arraySliceSimple;
var floor$2 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$2(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(array, mergeSort(arraySlice$2(array, 0, middle), comparefn), mergeSort(arraySlice$2(array, middle), comparefn), comparefn);
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];

    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }

    if (j !== i++) array[j] = element;
  }

  return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
  }

  return array;
};

var arraySort = mergeSort;

var fails$i = fails$q;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$i(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var userAgent$1 = engineUserAgent;
var firefox = userAgent$1.match(/firefox\/(\d+)/i);
var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;
var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent = engineUserAgent;
var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);
var engineWebkitVersion = !!webkit && +webkit[1];

var $$d = _export;
var uncurryThis$j = functionUncurryThis;
var aCallable = aCallable$2;
var toObject$4 = toObject$6;
var lengthOfArrayLike$3 = lengthOfArrayLike$6;
var toString$b = toString$c;
var fails$h = fails$q;
var internalSort = arraySort;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;
var test = [];
var un$Sort = uncurryThis$j(test.sort);
var push$1 = uncurryThis$j(test.push); // IE8-

var FAILS_ON_UNDEFINED = fails$h(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails$h(function () {
  test.sort(null);
}); // Old WebKit

var STRICT_METHOD = arrayMethodIsStrict('sort');
var STABLE_SORT = !fails$h(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;
  var result = '';
  var code, chr, value, index; // generate an array with more 512 elements (Chakra and old V8 fails only in this case)

  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;

      case 68:
      case 71:
        value = 4;
        break;

      default:
        value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({
        k: chr + index,
        v: value
      });
    }
  }

  test.sort(function (a, b) {
    return b.v - a.v;
  });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});
var FORCED$5 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString$b(x) > toString$b(y) ? 1 : -1;
  };
}; // `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort


$$d({
  target: 'Array',
  proto: true,
  forced: FORCED$5
}, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);
    var array = toObject$4(this);
    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);
    var items = [];
    var arrayLength = lengthOfArrayLike$3(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push$1(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));
    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];

    while (index < arrayLength) delete array[index++];

    return array;
  }
});

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3; // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe

var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var $$c = _export;
var toObject$3 = toObject$6;
var nativeKeys = objectKeys$1;
var fails$g = fails$q;
var FAILS_ON_PRIMITIVES = fails$g(function () {
  nativeKeys(1);
}); // `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys

$$c({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  keys: function keys(it) {
    return nativeKeys(toObject$3(it));
  }
});

var classof$6 = classofRaw$1; // `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe

var isArray$3 = Array.isArray || function isArray(argument) {
  return classof$6(argument) == 'Array';
};

var uncurryThis$i = functionUncurryThis;
var fails$f = fails$q;
var isCallable$5 = isCallable$g;
var classof$5 = classof$8;
var getBuiltIn$3 = getBuiltIn$7;
var inspectSource = inspectSource$3;

var noop = function () {
  /* empty */
};

var empty = [];
var construct = getBuiltIn$3('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$4 = uncurryThis$i(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$5(argument)) return false;

  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$5(argument)) return false;

  switch (classof$5(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction':
      return false;
  }

  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$4(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true; // `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor

var isConstructor$2 = !construct || fails$f(function () {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function () {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;

var global$k = global$I;
var isArray$2 = isArray$3;
var isConstructor$1 = isConstructor$2;
var isObject$5 = isObject$b;
var wellKnownSymbol$a = wellKnownSymbol$e;
var SPECIES$4 = wellKnownSymbol$a('species');
var Array$3 = global$k.Array; // a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesConstructor$1 = function (originalArray) {
  var C;

  if (isArray$2(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (isConstructor$1(C) && (C === Array$3 || isArray$2(C.prototype))) C = undefined;else if (isObject$5(C)) {
      C = C[SPECIES$4];
      if (C === null) C = undefined;
    }
  }

  return C === undefined ? Array$3 : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1; // `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate$2 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var fails$e = fails$q;
var wellKnownSymbol$9 = wellKnownSymbol$e;
var V8_VERSION$1 = engineV8Version;
var SPECIES$3 = wellKnownSymbol$9('species');

var arrayMethodHasSpeciesSupport$3 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$e(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES$3] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var $$b = _export;
var global$j = global$I;
var toAbsoluteIndex$1 = toAbsoluteIndex$4;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$7;
var lengthOfArrayLike$2 = lengthOfArrayLike$6;
var toObject$2 = toObject$6;
var arraySpeciesCreate$1 = arraySpeciesCreate$2;
var createProperty$2 = createProperty$4;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$3;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$2('splice');
var TypeError$8 = global$j.TypeError;
var max$2 = Math.max;
var min$1 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$$b({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT$1
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject$2(this);
    var len = lengthOfArrayLike$2(O);
    var actualStart = toAbsoluteIndex$1(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$1(max$2(toIntegerOrInfinity$4(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError$8(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate$1(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty$2(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var objectDefineProperties = {};

var DESCRIPTORS$5 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$7 = anObject$a;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$1; // `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe

objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$7(O);
  var props = toIndexedObject$1(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);

  return O;
};

var getBuiltIn$2 = getBuiltIn$7;
var html$1 = getBuiltIn$2('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */
var anObject$6 = anObject$a;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey = sharedKey$2;
var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () {
  /* empty */
};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
}; // Create object with fake `null` prototype: use ActiveX Object with cleared prototype


var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak

  return temp;
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe); // https://github.com/zloirock/core-js/issues/475

  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
}; // Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug


var activeXDocument;

var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) {
    /* ignore */
  }

  NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH

  var length = enumBugKeys.length;

  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];

  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true; // `Object.create` method
// https://tc39.es/ecma262/#sec-object.create

var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$6(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = NullProtoObject();

  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$8 = wellKnownSymbol$e;
var create$1 = objectCreate;
var definePropertyModule$1 = objectDefineProperty;
var UNSCOPABLES = wellKnownSymbol$8('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule$1.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$1(null)
  });
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables$1 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var $$a = _export;
var $includes = arrayIncludes.includes;
var addToUnscopables = addToUnscopables$1; // `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes

$$a({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

var isObject$4 = isObject$b;
var classof$4 = classofRaw$1;
var wellKnownSymbol$7 = wellKnownSymbol$e;
var MATCH$2 = wellKnownSymbol$7('match'); // `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject$4(it) && ((isRegExp = it[MATCH$2]) !== undefined ? !!isRegExp : classof$4(it) == 'RegExp');
};

var global$i = global$I;
var isRegExp$1 = isRegexp;
var TypeError$7 = global$i.TypeError;

var notARegexp = function (it) {
  if (isRegExp$1(it)) {
    throw TypeError$7("The method doesn't accept regular expressions");
  }

  return it;
};

var wellKnownSymbol$6 = wellKnownSymbol$e;
var MATCH$1 = wellKnownSymbol$6('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) {
      /* empty */
    }
  }

  return false;
};

var $$9 = _export;
var uncurryThis$h = functionUncurryThis;
var notARegExp = notARegexp;
var requireObjectCoercible$5 = requireObjectCoercible$8;
var toString$a = toString$c;
var correctIsRegExpLogic = correctIsRegexpLogic;
var stringIndexOf$2 = uncurryThis$h(''.indexOf); // `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes

$$9({
  target: 'String',
  proto: true,
  forced: !correctIsRegExpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~stringIndexOf$2(toString$a(requireObjectCoercible$5(this)), toString$a(notARegExp(searchString)), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var uncurryThis$g = functionUncurryThis;
var arraySlice$1 = uncurryThis$g([].slice);

var $$8 = _export;
var global$h = global$I;
var isArray$1 = isArray$3;
var isConstructor = isConstructor$2;
var isObject$3 = isObject$b;
var toAbsoluteIndex = toAbsoluteIndex$4;
var lengthOfArrayLike$1 = lengthOfArrayLike$6;
var toIndexedObject = toIndexedObject$5;
var createProperty$1 = createProperty$4;
var wellKnownSymbol$5 = wellKnownSymbol$e;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$3;
var un$Slice = arraySlice$1;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$1('slice');
var SPECIES$2 = wellKnownSymbol$5('species');
var Array$2 = global$h.Array;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$$8({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike$1(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray$1(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (isConstructor(Constructor) && (Constructor === Array$2 || isArray$1(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$3(Constructor)) {
        Constructor = Constructor[SPECIES$2];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array$2 || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array$2 : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$1(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var whitespaces$4 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' + '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$f = functionUncurryThis;
var requireObjectCoercible$4 = requireObjectCoercible$8;
var toString$9 = toString$c;
var whitespaces$3 = whitespaces$4;
var replace$4 = uncurryThis$f(''.replace);
var whitespace = '[' + whitespaces$3 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = toString$9(requireObjectCoercible$4($this));
    if (TYPE & 1) string = replace$4(string, ltrim, '');
    if (TYPE & 2) string = replace$4(string, rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var global$g = global$I;
var fails$d = fails$q;
var uncurryThis$e = functionUncurryThis;
var toString$8 = toString$c;
var trim$2 = stringTrim.trim;
var whitespaces$2 = whitespaces$4;
var $parseInt$1 = global$g.parseInt;
var Symbol$2 = global$g.Symbol;
var ITERATOR$1 = Symbol$2 && Symbol$2.iterator;
var hex = /^[+-]?0x/i;
var exec$3 = uncurryThis$e(hex.exec);
var FORCED$4 = $parseInt$1(whitespaces$2 + '08') !== 8 || $parseInt$1(whitespaces$2 + '0x16') !== 22 // MS Edge 18- broken with boxed symbols
|| ITERATOR$1 && !fails$d(function () {
  $parseInt$1(Object(ITERATOR$1));
}); // `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix

var numberParseInt = FORCED$4 ? function parseInt(string, radix) {
  var S = trim$2(toString$8(string));
  return $parseInt$1(S, radix >>> 0 || (exec$3(hex, S) ? 16 : 10));
} : $parseInt$1;

var $$7 = _export;
var $parseInt = numberParseInt; // `parseInt` method
// https://tc39.es/ecma262/#sec-parseint-string-radix

$$7({
  global: true,
  forced: parseInt != $parseInt
}, {
  parseInt: $parseInt
});

var uncurryThis$d = functionUncurryThis; // `thisNumberValue` abstract operation
// https://tc39.es/ecma262/#sec-thisnumbervalue

var thisNumberValue$2 = uncurryThis$d(1.0.valueOf);

var global$f = global$I;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$7;
var toString$7 = toString$c;
var requireObjectCoercible$3 = requireObjectCoercible$8;
var RangeError$1 = global$f.RangeError; // `String.prototype.repeat` method implementation
// https://tc39.es/ecma262/#sec-string.prototype.repeat

var stringRepeat = function repeat(count) {
  var str = toString$7(requireObjectCoercible$3(this));
  var result = '';
  var n = toIntegerOrInfinity$3(count);
  if (n < 0 || n == Infinity) throw RangeError$1('Wrong number of repetitions');

  for (; n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;

  return result;
};

var $$6 = _export;
var global$e = global$I;
var uncurryThis$c = functionUncurryThis;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$7;
var thisNumberValue$1 = thisNumberValue$2;
var $repeat = stringRepeat;
var fails$c = fails$q;
var RangeError = global$e.RangeError;
var String$2 = global$e.String;
var floor$1 = Math.floor;
var repeat = uncurryThis$c($repeat);
var stringSlice$5 = uncurryThis$c(''.slice);
var un$ToFixed = uncurryThis$c(1.0.toFixed);

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;

  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }

  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }

  return n;
};

var multiply = function (data, n, c) {
  var index = -1;
  var c2 = c;

  while (++index < 6) {
    c2 += n * data[index];
    data[index] = c2 % 1e7;
    c2 = floor$1(c2 / 1e7);
  }
};

var divide = function (data, n) {
  var index = 6;
  var c = 0;

  while (--index >= 0) {
    c += data[index];
    data[index] = floor$1(c / n);
    c = c % n * 1e7;
  }
};

var dataToString = function (data) {
  var index = 6;
  var s = '';

  while (--index >= 0) {
    if (s !== '' || index === 0 || data[index] !== 0) {
      var t = String$2(data[index]);
      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
    }
  }

  return s;
};

var FORCED$3 = fails$c(function () {
  return un$ToFixed(0.00008, 3) !== '0.000' || un$ToFixed(0.9, 0) !== '1' || un$ToFixed(1.255, 2) !== '1.25' || un$ToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
}) || !fails$c(function () {
  // V8 ~ Android 4.3-
  un$ToFixed({});
}); // `Number.prototype.toFixed` method
// https://tc39.es/ecma262/#sec-number.prototype.tofixed

$$6({
  target: 'Number',
  proto: true,
  forced: FORCED$3
}, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue$1(this);
    var fractDigits = toIntegerOrInfinity$2(fractionDigits);
    var data = [0, 0, 0, 0, 0, 0];
    var sign = '';
    var result = '0';
    var e, z, j, k; // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation

    if (fractDigits < 0 || fractDigits > 20) throw RangeError('Incorrect fraction digits'); // eslint-disable-next-line no-self-compare -- NaN check

    if (number != number) return 'NaN';
    if (number <= -1e21 || number >= 1e21) return String$2(number);

    if (number < 0) {
      sign = '-';
      number = -number;
    }

    if (number > 1e-21) {
      e = log(number * pow(2, 69, 1)) - 69;
      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        multiply(data, 0, z);
        j = fractDigits;

        while (j >= 7) {
          multiply(data, 1e7, 0);
          j -= 7;
        }

        multiply(data, pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          divide(data, 1 << 23);
          j -= 23;
        }

        divide(data, 1 << j);
        multiply(data, 1, 1);
        divide(data, 2);
        result = dataToString(data);
      } else {
        multiply(data, 0, z);
        multiply(data, 1 << -e, 0);
        result = dataToString(data) + repeat('0', fractDigits);
      }
    }

    if (fractDigits > 0) {
      k = result.length;
      result = sign + (k <= fractDigits ? '0.' + repeat('0', fractDigits - k) + result : stringSlice$5(result, 0, k - fractDigits) + '.' + stringSlice$5(result, k - fractDigits));
    } else {
      result = sign + result;
    }

    return result;
  }
});

var $$5 = _export;
var global$d = global$I;
var fails$b = fails$q;
var isArray = isArray$3;
var isObject$2 = isObject$b;
var toObject$1 = toObject$6;
var lengthOfArrayLike = lengthOfArrayLike$6;
var createProperty = createProperty$4;
var arraySpeciesCreate = arraySpeciesCreate$2;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$3;
var wellKnownSymbol$4 = wellKnownSymbol$e;
var V8_VERSION = engineV8Version;
var IS_CONCAT_SPREADABLE = wellKnownSymbol$4('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var TypeError$6 = global$d.TypeError; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$b(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$2(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$$5({
  target: 'Array',
  proto: true,
  forced: FORCED$2
}, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$1(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError$6(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

var anObject$5 = anObject$a; // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags$1 = function () {
  var that = anObject$5(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var fails$a = fails$q;
var global$c = global$I; // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError

var $RegExp$2 = global$c.RegExp;
var UNSUPPORTED_Y$2 = fails$a(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
}); // UC Browser bug
// https://github.com/zloirock/core-js/issues/1008

var MISSED_STICKY$2 = UNSUPPORTED_Y$2 || fails$a(function () {
  return !$RegExp$2('a', 'y').sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$a(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$2,
  UNSUPPORTED_Y: UNSUPPORTED_Y$2
};

var fails$9 = fails$q;
var global$b = global$I; // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError

var $RegExp$1 = global$b.RegExp;
var regexpUnsupportedDotAll = fails$9(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$8 = fails$q;
var global$a = global$I; // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError

var $RegExp = global$a.RegExp;
var regexpUnsupportedNcg = fails$8(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' || 'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */

/* eslint-disable regexp/no-useless-quantifier -- testing */


var call$5 = functionCall;
var uncurryThis$b = functionUncurryThis;
var toString$6 = toString$c;
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState$2 = internalState.get;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$6 = uncurryThis$b(''.charAt);
var indexOf = uncurryThis$b(''.indexOf);
var replace$3 = uncurryThis$b(''.replace);
var stringSlice$4 = uncurryThis$b(''.slice);

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$5(nativeExec, re1, 'a');
  call$5(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}();

var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET; // nonparticipating capturing group, copied from es5-shim's String#split patch.

var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$2(re);
    var str = toString$6(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$5(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = call$5(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$3(flags, 'y', '');

      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$4(str, re.lastIndex); // Support anchored sticky behavior.

      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$6(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      } // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.


      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = call$5(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$4(match.input, charsAdded);
        match[0] = stringSlice$4(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      call$5(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);

      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$4 = _export;
var exec$2 = regexpExec$2; // `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec

$$4({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== exec$2
}, {
  exec: exec$2
});

var NATIVE_BIND = functionBindNative;
var FunctionPrototype = Function.prototype;
var apply$2 = FunctionPrototype.apply;
var call$4 = FunctionPrototype.call; // eslint-disable-next-line es/no-reflect -- safe

var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call$4.bind(apply$2) : function () {
  return call$4.apply(apply$2, arguments);
});

var uncurryThis$a = functionUncurryThis;
var redefine$4 = redefine$6.exports;
var regexpExec$1 = regexpExec$2;
var fails$7 = fails$q;
var wellKnownSymbol$3 = wellKnownSymbol$e;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var SPECIES$1 = wellKnownSymbol$3('species');
var RegExpPrototype$4 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$3(KEY);
  var DELEGATES_TO_SYMBOL = !fails$7(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$7(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$1] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED) {
    var uncurriedNativeRegExpMethod = uncurryThis$a(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$a(nativeMethod);
      var $exec = regexp.exec;

      if ($exec === regexpExec$1 || $exec === RegExpPrototype$4.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: uncurriedNativeRegExpMethod(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: uncurriedNativeMethod(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    redefine$4(String.prototype, KEY, methods[0]);
    redefine$4(RegExpPrototype$4, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$1(RegExpPrototype$4[SYMBOL], 'sham', true);
};

var uncurryThis$9 = functionUncurryThis;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$7;
var toString$5 = toString$c;
var requireObjectCoercible$2 = requireObjectCoercible$8;
var charAt$5 = uncurryThis$9(''.charAt);
var charCodeAt$2 = uncurryThis$9(''.charCodeAt);
var stringSlice$3 = uncurryThis$9(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$5(requireObjectCoercible$2($this));
    var position = toIntegerOrInfinity$1(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$2(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = charCodeAt$2(S, position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? charAt$5(S, position) : first : CONVERT_TO_STRING ? stringSlice$3(S, position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

var charAt$4 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex

var advanceStringIndex$2 = function (S, index, unicode) {
  return index + (unicode ? charAt$4(S, index).length : 1);
};

var uncurryThis$8 = functionUncurryThis;
var toObject = toObject$6;
var floor = Math.floor;
var charAt$3 = uncurryThis$8(''.charAt);
var replace$2 = uncurryThis$8(''.replace);
var stringSlice$2 = uncurryThis$8(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g; // `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution

var getSubstitution$1 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }

  return replace$2(replacement, symbols, function (match, ch) {
    var capture;

    switch (charAt$3(ch, 0)) {
      case '$':
        return '$';

      case '&':
        return matched;

      case '`':
        return stringSlice$2(str, 0, position);

      case "'":
        return stringSlice$2(str, tailPos);

      case '<':
        capture = namedCaptures[stringSlice$2(ch, 1, -1)];
        break;

      default:
        // \d\d?
        var n = +ch;
        if (n === 0) return match;

        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
          return match;
        }

        capture = captures[n - 1];
    }

    return capture === undefined ? '' : capture;
  });
};

var global$9 = global$I;
var call$3 = functionCall;
var anObject$4 = anObject$a;
var isCallable$4 = isCallable$g;
var classof$3 = classofRaw$1;
var regexpExec = regexpExec$2;
var TypeError$5 = global$9.TypeError; // `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec

var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (isCallable$4(exec)) {
    var result = call$3(exec, R, S);
    if (result !== null) anObject$4(result);
    return result;
  }

  if (classof$3(R) === 'RegExp') return call$3(regexpExec, R, S);
  throw TypeError$5('RegExp#exec called on incompatible receiver');
};

var apply$1 = functionApply;
var call$2 = functionCall;
var uncurryThis$7 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var fails$6 = fails$q;
var anObject$3 = anObject$a;
var isCallable$3 = isCallable$g;
var toIntegerOrInfinity = toIntegerOrInfinity$7;
var toLength$1 = toLength$3;
var toString$4 = toString$c;
var requireObjectCoercible$1 = requireObjectCoercible$8;
var advanceStringIndex$1 = advanceStringIndex$2;
var getMethod$1 = getMethod$3;
var getSubstitution = getSubstitution$1;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$2 = wellKnownSymbol$e;
var REPLACE = wellKnownSymbol$2('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis$7([].concat);
var push = uncurryThis$7([].push);
var stringIndexOf$1 = uncurryThis$7(''.indexOf);
var stringSlice$1 = uncurryThis$7(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0


var REPLACE_KEEPS_$0 = function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
}(); // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string


var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }

  return false;
}();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$6(function () {
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  }; // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive


  return ''.replace(re, '$<a>') !== '7';
}); // @@replace logic

fixRegExpWellKnownSymbolLogic$1('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';
  return [// `String.prototype.replace` method
  // https://tc39.es/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible$1(this);
    var replacer = searchValue == undefined ? undefined : getMethod$1(searchValue, REPLACE);
    return replacer ? call$2(replacer, searchValue, O, replaceValue) : call$2(nativeReplace, toString$4(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
  function (string, replaceValue) {
    var rx = anObject$3(this);
    var S = toString$4(string);

    if (typeof replaceValue == 'string' && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, '$<') === -1) {
      var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
      if (res.done) return res.value;
    }

    var functionalReplace = isCallable$3(replaceValue);
    if (!functionalReplace) replaceValue = toString$4(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec$1(rx, S);
      if (result === null) break;
      push(results, result);
      if (!global) break;
      var matchStr = toString$4(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex$1(S, toLength$1(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = toString$4(result[0]);
      var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = concat([matched], captures, position, S);
        if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
        var replacement = toString$4(apply$1(replaceValue, undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += stringSlice$1(S, nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + stringSlice$1(S, nextSourcePosition);
  }];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var fails$5 = fails$q;
var whitespaces$1 = whitespaces$4;
var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var stringTrimForced = function (METHOD_NAME) {
  return fails$5(function () {
    return !!whitespaces$1[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME$1 && whitespaces$1[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $$3 = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod = stringTrimForced; // `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim

$$3({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
});

// the players start name
var name = "--mc-player";

var global$8 = global$I;
var isCallable$2 = isCallable$g;
var String$1 = global$8.String;
var TypeError$4 = global$8.TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$2(argument)) return argument;
  throw TypeError$4("Can't set " + String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */
var uncurryThis$6 = functionUncurryThis;
var anObject$2 = anObject$a;
var aPossiblePrototype = aPossiblePrototype$1; // `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe

var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$6(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject$2(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var isCallable$1 = isCallable$g;
var isObject$1 = isObject$b;
var setPrototypeOf = objectSetPrototypeOf; // makes subclassing work correct for wrapped built-ins

var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  isCallable$1(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$1(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var getBuiltIn$1 = getBuiltIn$7;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$1 = wellKnownSymbol$e;
var DESCRIPTORS$4 = descriptors;
var SPECIES = wellKnownSymbol$1('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS$4 && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var DESCRIPTORS$3 = descriptors;
var global$7 = global$I;
var uncurryThis$5 = functionUncurryThis;
var isForced$1 = isForced_1;
var inheritIfRequired$1 = inheritIfRequired$2;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var defineProperty$3 = objectDefineProperty.f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var isPrototypeOf$2 = objectIsPrototypeOf;
var isRegExp = isRegexp;
var toString$3 = toString$c;
var regExpFlags$1 = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var redefine$3 = redefine$6.exports;
var fails$4 = fails$q;
var hasOwn$1 = hasOwnProperty_1;
var enforceInternalState = internalState.enforce;
var setSpecies = setSpecies$1;
var wellKnownSymbol = wellKnownSymbol$e;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var MATCH = wellKnownSymbol('match');
var NativeRegExp = global$7.RegExp;
var RegExpPrototype$3 = NativeRegExp.prototype;
var SyntaxError = global$7.SyntaxError;
var getFlags$1 = uncurryThis$5(regExpFlags$1);
var exec$1 = uncurryThis$5(RegExpPrototype$3.exec);
var charAt$2 = uncurryThis$5(''.charAt);
var replace$1 = uncurryThis$5(''.replace);
var stringIndexOf = uncurryThis$5(''.indexOf);
var stringSlice = uncurryThis$5(''.slice); // TODO: Use only propper RegExpIdentifierName

var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g; // "new" should create a new object, old webkit bug

var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var MISSED_STICKY$1 = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var BASE_FORCED = DESCRIPTORS$3 && (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$4(function () {
  re2[MATCH] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
}));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;

  for (; index <= length; index++) {
    chr = charAt$2(string, index);

    if (chr === '\\') {
      result += chr + charAt$2(string, ++index);
      continue;
    }

    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      }

      result += chr;
    }
  }

  return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;

  for (; index <= length; index++) {
    chr = charAt$2(string, index);

    if (chr === '\\') {
      chr = chr + charAt$2(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;

      case chr === '(':
        if (exec$1(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }

        result += chr;
        groupid++;
        continue;

      case chr === '>' && ncg:
        if (groupname === '' || hasOwn$1(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }

        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }

    if (ncg) groupname += chr;else result += chr;
  }

  return [result, named];
}; // `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor


if (isForced$1('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf$2(RegExpPrototype$3, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf$2(RegExpPrototype$3, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = 'flags' in rawPattern ? rawPattern.flags : getFlags$1(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString$3(pattern);
    flags = flags === undefined ? '' : toString$3(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace$1(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY$1 && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace$1(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired$1(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$3, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);

      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }

      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) {
      /* empty */
    }
    return result;
  };

  var proxy = function (key) {
    key in RegExpWrapper || defineProperty$3(RegExpWrapper, key, {
      configurable: true,
      get: function () {
        return NativeRegExp[key];
      },
      set: function (it) {
        NativeRegExp[key] = it;
      }
    });
  };

  for (var keys$1 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$1.length > index;) {
    proxy(keys$1[index++]);
  }

  RegExpPrototype$3.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$3;
  redefine$3(global$7, 'RegExp', RegExpWrapper);
} // https://tc39.es/ecma262/#sec-get-regexp-@@species


setSpecies('RegExp');

var global$6 = global$I;
var DESCRIPTORS$2 = descriptors;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var classof$2 = classofRaw$1;
var defineProperty$2 = objectDefineProperty.f;
var getInternalState$1 = internalState.get;
var RegExpPrototype$2 = RegExp.prototype;
var TypeError$3 = global$6.TypeError; // `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall

if (DESCRIPTORS$2 && UNSUPPORTED_DOT_ALL) {
  defineProperty$2(RegExpPrototype$2, 'dotAll', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype$2) return undefined; // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.

      if (classof$2(this) === 'RegExp') {
        return !!getInternalState$1(this).dotAll;
      }

      throw TypeError$3('Incompatible receiver, RegExp required');
    }
  });
}

var global$5 = global$I;
var DESCRIPTORS$1 = descriptors;
var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
var classof$1 = classofRaw$1;
var defineProperty$1 = objectDefineProperty.f;
var getInternalState = internalState.get;
var RegExpPrototype$1 = RegExp.prototype;
var TypeError$2 = global$5.TypeError; // `RegExp.prototype.sticky` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky

if (DESCRIPTORS$1 && MISSED_STICKY) {
  defineProperty$1(RegExpPrototype$1, 'sticky', {
    configurable: true,
    get: function () {
      if (this === RegExpPrototype$1) return undefined; // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.

      if (classof$1(this) === 'RegExp') {
        return !!getInternalState(this).sticky;
      }

      throw TypeError$2('Incompatible receiver, RegExp required');
    }
  });
}

var uncurryThis$4 = functionUncurryThis;
var PROPER_FUNCTION_NAME = functionName.PROPER;
var redefine$2 = redefine$6.exports;
var anObject$1 = anObject$a;
var isPrototypeOf$1 = objectIsPrototypeOf;
var $toString = toString$c;
var fails$3 = fails$q;
var regExpFlags = regexpFlags$1;
var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var n$ToString = RegExpPrototype[TO_STRING];
var getFlags = uncurryThis$4(regExpFlags);
var NOT_GENERIC = fails$3(function () {
  return n$ToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = PROPER_FUNCTION_NAME && n$ToString.name != TO_STRING; // `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine$2(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$1(this);
    var p = $toString(R.source);
    var rf = R.flags;
    var f = $toString(rf === undefined && isPrototypeOf$1(RegExpPrototype, R) && !('flags' in RegExpPrototype) ? getFlags(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}

var call$1 = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject = anObject$a;
var toLength = toLength$3;
var toString$2 = toString$c;
var requireObjectCoercible = requireObjectCoercible$8;
var getMethod = getMethod$3;
var advanceStringIndex = advanceStringIndex$2;
var regExpExec = regexpExecAbstract; // @@match logic

fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.es/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
    return matcher ? call$1(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$2(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
  function (string) {
    var rx = anObject(this);
    var S = toString$2(string);
    var res = maybeCallNative(nativeMatch, rx, S);
    if (res.done) return res.value;
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = toString$2(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

var DESCRIPTORS = descriptors;
var global$4 = global$I;
var uncurryThis$3 = functionUncurryThis;
var isForced = isForced_1;
var redefine$1 = redefine$6.exports;
var hasOwn = hasOwnProperty_1;
var inheritIfRequired = inheritIfRequired$2;
var isPrototypeOf = objectIsPrototypeOf;
var isSymbol = isSymbol$3;
var toPrimitive = toPrimitive$2;
var fails$2 = fails$q;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var defineProperty = objectDefineProperty.f;
var thisNumberValue = thisNumberValue$2;
var trim$1 = stringTrim.trim;
var NUMBER = 'Number';
var NativeNumber = global$4[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError$1 = global$4.TypeError;
var arraySlice = uncurryThis$3(''.slice);
var charCodeAt$1 = uncurryThis$3(''.charCodeAt); // `ToNumeric` abstract operation
// https://tc39.es/ecma262/#sec-tonumeric

var toNumeric = function (value) {
  var primValue = toPrimitive(value, 'number');
  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
}; // `ToNumber` abstract operation
// https://tc39.es/ecma262/#sec-tonumber


var toNumber = function (argument) {
  var it = toPrimitive(argument, 'number');
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol(it)) throw TypeError$1('Cannot convert a Symbol value to a number');

  if (typeof it == 'string' && it.length > 2) {
    it = trim$1(it);
    first = charCodeAt$1(it, 0);

    if (first === 43 || first === 45) {
      third = charCodeAt$1(it, 2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (charCodeAt$1(it, 1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = arraySlice(it, 2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = charCodeAt$1(digits, index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.es/ecma262/#sec-number-constructor


if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
    var dummy = this; // check on 1..constructor(foo) case

    return isPrototypeOf(NumberPrototype, dummy) && fails$2(function () {
      thisNumberValue(dummy);
    }) ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
  };

  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' + // ESNext
  'fromString,range').split(','), j = 0, key; keys.length > j; j++) {
    if (hasOwn(NativeNumber, key = keys[j]) && !hasOwn(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine$1(global$4, NUMBER, NumberWrapper);
}

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof = classof$8; // `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring

var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var redefine = redefine$6.exports;
var toString$1 = objectToString; // `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring

if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString$1, {
    unsafe: true
  });
}

var $$2 = _export;
var global$3 = global$I;
var call = functionCall;
var uncurryThis$2 = functionUncurryThis;
var isCallable = isCallable$g;
var isObject = isObject$b;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;

  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };

  return re.test('abc') === true && execCalled;
}();

var Error = global$3.Error;
var un$Test = uncurryThis$2(/./.test); // `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test

$$2({
  target: 'RegExp',
  proto: true,
  forced: !DELEGATES_TO_EXEC
}, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable(exec)) return un$Test(this, str);
    var result = call(exec, this, str);

    if (result !== null && !isObject(result)) {
      throw new Error('RegExp exec method returned something other than an Object or null');
    }

    return !!result;
  }
});

var VOLUME_CHANGE = "volume-change";
var MUTE_CHANGE = "mute-change";
var SPEED_CHANGE = "speed-change";
var LOOP_CHANGE = "loop-change";
var SCALE_CHANGE = "scale-change";
var SHOW_VOLUME_CHANGE = "show-volume-change";
var STATE_CHANGE = "state-change";
var DURATION_CHANGE = "duration-change"; // Mouce/Touch

var mouseup = "mouseup";
var mousedown = "mousedown";
var touchstart = "touchstart";
var mousemove = "mousemove";
var touchend = "touchend";
var touchmove = "touchmove";

var play = "<!-- Generated by IcoMoon.io -->\n<svg id=\"play-svg\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>play</title>\n<path fill=\"#999\" d=\"M27.558 13.624l-21.827-13.232c-0.402-0.248-0.89-0.395-1.411-0.395-1.502 0-2.72 1.218-2.72 2.72 0 0.002 0 0.004 0 0.006v-0 26.461c0 0.001 0 0.002 0 0.003 0 1.502 1.218 2.72 2.72 2.72 0.522 0 1.009-0.147 1.423-0.401l-0.012 0.007 21.827-13.232c0.792-0.485 1.313-1.346 1.313-2.328s-0.521-1.843-1.301-2.321l-0.012-0.007z\"></path>\n</svg>";

var pause = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>pause</title>\n<path d=\"M6.059 4.639h8.521v22.722h-8.521zM18.84 4.639h8.521v22.722h-8.521z\"></path>\n</svg>";

var expandFull = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>expand-full</title>\n<path fill=\"#999\" d=\"M31.667 3.271c-0.004-1.619-1.315-2.93-2.934-2.934h-7.642c-0.921 0-1.667 0.747-1.667 1.667s0.747 1.667 1.667 1.667h6.909c0.185 0 0.333 0.148 0.333 0.332v4.359c0 0.921 0.747 1.667 1.667 1.667s1.667-0.746 1.667-1.667v0-5.091zM0.333 8.362c0 0.921 0.746 1.667 1.667 1.667s1.667-0.746 1.667-1.667v0-4.362c0-0.001 0-0.001 0-0.002 0-0.184 0.148-0.333 0.332-0.333h6.909c0.898-0.029 1.614-0.764 1.614-1.667s-0.717-1.637-1.612-1.666l-0.003-0h-7.635c-1.619 0.005-2.931 1.315-2.934 2.936l-0.007 5.095zM31.667 28.726v-5.091c0-0.921-0.747-1.667-1.667-1.667s-1.667 0.747-1.667 1.667v0 4.365c0 0.185-0.148 0.333-0.332 0.333h-6.909c-0.921 0-1.667 0.747-1.667 1.667s0.747 1.667 1.667 1.667v0h7.635c1.624-0.002 2.941-1.319 2.941-2.942zM0.333 28.726c0.004 1.621 1.319 2.934 2.941 2.934 0 0 0 0 0 0h7.635c0.016 0.001 0.034 0.001 0.053 0.001 0.921 0 1.667-0.747 1.667-1.667s-0.746-1.667-1.667-1.667c-0.019 0-0.037 0-0.056 0.001l0.003-0h-6.909c-0 0-0 0-0 0-0.182 0-0.33-0.145-0.333-0.326v-4.366c0-0.921-0.747-1.667-1.667-1.667s-1.667 0.747-1.667 1.667v0 5.091z\"></path>\n<path fill=\"#999\" d=\"M10.321 10.848h11.357c1.818 0 3.291 1.473 3.291 3.291v3.72c0 1.818-1.473 3.291-3.291 3.291h-11.357c-1.818 0-3.291-1.473-3.291-3.291v-3.72c0-1.818 1.473-3.291 3.291-3.291z\"></path>\n</svg>";

var angleLeft = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"32\" viewBox=\"0 0 16 32\">\n<title>angle-left</title>\n<path d=\"M1.981 14.938l8.5-8.5c0.588-0.588 1.537-0.588 2.119 0l1.412 1.412c0.588 0.588 0.588 1.537 0 2.119l-6.019 6.031 6.025 6.025c0.588 0.587 0.588 1.538 0 2.119l-1.412 1.419c-0.588 0.587-1.537 0.587-2.119 0l-8.5-8.5c-0.594-0.587-0.594-1.537-0.006-2.125z\"></path>\n</svg>";

var angleRight = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"32\" viewBox=\"0 0 16 32\">\n<title>angle-right</title>\n<path d=\"M14.019 17.063l-8.5 8.5c-0.588 0.587-1.538 0.587-2.119 0l-1.413-1.413c-0.587-0.587-0.587-1.538 0-2.119l6.019-6.031-6.025-6.025c-0.587-0.588-0.587-1.537 0-2.119l1.413-1.419c0.587-0.588 1.538-0.588 2.119 0l8.5 8.5c0.594 0.588 0.594 1.538 0.006 2.125z\"></path>\n</svg>";

var checkSolid = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>check-solid</title>\n<path d=\"M10.869 27.463l-10.4-10.4c-0.625-0.625-0.625-1.638 0-2.263l2.263-2.263c0.625-0.625 1.638-0.625 2.263 0l7.006 7.006 15.006-15.006c0.625-0.625 1.638-0.625 2.263 0l2.263 2.263c0.625 0.625 0.625 1.638 0 2.263l-18.4 18.4c-0.625 0.625-1.638 0.625-2.263-0z\"></path>\n</svg>";

var settings = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>settings</title>\n<path fill=\"#999\" d=\"M29.999 12.665h-2.483c-0.275-0.938-0.621-1.751-1.048-2.512l0.031 0.060 1.757-1.755c0.362-0.362 0.587-0.862 0.587-1.415s-0.224-1.053-0.587-1.415l-1.886-1.883c-0.362-0.362-0.862-0.586-1.415-0.586s-1.053 0.224-1.415 0.586l-1.757 1.755c-0.701-0.397-1.514-0.743-2.366-0.996l-0.084-0.021v-2.483c0.002-1.107-0.894-2.001-1.999-2.001h-2.668c-1.105 0-1.999 0.896-1.999 2.001v2.483c-0.938 0.275-1.751 0.621-2.513 1.048l0.060-0.031-1.757-1.755c-0.362-0.362-0.862-0.587-1.415-0.587s-1.053 0.224-1.415 0.587l-1.886 1.886c-0.362 0.362-0.586 0.862-0.586 1.415s0.224 1.053 0.586 1.415v0l1.758 1.755c-0.431 0.775-0.771 1.598-1.017 2.451h-2.483c-1.107-0.002-2.001 0.894-2.001 1.999v2.668c0 1.105 0.896 1.999 2.001 1.999h2.483c0.246 0.854 0.586 1.676 1.017 2.452l-1.762 1.758c-0.362 0.362-0.586 0.862-0.586 1.415s0.224 1.053 0.586 1.415v0l1.886 1.885c0.368 0.348 0.866 0.563 1.415 0.563s1.047-0.214 1.416-0.564l-0.001 0.001 1.757-1.757c0.778 0.429 1.6 0.771 2.454 1.019v2.479c0 1.105 0.894 2.001 1.999 2.001h2.668c1.105 0 1.999-0.896 1.999-2.001v-2.479c0.852-0.248 1.676-0.589 2.452-1.017l1.757 1.757c0.362 0.362 0.862 0.586 1.415 0.586s1.053-0.224 1.415-0.586v0l1.885-1.886c0.362-0.362 0.586-0.862 0.586-1.414s-0.224-1.052-0.586-1.414l-1.757-1.757c0.431-0.776 0.771-1.6 1.017-2.452h2.483c0 0 0.001 0 0.002 0 1.105 0 2.001-0.896 2.001-2.001 0-0.002 0-0.004 0-0.005v0-2.663c0-1.105-0.896-1.999-2.001-1.999zM16 22.668c-3.682 0-6.666-2.985-6.666-6.666s2.985-6.666 6.666-6.666v0c3.682 0 6.666 2.985 6.666 6.666s-2.985 6.666-6.666 6.666v0z\"></path>\n</svg>";

var loop = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>loop</title>\n<path fill=\"#999\" d=\"M22.364 21.968h-0.631c-0.92 0-1.667 0.746-1.667 1.667s0.746 1.667 1.667 1.667h0.637c0.013 0 0.028 0 0.044 0 5.113 0 9.259-4.145 9.259-9.259 0-4.668-3.454-8.529-7.946-9.166l-0.049-0.006c-0.158-0.028-0.276-0.164-0.277-0.328v-2.636c-0-0.92-0.746-1.666-1.667-1.666-0.357 0-0.689 0.112-0.96 0.304l0.005-0.003-6.371 4.455c-0.432 0.305-0.711 0.803-0.711 1.365 0 0.92 0.746 1.667 1.667 1.667 0 0 0 0 0 0h6.352c3.772 0 6.617 2.567 6.617 5.971-0.004 3.295-2.674 5.966-5.969 5.969h-0zM8.329 25.127c0.16 0.027 0.277 0.165 0.277 0.328v2.635c0 0.001 0 0.001 0 0.002 0 0.92 0.746 1.665 1.665 1.665 0.358 0 0.69-0.113 0.961-0.305l-0.005 0.003 6.364-4.453c0.432-0.306 0.71-0.803 0.71-1.365 0-0.92-0.746-1.667-1.666-1.668h-6.352c-3.772 0-6.617-2.567-6.617-5.968 0.002-3.296 2.673-5.968 5.969-5.972h0.638c0.92 0 1.667-0.746 1.667-1.667s-0.746-1.667-1.667-1.667v0h-0.637c-0.010-0-0.022-0-0.034-0-5.114 0-9.26 4.146-9.26 9.26 0 4.665 3.45 8.524 7.937 9.166l0.049 0.006z\"></path>\n</svg>";

var volumeOn = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>volume-on</title>\n<path d=\"M26.107 2.991l-3.729 3.185c2.867 2.354 4.694 5.879 4.694 9.824s-1.827 7.47-4.694 9.824l3.729 3.185c3.612-3.226 5.893-7.852 5.893-13.009s-2.281-9.783-5.893-13.009zM19.861 8.326l-3.876 3.312c1.692 0.762 3.038 2.423 3.038 4.362s-1.346 3.6-3.038 4.362l3.876 3.312c2.379-1.756 4.028-4.535 4.028-7.674s-1.649-5.918-4.028-7.674zM12.143 5.399l-7.143 5.601h-3c-1.478 0-2 0.539-2 2v6c0 1.461 0.553 2 2 2h3l7.143 5.595c0.857 0.553 1.85 0.727 1.85-0.823v-19.55c0-1.55-0.993-1.376-1.85-0.823z\"></path>\n</svg>";

var volumeOff = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>volume-off</title>\n<path d=\"M27.397 16.001l4.134-4.144c0.625-0.627 0.625-1.641 0-2.267l-1.132-1.134c-0.625-0.626-1.638-0.626-2.263 0l-4.134 4.144-4.133-4.141c-0.625-0.626-1.638-0.626-2.263 0l-1.132 1.134c-0.625 0.626-0.625 1.641 0 2.267l4.134 4.142-4.131 4.142c-0.625 0.626-0.625 1.641 0 2.267l1.132 1.134c0.625 0.626 1.638 0.626 2.263 0l4.131-4.141 4.133 4.14c0.625 0.627 1.638 0.627 2.263 0l1.132-1.134c0.625-0.626 0.625-1.641 0-2.267l-4.134-4.141zM12.148 5.399l-7.146 5.603h-3.001c-1.479 0-2.001 0.539-2.001 2.001l-0 2.951 0 3.051c0 1.461 0.553 2.001 2.001 2.001h3.001l7.146 5.597c0.857 0.553 1.851 0.727 1.851-0.823v-19.556c-0-1.55-0.994-1.376-1.851-0.823z\"></path>\n</svg>";

var donkeyclip = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>donkeyclip-logo</title>\n<path fill=\"#777\" d=\"M25.811 3.454v11.010h-3.479c-0.696-2.447-2.974-4.246-5.638-4.246-3.238 0-5.877 2.638-5.877 5.877s2.638 5.877 5.877 5.877c2.686 0 4.942-1.799 5.638-4.246h3.334c-0.767 4.246-4.485 7.509-8.972 7.509-5.014 0-9.115-4.078-9.115-9.115 0-5.014 4.078-9.115 9.115-9.115 2.231 0 4.294 0.815 5.877 2.159v-7.652c-1.992-0.912-4.222-1.415-6.572-1.415-8.779 0-15.904 7.125-15.904 15.904s7.125 15.904 15.904 15.904c8.779 0 15.904-7.125 15.904-15.904 0.024-5.109-2.375-9.644-6.093-12.546z\"></path>\n</svg>";

var spinner = "<!-- Generated by IcoMoon.io -->\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\">\n<title>spinner</title>\n<path fill=\"#999\" d=\"M16 0.43c0.992 0 1.796 1.287 1.796 2.875v1.437c0 1.588-0.804 2.875-1.796 2.875s-1.796-1.287-1.796-2.875v-1.437c0-1.588 0.804-2.875 1.796-2.875z\"></path>\n<path fill=\"#999\" d=\"M23.785 2.516c0.859 0.496 0.913 2.013 0.119 3.388l-0.718 1.245c-0.794 1.374-2.133 2.087-2.993 1.592s-0.913-2.013-0.119-3.388l0.718-1.245c0.794-1.374 2.133-2.087 2.993-1.592z\"></path>\n<path fill=\"#999\" d=\"M29.484 8.215c0.496 0.859-0.216 2.199-1.592 2.993l-1.245 0.718c-1.374 0.794-2.892 0.741-3.388-0.119s0.216-2.199 1.592-2.993l1.245-0.718c1.374-0.794 2.892-0.741 3.388 0.119z\"></path>\n<path fill=\"#999\" d=\"M31.57 16c0 0.992-1.287 1.796-2.875 1.796h-1.437c-1.588 0-2.875-0.804-2.875-1.796s1.287-1.796 2.875-1.796h1.437c1.588 0 2.875 0.804 2.875 1.796z\"></path>\n<path fill=\"#999\" d=\"M29.484 23.785c-0.496 0.859-2.013 0.913-3.388 0.119l-1.245-0.718c-1.374-0.794-2.087-2.133-1.592-2.993s2.013-0.913 3.388-0.119l1.245 0.718c1.374 0.794 2.087 2.133 1.592 2.993z\"></path>\n<path fill=\"#999\" d=\"M23.785 29.484c-0.859 0.496-2.199-0.216-2.993-1.592l-0.718-1.245c-0.794-1.374-0.741-2.892 0.119-3.388s2.199 0.216 2.993 1.592l0.718 1.245c0.794 1.374 0.741 2.892-0.119 3.388z\"></path>\n<path fill=\"#999\" d=\"M16 31.57c-0.992 0-1.796-1.287-1.796-2.875v-1.437c0-1.588 0.804-2.875 1.796-2.875s1.796 1.287 1.796 2.875v1.437c0 1.588-0.804 2.875-1.796 2.875z\"></path>\n<path fill=\"#999\" d=\"M8.215 29.484c-0.859-0.496-0.913-2.013-0.119-3.388l0.718-1.245c0.794-1.374 2.133-2.087 2.993-1.592s0.913 2.013 0.119 3.388l-0.718 1.245c-0.794 1.374-2.133 2.087-2.993 1.592z\"></path>\n<path fill=\"#999\" d=\"M2.516 23.785c-0.496-0.859 0.216-2.199 1.592-2.993l1.245-0.718c1.374-0.794 2.892-0.741 3.388 0.119s-0.216 2.199-1.592 2.993l-1.245 0.718c-1.374 0.794-2.892 0.741-3.388-0.119z\"></path>\n<path fill=\"#999\" d=\"M0.43 16c0-0.992 1.287-1.796 2.875-1.796h1.437c1.588 0 2.875 0.804 2.875 1.796s-1.287 1.796-2.875 1.796h-1.437c-1.588 0-2.875-0.804-2.875-1.796z\"></path>\n<path fill=\"#999\" d=\"M2.516 8.215c0.496-0.859 2.013-0.913 3.388-0.119l1.245 0.718c1.374 0.794 2.087 2.133 1.592 2.993s-2.013 0.913-3.388 0.119l-1.245-0.718c-1.374-0.794-2.087-2.133-1.592-2.993z\"></path>\n<path fill=\"#999\" d=\"M8.215 2.516c0.859-0.496 2.199 0.216 2.993 1.592l0.718 1.245c0.794 1.374 0.741 2.892-0.119 3.388s-2.199-0.216-2.993-1.592l-0.718-1.245c-0.794-1.374-0.741-2.892 0.119-3.388z\"></path>\n</svg>";

var SVG = {
  play: play,
  pause: pause,
  "expand-full": expandFull,
  "angle-left": angleLeft,
  "angle-right": angleRight,
  settings: settings,
  loop: loop,
  "volume-on": volumeOn,
  "volume-off": volumeOff,
  "donkeyclip-logo": donkeyclip,
  spinner: spinner,
  "check-solid": checkSolid
};

function elid(id) {
  return document.getElementById(id);
}
function elFirstClass(player, className) {
  return player.getElementsByClassName(className)[0];
}
function eltag(tag) {
  return document.getElementsByTagName(tag);
}
function elcreate(tag) {
  return document.createElement(tag);
}
function addListener() {
  var _document;

  return (_document = document).addEventListener.apply(_document, arguments);
}
function removeListener() {
  var _document2;

  return (_document2 = document).removeEventListener.apply(_document2, arguments);
}
function sanitizeCSS(css) {
  return css.replace(/(behaviour|javascript|expression)/gm, "");
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

var numberPartRegexp = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)", "gi");

function calculateDimension(dimensionToMatch) {
  var widthNumberPart = dimensionToMatch.match(numberPartRegexp)[0];
  var widthUnitPart = dimensionToMatch.substring(widthNumberPart.length);

  if (isNumber(Number(widthNumberPart)) && (widthUnitPart !== "%" || widthUnitPart !== "px")) {
    return {
      number: Number(widthNumberPart),
      unit: widthUnitPart
    };
  }
}

function calcClipScale(containerParams, platoDims) {
  var _widthAnalysed, _heightAnalysed;

  var cover = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var widthAnalysed, heightAnalysed;

  if (Object.prototype.hasOwnProperty.call(containerParams, "width")) {
    widthAnalysed = calculateDimension(containerParams.width);
  }

  if (Object.prototype.hasOwnProperty.call(containerParams, "height")) {
    heightAnalysed = calculateDimension(containerParams.height);
  } // the only case the Clip needs to be scaled is when any of the two axis of the Clip
  // is defined in pixels and the value of it is greater than the available space of
  // the plato


  var scaleDifWidth = 1,
      scaleDifHeight = 1;

  if (((_widthAnalysed = widthAnalysed) === null || _widthAnalysed === void 0 ? void 0 : _widthAnalysed.unit) === "px" && widthAnalysed.number !== platoDims.width) {
    scaleDifWidth = platoDims.width / widthAnalysed.number;
  }

  if (((_heightAnalysed = heightAnalysed) === null || _heightAnalysed === void 0 ? void 0 : _heightAnalysed.unit) === "px" && heightAnalysed.number !== platoDims.height) {
    scaleDifHeight = platoDims.height / heightAnalysed.number;
  }

  var boundaryToUse = cover ? scaleDifHeight > scaleDifWidth : scaleDifHeight <= scaleDifWidth;
  var finalScale = boundaryToUse ? scaleDifHeight : scaleDifWidth;
  var position = {};

  if (widthAnalysed !== null) {
    var clipWidth = widthAnalysed.number * finalScale;

    if (widthAnalysed.unit !== "px") {
      clipWidth *= platoDims.width / 100;
    }

    var blankSpace = platoDims.width - clipWidth;
    position.left = blankSpace / 2;
  }

  if (widthAnalysed !== null) {
    var clipHeight = heightAnalysed.number * finalScale;

    if (heightAnalysed.unit !== "px") {
      clipHeight *= platoDims.height / 100;
    }

    var _blankSpace = platoDims.height - clipHeight;

    position.top = _blankSpace / 2;
  }

  return {
    scale: finalScale,
    position: position
  };
}
function createUID() {
  var dt = new Date().getTime();
  return "xxxxxxxx-xxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    var rand = Math.random() > 0.5;
    var str = (c == "x" ? r : r & 0x3 | 0x8).toString(16);
    return rand ? str.toUpperCase() : str;
  });
} // FIXME: This is a super unreliable way of testing, we need to update this
function addMouseUpAndMoveListeners(callbackForUp, callbackForMove) {
  document.addEventListener(mouseup, callbackForUp, false);
  document.addEventListener(touchend, callbackForUp, false);
  document.addEventListener(mousemove, callbackForMove, false);
  document.addEventListener(touchmove, callbackForMove, false);
}
function removeMouseUpAndMoveListeners(callbackForUp, callbackForMove) {
  document.removeEventListener(mouseup, callbackForUp, false);
  document.removeEventListener(touchend, callbackForUp, false);
  document.removeEventListener(mousemove, callbackForMove, false);
  document.removeEventListener(touchmove, callbackForMove, false);
}
function addStartListeners(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  var passive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  element.addEventListener(mousedown, callback, {
    passive: passive
  }, false);
  element.addEventListener(touchstart, callback, {
    passive: passive
  }, false);
}
function removeStartListeners(callback) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  element.removeEventListener(mousedown, callback, false);
  element.removeEventListener(touchstart, callback, false);
}
function changeIcon(element, from, to) {
  if (from) {
    element.classList.remove("icon-".concat(from));
    element.innerHTML = "";
  }

  if (to) {
    element.classList.add("icon-".concat(to));
    element.innerHTML = SVG[to];
  }
}
function initializeIcons(playerElements) {
  playerElements.loopButton.innerHTML = SVG["loop"];
  playerElements.volumeBtn.innerHTML = SVG["volume-on"];
  playerElements.statusButton.innerHTML = SVG["play"];
  playerElements.settingsButton.innerHTML = SVG["settings"];
  playerElements.donkeyclipButton.innerHTML = SVG["donkeyclip-logo"];
  playerElements.fullScreenButton.innerHTML = SVG["expand-full"];
  playerElements.fullScreenButton.innerHTML = SVG["expand-full"];
  playerElements.speedButtonShow.innerHTML = SVG["angle-right"];
  playerElements.speedButtonHide.innerHTML = SVG["angle-left"];
}

var htmlplayer = "<div class=\"--mcp-background\"></div>\n<div class=\"--mcp-context\">\n  <div class=\"--mcp-pointer-events-panel\"></div>\n  <div class=\"--mcp-play-pause-panel\">\n    <div class=\"--mcp-play-pause-panel-container\"></div>\n  </div>\n  <div class=\"--mcp-listener-helper\"></div>\n  <div class=\"--mcp-controls\">\n    <div class=\"--mcp-grad\"></div>\n    <div class=\"--mcp-progressbar\">\n      <div class=\"--mcp-totalbar\">\n        <div class=\"--mcp-loopbar\">\n          <div class=\"--mcp-loopbar-color\"></div>\n          <div class=\"--mcp-loop-boundaries --mcp-loopbar-start\"></div>\n          <div class=\"--mcp-loop-boundaries --mcp-loopbar-end\"></div>\n          <div class=\"--mcp-runningbar\">\n            <div class=\"--mcp-cursor\"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"--mcp-buttons\">\n      <div class=\"--mcp-left-buttons\">\n        <div class=\"--mcp-status\">\n          <span class=\"--mcp-btn --mcp-status-btn icon-play\"></span>\n          <span class=\"--mcp-indicator\">i</span>\n        </div>\n        <div class=\"--mcp-volume\">\n          <div class=\"--mcp-btn --mcp-volume-btn icon-volume-on\"></div>\n          <div class=\"--mcp-volumebar\">\n            <div class=\"--mcp-volumebar-color\">\n              <div class=\"--mcp-volumebar-color-active\">\n                <div class=\"--mcp-volume-cursor\"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"--mcp-time-display\">\n          <span class=\"--mcp-time-current\">00:00</span>\n          <span class=\"--mcp-time-separator\">/</span>\n          <span class=\"--mcp-time-total\">00:00</span>\n        </div>\n      </div>\n      <div class=\"--mcp-right-buttons\">\n        <div class=\"--mcp-loop-btn-container\">\n          <div class=\"--mcp-btn --mcp-loop-btn icon-loop\"></div>\n        </div>\n        <div class=\"--mcp-btn --mcp-settings-btn icon-settings\"></div>\n        <div class=\"--mcp-btn --mcp-dc-btn icon-donkeyclip-logo\"></div>\n        <div class=\"--mcp-btn --mcp-full-screen-btn icon-expand-full\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"--mcp-settings-panel\" tabindex=\"0\">\n    <ul class=\"--mcp-main-settings\">\n      <li class=\"--mcp-settings-pointer-events\">\n        <p>Pointer events</p>\n        <div>\n          <div class=\"switch settings-switch\">\n            <input class=\"--mcp-show-pointer-events-checkbox\" type=\"checkbox\">\n            <span class=\"slider round\"></span>\n          </div>\n        </div>\n      </li>\n      <li class=\"--mcp-settings-volume\">\n        <p>Show volume</p>\n        <div>\n          <div class=\"switch settings-switch\">\n            <input class=\"--mcp-show-volume-checkbox\" type=\"checkbox\">\n            <span class=\"slider round\"></span>\n          </div>\n        </div>\n      </li>\n      <li class=\"--mcp-settings-speed-show\">\n        <p>Playback speed</p>\n        <div>\n          <span class=\"--mcp-speed-current\"></span>\n          <div class=\"--mcp-btn --mcp-speed-btn --mcp-speed-btn-show icon-angle-right\"></div>\n        </div>\n      </li>\n    </ul>\n    <ul class=\"--mcp-speed-settings\">\n      <li class=\"--mcp-settings-speed-hide\">\n        <div class=\"--mcp-btn --mcp-speed-btn --mcp-speed-btn-hide icon-angle-left\"></div>\n        <p class=\"--mcp-speed-runtime\">Playback speed</p>\n      </li>\n      <li class=\"--mcp-no-hover\">\n        <ul class=\"--mcp-speed-values\"></ul>\n      </li>\n    </ul>\n  </div>\n</div>\n";

var setElements = (function (_this) {
  _this.elements = {};
  initializePlayer(_this);
  var mcPlayer = _this.elements.mcPlayer;
  _this.elements.pointerEventPanel = elFirstClass(mcPlayer, "--mcp-pointer-events-panel");
  _this.elements.playPausePanel = elFirstClass(mcPlayer, "--mcp-play-pause-panel");
  _this.elements.playPausePanelContainer = elFirstClass(mcPlayer, "--mcp-play-pause-panel-container");
  _this.elements.listenerHelper = elFirstClass(mcPlayer, "--mcp-listener-helper");
  _this.elements.loopBar = elFirstClass(mcPlayer, "--mcp-loopbar");
  _this.elements.totalBar = elFirstClass(mcPlayer, "--mcp-totalbar");
  _this.elements.indicator = elFirstClass(mcPlayer, "--mcp-indicator");
  _this.elements.loopButton = elFirstClass(mcPlayer, "--mcp-loop-btn");
  _this.elements.volumeBar = elFirstClass(mcPlayer, "--mcp-volumebar");
  _this.elements.totalTime = elFirstClass(mcPlayer, "--mcp-time-total");
  _this.elements.volumeControl = elFirstClass(mcPlayer, "--mcp-volume");
  _this.elements.volumeBtn = elFirstClass(mcPlayer, "--mcp-volume-btn");
  _this.elements.runningBar = elFirstClass(mcPlayer, "--mcp-runningbar");
  _this.elements.loopBarEnd = elFirstClass(mcPlayer, "--mcp-loopbar-end");
  _this.elements.statusButton = elFirstClass(mcPlayer, "--mcp-status-btn");
  _this.elements.speedBar = elFirstClass(mcPlayer, "--mcp-speed-values");
  _this.elements.currentTime = elFirstClass(mcPlayer, "--mcp-time-current");
  _this.elements.timeDisplay = elFirstClass(mcPlayer, "--mcp-time-display");
  _this.elements.speedButtonShow = elFirstClass(mcPlayer, "--mcp-speed-btn-show");
  _this.elements.speedButtonHide = elFirstClass(mcPlayer, "--mcp-speed-btn-hide");
  _this.elements.speedCurrent = elFirstClass(mcPlayer, "--mcp-speed-current");
  _this.elements.loopBarStart = elFirstClass(mcPlayer, "--mcp-loopbar-start");
  _this.elements.volumeCursor = elFirstClass(mcPlayer, "--mcp-volume-cursor");
  _this.elements.settingsButton = elFirstClass(mcPlayer, "--mcp-settings-btn");
  _this.elements.donkeyclipButton = elFirstClass(mcPlayer, "--mcp-dc-btn");
  _this.elements.timeSeparator = elFirstClass(mcPlayer, "--mcp-time-separator");
  _this.elements.settingsPanel = elFirstClass(mcPlayer, "--mcp-settings-panel");
  _this.elements.background = elFirstClass(mcPlayer, "--mcp-background");
  _this.elements.settingsMainPanel = elFirstClass(mcPlayer, "--mcp-main-settings");
  _this.elements.fullScreenButton = elFirstClass(mcPlayer, "--mcp-full-screen-btn");
  _this.elements.volumeBarHelper = elFirstClass(mcPlayer, "--mcp-volumebar");
  _this.elements.volumeBarActive = elFirstClass(mcPlayer, "--mcp-volumebar-color-active");
  _this.elements.settingsSpeedPanel = elFirstClass(mcPlayer, "--mcp-speed-settings");
  _this.elements.settingsShowVolume = elFirstClass(mcPlayer, "--mcp-settings-volume");
  _this.elements.settingsPointerEvents = elFirstClass(mcPlayer, "--mcp-settings-pointer-events");
  _this.elements.settingsSpeedButtonShow = elFirstClass(mcPlayer, "--mcp-settings-speed-show");
  _this.elements.settingsSpeedButtonHide = elFirstClass(mcPlayer, "--mcp-settings-speed-hide");
  _this.elements.controls = elFirstClass(mcPlayer, "--mcp-controls");
  _this.elements.volumeCheckbox = elFirstClass(mcPlayer, "--mcp-show-volume-checkbox");
  _this.elements.showVolumeCheckbox = elFirstClass(mcPlayer, "--mcp-show-volume-checkbox");
  _this.elements.showPointerEventsCheckbox = elFirstClass(mcPlayer, "--mcp-show-pointer-events-checkbox");
  _this.elements.leftButtons = elFirstClass(mcPlayer, "--mcp-left-buttons");
  initializeIcons(_this.elements);
  addStyles(_this);
  createSpeedValues(_this);
  showHideButtons(_this);
});

var initializePlayer = function initializePlayer(_this) {
  var clipIframe = _this.clip.props.host;

  if (!clipIframe.offsetWidth) {
    clipIframe.style.width = _this.clip.props.containerParams.width;
  }

  if (!clipIframe.offsetHeight) {
    clipIframe.style.height = _this.clip.props.containerParams.height;
  }

  clipIframe.style.display = "flex";
  clipIframe.style.justifyContent = "center";
  clipIframe.style.alignItems = "center";
  clipIframe.style.overflow = "hidden";
  _this.clip.props.host.style.position = "relative";
  _this.clip.props.host.style.zIndex = 0;
  _this.elements.mcPlayer = elcreate("div");
  _this.elements.mcPlayer.id = "".concat(_this.name);
  _this.elements.mcPlayer.className = "".concat(_this.className);
  _this.elements.mcPlayer.innerHTML = htmlplayer;

  if (typeof _this.options.host === "string") {
    var nodelist = document.querySelectorAll(_this.options.host);

    for (var i in nodelist) {
      if (isNaN(i)) {
        continue;
      }

      nodelist[i].appendChild(_this.elements.mcPlayer);
    }
  } else {
    _this.options.host.appendChild(_this.elements.mcPlayer);
  }
};

var addStyles = function addStyles(_this) {
  _this.elements.volumeBarActive.style.width = "".concat(_this.settings.volume * 100, "%");
  _this.elements.currentTime.innerHTML = _this.timeFormat(0);
  _this.elements.totalTime.innerHTML = _this.timeFormat(_this.clip.duration);
  _this.elements.timeSeparator.innerHTML = "/";

  _this.elements.settingsPanel.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  if (_this.options.backgroundColor) {
    _this.elements.background.style.background = _this.options.backgroundColor;
  }

  if (_this.options.type === "scroller") {
    window.document.body.style.overscrollBehaviorY = "contain";
  }

  if (!_this.options.showIndicator) {
    _this.elements.indicator.style.display = "none";
  } else {
    _this.elements.indicator.style.display = undefined;
    _this.elements.statusButton.style.width = "35px";
    _this.elements.statusButton.style.height = "20px";
    _this.elements.statusButton.style.bottom = "5px";
  }

  _this.elements.indicator.innerHTML = _this.clip.runTimeInfo.state;
  _this.elements.settingsSpeedPanel.style.display = "none";
  _this.elements.loopBarStart.style.left = "0%";

  _this.elements.loopBarStart.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  _this.elements.loopBarEnd.style.left = "100%";

  _this.elements.loopBarEnd.classList.add("m-fadeOut", "".concat(_this.name, "-hide"));

  _this.elements.volumeCheckbox.checked = _this.options.showVolume;
  _this.elements.showPointerEventsCheckbox.checked = _this.options.pointerEvents;

  if (_this.options.pointerEvents) {
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
  } else {
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
  }

  if (!_this.options.showVolume) {
    _this.elements.volumeControl.classList.toggle("m-fadeOut");
  }
};

var createSpeedValues = function createSpeedValues(_this) {
  var _loop = function _loop(i) {
    var _ref;

    if (_this.options.speedValues[i] == 0) return "continue";
    var iconCheckClass = "check-solid";
    var selectedClass = "--mcp-selected"; //create the parent li element

    var li = elcreate("li");
    li.className = "--mcp-speed-value";
    li.dataset.speedValue = _this.options.speedValues[i]; //create the check holder

    var span = document.createElement("span");
    li.append(span); //create the value of the speed

    var valueDiv = elcreate("p");
    var isNormal = _this.options.speedValues[i] == 1;
    valueDiv.innerHTML = isNormal ? "Normal" : _this.options.speedValues[i];
    valueDiv.dataset.zone = i;
    valueDiv.classList.add("--mcp-speed-value-item"); //add the check if this is the speed

    if ((_ref = _this.options.speedValues[i] == _this.options.speed) !== null && _ref !== void 0 ? _ref : _this.clip.speed) {
      changeIcon(span, null, iconCheckClass);
      valueDiv.classList.add(selectedClass);
    }

    li.append(valueDiv);

    _this.elements.speedBar.append(li);

    li.onclick = function () {
      _this.options.speed = _this.options.speedValues[i];
      _this.clip.speed = _this.options.speedValues[i];
      var isNormal = _this.clip.speed == 1;
      _this.elements.speedCurrent.innerHTML = isNormal ? "Normal" : _this.clip.speed;
      var previousChecked = elFirstClass(_this.elements.mcPlayer, "icon-check-solid");
      changeIcon(previousChecked, iconCheckClass);
      changeIcon(span, null, iconCheckClass);
      elFirstClass(_this.elements.mcPlayer, selectedClass).classList.remove(selectedClass);
      valueDiv.classList.add(selectedClass);
    };
  };

  for (var i in _this.options.speedValues) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }
};

var showHideButtons = function showHideButtons(_this) {
  // show hide buttons
  if (_this.options.buttons.fullScreen === false) {
    _this.elements.fullScreenButton.remove();
  }

  if (_this.options.buttons.settings === false) {
    _this.elements.settingsButton.remove();
  }

  if (!_this.options.buttons.donkeyclip) {
    _this.elements.donkeyclipButton.remove();
  }

  if (_this.options.buttons.loop === false) {
    _this.elements.loopButton.remove();
  }
};

var bodyListener = (function (_this) {
  function handleFullScreenChange() {
    _this.elements.mcPlayer.classList.toggle("full-screen");

    _this.clip.props.host.classList.toggle("full-screen");
  }

  addListener("fullscreenchange", handleFullScreenChange);
  addListener("webkitfullscreenchange", handleFullScreenChange);
  addListener("mozfullscreenchange", handleFullScreenChange);
  addListener("MSFullscreenChange", handleFullScreenChange);
});

var $$1 = _export;
var global$2 = global$I;
var getBuiltIn = getBuiltIn$7;
var apply = functionApply;
var uncurryThis$1 = functionUncurryThis;
var fails$1 = fails$q;
var Array$1 = global$2.Array;
var $stringify = getBuiltIn('JSON', 'stringify');
var exec = uncurryThis$1(/./.exec);
var charAt$1 = uncurryThis$1(''.charAt);
var charCodeAt = uncurryThis$1(''.charCodeAt);
var replace = uncurryThis$1(''.replace);
var numberToString = uncurryThis$1(1.0.toString);
var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var fix = function (match, offset, string) {
  var prev = charAt$1(string, offset - 1);
  var next = charAt$1(string, offset + 1);

  if (exec(low, match) && !exec(hi, next) || exec(hi, match) && !exec(low, prev)) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  }

  return match;
};

var FORCED$1 = fails$1(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' || $stringify('\uDEAD') !== '"\\udead"';
});

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  // https://github.com/tc39/proposal-well-formed-stringify
  $$1({
    target: 'JSON',
    stat: true,
    forced: FORCED$1
  }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      for (var i = 0, l = arguments.length, args = Array$1(l); i < l; i++) args[i] = arguments[i];

      var result = apply($stringify, null, args);
      return typeof result == 'string' ? replace(result, tester, fix) : result;
    }
  });
}

var donkeyclipListener = (function (_this) {
  _this.elements.donkeyclipButton.addEventListener("click", function () {
    var u = createUID();
    var popupDC = window.open("https://donkeyclip.com?u=".concat(u));

    var definition = _this.clip.exportDefinition();

    var clipClass = _this.clipClass;
    window.addEventListener("message", receiveMessage, false);

    function receiveMessage(event) {
      if (event.data === u) {
        popupDC.postMessage(JSON.stringify({
          definition: definition,
          clipClass: clipClass,
          u: u
        }), "*");
      }
    }
  });
});

var showControls = "--mcp-force-show-controls";
var PLAYING = "playing";
var VOLUME_OFF = "volume-off";
var VOLUME_ON = "volume-on";

var css_248z = ".--mc-player.theme-default {\n  --activeColor: 136, 136, 136;\n  --defaultColor: 255, 255, 255;\n  --backgroundColor: 29, 31, 37, 1;\n  --backgroundSettingsColor: rgba(29, 31, 37, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n\n.--mc-player.theme-yellow {\n  --activeColor: 255, 235, 59;\n  --defaultColor: 255, 255, 255;\n  --backgroundColor: 29, 31, 37, 1;\n  --backgroundSettingsColor: rgba(29, 31, 37, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n\n.--mc-player.theme-dark {\n  --activeColor: 136, 136, 136;\n  --defaultColor: 136, 136, 136;\n  --backgroundColor: 0, 0, 0, 1;\n  --backgroundSettingsColor: rgba(0, 0, 0, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n\n.--mc-player.theme-whiteGold {\n  --activeColor: 161, 127, 26;\n  --defaultColor: 136, 136, 136;\n  --backgroundColor: 245, 245, 245, 1;\n  --backgroundSettingsColor: rgba(245, 245, 245, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n\n.--mc-player.theme-darkGold {\n  --activeColor: 161, 127, 26;\n  --defaultColor: 136, 136, 136;\n  --backgroundColor: 0, 0, 0, 1;\n  --backgroundSettingsColor: rgba(0, 0, 0, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n.--mc-player.theme-transparent {\n  --activeColor: 255, 0, 0;\n  --defaultColor: 239, 238, 236;\n  --backgroundColor: 0, 0, 0, 0;\n  --backgroundSettingsColor: rgba(0, 0, 0, 0.9);\n  --loopBarColor: rgba(var(--defaultColor), 0.2);\n  --grad-display: block;\n}\n\n.--mc-player.theme-green {\n  --activeColor: 0, 184, 139;\n  --defaultColor: 255, 255, 255;\n  --backgroundColor: 29, 31, 37, 1;\n  --backgroundSettingsColor: rgba(29, 31, 37, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n.--mc-player.theme-blue {\n  --activeColor: 0, 153, 225;\n  --defaultColor: 255, 255, 255;\n  --backgroundColor: 29, 31, 37, 1;\n  --backgroundSettingsColor: rgba(29, 31, 37, 0.9);\n  --loopBarColor: rgba(var(--activeColor), 0.2);\n  --grad-display: none;\n}\n.--mc-player * {\n  color: rgb(var(--defaultColor));\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica,\n    Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";\n  font-size: 13px;\n  cursor: default;\n  user-select: none;\n}\n.--mc-player svg {\n  width: 22px;\n}\n.--mcp-settings-panel:focus {\n  outline: none;\n}\n.--mcp-settings-panel svg {\n  width: 10px;\n}\n.--mc-player svg,\n.--mc-player svg * {\n  fill: rgb(var(--defaultColor)) !important;\n}\n\n.--mc-player {\n  overscroll-behavior: none;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  pointer-events: none;\n}\n\n.--mc-player * {\n  box-sizing: border-box;\n}\n\n.--mcp-background,\n.--mcp-context {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  pointer-events: none;\n}\n.--mcp-background {\n  background: black;\n  z-index: -1000;\n}\n\n.--mcp-pointer-events-panel.initial {\n  width: 100%;\n  min-height: 100%;\n  z-index: 100;\n}\n\n.--mcp-pointer-events-panel {\n  width: 100%;\n  min-height: calc(100% - 50px);\n}\n\n.--mcp-pointer-events-panel.loading {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.8);\n}\n.--mcp-pointer-events-panel.loading svg {\n  animation: spin 4s linear infinite;\n}\n\n@keyframes spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n.--mcp-grad {\n  display: var(--grad-display);\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  width: 100%;\n  height: 200px;\n  z-index: 0;\n  pointer-events: none !important;\n  background-image: linear-gradient(\n    rgba(0, 0, 0, 00.001),\n    rgba(0, 0, 0, 00.004),\n    rgba(0, 0, 0, 00.007),\n    rgba(0, 0, 0, 00.01),\n    rgba(0, 0, 0, 0.04),\n    rgba(0, 0, 0, 0.07),\n    rgba(0, 0, 0, 0.1),\n    rgba(0, 0, 0, 0.15),\n    rgba(0, 0, 0, 0.2),\n    rgba(0, 0, 0, 0.25),\n    rgba(0, 0, 0, 0.3),\n    rgba(0, 0, 0, 0.35),\n    rgba(0, 0, 0, 0.4),\n    rgba(0, 0, 0, 0.45),\n    rgba(0, 0, 0, 0.5),\n    rgba(0, 0, 0, 0.55),\n    rgba(0, 0, 0, 0.6),\n    rgba(0, 0, 0, 0.65),\n    rgba(0, 0, 0, 0.7),\n    rgba(0, 0, 0, 0.75),\n    rgba(0, 0, 0, 0.8),\n    rgba(0, 0, 0, 0.88)\n  );\n}\n\n.--mc-player:hover .--mcp-controls {\n  opacity: 1 !important;\n}\n.--mcp-controls:active {\n  opacity: 1 !important;\n}\n.--mcp-controls {\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  z-index: -0;\n  background: rgba(var(--backgroundColor));\n  height: 50px;\n  padding: 0 15px;\n  opacity: 0;\n  transition: all ease 0.2s;\n  pointer-events: auto;\n}\n.--mcp-play-pause-panel #play-svg {\n  margin-left: 4px;\n}\n.--mcp-force-show-controls {\n  opacity: 1 !important;\n}\n\n.--mcp-always-show-controls {\n  opacity: 1 !important;\n}\n\n.--mcp-progressbar {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.--mcp-totalbar,\n.--mcp-loopbar,\n.--mcp-runningbar {\n  position: relative;\n  height: 5px;\n}\n\n.--mcp-cursor {\n  width: 14px;\n  height: 14px;\n  background-color: rgb(var(--activeColor));\n  border-radius: 100%;\n  position: absolute;\n  top: -5px;\n  right: -8px;\n  z-index: 10;\n}\n\n.--mcp-totalbar {\n  min-width: 100%;\n  background-color: rgba(var(--defaultColor), 0.3);\n}\n\n.--mcp-loopbar {\n  width: 100%;\n  padding: 10px 0px;\n  top: -10px;\n  position: relative;\n}\n.--mcp-loopbar-color {\n  position: absolute;\n  left: 0px;\n  bottom: 5px;\n  background-color: var(--loopBarColor);\n  width: 100%;\n  height: 5px;\n}\n.--mcp-runningbar {\n  background-color: rgb(var(--activeColor));\n  width: 0px;\n}\n\n.--mcp-buttons,\n.--mcp-left-buttons,\n.--mcp-right-buttons,\n.--mcp-left-buttons > div,\n.--mcp-right-buttons > div {\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n\n.--mcp-buttons,\n.--mcp-left-buttons,\n.--mcp-right-buttons {\n  flex: 1;\n  height: 100%;\n  gap: 20px;\n}\n\n.--mcp-left-buttons {\n  justify-content: flex-start;\n}\n\n.--mcp-right-buttons {\n  justify-content: flex-end;\n}\n\n.--mcp-prevent-point-events {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n}\n\n.--mcp-play-pause-panel {\n  pointer-events: none;\n  position: absolute;\n  z-index: 2;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-repeat: no-repeat !important;\n  background-size: contain !important;\n  background-position: center !important;\n}\n.--mcp-play-pause-panel.initial {\n  background-color: black;\n}\n.--mcp-play-pause-panel.initial svg {\n  width: 32px;\n  height: 32px;\n}\n.--mcp-play-pause-panel.initial .--mcp-play-pause-panel-container {\n  width: 80px;\n  height: 80px;\n}\n.--mcp-play-pause-panel.hide {\n  opacity: 0;\n}\n.remove-animation * {\n  animation-name: none !important;\n}\n\n.--mcp-play-pause-panel-container {\n  background-color: #000000c7;\n  width: 60px;\n  height: 60px;\n  border-radius: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.--mcp-play-pause-panel.animate .--mcp-play-pause-panel-container {\n  animation-name: scale-and-opaque;\n  animation-duration: 0.8s;\n  transform-origin: center center;\n}\n@keyframes scale-and-opaque {\n  from {\n    opacity: 0.5;\n    transform: scale(1);\n  }\n  to {\n    opacity: 0;\n    transform: scale(2);\n  }\n}\n\n.--mcp-loop-boundaries {\n  position: relative;\n}\n.--mcp-loop-boundaries:after {\n  content: \"\";\n  top: -4px;\n  left: -6px;\n  width: 13px;\n  height: 13px;\n  background-color: #aeaeae;\n  position: absolute;\n  border-radius: 100%;\n  z-index: 100;\n}\n.--mcp-loopbar-start {\n  left: -5px;\n}\n.--mcp-loopbar-end {\n  right: 5px;\n}\n.--mcp-loopbar,\n.--mcp-loopbar-color,\n.--mcp-runningbar,\n.--mcp-status-btn,\n.--mcp-loop-boundaries,\n.--mcp-cursor,\n.--mcp-btn,\n.--mcp-volume *,\n.--mc-player svg,\n.--mc-player svg * {\n  cursor: pointer;\n}\n.--mcp-btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.--mcp-status-btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 3px;\n}\n.--mcp-indicator {\n  font-size: 12px;\n}\n.--mcp-listener-helper {\n  pointer-events: none;\n}\n\n.--mcp-btn {\n  font-size: 20px;\n}\n\n.--mcp-volume-btn {\n  font-size: 15px;\n}\n.--mcp-volumebar {\n  width: 0;\n  padding-left: 0px;\n  padding-right: 0px;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: all ease 0.2s;\n}\n.--mcp-volume {\n  height: 100%;\n}\n.--mcp-volume:hover {\n  padding-right: 10px;\n}\n.--mcp-volume:hover .--mcp-volumebar,\n.--mcp-volume:active .--mcp-volumebar {\n  width: 52px;\n  padding-left: 5px;\n}\n.--mcp-volume:hover .--mcp-volume-cursor,\n.--mcp-volume:active .--mcp-volume-cursor {\n  display: block;\n}\n\n.--mcp-btn::before {\n  color: var(--defaultColor) !important;\n}\n.--mcp-btn::before:hover {\n  filter: brightness(40);\n}\n.--mcp-settings-speed-hide {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n}\nul.--mcp-speed-values {\n  padding: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nul.--mcp-speed-values li {\n  width: 100%;\n}\nul.--mcp-speed-values li p {\n  width: 100%;\n}\n.--mcp-settings-panel ul {\n  list-style-type: none;\n  display: flex;\n  flex-direction: column;\n  padding: 5px 0px;\n  margin: 0px;\n  flex: 1;\n}\n\n.--mcp-settings-panel ul li {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  min-height: 40px;\n  padding: 0px 21px;\n}\n.--mcp-settings-panel ul li * {\n  cursor: pointer;\n}\n.--mcp-settings-panel ul li:not(.--mcp-no-hover):hover {\n  background-color: rgba(var(--activeColor), 0.2);\n}\n\n.--mcp-settings-panel ul li > div {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  width: 48px;\n  flex: 1;\n  gap: 10px;\n}\n\n.--mcp-settings-panel {\n  width: 251px;\n  position: absolute;\n  background-color: var(--backgroundSettingsColor);\n  right: 15px;\n  bottom: 60px;\n  transition: all ease 0.2s;\n  z-index: 1000;\n  pointer-events: auto;\n}\n\n.--mcp-speed-values {\n  padding: 0px;\n}\n.--mcp-no-hover {\n  padding: 0px !important;\n}\n.--mcp-speed-value-item:not(.--mcp-selected) {\n  padding-left: 15px;\n}\n.--mcp-speed-value-item.--mcp-selected {\n  padding-left: 10px;\n}\n.--mcp-speed-value .icon-check-solid {\n  margin-left: -5px;\n}\n.--mcp-settings-panel ul.--mcp-speed-settings li > div {\n  justify-content: flex-start;\n  flex: unset;\n  width: 20px;\n}\n\n.--mcp-main-settings ul li > p {\n  display: flex;\n  align-items: center;\n  padding-left: 10px;\n  flex: 1;\n}\n\n/* \n\nSliders \n\n*/\n.--mc-player .switch {\n  position: relative;\n  display: inline-block;\n  width: 36px;\n  height: 14px;\n}\n\n.--mc-player .switch input {\n  display: none;\n}\n\n.--mc-player .settings-switch::after {\n  clear: both;\n}\n\n.--mc-player .slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #999;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.--mc-player .slider:before {\n  position: absolute;\n  content: \"\";\n  height: 20px;\n  width: 20px;\n  left: 0px;\n  bottom: -3px;\n  background-color: #cfcfcf;\n  -webkit-transition: 0.4s;\n  transition: 0.4s;\n}\n\n.--mc-player input:checked + .slider {\n  background-color: rgb(var(--activeColor));\n}\n.--mc-player input:checked + .slider:before {\n  background-color: white;\n}\n\n.--mc-player input:focus + .slider {\n  box-shadow: 0 0 1px rgb(var(--activeColor));\n}\n\n.--mc-player input:checked + .slider:before {\n  -webkit-transform: translateX(16px);\n  -ms-transform: translateX(16px);\n  transform: translateX(16px);\n}\n\n.--mc-player .slider.round {\n  border-radius: 34px;\n}\n\n.--mc-player .slider.round:before {\n  border-radius: 50%;\n}\n\n.--mc-player .m-fadeOut {\n  visibility: hidden !important;\n  opacity: 0 !important;\n  display: none !important;\n}\n\n.--mc-player .m-fadeIn {\n  display: unset;\n  visibility: visible !important;\n  opacity: 1 !important;\n}\n\n.--mcp-volume-cursor {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background-color: rgb(var(--defaultColor));\n  right: -8px;\n  border-radius: 100%;\n  display: none;\n}\n.--mcp-volumebar-color {\n  width: 100%;\n  height: 3px;\n  background-color: rgba(var(--defaultColor), 0.3);\n}\n.--mcp-volumebar-color-active {\n  width: 100%;\n  height: 100%;\n  background-color: rgb(var(--defaultColor));\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  position: relative;\n}\n";

var timeout = setTimeout(function () {}, 0);
function trigger$5(_this) {
  clearTimeout(timeout);

  _this.elements.playPausePanel.classList.remove("animate");

  _this.elements.playPausePanel.classList.add("hide");

  _this.elements.playPausePanel.classList.remove("hide");

  _this.elements.playPausePanel.classList.add("remove-animation");

  _this.elements.playPausePanel.classList.remove("remove-animation");

  if (_this.clip.runTimeInfo.state !== "playing") {
    _this.play();

    _this.addPlayIcon();
  } else {
    _this.pause();

    _this.addPauseIcon();
  }

  _this.elements.playPausePanel.classList.add("animate");

  timeout = setTimeout(function () {
    _this.elements.playPausePanel.classList.remove("animate");

    _this.elements.playPausePanel.classList.add("hide");
  }, 800);
}
function add$5(_this) {
  _this.elements.pointerEventPanel.onclick = function () {
    return trigger$5(_this);
  };
}

function trigger$4(_this) {
  var elFullScreen = _this.clip.props.host.className.includes("full-screen");

  if (_this.clip.props.host !== _this.options.host) {
    if (!elFullScreen) {
      _this.clip.props.host.appendChild(_this.elements.mcPlayer);
    } else {
      _this.options.host.appendChild(_this.elements.mcPlayer);
    }
  }

  elFullScreen ? _this.exitFullscreen() : _this.launchIntoFullscreen(_this.clip.props.host);
}
function add$4(_this) {
  _this.elements.fullScreenButton.onclick = function () {
    return trigger$4(_this);
  };
}

var wheelListener = (function (_this) {
  // initialize wheelseek options
  window.addEventListener("wheel", function (e) {
    _this.stepper(e.deltaY);
  }, {
    passive: true
  });
  window.addEventListener("touchmove", function (e) {
    var _this$lastY;

    var currentY = e.touches[0].clientY;
    (_this$lastY = _this.lastY) !== null && _this$lastY !== void 0 ? _this$lastY : _this.lastY = currentY;
    var delta = -(currentY - _this.lastY);

    _this.stepper(delta);

    _this.lastY = currentY;
  }, {
    passive: true
  });
  window.addEventListener("touchend", function () {
    _this.lastY = null;
  }, {
    passive: true
  });
  window.addEventListener("touchstart", function () {
    _this.cancelAnimation();

    _this.lastY = null;
  }, {
    passive: true
  });
});

var global$1 = global$I;
var fails = fails$q;
var uncurryThis = functionUncurryThis;
var toString = toString$c;
var trim = stringTrim.trim;
var whitespaces = whitespaces$4;
var charAt = uncurryThis(''.charAt);
var n$ParseFloat = global$1.parseFloat;
var Symbol$1 = global$1.Symbol;
var ITERATOR = Symbol$1 && Symbol$1.iterator;
var FORCED = 1 / n$ParseFloat(whitespaces + '-0') !== -Infinity // MS Edge 18- broken with boxed symbols
|| ITERATOR && !fails(function () {
  n$ParseFloat(Object(ITERATOR));
}); // `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string

var numberParseFloat = FORCED ? function parseFloat(string) {
  var trimmedString = trim(toString(string));
  var result = n$ParseFloat(trimmedString);
  return result === 0 && charAt(trimmedString, 0) == '-' ? -0 : result;
} : n$ParseFloat;

var $ = _export;
var $parseFloat = numberParseFloat; // `parseFloat` method
// https://tc39.es/ecma262/#sec-parsefloat-string

$({
  global: true,
  forced: parseFloat != $parseFloat
}, {
  parseFloat: $parseFloat
});

var loopBarEndListener = (function (_this) {
  _this.listeners.onCursorMoveLoopEnd = function (e) {
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    if (_this.elements.runningBar.offsetWidth >= _this.elements.loopBar.offsetWidth) {
      _this.elements.runningBar.style.width = _this.elements.loopBar.offsetWidth + "px";
    }

    if (_this.settings.loopLastPositionXPxls - positionX < 0) {
      _this.elements.loopBar.style.width = Math.abs(_this.settings.loopLastPositionXPxls - positionX) + "px";
    } else {
      _this.elements.loopBar.style.left = positionX + "px";
      _this.settings.loopLastPositionXPxls = positionX;
    }

    _this.settings.loopEndMillisecond = Math.round(_this.clip.duration * ((parseFloat(_this.elements.loopBar.style.left) || 0) + parseFloat(_this.elements.loopBar.style.width)) / _this.elements.totalBar.offsetWidth);

    if (_this.settings.loopEndMillisecond < _this.clip.runTimeInfo.currentMillisecond) {
      _this.settings.loopJourney = true;
    }

    if (_this.settings.loopStartMillisecond > _this.settings.loopEndMillisecond) {
      _this.settings.loopStartMillisecond = _this.settings.loopEndMillisecond;
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopEnd = function () {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    _this.settings.resizeLoop = false;
    var _this$elements = _this.elements,
        loopBar = _this$elements.loopBar,
        totalBar = _this$elements.totalBar,
        runningBar = _this$elements.runningBar;
    runningBar.style.width = runningBar.offsetWidth / loopBar.offsetWidth * 100 + "%";
    loopBar.style.left = "".concat(loopBar.offsetLeft / totalBar.offsetWidth * 100, "%");
    loopBar.style.width = "".concat(loopBar.offsetWidth / totalBar.offsetWidth * 100, "%");

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(runningBar.offsetWidth);

      _this.settings.loopJourney = false;
    }

    removeMouseUpAndMoveListeners(_this.listeners.onMouseUpLoopEnd, _this.listeners.onCursorMoveLoopEnd);
    addStartListeners(_this.listeners.onMouseDown, loopBar, true);

    if (!_this.settings.playAfterResize) {
      return;
    }

    if (_this.clip.runTimeInfo.state === "idle" || _this.clip.runTimeInfo.state === "completed") {
      var loopms;

      if (_this.clip.speed >= 0) {
        loopms = _this.settings.loopStartMillisecond + 1;
      } else {
        loopms = _this.settings.loopEndMillisecond - 1;
      }

      _this.settings.needsUpdate = true;

      _this.createJourney(loopms, {
        before: "pause",
        after: "play"
      });
    } else {
      _this.clip.play();
    }

    _this.settings.playAfterResize = false;
  };

  _this.listeners.onMouseDownLoopEnd = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto";
    _this.settings.resizeLoop = true;
    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();

      _this.settings.playAfterResize = true;
    }

    _this.elements.runningBar.style.width = "".concat(_this.elements.runningBar.offsetWidth, "px");
    var loopBar = _this.elements.loopBar;
    loopBar.style.left = "".concat(loopBar.offsetLeft, "px");
    loopBar.style.width = "".concat(loopBar.offsetWidth, "px");
    removeStartListeners(_this.listeners.onMouseDown, loopBar);

    _this.listeners.onCursorMoveLoopEnd(e);

    addMouseUpAndMoveListeners(_this.listeners.onMouseUpLoopEnd, _this.listeners.onCursorMoveLoopEnd);
  };

  addStartListeners(_this.listeners.onMouseDownLoopEnd, _this.elements.loopBarEnd, false);
});

var loopBarStartListener = (function (_this) {
  _this.listeners.onCursorMoveLoopStart = function (e) {
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.totalBar.getBoundingClientRect();

    var positionX = Math.round(clientX - viewportOffset.left);
    var endPositionsInPxls = Math.round(_this.settings.loopEndMillisecond / _this.clip.duration * _this.elements.totalBar.offsetWidth);

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.totalBar.offsetWidth) {
      positionX = _this.elements.totalBar.offsetWidth;
    }

    var runningBarWidthInPxls = _this.clip.runTimeInfo.currentMillisecond / _this.clip.duration * _this.elements.totalBar.offsetWidth - positionX;
    _this.elements.loopBar.style.left = positionX + "px";
    _this.elements.loopBar.style.width = endPositionsInPxls - positionX + "px";
    _this.elements.runningBar.style.width = runningBarWidthInPxls + "px";
    _this.settings.loopLastPositionXPxls = positionX;
    _this.settings.loopStartMillisecond = Math.round(_this.clip.duration * _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth);

    if (_this.settings.loopEndMillisecond < _this.settings.loopStartMillisecond) {
      _this.settings.loopEndMillisecond = _this.settings.loopStartMillisecond;
      _this.elements.loopBar.style.width = "0px";
      _this.elements.runningBar.style.width = "0px";
    }

    if (_this.settings.loopStartMillisecond > _this.clip.runTimeInfo.currentMillisecond) {
      _this.settings.loopJourney = true;
    }
  };

  _this.listeners.onMouseUpLoopStart = function () {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    _this.settings.resizeLoop = false; // e.preventDefault();

    if (_this.settings.loopJourney) {
      _this.createProgressDrag(_this.elements.runningBar.offsetWidth);

      _this.settings.loopJourney = false;
    }

    _this.elements.loopBar.style.left = _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth * 100 + "%";
    _this.elements.loopBar.style.width = _this.elements.loopBar.offsetWidth / _this.elements.totalBar.offsetWidth * 100 + "%";
    _this.settings.loopStartMillisecond = Math.round(_this.clip.duration * _this.elements.loopBar.offsetLeft / _this.elements.totalBar.offsetWidth);
    _this.elements.runningBar.style.width = _this.elements.runningBar.offsetWidth / _this.elements.loopBar.offsetWidth * 100 + "%";
    removeMouseUpAndMoveListeners(_this.listeners.onMouseUpLoopStart, _this.listeners.onCursorMoveLoopStart);
    addStartListeners(_this.listeners.onMouseDown, _this.elements.loopBar, true);

    if (_this.settings.playAfterResize) {
      if (_this.clip.runTimeInfo.state === "idle") {
        var loopms;

        if (_this.clip.speed >= 0) {
          loopms = _this.settings.loopStartMillisecond + 1;
        } else {
          loopms = _this.settings.loopEndMillisecond - 1;
        }

        _this.settings.needsUpdate = true;

        _this.createJourney(loopms, {
          before: "pause",
          after: "play"
        });
      } else {
        _this.clip.play();
      }

      _this.settings.playAfterResize = false;
    }
  };

  _this.listeners.onMouseDownLoopStart = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto";
    _this.settings.resizeLoop = true;
    _this.settings.needsUpdate = true;

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.clip.pause();

      _this.settings.playAfterResize = true;
    }

    removeStartListeners(_this.listeners.onMouseDown, _this.elements.loopBar);

    _this.listeners.onCursorMoveLoopStart(e);

    addMouseUpAndMoveListeners(_this.listeners.onMouseUpLoopStart, _this.listeners.onCursorMoveLoopStart);
  };

  addStartListeners(_this.listeners.onMouseDownLoopStart, _this.elements.loopBarStart);
});

function trigger$3(_this) {
  _this.settings.loopActivated = !_this.settings.loopActivated;

  _this.eventBroadcast(LOOP_CHANGE, _this.settings.loopActivated);

  _this.elements.loopButton.classList.toggle("svg-selected");

  _this.elements.loopBarStart.classList.toggle("m-fadeOut");

  _this.elements.loopBarEnd.classList.toggle("m-fadeOut");

  _this.elements.loopBarStart.classList.toggle("m-fadeIn");

  _this.elements.loopBarStart.classList.toggle("".concat(_this.name, "-hide"));

  _this.elements.loopBarEnd.classList.toggle("m-fadeIn");

  _this.elements.loopBarEnd.classList.toggle("".concat(_this.name, "-hide"));

  _this.settings.needsUpdate = true;

  if (!_this.settings.loopActivated) {
    _this.elements.loopBar.style.left = "0%";
    _this.elements.loopBar.style.width = "100%";
    _this.settings.loopStartMillisecond = 0;
    _this.settings.loopEndMillisecond = _this.clip.duration;
    _this.settings.loopLastPositionXPxls = 0;
    _this.settings.loopLastPositionXPercentage = 0;
    _this.elements.runningBar.style.width = _this.clip.runTimeInfo.currentMillisecond / _this.clip.duration * 100 + "%";
  }
}
function add$3(_this) {
  _this.elements.loopButton.onclick = function () {
    return trigger$3(_this);
  };
}

var progressBarListener = (function (_this) {
  _this.listeners.onCursorMove = function (e) {
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;

    var viewportOffset = _this.elements.loopBar.getBoundingClientRect();

    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > _this.elements.loopBar.offsetWidth) {
      positionX = _this.elements.loopBar.offsetWidth;
    }

    _this.handleDrag(positionX);
  };

  _this.listeners.onMouseUp = function () {
    _this.elements.listenerHelper.style.pointerEvents = "none";
    removeMouseUpAndMoveListeners(_this.listeners.onMouseUp, _this.listeners.onCursorMove);

    _this.handleDragEnd(_this.settings);
  };

  _this.listeners.onMouseDown = function (e) {
    _this.elements.listenerHelper.style.pointerEvents = "auto";

    if (_this.clip.runTimeInfo.state === "playing") {
      _this.settings.playAfterResize = true;
    }

    _this.handleDragStart(_this.clip);

    _this.listeners.onCursorMove(e);

    addMouseUpAndMoveListeners(_this.listeners.onMouseUp, _this.listeners.onCursorMove);
  };

  addStartListeners(_this.listeners.onMouseDown, _this.elements.loopBar);
});

var showPointerEvents = function showPointerEvents(_this) {
  if (!_this.elements.showPointerEventsCheckbox.checked) {
    _this.elements.showPointerEventsCheckbox.checked = true;
    _this.options.pointerEvents = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "none";
    _this.elements.controls.style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  } else {
    _this.elements.showPointerEventsCheckbox.checked = false;
    _this.elements.mcPlayer.style.pointerEvents = "none";
    _this.elements.pointerEventPanel.style.pointerEvents = "auto";
    _this.elements.controls.style.pointerEvents = "auto";
    _this.elements.settingsPanel.style.pointerEvents = "auto";
  }

  _this.eventBroadcast("show-pointer-events-change", _this.elements.showPointerEventsCheckbox.checked);
};

var showVolume = function showVolume(_this) {
  _this.elements.volumeControl.classList.toggle("m-fadeOut");

  if (_this.elements.showVolumeCheckbox.checked) {
    _this.elements.showVolumeCheckbox.checked = false;
  } else {
    _this.elements.showVolumeCheckbox.checked = true;
  }

  _this.eventBroadcast(SHOW_VOLUME_CHANGE, _this.elements.showVolumeCheckbox.checked);
};

function add$2(_this) {
  _this.elements.settingsPanel.onblur = function () {
    _this.elements.settingsButton.click();
  };

  _this.elements.settingsPointerEvents.onclick = function () {
    return showPointerEvents(_this);
  };

  _this.elements.settingsShowVolume.onclick = function () {
    return showVolume(_this);
  };

  _this.elements.settingsButton.onclick = function () {
    var showHideSettings = function showHideSettings(e) {
      if (_this.elements.settingsPanel.contains(e.target)) {
        return true;
      }

      _this.elements.settingsPanel.classList.toggle("".concat(_this.name, "-hide"));

      _this.elements.settingsPanel.classList.toggle("m-fadeOut");

      _this.elements.settingsPanel.classList.toggle("m-fadeIn");

      if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
        removeListener("click", showHideSettings, false);

        _this.eventBroadcast(STATE_CHANGE, _this.state);
      } else {
        _this.elements.settingsPanel.focus();
      }
    };

    if (_this.elements.settingsPanel.className.includes("m-fadeOut")) {
      if (!_this.elements.controls.classList.value.includes("--mcp-force-show-controls")) {
        _this.elements.controls.classList.toggle("--mcp-force-show-controls");
      }

      addListener("click", showHideSettings, false);
    } else {
      removeListener("click", showHideSettings, false);
    }
  };
}
function trigger$2(_this, setting) {
  if (setting === "showPointerEvents") {
    showPointerEvents(_this);
  } else if (setting === "showVolume") {
    showVolume(_this);
  }
}

function add$1(_this) {
  _this.elements.settingsSpeedButtonShow.onclick = _this.elements.settingsSpeedButtonHide.onclick = function () {
    _this.elements.settingsPanel.classList.toggle("".concat(_this.name, "-settings-speed-panel"));

    var includesClass = _this.elements.settingsPanel.className.includes("".concat(_this.name, "-settings-speed-panel"));

    if (includesClass) {
      _this.elements.settingsMainPanel.style.display = "none";
      _this.elements.settingsSpeedPanel.style.display = "block";
    } else {
      _this.elements.settingsSpeedPanel.style.display = "none";
      _this.elements.settingsMainPanel.style.display = "block";
    }
  };
}
function trigger$1(_this, speed) {
  speed = parseFloat(speed) || 1;

  _this.eventBroadcast(SPEED_CHANGE, speed);

  var speedDisplay = speed == 1 ? "Normal" : speed;
  _this.clip.executionSpeed = speed;
  _this.elements.speedCurrent.innerHTML = speedDisplay;
}

var statusBtnListener = (function (_this) {
  _this.elements.statusButton.onclick = function () {
    switch (_this.clip.runTimeInfo.state) {
      case "playing":
        _this.clip.pause();

        break;

      case "paused":
      case "idle":
      case "transitional":
      case "armed":
        _this.clip.play();

        break;
    }

    return false;
  };
});

function trigger(_this, volume, mute) {
  var elements = _this.elements;

  if (_typeof(mute) !== undefined) {
    if (mute === false) {
      elements.volumeBarActive.style.width = "".concat(_this.settings.volume * 100, "%");

      _this.clip.setVolume(_this.settings.previousVolume);

      _this.settings.volumeMute = false;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else if (mute === true) {
      _this.settings.volumeMute = true;
      elements.volumeBarActive.style.width = "0%";

      _this.clip.setVolume(0);

      changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF);
    }

    _this.options.muted = _this.settings.volumeMute;

    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  }

  if (_typeof(volume) !== undefined) {
    _this.settings.volume = volume;

    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = volume;
    }

    elements.volumeBarActive.style.width = "".concat(_this.settings.volume * 100, "%");

    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume > 0) {
      _this.settings.volumeMute = false;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else if (_this.settings.volume === 0) {
      _this.settings.volumeMute = true;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    }

    _this.options.volume = _this.settings.volume;

    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.volume);

    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  }
}
function add(_this) {
  var elements = _this.elements;
  var volumeDrag = false;

  elements.volumeBtn.onclick = function () {
    if (_this.settings.volumeMute) {
      elements.volumeBarActive.style.width = "".concat(_this.settings.volume * 100, "%");

      _this.clip.setVolume(_this.settings.previousVolume);

      elements.volumeBarActive.style.width = "".concat(_this.settings.previousVolume * 100, "%");
      _this.settings.volumeMute = false;
      changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    } else {
      _this.settings.volumeMute = true;
      changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF);
      elements.volumeBarActive.style.width = "0%";

      _this.clip.setVolume(0);
    }

    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.previousVolume);

    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };

  var volumeOpen = false;

  elements.volumeBtn.onmouseover = function () {
    volumeOpen = true;
  };

  _this.elements.leftButtons.onmouseout = function () {
    if (!volumeOpen || volumeDrag) {
      return;
    }

    var e = event.toElement || event.relatedTarget || event.target;

    if (e === _this.elements.leftButtons || isDescendant(_this.elements.leftButtons, e)) {
      return;
    }

    volumeOpen = false;
  };

  var listeners = _this.listeners;

  listeners.onCursorMoveVolumeBar = function (e) {
    // e.preventDefault();
    var clientX = e.clientX || ((e.touches || [])[0] || {}).clientX;
    var viewportOffset = elements.volumeBarHelper.getBoundingClientRect();
    var positionX = clientX - viewportOffset.left;

    if (positionX < 0) {
      positionX = 0;
    } else if (positionX > elements.volumeBarHelper.offsetWidth) {
      positionX = elements.volumeBarHelper.offsetWidth;
    }

    _this.settings.volume = Number((positionX / elements.volumeBarHelper.offsetWidth).toFixed(2));
    elements.volumeBarActive.style.width = "".concat(_this.settings.volume * 100, "%");

    _this.clip.setVolume(_this.settings.volume);

    if (_this.settings.volume >= 0) {
      var mute = _this.settings.volume === 0;
      _this.settings.volumeMute = mute;
      mute ? changeIcon(elements.volumeBtn, VOLUME_ON, VOLUME_OFF) : changeIcon(elements.volumeBtn, VOLUME_OFF, VOLUME_ON);
    }

    _this.eventBroadcast(VOLUME_CHANGE, _this.settings.volume);

    _this.eventBroadcast(MUTE_CHANGE, _this.settings.volumeMute);
  };

  listeners.onMouseUpVolumeBar = function () {
    volumeDrag = false;
    elements.listenerHelper.style.pointerEvents = "none";

    if (_this.settings.volume > 0) {
      _this.settings.previousVolume = _this.settings.volume;
    }

    removeMouseUpAndMoveListeners(listeners.onMouseUpVolumeBar, listeners.onCursorMoveVolumeBar);
  };

  listeners.onMouseDownVolumeBar = function (e) {
    volumeDrag = true;
    elements.listenerHelper.style.pointerEvents = "auto";
    listeners.onCursorMoveVolumeBar(e);
    addMouseUpAndMoveListeners(listeners.onMouseUpVolumeBar, listeners.onCursorMoveVolumeBar);
  };

  addStartListeners(listeners.onMouseDownVolumeBar, elements.volumeBarHelper);
  addStartListeners(listeners.onMouseDownVolumeBar, elements.volumeCursor);
}

function isDescendant(parent, child) {
  var node = child.parentNode;

  while (node != null) {
    if (node == parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

var timeCapsule = new motorcortex.TimeCapsule();
/**
 * @classdesc
 * Timer's purpose is to provide an interface through which any TimedIncident
 * (such as a Scene or a Clip) can both privide info regarding their timing
 * state but also provide an interface for interacting/altering the timing of it
 */

var Player = /*#__PURE__*/function () {
  function Player(options) {
    var _this = this;

    _classCallCheck(this, Player);

    this.options = this.initializeOptions(options);
    this.className = name;
    this.id = this.options.id;
    this.name = name;
    this.clip = options.clip; // host to apply the timer

    this.clipClass = options.clipClass;
    this.state = this.clip.runTimeInfo.state;
    this.listeners = {};
    this.settings = {
      volume: 1,
      journey: null,
      previousVolume: 1,
      volumeMute: false,
      needsUpdate: true,
      resizeLoop: false,
      loopJourney: false,
      loopActivated: false,
      requestingLoop: false,
      playAfterResize: false,
      loopStartMillisecond: 0,
      loopLastPositionXPxls: 0,
      loopLastPositionXPercentage: 0,
      loopEndMillisecond: this.clip.duration,
      controls: true
    }; // create the timer controls main div

    setElements(this);
    this.setTheme();
    this.setSpeed();
    this.subscribeToTimer();
    this.subscribeToDurationChange();
    this.addEventListeners();
    this.scaleClipHost();
    this.eventBroadcast(STATE_CHANGE, this.state);

    if (this.options.type == "scroller") {
      var _this$options$section;

      this.timeBucket = 0;
      this.timeProgress = 0;
      this.sortedSections = (_this$options$section = this.options.sections) === null || _this$options$section === void 0 ? void 0 : _this$options$section.sort(function (a, b) {
        return a - b;
      });
    }

    var resizeObserver = new ResizeObserver(function () {
      if (_this.options.scaleToFit) {
        _this.scaleClipHost();
      }
    });
    this.changeSettings(options, true);
    resizeObserver.observe(this.options.host);

    if (this.options.autoPlay) {
      this.play();
    }
  }

  _createClass(Player, [{
    key: "initializeOptions",
    value: function initializeOptions(options) {
      var _options$id, _options$showVolume, _options$clip, _options$clip$audioCl, _options$showIndicato, _options$theme, _options$host, _options$buttons, _options$timeFormat, _options$backgroundCo, _options$fullscreen, _options$scaleToFit, _options$sectionsEasi, _options$pointerEvent, _options$scrollAnimat, _options$onMillisecon, _options$speedValues, _options$speed, _options$muted, _options$maxScrollSto, _options$controls, _options$loop, _options$volume, _options$currentScrip;

      (_options$id = options.id) !== null && _options$id !== void 0 ? _options$id : options.id = Date.now();
      (_options$showVolume = options.showVolume) !== null && _options$showVolume !== void 0 ? _options$showVolume : options.showVolume = Object.keys(((_options$clip = options.clip) === null || _options$clip === void 0 ? void 0 : (_options$clip$audioCl = _options$clip.audioClip) === null || _options$clip$audioCl === void 0 ? void 0 : _options$clip$audioCl.children) || []).length || false;
      (_options$showIndicato = options.showIndicator) !== null && _options$showIndicato !== void 0 ? _options$showIndicato : options.showIndicator = false;
      (_options$theme = options.theme) !== null && _options$theme !== void 0 ? _options$theme : options.theme = "transparent";
      (_options$host = options.host) !== null && _options$host !== void 0 ? _options$host : options.host = options.clip.props.host;
      (_options$buttons = options.buttons) !== null && _options$buttons !== void 0 ? _options$buttons : options.buttons = {};
      (_options$timeFormat = options.timeFormat) !== null && _options$timeFormat !== void 0 ? _options$timeFormat : options.timeFormat = "ss";
      (_options$backgroundCo = options.backgroundColor) !== null && _options$backgroundCo !== void 0 ? _options$backgroundCo : options.backgroundColor = "black";
      (_options$fullscreen = options.fullscreen) !== null && _options$fullscreen !== void 0 ? _options$fullscreen : options.fullscreen = false;
      (_options$scaleToFit = options.scaleToFit) !== null && _options$scaleToFit !== void 0 ? _options$scaleToFit : options.scaleToFit = true;
      (_options$sectionsEasi = options.sectionsEasing) !== null && _options$sectionsEasi !== void 0 ? _options$sectionsEasi : options.sectionsEasing = "easeOutQuart";
      (_options$pointerEvent = options.pointerEvents) !== null && _options$pointerEvent !== void 0 ? _options$pointerEvent : options.pointerEvents = false;
      (_options$scrollAnimat = options.scrollAnimation) !== null && _options$scrollAnimat !== void 0 ? _options$scrollAnimat : options.scrollAnimation = false;
      (_options$onMillisecon = options.onMillisecondChange) !== null && _options$onMillisecon !== void 0 ? _options$onMillisecon : options.onMillisecondChange = null;
      (_options$speedValues = options.speedValues) !== null && _options$speedValues !== void 0 ? _options$speedValues : options.speedValues = [-1, 0, 0.5, 1, 2];
      (_options$speed = options.speed) !== null && _options$speed !== void 0 ? _options$speed : options.speed = 1;
      (_options$muted = options.muted) !== null && _options$muted !== void 0 ? _options$muted : options.muted = false;
      (_options$maxScrollSto = options.maxScrollStorage) !== null && _options$maxScrollSto !== void 0 ? _options$maxScrollSto : options.maxScrollStorage = 50;
      (_options$controls = options.controls) !== null && _options$controls !== void 0 ? _options$controls : options.controls = true;
      (_options$loop = options.loop) !== null && _options$loop !== void 0 ? _options$loop : options.loop = false;
      (_options$volume = options.volume) !== null && _options$volume !== void 0 ? _options$volume : options.volume = 1;
      (_options$currentScrip = options.currentScript) !== null && _options$currentScrip !== void 0 ? _options$currentScrip : options.currentScript = null;

      if (options.millisecond) {
        var clip = this.clip || options.clip;
        if (options.millisecond > clip.duration) options.millisecond = clip.duration;
        if (options.millisecond < 0) options.millisecond = 0;
        if (!isFinite(options.millisecond)) options.millisecond = 0;
        this.createJourney(options.millisecond, {}, this.clip || options.clip);
      } // remove strings


      for (var i in options.speedValues) {
        if (!isFinite(options.speedValues[i])) {
          options.speedValues.splice(i, 1);
        }
      }

      options.speedValues.sort(function (a, b) {
        return a - b;
      });
      return options;
    }
  }, {
    key: "play",
    value: function play() {
      this.clip.play();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.clip.pause();
    }
  }, {
    key: "changeSettings",
    value: function changeSettings(newOptions, initial) {
      var _this2 = this;

      newOptions = this.initializeOptions(_objectSpread2(_objectSpread2({}, this.options), newOptions));

      if (newOptions.clip !== this.options.clip) {
        initial = true;
        this.clip = newOptions.clip;
        this.options.clip = newOptions.clip;
      }

      if (newOptions.controls === false) {
        this.elements.mcPlayer.style.display = "none";
      } else if (newOptions.controls === true) {
        this.elements.mcPlayer.style.display = "block";
      }

      var checkObject = {
        loop: function loop() {
          return trigger$3(_this2);
        },
        fullscreen: function fullscreen() {
          return trigger$4(_this2);
        },
        muted: function muted() {
          return trigger(_this2, undefined, newOptions.mute);
        },
        volume: function volume() {
          return trigger(_this2, newOptions.volume);
        },
        speed: function speed() {
          return trigger$1(_this2, newOptions.speed);
        },
        scaleToFit: function scaleToFit() {
          _this2.options.scaleToFit = newOptions.scaleToFit;

          _this2.scaleClipHost();
        },
        showVolume: function showVolume() {
          return trigger$2(_this2, "showVolume");
        },
        type: function type() {
          if (newOptions.type === "scroller") wheelListener(_this2);
        },
        theme: function theme() {
          _this2.options.theme = newOptions.theme;

          _this2.setTheme();
        },
        overflow: function overflow() {
          _this2.clip.props.host.shadowRoot.children[0].style.overflow = newOptions.overflow;
        },
        outline: function outline() {
          _this2.clip.props.host.shadowRoot.children[0].style.outline = newOptions.outline;
        },
        visible: function visible() {
          if (newOptions.visible == "always") {
            _this2.elements.controls.classList.add("--mcp-always-show-controls");
          } else if (newOptions.visible == "normal") {
            _this2.elements.controls.classList.remove("--mcp-always-show-controls");
          }
        }
      };
      var checkWhenInitial = ["fullscreen", "muted", "volume", "speed", "scaleToFit", "loop", "overflow", "outline", "visible"];

      for (var key in checkObject) {
        if (typeof newOptions[key] !== "undefined" && (this.options[key] !== newOptions[key] || initial && this.options[key] !== false && checkWhenInitial.includes(key))) {
          checkObject[key]();
        }
      }

      this.options = _objectSpread2(_objectSpread2({}, this.options), newOptions);
    }
  }, {
    key: "scaleClipHost",
    value: function scaleClipHost() {
      if (this.options.scaleToFit) {
        var _this$clip$props$cont = this.clip.props.containerParams,
            width = _this$clip$props$cont.width,
            height = _this$clip$props$cont.height;
        var transform = calcClipScale({
          width: width,
          height: height
        }, {
          width: this.clip.props.host.offsetWidth,
          height: this.clip.props.host.offsetHeight - (this.options.visible == "always" ? 50 : 0)
        }, this.options.scaleToFit === "cover");
        this.clip.realClip.rootElement.style.transform = "scale(".concat(transform.scale);
        this.clip.realClip.rootElement.style.left = "".concat(transform.position.left, "px");
        this.clip.realClip.rootElement.style.top = "".concat(transform.position.top, "px");
      } else {
        this.clip.realClip.rootElement.style.transform = "scale(1)";
        this.clip.realClip.rootElement.style.left = "0px";
        this.clip.realClip.rootElement.style.top = "0px";
      }

      this.eventBroadcast(SCALE_CHANGE, this.options.scaleToFit);
    }
  }, {
    key: "createLoop",
    value: function createLoop(msStart, msEnd) {
      this.settings.loopStartMillisecond = msStart;
      this.settings.loopEndMillisecond = msEnd;
      this.elements.loopBar.style.left = "".concat(msStart / this.clip.duration * 100, "%");
      this.elements.loopBar.style.width = "".concat((msEnd - msStart) / this.clip.duration * 100, "%");
      this.createJourney(msStart);
      this.elements.runningBar.style.width = "0%";
      !this.settings.loopActivated && trigger$3(this);
    }
  }, {
    key: "createJourney",
    value: function createJourney(millisecond) {
      var _clip,
          _this3 = this;

      var clipCommands = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var clip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      (_clip = clip) !== null && _clip !== void 0 ? _clip : clip = this.clip;
      setTimeout(function () {
        if (!clip.id) return;
        var def = null;
        var _clipCommands$before = clipCommands.before,
            before = _clipCommands$before === void 0 ? def : _clipCommands$before,
            _clipCommands$after = clipCommands.after,
            after = _clipCommands$after === void 0 ? def : _clipCommands$after;
        if (before) clip[before]();
        _this3.settings.journey = timeCapsule.startJourney(clip);

        _this3.settings.journey.station(millisecond);

        _this3.settings.journey.destination();

        if (after) clip[after]();
      }, 0);
    }
    /* SCROLLER */

  }, {
    key: "animateWithEasing",
    value: function animateWithEasing() {
      this.progress = (Date.now() - this.transitionStart) / this.endAnimation;
      if (this.progress >= 1) return this.cancelAnimation();
      var journeyPosition = this.calculateJourneyPosition(this.progress);
      if (journeyPosition < 0) journeyPosition = 0;
      if (journeyPosition > this.clip.duration) journeyPosition = this.clip.duration;
      this.createJourney(journeyPosition);
      this.requestAnimationID = window.requestAnimationFrame(this.animateWithEasing.bind(this));
    }
  }, {
    key: "calculateMinMaxOfTimeProgress",
    value: function calculateMinMaxOfTimeProgress() {
      if (this.timeProgress >= this.clip.duration) this.timeProgress = this.clip.duration;
      if (this.timeProgress <= 0) this.timeProgress = 0;
    }
  }, {
    key: "requestAnimation",
    value: function requestAnimation() {
      this.requestAnimationID = window.requestAnimationFrame(this.animateTimeBucket.bind(this));
    }
  }, {
    key: "cancelAnimation",
    value: function cancelAnimation() {
      window.cancelAnimationFrame(this.requestAnimationID);
      this.requestAnimationID = null;
    }
  }, {
    key: "removeTimeFromBucket",
    value: function removeTimeFromBucket() {
      var log = Math.log(this.timeBucket);
      var timeRemove = Math.pow(log, 2);
      this.timeBucket -= this.options.scrollAnimation ? log : timeRemove;
      return timeRemove;
    }
  }, {
    key: "addTimeToProgress",
    value: function addTimeToProgress(timeRemove) {
      this.timeProgress += timeRemove * this.multiplier * this.clip.speed;
    }
  }, {
    key: "checkIfBucketHasTime",
    value: function checkIfBucketHasTime() {
      if (this.timeBucket <= 0) {
        this.requestAnimationID = null;
        return false;
      }

      return true;
    }
  }, {
    key: "calculateJourneyPosition",
    value: function calculateJourneyPosition(progress) {
      var easedProgress = motorcortex.utils.easings[this.options.sectionsEasing](progress);
      return this.startPosition + easedProgress * this.options.speed * this.multiplier * this.endAnimationTime;
    }
  }, {
    key: "animateTimeBucket",
    value: function animateTimeBucket() {
      if (!this.checkIfBucketHasTime) return;
      this.addTimeToProgress(this.removeTimeFromBucket());
      this.calculateMinMaxOfTimeProgress();

      if (!this.options.sections) {
        this.createJourney(this.timeProgress);
      } else {
        var now = Date.now() - this.startAnimationTime;
        var progress = now / this.endAnimationTime;
        if (progress >= 1 || this.endAnimationTime === 0) return this.cancelAnimation();
        var sectionPosition = this.calculateJourneyPosition(progress);
        this.createJourney(Math.ceil(sectionPosition));
      }

      this.requestAnimation();
    }
  }, {
    key: "setUpTimeBucket",
    value: function setUpTimeBucket(deltaY) {
      var newMultiplier = deltaY > 0 ? 1 : -1;
      deltaY = Math.ceil(Math.abs(deltaY)) * newMultiplier;
      this.timeBucket += Math.abs(deltaY);
      /* clear timebucket if check of direction */

      if (newMultiplier != this.multiplier) this.timeBucket = Math.abs(deltaY);
      /* check if bucket exceeds the maximum value */

      if (this.timeBucket > this.options.maxScrollStorage) this.timeBucket = this.options.maxScrollStorage;
      this.multiplier = newMultiplier;
    }
  }, {
    key: "getSectionTime",
    value: function getSectionTime(direction) {
      var sectionIndex;

      if (direction > 0) {
        var _sectionIndex;

        var newPosition = this.startPosition + this.timeBucket;

        for (var i = 0; i < this.sortedSections.length; i++) {
          if (newPosition < this.sortedSections[i]) {
            sectionIndex = i;
            break;
          }
        }

        (_sectionIndex = sectionIndex) !== null && _sectionIndex !== void 0 ? _sectionIndex : sectionIndex = this.sortedSections.length - 1;
      } else {
        var _sectionIndex2;

        var _newPosition = this.startPosition - this.timeBucket;

        for (var _i = this.sortedSections.length - 1; _i >= 0; _i--) {
          if (_newPosition > this.sortedSections[_i]) {
            sectionIndex = _i;
            break;
          }
        }

        (_sectionIndex2 = sectionIndex) !== null && _sectionIndex2 !== void 0 ? _sectionIndex2 : sectionIndex = 0;
      }

      return sectionIndex;
    }
  }, {
    key: "initializeSections",
    value: function initializeSections() {
      this.startAnimationTime = Date.now();
      this.startPosition = this.clip.runTimeInfo.currentMillisecond;
      this.currentSectionIndex = this.getSectionTime(this.multiplier);
      this.endAnimationTime = Math.abs(this.startPosition - this.sortedSections[this.currentSectionIndex]);
    }
  }, {
    key: "stepper",
    value: function stepper(deltaY) {
      this.setUpTimeBucket(deltaY);
      if (this.options.sections) this.initializeSections();
      if (!this.requestAnimationID) this.animateTimeBucket();
    }
    /* scroller end*/

  }, {
    key: "millisecondChange",
    value: function millisecondChange(millisecond, state, roundTo, makeJouney) {
      var executeOnMillisecondChange = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

      if (this.state !== state) {
        this.state = state;
        this.eventBroadcast(STATE_CHANGE, state);
      }

      if (!this.settings.needsUpdate) {
        this.clip.pause();
        return 1;
      }

      var loopActivated = this.settings.loopActivated;

      if (loopActivated && this.clip.speed) {
        this.calculateJourney(millisecond);
      }

      var duration = this.clip.duration;
      var _this$elements = this.elements,
          totalBar = _this$elements.totalBar,
          loopBar = _this$elements.loopBar;
      var loopBarWidth = loopBar.offsetWidth;
      var loopBarLeft = loopBar.offsetLeft / totalBar.offsetWidth;
      var localMillisecond = millisecond - duration * loopBarLeft;
      var localDuration = duration / totalBar.offsetWidth * loopBarWidth;

      if (makeJouney) {
        this.createJourney(millisecond, {
          after: this.settings.playAfterResize ? "play" : null
        });
      }

      this.elements.runningBar.style.width = localMillisecond / localDuration * 100 + "%";
      this.elements.currentTime.innerHTML = this.timeFormat(millisecond);

      if (this.options.onMillisecondChange && executeOnMillisecondChange) {
        this.options.onMillisecondChange(millisecond);
      }
    }
  }, {
    key: "calculateJourney",
    value: function calculateJourney(millisecond) {
      var _this$settings = this.settings,
          loopEndMillisecond = _this$settings.loopEndMillisecond,
          loopStartMillisecond = _this$settings.loopStartMillisecond;
      var atEndOfLoop = millisecond > loopEndMillisecond || millisecond === this.clip.duration;
      var atStartOfLoop = millisecond < loopStartMillisecond || millisecond === 0;
      var positiveSpeed = this.clip.speed > 0;

      if (this.clip.runTimeInfo.state === PLAYING) {
        if (positiveSpeed) {
          if (atEndOfLoop) {
            this.createJourney(loopStartMillisecond + 1, {
              after: "play"
            });
            return true;
          }
        } else {
          if (atStartOfLoop) {
            this.createJourney(loopEndMillisecond - 1, {
              after: "play"
            });
            return true;
          }
        }
      }

      return false;
    }
  }, {
    key: "broadcastNotPlaying",
    value: function broadcastNotPlaying(state) {
      if (!this.elements.controls.classList.value.includes(showControls)) {
        this.elements.controls.classList.toggle(showControls);
      }

      changeIcon(this.elements.statusButton, "pause", "play");
      this.elements.indicator.innerHTML = "".concat(state.charAt(0).toUpperCase() + state.slice(1));

      if (state == "blocked") {
        this.addSpinner();
      } else if (state !== "idle") {
        this.removeSpinner();
      }
    }
  }, {
    key: "changeInitParams",
    value: function changeInitParams(initParams) {
      this.clip.pause();
      var definition = this.clip.exportLiveDefinition();
      definition.props.host = this.clip.props.host;
      definition.props.initParams = initParams;
      this.clip.realClip.context.unmount();

      for (var key in this.clip) {
        delete this.clip[key];
      }

      this.clip = motorcortex.utils.clipFromDefinition(definition);
      this.options.clip = this.clip;
      this.changeSettings(this.options, true);
      this.subscribeToTimer();
      this.subscribeToDurationChange();
    }
  }, {
    key: "addSpinner",
    value: function addSpinner() {
      changeIcon(this.elements.pointerEventPanel, null, "spinner");
      this.elements.pointerEventPanel.classList.add("loading");
    }
  }, {
    key: "addPlayIcon",
    value: function addPlayIcon() {
      changeIcon(this.elements.playPausePanelContainer, null, "play");
    }
  }, {
    key: "addPauseIcon",
    value: function addPauseIcon() {
      changeIcon(this.elements.playPausePanelContainer, null, "pause");
    }
  }, {
    key: "removeSpinner",
    value: function removeSpinner() {
      changeIcon(this.elements.pointerEventPanel, "spinner", null);
      this.elements.pointerEventPanel.classList.remove("loading");
    }
  }, {
    key: "broadcastPlaying",
    value: function broadcastPlaying(state) {
      this.removeSpinner();

      if (this.elements.controls.classList.value.includes(showControls)) {
        this.elements.controls.classList.toggle(showControls);
      }

      this.elements.indicator.innerHTML = "Playing";
      changeIcon(this.elements.statusButton, "play", "pause");

      if (state !== PLAYING) {
        return;
      }

      if (this.clip.runTimeInfo.currentMillisecond === this.clip.duration && this.clip.speed >= 0) {
        this.createJourney(1, {
          after: "play"
        });
      } else if ((this.clip.runTimeInfo.currentMillisecond === this.clip.duration || this.clip.runTimeInfo.currentMillisecond === 0) && this.clip.speed < 0) {
        this.createJourney(this.clip.duration - 1, {
          after: "play"
        });
      }
    }
  }, {
    key: "broadcastDurationChange",
    value: function broadcastDurationChange() {
      this.elements.totalTime.innerHTML = this.timeFormat(this.clip.duration);
      this.settings.loopEndMillisecond = this.clip.duration;
      this.elements.pointerEventPanel.innerHTML = "";
      this.millisecondChange(this.clip.runTimeInfo.currentMillisecond);
    }
  }, {
    key: "broadcastVolumeChange",
    value: function broadcastVolumeChange(state) {
      this.options.volume = state;
      this.options.currentScript.dataset.volume = state;
    }
  }, {
    key: "broadcastSpeedChange",
    value: function broadcastSpeedChange(state) {
      this.options.speed = state;
      this.options.currentScript.dataset.speed = state;
    }
  }, {
    key: "broadcastMuteChange",
    value: function broadcastMuteChange(state) {
      if (state) {
        this.options.muted = true;
        this.options.currentScript.dataset.muted = "";
      } else {
        this.options.muted = false;
        delete this.options.currentScript.dataset.muted;
      }
    }
  }, {
    key: "broadcastLoopChange",
    value: function broadcastLoopChange(state) {
      if (state) {
        this.options.loop = true;
        this.options.currentScript.dataset.loop = "";
      } else {
        this.options.loop = false;
        delete this.options.currentScript.dataset.loop;
      }
    }
  }, {
    key: "broadcastScaleChange",
    value: function broadcastScaleChange(state) {
      if (state) {
        this.options.scaleToFit = true;
        this.options.currentScript.dataset.scaleToFit = "";
      } else {
        this.options.scaleToFit = false;
        delete this.options.currentScript.dataset.scaleToFit;
      }
    }
  }, {
    key: "broadcastShowVolumeChange",
    value: function broadcastShowVolumeChange(state) {
      if (state) {
        this.options.showVolume = true;
        this.options.currentScript.dataset.showVolume = "";
      } else {
        this.options.showVolume = false;
        delete this.options.currentScript.dataset.showVolume;
      }
    }
  }, {
    key: "broadcastToScript",
    value: function broadcastToScript(eventName, state) {
      if (eventName === VOLUME_CHANGE) {
        this.broadcastVolumeChange(state);
      } else if (eventName === SPEED_CHANGE) {
        this.broadcastSpeedChange(state);
      } else if (eventName === MUTE_CHANGE) {
        this.broadcastMuteChange(state);
      } else if (eventName === LOOP_CHANGE) {
        this.broadcastLoopChange(state);
      } else if (eventName === SCALE_CHANGE) {
        this.broadcastScaleChange(state);
      } else if (eventName === SHOW_VOLUME_CHANGE) {
        this.broadcastShowVolumeChange(state);
      }
    }
  }, {
    key: "calculateThumbnail",
    value: function calculateThumbnail(state) {
      var hasThumbnail = this.options.thumbnail || this.options.thumbnailColor;
      var isZeroMs = this.clip.runTimeInfo.currentMillisecond === 0 && this.clip.speed > 0;
      var hasAutoplay = this.options.autoPlay;

      if (state == "idle" && hasAutoplay) {
        this.elements.playPausePanel.classList.add("hide");
      } else if (state == "idle" && isZeroMs && hasThumbnail) {
        this.addPlayIcon();
        this.elements.playPausePanel.style.backgroundColor = this.options.thumbnailColor || "black";
        this.elements.playPausePanel.style.backgroundImage = this.options.thumbnail && "url(".concat(this.options.thumbnail, ")");
        this.elements.playPausePanel.classList.add("initial");
        this.elements.pointerEventPanel.classList.add("initial");
      } else if (state === "idle" && !hasThumbnail && isZeroMs) {
        this.elements.playPausePanel.classList.add("hide");
      } else {
        this.elements.playPausePanel.style.backgroundColor = "transparent";
        this.elements.playPausePanel.style.backgroundImage = "none";
        this.elements.pointerEventPanel.classList.remove("initial");
        this.elements.playPausePanel.classList.remove("initial");
      }
    }
  }, {
    key: "eventBroadcast",
    value: function eventBroadcast(eventName, state) {
      if (eventName === STATE_CHANGE) {
        if (this.options.currentScript) {
          this.options.currentScript.dataset.status = state;
        }

        this.calculateThumbnail(state);
        var playingStates = ["paused", "idle", "transitional", "armed", "blocked"];

        if (playingStates.includes(state)) {
          this.broadcastNotPlaying(state);
        } else {
          this.broadcastPlaying(state);
        }
      } else if (eventName === DURATION_CHANGE) {
        this.broadcastDurationChange();
      } else if (this.options.currentScript) {
        this.broadcastToScript(eventName, state);
      }
    }
  }, {
    key: "subscribeToDurationChange",
    value: function subscribeToDurationChange() {
      this.clip.subscribeToDurationChange(this.subscribeToDurationChangeCallback.bind(this));
    }
  }, {
    key: "subscribeToDurationChangeCallback",
    value: function subscribeToDurationChangeCallback() {
      this.eventBroadcast(DURATION_CHANGE);
    }
  }, {
    key: "subscribeToTimer",
    value: function subscribeToTimer() {
      this.clip.subscribe(this.id, this.millisecondChange.bind(this));
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart() {
      this.settings.needsUpdate = true;
      this.settings.journey = timeCapsule.startJourney(this.clip);
    }
  }, {
    key: "timeFormat",
    value: function timeFormat(ms) {
      if (this.options.timeFormat === "ss") {
        var hours = ms / 1000 / 60 / 60;
        var minutes = hours % 1 * 60;
        var seconds = minutes % 1 * 60; // By default, JavaScript converts any floating-point number
        // with six or more leading zeros into e-notation
        // to avoid this problem we round to 5 float digits

        var h = ("0" + parseInt(hours.toFixed(50))).slice(-2);
        var m = ("0" + parseInt(minutes.toFixed(50))).slice(-2);
        var s = ("0" + parseInt(seconds.toFixed(50))).slice(-2);
        return "".concat(h === "00" ? "" : h + ":").concat(m, ":").concat(s);
      } else {
        return ms;
      }
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(loopBarPositionX) {
      var executeOnMillisecondChange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!isFinite(loopBarPositionX)) {
        loopBarPositionX = 0;
      }

      var duration = this.clip.duration;
      var journey = this.settings.journey;
      var _this$elements2 = this.elements,
          loopBar = _this$elements2.loopBar,
          totalBar = _this$elements2.totalBar,
          runningBar = _this$elements2.runningBar,
          currentTime = _this$elements2.currentTime;
      var totalBarPositionX = loopBarPositionX + loopBar.offsetLeft;
      var millisecond = Math.round(duration * totalBarPositionX / totalBar.offsetWidth);
      currentTime.innerHTML = this.timeFormat(millisecond);
      runningBar.style.width = loopBarPositionX / loopBar.offsetWidth * 100 + "%";
      journey.station(millisecond);

      if (this.options.onMillisecondChange && executeOnMillisecondChange) {
        this.options.onMillisecondChange(millisecond);
      }
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd() {
      this.settings.journey.destination();
    }
  }, {
    key: "createProgressDrag",
    value: function createProgressDrag(loopBarPositionX) {
      this.handleDragStart();
      this.handleDrag(loopBarPositionX);
      this.handleDragEnd();
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      loopBarEndListener(this);
      progressBarListener(this);
      loopBarStartListener(this);
      add(this);
      statusBtnListener(this);
      add$2(this);
      add$1(this);
      add$3(this);
      add$4(this);
      add$5(this);
      donkeyclipListener(this);
      bodyListener(this);
      if (this.options.type === "scroller") wheelListener(this);
    }
  }, {
    key: "launchIntoFullscreen",
    value: function launchIntoFullscreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }, {
    key: "setTheme",
    value: function setTheme() {
      this.options.theme.replace(/\s\s+/g, " ");
      this.options.theme.trim();
      if (this.options.theme === "default") this.elements.mcPlayer.classList.add("theme-default");else if (this.options.theme === "transparent") this.elements.mcPlayer.classList.add("theme-transparent");else if (this.options.theme === "whiteGold") this.elements.mcPlayer.classList.add("theme-whiteGold");else if (this.options.theme === "darkGold") this.elements.mcPlayer.classList.add("theme-darkGold");else if (this.options.theme === "green") this.elements.mcPlayer.classList.add("theme-green");else if (this.options.theme === "blue") this.elements.mcPlayer.classList.add("theme-blue");else if (this.options.theme === "dark") this.elements.mcPlayer.classList.add("theme-dark");else if (this.options.theme === "yellow") this.elements.mcPlayer.classList.add("theme-yellow");else if (this.options.themeCSS && !elid("--mc-player-style-custom")) {
        this.options.themeCSS = sanitizeCSS(this.options.themeCSS);
        var customStyle = elcreate("style");
        customStyle.id = "--mc-player-style-custom";
        customStyle.styleSheet ? customStyle.styleSheet.cssText = this.options.themeCSS : customStyle.appendChild(document.createTextNode(this.options.themeCSS));
        eltag("head")[0].appendChild(customStyle);
        this.elements.mcPlayer.classList.add(this.options.theme);
      }

      if (!elid("--mc-player-style")) {
        var style = elcreate("style");
        style.id = "--mc-player-style";
        style.styleSheet ? style.styleSheet.cssText = css_248z : style.appendChild(document.createTextNode(css_248z)); // append player style to document

        eltag("head")[0].appendChild(style);
      }

      this.eventBroadcast("theme-change", this.options.theme);
    }
  }, {
    key: "setSpeed",
    value: function setSpeed() {
      var currentSpeed = this.clip.speed == 1 ? "Normal" : this.clip.speed;
      this.elements.speedCurrent.innerHTML = currentSpeed;
    }
  }, {
    key: "calculateSpeed",
    value: function calculateSpeed(step, arrayOfValues, currentPercentage) {
      var botLimitIndex = Math.floor(currentPercentage / step);

      if (botLimitIndex === arrayOfValues.length - 1) {
        return arrayOfValues[botLimitIndex].toFixed(1);
      }

      var limitZonePercentage = currentPercentage / step % 1;
      var limitZoneLength = Math.abs(arrayOfValues[botLimitIndex] - arrayOfValues[botLimitIndex + 1]);
      var realZoneSpeed = limitZonePercentage * limitZoneLength;
      var realSpeed = (realZoneSpeed + arrayOfValues[botLimitIndex]).toFixed(1);

      if (realSpeed == 0) {
        return "0.0";
      }

      return realSpeed;
    }
  }]);

  return Player;
}();

module.exports = Player;
