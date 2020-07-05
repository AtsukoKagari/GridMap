"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  var t = {};function i(s) {
    if (t[s]) return t[s].exports;var a = t[s] = { i: s, l: !1, exports: {} };return e[s].call(a.exports, a, a.exports, i), a.l = !0, a.exports;
  }i.m = e, i.c = t, i.d = function (e, t, s) {
    i.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
  }, i.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, i.t = function (e, t) {
    if (1 & t && (e = i(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var s = Object.create(null);if (i.r(s), Object.defineProperty(s, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var a in e) {
      i.d(s, a, function (t) {
        return e[t];
      }.bind(null, a));
    }return s;
  }, i.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return i.d(t, "a", t), t;
  }, i.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, i.p = "", i(i.s = 0);
}([function (e, t, i) {
  "use strict";
  i.r(t), i.d(t, "init", function () {
    return X;
  }), i.d(t, "GridMap", function () {
    return E;
  });var s = { FullScreen: !0, Drag: !0, Scale: !0, boxColor: "#FFFF99", collision: !0, needGrid: !1, GridSize: 200 };var a = { options: s, setOptions: function setOptions(e) {
      for (var _t in e) {
        s[_t] = e[_t];
      }
    } };var n = Symbol("mapinfo");
  var l = function () {
    function l(e) {
      _classCallCheck(this, l);

      this[n] = [], null != e && addMapInfo(e);
    }

    _createClass(l, [{
      key: "addMapInfo",
      value: function addMapInfo(e) {
        for (var _t2 = 0; _t2 < e.length; _t2++) {
          var _i = {};for (var _s in e[_t2]) {
            if ("position" != _s.toLowerCase()) {
              if ("size" != _s.toLowerCase()) _i[_s] = e[_t2][_s];else {
                var _a = e[_t2][_s].split(",");if (2 != _a.length) {
                  console.warn("[Warning]Map size has invalid,must be only 2 dimension");continue;
                }_i.sizeX = _a[0], _i.sizeY = _a[1];
              }
            } else {
              var _a2 = e[_t2][_s].split(",");if (2 != _a2.length) {
                console.warn("[Warning]Map position has invalid,must be only 2 dimension");continue;
              }_i.x = _a2[0], _i.y = _a2[1];
            }
          }_i.x && _i.y && _i.sizeX && _i.sizeY ? this[n].push(_i) : console.warn("[Warning]Each map info must has position and size.");
        }
      }
    }, {
      key: "removeMapInfo",
      value: function removeMapInfo(e) {
        for (var _t3 = this[n].length - 1; _t3 >= 0; _t3++) {
          this[n][_t3].id == e && this[n].splice(_t3, 1);
        }
      }
    }, {
      key: "removeAll",
      value: function removeAll() {
        this[n] = [];
      }
    }, {
      key: "getMapInfo",
      value: function getMapInfo() {
        return this[n];
      }
    }]);

    return l;
  }();

  var o = a.options;
  var r = function () {
    function r(e) {
      _classCallCheck(this, r);

      null != e && e.constructor == HTMLDivElement ? (this.div = e, this.GridMap_Canvas = document.createElement("canvas"), e.appendChild(this.GridMap_Canvas), this.GridMap_Canvas.width = e.offsetWidth, this.GridMap_Canvas.height = e.offsetHeight, this.GridMap_Canvas.id = "GridMap_Canvas", this.GridMap_Canvas_Full_Div = null, this.GridMap_Canvas_Full = null, o.FullScreen && this.addFullScreen(), this.showCanvas = this.GridMap_Canvas) : console.error("[error]The passed object is not a div element");
    }

    _createClass(r, [{
      key: "addFullScreen",
      value: function addFullScreen() {
        this.GridMap_Canvas_Full_Div = document.createElement("div"), this.GridMap_Canvas_Full_Div.width = document.body.offsetWidth, this.GridMap_Canvas_Full_Div.height = document.body.offsetHeight, this.GridMap_Canvas_Full_Div.id = "GridMap_Canvas_Full_Div", this.GridMap_Canvas_Full_Div.style.position = "absolute", this.GridMap_Canvas_Full_Div.style["z-index"] = 999, this.GridMap_Canvas_Full_Div.style.backgroundColor = "white", this.GridMap_Canvas_Full_Div.style.display = "none", this.GridMap_Canvas_Full_Div.style.left = 0, this.GridMap_Canvas_Full_Div.style.top = 0, document.body.appendChild(this.GridMap_Canvas_Full_Div), this.GridMap_Canvas_Full = document.createElement("canvas"), this.GridMap_Canvas_Full.width = this.GridMap_Canvas_Full_Div.width, this.GridMap_Canvas_Full.height = this.GridMap_Canvas_Full_Div.height, this.GridMap_Canvas_Full.id = "GridMap_Canvas_Full", this.GridMap_Canvas_Full_Div.appendChild(this.GridMap_Canvas_Full);
      }
    }, {
      key: "removeFullScreen",
      value: function removeFullScreen() {
        this.GridMap_Canvas_Full.remove(), this.GridMap_Canvas_Full_Div.remove();
      }
    }]);

    return r;
  }();

  var h = Symbol("x"),
      d = Symbol("y"),
      c = Symbol("scale"),
      u = Symbol("drag"),
      p = Symbol("focus"),
      f = Symbol("minscale"),
      v = Symbol("maxscale"),
      g = Symbol("scaleRate");
  var m = function () {
    function m() {
      _classCallCheck(this, m);

      this[h] = 0, this[d] = 0, this[c] = 2, this[u] = !0, this[p] = null, this[f] = .5, this[v] = 5, this[g] = .2;
    }

    _createClass(m, [{
      key: "setPos",
      value: function setPos(e, t) {
        null != e && null != t ? (this[h] = parseFloat(e), this[d] = parseFloat(t)) : console.error("[error]to set Position must has x and y.");
      }
    }, {
      key: "getPos",
      value: function getPos() {
        return [this[h], this[d]];
      }
    }, {
      key: "setPosX",
      value: function setPosX(e) {
        this[h] = parseFloat(e);
      }
    }, {
      key: "setPosY",
      value: function setPosY(e) {
        this[d] = parseFloat(e);
      }
    }, {
      key: "addPosX",
      value: function addPosX(e) {
        this[h] = this[h] + parseFloat(e);
      }
    }, {
      key: "addPosY",
      value: function addPosY(e) {
        this[d] = this[d] + parseFloat(e);
      }
    }, {
      key: "setScale",
      value: function setScale(e) {
        this[c] = e;
      }
    }, {
      key: "getScale",
      value: function getScale() {
        return this[c];
      }
    }, {
      key: "addScale",
      value: function addScale(e) {
        this[c] = null == e ? this[c] + this[g] > this[v] ? this[v] : this[c] + this[g] : this[c] + parseFloat(e) > this[v] ? this[v] : this[c] + parseFloat(e);
      }
    }, {
      key: "minusScale",
      value: function minusScale(e) {
        this[c] = null == e ? this[c] - this[g] < this[f] ? this[f] : this[c] - this[g] : this[c] - parseFloat(e) < this[f] ? this[f] : this[c] - parseFloat(e);
      }
    }, {
      key: "setFocus",
      value: function setFocus(e) {
        this[p] = e;
      }
    }, {
      key: "getFocus",
      value: function getFocus() {
        return this[p];
      }
    }, {
      key: "setMinScale",
      value: function setMinScale(e) {
        this[f] = parseFloat(e);
      }
    }, {
      key: "getMinScale",
      value: function getMinScale() {
        return this[f];
      }
    }, {
      key: "addMinScale",
      value: function addMinScale(e) {
        this[f] = this[f] + parseFloat(e);
      }
    }, {
      key: "setMaxScale",
      value: function setMaxScale(e) {
        this[v] = parseFloat(e);
      }
    }, {
      key: "getMaxScale",
      value: function getMaxScale() {
        return this[v];
      }
    }, {
      key: "addMaxScale",
      value: function addMaxScale(e) {
        this[v] = this[v] + parseFloat(e);
      }
    }, {
      key: "setScaleRate",
      value: function setScaleRate(e) {
        this[g] = parseFloat(e);
      }
    }, {
      key: "getScaleRate",
      value: function getScaleRate() {
        return this[g];
      }
    }, {
      key: "addScaleRate",
      value: function addScaleRate(e) {
        this[g] = this[g] + parseFloat(e);
      }
    }]);

    return m;
  }();

  var _ = a.options,
      C = !0;function M(e, t, i, s, a) {
    var n = document.createElement("canvas"),
        l = n.getContext("2d");n.width = e.width, n.height = e.height;var o = t - Math.floor(e.width / 2) * s,
        r = o + e.width * s,
        h = i - Math.floor(e.height / 2) * s,
        d = h + e.height * s,
        c = [];for (var _n = 0; _n < a.length; _n++) {
      var _l = {},
          _u = parseInt(a[_n].x),
          _p = parseInt(_u) + parseInt(a[_n].sizeX),
          _f = parseInt(a[_n].y),
          _v = parseInt(a[_n].y) + parseInt(a[_n].sizeY);if (null == a[_n].image) {
        if (o < _u && r > _u && h < _f && d > _f) _l.x = (_u - t) / s + e.width / 2, _l.y = (_f - i) / s + e.height / 2, _l.sizeX = r > _p ? parseInt(a[_n].sizeX) / s : (r - _u) / s, _l.sizeY = d > _v ? parseInt(a[_n].sizeY) / s : (d - _f) / s;else if (o < _u && r > _u && h < _v && d > _v) _l.x = (_u - t) / s + e.width / 2, _l.y = 0, _l.sizeY = (_v - h) / s, _l.sizeX = r > _p ? parseInt(a[_n].sizeX) / s : (r - _u) / s;else if (o < _p && r > _p && h < _f && d > _f) _l.x = 0, _l.y = (_f - i) / s + e.height / 2, _l.sizeX = (_p - o) / s, _l.sizeY = d > _v ? parseInt(a[_n].sizeY) / s : (d - _f) / s;else {
          if (!(o < _p && r > _p && h < _v && d > _v)) continue;_l.x = 0, _l.y = 0, _l.sizeX = (_p - o) / s, _l.sizeY = (_v - h) / s;
        }for (var _e in a[_n]) {
          "x" != _e && "y" != _e && "sizeX" != _e && "sizeY" != _e && (_l[_e] = a[_n][_e]);
        }c.push(_l);
      } else {
        _l.x = (_u - t) / s + e.width / 2, _l.y = (_f - i) / s + e.height / 2, _l.sizeX = parseInt(a[_n].sizeX) / s, _l.sizeY = parseInt(a[_n].sizeY) / s;for (var _e2 in a[_n]) {
          "x" != _e2 && "y" != _e2 && "sizeX" != _e2 && "sizeY" != _e2 && (_l[_e2] = a[_n][_e2]);
        }c.push(_l);
      }
    }if (_.needGrid) {
      var _a3 = _.GridSize,
          _n2 = e.width / 2 - t / s,
          _o = e.height / 2 - i / s;for (; _n2 > 0;) {
        _n2 -= _a3 / s;
      }for (; _o > 0;) {
        _o -= _a3 / s;
      }for (l.setLineDash([5, 10]); _o < e.height; _o += _a3 / s) {
        l.beginPath(), l.moveTo(0, _o), l.lineTo(e.width, _o), l.stroke();
      }for (; _n2 < e.width; _n2 += _a3 / s) {
        l.beginPath(), l.moveTo(_n2, 0), l.lineTo(_n2, e.height), l.stroke();
      }
    }var u = [];c.forEach(function (e) {
      if (null != e.image) u.push(e), 0 == e.collision && (e.image.filter = "alpha(opacity=40);"), 1 == C ? e.image.onload = function () {
        l.drawImage(e.image, e.x, e.y, e.sizeX, e.sizeY);
      } : l.drawImage(e.image, e.x, e.y, e.sizeX, e.sizeY);else {
        if (null != e.color) {
          if (l.fillStyle = e.color, 0 == e.collision) {
            var _t4 = ColorToRGBA(e.color);l.fillStyle = "rgba(" + _t4.join(",") + ",0.4)";
          } else l.fillStyle = e.color;
        } else if (0 == e.collision) {
          var _e3 = ColorToRGBA(_.boxColor);l.fillStyle = "rgba(" + _e3.join(",") + ",0.4)";
        } else l.fillStyle = _.boxColor;l.fillRect(e.x, e.y, e.sizeX, e.sizeY);
      }
    });var p = e.getContext("2d");if (p.clearRect(0, 0, e.width, e.height), 1 == C) {
      C = !1;var f = setInterval(function () {
        var e = !0;for (var _t5 = 0; _t5 < u.length; _t5++) {
          if (0 == u[_t5].complete) {
            e = !1;break;
          }
        }1 == e && (p.drawImage(n, 0, 0), clearInterval(f));
      }, 200);
    } else p.drawImage(n, 0, 0);return !0;
  }function w(e, t, i) {
    var s = i.getBoundingClientRect();return { x: e - s.left - (s.width - i.width) / 2, y: t - s.top - (s.height - i.height) / 2 };
  }var F = null,
      G = null;var y = { RegisterGragEvent: function RegisterGragEvent(e, t, i, s) {
      var a = !1,
          n = 0,
          l = 0;document.onmousedown = function (t) {
        var i = w(t.clientX, t.clientY, e.showCanvas);i.x > 0 && i.x < e.showCanvas.width && i.y > 0 && i.y < e.showCanvas.height && (a = !0, n = i.x, l = i.y);
      }, document.onmousemove = function (o) {
        if (a) {
          var _a4 = w(o.clientX, o.clientY, e.showCanvas);t.addPosX(-(_a4.x - n)), t.addPosY(-(_a4.y - l));var _r = t.getPos();M(e.showCanvas, _r[0], _r[1], t.getScale(), i.getMapInfo().concat(s.getItemsInfo())), n = _a4.x, l = _a4.y;
        }
      }, document.onmouseup = function (e) {
        a = !1, n = 0, l = 0;
      };
    }, UnRegisterGragEvent: function UnRegisterGragEvent() {
      document.onmousedown = null, document.onmousemove = null, document.onmouseup = null;
    }, RegisterScaleEvent: function RegisterScaleEvent(e, t, i, s) {
      e.onmousewheel = e.onwheel = function (a) {
        a.wheelDelta > 0 ? t.minusScale() : t.addScale();var n = t.getPos();M(e, n[0], n[1], t.getScale(), i.getMapInfo().concat(s.getItemsInfo()));
      };
    }, UnRegisterScaleEvent: function UnRegisterScaleEvent(e) {
      e.onmousewheel = e.onwheel = null;
    }, RegisterFullScreenShow: function RegisterFullScreenShow(e, t, i, s) {
      F = function F() {
        !function (e, t, i, s) {
          var a = e.GridMap_Canvas.getContext("2d"),
              n = e.GridMap_Canvas_Full.getContext("2d");a.clearRect(0, 0, e.GridMap_Canvas.width, e.GridMap_Canvas.height), n.clearRect(0, 0, e.GridMap_Canvas_Full.width, e.GridMap_Canvas_Full.height), e.showCanvas = e.GridMap_Canvas;var l = t.getPos();M(e.GridMap_Canvas, l[0], l[1], t.getScale(), i.getMapInfo().concat(s.getItemsInfo())), e.GridMap_Canvas_Full_Div.style.display = "none";
        }(e, t, i, s);
      }, e.GridMap_Canvas_Full.addEventListener("dblclick", F, !1), G = function G() {
        !function (e, t, i, s) {
          var a = e.GridMap_Canvas.getContext("2d"),
              n = e.GridMap_Canvas_Full.getContext("2d");a.clearRect(0, 0, e.GridMap_Canvas.width, e.GridMap_Canvas.height), n.clearRect(0, 0, e.GridMap_Canvas_Full.width, e.GridMap_Canvas_Full.height), e.showCanvas = e.GridMap_Canvas_Full;var l = t.getPos();M(e.GridMap_Canvas_Full, l[0], l[1], t.getScale(), i.getMapInfo().concat(s.getItemsInfo())), GridMap_Canvas_Full_Div.style.display = "";
        }(e, t, i, s);
      }, e.GridMap_Canvas.addEventListener("dblclick", G, !1);
    }, UnRegisterFullScreenShow: function UnRegisterFullScreenShow(e) {
      e.GridMap_Canvas.removeEventListener("dbclick", G), e.GridMap_Canvas_Full.removeEventListener("dblclick", F);
    } };var S = a.options;
  var I = function () {
    function I(e, t, i, s) {
      _classCallCheck(this, I);

      this.gridClass = e, this.camera = t, this.map = i, this.item = s, S.FullScreen && y.RegisterFullScreenShow(this.gridClass, this.camera, this.map, this.item), S.Drag && y.RegisterGragEvent(this.gridClass, this.camera, this.map, this.item), S.Scale && (y.RegisterScaleEvent(this.gridClass.GridMap_Canvas, this.camera, this.map, this.item), y.RegisterScaleEvent(this.gridClass.GridMap_Canvas_Full, this.camera, this.map, this.item)), function (e, t, i, s) {
        window.onresize = function () {
          e.GridMap_Canvas.width = e.div.offsetWidth, e.GridMap_Canvas.height = e.div.offsetHeight, e.GridMap_Canvas_Full.width = window.document.body.offsetWidth, e.GridMap_Canvas_Full.height = window.document.body.offsetHeight;var a = t.getPos();M(e.showCanvas, a[0], a[1], t.getScale(), i.getMapInfo().concat(s.getItemsInfo()));
        };
      }(e, t, i, s);
    }

    _createClass(I, [{
      key: "UnRegisterFullScreen",
      value: function UnRegisterFullScreen() {
        S.FullScreen = !1, y.UnRegisterFullScreenShow(this.gridClass);
      }
    }, {
      key: "UnRegisterDrag",
      value: function UnRegisterDrag() {
        S.Drag = !1, y.UnRegisterGragEvent();
      }
    }, {
      key: "UnRegisterScale",
      value: function UnRegisterScale() {
        S.Scale = !1, y.UnRegisterScaleEvent(this.gridClass.GridMap_Canvas), y.UnRegisterScaleEvent(this.gridClass.GridMap_Canvas_Full);
      }
    }]);

    return I;
  }();

  var b = Symbol("itemInfo");
  var z = function () {
    function z(e) {
      _classCallCheck(this, z);

      this[b] = [], null != e && addItemInfo(e);
    }

    _createClass(z, [{
      key: "addItemInfo",
      value: function addItemInfo(e) {
        var _this = this;

        e.forEach(function (e) {
          var t = !0;if (e.hasOwnProperty("id")) {
            for (var _i2 = 0; _i2 < _this[b].length; _i2++) {
              if (_this[b][_i2].id == e.id) {
                console.error("[error]Item id must be unique."), t = !1;break;
              }
            }
          } else console.error("[warning]You need a item id."), e.id = function () {
            var e = new Date().getTime();return ((1 + Math.random()) * e | 0).toString(16);
          }();if (!t) return;var i = {};for (var _t6 in e) {
            if ("position" != _t6.toLowerCase()) {
              if ("size" != _t6.toLowerCase()) i[_t6] = e[_t6];else {
                var _s2 = e[_t6].split(",");if (2 != _s2.length) {
                  console.warn("[Warning]Map size has invalid,must be only 2 dimension");continue;
                }i.sizeX = _s2[0], i.sizeY = _s2[1];
              }
            } else {
              var _s3 = e[_t6].split(",");if (2 != _s3.length) {
                console.warn("[Warning]Map position has invalid,must be only 2 dimension");continue;
              }i.x = _s3[0], i.y = _s3[1];
            }
          }i.x && i.y && i.sizeX && i.sizeY ? (e.hasOwnProperty("collision") || (e.collision = !0), _this[b].push(i)) : console.error("[Error]Each item info must has position and size.");
        });
      }
    }, {
      key: "removeItem",
      value: function removeItem(e) {
        for (var _t7 = this[b].length - 1; _t7 >= 0; _t7++) {
          if (this[b][_t7].id == e) {
            this[b].splice(_t7, 1);break;
          }
        }
      }
    }, {
      key: "getItemsInfo",
      value: function getItemsInfo() {
        return this[b];
      }
    }, {
      key: "getItem",
      value: function getItem(e) {
        for (var _t8 = this[b].length - 1; _t8 >= 0; _t8++) {
          if (this[b][_t8].id == e) return this[b][_t8];
        }
      }
    }]);

    return z;
  }();

  var x = a.options;function R(e, t, i, s, a) {
    var n = 0,
        l = !1,
        o = null,
        r = s.Item.getItemsInfo();for (n = 0; n < r.length; n++) {
      if (r[n].id == e) {
        o = r[n];break;
      }
    }null != o ? (a && (t = o.x - t, i = o.y - i), x.collision && (l = function (e, t, i, s) {
      var a = !0;for (var _n3 = 0; _n3 < t.length; _n3++) {
        if (t[_n3].id != e.id && t[_n3].collision && 0 != t[_n3].collision) {
          var _l2 = t[_n3],
              _o2 = Math.abs((2 * parseFloat(i) + parseFloat(e.sizeX)) / 2 - (2 * parseFloat(_l2.x) + parseFloat(_l2.sizeX)) / 2),
              _r2 = Math.abs((2 * parseFloat(s) + parseFloat(e.sizeY)) / 2 - (2 * parseFloat(_l2.y) + parseFloat(_l2.sizeY)) / 2);if (_o2 <= (parseFloat(e.sizeX) + parseFloat(_l2.sizeX)) / 2 && _r2 <= (parseFloat(e.sizeY) + parseFloat(_l2.sizeY)) / 2) {
            a = !1;break;
          }
        }
      }return a;
    }(o, s.Map.getMapInfo().concat(s.Item.getItemsInfo()), t, i)), l && (r[n].x = t, r[n].y = i, s.Camera.getFocus() == e && s.Camera.setPos(t, i), s.refresh())) : console.error("[error]could not found item which id=" + e);
  }
  var Y = function Y(e) {
    _classCallCheck(this, Y);

    this.controller = e, this.moveItem = function (e, t, i, s) {
      R(e, t, i, this.controller, s);
    };
  };

  var D = function () {
    function D(e, t) {
      _classCallCheck(this, D);

      a.setOptions(t), this.gridClass = new r(e), this.Map = new l(), this.Item = new z(), this.Camera = new m(), this.Ext = new Y(this), this.ListenerController = new I(this.gridClass, this.Camera, this.Map, this.Item);
    }

    _createClass(D, [{
      key: "addMap",
      value: function addMap(e) {
        this.Map.addMapInfo(e);
      }
    }, {
      key: "removeMap",
      value: function removeMap(e) {
        null == e ? this.Map.removeAll() : this.Map.removeMapInfo(e);
      }
    }, {
      key: "addItems",
      value: function addItems(e) {
        this.Item.addItemInfo(e);
      }
    }, {
      key: "removeItem",
      value: function removeItem(e) {
        this.Item.removeItem(e);
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var e = this.Camera.getPos();M(this.gridClass.showCanvas, e[0], e[1], this.Camera.getScale(), this.Map.getMapInfo().concat(this.Item.getItemsInfo()));
      }
    }, {
      key: "showGrid",
      value: function showGrid(e) {
        null != e ? a.setOptions({ needGrid: !0, GirdSize: e }) : a.setOptions({ needGrid: !0 });
      }
    }, {
      key: "hiddenGrid",
      value: function hiddenGrid() {
        a.setOptions({ needGrid: !1 });
      }
    }]);

    return D;
  }();

  function X(e, t) {
    return new D(e, t);
  }var E = new Object();E.init = X, window.GridMap = E, "undefined" != typeof window && window.Vue && window.Vue.component("segredo-gridmap", E);
}]);
