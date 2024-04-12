const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const {locals} = require("express/lib/application");

/**
 * GET /
 * Homepage
 */

exports.homepage = async  (req, res) => {

    const locals = {
        title: 'User Management',
        description: 'NodeJS User Management System',
    }

    res.render('index', locals);
}

/**
 * GET /
 * New Customer Form
 */

exports.addCustomer = async  (  req, res) => {

    const locals = {
        title: 'Add New Customer',
        description: 'NodeJS User Management System',
    }

    res.render('customer/add', locals);
}

/**
 * POST /
 * Create New Customer
 */

exports.postCustomer = async  (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
    });

    try {
        await Customer.create(newCustomer);
        res.redirect('/')

    } catch(err) {
        console.log(err);
    }
}