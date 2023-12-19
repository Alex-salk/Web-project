<template>
  <div>
    <div class="view">
      <br>
      <div class="tab">
        <button class="button" @click.prevent="openUsers">Пользователи</button>
        <button class="button" @click.prevent="openUniversity">Университеты</button>
        <button class="button" @click.prevent="openGroups">Группы</button>
        <button class="button" @click.prevent="openStudents">Студенты</button>
        <button class="button logout-button"
          @click="logout">Выход</button>
      </div>

      <div v-if="isUsers" class="tabcontent">
        <users-tabs/>
      </div>

      <div v-if="isStudents" class="tabcontent">
        <students-tabs/>
      </div>

      <div v-if="isGroups" class="tabcontent">
        <groups-tabs/>
      </div>

      <div v-if="isUniversity" class="tabcontent">
        <university-tabs/>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTabs from "@/pages/users/UsersTabs.vue"
import StudentsTabs from "@/pages/students/StudentsTabs.vue"
import UniversityTabs from "@/pages/university/UniversityTabs.vue"
import GroupsTabs from "@/pages/groups/GroupsTabs.vue"

export default {
  name: 'HomePage',
  data() {
    return {
      isUsers: true,
      isUniversity: false,
      isStudents: false,
      isGroups: false
    };
  },
  components: {
    UsersTabs,
    StudentsTabs,
    UniversityTabs,
    GroupsTabs
  },
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/');
    },
    removePages() {
      this.isGroups = false
      this.isStudents = false
      this.isUniversity = false
      this.isUsers = false
    },
    openUsers() {
      this.removePages()
      this.isUsers = true
    },
    openUniversity() {
      this.removePages()
      this.isUniversity = true
    },
    openGroups() {
      this.removePages()
      this.isGroups = true
    },
    openStudents() {
      this.removePages()
      this.isStudents = true
    }
  },
};
</script>

<style scoped>
.view {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .tab {
    display: flex;
    flex-wrap: wrap;
    float: left;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    width: 25%;
    height: 300px;
    .button {
      display: flex;
      background-color: inherit;
      color: black;
      padding: 22px 16px;
      width: 100%;
      border: none;
      outline: none;
      text-align: left;
      cursor: pointer;
      transition: 0.3s;
      font-size: 17px;
    }

    /* Change background color of buttons on hover */
    button:hover {
      background-color: #ddd;
    }

    /* Create an active/current "tab button" class */
    button.active {
      background-color: #ccc;
    }
    
  .logout-button {
    background-color:#0090c9;
  }

  }
  .tabcontent {
    display: flex;
    float: left;
    padding: 0px 12px;
    border: 1px solid #ccc;
    width: 70%;
    border-left: none;
    height: 100%;
    min-height: 320px;
  } 
}
</style>