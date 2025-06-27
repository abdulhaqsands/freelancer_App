const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload/");
    },
    filename:function(req,file,cb){
        const ext=path.extname(file.originalname);
        const filename=`${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`
        cb(null,filename);
    }
});

const fileFilter=function(req,file,cb){
    const mimeTypeAllowed=[
    "image/jpeg", "image/png", "image/gif", "image/webp", 
    "video/mp4", "video/mpeg", "video/x-msvideo",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
 
    ];
    if(mimeTypeAllowed.includes(file.mimetype)){
        cb(null,true);
    }else{
    cb(new Error("Only images, videos, PDFs, and DOC/DOCX files are allowed"), false);
    }
}

const upload=multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:50*1024*1024},
});

module.exports=upload;