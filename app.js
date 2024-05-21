const express = require("express");
const app = express();
const mongoose = require("mongoose");  
const Listing = require("./models/listing.js");
const path = require("path");

const Mongo_URL = "mongodb://127.0.0.1:27017/WanderLust";

main().then(() =>{
    console.log("Connected to DB");
}).catch((err)=> {
    console.log(err);
});


async function main(){
    await mongoose.connect(Mongo_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req,res)=>{
    res.send("Hi, I am Root");
});
// Index Route
app.get("/listings", async(req, res) =>{
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", {allListings});
});

//Show Route 
app.get("/listings/:id", async(res,req)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("/listings/show.ejs", {listing});
    });



// app.get("/testListing",async (req,res) =>{
// let sampleListing = new Listing({
//     title: "My house",
//     description: "By the Beach",
//     price: 1000,
//     location: "Nagpur",
//     country: "India",
// });
// await sampleListing.save();
// console.log("sample was saved");
// res.send("Succesful Testing");
// });

app.listen(8080, () => {
console.log("Server is here");
});
