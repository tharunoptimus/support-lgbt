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


function closeApp() {
    window.open('','_self').close()
}