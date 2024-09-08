const conf = {
    expressUrl: String(import.meta.env.EXPRESS_URL),
    appwriteUrl:String(import.meta.env.APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.APPWRITE_PROJECT_ID),
    appwriteUserId:String(import.meta.env.APPWRITE_USER_BUCKET_ID),
    appwritePostId:String(import.meta.env.APPWRITE_POST_BUCKET_ID)
}

export default conf;