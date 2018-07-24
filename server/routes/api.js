// model user.js should GET the user information, right now we don't have functinoality to update user information after signin
// model user-chat.js should GET and POST the chart the user wants to save
// model user-excahnge.js should GET and POST excahnge data, do calculations as needed
// model user-notes.js should GET and POST and DELETE data in a notes section

const express = require('express');

var Note = require('../models/note');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this dashboard"
    });
});

router.get('/notes/:id', (req, res) => {
    var userID = req.params.id;
    Note.find({ userID: userID }, function (err, notes) {
        if (err) return console.error(err);
        res.status(200).json(notes);
    });
});

router.post('/notes', (req, res) => {

    var submission = new Note({
        userID: req.body.userID,
        note: req.body.note
    });

    submission.save(function (err, data) {
        if (err) return console.error(err);
        console.log(data);
    });
});

module.exports = router;