'use strict';
(function () {
  window.similar = {
    render: function (arg) {
      wizardMain = arg;
      renderSimilarList();
    }
  };

  var wizardMain;
  var WIZARDS_COUNT = 4;
  var similarWizards;
  var blockTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupBlock = document.querySelector('.setup');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarList = setupBlock.querySelector('.setup-similar');

  showSimilar();
  window.backend.load(loadWizards, window.library.errorHandler);

  function loadWizards(data) {
    similarWizards = data;
  }

  function renderSimilarList() {
    createSimilarList();
    similarListElement.innerHTML = '';
    var counter = (WIZARDS_COUNT >= similarWizards.length) ? similarWizards.length : WIZARDS_COUNT;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < counter; i++) {
      fragment.appendChild(createWizardBlock(similarWizards[i]));
    }
    similarListElement.appendChild(fragment);
  }

  function createSimilarList() {
    similarWizards.sort(function (left, right) {
      var rankDiff = rateWizard(right) - rateWizard(left);
      if (!rankDiff) {
        rankDiff = similarWizards.indexOf(left) - similarWizards.indexOf(right);
      }
      return rankDiff;
    });
  }

  function rateWizard(wizard) {
    var rating = 0;
    if (wizard.colorCoat === wizardMain.colorCoat) {
      rating += 2;
    }
    if (wizard.colorEyes === wizardMain.colorEyes) {
      rating += 1;
    }
    return rating;
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
