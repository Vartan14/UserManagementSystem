const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 *  Customer Routes
 */

// Home
router.get('/', customerController.homepage);

// About page
router.get('/about', customerController.about)

// Create new customer
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

// View customer info
router.get('/view/:id', customerController.viewCustomer);

// Edit customer info
router.get('/edit/:id', customerController.editCustomer);
router.put('/edit/:id', customerController.editPostCustomer);

// Delete customer
router.delete('/edit/:id', customerController.deleteCustomer);

// Search
router.post('/search', customerController.searchCustomers);


module.exports = router;
