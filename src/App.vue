<template>
  <v-app>
    <v-app-bar app class="headline" color="secondary" dark>
      <!-- <div class="d-flex align-center"> -->
      <router-link :to="{ name: 'home' }">
        <span>Vue</span>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="cerrarSesion" text>
        <span class="mr-2">Sign Out</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- se declara el v-container para no declararlo en cada vista/views -->
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
};
</script>
