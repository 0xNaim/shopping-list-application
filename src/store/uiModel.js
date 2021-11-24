import { action } from 'easy-peasy';

const UiModel = {
  searchOverlayFocus: false,
  setSearchOverlayFocus: action((state, payload) => {
    state.setSearchOverlayFocus = payload;
  }),
};

export default UiModel;
