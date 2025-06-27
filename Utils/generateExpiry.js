const generateExpiry=()=>{
        return new Date(Date.now() + 1 * 60 * 1000);

}
module.exports={
    generateExpiry
}