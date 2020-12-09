<template>
  <v-layout justify-center>
    <v-flex xs6>
      <v-card class="text-center">
        <v-card-text>
          <v-avatar>
            <img :src="usuario.foto" alt="avatar" />
          </v-avatar>
        </v-card-text>
        <v-card-text>
          <h3>{{ usuario.nombre }}</h3>
        </v-card-text>
        <v-card-text>
          <input
            type="file"
            ref="boton"
            class="d-none"
            @change="buscarImagen($event)"
          />
          <v-btn color="secondary" @click="$refs.boton.click()"
            >Search Image</v-btn
          >
          <v-btn
            color="primary"
            :disabled="file === null"
            @click="subirImagen()"
            :loading="loading"
            >Upload Image</v-btn
          >
        </v-card-text>
        <v-card-text v-if="file">
          <h4>{{ file.name }}</h4>
          <v-img :src="urlTemporal" v-if="urlTemporal"></v-img>
        </v-card-text>
        <v-card-text v-if="error">
          <h4>{{ error }}</h4>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, db } from "@/firebase";
export default {
  data() {
    return {
      file: null,
      urlTemporal: "",
      loading: false,
      error: null,
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    buscarImagen(event) {
      console.log(event.target.files[0]);
      const tipoArchivo = event.target.files[0].type;

      if (tipoArchivo === "image/jpeg" || tipoArchivo === "image/png") {
        this.file = event.target.files[0];
        this.error = null;
      } else {
        this.error = "Archivo no valido";
        this.file = null;
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (e) => {
        // console.log(e.target.result);
        this.urlTemporal = e.target.result;
      };
    }, // Este metodo es asincrono porque se trabaja con el servidor
    async subirImagen() {
      try {
        this.loading = true;
        // console.log(this.usuario.email);
        const refImagen = firebase
          .storage()
          .ref()
          .child(this.usuario.email)
          .child("foto perfil");

        const res = await refImagen.put(this.file);
        console.log(res);

        let urlDescarga = await refImagen.getDownloadURL();
        this.usuario.foto = urlDescarga;

        await db.collection("usuarios").doc(this.usuario.uid).update({
          foto: urlDescarga,
        });
        this.error = "Imagen subida con exito";
        this.file = null;

        // console.log(urlDescarga);
      } catch (e) {
        console.log(e.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>