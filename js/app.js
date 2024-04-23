// valeur de nos éléments
let gridSize = 8;
let pixelSize = 20;
let color = ["rgb(209, 218, 226)", "rgb(72, 84, 96)"];
const invaderElem = document.getElementById("invader");
const form = document.querySelector(".configuration");

//Formulaire
const input = document.createElement("input");
input.type = "number";
input.placeholder = "Taille de la grille";
// input.value = gridSize;
input.name = "gridSize";
form.appendChild(input);

const input2 = document.createElement("input");
input2.type = "number";
input2.placeholder = "Taille des pixels";
// input2.value = pixelSize;
input2.name = "pixelSize";
form.appendChild(input2);

const submit = document.createElement("input");
submit.type = "submit";
form.appendChild(submit);

// génére un pixel
function createPixel() {
  const pixelElem = document.createElement("div");
  pixelElem.classList.add("pixel");
  pixelElem.style.width = pixelSize + "px";
  pixelElem.style.height = pixelSize + "px";
  pixelElem.style.backgroundColor = color[0];
  return pixelElem;
}

// génére la grid
function generateGrid() {
  invaderElem.style.width = pixelSize * gridSize + "px";
  invaderElem.style.height = pixelSize * gridSize + "px";
  for (let position = 0; position < gridSize * gridSize; position++) {
    const pixelElem = createPixel();
    invaderElem.appendChild(pixelElem);
  }
}
generateGrid();

// change la couleur de notre pixel
function changePixelColor(pixel) {
  if (pixel.style.backgroundColor === color[0]) {
    pixel.style.backgroundColor = color[1];
  } else {
    pixel.style.backgroundColor = color[0];
  }
}

// évént qui écoute le click de nos pixel
invaderElem.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("pixel")) {
    changePixelColor(evt.target);
  }
});
