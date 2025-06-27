const { errorResponse, successResponse } = require("../../Config/errorHandling");
const prisma=require("../../Config/prisma");


const searchGigs=async(req,res)=>{
    try {
  const { search, category, minPrice, maxPrice, deliveryDays, sort } = req.query;
   console.log("QUERY PARAMS:", req.query);
  const filters=[];
  if(search ){
    filters.push({
        OR:[
            {title:{contains:search }},
            {description:{contains:search}}
        ],
    });
  }
  if(category){
    filters.push({
        category
    });
  }
  if(minPrice){
    filters.push({
        price:{gte:parseInt(minPrice)}
    });
  }
  if(maxPrice){
    filters.push({
        price:{lte:parseInt(maxPrice)}
    });
  }
  if(deliveryDays){
    filters.push({
        deliveryDays:{lte:parseInt(deliveryDays)}
    });
  }
   if (filters.length === 0) {
      return successResponse(res, 200, "No filters applied. No gigs returned.", []);
    }
  let orderBy={createdAt:"desc"};
  if(sort==="price_asc") orderBy={price:"asc"};
  else if(sort==="price_desc") orderBy={price:"desc"};


  const gigs=await prisma.gig.findMany({
    where:{     
         AND: filters
    },
    orderBy,
  });
      return successResponse(res, 200, "Gigs fetched successfully", gigs);

        
    } catch (error) {
        console.log("Error",error);
        return errorResponse(res,500,"Something Went Wrong:")
    }

};


module.exports={
    searchGigs,
   

}