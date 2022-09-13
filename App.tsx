import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
      <Button text="OK"/>
      <StatusBar style="auto"/>
    </View>
  );
}

interface ButtonProps {
  text: String,
}

function Button(props: ButtonProps){
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.textButton}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    minWidth: 100,
    minHeight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textButton: {
    color: '#fff',
  }
});
