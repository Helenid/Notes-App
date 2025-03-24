import databaseService from "./databaseService";
import { ID } from "react-native-appwrite";


//Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTE_ID;


// console.log("Database ID:", dbId);
// console.log("Collection ID:", colId);

const noteService = {
    //GetNotes
    async getNotes (){
        const response = await databaseService.listDocuments(dbId,colId);
        // console.log('Fetched Notes:', response)

        if (response?.error) {
            return { error: response.error };
        }
        return { data: response };
    },

    //add new note
    async addNote (text) {
        if(!text) {
            return{error: 'Note text cannot be empty'};
        }
        const data = {
            text: text,
            createdAt: new Date().toISOString()
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

    catch (err) {  // ✅ Use 'err' instead of 'error'
        // console.error("Error adding note:", err.message);
        return { error: err.message };  // ✅ Returning error message
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
        console.log("Note deleted successfully!");
        if(response?.error) {
            console.error("Error deleting document:", error.message);
            return {error: response.error};
        }
        return{success: true};
    }
};

export default noteService;

