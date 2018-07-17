'use strict';
(function () {
  var setupBlock = document.querySelector('.setup');
  var userPicBlock = setupBlock.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.dialog = {
    hide: function () {
      hideSetup();
    }
  };

  (function addSetupListeners() {
    setupOpen.addEventListener('click', function () {
      showSetup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showSetup();
      }
    });
  })();

  function showSetup() {
    setupBlock.classList.remove('hidden');
    setupBlock.removeAttribute('style');
    document.addEventListener('keydown', onSetupEscPress);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
    window.setup.activate();
  }

  function hideSetup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    setupClose.removeEventListener('click', onSetupCloseClick);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
    window.setup.deactivate();
  }

  function onSetupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideSetup();
    }
  }

  function onSetupCloseClick() {
    hideSetup();
  }

  function onSetupCloseEnterPress(evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      hideSetup();
    }
  }

  dragBlock(userPicBlock, setupBlock);

  function dragBlock(activator, block) {
    activator.addEventListener('mousedown', onMouseDown);

    function onMouseDown(evt) {
      evt.preventDefault();
      if (!evt.button) {
        var startMousePosition = {
          x: evt.clientX,
          y: evt.clientY
        };
        var isMoving = false;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }

      function onMouseMove(evtMove) {
        evtMove.preventDefault();
        isMoving = true;
        var distance = {
          x: startMousePosition.x - evtMove.clientX,
          y: startMousePosition.y - evtMove.clientY
        };

        startMousePosition.x = evtMove.clientX;
        startMousePosition.y = evtMove.clientY;

        block.style.left = (block.offsetLeft - distance.x) + 'px';
        block.style.top = (block.offsetTop - distance.y) + 'px';
      }

      function onMouseUp(evtUp) {
        evtUp.preventDefault();
        if (!evt.button) {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }

        if (isMoving) {
          isMoving = false;
          document.addEventListener('click', function (evtClick) {
            evtClick.preventDefault();
          }, {once: true});
        }
      }
    }
  }
})();
