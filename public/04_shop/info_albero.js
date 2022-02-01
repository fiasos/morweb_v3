const params = new URLSearchParams(document.location.search);
const id = params.get("id");
console.info("Tree ID: ", id);

let currentSlide = 0;

let immagini = [];

let titolo = document.getElementById("titolo");
let provenienza = document.getElementById("provenienza");
let slide = document.getElementById("slide");
let prezzo_span = document.getElementById("prezzo");
let titoletto = document.getElementById("titolett");
let forest = document.getElementById("forest");
let lat = document.getElementById("lat");
let lng = document.getElementById("lng");
let descrizione = document.getElementById("descrizione");
let foto = document.getElementById("foto");
let dx = document.getElementById("dx");
let sx = document.getElementById("sx");
let link_banner = document.getElementById("link_banner");

function loadInfo() {
  if (allTrees) {
    const tree = allTrees[id - 1];
    let prezzo = 0;
    let colore = "";

    switch (tree.class) {
      case "base":
        prezzo = 0.04;
        colore = "verdebase";
        break;

      case "regular":
        prezzo = 0.08;
        colore = "regular";
        break;
      case "premium":
        prezzo = 0.12;
        colore = "premium";
        break;
    }

    //  Titolo
    titolo.innerHTML = tree.type;
    provenienza.innerHTML = tree.provenienza;

    //  Slideshow
    const URL_img = `/public/04_shop/01_img/02_slideshow/${tree.id}`;
    slide.setAttribute("src", ` ${URL_img}/a.jpg`);
    immagini = [`${URL_img}/a.jpg`, `${URL_img}/b.jpg`, `${URL_img}/c.jpg`];

    //  prezzo
    prezzo_span.innerHTML = `€ ${prezzo}`;

    //  Descrizione
    titoletto.innerHTML = tree.type;
    forest.innerHTML = `Ancient Forest, ${tree.provenienza}`;
    lat.innerHTML = tree.lat;
    lng.innerHTML = tree.lng;
    descrizione.innerHTML = tree.descrizione;
    foto.setAttribute("src", `01_img/03_trees/${tree.id}.jpg `);

    //   features.innerHTML = "BellaAA"

    const URL_texture = `/public/04_shop/01_img/04_texture/${tree.id}`;
    sx.setAttribute("src", `${URL_texture}/sx.svg`);
    sx.setAttribute("alt", `${tree.type}`);
    dx.setAttribute("src", `${URL_texture}/dx.svg`);
    dx.setAttribute("alt", `${tree.type}`);

    //! Non cambia colore
    link_banner.setAttribute(
      "class",
      `text-${colore} font-thin md:text-lg sm:text-base xxs:text-lg hover:underline`
    );
  }
}

async function asyncCall() {
  console.log("calling");
  const result = await firebaseSetup();
  console.log(result);

  if (result == "resolved") loadInfo();
}

asyncCall();

//  Per slideshow
function prevSlide() {
  currentSlide = currentSlide - 1;
  if (currentSlide === -1) {
    currentSlide = 2;
  }
  showSlide();
}

function nextSlide() {
  currentSlide = currentSlide + 1;
  if (currentSlide === 3) {
    currentSlide = 0;
  }
  showSlide();
}

function showSlide() {
  let imageFile = immagini[currentSlide];
  let imgTag = document.getElementById("slide");
  imgTag.src = imageFile;
}
