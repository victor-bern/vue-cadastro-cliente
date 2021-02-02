<template>
  <div>
    <div class="container">
      <div class="table">
        <div class="table-header">
          <div class="header__item">
            <a id="name" class="filter__link" href="#">Nome</a>
          </div>
          <div class="header__item">
            <a id="wins" class="filter__link filter__link--number" href="#"
              >Email</a
            >
          </div>
          <div class="header__item">
            <a id="draws" class="filter__link filter__link--number" href="#"
              >CPF / CNPJ</a
            >
          </div>
          <div class="header__item">
            <a id="draws" class="filter__link filter__link--number" href="#"
              >Actions</a
            >
          </div>
        </div>
        <div class="table-content">
          <div
            class="table-row"
            v-for="cliente in clientes"
            :key="cliente.documento"
          >
            <div class="table-data">{{ fullName(cliente) }}</div>
            <div class="table-data">{{ cliente.email }}</div>
            <div class="table-data">{{ cliente.documento }}</div>
            <div class="table-data">
              <b-button v-b-modal.modal-1 v-on:click="editCliente(cliente)"
                >Editar</b-button
              >
              <b-modal id="modal-1" hide-footer>
                <form v-on:submit.prevent>
                  <b-input
                    class="input"
                    type="text"
                    name="Nome"
                    placeholder="Nome"
                    v-model="clienteEdit.nome"
                  />
                  <b-input
                    type="text"
                    class="input"
                    name="Sobrenome"
                    placeholder="Sobrenome"
                    v-model="clienteEdit.sobrenome"
                  />
                  <b-input
                    class="input"
                    type="email"
                    name="Email"
                    placeholder="Email"
                    v-model="clienteEdit.email"
                  />
                  <b-input
                    class="input"
                    type="text"
                    name="Documento"
                    placeholder="Documento"
                    v-model="clienteEdit.documento"
                  />

                  <b-button
                    @click="$bvModal.hide('modal-1')"
                    v-on:click="editClienteSubmit"
                    variant="success"
                    >Editar</b-button
                  >
                </form>
              </b-modal>
              <b-button variant="danger" v-on:click="deleteCliente(cliente)"
                >Deletar</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Table",
  data() {
    return {
      pica: "rola",
      clienteEdit: {
        nome: "",
        sobrenome: "",
        email: "",
        document: "",
      },
    };
  },
  computed: {
    ...mapState(["clientes"]),
  },
  methods: {
    fullName(cliente) {
      return `${cliente.nome} ${cliente.sobrenome}`;
    },
    deleteCliente(cliente) {
      this.$store.dispatch("deleteCliente", cliente);
    },
    editCliente(cliente) {
      this.clienteEdit = cliente;
    },
    editClienteSubmit() {
      this.$store.dispatch("editCliente", this.clienteEdit);
    },
  },
};
</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700");

$base-spacing-unit: 24px;
$half-spacing-unit: $base-spacing-unit / 2;

$color-alpha: #1772ff;
$color-form-highlight: #eeeeee;

*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  padding: $base-spacing-unit;
  font-family: "Source Sans Pro", sans-serif;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.container {
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}

.table {
  width: 100%;
  border: 1px solid $color-form-highlight;
}

.table-header {
  display: flex;
  width: 100%;
  background: #000;
  padding: ($half-spacing-unit * 1.5) 0;
}

.table-row {
  display: flex;
  width: 100%;
  padding: ($half-spacing-unit * 1.5) 0;

  &:nth-of-type(odd) {
    background: $color-form-highlight;
  }
}

.table-data,
.header__item {
  flex: 1 1 20%;
  text-align: center;
}

.header__item {
  text-transform: uppercase;
}

.filter__link {
  color: white;
  text-decoration: none;
  position: relative;
  display: inline-block;
  padding-left: $base-spacing-unit;
  padding-right: $base-spacing-unit;

  &::after {
    content: "";
    position: absolute;
    right: -($half-spacing-unit * 1.5);
    color: white;
    font-size: $half-spacing-unit;
    top: 50%;
    transform: translateY(-50%);
  }

  &.desc::after {
    content: "(desc)";
  }

  &.asc::after {
    content: "(asc)";
  }
}
</style>