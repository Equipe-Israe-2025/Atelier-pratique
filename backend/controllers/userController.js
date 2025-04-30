
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserSkills
  } from '../services/userService.js';
  
  export const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
  };
  
  export const getUser = async (req, res) => {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };
  
  export const createNewUser = async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  };
  
  export const updateExistingUser = async (req, res) => {
    const updated = await updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  };
  
  export const removeUser = async (req, res) => {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  };
  
  export const getUserWithSkills = async (req, res) => {
    const data = await getUserSkills(req.params.id);
    if (!data) return res.status(404).json({ message: 'User not found' });
    res.json(data);
  };
  


