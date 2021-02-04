'use strict';

const express = require('express'),
    router = express.Router(),
    surveyModel = require('../models/surveyModel');

router.get('/', async (req, res) => {
    const surveyData = await surveyModel.getAll();
    const rankingData = await surveyModel.getRankings();
    console.log("survey data: ", surveyData);
    console.log("ranking data: ", rankingData);

    
    res.render('template', {
        locals: {
            title: "Language Rankings",
            surveyData,
            rankingData
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