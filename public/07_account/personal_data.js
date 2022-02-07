let trees_loaded = false;
let div;

function loadUsers() {
  let lista = document.getElementById("lista");
  if (allUsers) {
    const rotoli_usati = allUsers.rotoli_usati;
    console.log("rotoli_usati:", rotoli_usati);
    // console.log("rotoli_usati:", rotoli_usati);
    const trees = allTrees;

    for (let key in rotoli_usati) {
      const roll = rotoli_usati[key];
      const id = roll.id - 1;
      const from = roll.from;
      const to = roll.to;

      let prezzo = 0;
      let colore = "";

      switch (trees[id].class) {
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

      div = document.createElement("div");
      div.setAttribute(
        "class",
        "my-2 flex flex-wrap m-auto ph:bg-grigiochiaro md:bg-whike ph:bg-opacity-30 md:justify-between md:text-left md:w-full md:rounded-none md:border-x-0 md:py-0 ph:justify-center ph:text-center ph:w-80 rounded-2xl"
      );

      const div2 = document.createElement("div");
      div2.setAttribute("class", "ph:w-full md:w-40");
      div2.innerHTML = `<p class="text-xs text-grigioscuro py-1 ph:w-80 md:w-fit">Product</p>
      <p class="font-medium ph:w-80 md:w-fit ">${trees[id].type}</p>
      <p>${capitalizeFirstLetter(trees[id].class)}</p>`;

      const img = document.createElement("img");
      img.setAttribute("class", "ph:w-36 md:w-20 py-3");
      img.src = `/public/04_shop/01_img/01_rolls/${id}.png`;
      console.log("id:", id);

      const div3 = document.createElement("div");
      div3.innerHTML = ` <p class="text-xs text-grigioscuro py-1">Date</p><p class="ph:w-80 md:w-fit"> From ${from} </p><p class="ph:w-80 md:w-fit"> Until ${to} </p>`;

      const div4 = document.createElement("div");
      div4.innerHTML = `<p class="text-xs text-grigioscuro py-1">Rolls</p><p class="ph:w-80 md:w-12">4</p>`;
      const div5 = document.createElement("div");
      div5.innerHTML = `<p class="text-xs text-grigioscuro py-1">Sheet price</p><p class="ph:w-80 md:w-fit">${prezzo} €</p>`;
      const div6 = document.createElement("div");
      div6.setAttribute("class", "ph:w-full md:w-18");
      div6.innerHTML = `<p class="text-xs text-grigioscuro py-1">Total cost</p><p class="ph:w-80 md:w-fit">${
        prezzo * 200
      } €</p>`;

      div.appendChild(div2);
      div.appendChild(img);
      div.appendChild(div3);
      div.appendChild(div4);
      div.appendChild(div5);
      div.appendChild(div6);
      console.log("lista:", lista);
      lista.appendChild(div);
    }
  }
}

async function asyncCall() {
  console.log("calling");
  const result = await firebaseSetup();
  console.log(result);

  if (result == "resolved") loadUsers();
}

asyncCall();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
