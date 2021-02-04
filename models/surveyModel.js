'use strict';
const db = require('./conn');

class SurveyModel {
    constructor(topic_name, ranking_value, ranking_title) {
        this.topic_name = topic_name;
        this.ranking_value = ranking_value;
        this.ranking_title = ranking_title;
    };

    static async getAll() {
        const response = await db.any(`
            SELECT topic_name, ranking_value, ranking_title
            FROM topics
            INNER JOIN ranking_scale
                ON topics.topic_score = ranking_scale.id
            ORDER BY ranking_value DESC;
        `);
        return response;
    };

    static async getRankings() {
        const response = await db.any(`
            SELECT * FROM ranking_scale;
        `)
    }

    static async updateEntry(new_score){
        const response = await db.result(`
        UPDATE topics
        SET topic_score = $1
        WHERE id = 1;
        `, [new_score]);
        return response;
    }
}

module.exports = SurveyModel;