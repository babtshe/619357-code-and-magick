'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
  var setupInputName = document.querySelector('.setup-user-name');
  var setupCoat = document.getElementsByName('coat-color')[0];
  var coatColor = document.querySelector('.setup-wizard .wizard-coat');
  var setupEyes = document.getElementsByName('eyes-color')[0];
  var eyesColor = document.querySelector('.setup-wizard .wizard-eyes');
  var setupFireball = document.getElementsByName('fireball-color')[0];
  var fireballColor = document.querySelector('.setup-fireball-wrap');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarList = setupBlock.querySelector('.setup-similar');
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

    setupClose.addEventListener('click', function () {
      hideSetup();
    });

    setupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        hideSetup();
      }
    });

    setupInputName.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.stopPropagation();
      }
    });

    coatColor.addEventListener('click', function () {
      changeColor(coatColors, setupCoat, coatColor);
    });

    eyesColor.addEventListener('click', function () {
      changeColor(eyesColors, setupEyes, eyesColor);
    });

    fireballColor.addEventListener('click', function () {
      changeColor(fireballColors, setupFireball, fireballColor);
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
  }

  function hideSetup() {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  }

  function onSetupEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideSetup();
    }
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

