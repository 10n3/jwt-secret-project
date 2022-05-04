<template>
  <div>

    <h2>You are not logged in!</h2>


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
        .then(res => res.json())
        .catch(error => console.log(error));
    },
  }
}
</script>