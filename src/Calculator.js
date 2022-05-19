import React, { useState } from "react";

export default function Calculator() {
  const [currentVal, setCurrentVal] = useState("");
  const [history, setHistory] = useState("");
  const [prevVal, setPrevVal] = useState(0);
  const [operator, setOperator] = useState("")

  function reset() {
    setCurrentVal("");
    setHistory("");
    setPrevVal(0);
    setOperator("");
  };
  
  function handleNumber(e) {
    //first, check if an operation was just completed, and if so zero everything
    if (operator === "=") {
      reset();
    }
    //check for length, then update display
    if (currentVal.length === 11) {
      setPrevVal(currentVal);
      warning("char");
    } else {
      setCurrentVal(prev => prev + e.target.value)
    } 
  };
  
  function handleOperator(e) {
    //first, update history display
    let newhistory;
    if (operator === "=") {
       newhistory = prevVal + e.target.value;
    } else if (operator === "sq" || operator === "rt") {
       newhistory = history + e.target.value;
    } else {
       newhistory = history.concat(currentVal) + e.target.value;
    };
    if (newhistory.length > 30) {
      newhistory = "..." + newhistory.slice(-30)
    };
    setHistory(newhistory)
    
    //if there is an operation pending, calculate that
    if (operator !== "" && operator !== "=") {
        evaluate();
    };
    
    //finally, display answer and/or set up state for next calculation
    if (e.target.value === "=") {
      setPrevVal(currentVal);
      setOperator(e.target.value)
        //currentVal NOT reset here, so that you can view the result
    } else {
      setPrevVal(currentVal);
      setCurrentVal("");
      setOperator(e.target.value);
    };
  };
  
  function evaluate() {
    let result;
    if (operator === "+") {
        result = parseFloat(prevVal) + parseFloat(currentVal)
    } else if (operator === "-") {
        result = parseFloat(prevVal) - parseFloat(currentVal)
    } else if (operator === "*") {
        result = parseFloat(prevVal) * parseFloat(currentVal)
    } else if (operator === "/") {
        result = parseFloat(prevVal) / parseFloat(currentVal)
    };
    setCurrentVal(format(result))
   };
  
  function format(num) {
    return parseFloat(num.toPrecision(11))
  };
  
  function handleOther(e) {
    if (e.target.value === "sq") {
      setCurrentVal(format(currentVal ** 2))
    } else if (e.target.value === "rt") {
      setCurrentVal(format(currentVal ** 0.5))
    } else if (e.target.value === "sign") {
      setCurrentVal(prev => 0 - prev)
    }
  }
  
  function handleDecimal(e) {
    if (!currentVal.includes(".")) {
      if (currentVal.length === 11) {
        setPrevVal(currentVal)
        warning("char");
      } else {
        setCurrentVal(prev => prev + e.target.value)
      } 
    }
  }
  
  function warning(error) {
    if (error === "char") {
      setCurrentVal("Max Chars")
      setTimeout(()=> setCurrentVal(prevVal), 1000);
    }
  };
  
  return (
    <div id="calcbody">
      <Display 
        currentDisplay={currentVal}
        historyDisplay={history}
      />
      <Buttons 
        handleNumber={handleNumber}
        handleOperator={handleOperator}
        handleOther={handleOther}
        handleDecimal={handleDecimal}
        reset={reset}
      />
    </div>
  )
  
};

const Display = (props) => {
  return (
    <div id="display">
      <div id="history">{props.historyDisplay}</div>
      <div id="current">{props.currentDisplay}</div>
    </div>
  )
};

const Buttons = (props) => {
  return (
    <div id="keypad-wrapper">
      <button id="btnclear" class="operator" onClick={props.reset}>C</button>
      <button id="btnsquare" class="operator" value="sq" onClick={props.handleOther}>sq</button>
      <button id="btnroot" class="operator" value="rt" onClick={props.handleOther}>rt</button>
      <button id="btnadd" class="operator" value="+" onClick={props.handleOperator}>+</button>
      <button id="btn7" class="numbtn" value="7" onClick={props.handleNumber}>7</button>
      <button id="btn8" class="numbtn" value="8" onClick={props.handleNumber}>8</button>
      <button id="btn9" class="numbtn" value="9" onClick={props.handleNumber}>9</button>
      <button id="btnminus" class="operator" value="-" onClick={props.handleOperator}>-</button>
      <button id="btn4" class="numbtn" value="4" onClick={props.handleNumber}>4</button>
      <button id="btn5" class="numbtn" value="5" onClick={props.handleNumber}>5</button>
      <button id="btn6" class="numbtn" value="6" onClick={props.handleNumber}>6</button>
      <button id="btnmultiply" class="operator" value="*" onClick={props.handleOperator}>*</button>
      <button id="btn1" class="numbtn" value="1" onClick={props.handleNumber}>1</button>
      <button id="btn2" class="numbtn" value="2" onClick={props.handleNumber}>2</button>
      <button id="btn3" class="numbtn" value="3" onClick={props.handleNumber}>3</button>
      <button id="btndivide" class="operator" value="/" onClick={props.handleOperator}>/</button>
      <button id="btnnegative" class="numbtn" value="sign" onClick={props.handleOther}>+/-</button>
      <button id="btn0" class="numbtn" value="0" onClick={props.handleNumber}>0</button>
      <button id="btndecimal" class="numbtn" value="." onClick={props.handleDecimal}>.</button>
      <button id="btnequals" class="operator" value="=" onClick={props.handleOperator}>=</button>
  </div>
  )
}