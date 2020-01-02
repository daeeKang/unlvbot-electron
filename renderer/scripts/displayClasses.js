function generateClassTable(results){
    let container = document.getElementById('view-classes-container');

    for(let i = 0; i < results.length; i++){
        const but = document.createElement('button');
        but.className = 'accordion';
        but.textContent = results[i].className;
        let innerhtml;
        for(let k = 0; k < results[i].classes.length; k++){
            innerhtml += `
            <div class='panel'>
                <p> ` + results[i].classes[k].dayTime + ` <p>
            </div>
            `
        }
        but.innerHTML = innerhtml;
        container.appendChild(but);
    }

    addAccordianToTable();
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


/*
    <div id='view-classes-container'>
        <button class="accordion">Section 1</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>

            <button class="accordion">Section 2</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>

            <button class="accordion">Section 3</button>
            <div class="panel">
            <p>Lorem ipsum...</p>
            </div>
    </div>
*/