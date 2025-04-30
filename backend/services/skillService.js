import Skill from '../sync.js';

export async function createSkill(data) {
  return await Skill.create(data);
}

export async function getAllSkills() {
  return await Skill.findAll();
}

/*export async function getSkillById(id) {
  return await Skill.findByPk(id);
}*/

export async function updateSkill(id, data) {
  const skill = await Skill.findByPk(id);
  if (!skill) return null;
  return await skill.update(data);
}

export async function deleteSkill(id) {
  const skill = await Skill.findByPk(id);
  if (!skill) return null;
  await skill.destroy();
  return skill;
}