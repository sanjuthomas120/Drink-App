const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/MenuController');

router.post('/menus', MenuController.createMenu);
router.get('/menus', MenuController.getMenus);
router.get('/menus/:menuId/items', MenuController.getMenuItems);
router.post('/menus/:menuId/items', MenuController.addMenuItems);

module.exports = router;