'use strict';

(() => {
  const PinSize = {
    width: 50,
    height: 70
  };

  let setAddress = (element, x, y) => {
    element.setAttribute(`value`, x + `, ` + y);
  };

  window.const.MAP_PIN_MAIN.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + (PinSize.width / 2);
    let pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

    setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);

    let onMouseMove = (moveEvt) => {
      let shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.const.MAP_PIN_MAIN.style.top = (window.const.MAP_PIN_MAIN.offsetTop - shift.y) + `px`;
      window.const.MAP_PIN_MAIN.style.left = (window.const.MAP_PIN_MAIN.offsetLeft - shift.x) + `px`;

      pinAddressX = parseInt(window.const.MAP_PIN_MAIN.style.left, 10) + (PinSize.width / 2);
      pinAddressY = parseInt(window.const.MAP_PIN_MAIN.style.top, 10) + PinSize.height;

      setAddress(window.const.ADDRESS, pinAddressX, pinAddressY);
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
