// ***Remember that all routes in this file are prefixed with /events

// Require necessary modules
const express = require('express');
const router = express.Router();
const Event = require('../models/event');

//Index Route - GET all /events
router.get('/', function (req, res) {
    try {
    Event.find({createdBy: req.query.id})
        .then(events => {
            res.json(events);
        });
    }
    catch (err) {
        res.status
    }
})

//New Route - handled in front end

//Delete Route - DELETE /events/:id
router.delete('/:id', function (req, res) {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.send("Event deleted successfully"))
        .catch(err => res.send("Error deleting event"));
})

//Update Route - PUT /events/:id
router.put('/:id', async (req, res) => {
    const updatedEvent = {...req.body};
    await Event.findByIdAndUpdate(req.params.id, updatedEvent, {new: true})
    .then((event) => {
        res.json(event);
    })
    .catch((err) => {
        res.send("Error updating event");
    })
})

//Create Route - POST /events
router.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.json(newEvent);
    }
    catch (err) {
        res.status(400).send("Error creating event");
    }
})

//Edit Route - handled in front end

//Show route - handled in front end
module.exports = router;