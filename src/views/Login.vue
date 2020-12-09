<template>
  <v-layout justify-center mt-5>
    <v-flex xs12 sm8 md6 xl4>
      <v-card>
        <v-card-text
          class="display-1 text-uppercase white--text text-center"
          :class="registro ? 'success' : 'accent'"
        >
          <span v-if="!registro">Login</span>
          <span v-if="registro">Register</span>
        </v-card-text>
        <v-card-text>
          <v-btn block color="secondary" @click="google()">
            <v-icon left dark>fab fa-google</v-icon>
            google
          </v-btn>
          <v-btn block color="secondary" @click="facebook()">
            <v-icon left dark>fab fa-facebook</v-icon>
            Facebook
          </v-btn>
        </v-card-text>
        <v-card-text>
          <v-btn block @click="registro = !registro" v-if="!registro">
            Come join us!
          </v-btn>
          <v-btn block @click="registro = !registro" v-if="registro">
            Already member? Alright
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import { firebase, auth, db } from "../firebase.js";
import router from "@/router";

export default {
  data() {
    return {
      registro: false,
    };
  },
  methods: {
    ...mapMutations(["nuevoUsuario"]),
    ...mapActions(["setUsuario"]),
    google() {
      console.log("google");
      const provider = new firebase.auth.GoogleAuthProvider();
      this.ingresar(provider);
    },
    facebook() {
      console.log("facebook");
      const provider = new firebase.auth.FacebookAuthProvider();
      this.ingresar(provider);
    },
    async ingresar(provider) {
      firebase.auth().languageCode = "en";
      try {
        // Ingreso usuario
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        console.log(user);

        this.setUsuario(user);

        router.push({ name: "home" });
      } catch (e) {
        console.log(`Error: ${e.message}`);
      }
    },
  },
};
</script>

<style>
/* // 1304596666561869 */

/* // 3317f710828ed0481fc0a644ec70384a */
</style>


