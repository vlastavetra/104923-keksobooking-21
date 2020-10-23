'use strict';

(() => {
  const MAP = document.querySelector(`.map`);
  const MAP_TUMBLER = `map--faded`;
  const MAP_PINS = document.querySelector(`.map__pins`);
  const MAP_PIN_MAIN = document.querySelector(`.map__pin--main`);
  const MAP_FILTERS = document.querySelector(`.map__filters`);
  const MAP_FILTERS_CHILDS = Array.from(MAP_FILTERS.children);
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_FORM_FILDSETS = Array.from(AD_FORM.querySelectorAll(`.ad-form > fieldset`));
  const AD_FORM_TUMBLER = `ad-form--disabled`;
  const FRAGMENT = document.createDocumentFragment();
  const OFFERS_NUMBER = 8;

  let activatePage = (evt) => {
    if (evt.button === 0 || evt.key === `Enter`) {
      window.util.showElement(MAP, MAP_TUMBLER);
      window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, false);
      window.util.disableElementsTumbler(AD_FORM_FILDSETS, false);
      window.util.showElement(AD_FORM, AD_FORM_TUMBLER);
    }
  };

  window.util.disableElementsTumbler(MAP_FILTERS_CHILDS, true);
  window.util.disableElementsTumbler(AD_FORM_FILDSETS, true);

  MAP_PIN_MAIN.addEventListener(`mousedown`, activatePage);
  MAP_PIN_MAIN.addEventListener(`keydown`, activatePage);

  const successHandler = (offers) => {
    if (offers.length >= OFFERS_NUMBER) {
      for (let i = 0; i < OFFERS_NUMBER; i++) {
        FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
      }
    } else {
      for (let i = 0; i < offers.length; i++) {
        FRAGMENT.appendChild(window.pin.renderPin(offers[i]));
      }
    }

    MAP_PINS.appendChild(FRAGMENT);
  };

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;

    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.load(successHandler, errorHandler);
})();
