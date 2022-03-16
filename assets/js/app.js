let username = document.querySelector(".username")
let wrapper = document.querySelector(".wrapper")
let formContainer = document.querySelector(".formContainer")

document.querySelector(".cancel").addEventListener("click", closeApp)
document.querySelector(".calculate").addEventListener("click", renderContent)
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if(e.matches) setDisplayMode("dark")
    else setDisplayMode("white")
})

function setDisplayMode(mode) {
    document.querySelector("meta[name=theme-color]").setAttribute("content", mode == "dark" ? "#000000" : "#ffffff")    
}

function generateNumber(string) {
    let number = 0;
    for (let i = 0; i < string.length; i++) {
        number += string.charCodeAt(i);
    }
    return number;
}

function getPercent(number) {
    if(number < 100) return `${number}%`;
    return `${number.toString().slice(0, 2)}.${number.toString().slice(2)}%`;
}

function renderHtmlForName(data) {
    let html = `<div class="contentContainer">
                <div class="name">
                    ${data.text} is
                </div>
                <div class="percentContainer">
                    ${data.value}
                </div>
                <div class="name">
                    Gay
                </div>
            </div>`

    return html
}

function renderContent() {
    let text = username.value.trim()
    if(text == "" || text == null ) return

    let value = generateNumber(text)
    value = getPercent(value)

    let html = renderHtmlForName({text, value})
    requestAnimationFrame(() => {
        wrapper.innerHTML = html + wrapper.innerHTML
    })
    formContainer.remove()
}

function closeApp() {
    window.open('','_self').close()
}

setDisplayMode(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "white")