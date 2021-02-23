import models from '../models';

const { Todo } = models;

export default {
    /**
     * @description This allow user to create new To-Do
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} The response object
     */
    addTodo: async (req, res) => {
        const { id } = req.user;
        const { title, description, priority } = req.body;
        const existedTodo = await Todo.findOne({ where: {  userId: id, title }});

        if (existedTodo) return res.status(400).json({ msg: 'Todo added before'});

        const newTodo = await Todo.create({
            userId: id,
            title,
            description,
            priority
        });
        return res.status(201).json({ msg: 'New To-Do created', newTodo})
    },
    
    /**
     * @description This allow user to get all his/her To-Do
     * @param {object} req - Request object
     * @param {object} res - Request response
     * @returns {object} Response object
     */
    getTodos: async (req, res) => {
        try {
            const { id } = req.user;
            const allTodos = await Todo.findAll({
                where: { userId: id}
            });
            if (!allTodos || allTodos.length === 0) return res.status(404).json({ msg: 'No To-Dos found'});
    
            return res.status(200).json({ msg: 'All To-Do retrieved', allTodos})
            
        } catch (error) {
           return res.status(500).json({ msg: 'Internal server error'}) 
        }
    },

    /**
     * @description This allow user to get single To-Do
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Response object 
     */
    getOneTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const uniqueTodo = await Todo.findOne({ where: { userId: req.user.id, id }});
            
            if (!uniqueTodo) return res.status(404).json({ msg: 'No To-Do with such id'});
    
            return res.status(200).json({ msg: 'Single To-Do retrieved', uniqueTodo})
            
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error'}) 
        }
    },

    /**
     * @description This allow user to update selected To-Do
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} Response object
     */
    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const uniqueTodo = await Todo.findOne({ where: { userId: req.user.id, id }});
            
            if (!uniqueTodo) return res.status(404).json({ msg: 'No To-Do with such id'});

            const updatedTodo = await uniqueTodo.update(req.body);
            return res.status(200).json({ msg: 'To-Do updated successfully', updatedTodo})
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error'}) 
        }
    },

    /**
     * @description This allow user to delete a specific To-Do
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {number} id -Id of To-Do
     * @returns {object} Response object
     */
    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const uniqueTodo = await Todo.findOne({ where: { userId: req.user.id, id }});
            
            if (!uniqueTodo) return res.status(404).json({ msg: 'No To-Do with such id'});

            await uniqueTodo.destroy();
            return res.status(200).json({ msg: 'To-Do deleted successfully'})
        } catch (error) {
            return res.status(500).json({ msg: 'Internal server error'})  
        }
    }
}