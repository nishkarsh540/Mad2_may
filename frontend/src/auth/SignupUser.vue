<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="signupUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      errorMessage: "",
    };
  },

  methods: {
    async signupUser() {
      try {
        const response = await axios.post("http://127.0.0.1:5000/api/signup", {
          username: this.username,
          password: this.password,
          email: this.email,
        });
        console.log(response);
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = error.response
          ? error.response.data.message
          : "Login failed try again";
      }
    },
  },
};
</script>
