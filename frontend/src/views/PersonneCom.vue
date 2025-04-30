<template>
    <div class="skills-container">
      <div class="skills-wrapper">
        <h1 class="skills-title">Gestion des Compétences de {{ this.nompersonne }} {{ this.prenompersonne }}</h1>
        
        <!-- Add skill form -->
        <div class="skills-form-card">
          <div class="form-group">
            <label for="competence" class="form-label">Nom:</label>
            <input id="competence" class="form-input" type="text" v-model="nom">
          </div>
          <div class="form-group">
            <label for="description" class="form-label">note:</label>
            <input id="description" class="form-input" type="text" v-model="taux">
          </div>
          <div class="form-button-container">
            <button id="add-button" class="add-button" @click="ajouterCompetence">
              <span v-if="!this.saveMode">Ajouter</span>
              <span v-else>Sauvegarder</span>
              </button>
          </div>
        </div>
  
        <!-- Skills table -->
        <div class="skills-table-container">
          <div class="table-header">
            <div class="table-header-cell">Nom</div>
            <div class="table-header-cell">Taux</div>
            <div class="table-header-cell">Action</div>
          </div>
          
          <div id="skills-list" v-for="competence in competences" :key="competence.id">
            <!-- Skills will be added here dynamically -->
             
              <div class="table-row">
                
              <div class="table-cell">{{competence.nom}}</div>
           
            
              <div class="table-cell">{{competence.note}}</div>
            
              <div class="table-cell">
                <button class="action-button delete-button" @click="suprimerCompetence(competence.id)">🗑️</button>
                <button class="action-button edit-button" @click="modifierCompetence(competence.id)">✏️</button>
              </div>
            </div>
             
            
          </div>
          
          <div id="empty-message" class="empty-message" style="display: none;">
            Aucune compétence disponible
          </div>
        </div>
      </div>
    </div>
  
  
  
  
  </template>
  
  <script>
  import axios from 'axios'
  export default {
      data(){
          return{
            nompersonne:'',
            prenompersonne:'',
              competences:[],
              nom:'',
              taux:'',
              saveMode:false,
              idcompetence:''
          }
      }
      ,methods:{
          async prendreCompetences(){
              const response=await axios.get('http://localhost:3000/skills');
              this.competences=response.data;
          },
          async ajouterCompetence(){
              if(!this.saveMode){
                  await axios.post('http://localhost:3000/skills',{nom:this.nom,taux:this.taux})
              }else{
                  await axios.patch('http://localhost:3000/skills/'+this.idcompetence,{nom:this.nom,taux:this.taux})
                  this.saveMode=false
              }
              this.nom=this.taux=this.idcompetence='';
          },
          async suprimerCompetence(id){
              await axios.delete('http://localhost:3000/skills/'+id)
          },
          async modifierCompetence(id){
              await axios.get('http://localhost:3000/skills/'+id)
              .then(res=>{
                  this.nom=res.data.nom
                  this.taux=res.data.taux
              })
              this.saveMode=true;
              this.idcompetence=id;
          },
          async prendreUtilisateur(){
            const res=await axios.get('http://localhost:3000/users/skills/'+this.$route.params.id)
            this.nompersonne=res.data.nom;
            this.prenompersonne=res.data.prenom;
          }
  
  
      }
      ,

      mounted(){
          this.prendreCompetences();
          this.prendreUtilisateur();
          
      },
      updated(){
          this.prendreCompetences();
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
  
  /* Form card styles */
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
  
  /* Skills table */
  .skills-table-container {
    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .table-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    grid-template-columns: 1fr 1fr 1fr;
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
  
  /* Responsive adjustments */
  @media (min-width: 768px) {
    .form-group {
      grid-template-columns: 200px 1fr;
    }
  }
  </style>