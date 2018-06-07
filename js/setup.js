'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
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
  var wizardsData = [];

  renderSimilarList();
  showBlocks();

  function renderSimilarList() {
    var fragment = document.createDocumentFragment();

    createWizardsData();

    for (var i = 0; i < wizardsData.length; i++) {
      fragment.appendChild(createWizardBlock(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
  }

  function showBlocks() {
    setupBlock.classList.remove('hidden');
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

