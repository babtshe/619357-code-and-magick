'use strict';
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
  }
};
