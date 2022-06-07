const lunghezza_tot = 23000;
let trees_loaded = false;
let div;

function loadUsers() {
  let div_uso = document.getElementById("in-uso");
  let top_player = document.getElementById("top-player");
  let lista = document.getElementById("lista");
  let prezzo = 0;
  let colore = "";

  if (allUsers) {
    const rotolo_in_uso = allUsers.rotolo_in_uso;
    const id_uso = rotolo_in_uso.id - 1;
    const rotoli_usati = allUsers.rotoli_usati;
    const trees = allTrees;
    const lunghezza_uso = rotolo_in_uso.lunghezza;
    let perc = Math.round((lunghezza_uso * 100) / lunghezza_tot);

    const tree_in_uso = trees[id_uso];

    div_uso.innerHTML = `<p class="titoletto">${tree_in_uso.type}</p>
    <p>${capitalizeFirstLetter(tree_in_uso.class)}</p>`;

    switch (tree_in_uso.class) {
      case "base":
        colore = "#939960";
        break;
      case "regular":
        colore = "#E5B76E";
        break;
      case "premium":
        colore = "#ED824C";
        break;
    }

    document.getElementById("circ-all").classList.toggle("hidden");
    document.getElementById("circ-bg").style.stroke = colore + "8a";
    document.getElementById("circ").style.stroke = colore + "8a";
    document
      .getElementById("circ")
      .setAttribute("stroke-dasharray", `${perc}, 100`);
    document.getElementById("%").innerHTML = `${perc}%`;

    document.getElementById(
      "rollini"
    ).innerHTML = `<div><img class="rotolini" src="/public/assets/01_img/account/${tree_in_uso.class}/used.svg"></div>
    <div><img class="rotolini" src="/public/assets/01_img/account/${tree_in_uso.class}/current.svg"></div>
    <div><img class="rotolini"src="/public/assets/01_img/account/${tree_in_uso.class}/new.svg"></div>
    <div><img class="rotolini"src="/public/assets/01_img/account/${tree_in_uso.class}/new.svg"></div>`;

    for (let key in rotoli_usati) {
      const roll = rotoli_usati[key];
      const id = roll.id - 1;
      const from = roll.from;
      const to = roll.to;

      switch (trees[id].class) {
        case "base":
          prezzo = 0.04;
          colore = "#939960";
          break;
        case "regular":
          prezzo = 0.08;
          colore = "#E5B76E";
          break;
        case "premium":
          prezzo = 0.12;
          colore = "#ED824C";
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
      img.src = `/public/assets/01_img/shop/01_rolls/${id}.png`;
      console.log("id:", id);

      const div3 = document.createElement("div");
      div3.innerHTML = `<p class="text-xs text-grigioscuro py-1">Date</p><p class="ph:w-80 md:w-fit"> From ${from} </p><p class="ph:w-80 md:w-fit"> Until ${to} </p>`;

      const div4 = document.createElement("div");
      div4.innerHTML = `<p class="text-xs text-grigioscuro py-1">Rolls</p><p class="ph:w-80 md:w-12">4</p>`;
      const div5 = document.createElement("div");
      div5.innerHTML = `<p class="text-xs text-grigioscuro py-1">Sheet price</p><p class="ph:w-80 md:w-fit">${prezzo} €</p>`;
      const div6 = document.createElement("div");
      div6.setAttribute("class", "ph:w-full md:w-18");
      div6.innerHTML = `<p class="text-xs text-grigioscuro py-1">Total cost</p><p class="ph:w-80 md:w-fit">${
        prezzo * 200 * 4
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
  top_player.classList.toggle("invisible");
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
