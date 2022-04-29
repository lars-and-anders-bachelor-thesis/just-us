import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Dimensions,
    FlatList,
 } from 'react-native';

const fakeUsernames = [
    {
        id: '1',
        first: 'Peter',
        second: 'Lars',
        // third: 'caker',
    },
    {
        id: '2',
        first: 'Lars',
        second: 'Peter',
        fourth: 'Erlend',
        third: 'Amish',
        fifth: 'Knut'
    },
    {
        id: '3',
        first: 'Peter',
    },
    {
        id: '4',
        first: 'Chris',
        second: 'Amish',
        third: 'Peter',
    },
];

export default function Privacy({ navigation }) {
    return (
            <FlatList
            data={fakeUsernames}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
                <View style={styles.container}>
                    <Text>Postid: {item.id}</Text>
                <View style={styles.arrowUser}>
                    <Icon name="arrow-right" size={20} style={styles.arrow}/>
                    <Text>{item.first}</Text>
                </View>
                 {item.second &&
                    (<View style={styles.arrowUser}>
                        <Icon name="arrow-right" size={20} style={styles.arrow}/>
                        <Text>{item.second}</Text>
                    </View>)
                 }
                 {item.third &&
                    (<View style={styles.arrowUser}>
                        <Icon name="arrow-right" size={20} style={styles.arrow}/>
                        <TouchableOpacity>
                            <Text>{item.third}</Text>
                        </TouchableOpacity>
                    </View>)
                 }
                </View>
            )}
            >
            </FlatList>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 50, // this is not best pratice
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'space-between',
      },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding:20,
        backgroundColor: '#00BFFF',
        marginTop: 30,
        borderRadius: 10,
    },
    btntxt: {
        color: '#fff',
        fontWeight: 'bold',
    },
    arrow: {
        color: 'black',
    },
    arrowUser: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
    },
})