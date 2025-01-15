import {getRandomIndex} from "./utils.ts";
import * as icons from "../assets/totem/index.ts"

// COMMONS
const TOTEM_IMG_LENGTH = 4

const totemSections = [...document.querySelectorAll<HTMLElement>('.totem-section')]

const totemElements = totemSections.map(section => {
    const content = section.querySelector<HTMLDivElement>('.totem-section-content') || section
    const controls = section.querySelector<HTMLDivElement>('.totem-section-controls') || section
    const inputs = section.querySelectorAll('input') || [section]
    const buttons = section.querySelectorAll('button') || [section]

    return {
        section,
        content,
        controls,
        inputs: [...inputs],
        buttons: [...buttons],
        type: section.getAttribute('data-totem-section')
    }
})

type TotemElement = typeof totemElements[number]

function shuffleAllTotemElement() {
    totemElements.forEach((totem) => {
        insertRandomImg(totem)
    })
}

// Rename to bodySection, TotemSection and refactor DOM
// Display current TotemSection controls
function onTotemSectionClicked(event: Event, totem: TotemElement) {
    if (event.target !== totem.section) return

    totem.controls.classList.toggle('visible')
}

function insertImg(totem: TotemElement, index: number = 0) {
    const svgFileName = `${totem.type}${index.toString()}`
    totem.content.innerHTML = (icons as Record<string, string>)[svgFileName]
}

function insertRandomImg(totem: TotemElement) {
    insertImg(totem, getRandomIndex(TOTEM_IMG_LENGTH))
}


function onTotemInputChange(event: Event, totem: TotemElement) {
    event.stopPropagation()
    event.stopImmediatePropagation()

    const inputEl = event.target as HTMLInputElement
    const styleKey = inputEl?.getAttribute('data-input-style') || ''
    if(styleKey) totem.section.style[styleKey] = inputEl.value
}


function resetColors() {
    totemElements.forEach(totem => {
        totem.section.style.backgroundColor = 'inherit';
        totem.section.style.color = 'inherit';
    })
}

function onTotemButtonClick(event: Event, totem: TotemElement) {
    event.stopPropagation()
    event.stopImmediatePropagation()

    const buttonEl = event.target as HTMLInputElement
    const action = buttonEl?.getAttribute('data-button-action') || ''

    if(action === 'shuffle') insertRandomImg(totem)
    else if(action === 'reset') resetColors()
}

function initTotemItems() {
    totemElements.forEach((totem) => {
        insertImg(totem, 0)
        totem.section.addEventListener('click', (e) => onTotemSectionClicked(e, totem), { capture: true })

        totem.buttons.forEach(input => {
            input.addEventListener('click', (e) => onTotemButtonClick(e, totem))
        })

        totem.inputs.forEach(input => {
            input.addEventListener('input', (e) => onTotemInputChange(e, totem))
        })
    })
}

export { insertImg, insertRandomImg, shuffleAllTotemElement, initTotemItems, resetColors }
