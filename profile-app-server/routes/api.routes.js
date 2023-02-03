const router = require("express").Router();
const User = require("../models/User.model").default;
const { isAuthenticated } = require("../middleware/jwt.middleware")
const fileUploader = require("../config/cloudinary.config");

router.put('/users', isAuthenticated, (req, res) => {
   const { _id } = req.payload;
   const { image } = req.body;
   if(!image){
    res.status(400).json({message: "Please insert a valid image url"})
   }

   User.findByIdAndUpdate(_id, {image: image})
        .then(updatedUser => res.status(200).json({user: updatedUser}))
        .catch(err => {console.log(err);
            res.server(500).json({message: "Internal Server Error"})
        })

})

router.get('/users', isAuthenticated, (req, res) => {
    const { _id } = req.payload;
    User.findById(_id)
        .then(foundUser => res.status(200).json({user: foundUser}))
        .catch(err => {console.log(err)
            res.status(500).json({message: "Internal Server Error"})
        })
})


router.post('/upload', fileUploader.single("imageUrl"), (req, res) => {
    if(!req.file) {
        res.status(400).json({message: "Please upload your photo"});
        return;
    }
    res.status(200).json({image: req.file.path})
});
        


module.exports = router;