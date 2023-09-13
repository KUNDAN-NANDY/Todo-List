const TodoLists = require('../models/todo_list');
const mongoose = require('mongoose');

// Function for formatting dates
function dateValue(dueDate){
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'] // static value for implementing monthe value


    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate =dueDate[2]+'-'+monapp+'-'+dueDate[0] // displaying date in dd-mm-yyyy formate
    return newdate;
}


// Function for rendering the home page
module.exports.home = async function (req, res) {
    try {
        const todos = await TodoLists.find({}).exec();

        // Pass successMessage to the view
        const successMessage = "Data saved"; // Replace this with your actual success message

        return res.render('home', {
            title: "Home",
            todoList: todos,
            successMessage: successMessage // Pass successMessage to the view
        });
    } catch (err) {
        console.error("Error in fetching Todos:", err);
        return res.status(500).send("Error fetching Todos");
    }
};


// Function for creating todo list
module.exports.createTodo = async function(req, res) {
    try {
        // Splitting date and formatting it
        const newdate = dateValue(req.body.dateValue.split('-'));

        // Creating a new todo item
        const newTodo = await TodoLists.create({
            desc: req.body.desc,
            category: req.body.category,
            dueDate: newdate
        });
        // Send a success message
        const successMessage = "Data saved";

        // Redirect to the home page and include the success message as a query parameter
        return res.redirect('/?successMessage=' + encodeURIComponent(successMessage));
    } 
    catch (err) {
        console.error("Error in creating a Todo:", err);
        return res.status(500).send("Error creating a Todo");
    }
};

// Deleting A Contact
module.exports.deleteTodo = async function(req, res){
    try {
        // Get the id from the URL query
        let id = req.query.id;

        // Check if id is provided and valid
        if (!id) {
            return res.status(400).send('Invalid or missing Todo id.');
        }

        // Find the contact by id and delete it
        const deletedTodo = await TodoLists.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).send('Todo not found.');
        }

        return res.redirect('/');
    } catch (err) {
        console.error('Error deleting a todo from the database:', err);
        return res.status(500).send('Error deleting todo.');
    }
};
