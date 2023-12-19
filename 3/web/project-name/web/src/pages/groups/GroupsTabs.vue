<template>
  <div class="groups">
    <h3>Группы</h3>
    <div class="group-form">
      <input 
        class="input"
        type="text"
        v-model="groupName"
        required
        placeholder="Название группы">

      <select 
        class="multiselect"
        v-model="selectedUniversityId" 
        required>
        <option v-for="university in universityList" :key="university.university_id" :value="university.university_id">
          {{ university.university_name }}
        </option>
      </select>
    </div>
    
    <div class="form-actions">
      <button
        @click.prevent="createOrUpdateGroup"
        class="button">{{ editingGroup ? 'Обновить' : 'Создать' }}</button>
    </div>

    <table class="group-table">
      <thead>
        <tr>
          <th>Группа</th>
          <th>Университет</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groups" :key="group.group_id">
          <td>{{ group.group_name }}</td>
          <td>{{ universityList.length ? getUniversityName(group.university_id) : '' }}</td>
          <td>
            <button @click="editGroup(group)">Редактировать</button>
            <button @click="deleteGroup(group.group_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="groupsEmpty" v-if="groups.length<1">Групп нет</div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'GroupsTabs',
  data() {
    return {
      groupName: '',
      selectedUniversityId: null,
      selectedUniversityName: '',
      groups: [],
      universityList: [],
      editingGroup: null,
    };
  },
  async beforeMount() {
    await this.getUniversity()
    await this.getGroups()
  },
  methods: {
    async createOrUpdateGroup() {
      try {
        const token = localStorage.getItem('accessToken')
        if (this.editingGroup) {
          await axios.put(`/groups/${this.editingGroup.group_id}`, {
            group_name: this.groupName,
            university_id: this.selectedUniversityId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editingGroup = null;
        } else {
          await axios.post('/groups', {
            group_name: this.groupName,
            university_id: this.selectedUniversityId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        this.clearForm()
        this.getGroups()
      } catch (error) {
        console.log(error)
      }
    },
    async getGroups() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.groups = response.data;

        for (const group of this.groups) {
          if (group.university.university_id) {
            await this.getUniversityById(group.university.university_id)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getUniversity() {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('/university', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.universityList = response.data
      } catch (error) {        
        console.log(error)
      }
    },
    async getUniversityById(universityId) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/university/${universityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$set(this.selectedUniversityName, universityId, response.data.university_name)
      } catch (error) {
        console.log(error)
      }
    },
    editGroup(group) {
      this.groupName = group.group_name
      this.selectedUniversityId = group.university_id
      this.editingGroup = group
    },
    async deleteGroup(groupId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getGroups();
      } catch (error) {
        console.log(error)
      }
    },
    clearForm() {
      this.groupName = ''
      this.selectedUniversityId = null
      this.editingGroup = null
    },
    getUniversityName(universityId) {
      const university = this.universityList.find(u => u.university_id === universityId)
      return university ? university.university_name : ''
    },
  },
};
</script>

<style scoped>
.groups {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.group-form {
  max-width: 400px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  max-width: 400px;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  .input{
    width: 45%;
    padding: 5px;
    margin-top: 25px;
    box-sizing: border-box;
  }
  .multiselect{
    width: 45%;
    padding: 5px;
    margin-top: 25px;
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

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
.groupsEmpty {  
  margin-top: 15px;
  padding-bottom: 15px;
}
.group-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 15px;
}

.group-table th, .group-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.group-table th:last-child, .group-table td:last-child {
  text-align: center;
}

.group-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.group-table button:hover {
  background-color: #45a049;
}
</style>