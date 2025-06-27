const clientRoute=require("express").Router();
const verifyToken = require("../Middlewares/verifyToken");
const isClient=require("../Middlewares/isClient")
const { searchGigs } = require("../Controllers/ClientControllers/searchGigs");
const { order } = require("../Controllers/ClientControllers/orderGig");


clientRoute.get("/search-gigs",verifyToken,isClient,searchGigs);
clientRoute.post("/order-gig",verifyToken,isClient,order);
module.exports=clientRoute;