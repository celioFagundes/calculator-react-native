import React, { useState , useEffect} from 'react'
import { View, StatusBar } from 'react-native'
import DisplayExpression from './components/display/display.js'
import Button from './components/button/button.js'
import style_appScreen from './styles/style_appScreen'
import style_buttonsView from './styles/style_buttonsView'
import Icon from 'react-native-vector-icons/FontAwesome5'

const states = {
  wasCalculated: false,
  usedOperator: true,
}

export default function App() {
  const [expression, setExpression] = useState('')
  const [result, setResult] = useState('0')
 

  
  const addOnExpression = digit => {
    if (
      digit == '.' &&
      states.usedOperator &&
      expression[expression.length - 1] != '.' &&
      !states.wasCalculated
    ) {
      setExpression(expression + digit)
      states.usedOperator = false
    } else if (!states.wasCalculated && digit != '.') {
      setExpression(expression + digit)
    }
  }

  const addOperator = operator => {
    const operators = ['+', '-', '/', '*']
    const last_digit = expression[expression.length - 1]

    if (states.wasCalculated) {
      setExpression(result + operator)
      states.usedOperator = true
      states.wasCalculated = false
    } else if (!operators.includes(last_digit)) {
      setExpression(expression + operator)
      states.usedOperator = true
    }
  }

  const operations = operation => {
    try {
      if (operation == '=' && expression.length != 0) {
        setResult(eval(expression))
        states.wasCalculated = true
      } else if (operation == 'C') {
        setExpression('')
        setResult('0')
        states.wasCalculated = false
        states.usedOperator = true
      } else if (operation == '<') {
        setExpression(expression.substr(0, expression.length - 1))
        states.usedOperator = true
        states.wasCalculated = false
      }
    } catch {
      alert('Invalid Expression')
    }
  }

  const buttonsLines = [
    [
      { op: 'C', func: operations, clear: true },
      { op: '(', func: addOnExpression, operator: true },
      { op: ')', func: addOnExpression, operator: true },
      { op: '/', func: addOperator, operator: true },
    ],
    [
      { op: '7', func: addOnExpression },
      { op: '8', func: addOnExpression },
      { op: '9', func: addOnExpression },
      { op: '*', func: addOperator, operator: true },
    ],
    [
      { op: '4', func: addOnExpression },
      { op: '5', func: addOnExpression },
      { op: '6', func: addOnExpression },
      { op: '-', func: addOperator, operator: true },
    ],
    [
      { op: '1', func: addOnExpression },
      { op: '2', func: addOnExpression },
      { op: '3', func: addOnExpression },
      { op: '+', func: addOperator, operator: true },
    ],
    [
      { op: '0', func: addOnExpression },
      {
        op: '<',
        func: operations,
        icon: <Icon name='backspace' color='#E06073' size={28} />,
      },
      { op: '.', func: addOnExpression, operator: true },
      { op: '=', func: operations, equal: true },
    ],
  ]
  return (
    <View style={style_appScreen.screen}>
      <StatusBar />
      <DisplayExpression value={expression} result={result} />
      <View style={style_buttonsView.view}>
        {buttonsLines.map((line, index) => (
          <View style={style_buttonsView.line} key={index}>
            {line.map(button => (
              <Button
                key={button.op}
                clear={button.clear}
                operator={button.operator}
                equal={button.equal}
                title={button.op === '<' ? button.icon : button.op}
                Press={() => {
                  button.func(button.op)
                }}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}
