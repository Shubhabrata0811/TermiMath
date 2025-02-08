const isNumeric = (token) => {
  return !isNaN(token) && !isNaN(parseFloat(token));
};

const isOperator = (token) => {
  const operators = ["+", "-", "*", "/", "^"];
  return operators.includes(token);
};

const operatorPrecedence = (operator) => {
  if (operator === "+" || operator === "-") {
    return 1;
  }
  if (operator === "*" || operator === "/") {
    return 2;
  }
  if (operator === "^") {
    return 3;
  }
};

const parse = (expression) => {
  const stack = [];
  const queue = [];

  const tokens = expression.split(" ");

  for (let idx = 0; idx < tokens.length; idx++) {
    if (isOperator(tokens[idx])) {
      if (stack.length === 0) {
        stack.push(tokens[idx]);
      } else {
        while (
          operatorPrecedence(stack.at(-1)) >=
          operatorPrecedence(tokens[idx])
        ) {
          queue.push(stack.pop());
        }
        stack.push(tokens[idx]);
      }
    } else if (tokens[idx] === "(") {
      stack.push(tokens[idx]);
    } else if (tokens[idx] === ")") {
      while (stack[stack.length - 1] !== "(") {
        queue.push(stack.pop());
      }
      stack.pop();
    } else if (isNumeric(tokens[idx])) {
      queue.push(parseFloat(tokens[idx]));
    } else {
      throw new Error("Invalid token");
    }
  }

  while (stack.length > 0) {
    queue.push(stack.pop());
  }

  return queue.join(" ");
};

export default { isNumeric, isOperator, operatorPrecedence, parse };