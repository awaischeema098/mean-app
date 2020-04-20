const express = require('express');
const UserControllers = require('../controllers/user');

const router = express.Router();

router.post("/sigup", UserControllers.createUser)

router.post("/login", UserControllers.userLogin )


router.get("/active", UserControllers.activeAccount);

router.delete("", (req, res, next) => {
    
});
module.exports  = router;