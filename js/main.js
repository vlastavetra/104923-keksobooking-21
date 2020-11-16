'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapFaded = `map--faded`;
  const mapFilters = document.querySelector(`.map__filters`);
  const MAP_FEATURES = document.querySelector(`.map__features`);
  const MAP_FILTERS_CHILDS = Array.from(mapFilters.children);
  const MAP_FILTERS_FEATURES = Array.from(MAP_FEATURES.children);
  const adForm = document.querySelector(`.ad-form`);
  const AD_FORM_FILDSETS = Array.from(adForm.querySelectorAll(`.ad-form > fieldset`));
  const adFormDisabled = `ad-form--disabled`;
  const resetBtn = adForm.querySelector(`.ad-form__reset`);
  const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
  const housePhotoPreview = adForm.querySelector(`.ad-form__photo img`);
  const defaultImg = `img/muffin-grey.svg`;

  const successHandler = (offers) => {
    window.util.disableElements(MAP_FILTERS_CHILDS, false);
    window.util.disableElements(MAP_FILTERS_FEATURES, false);
    window.offer.renderMany(offers);
    window.filter.filter(offers);
  };

  const errorHandler = (errorMessage) => {
    window.util.createErrorMessage(errorMessage);

    window.util.disableElements(MAP_FILTERS_CHILDS, true);
    window.util.disableElements(MAP_FILTERS_FEATURES, true);
  };

  const pageActivationHandler = (evt) => {
    if (map.classList.contains(mapFaded) && evt.button === 0 || evt.key === `Enter`) {
      window.backend.loadData(successHandler, errorHandler);
      map.classList.remove(mapFaded);
      adForm.classList.remove(adFormDisabled);
      window.util.disableElements(AD_FORM_FILDSETS, false);
    }

    if (map.querySelectorAll(`.map__pin`).length >= 2) {
      window.util.disableElements(MAP_FILTERS_CHILDS, false);
      window.util.disableElements(MAP_FILTERS_FEATURES, false);
    }
  };

  const deactivatePage = () => {
    adForm.reset();
    mapFilters.reset();
    map.classList.add(mapFaded);
    adForm.classList.add(adFormDisabled);
    window.util.removePins();
    window.util.disableElements(MAP_FILTERS_CHILDS, true);
    window.util.disableElements(MAP_FILTERS_FEATURES, true);
    window.util.disableElements(AD_FORM_FILDSETS, true);
    window.movepin.resetMapPinMain();
    avatarPreview.src = defaultImg;
    housePhotoPreview.src = defaultImg;
  };

  resetBtn.addEventListener(`click`, () => {
    deactivatePage();
  });

  window.util.disableElements(MAP_FILTERS_CHILDS, true);
  window.util.disableElements(AD_FORM_FILDSETS, true);
  window.util.disableElements(MAP_FILTERS_FEATURES, true);

  mapPinMain.addEventListener(`mousedown`, pageActivationHandler);
  mapPinMain.addEventListener(`keydown`, pageActivationHandler);

  window.main = {
    deactivatePage
  };
})();
