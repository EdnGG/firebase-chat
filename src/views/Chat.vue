<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-text>
          <h3>Welcome {{ usuario.nombre }}</h3>
        </v-card-text>

        <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
          <div
            :class="item.nombre === usuario.nombre ? 'text-right' : 'text-left'"
            v-for="(item, index) in mensajes"
            :key="index"
          >
            <v-chip>
              <v-avatar>
                <img :src="item.foto" alt="" />
              </v-avatar>
              {{ item.mensaje }}
            </v-chip>
            <p class="caption mr-1">{{ item.fecha }}</p>
          </div>
        </v-card-text>
        <v-card-text>
          <v-form @submit.prevent="enviarMensaje" v-model="valido">
            <v-text-field
              required
              :rules="reglas"
              v-model="mensaje"
              label="Type your message"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { firebase, db } from "@/firebase";
import { mapState } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      mensaje: "",
      valido: false,
      reglas: [(v) => !!v || "You must type a message"],
      mensajes: [],
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    enviarMensaje() {
      if (this.valido) {
        db.collection("chats")
          .add({
            mensaje: this.mensaje,
            nombre: this.usuario.nombre,
            foto: this.usuario.foto,
            fecha: Date.now(),
          })
          .catch((error) => console.log(error));
        console.log("mensaje enviado", this.mensaje);
        this.mensaje = "";
        // this.valido = false;
      } else {
        console.log("no escribiste nada");
      }
    },
  },
  created() {
    moment.locale("en");

    let ref = db.collection("chats").orderBy("fecha", "desc").limit(7);

    ref.onSnapshot((querySnapshot) => {
      this.mensajes = [];
      querySnapshot.forEach((doc) => {
        this.mensajes.unshift({
          mensaje: doc.data().mensaje,
          foto: doc.data().foto,
          nombre: doc.data().nombre,
          fecha: moment(doc.data().fecha).format("lll"),
        });
      });
    });
  },
};
</script>

