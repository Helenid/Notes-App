import { database, ID } from "./appwrite";

const databaseService = {
    //List Documents
    async listDocuments(dbId, colId, queries = []) {
        // console.log('Raw Database Response:', response);
        // console.log('Extracted Documents:', response.documents);

        try {
            const response = await database.listDocuments(dbId, colId, queries);
            return{ data: response.documents || [], error: null };
        }catch(error) {
            console.log('Error fetching documents:', error.message);
            return { error: error.message };
        }
    },

    //create documents
    async createDocument(dbId, colId, data, id = null) {
        try {
            const docId = id && id.length <=36 ? id : ID.unique();
            return await database.createDocument(dbId, colId, id || undefined, data);
        }catch (error) {
            console.error('Error creating document', error.message);
            return {
                error: error.message
            };
        }
    },
    //Update Document
    async updateDocument(dbId, colId, id, data) {
        try{
            return await database.updateDocument(dbId, colId, id, data);
        }catch(error) {
            console.error('Error updating document', error.message);
            return {
                error: error.message,
            };
        }
    },

    //Delete Documents
    async deleteDocument (dbId, colId, id){
         try {
            await database.deleteDocument(dbId, colId, id);
            return {success: true};
        }catch (error){
            console.error('Error deleting document', error.message);
            return {
                error: error.message
            };
        }
    }
        
    } 
 

export default databaseService;