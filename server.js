
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const logger = require("./logger.js")
require('dotenv').config({ path: './.env' });
const Athlete = require("./athlete.model.js")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT || 4000;
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("connection completed......")

    }).catch((error) => {
        console.log(error.message)
        console.log(error.message || "connection failed...")
        logger.logger.log("error", error.message)

    })



app.get('/api/', (req, res) => {

    res.send('Api is working fine ......')
})






app.get('/api/getAllAthlete', (req, res) => {
    Athlete.find().then(users => {
        res.status(200).json({ data: users })

    }).catch(err => {

    })

})

app.post("/api/register", async (req, res) => {

    console.log(req.body)
    try {
        const { name, dob, location, team, gender, sports, about, interests, profileImage } = req.body;
        try {
            console.log({ name, dob, location, team, gender, sports, about, interests, profileImage })
            const athleteUser = new Athlete({
                name, dob, location, team, gender, sports, about, interests, profileImage
            })
            await athleteUser.save();
            res.status(200).json({ message: "Saved Successfully" })



        } catch (error) {
            res.status(422).json({ message: error.message || "Somethig went wrong" })


        }



    } catch (error) {

        res.status(422).json({ message: error.message || "Somethig went wrong" })
        logger.logger.log("error", error.message)
    }

});


app.put("/api/update/:id", async (req, res) => {

    try {


        try {
            const { name, dob, location, team, gender, sports, about, interests, profileImage } = req.body;

            await Athlete.findByIdAndUpdate(
                { _id: req.params.id },
                { name, dob, location, team, gender, sports, about, interests, profileImage }
                , { new: true }
            )
            res.status(200).json({ message: "update Successfully" })



        } catch (error) {
            res.status(422).json({ message: error.message || "Update Failed" })


        }



    } catch (error) {

        res.status(422).json({ message: error.message || "Somethig went wrong" })
        logger.logger.log("error", error.message)
    }

});





app.listen(port, () => console.log("Node server listening on port " + port));
