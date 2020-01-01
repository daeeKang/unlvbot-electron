const ipc = require('electron').ipcRenderer;

var classCount = 0;

function addClass(){
  if(classCount++ == 0){
    document.getElementById('remove-class-button').style.display = 'block';
    document.getElementById('get-class-button').style.display = 'block';
  } else if (classCount == 6) {
    document.getElementById('add-class-button').style.display = 'none';
  }

  let container = document.getElementById('form-container');
  const div = document.createElement('div');
  div.id = "form" + classCount;
  div.innerHTML = `        
    <div>
      <input type="text" maxlength='3' class='class-input' id="class` + classCount + `" placeholder="Class">
      <input type="text" maxlength='3' class='class-input' id="num` + classCount + `" placeholder="Num">
    </div>
  `;

  container.appendChild(div);
}

function removeClass(){
  document.getElementById("form" + classCount).outerHTML = "";

  if(--classCount == 0){
    document.getElementById('remove-class-button').style.display = 'none';
    document.getElementById('get-class-button').style.display = 'none';
  }

  if(classCount == 5) {
    document.getElementById('add-class-button').style.display = 'inline-block';
  }
}

function getClasses() {
  for(let i = 0; i < classCount; i++){
    let classDetails = {}; 

    classDetails.className = document.getElementById('class' + (i + 1)).value;
    classDetails.classNum = document.getElementById('num' + (i + 1)).value;
    classDetails.isOpen = false;

    ipc.send("get-class", classDetails);
  }
}

ipc.on('got-class', (event, message) => {
  console.log(message);
});