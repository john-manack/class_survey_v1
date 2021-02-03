'use strict';

const express = require('express'),
    router = express.Router(),
    surveyModel = require('../models/surveyModel');

router.get('/', async (req, res) => {
    const surveyData = await surveyModel.getAll();
    
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

module.exports = router;