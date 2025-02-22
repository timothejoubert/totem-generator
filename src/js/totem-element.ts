import {getRandomIndex} from "./utils.ts";
import * as icons from "../assets/totem/index.ts"

// COMMONS
const totemSections = [...document.querySelectorAll<HTMLElement>('.totem-section')]

const totemElements = totemSections.map(section => {
    const content = section.querySelector<HTMLDivElement>('.totem-section-content') || section
    const controls = section.querySelector<HTMLDivElement>('.totem-section-controls') || section
    const inputs = section.querySelectorAll('input') || [section]
    const shuffleButton = section.querySelector('.shuffle') || section

    return {
        section,
        content,
        controls,
        inputs: [...inputs],
        shuffleButton,
        type: section.getAttribute('data-totem-section') || ''
    }
})

type TotemElement = typeof totemElements[number]

function shuffleAllTotemElement() {
    totemElements.forEach((totem) => {
        insertRandomImg(totem)
    })
}

function closeAllControls() {
    totemElements.forEach(totem => {
        totem.controls.classList.remove('visible')
    })
}

function onTotemSectionClicked(event: Event, totem: TotemElement) {
    if (event.target !== totem.section) return

    totem.controls.classList.toggle('visible')
}

function insertImg(totem: TotemElement, index: number = 0) {
    const svgFileName = `${totem.type}${index.toString()}`
    console.log('svgFileName', svgFileName)
    totem.content.innerHTML = (icons as Record<string, string>)[svgFileName]
}

function insertRandomImg(totem: TotemElement) {
    const length = Object.keys(icons).filter(key => key.includes(totem.type)).length

    insertImg(totem, getRandomIndex(length))
}

function initTotemItems() {
    totemElements.forEach((totem) => {
        insertImg(totem, 0)
        totem.section.addEventListener('click', (e) => onTotemSectionClicked(e, totem), { capture: true });
        totem.shuffleButton.addEventListener('click', () => insertRandomImg(totem))
    })
}

export { insertImg, insertRandomImg, shuffleAllTotemElement, initTotemItems, closeAllControls }
