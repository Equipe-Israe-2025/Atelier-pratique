import express from 'express';
import {
  getUsers, getUser, createNewUser,
  updateExistingUser, removeUser,
  getUserWithSkills
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createNewUser);
router.put('/:id', updateExistingUser);
router.delete('/:id', removeUser);
router.get('/skills/:id', getUserWithSkills); // get all skills of a user

export default router;
