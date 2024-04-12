const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const {locals} = require("express/lib/application");

/**
 * GET /
 * Homepage
 */

exports.homepage = async  (req, res) => {

    const messages = await req.flash("info");

    const locals = {
        title: 'User Management',
        description: 'NodeJS User Management System',
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        
        const count =  await Customer.countDocuments();

        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
        });

    } catch (err) {
        console.error(err);
    }
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
        await req.flash('info', 'New customer has been created');

        res.redirect('/')

    } catch(err) {
        console.log(err);
    }
}