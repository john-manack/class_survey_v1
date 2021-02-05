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
    console.log("Request body: ", req.body)
    for (let key in req.body) {
        await surveyModel.updateEntry(key, req.body[key]);
    }
    res.redirect('/');
})

module.exports = router;