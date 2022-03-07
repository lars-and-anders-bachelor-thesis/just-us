import React from 'react';
import { Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Animated, {abs, EasingNode} from 'react-native-reanimated';
import { 
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    ScrollView,
 } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { Value, timing } = Animated;

// Calculate windows size
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

class SearchBar extends React.Component{
    constructor(props){
        super(props)

        // state
        this.state = {
            isFocused: false,
            keyword: ''
        }

        // animation values 
        this._input_box_translate_x = new Value(width)
        this._back_button_opacity = new Value(0)
        this._content_translate_y = new Value(height)
        this._content_opacity = new Value(0)
    }

    _onFocus = () => {
        // update state
        this.setState({isFocused: true})
        // animation config
        // input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: 0,
            easingNode: EasingNode.inOut(EasingNode.ease),
        }
        const back_button_opacity_config = {
            duration: 200,
            toValue: 1,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }

        // content
        const content_translate_y_config = {
            duration: 0,
            toValue: 0,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 1,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }

        // run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        // force focus
        // MÅ FINNE LØSNING PÅ DENNE DEPRECATEDE REFSEN
        // this.refs.input.focus() 

    }

    _onBlur = () => {
        // update state
        this.setState({isFocused: false})
        // animation config
        // input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: width,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }
        const back_button_opacity_config = {
            duration: 50,
            toValue: 0,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }

        // content
        const content_translate_y_config = {
            duration: 0,
            toValue: height,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 0,
            easingNode: EasingNode.inOut(EasingNode.ease)
        }

        // run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        // force blur 
        // YO HVA FAEN GJØR JEG HER REFS ER JO DEPRECATED
        // this.refs.input.blur() 
    }
    
    render(){
        return(
            <>
            <SafeAreaView style={styles.header_safe_area}>
                <View style={styles.header}>
                    <View style={styles.inner_header}>
                        {/* <View>
                            <Image 
                            source={require("../assets/logoped.png")} 
                            style={{width:152, height: 52}}/>
                        </View> */}
                    <TouchableHighlight 
                        activeOpacity={1}
                        underlayColor={"#ccd0d5"}
                        onPress={this._onFocus}
                        style={styles.search_icon_box}
                    >
                        <Icon name="search" size={22} color="#000000"/>
                    </TouchableHighlight>
                    <Animated.View
                        style={[styles.input_box, {transform: [{translateX: this._input_box_translate_x}]}]}
                    >
                        <Animated.View style={{opacity: this._back_button_opacity}}>
                            <TouchableHighlight
                            activeOpacity={1}
                            underlayColor={"#ccd0d5"}
                            onPress={this._onBlur}
                            style={styles.back_icon_box}
                            >
                                <Icon name="chevron-left" size={22} color="#000000"/>
                            </TouchableHighlight>
                        </Animated.View>
                        <TextInput 
                            ref={"input"}
                            placeholder="Search for your friends"
                            clearButtonMode='always'
                            value={this.state.keyword}
                            onChangeText={(value) => this.setState({keyword: value}) }
                            style={styles.input}
                        />
                    </Animated.View>
                    </View>
                </View>
            </SafeAreaView>
            <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y}]}]}>
                <SafeAreaView style={styles.content_safe_area}>
                    <View style={styles.content_inner}>
                        <View style={styles.separator}/>
                        {
                            this.state.keyword === ''
                            ?
                                <View style={styles.image_placeholder_container}>
                                    <Image 
                                    style={styles.image} source={require("../assets/logoped.png")}
                                    style={styles.image_placeholder}
                                    />
                                    <Text style={styles.image_placeholder_text}>
                                        Enter a few words{"\n"}
                                        to search for friends
                                    </Text>
                                </View>
                            :
                                <ScrollView>
                                    <View style={styles.search_item}>
                                        <Icon style={styles.item_icon} name="search" size={16} color="#cccccc"/>
                                        <Text>Fake result 1</Text>
                                    </View>
                                    <View style={styles.search_item}>
                                        <Icon style={styles.item_icon} name="search" size={16} color="#cccccc"/>
                                        <Text>Fake result 2</Text>
                                    </View>
                                    <View style={styles.search_item}>
                                        <Icon style={styles.item_icon} name="search" size={16} color="#cccccc"/>
                                        <Text>Fake result 3</Text>
                                    </View>
                                    <View style={styles.search_item}>
                                        <Icon style={styles.item_icon} name="search" size={16} color="#cccccc"/>
                                        <Text>Fake result 4</Text>
                                    </View>
                                    <View style={styles.search_item}>
                                        <Icon style={styles.item_icon} name="search" size={16} color="#cccccc"/>
                                        <Text>Fake result 5 </Text>
                                    </View>
                                </ScrollView>
                        }
                    </View>
                </SafeAreaView>
            </Animated.View>
            </>
        )
    }
}

export default SearchBar

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000,
    },
    header: {
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: "#e4e6eb",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center', 
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        width: width - 32
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        marginRight: 5,
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: "#e4e6eb",
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: 'white',
    },
    content_inner: {
        flex: 1,
        paddingTop: 50
    },
    separator: {
        marginTop: 5,
        height: 1,
        backgroundColor: '#e6e4eb'
    },
    image_placeholder: {
        width: 150,
        height: 113,
        alignSelf: 'center'
    },
    image_placeholder_text: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    }, 
    search_item: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        marginRight: 16
    }
})