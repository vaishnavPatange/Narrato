const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


const cloudinaryUpload = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
    
        const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"});

        console.log(response);
        
        
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error is : ", error.message);
        
        return null;
    }

}


module.exports = cloudinaryUpload;