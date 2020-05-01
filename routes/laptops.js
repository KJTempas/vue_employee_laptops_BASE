var express = require('express')
var Laptop = require('../models').Laptop
var Sequelize = require('sequelize')

var router = express.Router() 
//these are all API route handlers
router.get('/', function(req, res, next){
    Laptop.findAll({order: ['serialNumber']}, {where: req.query}).then( laptops => {
        return res.json(laptops)
    }).catch( err => next(err) )
})

router.post('/', function(req, res, next) {
    Laptop.create(req.body).then( (data) => {
        return res.send('ok') //if additio of laptop to Db works, return OK
    }).catch( err => {
        console.log(err) //if problem w/ validation, return error message
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(400).json(messages)
            } //if other error, pass to error handlers
            return next(err)
        })
    })
//this route gets details about one laptop, the with with a certain id
router.get('/:id', function(req, res, nest) {
    Laptop.findByPk(req.params.id).then(laptop => {
        if(laptop) {
            res.json(laptop)
        } else {
            res.status(404).send('Laptop not found')
        }
    }).catch( err => next (err) )
})
//this route to modify one laptop - the one w/ this id
router.patch('/:id', function(req, res, next){
    Laptop.update(
        req.body, {
            where: {
                id: req.params.id
            }

        }).then( (rowsModified) => {
            if (!rowsModified[0]) { //if no rows were modified
                return res.status(404).send('Not found')
            } else {
                return res.send('ok')
            }
        }).catch( err => { //if there were validation errors, send error message
            if (err instanceof Sequelize.ValidationError) {
                let messages = err.errors.map( (e) => e.message)
                return res.status(400).json(messages)
            }
            return next(err)
        })
    
})

router.delete('/:id', function(req, res, next){
    Laptop.destroy({where: {id: req.params.id}}).then( rowsModified => {
        return res.send('ok')
    }).catch( err => next(err) )
})

router.patch('/:id/employee', function(req, res, next){
    Laptop.update(req.body, {where: {id: req.params.id}}).then( (rowsModified) => {
        if (rowsModified) {
            return res.send('ok')
        } else {
            return res.status(404).send('Laptop not found')
        }
    }).catch( err => {
        //cold be a foreign key error - employee IOD didn't exist
        if(err instanceof Sequelize.ForeignKeyConstraintError) {
            return res.status(500).send('Employee does not exist, unable to assign laptop.')
        } else {
            console.log(err)
            return res.status(500).send('Unable to assign laptop')
        }
    })
})

module.exports = router 
