import { createRouter, createWebHistory } from 'vue-router'
import Personne from '../views/Personne.vue'
import Competence from '../views/Competence.vue'
import PersonneCom from '../views/PersonneCom.vue'
import Notfound from '../views/NotFound.vue'

const routes = [
  {
    path:'/',
    redirect:'/personne'
  },
  {
    path: '/personne',
    name: 'personne',
    component: Personne
  },
  {
    path:'/competence',
    name:'competence',
    component:Competence
  },
  {
    path:'/personne/:id',
    name:'personnecompetence',
    component:PersonneCom
  },
  {
    path:'/:catchAll(.*)',
    component:Notfound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
