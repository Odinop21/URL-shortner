const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    longUrl: String,
    shortUrl: String
})
module.exports  = mongoose.model("Url", userSchema);
