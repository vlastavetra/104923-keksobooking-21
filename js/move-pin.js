'use strict';

(() => {
  const START_PIN_COORD = 570;
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`[name='address']`);

  const PinSize = {
    halfWidth: 32,
    height: 65,
    activeHeight: 195
  };
  const YLimit = {
    MIN: 130,
    MAX: 630
  };
  const XLimit = {
    MIN: 0 - PinSize.halfWidth,
    MAX: map.clientWidth
  };

  let pinAddressX = parseInt(mapPinMain.style.left, 10) + PinSize.halfWidth;
  let pinAddressY = parseInt(mapPinMain.style.left, 10) + PinSize.height;

  const setAddress = (x, y) => {
    address.setAttribute(`value`, `${x}, ${y}`);
  };

  setAddress(pinAddressX, pinAddressY);

  const resetMapPinMain = () => {
    mapPinMain.style.left = `${START_PIN_COORD}px`;
    mapPinMain.style.top = `${(START_PIN_COORD - PinSize.activeHeight)}px`;

    setAddress(START_PIN_COORD + PinSize.halfWidth, START_PIN_COORD + PinSize.height);
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let mouseMoveHandler = (moveEvt) => {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      let coordX = mapPinMain.offsetLeft - shift.x;
      let coordY = mapPinMain.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (coordX >= XLimit.MIN && coordX + PinSize.halfWidth <= XLimit.MAX) {
        mapPinMain.style.left = `${coordX}px`;
      }

      if (coordY + PinSize.height >= YLimit.MIN && coordY + PinSize.height <= YLimit.MAX) {
        mapPinMain.style.top = `${coordY}px`;
      }

      pinAddressX = parseInt(mapPinMain.style.left, 10) + PinSize.halfWidth;
      pinAddressY = parseInt(mapPinMain.style.top, 10) + PinSize.height;

      setAddress(pinAddressX, pinAddressY);
    };

    let mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, mouseMoveHandler);
      document.removeEventListener(`mouseup`, mouseUpHandler);
    };

    document.addEventListener(`mousemove`, mouseMoveHandler);
    document.addEventListener(`mouseup`, mouseUpHandler);
  });

  window.movepin = {
    resetMapPinMain
  };
})();
