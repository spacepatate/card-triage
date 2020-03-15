import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    queryString: null,
  },
  mutations: {
    setCards(state, payload) {
      state.cards = [...payload];
    },

    cardUpdated(state, payload) {
      const cardIndex = state.cards.findIndex(card => card.id === payload.id);
      if (cardIndex > -1) {
        state.cards[cardIndex] = payload;
        state.cards = [...state.cards];
      }
    },
    applyFilters(state, payload) {
      state.queryString = payload;
    },   
  },
  actions: {
    initialize(context, payload) {
      context.commit('setCards', payload);
    },
    cardUpdated(context, payload) {
      context.commit('cardUpdated', payload);
    },
    applyFilters(context, payload) {
      context.commit('applyFilters', payload);
    },
    clearFilters(context) {
      context.commit('applyFilters', null);
    },
  },
  getters: {
    queryString: (state) => state.queryString,
    cards: (state, getters) => state.queryString ? getters.cardsWithFilters : state.cards,
    cardsWithFilters: (state) => {
      const tmp = state.cards.reduce((results, currentCard) => {
        // filter firstly from patient name
        if (currentCard.patientName.toUpperCase().includes(state.queryString.toUpperCase())) {
          results.push(currentCard);
          return results;
        }
        // then try to find qs occurence in arrhythmia arrays
        const filtered = currentCard.arrhythmias.filter((arrhythmia) => arrhythmia.toUpperCase().includes(state.queryString.toUpperCase()));
        if (filtered && filtered.length > 0) {
          results.push(currentCard);
        }
        return results;
      }, []);
      return tmp;
    },
  },
})
