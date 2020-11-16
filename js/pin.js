'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapFilter = map.querySelector(`.map__filters-container`);

  const removeClassPinActive = () => {
    const pins = mapPins.querySelectorAll(`.map__pin`);

    pins.forEach((pin)=>{
      pin.classList.remove(`map__pin--active`);
    });
  };

  const render = (offer) => {
    const pinElement = pinTemplate.cloneNode(true);
    const pinImg = pinElement.querySelector(`img`);

    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;

    pinElement.style.left = `${offer.location.x - (pinElement.offsetWidth / 2)}px`;
    pinElement.style.top = `${offer.location.y - pinElement.offsetHeight}px`;

    pinElement.addEventListener(`click`, (evt) => {
      const mapCard = map.querySelector(`.map__card`);

      if (mapCard) {
        mapCard.remove();
      }
      map.insertBefore(window.offer.render(offer), mapFilter);
      removeClassPinActive();
      evt.currentTarget.classList.add(`map__pin--active`);
    });

    return pinElement;
  };

  window.pin = {
    render,
    removeClassPinActive
  };
})();
