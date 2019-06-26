"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

require("./ConsentsSummary.css");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _reactstrap = require("reactstrap");

var _consentViewer = require("@datafund/consent-viewer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConsentsSummary =
/*#__PURE__*/
function (_Component) {
  _inherits(ConsentsSummary, _Component);

  function ConsentsSummary(props) {
    var _this2;

    _classCallCheck(this, ConsentsSummary);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ConsentsSummary).call(this, props));
    _this2.state = {
      data: _this2.props.data ? _this2.props.data : {},
      consentData: {},
      tokenModalVisible: false
    };
    console.log(_this2.props);
    console.log(props);
    _this2.decodeJwt = _this2.decodeJwt.bind(_assertThisInitialized(_this2));
    _this2.renderConsents = _this2.renderConsents.bind(_assertThisInitialized(_this2));
    _this2.showDetailsModal = _this2.showDetailsModal.bind(_assertThisInitialized(_this2));
    _this2.toggleTokenModal = _this2.toggleTokenModal.bind(_assertThisInitialized(_this2));
    _this2.renderPiiControllers = _this2.renderPiiControllers.bind(_assertThisInitialized(_this2));
    _this2.renderPurposes = _this2.renderPurposes.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(ConsentsSummary, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps, nextContext) {
      this.setState({
        data: nextProps.data
      });
    }
  }, {
    key: "renderConsents",
    value: function renderConsents() {
      var _this = this;

      var consents = [];

      var _loop = function _loop(k) {
        var item = _this.state.data[k];

        var decodedItem = _this.decodeJwt(item);

        console.log(decodedItem);
        consents.push(_react.default.createElement("tr", {
          key: k
        }, _react.default.createElement("td", null, decodedItem.payload.sub), _react.default.createElement("td", null, _this.renderPiiControllers(decodedItem.payload.piiControllers).toString()), _react.default.createElement("td", null, _this.renderPurposes(decodedItem.payload.services).toString()), _react.default.createElement("td", null, (0, _moment.default)(new Date(decodedItem.payload.exp * 1000)).format('MM. DD. YYYY, HH:mm ')), _react.default.createElement("td", null, decodedItem.payload.consentReceiptID), _react.default.createElement("td", null, _react.default.createElement("a", {
          className: "btn btn-sm btn-secondary text-white",
          onClick: function onClick(e) {
            _this.showDetailsModal(decodedItem);
          }
        }, "Details"))));
      };

      for (var k = 0; k < _this.state.data.length; k++) {
        _loop(k);
      }

      ;
      return consents;
    }
  }, {
    key: "renderPiiControllers",
    value: function renderPiiControllers(piiControllers) {
      var piiControllersNames = [];

      _lodash.default.each(piiControllers, function (val) {
        piiControllersNames.push(val.piiController);
      });

      return piiControllersNames;
    }
  }, {
    key: "renderPurposes",
    value: function renderPurposes(services) {
      var purposes = [];

      _lodash.default.each(services, function (val) {
        _lodash.default.each(val.purposes, function (val2) {
          purposes.push(val2.purpose);
        });
      });

      return purposes;
    }
  }, {
    key: "showDetailsModal",
    value: function showDetailsModal(token) {
      var _this = this;

      _this.setState({
        consentData: token
      });

      _this.toggleTokenModal();

      console.log(token);
    }
  }, {
    key: "decodeJwt",
    value: function decodeJwt(token) {
      var decodedToken = _jsonwebtoken.default.decode(token, {
        complete: true
      });

      return decodedToken;
    }
  }, {
    key: "toggleTokenModal",
    value: function toggleTokenModal() {
      var _this = this;

      _this.setState({
        tokenModalVisible: !_this.state.tokenModalVisible
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return _react.default.createElement("div", null, !_lodash.default.isEmpty(this.state.data) && _react.default.createElement("div", {
        className: "mt-5 table-responsive"
      }, _react.default.createElement("table", {
        className: "table"
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", null, "Name"), _react.default.createElement("th", null, "PII Controller"), _react.default.createElement("th", null, "Purpose"), _react.default.createElement("th", null, "Expiry Date"), _react.default.createElement("th", null, "ID token"), _react.default.createElement("th", null, "Actions"))), _react.default.createElement("tbody", null, _this.renderConsents()))), _lodash.default.isEmpty(this.state.data) && _react.default.createElement("div", {
        className: "mt-5"
      }, _react.default.createElement("em", null, "Cosent Summary data not available.")), _react.default.createElement(_reactstrap.Modal, {
        isOpen: _this.state.tokenModalVisible,
        toggle: this.toggleTokenModal,
        backdrop: "static"
      }, _react.default.createElement(_reactstrap.ModalHeader, {
        toggle: this.toggleTokenModal
      }, "Consent"), _react.default.createElement(_reactstrap.ModalBody, null, _react.default.createElement(_consentViewer.ConsentViewer, {
        type: "text",
        data: _this.state.consentData
      })), _react.default.createElement(_reactstrap.ModalFooter, null, _react.default.createElement(_reactstrap.Button, {
        color: "secondary",
        onClick: this.toggleTokenModal
      }, "Close"))));
    }
  }]);

  return ConsentsSummary;
}(_react.Component);

var _default = ConsentsSummary;
exports.default = _default;