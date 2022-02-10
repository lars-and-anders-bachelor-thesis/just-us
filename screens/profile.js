import React from 'react';
import { AuthContext } from '../context/context';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
 } from 'react-native';

export default function Profile() {
    const { signOut } = React.useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>This is the best profile ever!</Text>

            <Button title="her skal det stå log out men i stedet står det cock" onPress={() => signOut()}/ >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
})