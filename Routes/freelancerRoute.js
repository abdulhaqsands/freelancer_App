const frelancerRoute=require("express").Router();
const freelancerController=require("../Controllers/FreelancerControllers/freeLancerController");
const verifyToken = require("../Middlewares/verifyToken");
const freeLancerGigsController=require("../Controllers/FreelancerControllers/freelancerGigsController")
const upload = require("../Utils/multer");
const isClient=require("../Middlewares/isClient");
const isFreelancer = require("../Middlewares/isAdmin");
const { updateOrderStatus } = require("../Controllers/FreelancerControllers/AceeptingGig");

frelancerRoute.post("/create-portfolio",verifyToken,isFreelancer,upload.array("files"),freelancerController.createPortFolio);
frelancerRoute.post("/create-gig",verifyToken,isFreelancer,upload.single("file"),freeLancerGigsController.createGigs);
frelancerRoute.post("/update-status/:orderId",verifyToken,isFreelancer,updateOrderStatus)
frelancerRoute.put("/update-Gig/:id",verifyToken,isFreelancer,freeLancerGigsController.updateGig);
frelancerRoute.get("/get-my-gigs",verifyToken,isFreelancer,freeLancerGigsController.getGigs);
frelancerRoute.delete("/delete-my-gigs/:id",verifyToken,isFreelancer,freeLancerGigsController.deleteGig);
frelancerRoute.put("/update-portFolio/:id",verifyToken,isFreelancer,freelancerController.updatePortFolio);





module.exports=frelancerRoute;