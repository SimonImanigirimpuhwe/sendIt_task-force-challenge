import { Router } from 'express';
import todoControllers from '../controllers/todo';
import auth from '../middlewares/auth';
import { createTodoValidation, updateTodoValidation } from '../middlewares/validation';

const todoRoutes = new Router();

/**
 * @swagger
 *
 * /todos:
 *   post:
 *    tags: [To-Do]
 *    summary: Authenticated user can create To-DO.
 *    description: Authenticated user can create one or more To-Do.
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/todo'
 *    responses:
 *     '200':
 *       description: New To-Do created
 *     '400':
 *       description: Bad request
 *     '401':
 *       description: Access Denied
 *     '403':
 *       description: Unauthorized
 *     '500':
 *       description: Internal server error
 * components:
 *    schemas:
 *      todo:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - priority
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          priority:
 *             type: string
 */
todoRoutes.post('/', auth, createTodoValidation, todoControllers.addTodo);

/**
 * @swagger
 * /todos:
 *  get:
 *    tags: [To-Do]
 *    summary: Authenticated user can get all To-DO.
 *    description: Authenticated user can get all his/her own To-Do.
 *    responses:
 *      '200':
 *        description: All To-Do retrieved
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Access Denied
 *      '403':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
*/
todoRoutes.get('/', auth, todoControllers.getTodos);

/**
 * @swagger
 * /todos/{id}:
 *  get:
 *    tags: [To-Do]
 *    summary: Get specific To-Do.
 *    description: Authenticated user can get a single To-Do.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: todoId
 *    responses:
 *      '200':
 *        description: Specified To-Do retrieved
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Access Denied
 *      '403':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
*/
todoRoutes.get('/:id', auth, todoControllers.getOneTodo);

/**
 * @swagger
 *
 * /todos/{id}:
 *   put:
 *    tags: [To-Do]
 *    summary: Update To-Do
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Todo Id
 *        required: true
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *            schema:
 *              $ref: '#/components/schemas/updateTodo'
 *    responses:
 *     '200':
 *       description: To-DO updated successfully
 *     '400':
 *       description: Bad request
 *     '401':
 *       description: Access Denied
 *     '403':
 *       description: Unauthorized
 *     '500':
 *       description: Internal server error
 * components:
 *    schemas:
 *      updateTodo:
 *        type: object
 *        optional:
 *          - title
 *          - description
 *          - priority
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          priority:
 *             type: string
 */
todoRoutes.put('/:id', auth, updateTodoValidation, todoControllers.updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *    tags: [To-Do]
 *    summary: Delete specific To-Do.
 *    description: Authenticated user can delete a single To-Do.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          minimum: 1
 *        description: todoId
 *    responses:
 *      '200':
 *        description: To-Do deleted successfully
 *      '400':
 *        description: Bad request
 *      '401':
 *        description: Access Denied
 *      '403':
 *        description: Unauthorized
 *      '500':
 *        description: Internal server error
*/
todoRoutes.delete('/:id', auth, todoControllers.deleteTodo);

export default todoRoutes;