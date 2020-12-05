<template>
  <v-layout
    ><h3>Welcome {{ usuario.nombre }}</h3></v-layout
  >
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>
