const app = {
  drawingColor: "black",
  colors: ["white", "black", "orange", "green"],

  gridElem: document.querySelector("#invader"),
  formElem: document.querySelector(".configuration"),

  init() {
    app.createForm();
    app.gridElem.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("pixel")) {
        app.changePixelColor(evt.target);
      }
    });
    app.createPalette();
    app.generateGrid(10, 20);
  },

  changePixelColor(pixel) {
    if (pixel.classList.length > 1 && pixel.classList[1] === app.drawingColor) {
      pixel.className = "pixel";
    } else {
      pixel.className = "pixel " + app.drawingColor;
    }
  },

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

  changeColor(event) {
    if (event.target.classList.contains("swatch")) {
      app.drawingColor = event.target.getAttribute("data-color");
    }
  },

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

  generateGrid(gridSize, pixelSize) {
    app.gridElem.innerHTML = "";
    app.gridElem.style.width = pixelSize * gridSize + "px";
    app.gridElem.style.height = pixelSize * gridSize + "px";
    for (let position = 0; position < gridSize * gridSize; position++) {
      const pixelElem = app.createPixel(pixelSize);
      app.gridElem.appendChild(pixelElem);
    }
  },

  createPixel(pixelSize) {
    const pixelElem = document.createElement("div");
    pixelElem.classList.add("pixel");
    pixelElem.style.width = pixelSize + "px";
    pixelElem.style.height = pixelSize + "px";
    return pixelElem;
  },
};

app.init();
