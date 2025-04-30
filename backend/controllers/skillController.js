import {
    createSkill,
    getAllSkills,
    //getSkillById,
    updateSkill,
    deleteSkill
  } from '../services/skillService.js';
  
  export const create = async (req, res) => {
    try {
      const skill = await createSkill(req.body);
      res.status(201).json(skill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const findAll = async (req, res) => {
    try {
      const skills = await getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
 /* export const findOne = async (req, res) => {
    try {
      const skill = await getSkillById(req.params.id);
      if (!skill) return res.status(404).json({ message: 'Skill not found' });
      res.json(skill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }*/
  
  export const update = async (req, res) => {
    try {
      const skill = await updateSkill(req.params.id, req.body);
      if (!skill) return res.status(404).json({ message: 'Skill not found' });
      res.json(skill);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const remove = async (req, res) => {
    try {
      const skill = await deleteSkill(req.params.id);
      if (!skill) return res.status(404).json({ message: 'Skill not found' });
      res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  