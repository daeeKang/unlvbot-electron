const ipc = require('electron').ipcRenderer;

const updateBtn = document.getElementById("get-class-button");

function getClasses() {
  let classDetails = {
    className: 'cs',
    classNum: '135',
    isOpen: false
  }

  ipc.send("get-class", classDetails);
}

ipc.on('got-class', (event, message) => {
  console.log(message);
});