import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './sync.js';

import userRoutes from './routes/userRoute.js';
import skillRoutes from './routes/skillRoute.js';
// Ajoute d'autres routes si besoin (ex: userSkillRoutes)

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à la base de données
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
})();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
// app.use('/api/user-skills', userSkillRoutes); // Si tu ajoutes ça plus tard

// Serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur : http://localhost:${PORT}`);
});
