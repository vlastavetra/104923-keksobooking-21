'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const address = adForm.querySelector(`[name='address']`);

  const PinSize = {
    HALF_WIDTH: 31,
    HEIGHT: 72,
    ACTIVE_HEIGHT: 195
  };
  const YLimit = {
    MIN: 130,
    MAX: 630
  };
  const XLimit = {
    MIN: 0 - PinSize.HALF_WIDTH,
    MAX: map.clientWidth
  };

  const StartPinCoord = {
    X: 570,
    Y: 375
  };

  let pinAddressX = parseInt(mapPinMain.style.left, 10) + PinSize.HALF_WIDTH;
  let pinAddressY = parseInt(mapPinMain.style.left, 10) - (PinSize.ACTIVE_HEIGHT - PinSize.HEIGHT);

  const setAddress = (x, y) => {
    address.setAttribute(`value`, `${x}, ${y}`);
  };

  setAddress(pinAddressX, pinAddressY);

  const resetMapPinMain = () => {
    mapPinMain.style.left = `${StartPinCoord.X}px`;
    mapPinMain.style.top = `${(StartPinCoord.X - PinSize.ACTIVE_HEIGHT)}px`;

    setAddress(StartPinCoord.X + PinSize.HALF_WIDTH, StartPinCoord.Y + PinSize.HEIGHT);
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

      if (coordX >= XLimit.MIN && coordX + PinSize.HALF_WIDTH <= XLimit.MAX) {
        mapPinMain.style.left = `${coordX}px`;
      }

      if (coordY + PinSize.HEIGHT >= YLimit.MIN && coordY + PinSize.HEIGHT <= YLimit.MAX) {
        mapPinMain.style.top = `${coordY}px`;
      }

      pinAddressX = parseInt(mapPinMain.style.left, 10) + PinSize.HALF_WIDTH;
      pinAddressY = parseInt(mapPinMain.style.top, 10) + PinSize.HEIGHT;

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
