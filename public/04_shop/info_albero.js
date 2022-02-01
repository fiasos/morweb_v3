const params = new URLSearchParams(document.location.search);
const id = params.get("id");
console.info("Tree ID: ", id);

let currentSlide = 0;

let immagini = [];

let titolo = document.getElementById("titolo");
let slideshow = document.getElementById("slides");
let info = document.getElementById("info");
let descrizione = document.getElementById("descrizione");
let features = document.getElementById("features");
let banner = document.getElementById("banner_testo").parentNode;
let banner_testo = document.getElementById("banner_testo");
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
    titolo.innerHTML = `<h1 class="font-cronos font-bold md:text-6xl xxs:text-5xl">${tree.type}</h1> 
      <h2 class="font-cronos font-semibold md:text-4xl xxs:text-3xl">${tree.provenienza}</h2>`;

    //  Slideshow
    const URL_img = `/public/04_shop/01_img/02_slideshow/${tree.id}`;
    slideshow.innerHTML = `<img id="slide" src="${URL_img}/a.jpg" style="width: 100%">`;
    immagini = [`${URL_img}/a.jpg`, `${URL_img}/b.jpg`, `${URL_img}/c.jpg`];
    const div = document.createElement("div");
    div.setAttribute("class", "card");

    //  Info
    info.innerHTML = `<span class="block text-xl font-medium leading-5">€ ${prezzo}</span>
    <span class="block text-lg font-light">per sheet</span>
    <div class="my-6">
        <a href="/public/06_project/project.html" class="button">Subscribe</a>
    </div>`;

    //  Descrizione
    descrizione.innerHTML = `<div class="py-8">
    <div class="flex flex-row justify-between"> 
       <div>
          <span class="titoletto">${tree.type}</span>
             <a href="/public/03_globe/globe.html">
              <ul class="py-3">
                <li class="hover:underline">Ancient Forest,${tree.provenienza}</li> 
                <li>${tree.lat}</li>
                <li>${tree.lng}</li>
              </ul> 
          </a>
          <span class="paragrafo">${tree.descrizione}</span>
          <div class="pt-16">
                <span class="titoletto">Scientific classification</span>
                <div class="py-3 flex flex-row sm:flex-wrap">
                  <ul class="font-medium pr-14 ">
                   <li>Bionomial name</li>
                   <li>Order</li> 
                   <li>Family</li>
                   <li>Genus</li>
                  </ul> 
                  <ul>
                    <li>Acer saccharum</li>
                    <li>Sapindales</li>
                    <li>Sapindaceae</li>
                    <li>Acer</li>
                  </ul>
                </div>
          </div>                           
       </div>
        <img class="w-auto h-140 pl-20 xxs:hidden md:inline-block" src="01_img/03_trees/${tree.id}.jpg">
    </div>
  </div>`;

    //   features.innerHTML = "BellaAA"

    const URL_texture = `/public/04_shop/01_img/04_texture/${tree.id}`;
    const img_sx = document.createElement("img");
    img_sx.setAttribute("src", `${URL_texture}/sx.svg`);
    img_sx.setAttribute("alt", `${tree.type}`);
    img_sx.setAttribute("class", `xxs:hidden sm:inline-block`);
    const imd_dx = document.createElement("img");
    imd_dx.setAttribute("src", `${URL_texture}/dx.svg`);
    imd_dx.setAttribute("alt", `${tree.type}`);
    imd_dx.setAttribute("class", `xxs:hidden sm:inline-block`);

    banner.insertBefore(img_sx, banner_testo);
    banner_testo.after(imd_dx);

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

  //recupero il valore specificato in html dall'id 'slide' (ovvero il contenitore dove vengono posizionate le immagini)
  let imgTag = document.getElementById("slide");
  //assegno a imgTag.src il valore 'imageFile', ovvero il nome dell'immagine da mostare
  imgTag.src = imageFile;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
