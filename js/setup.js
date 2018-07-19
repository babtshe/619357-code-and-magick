'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var form = document.querySelector('.setup-wizard-form');
  var setupInputName = document.querySelector('.setup-user-name');
  var setupCoat = document.querySelector('input[name="coat-color"]');
  var coatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupEyes = document.querySelector('input[name="eyes-color"]');
  var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('input[name="fireball-color"');
  var fireballColor = document.querySelector('.setup-fireball-wrap');
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  window.setup = {
    activate: function () {
      activateForm();
    },
    deactivate: function () {
      deactivateForm();
    }
  };

  function activateForm() {
    window.similar.render(getCurrentWizard());
    form.addEventListener('submit', onFormSubmit);
    setupInputName.addEventListener('keydown', onSetupInputNameEscPress);
    coatColor.addEventListener('click', onCoatClick);
    eyesColor.addEventListener('click', onEyesClick);
    fireballColor.addEventListener('click', onFireballClick);
  }

  function deactivateForm() {
    form.removeEventListener('submit', onFormSubmit);
    setupInputName.removeEventListener('keydown', onSetupInputNameEscPress);
    coatColor.removeEventListener('click', onCoatClick);
    eyesColor.removeEventListener('click', onEyesClick);
    fireballColor.removeEventListener('click', onFireballClick);
  }

  function getCurrentWizard() {
    return {
      colorCoat: setupCoat.value,
      colorEyes: setupEyes.value
    };
  }

  function onSetupInputNameEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  }

  function onCoatClick() {
    window.library.changeColor(coatColors, setupCoat, coatColor);
    window.setup.onColorChange();
  }

  window.setup.onColorChange = window.library.debounce(function () {
    window.similar.render(getCurrentWizard());
  });

  function onEyesClick() {
    window.library.changeColor(eyesColors, setupEyes, eyesColor);
    window.setup.onColorChange();
  }

  function onFireballClick() {
    window.library.changeColor(fireballColors, setupFireball, fireballColor);
  }


  function onFormSubmit(evt) {
    window.backend.save(new FormData(form), function () {
      window.dialog.hide();
    }, window.library.errorHandler);
    evt.preventDefault();
  }

})();

