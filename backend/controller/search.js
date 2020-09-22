var Result = require("../models/result");
var axios = require("axios");

module.exports = {
    async findSearch(req, res) {
        try {
            const Word = req.query.searchWord;

            const searchData = await Result.findOne({ searchWord: Word });
            if (searchData) {
                return res.json(searchData);
            }
            try {
                const { data } = await axios.get(`https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${Word}`, {
                    headers: {
                        app_id: "28f9f074",
                        app_key: "5edc7359fa083cb868e7d8dce5e62b67"
                    }
                })
                await Result.create({ searchWord: Word, result: data });
                res.json({ _id: Word, searchWord: Word, result: data });
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error)
            if (error.name === "MongoError") {
                return res.status(400).send(`Validation Error: ${error.message}`)
            }
            res.status(400).send(error);
        }
    },
    async findAllWord(req, res) {
        try {
            var result = await Result.find();
            res.json(result);
        } catch (error) {
            console.log(error)
            if (error.name === "MongoError") {
                return res.status(400).send(`Validation Error: ${error.message}`)
            }
            res.status(400).send(error);

        }
    },
    async addWordInSearch(req, res) {
        console.log(req.body)
        try {
            var word = req.body.searchWord;
            var language = req.body.language;
            var definition = req.body.definition;
            console.log(word, language, definition)
            var result = {
                "id": word,
                "metadata": {
                    "provider": "my-Self"
                },
                "results": [
                    {
                        "id": word,
                        "language": language,
                        "lexicalEntries": [
                            {
                                "entries": [
                                    {
                                        "notes": [{ "text": definition }]
                                    }
                                ]
                            }
                        ],
                        "word": word

                    }
                ],

            }
            await Result.create({ result, searchWord: word });
            return res.json({ _id: word, searchWord: word, result })
        } catch (error) {
            console.log(error)
            if (error.code === 11000) {
                return res.status(400).json({ error: "word is already exists" });
            }
            res.status(400).send(error);
        }
    }
}



