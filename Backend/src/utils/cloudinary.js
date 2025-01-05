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
    
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder: "Narrato"
        },{resource_type: "auto"});
        
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }

}


module.exports = cloudinaryUpload;