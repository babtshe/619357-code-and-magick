'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var WIZARDS_COUNT = 4;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarList = setupBlock.querySelector('.setup-similar');
  var setupInputName = document.querySelector('.setup-user-name');
  var setupCoat = document.querySelector('input[name="coat-color"]');
  var coatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupEyes = document.querySelector('input[name="eyes-color"]');
  var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('input[name="fireball-color"');
  var fireballColor = document.querySelector('.setup-fireball-wrap');
  var names = {
    neutral: [],
    male: ['Иван', 'Хуан Себастьян', 'Кристоф', 'Виктор', 'Вашингтон'],
    female: ['Мария', 'Юлия', 'Люпита']
  };
  var surnames = {
    neutral: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Нионго', 'Ирвинг'],
    male: [],
    female: ['Топольницкая']
  };
  var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardsData = [];

  window.setup = {
    activate: function () {
      activateForm();
    },
    deactivate: function () {
      deactivateForm();
    }
  };

  renderSimilarList();
  showSimilar();

  function renderSimilarList() {
    var fragment = document.createDocumentFragment();

    createWizardsData();

    for (var i = 0; i < wizardsData.length; i++) {
      fragment.appendChild(createWizardBlock(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  }

  function activateForm() {
    setupInputName.addEventListener('keydown', onSetupInputNameEscPress);
    coatColor.addEventListener('click', onCoatClick);
    eyesColor.addEventListener('click', onEyesClick);
    fireballColor.addEventListener('click', onFireballClick);
  }

  function deactivateForm() {
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

  function showSimilar() {
    similarList.classList.remove('hidden');
  }

  function createWizardsData() {
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardsData.push({
        name: window.library.getRandomName(names, surnames),
        coatColor: window.library.getRandomValue(coatColors),
        eyesColor: window.library.getRandomValue(eyesColors)
      });
    }
  }

  function createWizardBlock(wizard) {
    var wizardBlock = blockTemplate.cloneNode(true);
    wizardBlock.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardBlock.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardBlock.querySelector('.setup-similar-label').textContent = wizard.name;

    return wizardBlock;
  }
})();

