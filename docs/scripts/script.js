(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _card = _interopRequireDefault(require("../helpers/card.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    this.id = "card".concat(_card["default"].removeSpaces(number));
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
      card.innerHTML = "\n            <div class=\"list-card__comment\">".concat(this.comment, "</div>\n            <div class=\"list-card__number\">").concat(_card["default"].splitByFourNumbers(this.number), "</div>\n            <img src=\"").concat(this.brandImageUrl, "\"/>");
      button.setAttribute('type', 'button');
      button.innerText = 'Remove';
      button.onclick = buttonHandler;
      card.append(button);
      return card;
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{"../helpers/card.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Card = _interopRequireDefault(require("./Card.js"));

var _card = _interopRequireDefault(require("../helpers/card.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cardInfoApiKey = 'b09f0613ed846051bfe94c7174ab16e8';
var cardInfoApiUrl = 'https://api.cardinfo.online';
var messages = {
  cardNumberRequired: 'Card Number is required',
  cardNumberLength: 'Your card number should has 16 symbols',
  cardType: 'Your card must be only Visa or MasterCard',
  cardTypeApiRequest: 'Error in API request for card number validation',
  cardIsAlreadyExists: 'You already has card with this number',
  cardCommentLength: 'Your comment should has maximum 1024 symbols'
};

var _default =
/*#__PURE__*/
function () {
  function _default(selectors, cardModal, cardList) {
    _classCallCheck(this, _default);

    this.selectors = selectors;
    this.hasErrors = false;
    this.numberError = '';
    this.commentError = '';
    this.cardModal = cardModal;
    this.cardList = cardList;
    this.cardLogoImage = '';
    this.cardNumber = '';
    this.cardComment = '';
    this.handleCardNumberInput();
    this.handleCardCommentInput();
    this.handleCreateCardButton();
    this.handleOpenModal();
  }

  _createClass(_default, [{
    key: "cardNumberRequired",
    value: function cardNumberRequired(cb) {
      if (!this.cardNumber) {
        cb(messages.cardNumberRequired);
      } else {
        this.cardNumberLength(cb);
      }
    }
  }, {
    key: "cardNumberLength",
    value: function cardNumberLength(cb) {
      if (_card["default"].removeSpaces(this.cardNumber).length !== 16) {
        cb(messages.cardNumberLength);
      } else {
        this.cardIsAlreadyExists(cb);
      }
    }
  }, {
    key: "cardIsAlreadyExists",
    value: function cardIsAlreadyExists(cb) {
      var _this = this;

      if (!!this.cardList.cards.find(function (item) {
        return item.number === _this.cardNumber;
      })) {
        cb(messages.cardIsAlreadyExists);
      } else {
        this.cardType(cb);
      }
    }
  }, {
    key: "cardType",
    value: function cardType(cb) {
      var _this2 = this;

      var requestUrl = "".concat(cardInfoApiUrl, "?input=").concat(_card["default"].getFirstSixNumbers(this.cardNumber), "&apiKey=").concat(cardInfoApiKey);
      fetch(requestUrl).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.brandAlias === 'mastercard' || data.brandAlias === 'visa') {
          cb();
          _this2.cardLogoImage = data.brandLogoOriginalPng;
        } else {
          cb(messages.cardType);
        }
      })["catch"](function () {
        cb(messages.cardTypeApiRequest);
      });
    }
  }, {
    key: "cardCommentLength",
    value: function cardCommentLength(cb) {
      if (this.cardComment.length > 1024) {
        cb(messages.cardCommentLength);
      } else {
        cb();
      }

      ;
    }
  }, {
    key: "validateNumber",
    value: function validateNumber(cb) {
      var _this3 = this;

      this.cardNumberRequired(function (message) {
        if (message) {
          _this3.hasErrors = true;
          _this3.selectors.numberError.innerText = message;
        } else {
          _this3.hasErrors = false;
          _this3.selectors.numberError.innerText = '';
          if (cb) cb();
        }
      });
    }
  }, {
    key: "validateComment",
    value: function validateComment() {
      var _this4 = this;

      this.cardCommentLength(function (message) {
        if (message) {
          _this4.hasErrors = true;
          _this4.selectors.commentError.innerText = message;
        } else {
          _this4.hasErrors = false;
          _this4.selectors.commentError.innerText = '';
        }
      });
    }
  }, {
    key: "handleCardNumberInput",
    value: function handleCardNumberInput() {
      var _this5 = this;

      this.selectors.numberInput.onchange = function (e) {
        var number = e.target.value;
        _this5.cardNumber = number;

        _this5.validateNumber();
      };
    }
  }, {
    key: "handleCardCommentInput",
    value: function handleCardCommentInput() {
      var _this6 = this;

      this.selectors.commentInput.onchange = function (e) {
        var comment = e.target.value;
        _this6.cardComment = comment;

        _this6.validateComment();
      };
    }
  }, {
    key: "handleCreateCardButton",
    value: function handleCreateCardButton() {
      var _this7 = this;

      this.cardModal.saveButtonHandler(function () {
        _this7.validateNumber(function () {
          var card = new _Card["default"]({
            number: _this7.cardNumber,
            comment: _this7.cardComment,
            brandImageUrl: _this7.cardLogoImage
          });

          _this7.cardList.add(card);

          _this7.cardModal.hide();

          _this7.clear();
        });
      });
    }
  }, {
    key: "handleOpenModal",
    value: function handleOpenModal() {
      var _this8 = this;

      this.selectors.addCardButton.onclick = function () {
        _this8.cardModal.show();
      };
    }
  }, {
    key: "clear",
    value: function clear() {
      this.cardNumber = '';
      this.cardComment = '';
      this.cardLogoImage = '';
      this.selectors.commentInput.value = '';
      this.selectors.numberInput.value = '';
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{"../helpers/card.js":5,"./Card.js":1}],3:[function(require,module,exports){
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

var emptyContainerText = 'Your card list is empty, try add new cards using \'Add\' button above';
var localStorageName = 'cards-list';

var _default =
/*#__PURE__*/
function () {
  function _default(containerSelector, deleteConfirmModal) {
    _classCallCheck(this, _default);

    this.cards = [];
    this.containerSelector = containerSelector;
    this.deleteConfirmModal = deleteConfirmModal;
    this.cardsToObjects();
    this.updateCardsContainer();
  }

  _createClass(_default, [{
    key: "add",
    value: function add(card) {
      this.cards.push(card);
      this.updateCardsContainer();
    }
  }, {
    key: "remove",
    value: function remove(cardId) {
      this.cards = this.cards.filter(function (item) {
        return item.id !== cardId;
      });
      this.updateCardsContainer();
    }
  }, {
    key: "updateCardsContainer",
    value: function updateCardsContainer() {
      var _this = this;

      this.containerSelector.innerHTML = '';

      if (this.cards.length > 0) {
        this.cards.forEach(function (card) {
          _this.containerSelector.append(card.getAsHtml(function () {
            _this.deleteConfirmModal.show();

            _this.deleteConfirmModal.saveButtonHandler(function () {
              _this.remove(card.id);

              _this.deleteConfirmModal.hide();
            });
          }));
        });
      } else {
        this.containerSelector.innerText = emptyContainerText;
      }

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
    var _this = this;

    _classCallCheck(this, _default);

    this.modalSelector = modalSelector;
    this.closeModalSelector = modalSelector.querySelector('.close');
    this.saveModalSelector = modalSelector.querySelector('.save');
    this.closeButtonHandler(function () {
      _this.hide();
    });
  }

  _createClass(_default, [{
    key: "show",
    value: function show() {
      this.modalSelector.classList.add('active');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.modalSelector.classList.remove('active');
    }
  }, {
    key: "disableButtons",
    value: function disableButtons() {
      this.closeModalSelector.setAttribute('disabled', 'disabled');
      this.saveModalSelector.setAttribute('disabled', 'disabled');
    }
  }, {
    key: "enableButtons",
    value: function enableButtons() {
      this.closeModalSelector.removeAttribute('disabled');
      this.saveModalSelector.removeAttribute('disabled');
    }
  }, {
    key: "closeButtonHandler",
    value: function closeButtonHandler(cb) {
      this.closeModalSelector.onclick = cb;
    }
  }, {
    key: "saveButtonHandler",
    value: function saveButtonHandler(cb) {
      this.saveModalSelector.onclick = cb;
    }
  }]);

  return _default;
}();

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  splitByFourNumbers: function splitByFourNumbers(number) {
    return "".concat(number.slice(0, 4), " ").concat(number.slice(4, 8), " ").concat(number.slice(8, 12), " ").concat(number.slice(12, 16));
  },
  getFirstSixNumbers: function getFirstSixNumbers(number) {
    return number.replace(/\s/g, "").slice(0, 6);
  },
  removeSpaces: function removeSpaces(number) {
    return number.replace(/\s/g, "");
  }
};
exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

var _CardList = _interopRequireDefault(require("./classes/CardList.js"));

var _CardForm = _interopRequireDefault(require("./classes/CardForm.js"));

var _Modal = _interopRequireDefault(require("./classes/Modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cardModal = new _Modal["default"](document.getElementById('cardModal'));
var deleteConfirmModal = new _Modal["default"](document.getElementById('deleteConfirmModal'));
var cardList = new _CardList["default"](document.getElementById('cardsContainer'), deleteConfirmModal);
new _CardForm["default"]({
  numberInput: document.querySelector('.card-number'),
  numberError: document.querySelector('.card-number-error'),
  commentInput: document.querySelector('.card-comment'),
  commentError: document.querySelector('.card-comment-error'),
  addCardButton: document.getElementById('addCard')
}, cardModal, cardList);

},{"./classes/CardForm.js":2,"./classes/CardList.js":3,"./classes/Modal.js":4}]},{},[6])

//# sourceMappingURL=script.js.map
