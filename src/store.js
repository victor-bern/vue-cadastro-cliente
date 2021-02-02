import Vue from "vue";
import vuex from "vuex";

Vue.use(vuex);
export default new vuex.Store({
  state: {
    cliente: {},
    clientes: [],
  },
  mutations: {
    SET_CLIENTE(state, cliente) {
      if (
        cliente.nome === undefined ||
        cliente.documento === undefined ||
        cliente.email === undefined ||
        cliente.sobrenome
      ) {
        return null;
      }
      state.cliente = cliente;
    },
    SET_CLIENTES(state) {
      if (
        state.cliente.nome === undefined ||
        state.cliente.documento === undefined ||
        state.cliente.email === undefined ||
        state.cliente.sobrenome
      ) {
        return null;
      }
      state.clientes.push(state.cliente);
      return null;
    },
    DELETE_CLIENTE(state, clientDoc) {
      const index = state.clientes.findIndex((value, index) => {
        if (value.documento === clientDoc.documento) {
          return index;
        }
      });
      state.clientes.splice(index, 1);
    },
    EDIT_CLIENTE(state, cliente) {
      const index = state.clientes.findIndex((value, index) => {
        if (value.documento === cliente.documento) {
          return index;
        }
      });
      state.clientes[index] = cliente;
    },
  },
  actions: {
    setClient({ commit }, cliente) {
      commit("SET_CLIENTE", cliente);
      commit("SET_CLIENTES");
    },
    deleteCliente({ commit }, cliente) {
      commit("DELETE_CLIENTE", cliente);
    },
    editCliente({ commit }, cliente) {
      commit("EDIT_CLIENTE", cliente);
    },
  },
});
