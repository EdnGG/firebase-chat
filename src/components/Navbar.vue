<template>
  <nav>
    <v-app-bar app class="headline success" dark>
      <!-- <v-toolbar class="headline" color="secondary" dark> -->
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <router-link :to="{ name: 'home' }">
          <span>Vue</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn @click="cerrarSesion" text>
        <span class="mr-2">Sign Out</span>
        <v-icon>fas fa-address-book</v-icon>
      </v-btn>
      <!-- </v-toolbar> -->
    </v-app-bar>

    <v-navigation-drawer
      color="indigo"
      v-model="drawer"
      class="headline"
      dark
      app
    >
      <v-layout column align-center mt-5>
        <v-flex>
          <v-avatar>
            <img :src="usuario.foto" alt="avatar" />
          </v-avatar>
        </v-flex>
        <v-flex>
          <p class="mt-3 white--text">{{ usuario.nombre }}</p>
        </v-flex>
      </v-layout>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Hey there</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item v-for="(item, index) in items" :key="index" :to="item.to">
          <v-list-item-icon>
            <v-icon>fas fa-address-card</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "fas fa-address-card", to: { name: "home" } },
        { title: "About", icon: "fas fa-address-card", to: { name: "login" } },
        { title: "Admin", icon: "fas fa-address-card", to: { name: "admin" } },
        { title: "Chat", icon: "fas fa-address-card", to: { name: "chat" } },
      ],
    };
  },
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

<style>
</style>