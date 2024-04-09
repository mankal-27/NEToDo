const Todo = require("../models/todo.models");

//create todos

let todos = [];

const createTodo = async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({title})
    try {
        const savedTodo = await newTodo.save();
        res.json({
            message:'Todo created Successfully',
            todo: savedTodo
        })
    } catch (err) {
        console.error('Error creating todo:', err);
        res.status(500).json({
            message:'Error creating todo'
        })
        
    }
};

const getTodos = (req, res) => {
    res.json({todos})
}

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if(todoIndex !== -1){
        todos[todoIndex].completed = completed;
        res.json({
            message:'Todo updated Successfully',
            todo: todos[todoIndex]
        })
    }else{
        res.status(404).json({
            message: 'Todo Not found'
        })
    }
};

const deleteTodo = (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if(todoIndex !== -1){
        todos.splice(todoIndex,1);
        res.json({
            message: "Todo Deleted Successfully"
        })
    }else{
        res.status(404).json({
            message: "Todo Not Found"
        })
    }
}


module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
}