'use strict';
var DEBOUNCE_DEFAULT = 500;
window.library = {
  getRandomValue: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  getRandomName: function (names, surnames) {
    function getRandomByParam(arr, param) {
      var index = Math.floor(Math.random() * (arr[param].length + arr.neutral.length));
      var name = (index >= arr[param].length) ? arr.neutral[index - arr[param].length] : arr[param][index];
      return name;
    }

    return Math.round(Math.random())
      ? getRandomByParam(names, 'male') + ' ' + getRandomByParam(surnames, 'male')
      : getRandomByParam(names, 'female') + ' ' + getRandomByParam(surnames, 'female');
  },

  changeColor: function (arr, field, item) {
    var currentColor = field.value;
    if (arr.indexOf(currentColor) === arr.length - 1) {
      field.value = arr[0];
    } else {
      field.value = arr[arr.indexOf(currentColor) + 1];
    }
    if (item.tagName === 'DIV') {
      item.style.backgroundColor = field.value;
    } else {
      item.style.fill = field.value;
    }
  },

  debounce: function (func, delay) {
    var lastTimeout = null;
    if (delay === undefined) {
      delay = DEBOUNCE_DEFAULT;
    }

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        func.apply(null, args);
      }, delay);
    };
  },

  errorHandler: function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }
};
