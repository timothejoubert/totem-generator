import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { shuffleAllTotemElement, resetColors as resetItemsColors } from "./totem-element.ts";


// COMMON
const DEFAULT_TOTEM_COLOR = '#000000'
const DEFAULT_BG_COLOR = '#ffffff'
const DEFAULT_SURFACE_COLOR = '#f3f3f3'

const appElement = document.querySelector<HTMLDivElement>('#app')
const mainElement = document.querySelector<HTMLDivElement>('.totem')
const userPanel = document.querySelector<HTMLDivElement>('.user-panel')

// USER PANEL
const shuffleButton = document.querySelector<HTMLButtonElement>('.global-shuffle')
const showGridButton = document.querySelector<HTMLButtonElement>('.show-grid')

const colorTotemButton = document.querySelector<HTMLInputElement>('#global-totem-color')
const colorBgButton = document.querySelector<HTMLInputElement>('#global-bg-color')
const colorSurfaceButton = document.querySelector<HTMLInputElement>('#global-surface-color')
const resetColorButton = document.querySelector<HTMLInputElement>('#global-reset-color')
const downloadButton = document.querySelector<HTMLInputElement>('#download')
const downloadPngButton = document.querySelector<HTMLInputElement>('#download-png')


function toggleGrid() {
    if(appElement) appElement.classList.toggle('grid-showed')
}

function onChangeColor(event:Event) {
    const color = (event.target as HTMLInputElement)?.value
    if(mainElement && color) mainElement.style.color = color
}

function onChangeBgColor(event:Event) {
    const color = (event.target as HTMLInputElement)?.value
    if(appElement && color) appElement.style.backgroundColor = color
}

function onChangeSurfaceColor(event:Event) {
    const color = (event.target as HTMLInputElement)?.value
    if(mainElement && color) mainElement.style.backgroundColor = color
}

function setColors(colors: {color: string | undefined; bg: string | undefined; surface: string | undefined}) {
    if (appElement && colors.bg) {
        appElement.style.backgroundColor = colors.bg
        colorBgButton!.value = colors.bg
    }
    if(mainElement && colors.color && colors.surface) {
        mainElement.style.backgroundColor = colors.surface
        colorSurfaceButton!.value = colors.surface

        mainElement.style.color = colors.color
        colorTotemButton!.value = colors.color
    }
}

function resetColors(removeBg: boolean = false) {
    const bg = removeBg ? 'initial' : DEFAULT_BG_COLOR
    const surface = removeBg ? 'initial' : DEFAULT_SURFACE_COLOR
    setColors({color: DEFAULT_TOTEM_COLOR, bg, surface})
    resetItemsColors()
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

function download(removeBg: boolean = false) {
    if(!appElement) return


    let storedColors = {
        color: mainElement ? getComputedStyle(mainElement).color : undefined,
        bg: appElement ? getComputedStyle(appElement).backgroundColor : undefined,
        surface: mainElement ? getComputedStyle(mainElement).backgroundColor : undefined
    }
    if (removeBg) resetColors(true)
    if (userPanel) userPanel.style.display = 'none'

    domtoimage.toBlob(appElement).then((blob: any) => {
        const fileName = `totem-${downloadIndex.get()}`
        saveAs?.(blob, `${fileName}.png`);
        downloadIndex.add()

        if (userPanel) userPanel.style.display = 'initial'
        if (removeBg) setColors(storedColors)
    });
}

function initUserPanel() {
    // Main
    window.addEventListener('keydown', onKeyDown)
    if(shuffleButton) shuffleButton.addEventListener('click', shuffleAllTotemElement)
    if(showGridButton) showGridButton.addEventListener('click', toggleGrid)

    // Colors
    if(colorTotemButton) colorTotemButton.addEventListener('input', onChangeColor)
    if(colorBgButton) colorBgButton.addEventListener('input', onChangeBgColor)
    if(colorSurfaceButton) colorSurfaceButton.addEventListener('input', onChangeSurfaceColor)
    if(resetColorButton) resetColorButton.addEventListener('click', () => resetColors())
    if(downloadButton) downloadButton.addEventListener('click', () => download())
    if(downloadPngButton) downloadPngButton.addEventListener('click', () => download(true))
}

export { initUserPanel }
