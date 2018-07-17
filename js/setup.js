'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var WIZARDS_COUNT = 4;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarList = setupBlock.querySelector('.setup-similar');
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

  showSimilar();

  function renderSimilarList(wizards) {
    similarListElement.innerHTML = '';
    var counter = (WIZARDS_COUNT >= wizards.length) ? wizards.length : WIZARDS_COUNT;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      fragment.appendChild(createWizardBlock(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function activateForm() {
    window.backend.load(renderSimilarList, errorHandler);
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

  function onSetupInputNameEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  }

  function onCoatClick() {
    window.library.changeColor(coatColors, setupCoat, coatColor);
  }

  function onEyesClick() {
    window.library.changeColor(eyesColors, setupEyes, eyesColor);
  }

  function onFireballClick() {
    window.library.changeColor(fireballColors, setupFireball, fireballColor);
  }

  function onFormSubmit(evt) {
    window.backend.save(new FormData(form), function () {
      window.dialog.hide();
    }, errorHandler);
    evt.preventDefault();
  }

  function showSimilar() {
    similarList.classList.remove('hidden');
  }

  function createWizardBlock(wizard) {
    var wizardBlock = blockTemplate.cloneNode(true);
    wizardBlock.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardBlock.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    wizardBlock.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardBlock;
  }
})();

