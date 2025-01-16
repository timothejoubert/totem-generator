import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {closeAllControls, shuffleAllTotemElement} from "./totem-element.ts";
import {getCurrentCssVars, setCssVar} from "./color-inputs.ts";


// COMMON
const appElement = document.querySelector<HTMLDivElement>('#app')
const userPanel = document.querySelector<HTMLDivElement>('.user-panel')

// USER PANEL
const shuffleButton = document.querySelector<HTMLButtonElement>('.global-shuffle')
const showGridButton = document.querySelector<HTMLButtonElement>('.show-grid')

const downloadButton = document.querySelector<HTMLInputElement>('#download')
const downloadPngButton = document.querySelector<HTMLInputElement>('#download-png')


function toggleGrid() {
    if(appElement) appElement.classList.toggle('grid-showed')
}

function onKeyDown(event: KeyboardEvent) {
    if(event.key === ' ') shuffleAllTotemElement()
}

const downloadIndex = {
    get: () => {
        const storageValue = localStorage.getItem("totem-index-download")
        return Number(storageValue || 0)
    },
    add: () => {
        const newValue = downloadIndex.get() + 1
        localStorage.setItem("totem-index-download", newValue.toString());
    },
}

function saveScreenWithoutBg() {
    const storedValue = getCurrentCssVars()

    Object.entries(storedValue).forEach(([name, _value]) => {
        if(name.includes('background')) {
            setCssVar(name, '')
        }
    })


    saveScreen(() => {
        Object.entries(storedValue).forEach(([name, value]) => {
            if(name.includes('background')) {
                setCssVar(name, value as string)
            }
        })
    })
}

function saveScreen(callback?: Function) {
    if(!appElement) return

    if (userPanel) userPanel.style.display = 'none'
    closeAllControls()

    domtoimage.toBlob(appElement).then((blob: any) => {
        const fileName = `totem-${downloadIndex.get()}`
        saveAs?.(blob, `${fileName}.png`);
        downloadIndex.add()

        if (userPanel) userPanel.style.display = 'initial'
        callback?.()
    });
}



function initUserPanel() {
    // Main
    window.addEventListener('keydown', onKeyDown)
    if(shuffleButton) shuffleButton.addEventListener('click', shuffleAllTotemElement)
    if(showGridButton) showGridButton.addEventListener('click', toggleGrid)

    if(downloadButton) downloadButton.addEventListener('click', () =>  saveScreen())
    if(downloadPngButton) downloadPngButton.addEventListener('click', saveScreenWithoutBg)
}

export { initUserPanel }
