'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      loadData(onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      saveData(data, onLoad, onError);
    }
  };

  var STATUS_OK = 200;

  function loadData(onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Соединиться не получилось.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответ сервера не получен за ' + (xhr.timeout / 1000) + 'сек.');
    });

    xhr.timeout = 5000;
    xhr.open('GET', URL);
    xhr.send();
  }

  function saveData(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError('Всё сломалось: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Отправить не получилось.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответ сервера не получен за ' + (xhr.timeout / 1000) + 'секунд.');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  }
})();
