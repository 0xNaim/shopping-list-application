import { action } from 'easy-peasy';
import shortid from 'shortid';

const BucketModel = {
  items: {},
  create: action((state, payload) => {
    const bucket = {
      id: shortid.generate(),
      name: payload,
      shoppingItems: [],
      costs: 0,
      createdAt: new Date().toLocaleDateString(),
    };
    state.items[bucket.id] = bucket;
  }),
  remove: action((state, payload) => {
    delete state.items[payload];
  }),
  addItem: action((state, payload) => {
    state.items[payload.bucketId].shoppingItems.push(payload.itemId);
  }),
  removeItem: action((state, payload) => {
    const bucket = state.items[payload.bucketId];
    const index = bucket.shoppingItems.findIndex((id) => id === payload.itemId);
    bucket.shoppingItems.splice(index, 1);
  }),
  rename: action((state, payload) => {
    // state.items[payload.bucketId].name = payload.name;
    if (state.items[payload.bucketId].name.length <= 30) {
      state.items[payload.bucketId].name = payload.name;
    }
  }),
  updateCost: action((state, payload) => {
    state.items[payload.bucketId].costs = payload.costs;
  }),
};

export default BucketModel;
