const clientRoute=require("express").Router();
const verifyToken = require("../Middlewares/verifyToken");
const isClient=require("../Middlewares/isClient")
const { searchGigs } = require("../Controllers/ClientControllers/searchGigs");
const { order } = require("../Controllers/ClientControllers/orderGig");
const { reviewUser } = require("../Controllers/ClientControllers/review");
const { getAllGigs } = require("../Controllers/ClientControllers/getAllGigs");
const { allMyOrders } = require("../Controllers/ClientControllers/myOrders");


clientRoute.get("/search-gigs",verifyToken,isClient,searchGigs);
clientRoute.post("/order-gig",verifyToken,isClient,order);
clientRoute.post("/rating/:orderId",verifyToken,isClient,reviewUser);
clientRoute.get("/all-gigs",verifyToken,isClient,getAllGigs);
clientRoute.get("/my-orders",verifyToken,isClient,allMyOrders)
module.exports=clientRoute;