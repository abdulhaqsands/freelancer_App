const joi=require("joi");

const createPortFolioSchema=joi.object({
    title:joi.string().required(),
    description:joi.string().required(),

});
const createGigsSchema=joi.object({
    file:joi.string().optional(),
   // files:joi.string().optional(),
    title:joi.string().required(),
    description:joi.string().required(),
    price:joi.number().required(),
    deliveryDays:joi.string().required(),
    category:joi.string().required(),

})

module.exports={createPortFolioSchema,createGigsSchema}