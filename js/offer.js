'use strict';

(() => {
  const MAX_OFFERS_NUMBER = 5;
  const CLASS_HIDDEN = `hidden`;

  const mapPins = document.querySelector(`.map__pins`);
  const fragment = document.createDocumentFragment();
  const cardPopup = document.querySelector(`#card`).content.querySelector(`.popup`);
  const mapFilters = document.querySelector(`.map__filters`);

  const close = (element, button) => {
    button.addEventListener(`click`, () => {
      element.classList.add(CLASS_HIDDEN);
      window.pin.removeClassPinActive();
    });

    button.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.util.hideElement(element, CLASS_HIDDEN);
        window.pin.removeClassPinActive();
      }
    });

    mapFilters.addEventListener(`change`, () => {
      window.util.hideElement(element, CLASS_HIDDEN);
      window.pin.removeClassPinActive();
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        window.util.hideElement(element, CLASS_HIDDEN);
        window.pin.removeClassPinActive();
      }
    });
  };

  const render = (offer) => {
    const offerElement = cardPopup.cloneNode(true);
    const Offer = {
      TITLE: offerElement.querySelector(`.popup__title`),
      ADDRESS: offerElement.querySelector(`.popup__text--address`),
      PRICE: offerElement.querySelector(`.popup__text--price`),
      TYPE: offerElement.querySelector(`.popup__type`),
      CAPACITY: offerElement.querySelector(`.popup__text--capacity`),
      TIME: offerElement.querySelector(`.popup__text--time`),
      FEATURES: offerElement.querySelector(`.popup__features`),
      FEATURE_LIST: offerElement.querySelectorAll(`.popup__feature`),
      DESCRIPTION: offerElement.querySelector(`.popup__description`),
      AVATAR: offerElement.querySelector(`.popup__avatar`),
      PHOTOS: offerElement.querySelector(`.popup__photos`),
    };
    const photoItem = Offer.PHOTOS.querySelector(`.popup__photo`);
    const OfferTypes = {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`,
    };
    const OFFER_CLOSE = offerElement.querySelector(`.popup__close`);
    Offer.ADDRESS.textContent = offer.offer.address;
    Offer.PRICE.textContent = `${offer.offer.price.toLocaleString()} ₽/ночь`;
    Offer.TITLE.textContent = offer.offer.title;
    Offer.CAPACITY.textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
    Offer.TIME.textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;
    Offer.AVATAR.src = offer.author.avatar;
    Offer.TYPE.textContent = OfferTypes[offer.offer.type];

    if (offer.offer.description) {
      Offer.DESCRIPTION.textContent = offer.offer.description;
    } else {
      Offer.DESCRIPTION.remove();
    }

    if (offer.offer.photos.length > 0) {
      offer.offer.photos.forEach((photo) => {
        const photoElement = photoItem.cloneNode(true);

        photoElement.src = photo;
        Offer.PHOTOS.appendChild(photoElement);
      });
      photoItem.remove();
    } else {
      Offer.PHOTOS.remove();
    }

    if (offer.offer.features.length > 0) {
      Offer.FEATURE_LIST.forEach((feature) => {
        const offersFeatures = offer.offer.features.some((chosenFeature) => {
          return feature.className.endsWith(`--${chosenFeature}`);
        });
        if (!offersFeatures) {
          feature.remove();
        }
      });
    } else {
      Offer.FEATURES.remove();
    }

    close(offerElement, OFFER_CLOSE);

    return offerElement;
  };

  const renderMany = (offers) => {
    const num = Math.min(offers.length, MAX_OFFERS_NUMBER);

    for (let i = 0; i < num; i++) {
      fragment.appendChild(window.pin.render(offers[i]));
    }

    mapPins.appendChild(fragment);
  };


  window.offer = {
    close,
    render,
    renderMany
  };
})();
