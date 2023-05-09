const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {await mongoose.connect('mongodb+srv://vanshgupta842:SaBv2619@cluster0.owwjjsi.mongodb.net/ToDo');}

module.exports=mongoose;