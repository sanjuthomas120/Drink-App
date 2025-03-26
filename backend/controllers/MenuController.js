const Menu = require('../models/Menu');
const MenuItem = require('../models/AddMenuItem');

exports.createMenu = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newMenu = new Menu({ name, description });
        await newMenu.save();
        res.status(201).json({ success: true, data: newMenu });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: menus });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getMenuItems = async (req, res) => {
    const { menuId } = req.params;
    const { page = 1, limit = 3 } = req.query; 

    try {
        const menuExists = await Menu.findById(menuId);
        if (!menuExists) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        const totalItems = await MenuItem.countDocuments({ menuId });

        const menuItems = await MenuItem.find({ menuId })
            .sort({ createdAt: -1 }) 
            .skip((parseInt(page) - 1) * parseInt(limit)) 
            .limit(parseInt(limit));

        res.json({ success: true, data: menuItems, totalItems }); 
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching menu items" });
    }
};



exports.addMenuItems = async (req, res) => {
    const { menuId } = req.params;
    const { name, price, description } = req.body;

    try {
       
        const menuExists = await Menu.findById(menuId);
        if (!menuExists) {
            return res.status(404).json({ success: false, message: "Menu not found" });
        }

        const newMenuItem = new MenuItem({ menuId, name, price, description });
        await newMenuItem.save();

        res.json({ success: true, message: "Menu item added successfully", data: newMenuItem });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding menu item" });
    }
};
