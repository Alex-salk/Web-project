<template>
  <div class="university">
    <h3>Университеты</h3>
    <div class="university-form">
      <input 
        class="input"
        type="text" 
        v-model="name" 
        required
        placeholder="Наименование">

    </div>
    <div class="form-actions">
        <button 
          @click.prevent="createOrUpdateUniversity" 
          class="button">
          {{ editingUniversity ? 'Обновить' : 'Создать' }}</button>
      </div>

    <table class="university-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="university in universities" :key="university.university_id">
          <td>{{ university.university_name }}</td>
          <td>
            <button @click="editUniversity(university)">Редактировать</button>
            <button @click="deleteUniversity(university.university_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>    
    <div class="universityEmpty" v-if="universities.length<1">Университетов нет</div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'UniversityTabs',
  data() {
    return {
      name: '',
      universities: [],
      editingUniversity: null,
    };
  },
  async beforeMount() {
    await this.getUniversities()
  },
  methods: {
    async createOrUpdateUniversity() {
      try {
        const token = localStorage.getItem('accessToken')
        if (this.editingUniversity) {
          await axios.put(`/university/${this.editingUniversity.university_id}`, {
            university_name: this.name,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editingUniversity = null
        } else {
          await axios.post('/university', {
            university_name: this.name,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        this.clearForm()
        this.getUniversities()
      } catch (error) {
        console.log(error)
      }
    },
    async getUniversities() {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('/university', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.universities = response.data
      } catch (error) {
        console.log(error)
      }
    },
    editUniversity(university) {
      this.name = university.university_name
      this.editingUniversity = university
    },
    async deleteUniversity(universityId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/university/${universityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.getUniversities()
      } catch (error) {
        console.log(error)
      }
    },
    clearForm() {
      this.name = ''
      this.editingUniversity = null
    },
  },
};
</script>


<style scoped>
.university {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  text-align: center;
}

.university-form {  
  max-width: 400px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  max-width: 400px;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-wrap: wrap;
  .input{
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
.universityEmpty{  
  margin-top: 15px;
  padding-bottom: 15px;
}
.university-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 15px;
}

.university-table th, .university-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.university-table th:last-child, .university-table td:last-child {
  text-align: center;
}

.university-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

</style>