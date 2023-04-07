const  express  = require("express");
const { getAllQuestions } = require("./controller/question");

const router = express.Router();

router.get('/answer',getAllQuestions)
module.exports= router