<template>
  <div>
    <h2 align="center">Please enter your data to sign up :D</h2>
    <v-form @submit.prevent="submit">
      <v-container>

        <v-row cols="12" md="4">
          <v-text-field
              v-model="username"
              :conteiner="16"
              label="Username"
              required>
          </v-text-field>
        </v-row>

        <v-row cols="12" md="4">
          <v-text-field
              v-model="password"
              :conteiner="16"
              label="Password"
              required>
          </v-text-field>
        </v-row>

        <v-row cols="12" md="4">
          <v-btn
              color="success"
              class="mr-4"
              @click="submit">
            Sign-Up
          </v-btn>
        </v-row>

      </v-container>
    </v-form>

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
  methods: {
    async submit(e){
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
          .then(res => res.json())
          .catch(error => console.log(error));

      // await this.$router.push('/signin');
    },
  }
}
</script>