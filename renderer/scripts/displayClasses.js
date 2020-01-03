function generateClassTable(results){
    let container = document.getElementById('view-classes-container');

    for(let i = 0; i < results.length; i++){
        const span = document.createElement('span');

        let innerhtml = `<button class='accordion'> ` + results[i].className + `</button>`
        innerhtml += `<div class='panel'>`
        for(let k = 0; k < results[i].classes.length; k++){
             innerhtml += generateClassRow(results[i].classes[k], k % 2);
        }
        innerhtml += `</div>`
        span.innerHTML = innerhtml;
        container.appendChild(span);
    }

    addAccordianToTable();
}

function generateClassRow(thisClass, odd){
    let out = '';
    if(odd) 
        out += `<div style='background-color: red'>`
    else 
        out = `<div>`
    out +=
    `
        <div style='display: inline-block'> ${thisClass.dayTime} </div>
        <div style='display: inline-block'> ${thisClass.room} </div>
        <div style='display: inline-block'> ${thisClass.teacher} </div>
        <div style='display: inline-block'> ${thisClass.status} </div>
    </div>
    `
    return out;
}

function addAccordianToTable() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            }
            else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
}