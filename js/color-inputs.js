// UTILS


// COLOR INPUTS
const root = document.querySelector(':root');
const colorInputElements = [...document.querySelectorAll('input[type="color"]')]

const cssVarNameColor = [
    '--color-global',
    '--color-global-background',
    '--color-global-background-surface',
    '--color-global-background-grid',
    '--color-head',
    '--color-head-background',
    '--color-body',
    '--color-body-background',
    '--color-leg',
    '--color-leg-background',
    '--color-foot',
    '--color-foot-background',
]

function getCurrentCssVars() {
    return cssVarNameColor.reduce((acc, name) => {
        Object.assign(acc, {[name]: getCssVar(name)})
        return acc
    }, {})
}

const defaultCssVarList = getCurrentCssVars()

function getCssVar(name) {
    if (!root) return
    return getComputedStyle(root).getPropertyValue(name)
}

function setCssVar(name, value) {
    if(!root) return
    root.style.setProperty(name, value);
}

function onInputChange(event) {
    const input = event.target
    const cssColorName =  input.getAttribute('data-color-input')
    setCssVar(`--${cssColorName}`, input.value)
}

// RESET COLORS
const resetButtonColorElements = [...document.querySelectorAll('button[data-color-reset]')]

function onResetClick(event) {
    const input = event.target
    const itemToReset =  input.getAttribute('data-color-reset') || ''

    Object.entries(defaultCssVarList).forEach(([name, value]) => {
        if(name.includes(itemToReset) || itemToReset === 'global') {
            setCssVar(name, value)
        }
    })
}

// INIT COLORS
function initColorInputs() {
    colorInputElements.forEach(input => {
        input.addEventListener('input', onInputChange)
    })

    resetButtonColorElements.forEach(button => {
        button.addEventListener('click', onResetClick)
    })
}

function setGlobalMethods() {
    Object.assign(window, {
        appMethod: {
            getCurrentCssVars: getCurrentCssVars,
            setCssVar: setCssVar,
        }
    })
}

initColorInputs()
setGlobalMethods()
