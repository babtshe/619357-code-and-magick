'use strict';
(function () {
  var dialogBlock = document.querySelector('.setup');
  var userPicBlock = dialogBlock.querySelector('.upload');

  dragBlock(userPicBlock, dialogBlock);

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
