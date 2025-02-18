const express = require('express');
const { createRole } = require('../controllers/roleController');
const router = express.Router();

// POST route to create a new role
router.post('/roles', createRole);

module.exports = router;
