const ipc = require('electron').ipcRenderer;

var classCount = 0;
var reqInFlight = 0;
var amInFlight = false;
var results = [];

function addClass(){
  if(classCount++ == 0){
    document.getElementById('remove-class-button').style.display = 'block';
    document.getElementById('get-class-button').style.display = 'inline-block';
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
  if(amInFlight) return;

  amInFlight = true;
  toggleGetClassButton();
  for(let i = 0; i < classCount; i++){
    let classDetails = {}; 

    classDetails.className = document.getElementById('class' + (i + 1)).value;
    classDetails.classNum = document.getElementById('num' + (i + 1)).value;
    classDetails.isOpen = false;

    ipc.send("get-class", classDetails);
    reqInFlight++;
  }

  //disable inputs
  let inputs = document.getElementsByTagName('input');
  for(let i = 0; i < inputs.length; i++){
    inputs[i].disabled = true;
  }
}

//for electron when webscrape is done
ipc.on('got-class', (event, message) => {
  results.push(message);
  reqInFlight--;
  console.log(message);

  if(reqInFlight == 0) {
    console.log('finished all reqs');

    toggleGetClassButton();
    //enable inputs
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
      inputs[i].disabled = false;
    }

    amInFlight = false;

    document.getElementById('get-classes-container').style.display = 'none';
    generateClassTable(results);
  }
});

function toggleGetClassButton(){
  if(document.getElementById('get-class-button').disabled == true){
    document.getElementById('loading-gif').style.display = 'none';
    document.getElementById('get-class-button').disabled = false;
    document.getElementById('remove-class-button').style.display = 'block';
    if(classCount != 6)
      document.getElementById('add-class-button').style.display = 'block';
  } else {
    document.getElementById('loading-gif').style.display = 'inline-block';
    document.getElementById('get-class-button').disabled = true;
    document.getElementById('remove-class-button').style.display = 'none';
    document.getElementById('add-class-button').style.display = 'none';
  }
}

