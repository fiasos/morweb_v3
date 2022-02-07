let trees_loaded = false;
let cardContainer = document.getElementById("card-container");
console.log("cardContainer:", cardContainer);

function loadCards() {
  if (allTrees) {
    allTrees.forEach((t) => {
      let prezzo = 0;
      let colore = "";

      switch (t.class) {
        case "base":
          prezzo = 0.04;
          colore = "verdebase";
          break;
        case "regular":
          prezzo = 0.08;
          colore = "gialloregular";
          break;
        case "premium":
          prezzo = 0.12;
          colore = "aranciopremium";
          break;
      }

      const div = document.createElement("div");
      div.setAttribute("class", "card");

      const a = document.createElement("a");
      //TODO Mettere Query ID albero
      const URL = `/public/04_shop/roll.html?id=${t.id}`;
      a.setAttribute("href", URL);
      const tree_id = 1;
      const img = document.createElement("img");
      img.setAttribute("src", `/public/04_shop/01_img/01_rolls/${tree_id}.png`);
      img.setAttribute("alt", `${t.type}`);
      img.setAttribute("class", `m-auto py-2 w-40`);
      const div_text = document.createElement("div");
      div_text.setAttribute("class", `m-4 text-center`);
      div_text.innerHTML = `<p class="font-semibold text-2xl h-16">${t.type}</p>
          <span class="block ${colore} font-light text-lg ">${capitalizeFirstLetter(
        t.class
      )}</span>
          <span class="block text-lg font-medium leading-5 pt-3">${prezzo} €</span>
          <span class="block text-lg font-light leading-5 pb-8">per sheet</span>
          <a href="/public/06_project/project.html" class="button">Subscribe</a>`;

      a.appendChild(img);
      a.appendChild(div_text);

      div.appendChild(a);

      cardContainer.appendChild(div);
      trees_loaded = true;
    });
  } else if (!trees_loaded) setTimeout(loadCards(), 5000);
}

async function asyncCall() {
  console.log("calling");
  const result = await firebaseSetup();
  console.log(result);

  if (result == "resolved") loadCards();
}

asyncCall();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
