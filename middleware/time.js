const express = require('express')
const router = express.Router();

const logTime = (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
};

const logMethod = (req, res, next) => {
    console.log("Method: ", req.method);
    next();
};

router.use(logTime);
router.use(logMethod);

module.exports = router;