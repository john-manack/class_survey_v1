CREATE TABLE ranking_scale (
    id serial PRIMARY KEY,
    ranking_title text NOT NULL,
    ranking_value integer NOT NULL
);

CREATE TABLE topics (
    id serial PRIMARY KEY,
    topic_name text NOT NULL,
    topic_score integer
);