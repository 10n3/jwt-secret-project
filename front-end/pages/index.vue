<template>
  <div>
    <v-form>
      <v-container>
        <v-row>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :conteiner="16"
              label="Username"
              required>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              :conteiner="16"
              label="Password"
              required>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-btn
              color="success"
              class="mr-4"
              @click="save">
              Sign-In
            </v-btn>
          </v-col>

        </v-row>
      </v-container>
    </v-form>

    <v-card class="mx-auto" max-width="400" tile>
      <v-list-item two-line v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="item.username"></v-list-item-title>
          <v-list-item-subtitle v-text="item.password"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>


  </div>
</template>

<script>
export default {
  data(){
    return {
      username: "",
      password: "",
      items: [],
    };
  },
  async fetch() {
    this.items = await fetch('http://localhost:3001/logins')
      .then(res => res.json());
  },
  methods: {
    async save(e){
      e.preventDefault();
      console.log(this.username, this.password);
      await fetch('http://localhost:3001/auth/signup', {
        method: "POST",
        mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      })
        .then(res => res.json());
    },
  }

}
</script>
