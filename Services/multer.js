import multer from "multer";

export const multerFunc = ()=>{
    //destination : 
    const storage = multer.diskStorage({
        destination : function(req , file ,cb){
            console.log(file);
            cb(null , 'uploads')
            
        },
        filename : function(req, file , cb){
            cb(null , file.originalname)
        }
    })
    //filrname
    const uplodeFile = multer({storage});
    return uplodeFile;
}