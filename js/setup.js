'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarList = setupBlock.querySelector('.setup-similar');
  var setupInputName = document.querySelector('.setup-user-name');
  var setupCoat = document.querySelector('input[name="coat-color"]');
  var coatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupEyes = document.querySelector('input[name="eyes-color"]');
  var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.querySelector('input[name="fireball-color"');
  var fireballColor = document.querySelector('.setup-fireball-wrap');
  var setupClose = document.querySelector('.setup-close');
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

  addSetupListeners();
  renderSimilarList();
  showSimilar();

  function addSetupListeners() {
    setupOpen.addEventListener('click', function () {
      showSetup();
    });

    setupOpen.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        showSetup();
      }
    });
  }

  function renderSimilarList() {
    var fragment = document.createDocumentFragment();

    createWizardsData();

    for (var i = 0; i < wizardsData.length; i++) {
      fragment.appendChild(createWizardBlock(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  }

  function changeColor(arr, field, item) {
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

  function showSetup() {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);
    setupClose.addEventListener('click', onSetupCloseClick);
    setupClose.addEventListener('keydown', onSetupCloseEnterPress);
    setupInputName.addEventListener('keydown', onSetupInputNameEscPress);
    coatColor.addEventListener('click', onCoatClick);
    eyesColor.addEventListener('click', onEyesClick);
    fireballColor.addEventListener('click', onFireballClick);
  }

  function hideSetup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    setupClose.removeEventListener('click', onSetupCloseClick);
    setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
    setupInputName.removeEventListener('keydown', onSetupInputNameEscPress);
    coatColor.removeEventListener('click', onCoatClick);
    eyesColor.removeEventListener('click', onEyesClick);
    fireballColor.removeEventListener('click', onFireballClick);
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

  function onSetupInputNameEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  }

  function onCoatClick() {
    changeColor(coatColors, setupCoat, coatColor);
  }

  function onEyesClick() {
    changeColor(eyesColors, setupEyes, eyesColor);
  }

  function onFireballClick() {
    changeColor(fireballColors, setupFireball, fireballColor);
  }

  function showSimilar() {
    similarList.classList.remove('hidden');
  }

  function createWizardsData() {
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      wizardsData.push({
        name: getRandomName(),
        coatColor: getRandomValue(coatColors),
        eyesColor: getRandomValue(eyesColors)
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

  function getRandomName() {
    function getRandomByParam(arr, param) {
      var index = Math.floor(Math.random() * (arr[param].length + arr.neutral.length));
      var name = (index >= arr[param].length) ? arr.neutral[index - arr[param].length] : arr[param][index];
      return name;
    }

    return Math.round(Math.random())
      ? getRandomByParam(names, 'male') + ' ' + getRandomByParam(surnames, 'male')
      : getRandomByParam(names, 'female') + ' ' + getRandomByParam(surnames, 'female');
  }

  function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
})();

