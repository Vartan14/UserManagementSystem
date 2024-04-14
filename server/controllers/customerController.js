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

    let perPage = 8;
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
 * GET
 * About
 */

exports.about = async  (req, res) => {

    const locals = {
        title: 'About',
        GitHubRef: 'https://github.com/Vartan14/UserManagementSystem',
        description: 'NodeJS User Management System',
    }

    try {
        res.render('about', {locals})
    }
    catch (err) {
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
        details: req.body.details,
    });

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'New customer has been created');

        res.redirect('/')

    } catch(err) {
        console.log(err);
    }
}

/**
 * GET /
 * Customer Data
 */

exports.viewCustomer = async  (req, res) => {

    try {
        const customer = await Customer.findOne({_id: req.params.id});

        const locals = {
            title: 'View Customer Detail',
            description: 'NodeJS User Management System',
        }

        res.render('customer/view', {locals, customer});

    } catch (err) {
        console.error(err);
    }
}


/**
 * GET /
 * Edit customer data
 */

exports.editCustomer = async  (req, res) => {
        try {
        const customer = await Customer.findOne({_id: req.params.id});

        const locals = {
            title: 'Edit Customer Data',
            description: 'NodeJS User Management System',
        }

        res.render('customer/edit', {locals, customer});

    } catch (err) {
        console.error(err);
    }
}

/**
 * PUT /
 * Update Customer Data
 */
exports.editPostCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    res.redirect(`/`);

    console.log("user edited");
  } catch (error) {
    console.log(error);
  }
};

/**
 * DELETE /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });

    res.redirect('/');

    console.log("user deleted");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};