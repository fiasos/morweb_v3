//le immagini sono 9, vanno da 0 a 8//
//La prima slide è il numero 0//
//la variabile currentslide indica qual è la slide corrente//
let currentSlide = 0;

//Definisco una serie di elementi (le immagini da mostare in galleria)//
let immagini = [
  "/public/04_shop/01_img/02_slideshow/a.jpg",
  "/public/04_shop/01_img/02_slideshow/b.jpg",
  "/public/04_shop/01_img/02_slideshow/c.jpg",
];

//PrevSlide e nextSlide sono le due funzioni che modificano il valore della slide da mostare
//Sono impostate in modo tale che il valore da mostare abbia sempre un indice valido (tra 0 e 8)
//la funzione prevSlide diminusice di 1 il valore indicato da currentslide
function prevSlide() {
  currentSlide = currentSlide - 1;
  //quando currentslide è uguale a -1 (valore non valido!) viene mostrata l'ultima immagine (la 8)
  if (currentSlide === -1) {
    currentSlide = 2;
  }
  showSlide(); //funzione che mostra l'immagine
}

//prevSlide aumenta di 1 il valore indicato da currentslide
function nextSlide() {
  currentSlide = currentSlide + 1;
  //quando currentslide vale 9 (valore non valido!), viene mostrata la prima immagine (0)
  if (currentSlide === 3) {
    currentSlide = 0;
  }
  showSlide(); //funzione per mostare l'immagine
}

//funzione che recupera l'immagine dall'array e cambia il contenuto della pagina
//indico tra [] il nome dell'oggetto che voglio mostrare, quindi le immagini e tra [] ne specifico l'indice
function showSlide() {
  let imageFile = immagini[currentSlide];

  //recupero il valore specificato in html dall'id 'slide' (ovvero il contenitore dove vengono posizionate le immagini)
  let imgTag = document.getElementById("slide");
  //assegno a imgTag.src il valore 'imageFile', ovvero il nome dell'immagine da mostare
  imgTag.src = imageFile;
}
