<template>
  <v-app>
    <Navbar v-if="usuario != ''" />
    <v-main>
      <!-- se declara el v-container para no declararlo en cada vista/views -->
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState } from "vuex";
export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
  methods: {
    // ...mapAction(["cerrarSesion"]),
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>
