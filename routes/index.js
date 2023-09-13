const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.post('/create_todo', homeController.createTodo);
router.get('/delete_todo', homeController.deleteTodo);

module.exports = router;
