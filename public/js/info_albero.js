const params = new URLSearchParams(document.location.search);
const id = params.get("id");
console.info("Tree ID: ", id);

let currentSlide = 0;

let immagini = [];

let c = document.getElementById("all");
let top_player = document.getElementById("top-player");
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
let keys = document.getElementById("keys");
let b_name = document.getElementById("b-name");
let order = document.getElementById("order");
let family = document.getElementById("family");
let genus = document.getElementById("genus");

function loadInfo() {
  // console.log("top_player:", top_player);
  if (allTrees) {
    console.log("allTrees:", allTrees);
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
    const URL_img = `/public/assets/01_img/shop/02_slideshow/${tree.id}`;
    slide.setAttribute("src", ` ${URL_img}/a.jpg`);
    immagini = [`${URL_img}/a.jpg`, `${URL_img}/c.jpg`];

    //  prezzo
    prezzo_span.innerHTML = `${prezzo} €`;

    //  Descrizione
    titoletto.innerHTML = tree.type;
    forest.innerHTML = `${tree.provenienza}`;
    lat.innerHTML = tree.lat;
    lng.innerHTML = tree.lng;
    descrizione.innerHTML = tree.descrizione;
    foto.setAttribute(
      "src",
      `/public/assets/01_img/shop/03_trees/${tree.id}.jpg `
    );

    //  Classificazione scientifica
    b_name.innerHTML = tree.bionomial_name;
    order.innerHTML = tree.order;
    family.innerHTML = tree.family;
    genus.innerHTML = tree.genus;

    const features = ["softness", "resistence", "thickness", "absorbency"];
    //Adding keys
    features.forEach((f, index) => {
      const card = document.createElement("div");
      card.setAttribute("class", "m-auto");
      const img = document.createElement("img");
      img.setAttribute("class", `w-24 my-3`);
      const value = tree[f];
      img.src = `/public/assets/01_img/shop/05_features/${value}.svg`;
      const tag = capitalizeFirstLetter(f);
      const diva = document.createElement("div");
      diva.innerHTML = tag;

      card.appendChild(img);
      card.appendChild(diva);

      keys.appendChild(card);
    });

    const URL_texture = `/public/assets/01_img/shop/04_texture/${tree.id}`;
    sx.setAttribute("src", `${URL_texture}/sx.svg`);
    sx.setAttribute("alt", `${tree.type}`);
    dx.setAttribute("src", `${URL_texture}/dx.svg`);
    dx.setAttribute("alt", `${tree.type}`);

    link_banner.setAttribute(
      "class",
      `text-${colore} font-thin md:text-lg sm:text-base xxs:text-lg hover:underline`
    );
  }

  c.classList.toggle("hidden");
  top_player.classList.toggle("invisible");
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
    currentSlide = 1;
  }
  showSlide();
}

function nextSlide() {
  currentSlide = currentSlide + 1;
  if (currentSlide === 2) {
    currentSlide = 0;
  }
  showSlide();
}

function showSlide() {
  let imageFile = immagini[currentSlide];
  let imgTag = document.getElementById("slide");
  imgTag.src = imageFile;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
