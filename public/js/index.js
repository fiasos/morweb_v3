//Hamburger Menu
const burger = document.querySelector("#burger");
const menu = document.querySelector("#menu");
const sfondo = document.querySelector("#sfondo");
const all = document.querySelector("#all");
const header = document.querySelector("#header");
const vascan = document.querySelector("#vascan");

burger.addEventListener("click", () => {
  // if (menu.classList.contains("hidden")) {
  //   sfondo.classList.remove("hidden");
  //   menu.classList.remove("hidden");
  //   all.classList.add("hidden");
  //   vascan.classList.add("hidden");
  // } else {
  //   menu.classList.add("hidden");
  //   sfondo.classList.add("hidden");
  //   all.classList.remove("hidden");
  //   vascan.classList.remove("hidden");
  // }

  menu.classList.toggle("hidden");
  sfondo.classList.toggle("hidden");
  all.classList.toggle("hidden");
  vascan.classList.toggle("hidden");
});

// TABS
function openTab(evt, content) {
  // Declare all variables
  var i, tabcontent, tablinks;
  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(content).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
