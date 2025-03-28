import { useState, useEffect } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Alert,
    ActivityIndicator,
 } from "react-native";
 import { useRouter } from "expo-router";
 import { useAuth } from '@/contexts/AuthContext';
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from '@/services/noteService';



const NoteScreen = () => {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    const [notes, setNotes]= useState([]);
    const [modalVisible, setModalVisible]= useState(false);
    const [newNote, setNewNote]= useState('');
    const [loading, setLoading]= useState(true);
    const [error, setError]= useState(null);
   
    useEffect (() => {
        if(!authLoading && !user) {    
            router.replace('/auth')
        }
    }, [user, authLoading]);

    useEffect (() => {
        if (user) {
            fetchNotes();
        }
       
    }, [user]);


    const fetchNotes = async () => {
        setLoading(true);
        // console.log("Fetching notes started"); // Debugging
        const response = await noteService.getNotes(user.$id);
        // console.log('Notes in UI:', response)

        if (response.error) {
            setError(response.error);
            Alert.alert('Error', response.error)
        }else {
            // console.log('Setting Notes to:', response.data);
            setNotes(response.data || []);
            setError(null);
        }

        setLoading(false);
        // console.log("fetching notes finished, loading is now false"); //debugging
    };

    //Add new Note
    const addNote = async () => {
        if (newNote.trim() === '' )return;

        const response = await noteService.addNote(user.$id, newNote);

        if (response.error) {
            console.log('Failed to add note:', response.error)
            Alert.alert('Error', response.error);
        }else {
            setNotes([...notes, response.data])
        }

        setNewNote('');
        setModalVisible(false);
    };
    //Delete Note
    const deleteNote = async (id) => {

        // console.log("Attempting to delete note with ID:", id); // Debugging

        Alert.alert('Delete Note','Are you sure you want to delete this note?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style:  'destructive',
                onPress: async () => {
                    const response = await noteService.deleteNote(id);

                    // console.log("Delete Response:", response); // Debugging

                    if (response.error) {
                        Alert.alert('Error', response.error);
                    }else {
                        setNotes(notes.filter((note) => note.$id !==id));
                    }
                },
            }
        ])
    };
    //Edit Note
    const editNote = async(id, newText) =>{
        if(!newText.trim()) {
            Alert.alert('Error', 'Note text cannot be empty')
            return;
        }
        const response = await noteService.updateNote(id, newText);
        if(response.error) {
            Alert.alert('Error', response.error);
        }else {
            setNotes((prevNotes) => prevNotes.map((note) => note.$id === id ? {...note, text: response.data.text } : note))
        }
    }
    return ( 
    <View style={styles.container}>
        {loading ? (
            <ActivityIndicator size= 'large' color="blue" />
        ) : (
            <>
                {error && <Text style={styles.errorText}>{error}</Text>}
                {notes.length === 0 
                ? (<Text style = {styles.noNotesText}>You have no notes</Text>)
                :(<NoteList notes={notes} onDelete={deleteNote}  onEdit={editNote}/>)}
                
            </>
        )}

       
        <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText} onPress={() => setModalVisible(true)}>+ Add Note </Text>
        </TouchableOpacity>

        {/* Modal */}
        <AddNoteModal 
        modalVisible = {modalVisible}
        setModalVisible = {setModalVisible}
        newNote = {newNote}
        setNewNote = {setNewNote}
        addNote ={addNote}
        />       
    </View>

     );

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
   
    addButton: {
        position: 'absolute',
        bottom:20,
        left:20,
        right: 20,
        backgroundColor: 'blue',
        padding: 15,
        borderRadius:8,
        alignItems: 'center',   
    
    },
    addButtonText:{
        color: '#fff',
        fontSize:18,
        fontWeight: 'bold'
    },
    errorText:{
        color: 'red',
        textAlign:'center',
        marginBottom: 10,
        fontSize: 16,
    },
    noNotesText:{
        textAlign:'center',
        fontSize:18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 15,
    }
})
    
export default NoteScreen;