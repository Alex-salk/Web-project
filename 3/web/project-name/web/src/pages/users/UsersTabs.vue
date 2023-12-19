<template>
  <div class="users">
    <h3>Пользователи</h3>
    <div class="user-form">
      <input 
        class="input"
        type="text"
        v-model="username"
        placeholder="Логин"
        required>
      <input
        class="input"
        type="password"
        v-model="password"
        placeholder="Пароль"
        required>
    </div>
    <div class="form-actions">
      <button 
        @click.prevent="createOrUpdateUser"
        class="button">{{ editUser ? 'Обновить' : 'Создать' }}</button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.Id">
          <td>{{ user.username }}</td>
          <td>
            <button @click="updateUser(user)">Редактировать</button>
            <button @click="deleteUser(user.Id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="usersEmpty" v-if="users.length<1">Пользователей нет</div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'UsersTabs',
  data() {
    return {
      username: '',
      password: '',
      users: [],
      editUser: null,
    };
  },
  async beforeMount() {
    await this.getUsers()
  },
  methods: {
    async createOrUpdateUser() {
      try {
        const token = localStorage.getItem('accessToken')
        if (!this.password || !this.username) {
          console.log('empty')
          return
        }
        if (this.editUser) {
          await axios.put(`/users/${this.editUser.Id}`, {
            username: this.username,
            password: this.password,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          this.editUser = null;
        } else {
          await axios.post('/users', {
            username: this.username,
            password: this.password,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        }
        this.clearForm()
        this.getUsers()
      } catch (error) {
        console.log(error)
      }
    },
    async getUsers() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    updateUser(user) {
      this.username = user.username
      this.password = user.password ? '' : this.password
      this.editUser = user
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem('accessToken')
        await axios.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getUsers()
      } catch (error) {
        console.log(error)
      }
    },
    clearForm() {
      this.username = ''
      this.password = ''
      this.editUser = null
    },
  },
};
</script>

<style scoped>
.users {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
}

.user-form {
  display: flex;
  max-width: 400px;
  margin-bottom: 20px;
  .input{
    padding: 5px;
    margin-top: 25px;
    margin-left: 15px;
    margin-right: 15px;
    box-sizing: border-box;
  }
  
}

.form-actions {
  margin-top: 10px;
  .button {
    margin-top: 15px;
    background-color: #0090c9;
    color: white;
    padding: 10px 25px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
.usersEmpty {
  margin-top: 15px;
  padding-bottom: 15px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 15px;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th:last-child, .user-table td:last-child {
  text-align: center;
}

.user-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>