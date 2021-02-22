import { Router } from 'express';
import todoControllers from '../../controllers/todo';
import auth from '../../middlewares/auth';
import { createTodoValidation, updateTodoValidation } from '../../middlewares/validation';

const todoRoutes = new Router();

todoRoutes.post('/', auth, createTodoValidation, todoControllers.addTodo);
todoRoutes.get('/', auth, todoControllers.getTodos);
todoRoutes.get('/:id', auth, todoControllers.getOneTodo);
todoRoutes.put('/:id', auth, updateTodoValidation, todoControllers.updateTodo);
todoRoutes.delete('/:id', auth, todoControllers.deleteTodo);

export default todoRoutes;