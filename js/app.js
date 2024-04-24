// création de mon objet
const app = {
  drawingColor: "black", // couleur du dessin initiale
  colors: ["white", "black", "orange", "green"], // palette de couleur disponible

  gridElem: document.querySelector("#invader"), // élément DOM de la grille
  formElem: document.querySelector(".configuration"), // élément DOM du formulaire de config

  init() {
    app.createForm();
    app.gridElem.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("pixel")) {
        // je verif si élément click est un pixel
        app.changePixelColor(evt.target); // Changement couleur du pixel
      }
    });
    app.createPalette();
    app.generateGrid(10, 20);
  },

  // Change la couleur du pixel sélectionné
  changePixelColor(pixel) {
    if (pixel.classList.length > 1 && pixel.classList[1] === app.drawingColor) {
      pixel.className = "pixel";
    } else {
      pixel.className = "pixel " + app.drawingColor;
    }
  },

  // Init de la palette de couleurs pour dessins
  createPalette() {
    const paletteElem = document.createElement("div");
    paletteElem.classList.add("palette");
    for (const color of app.colors) {
      const swatchElem = document.createElement("div");
      swatchElem.classList.add("swatch");
      swatchElem.classList.add(color);
      swatchElem.setAttribute("data-color", color);
      paletteElem.appendChild(swatchElem);
    }
    paletteElem.addEventListener("click", app.changeColor);
    document.body.appendChild(paletteElem);
  },

  // Applique la couleur sélectionnée comme couleur de dessin
  changeColor(event) {
    if (event.target.classList.contains("swatch")) {
      app.drawingColor = event.target.getAttribute("data-color");
    }
  },

  // Crée le formulaire pour configurer la grill
  createForm() {
    const gridSizeInputElem = document.createElement("input");
    const pixelSizeInputElem = document.createElement("input");
    const submitButtonElem = document.createElement("button");

    gridSizeInputElem.type = "number";
    pixelSizeInputElem.type = "number";
    submitButtonElem.type = "submit";

    gridSizeInputElem.placeholder = "Taille de la grille";
    pixelSizeInputElem.placeholder = "Taille des pixels";
    submitButtonElem.textContent = "Valider";

    app.formElem.appendChild(gridSizeInputElem);
    app.formElem.appendChild(pixelSizeInputElem);
    app.formElem.appendChild(submitButtonElem);

    app.formElem.addEventListener("submit", function (event) {
      event.preventDefault();
      app.generateGrid(gridSizeInputElem.value, pixelSizeInputElem.value);
    });
  },

  // Crée et affiche la grille basée sur les dimensions spécifiées
  generateGrid(gridSize, pixelSize) {
    app.gridElem.innerHTML = "";
    app.gridElem.style.width = pixelSize * gridSize + "px";
    app.gridElem.style.height = pixelSize * gridSize + "px";
    for (let position = 0; position < gridSize * gridSize; position++) {
      const pixelElem = app.createPixel(pixelSize);
      app.gridElem.appendChild(pixelElem);
    }
  },

  // Crée un pixel avec la taille spécifiée
  createPixel(pixelSize) {
    const pixelElem = document.createElement("div");
    pixelElem.classList.add("pixel");
    pixelElem.style.width = pixelSize + "px";
    pixelElem.style.height = pixelSize + "px";
    return pixelElem;
  },
};

app.init(); // Lance l'initialisation de l'application
