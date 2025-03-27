//  import { account } from "appwrite";
// import { ID } from "react-native-appwrite";


import { Client, Account, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT) 
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID); 

const account = new Account(client);

const authService = {
    //Register User
    async register (email, password) {
        try {
           const response = await account.create(ID.unique(), email, password);
           return response; 
        }catch(error) {
            return {
                error: error.message ||  'Registration failed, Please try again'
        }
    }
},
//Login
    async login (email, password) {
        try {
           const response = await account.createEmailPasswordSession(email, password);
           return response; 
        }catch(error) {
            // console.log("Login Error:", error.message); // Debugging
            return {
                error: error.message ||  'Login failed, Please check your credentials'
        }
    }
},
// Get logged in user
async getUser() {
    try {
        return await account.get();
    }catch(error) {
        return null;
    }
},
//Logout user
async logout() {
    try {
        await account.deleteSession('current');
        // console.log('Logout successful')
        return { success: true }
    }catch (error){
        // console.log('Logout error:', error.message )
        return {
            
        error: error.message ||  'Log out failed, Please try again'
        }
    }
}
};

export default authService;