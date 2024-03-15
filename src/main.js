let color="yellow";
const div = document.getElementById("show");
const waren=document.getElementById("waren");
const p=document.getElementById("price");
let product;

function getData() {
  return fetch("data/data.json")
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data.items;
    });
}
function filter(items,type,farbe){
  div.innerHTML="";
  color=farbe;
  
  if(type==""&& color==""){
     product = items;
    console.log(product);
  }else if(type==""&& color!=""){
     product = items.filter((key) => key.color == color);
  }else if(type!=""&& color==""){
    product = items.filter((key) => key.type==type);
 }
  else{
     product = items.filter((key) => key.type ==type && key.color==color);
  }
  for (let x = 0; x < product.length; x++) {
    div.innerHTML+=
    `<li id="${x}"><img id="${x}"src="${product[x].image}"><label id="${x}">${product[x].gender}</label>,
    <label id="${x}">${product[x].size}</label>,
    <label id="${x}"> ${product[x].preis} $</label>
    </li><br>`
    
  }
}

function addEventListner(items) {
  const buttonLogo=document.getElementById("main");
  buttonLogo.addEventListener("click", ()=>filter(items,"",""));
  const buttonT = document.getElementById("shirt");
  buttonT.addEventListener("click", ()=> filter(items,"tshirt",""));
  const buttonS=document.getElementById("skirt");
  buttonS.addEventListener("click", ()=> filter(items,"skirt",""));
  const buttonP=document.getElementById("pants");
  buttonP.addEventListener("click", ()=> filter(items,"pants",""));
  const buttonBlue=document.getElementById("blue");
  buttonBlue.addEventListener("click", ()=> filter(items,"","blue"));
  const buttonYellow=document.getElementById("yellow");
  buttonYellow.addEventListener("click", ()=> filter(items,"","yellow"));
  const buttonPink=document.getElementById("pink");
  buttonPink.addEventListener("click", ()=> filter(items,"","pink"));

}

let warenKorb=[];

div.addEventListener('click', function(event){
  let selected = event.target;
              
  console.log(selected);
  warenKorb.push(product[selected.id]);
  console.log(warenKorb);
 
})


function zeigeWarenkorb(){
  div.innerHTML="";
  waren.innerHTML = "";
  
  for(let h=0; h<warenKorb.length; h++){
      console.log(warenKorb);  // imam array

      waren.innerHTML += `<li id="${h}" class="li">
      <img id="${h}" src="${warenKorb[h].image}">  
      <label id="${h}">${warenKorb[h].gender}</label>,
      <label id="${h}">${warenKorb[h].size}</label>,
      <label id="${h}"> ${warenKorb[h].preis} $</label>
      <button class="delete" id="${h}" onclick="removeItems(${h})">X</button>
      </li>`;
  }
  p.textContent = `Total summe : ${summe()} $`;
}

function summe() {
  return warenKorb.reduce((summe, items) => summe + items.preis, 0).toFixed(2);
}
function removeItems(e){
  let remove = e.target;
  warenKorb.splice(remove, 1);
  waren.innerHTML = "";
  zeigeWarenkorb();
}


getData()
  .then((ergebnis) => {
    console.log(ergebnis);
    addEventListner(ergebnis);
   
  })
  .catch((err) => {});