//Imports necessarios
import React from 'react';
import { TextInput,View,Text , Keyboard} from 'react-native';
import { style} from '../../styles/style_display';


 const DisplayExpression = (props) => ( //Contains a TextInput and a Text components

    
    <View style = {style.view_input}>
        <TextInput 
        textAlign = "center"
        style = {style.input}
        maxLength ={18} 
        autoFocus = {true}
        showSoftInputOnFocus ={false} 
        on
        value = {props.value}   
        />
        <Text style ={style.txt}> 
            {props.result}  
        </Text>    
    </View>
)

export default DisplayExpression
