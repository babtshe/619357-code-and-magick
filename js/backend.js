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

  function loadData(onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Всё сломалось: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Соединиться не получилось.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Ответ сервера не получен за ' + (xhr.timeout / 1000) + 'секунд.');
    });

    xhr.open('GET', URL);
    xhr.send();
  }

  function saveData(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/code-and-magick1';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
