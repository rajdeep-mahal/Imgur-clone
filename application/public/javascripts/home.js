//  FadeOut Function
function fadeOut(id) {
    let element = document.getElementById(id);
    let op = 1;
    let timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.remove();
            num--;
            document.getElementById(
                "items-count"
            ).innerHTML = `<div>There are ${num} photo(s) being shown</div>`;
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 50);
}

let num;
function loadXMLDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let x = JSON.parse(this.responseText);
            num = x.length;
            document.getElementById("items-count").innerHTML = `There are ${num} photo(s) being shown`; // image count and display
            x.forEach((obj) => {
                document.getElementById(
                    "container"
                ).innerHTML += `<div id=${obj.id} class="container" onclick="fadeOut(${obj.id})">
                        <img src=${obj.url}
                        width="200px"
                        height="200px" alt="image"/>
                    <div class="title">${obj.title}</div>
                    </div>`;
            });
        }
    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/albums/2/photos", true);
    xhttp.send();
}
