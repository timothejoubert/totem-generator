// COMMON
const appElement = document.querySelector('#app')
const userPanel = document.querySelector('.user-panel')

// USER PANEL
const shuffleButton = document.querySelector('.global-shuffle')
const showGridButton = document.querySelector('.show-grid')

const downloadButton = document.querySelector('#download')
const downloadPngButton = document.querySelector('#download-png')

function toggleGrid() {
    if(appElement) appElement.classList.toggle('grid-showed')
}

function onKeyDown(event) {
    if(event.key === ' ') window.appMethod.shuffleAllTotemElement?.()
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
    const storedValue = window.appMethod.getCurrentCssVars?.()

    Object.entries(storedValue).forEach(([name, _value]) => {
        if(name.includes('background')) {
            window.appMethod.setCssVar?.(name, '')
        }
    })


    saveScreen(() => {
        Object.entries(storedValue).forEach(([name, value]) => {
            if(name.includes('background')) {
                window.appMethod.setCssVar?.(name, value)
            }
        })
    })
}

function saveScreen(callback) {
    if(!appElement) return

    if (userPanel) userPanel.style.display = 'none'
    window.appMethod.closeAllControls?.()

    window.domtoimage.toBlob(appElement).then((blob) => {
        const fileName = `totem-${downloadIndex.get()}`
        saveAs?.(blob, `${fileName}.png`);
        downloadIndex.add()

        if (userPanel) userPanel.style.display = 'initial'
        callback?.()
    }).catch(e => {
        console.error('error during download', e)
    });
}

function initUserPanel() {
    // Main
    window.addEventListener('keydown', onKeyDown)
    if(shuffleButton) shuffleButton.addEventListener('click', () => window.appMethod.shuffleAllTotemElement?.())
    if(showGridButton) showGridButton.addEventListener('click', toggleGrid)

    if(downloadButton) downloadButton.addEventListener('click', () =>  saveScreen())
    if(downloadPngButton) downloadPngButton.addEventListener('click', saveScreenWithoutBg)
}

initUserPanel()

