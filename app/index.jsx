import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import StickyNote from '@/assets/images/stickynote.png';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter ();
  return (
    <View 
    style={styles.container}>
      <Image source={StickyNote} style={styles.image} />
      <Text style= {styles.title}>Welcome to Notes App.</Text>
      <Text style= {styles.subtitle}> Capture your thought and bring it to live!</Text>
    
    <TouchableOpacity
      style= {styles.button} onPress={() => router.push('/notes')}
    >
      <Text style= {styles.buttonText}> Get Started </Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 100,
    height:100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 