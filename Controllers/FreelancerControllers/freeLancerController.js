const prisma=require("../../Config/prisma");
const { errorResponse, successResponse }=require("../../Config/errorHandling");
const path=require("path")
const { createPortFolioSchema } = require("../../Validations/freeLancerValidations");
const { url } = require("inspector");


const createPortFolio=async(req,res)=>{
    const {error}=createPortFolioSchema.validate(req.body);
    if(error) return errorResponse(res,400,error.details[0].message);
    try {
        const userId=req.user.id;
        const {title,description}=req.body;
        const files=req.files;
        if(!title || !description || !files){
            return errorResponse(res,401,"Not found");
        }
        const existUser=await prisma.user.findUnique({
            where:{id:userId}
        });
        if(!existUser) return errorResponse(res,401,"Unauthorized");
        const createPortfolio=await prisma.portfolio.create({
            data:{
                title,
                description,
                userId
               
            }
        });
        const mediaData=files.map((file)=>{
            const ext=path.extname(file.originalname).toLowerCase();
            let type="IMAGE";

            if([".mp4"].includes(ext)) type="VIDEO";
            else if([".pdf"].includes(ext)) type="PDF";
            else if([".doc"].includes(ext)) type="DOC";

            return{
                type,
                url:`uploads/portfolio/${file.filename}`,
                userId,
                porfolioId:createPortFolio.id,
            };
        });
await prisma.media.createMany({data:mediaData});
return successResponse(res,201,"PortFolio Created: ",createPortfolio)

        
        
    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something Went Wrong: ")
    }

}
const updatePortFolio=async(req,res)=>{
    try {
        const userId=req.user.id;
        const porfolioId=parseInt(req.params.id);
        const {title,description}=req.body;
        const existUserPortFolio=await prisma.portfolio.findFirst({
            where:{id:porfolioId,userId}
        });
        if(!existUserPortFolio) return errorResponse(res,401,"No Port_folio Found");
        await prisma.portfolio.update({
            where:{id:porfolioId,userId},
            data:{
                title,description
            }
        });
        return successResponse(res,201,"Updated PortFolio: ")

        
    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something Went Wrong:")
    }
}

module.exports={
    createPortFolio,
    updatePortFolio
}