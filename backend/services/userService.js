import db from '../sync.js';

const { user, user_skill, skill } = db;


export async function createUser(data) {
    return await user.create(data);
}
  
export async function updateUser(id, data) {
    const u = await user.findByPk(id);
    if (!u) return null;
    return await u.update(data);
}
  
export async function deleteUser(id) {
    const u = await user.findByPk(id);
    if (!u) return null;
    return await u.destroy();
}


//Fonction pour récupérer tous les utilisateurs
export async function getAllUsers() {
  return await user.findAll();
}

//Fonction pour récupérer les compétences d’un utilisateur donné
export async function getUserSkills(userId) {
  return await user.findByPk(userId, {
    include: {
      model: user_skill,
      include: {
        model: skill,
        as: 'skill',
        attributes: ['nom', 'description', 'taux'],
      },
    },
  });
}

