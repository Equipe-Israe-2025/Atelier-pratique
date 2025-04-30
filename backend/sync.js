import sequelize from './config/db.js';
import { DataTypes } from 'sequelize';

// Importation des modèles
import defineUser from './models/user.js';
import defineSkill from './models/skill.js';
import defineUserSkill from './models/user_skill.js';

// Création des instances de modèles
const user = defineUser(sequelize, DataTypes);
const skill = defineSkill(sequelize, DataTypes);
const user_skill = defineUserSkill(sequelize, DataTypes);

// Regroupement dans un objet
const db = {
  sequelize,
  user,
  skill,
  user_skill,
};

// Application des associations
Object.values(db).forEach((model) => {
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

// Synchronisation
try {
  await sequelize.sync({ alter: true });
  console.log('Base synchronisée avec succès');

  const [tables] = await sequelize.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  console.log(' Tables créées:', tables.map(t => t.table_name).join(', '));
} catch (error) {
  console.error(' Erreur de synchronisation:', error);
  process.exit(1);
}

export default db;
