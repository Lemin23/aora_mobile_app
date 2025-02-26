import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint : 'https://cloud.appwrite.io/v1',
    platform : 'com.ebnou.aora',
    projectId : '67adde970024042c8ba0',
    databaseId : '67ade369000f32852bd4',
    userCollectionId : '67ade39c001720379a64',
    videoCollectionId : '67ade3d6001ee2158811',
    storageId : '67ade730000421ae240e'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)
const storage = new Storage(client);

// Register User 
export const createUser = async (email, username, password) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
                email,
                password,
                username
            )

        if(!newAccount) throw error
        
        const avatarUrl = avatars.getInitials(username)
        await SignIn(email, password);

        const newUser = databases.createDocument(
            appwriteConfig.databaseId,  
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email, 
                username, 
                avatar : avatarUrl
            }
        )
        return newUser

    } catch(error){
        console.log(error); 
        throw new Error(error )
    }
}

export const SignIn = async (email, password) => {
    try {
        const session = account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        console.log(error); 
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        
        if(!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )

        return posts.documents 
    } catch (error) {
        throw new Error (error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents 
    } catch (error) {
        throw new Error (error);
   }
}

export const searchQuery = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents 
    } catch (error) {
        throw new Error (error);
   }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )
        return posts.documents 
    } catch (error) {
        throw new Error (error);
   }
}

export const signOut = async () => {
    try {
        const session = account.deleteSession('current')
        return session;
    } catch (error) {
        throw new Error
    }
}

export const getFileUrl = async (fileId, type) => {
    let fileUrl
    try {
        if(type === 'video'){
            fileUrl = storage.getFileView(
                appwriteConfig.storageId,
                fileId,
            )

        }else if(type === 'thumbnail'){
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                'top',
                100
            )

        } else {
            throw new Error("no valid file type")
        }
        
        if(!fileUrl) throw new Error("no url has been returned from appwrite")
        
        return fileUrl
    } catch (error) {
        throw new Error(`Appwrite getFileUrl: ${error.message}`)
    }
    
}

export const uploadFile = async (file, type) =>{
    if(!file) return 'no file'

    const assets ={
        name: file.fileName,
        type: file.type,
        size: file.fileSize,
        uri: file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            assets
        )
        
        const fileUlr = await getFileUrl(uploadedFile.$id, type)
        return fileUlr
    } catch (error) {
        throw new Error(`Appwrite uploadFile: ${error.message}`)        
    }
}

export const createVideo = async ({form, userId }) => {
    try {
        const [videoUrl, thumbnailUrl] = await Promise.all([
            uploadFile(form.video, 'video'),
            uploadFile(form.thumbnail, 'thumbnail')
        ])

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                video: videoUrl,
                thumbnail: thumbnailUrl,
                prompt: form.prompt,
                creator: userId,
            }
        )
        return newPost
    } catch (error) {
        throw new Error(`Appwrite createVideo: ${error.message}`)
    }
}