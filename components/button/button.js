
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import style from '../../styles/style_button'

const Button_calculator = props => {

  const textStyles = [style.text]

  if (props.operator) {
    textStyles.push(style.operator)
  } else if (props.clear) {
    textStyles.push(style.clear)
  } else if (props.equal) {
    textStyles.push(style.equal)
  }
  return (
    <TouchableOpacity onPress={props.Press} style={style.button}>
      <Text style={textStyles}>{props.title}</Text>
    </TouchableOpacity>
  )
}
export default Button_calculator
