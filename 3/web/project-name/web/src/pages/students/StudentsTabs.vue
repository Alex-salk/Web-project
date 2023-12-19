<template>
  <div class="students">    
    <h3>Студенты</h3>
    <div class="student-form">
      <input
        class="input"
        type="text"
        v-model="fullName"
        required
        placeholder="ФИО"
      >

      <select class="multiselect" v-model="selectedGroup" required>
        <option v-for="group in groupList" :key="group.group_id" :value="group.group_id">
          {{ group.group_name }}
        </option>
      </select>

      <select class="multiselect" v-model="selectedUniversity" required>
        <option v-for="institution in institutionList" :key="institution.university_id" :value="institution.university_id">
          {{ institution.university_name }}
        </option>
      </select>

      <input
        class="input"
        type="number"
        v-model="admissionYear"
        placeholder="Год поступления"
        >

      <input
        class="input"
        type="number"
        v-model="age"
        placeholder="Год рождения">
    </div>
    
    <div class="form-actions">
      <button @click.prevent="createOrUpdateStudent" class="button">{{ editStudent ? 'Обновить' : 'Создать' }}</button>
    </div>

    <table class="student-table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Группа</th>
          <th>Вуз</th>
          <th>Год поступления</th>
          <th>Возраст</th>
          <th>Изучаемые предметы</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in students" :key="student.student_id">
          <td>{{ student.full_name }}</td>
          <td>{{ getGroupName(student.group) }}</td>
          <td>{{ getUniversityName(student.institution) }}</td>
          <td>{{ student.admission_year }}</td>
          <td>{{ currentYear - student.age }}</td>
          <td>
            <button @click="updateStudent(student)">Редактировать</button>
            <button @click="deleteStudent(student.student_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="studentsEmpty" v-if="students.length<1">Студентов нет</div>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'StudentsTabs',
  data() {
    return {
      fullName: '',
      group: '',
      institution: '',
      admissionYear: null,
      age: null,
      subjects: '',
      grades: '',
      students: [],
      editStudent: null,
      currentYear: new Date().getFullYear(),
      selectedGroup: null,
      groupList: [],
      selectedUniversity: null,
      institutionList: [],
    } 
  },
  async beforeMount() {
    await this.getStudents() 
    await this.getGroups()
    await this.getUniversity()
  },
  methods: {
    getGroupName(groupId) {
      const group = this.groupList.find(group => String(group.group_id) === String(groupId))
      return group ? group.group_name : ''
    },
    getUniversityName(institutionId) {
      const institution = this.institutionList.find(inst => String(inst.university_id) === String(institutionId))
      return institution ? institution.university_name : ''
    },
    async createOrUpdateStudent() {
      try {
        const token = localStorage.getItem('accessToken')
        const studentData = {
          full_name: this.fullName,
          group: this.selectedGroup,
          institution: this.selectedUniversity,
          admission_year: this.admissionYear,
          age: this.age,
          subjects: this.subjects,
          grades: this.grades,
        } 

        if (this.editStudent) {
          await axios.put(`/students/${this.editStudent.student_id}`, studentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }) 
          this.editStudent = null 
        } else {
          await axios.post('/students', studentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }) 
        }

        this.clearForm()
        this.getStudents()
      } catch (error) {
        console.log(error)
      }
    },
    async getStudents() {
      try {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get('/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 

        this.students = response.data
      } catch (error) {
        console.log(error)
      }
    },
    updateStudent(student) {
      this.fullName = student.full_name
      this.selectedGroup = student.group
      this.grades = student.grades 
      this.selectedUniversity = student.institution
      this.subjects = student.subjects
      this.age = student.age
      this.editStudent = student
      this.admissionYear = student.admission_year
    },
    async deleteStudent(studentId) {
      try {
        const token = localStorage.getItem('accessToken')
        await axios.delete(`/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 
        this.getStudents() 
      } catch (error) {
        console.log(error)
      }
    },
    clearForm() {
      this.fullName = ''
      this.selectedGroup = null
      this.grades = ''
      this.selectedUniversity = null
      this.admissionYear = null
      this.age = null
      this.subjects = ''
      this.editStudent = null
    },
    async getGroups() {
      try {
        const token = localStorage.getItem('accessToken') 
        const response = await axios.get('/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }) 

        this.groupList = response.data 
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
        }) 

        this.institutionList = response.data 
      } catch (error) {
        console.log(error)
      }
    },
  },
} 
</script>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.student-form { 
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
    width: 45%;
    display: flex;
  }
  .multiselect{
    padding: 5px;
    margin-top: 25px;
    box-sizing: border-box;
    width: 45%;
    display: flex;
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

.studentsEmpty {
  padding-bottom: 15px;
}
.student-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  margin-bottom: 10px;
}

.student-table th, .student-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.student-table th:last-child, .student-table td:last-child {
  text-align: center;
}

.student-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

</style>