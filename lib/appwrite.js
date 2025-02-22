import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

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