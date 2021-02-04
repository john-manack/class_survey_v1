'use strict';

const express = require('express'),
    router = express.Router(),
    surveyModel = require('../models/surveyModel');

router.get('/', async (req, res) => {
    const surveyData = await surveyModel.getAll(),
        rankingData = await surveyModel.getRankings();

    
    res.render('template', {
        locals: {
            title: "John's Language Rankings",
            data: surveyData,
        },
        partials: {
            body: "partials/home"
        }
    });
});

router.post('/', async (req, res) => {
    const { new_ranking } = req.body;
    console.log('Req body is: ', req.body);
    console.log('New Ranking is: ', new_ranking);
    const response = await surveyModel.updateEntry(new_ranking)
    console.log('Update response is: ', response);
    if (response.rowCount >= 1) {
        res.redirect('/')
    } else {
        res.sendStatus(500);
    }
})

module.exports = router;