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
  function _default(_ref) {
    var number = _ref.number,
        comment = _ref.comment,
        brandImageUrl = _ref.brandImageUrl;

    _classCallCheck(this, _default);

    this.id = "card".concat(number.replace(' ', ''));
    this.number = number;
    this.comment = comment;
    this.brandImageUrl = brandImageUrl;
  }

  _createClass(_default, [{
    key: "getAsHtml",
    value: function getAsHtml(buttonHandler) {
      var card = document.createElement('div');
      var button = document.createElement('button');
      card.setAttribute('class', 'list-card');
      card.setAttribute('id', this.id);
      card.innerHTML = "<div class=\"list-card__comment\">".concat(this.comment, "</div>\n            <div class=\"list-card__number\">").concat(this.number, "</div>\n            <img src=\"").concat(this.brandImageUrl, "\"/>");
      button.setAttribute('type', 'button');
      button.innerText = 'Remove';
      button.onclick = buttonHandler;
      card.append(button);
      return card;
    }
  }, {
    key: "removeButton",
    value: function removeButton() {}
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cardInfoApiKey = 'b09f0613ed846051bfe94c7174ab16e8';
var cardInfoApiUrl = 'https://api.cardinfo.online';
var messages = {
  cardNumberLength: 'Your card number should has 16 symbols',
  cardNumberRequired: 'Card Number is required',
  cardType: 'Your card must be only Visa or MasterCard',
  cardCommentLength: 'Your comment should has maximum 1024 symbols',
  cardIsalreadyExists: 'You are already has card with this number',
  cardTypeRequestError: 'Card info request error'
};

var _default =
/*#__PURE__*/
function () {
  function _default(formSelector, modal) {
    _classCallCheck(this, _default);

    this.formSelector = formSelector;
    this.isPending = false;
    this.hasErrors = false;
    this.currentError = '';
    this.modal = modal;
  }

  _createClass(_default, [{
    key: "cardNumberLength",
    value: function cardNumberLength(cardNumber) {
      if (cardNumber.length !== 16) {
        this.currentError = messages.cardNumberLength;
        this.hasErrors = true;
      } else {
        this.currentError = '';
        this.hasErrors = false;
      }
    }
  }, {
    key: "cardNumberRequired",
    value: function cardNumberRequired(cardNumber) {
      if (cardNumber) {
        this.currentError = messages.cardNumberRequired;
        this.hasErrors = true;
      } else {
        this.currentError = '';
        this.hasErrors = false;
      }
    }
  }, {
    key: "cardType",
    value: function cardType(cardNumber) {
      var _this = this;

      var firstSixCardNumbers = cardNumber.slice(0, 6);
      var requestUrl = "".concat(cardInfoApiUrl, "?input=").concat(firstSixCardNumbers, "&apiKey=").concat(cardInfoApiKey);
      this.isPending = true;
      fetch(requestUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        console.log(data);
        _this.isPending = false;
      })["catch"](function (error) {
        console.error(error);
        _this.isPending = false;
      });
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Card = _interopRequireDefault(require("./Card"));

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
      console.log(cardId);
      console.log(this.cards);
      this.cards = this.cards.filter(function (item) {
        return item.id === cardId;
      });
      this.updateCardsContainer();
      console.log(this.cards);
    }
  }, {
    key: "updateCardsContainer",
    value: function updateCardsContainer() {
      var _this = this;

      this.containerSelector.innerHTML = '';
      this.cards.forEach(function (card) {
        _this.containerSelector.append(card.getAsHtml(function () {
          _this.remove(card.id);
        }));
      });
      localStorage.setItem(localStorageName, JSON.stringify(this.cards));
    }
  }, {
    key: "cardsToObjects",
    value: function cardsToObjects() {
      var _this2 = this;

      var cardsArray = JSON.parse(localStorage.getItem(localStorageName));

      if (cardsArray) {
        cardsArray.forEach(function (item) {
          _this2.cards.push(new _Card["default"](item));
        });
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

},{"./Card":1}],4:[function(require,module,exports){
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
  function _default(modalSelector) {
    _classCallCheck(this, _default);

    this.modalSelector = modalSelector;
    this.showModal();
    this.closeModalSelector = modalSelector.querySelector('.close');
    this.addCloseButtonHandler();
  }

  _createClass(_default, [{
    key: "showModal",
    value: function showModal() {
      this.modalSelector.classList.add('active');
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.modalSelector.classList.remove('active');
    }
  }, {
    key: "addCloseButtonHandler",
    value: function addCloseButtonHandler() {
      var _this = this;

      this.closeModalSelector.onclick = function () {
        _this.hideModal();
      };
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

var _CardList = _interopRequireDefault(require("./classes/CardList.js"));

var _CardForm = _interopRequireDefault(require("./classes/CardForm.js"));

var _Modal = _interopRequireDefault(require("./classes/Modal.js"));

var _Card = _interopRequireDefault(require("./classes/Card"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cardsContainerSelector = document.getElementById('cardsContainer');
var cardFormSelector = document.getElementById('cardForm');
var cardFormModalSelector = document.getElementById('cardFormModal');
var cardFormModal = new _Modal["default"](cardFormModalSelector);
var card = new _Card["default"]({
  number: '4323 2314 3145 2155',
  comment: 'test',
  brandImageUrl: 'images/970-250.jpg'
});
var cardList = new _CardList["default"](cardsContainerSelector); //cardList.add(card);

var cardForm = new _CardForm["default"](cardFormSelector);

},{"./classes/Card":1,"./classes/CardForm.js":2,"./classes/CardList.js":3,"./classes/Modal.js":4}]},{},[5])

//# sourceMappingURL=script.js.map
