const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const User = require("../models/User.model");

const saltRounds =  10;


router.post("/signup", (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if(username === "" || password === ""){
    res.status(400).json({message: "Please enter valid username and password"});
    return
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
    return;
  }

  User.findOne({username})
    .then(user => {
        if(user){
            res.status(400).json({message: 'User already exists'});
            return;
        }
    })

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return User.create({username, password: hashedPassword, campus, course})
    .then(createdUser => { const { _id, username, campus, course } = createdUser; 
        const user = {_id, username, campus, course}
        res.status(201).json({user: user})
    })
    .catch(err => {console.log(err);
        res.status(500).json({message: "Internal Server Error"})
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(username === "" || password === ""){
        res.status(400).json({message: "Please enter a valid username and password"});
        return;
    }

    User.findOne({username})
    .then(foundUser => {
        if(!foundUser){
            res.status(400).json({message: "User not found"});
            return;
        }
        const validPassword = bcrypt.compareSync(password, foundUser.password);
        if(validPassword){
            const { _id, username } = foundUser;
            const payload = {_id, username}
            const authToken =  jwt.sign(payload,
                process.env.TOKEN_SECRET, 
                { algorithm: 'HS256', expiresIn: "6h" }
            );
            res.status(200).json({authToken: authToken});
        } else {
            res.status(400).json({message: "Incorrect username or password"});
        }
    })
    .catch(err => {console.log(err)
        res.status(500).json({message: "Internal Server Error"})
    })
})

router.get("/verify", isAuthenticated, (req, res)=> {
    res.status(200).json(req.payload)
})

module.exports = router;
