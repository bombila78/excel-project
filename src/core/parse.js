export function parse(text = '') {
    try {
      if (text.startsWith('=') && text.length > 1) {
        const equation = text.slice(1).trim()
        return getStringEquationResult(equation)
      }
    } catch (e) {
      console.warn(e)
      return text
    }
  return text
}

const MATH_OPERATORS = {
  '+': (...args) => {
    let result = 0
    for (const arg of args) {
      result += arg
    }
    return result
  },
  '-': (x, y) => x - y,
  '*': (...args) => {
    let result = 1
    for (const arg of args) {
      result *= arg
    }
    return result
  },
  '/': (x, y) => x / y
}

function getStringEquationResult(equationString) {
  const equationParts = equationString
    .split(/[()]/)
    .filter(x => !!x.trim())
    .reduce((acc, el) => {
      if (el.length > 1) {
        const equation = isOperator(el[0])
          ? isOperator(el[el.length - 1])
            ? [el[0], el.slice(1, -1), el[el.length - 1]]
            : [el[0], el.slice(1)]
          : isOperator(el[el.length - 1])
            ? [el.slice(0, -1), el[el.length - 1]]
            : [el]
        acc.push(...equation)
      } else {
        acc.push(el)
      }
      return acc
    }, [])

  const easyEquation = equationParts.map(easyEquationResult).join('')
  return easyEquationResult(easyEquation)
}

function isOperator(string) {
  return Object.keys(MATH_OPERATORS).includes(string)
}

function easyEquationResult(equationString) {
  if (isOperator(equationString)) {
    return equationString
  }
  let lastEl
  const {equationOperators, equationNumbers} = equationString
    .split('')
    .filter(x => !!x.trim())
    .reduce((acc, x, i) => {
      if (isOperator(x)) {
        acc.equationOperators.push(x)
        lastEl = x
        return acc
      } else {
        const eN = acc.equationNumbers
        isOperator(lastEl) || i === 0
          ? eN.push(x)
          : eN[eN.length - 1] = `${eN[eN.length - 1]}${x}`
        lastEl = x
      }
      return acc
    }, {
      equationOperators: [],
      equationNumbers: []
    })
  return parseFloat(equationNumbers
    .reduce((acc, x, index) => {
      if (index === 0) {
        return acc
      }
      const operation = MATH_OPERATORS[equationOperators[index - 1]]
      return operation(+acc, +x)
    }, equationNumbers[0]))
}
