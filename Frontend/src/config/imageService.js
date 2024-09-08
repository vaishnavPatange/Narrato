import conf from "../conf/conf";
import {Client,ID, Storage} from "appwrite";

export class ImageService{
    client = new Client;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client);
        this.conf = conf;
    }


    async uploadFile({name, file}){
        
        let imageId = this.conf.appwritePostId;
        if(name="user") imageId = this.conf.appwriteUserId;

        try {
            return await this.bucket.createFile(
                imageId,
                ID.unique(),
                file
            )
        } catch (error) {
            return false
        }
    }

    async deleteFile({name,file_id}){
        let imageId = this.conf.appwritePostId;
        if(name="user") imageId = this.conf.appwriteUserId;
        try{
            await this.bucket.deleteFile(
                imageId,
                file_id
            )
            return true
        } catch(error){
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async filePreview({name, file_id}){
        let imageId = this.conf.appwritePostId;
        if(name="user") imageId = this.conf.appwriteUserId;

        return this.bucket.getFilePreview(
            imageId,
            file_id
        )
    }
}

const imageService = new ImageService();

export default imageService;