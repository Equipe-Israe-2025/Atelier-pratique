<template>
    <div class="skills-container">
      <div class="skills-wrapper">
        <h1 class="skills-title">Gestion des Compétences</h1>
  
        
        <div class="skills-form-card">
          <div class="form-group">
            <label for="nom" class="form-label">Nom de la compétence :</label>
            <input id="nom" class="form-input" type="text" v-model="form.nom" required />
          </div>
          <div class="form-button-container">
            <button class="add-button" @click="handleSubmit">
              {{ isEditing ? 'Modifier' : 'Ajouter' }}
            </button>
          </div>
        </div>
  
        
        <div class="skills-table-container">
          <div class="table-header">
            <div class="table-header-cell">Compétence</div>
            <div class="table-header-cell">Action</div>
          </div>
  
          <div v-if="competences.length > 0">
            <div
              class="table-row"
              v-for="competence in competences"
              :key="competence.id"
            >
              <div class="table-cell">{{ competence.nom }}</div>
              <div class="table-cell">
                <button class="action-button delete-button" @click="deleteCompetence(competence.id)">🗑</button>
                <button class="action-button edit-button" @click="editCompetence(competence)">✏</button>
              </div>
            </div>
          </div>
  
          <div v-else class="empty-message">
            Aucune compétence disponible
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        API_URL: 'http://localhost:3000/api/skills',
        competences: [],
        form: {
          id: null,
          nom: ''
        },
        isEditing: false
      }
    },
    created() {
      this.getCompetences()
    },
    methods: {
      async getCompetences() {
        const res = await axios.get(this.API_URL)
        this.competences = res.data
      },
      async handleSubmit() {
        if (!this.form.nom.trim()) return

        if (this.isEditing) {
          await axios.put(`${this.API_URL}/${this.form.id}`, { nom: this.form.nom })
        } else {
          await axios.post(this.API_URL, { nom: this.form.nom })
        }
        this.resetForm()
        this.getCompetences()
      },
      editCompetence(competence) {
        this.form = { ...competence }
        this.isEditing = true
      },
      async deleteCompetence(id) {
        await axios.delete(`${this.API_URL}/${id}`)
        this.getCompetences()
      },
      resetForm() {
        this.form = { id: null, nom: '' }
        this.isEditing = false
      }
    }
  }
</script>

  
<style scoped>
  
  .skills-container {
    min-height: 100vh;
    background: linear-gradient(to bottom right, #eff6ff, #f3e8ff);
    padding: 24px 40px;
    font-family: Arial, sans-serif;
  }
  
  .skills-wrapper {
    max-width: 1024px;
    margin: 0 auto;
  }
  
  .skills-title {
    font-size: 1.875rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2.5rem;
    color: #581c87;
  }
  
  .skills-form-card {
    padding: 1.5rem;
    margin-bottom: 2rem;
    background-color: #dbeafe;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .form-group {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .form-label {
    font-weight: 500;
    color: #581c87;
  }
  
  .form-input {
    width: 100%;
    height: 2.5rem;
    padding: 0 0.75rem;
    background-color: white;
    border: 1px solid #bfdbfe;
    border-radius: 0.375rem;
    outline: none;
  }
  
  .form-input:focus {
    border-color: #93c5fd;
  }
  
  .form-button-container {
    display: flex;
    justify-content: flex-end;
  }
  
  .add-button {
    background-color: #2563eb;
    color: white;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  .add-button:hover {
    background-color: #1d4ed8;
  }
  
  .skills-table-container {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: #bfdbfe;
  }
  
  .table-header-cell {
    padding: 1rem;
    font-weight: bold;
    color: #581c87;
    border-right: 1px solid #93c5fd;
  }
  
  .table-header-cell:last-child {
    border-right: none;
    text-align: center;
  }
  
  .table-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    border-top: 1px solid #dbeafe;
  }
  
  .table-cell {
    padding: 1rem;
    border-right: 1px solid #dbeafe;
  }
  
  .table-cell:last-child {
    border-right: none;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .action-button {
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .delete-button {
    background-color: #ef4444;
  }
  
  .delete-button:hover {
    background-color: #dc2626;
  }
  
  .edit-button {
    background-color: #60a5fa;
  }
  
  .edit-button:hover {
    background-color: #3b82f6;
  }
  
  .empty-message {
    padding: 1.5rem;
    text-align: center;
    color: #6b7280;
  }
  
  @media (min-width: 768px) {
    .form-group {
      grid-template-columns: 200}}
</style>