const express = require('express');
const router = express.Router();
const signUpTemplateCopy = require('../models/SignUpModels');
const bcrypt = require('bcrypt');


router.post('/signup', async (req, res) => {
    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, saltPassword);

    const signUpUser = new signUpTemplateCopy({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: securePassword
    });
    signUpUser.save()
        .then(data => {
            res.json(data);
        }).catch(error => {
            res.json(error);
        });
});

router.get('/getAll', async (req, res) => {
    const allUsers = await signUpTemplateCopy.find();
    res.json(allUsers);
});

//delete user
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const deleteUser = await signUpTemplateCopy.findByIdAndDelete(id);
    res.json(deleteUser);
});

//update user
router.put('/update/:id', async (req, res) => {
    const id = req.params.id;
    const updateUser = await signUpTemplateCopy.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updateUser);
});

router.get('/signin');
module.exports = router;