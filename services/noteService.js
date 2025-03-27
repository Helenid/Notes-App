import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";


//Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTE_ID;


// console.log("Database ID:", dbId);
// console.log("Collection ID:", colId);

const noteService = {
    //GetNotes
    async getNotes (userId){
        if (!userId) {
            console.error('Error: Missing userId in getNotes()');
            return {
                data: [], error: 'User ID is missing'
            }
        }

        try {
            const response = await databaseService.listDocuments(dbId, colId, [
             Query.equal('user_id', userId) 
            ]);
            return response;
        } catch (error){
            console.log|('Error fetching notes:', error.message);
            return{data: [], error: error.message};
        }
        
      

        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    //add new note
    async addNote (user_id, text) {
        if(!text) {
            return{error: 'Note text cannot be empty'};
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            user_id: user_id,
        }

        try {
        const response = await databaseService.createDocument(
            dbId,
            colId,
            data,
            ID.unique(),
        );
        // console.log("Add Note Response:", response); // Debugging

        if (response?.error) {
            // console.error("Error adding note:", error.response);
            return {error: response.error}
        }
        return{data: response};
    }

    catch (error) {  
        // console.error("Error adding note:", error.message);
        return { error: error.message };  // ✅ Returning error message
    }
},

    //update Note

    async updateNote (id, text) {
        const response = await databaseService.updateDocument(dbId,colId, id,
            {
                text
            });
            
            if (response?.error) {
                return { error: response.error};
            }
            return {data: response};
    },

    //Delete Note
    async deleteNote (id) {
        console.log("Deleting note with ID:", id); // Debugging

        const response = await databaseService.deleteDocument(dbId, colId, id);
        //console.log("Note deleted successfully!");
        if(response?.error) {
            //console.error("Error deleting document:", error.message);
            return {error: response.error};
        }
        return{success: true};
    }
};

export default noteService;

