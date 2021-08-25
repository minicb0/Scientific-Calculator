var number = document.getElementsByClassName('number');
var special = document.getElementsByClassName('special');
var operator = document.getElementsByClassName('operator');
var AC = document.getElementsByClassName('AC');
var DEL = document.getElementsByClassName('DEL');
var equals = document.getElementsByClassName('equals');
var current = document.getElementById('current');

var nums = [];
var ops = [];
var error = false;

// numbers
for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', () => {
        current.style.color = "black"
        current.value += number[i].innerHTML
        // console.log(number[i].innerHTML)
    })
}

// operators
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', () => {
        current.style.color = "black"
        current.value += operator[i].innerHTML
        // console.log(operator[i].innerHTML)
    })
}

//equals
equals[0].addEventListener('click', () => {
    nums = []
    ops = []
    calculate(current.value)
    if (current.value == "NaN") {
        error = true;
        current.style.color = "red"
        current.value = "invalid input"
    }
})

// AC
AC[0].addEventListener('click', () => {
    current.value = ''
    nums = []
    ops = []
    error = false
})

// DEL
DEL[0].addEventListener('click', () => {
    if (error == true) {
        current.value = ''    
        nums = []
        ops = []
        error = false
    } else {
        current.value = current.value.slice(0, -1)
    }
})

// functions
function calculate(currentValue) {
    var string = currentValue

    // removing white spaces
    string = string.replace(/\s/g, '')
    // nums and ops
    let num = '';
    for (let i = 0; i < string.length; i++) {
        // console.log(string[i])
        if (string[i] == '+' || string[i] == '-' || string[i] == '*' || string[i] == '/' || string[i] == '(' || string[i] == ')' || string[i] == '^' || string[i] == '%') {
            // console.log(num)
            if(num != '') {
                nums.push(parseFloat(num))
            }
            num = ''
            ops.push(string[i])
        } else {
            // console.log(string[i])
            num += string[i]
            if (i == string.length - 1) {
                nums.push(parseFloat(num))
            }
        }
    }
    // console.log(nums)
    // console.log(ops)
    calcValue();

}

function calcValue() {
    countBracketLeft = 0
    countBracketRight = 0
    ops.forEach((element, index) => {
        if (element == '(') {
            countBracketLeft ++ 
            ops.splice(index, 1)
        }
    })
    ops.forEach((element, index) => {
        if (element == ')') {
            countBracketRight ++
            ops.splice(index, 1)
        }
    })
    if(countBracketLeft != countBracketRight) {
        error = true;
        current.style.color = "red"
        return current.value = "invalid input";
    }

    ops.forEach((element, index) => {
        if (element == '/') {
            value = nums[index] / nums[index + 1]
            // console.log(nums[index] / nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    ops.forEach((element, index) => {
        if (element == '*') {
            value = nums[index] * nums[index + 1]
            // console.log(nums[index] * nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    ops.forEach((element, index) => {
        if (element == '^') {
            value = Math.pow(nums[index], nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    ops.forEach((element, index) => {
        if (element == '%') {
            value = nums[index] % nums[index + 1]
            // console.log(nums[index] * nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    ops.forEach((element, index) => {
        if (element == '+') {
            value = nums[index] + nums[index + 1]
            // console.log(nums[index] + nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    ops.forEach((element, index) => {
        if (element == '-') {
            value = nums[index] - nums[index + 1]
            // console.log(nums[index] - nums[index + 1])
            nums.splice(index, 2, value)
            ops.splice(index, 1)
            calcValue();
            // console.log(nums)
            // console.log(ops)
        }
    })

    current.value = nums[0]
}

function specialOperator() {
    for (let i = 0; i < special.length; i++) {
        special[i].addEventListener('click', () => {
            // console.log(special[i])
            if (error == false) {
                current.style.color = "black"
                if (special[i].innerHTML == 'sqr') {
                    current.value = current.value * current.value
                } else if (special[i].innerHTML == 'sqrt') {
                    current.value = Math.sqrt(current.value)
                } else if (special[i].innerHTML == 'cube') {
                    current.value = current.value * current.value * current.value
                } else if (special[i].innerHTML == 'inv') {
                    current.value = 1 / current.value
                } else if (special[i].innerHTML == 'log') {
                    current.value = Math.log(current.value)
                } else if (special[i].innerHTML == 'sin') {
                    current.value = Math.sin(current.value)
                } else if (special[i].innerHTML == 'cos') {
                    current.value = Math.cos(current.value)
                } else if (special[i].innerHTML == 'tan') {
                    current.value = Math.tan(current.value)
                } else if (special[i].innerHTML == `sin<sup>-1</sup>`) {
                    current.value = Math.asin(current.value)
                } else if (special[i].innerHTML == `cos<sup>-1</sup>`) {
                    current.value = Math.acos(current.value)
                } else if (special[i].innerHTML == `tan<sup>-1</sup>`) {
                    current.value = Math.atan(current.value)
                }else if (special[i].innerHTML == '!') {
                    factorial(current.value)
                } else if (special[i].innerHTML == 'exp') {
                    current.value = Math.pow(Math.E, current.value)
                }

                if (current.value == 'NaN') {
                    error = true;
                    current.style.color = "red"
                    current.value = "invalid input"   
                }
            } else {
                current.style.color = "red"
                current.value = "invalid input"
            }
        })
    }
}
specialOperator()

function factorial(n) {
    if (n == 0 || n == 1) {
        return current.value = 1;
    } else {
        return current.value = n * factorial(n-1);
    }
}

//dark mode
var darkMode = document.getElementById("darkMode");

//initiall light mode
document.documentElement.style.setProperty('--body-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-bg-color-light'))
document.documentElement.style.setProperty('--body-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-color-light'))
document.documentElement.style.setProperty('--input-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--input-bg-color-light'))
document.documentElement.style.setProperty('--dark-btn-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-bg-color-light'))
document.documentElement.style.setProperty('--dark-btn-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-color-light'))

darkMode.addEventListener('click', () => {
    if (darkMode.innerHTML == "Light Mode") {
        document.documentElement.style.setProperty('--body-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-bg-color-light'))
        document.documentElement.style.setProperty('--body-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-color-light'))
        document.documentElement.style.setProperty('--input-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--input-bg-color-light'))
        document.documentElement.style.setProperty('--dark-btn-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-bg-color-light'))
        document.documentElement.style.setProperty('--dark-btn-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-color-light'))
        // document.body.style.backgroundColor = "rgb(206, 203, 203)"
        // document.body.style.color = "black"
        // current.style.backgroundColor = "transparent"
        // darkMode.style.color = "white"
        // darkMode.style.backgroundColor = "black"
        darkMode.innerHTML = "Dark Mode"
    } else if (darkMode.innerHTML == "Dark Mode") {
        document.documentElement.style.setProperty('--body-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-bg-color-dark'))
        document.documentElement.style.setProperty('--body-color', window.getComputedStyle(document.documentElement).getPropertyValue('--body-color-dark'))
        document.documentElement.style.setProperty('--input-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--input-bg-color-dark'))
        document.documentElement.style.setProperty('--dark-btn-bg-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-bg-color-dark'))
        document.documentElement.style.setProperty('--dark-btn-color', window.getComputedStyle(document.documentElement).getPropertyValue('--dark-btn-color-dark'))
        // document.body.style.backgroundColor = "rgb(19, 19, 19)"
        // document.body.style.color = "white"
        // current.style.backgroundColor = "white"
        // darkMode.style.color = "black"
        // darkMode.style.backgroundColor = "white"
        darkMode.innerHTML = "Light Mode"
    }
})