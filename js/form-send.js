'use strict';

(() => {
  const main = document.querySelector(`main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormSuccessMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const adFormErrorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

  const show = (message) => {
    const adFormSuccessMessageElement = message.cloneNode(true);

    main.appendChild(adFormSuccessMessageElement);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        window.util.hideElement(adFormSuccessMessageElement, `hidden`);
      }
    });

    document.addEventListener(`click`, () => {
      window.util.hideElement(adFormSuccessMessageElement, `hidden`);
    });

    if (message === adFormErrorMessage) {
      const adFormErrorButton = document.querySelector(`.error__button`);

      adFormErrorButton.addEventListener(`click`, () => {
        window.util.hideElement(adFormSuccessMessageElement, `hidden`);
      });
    }
  };

  const errorFormHandler = () => {
    show(adFormErrorMessage);
  };

  const successFormHandler = () => {
    show(adFormSuccessMessage);

    adForm.reset();
    window.main.deactivatePage();
  };

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const data = new FormData(adForm);

    window.backend.saveData(data, successFormHandler, errorFormHandler);
  });
})();
