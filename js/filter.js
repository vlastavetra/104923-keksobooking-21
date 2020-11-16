'use strict';

(() => {
  const Budget = {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`
  };
  const Cost = {
    MIN: 10000,
    MAX: 50000
  };
  const mapFilters = document.querySelector(`.map__filters`);

  let filter = (offers) => {
    mapFilters.addEventListener(`change`, window.debounce(() => {
      const filters = Object.fromEntries(new FormData(mapFilters).entries());

      const filteredOffers = offers.filter((offer) => {
        return offer.offer.type === filters[`housing-type`] || filters[`housing-type`] === `any`;
      }).filter((offer) => {
        return offer.offer.rooms === parseInt(filters[`housing-rooms`], 10) || filters[`housing-rooms`] === `any`;
      }).filter((offer) => {
        return offer.offer.guests === parseInt(filters[`housing-guests`], 10) || filters[`housing-guests`] === `any`;
      }).filter((offer) => {
        switch (filters[`housing-price`]) {
          case Budget.LOW:
            return offer.offer.price < Cost.MIN;
          case Budget.MIDDLE:
            return offer.offer.price >= Cost.MIN && offer.offer.price <= Cost.MAX;
          case Budget.HIGH:
            return offer.offer.price > Cost.MIN;
          default:
            return offer;
        }
      }).filter((offer) => {
        return offer.offer.features.includes(filters[`features`]) || filters[`features`] === undefined;
      });

      window.util.removePins();

      window.offer.renderMany(filteredOffers);
    }));
  };

  window.filter = {
    filter
  };
})();
