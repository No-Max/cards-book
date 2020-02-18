(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _default =
/*#__PURE__*/
function () {
  function _default(number, comment, brandImageUrl) {
    _classCallCheck(this, _default);

    this.id = "card".concat(number.replace(' ', ''));
    this.number = number;
    this.comment = comment;
    this.imageBrandUrl = brandImageUrl;
  }

  _createClass(_default, [{
    key: "getAsHtml",
    value: function getAsHtml() {
      var card = document.createElement('div');
      card.setAttribute('class', 'list-card');
      card.setAttribute('id', this.id);
      card.innerHTML = "<div class=\"list-card__comment\">".concat(this.comment, "</div>\n            <div class=\"list-card__number\">").concat(this.number, "</div>\n            <img src=\"").concat(this.imageBrandUrl, "\"/>");
      return card;
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CardClass = _interopRequireDefault(require("./CardClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var localStorageName = 'cards-list';

var _default =
/*#__PURE__*/
function () {
  function _default(containerSelector) {
    _classCallCheck(this, _default);

    this.cards = [];
    this.containerSelector = containerSelector;
    this.cardsToObjects();
    this.updateCardsContainer();
  }

  _createClass(_default, [{
    key: "add",
    value: function add(card) {
      if (this.isCardNumberUnicue(card.number)) {
        this.cards.push(card);
        this.updateCardsContainer();
      } else {
        console.log('err');
      }
    }
  }, {
    key: "remove",
    value: function remove(cardId) {
      this.cards = this.cards.filter(function (item) {
        return item.id == cardId;
      });
      this.updateCardsContainer();
    }
  }, {
    key: "updateCardsContainer",
    value: function updateCardsContainer() {
      var _this = this;

      this.containerSelector.innerHTML = '';
      this.cards.forEach(function (card) {
        _this.containerSelector.append(card.getAsHtml());
      });
    }
  }, {
    key: "cardsToObjects",
    value: function cardsToObjects() {
      var _this2 = this;

      var cardsArray = JSON.parse(localStorage.getItem(localStorageName));

      if (cardsArray) {
        cardsArray.forEach(function (item) {
          _this2.cards.push(new _CardClass["default"](item));
        }).bind(this);
      }
    }
  }, {
    key: "isCardNumberUnicue",
    value: function isCardNumberUnicue(cardNumber) {
      return !this.cards.find(function (card) {
        return card.number === cardNumber;
      });
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{"./CardClass":1}],3:[function(require,module,exports){
"use strict";

var _CardClass = _interopRequireDefault(require("./CardClass.js"));

var _CardListClass = _interopRequireDefault(require("./CardListClass.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cardsContainer = document.getElementById('cardsContainer');
var card = new _CardClass["default"]('22 22', 'lalal', 'images/970-250.jpg');
var card2 = new _CardClass["default"]('22 232', 'lalal', 'images/970-250.jpg');
var cardList = new _CardListClass["default"](cardsContainer);
cardList.add(card);
cardList.add(card2);
console.log(cardList);

},{"./CardClass.js":1,"./CardListClass.js":2}]},{},[3])

//# sourceMappingURL=script.js.map
