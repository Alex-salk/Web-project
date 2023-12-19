<template>
  <div>
    <div class="login-form">
      <h3>Авторизация</h3>
      
      <input
        class="input"
        type="text"
        v-model="username"
        required="true"
        placeholder="Логин">

      <input 
        class="input"
        type="password"
        v-model="password"
        placeholder="Пароль"
        required="true">
      <br>
      <button
        class="button"
        @click.prevent="login">Войти</button>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      const data = {
        username: this.username,
        password: this.password,
      };
      try {
        const response =  await axios.post('/auth/login', data)
        const accessToken = response.data.access_token
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('isAuthenticated', 'true');
        this.$router.push('/Home')
      } catch(error) {
        console.log(error)
      }
    },
  },
};
</script>
  
<style scoped>
  .login-form {
    max-width: 350px;
    margin: auto;
    margin-top: 10%;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 200px; 
      .input {
        width: 80%;
        padding: 8px;
        margin-bottom: 16px;
        box-sizing: border-box;
      }
      .button {
        background-color: #0090c9;
        color: white;
        padding: 10px 25px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
  }
</style>