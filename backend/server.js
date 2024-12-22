const express=require('express');
const app= express();
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://meaww:meaww123@digitalwallet.7wkq2.mongodb.net/?retryWrites=true&w=majority&appName=digitalwallet")

const User=require('./userModel');

app.listen(5000, ()=> {
  console.log("Server is running");
})
