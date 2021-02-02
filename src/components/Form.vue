<template>
  <div>
    <h1>Cadastro de Cliente</h1>
    <form v-on:submit.prevent>
      <b-input
        class="input"
        type="text"
        name="Nome"
        placeholder="Nome"
        v-model="nome"
      />
      <b-input
        type="text"
        class="input"
        name="Sobrenome"
        placeholder="Sobrenome"
        v-model="sobrenome"
      />
      <b-input
        class="input"
        type="email"
        name="Email"
        placeholder="Email"
        v-model="email"
      />
      <p style="margin: 0 auto">Pessoa juridica:</p>
      <div class="radius">
        <p>Sim</p>
        <b-form-radio type="radio" name="Sim" value="Sim" v-model="radio" />
        <p>Não</p>
        <b-form-radio
          type="radio"
          name="Sim"
          value="Não"
          v-model="radio"
          checked
        />
      </div>

      <div v-if="hasCNPJ">
        <b-input
          class="input"
          type="text"
          name="CNPJ"
          placeholder="CNPJ"
          v-model="documento"
        />
      </div>
      <div v-else>
        <b-input
          class="input"
          type="text"
          name="CNPJ"
          placeholder="CPF"
          v-model="documento"
        />
      </div>
      <b-button v-on:click="sendClient" variant="success">Cadastrar</b-button>
    </form>
  </div>
</template>


<script >
import { mapState } from "vuex";

export default {
  name: "Form",
  data() {
    return {
      radio: "",
      hasCNPJ: false,
      nome: undefined,
      sobrenome: undefined,
      email: undefined,
      documento: undefined,
    };
  },
  computed: {
    ...mapState(["clientes"]),
  },
  methods: {
    cleanForm() {
      this.nome = "";
      this.sobrenome = "";
      this.email = "";
      this.documento = "";
    },
    sendClient() {
      if (this.hasCNPJ) {
        const client = {
          nome: this.nome,
          sobrenome: this.sobrenome,
          email: this.email,
          documento: this.documento,
          isJuridic: true,
        };
        this.cleanForm();
        this.$store.dispatch("setClient", client);
        return null;
      }
      const client = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
        documento: this.documento,
        isJuridic: false,
      };
      this.cleanForm();
      this.$store.dispatch("setClient", client);
    },
  },
  watch: {
    radio(newValue) {
      console.log(newValue);
      if (newValue === "Sim") {
        this.hasCNPJ = true;
        return null;
      }
      this.hasCNPJ = false;
    },
  },
};
</script>

<style>
h1 {
  text-align: center;
}
form {
  margin: 0 auto;
  width: 300px;
  display: flex;
  flex-direction: column;
}
.input {
  margin-bottom: 10px;
}

.input:nth-child(1) {
  margin-top: 10px;
}

.radius {
  margin: 0 auto;
  display: flex;
}
</style>