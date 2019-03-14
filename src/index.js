// код тут
var controlPanel= document.querySelector(".control-panel");
var formPanel = document.querySelector(".form-inline");
var button1 = document.getElementById("add_note");
var buton2 = document.getElementById("remove_notes");
var input = document.querySelector(".search-field");
var notestList = document.querySelector(".notes-list");

var arrData = [];



console.log(arrData);

button1.onclick = function(){
  var url = 'https://api.chucknorris.io/jokes/random';
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      arrData.push(data.value);
      renderList(arrData);
    });
};


buton2.onclick = function(){
    arrData.splice(0,arrData.length);
    renderList(arrData);
};

function renderList(array){
  notestList.innerHTML= ""; // !!
  for (let index = 0; index < array.length; index++) { 
    let text = array[index];
    renderNote(text, index);
  }
};

function renderNote(text, index){
  
    var note = document.createElement("div");
    
    note.setAttribute("style","background-color:" + randomBackground());
    note.className = "note";
    notestList.appendChild(note);

    var content = document.createElement("div");
    content.className = "content";
    content.textContent = " " + text;
    note.appendChild(content);

    var overlay = document.createElement("div");
    overlay.className = "overlay";
    note.appendChild(overlay);

    var edit = document.createElement("button");
    edit.className = "btn btn-warning";
    edit.textContent = 'Edit';
    overlay.appendChild(edit);

    edit.onclick = function(){
      var newText = prompt("Введите свой вариант",text);
      arrData[index] = newText;
      renderList(arrData);
    }

    var del = document.createElement("button");
    del.className = "btn btn-danger";
    del.textContent = 'Del';
    overlay.appendChild(del);

    del.onclick = function() {
      arrData.splice(index, 1);
      renderList(arrData);
    };

  
};

input.oninput = function(){
  let valueInput = input.value.trim();
    
  let filterData = arrData.filter(function (item) {
    return item.toLowerCase().trim().includes( valueInput.toLowerCase().trim() );
  });

  renderList(filterData);
};

function randomBackground() 
{
    var r = function () { return Math.floor(Math.random()*256) };

    const chakinspennis = `rgb(${r()},${r()},${r()})`;
    
    console.log(chakinspennis);
    return chakinspennis;
}

randomBackground();

window.beforeUnload = function () {
  localStorage.setItem('chuck', JSON.stringify(arrData));
};

arrData = JSON.parse(localStorage.getItem('chuck'));



