// Name
// Date of Birth
// Location
// Team (e.g. New York Giants)
// Gender
// Sports (Can Multiple)
// About
// Interests
// Profile Image

const mongoose=require("mongoose");
const athleteSchema=new mongoose.Schema({
    name:{
        type:String,

    },
    dob:{
        type:String
    },
    location:{
        type:String
    },
    team:{
        type:String
    },
    gender:{
        type:String
    },
    sports:{
        type:String
    },
    about:{
        type:String
    },
    interests:{
        type:String
    },
    profileImage:{
        type:String
    },
});

const Athlete=mongoose.model("Athlete",athleteSchema);
module.exports=Athlete;