//  Standard global variables
let trees = [];
let pointLoaded = false;
let container;
let camera, scene, raycaster, renderer;
let INTERSECTED;
let sphere;
const mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();
//raycaster.near = 10;
//raycaster.far = 1000;

init();
animate();

// //  Titolo
// let title = document.getElementById("disappear");
// title.innerHTML += "Discover our trees";

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  //  CAMERA
  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = -10;

  //  SCENA
  scene = new THREE.Scene();

  //  RENDER
  //  Background trasparente (alpha:true)
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: vascan,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);

  //  GLOBO
  const geometry = new THREE.SphereGeometry(1, 50, 50);
  const texture = new THREE.TextureLoader().load(
    "/public/03_globe/assets/01_img/globo/GloboV.png"
  );
  //  Rotazione della texture
  texture.wrapS = THREE.RepeatWrapping;
  texture.offset.x = Math.PI / 6.5;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  //  ORBIT CONTROL
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minDistance = 7;
  controls.maxDistance = 20;
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onMouseMove);
}

//  POINTS
let textures = [];
let materials = [];

function addPoints() {
  for (let i = 0; i < trees.length; i++) {
    let start = calc(trees[i].lat, trees[i].lng);
    textures[i] = new THREE.TextureLoader().load(
      "/public/03_globe/assets/01_img/texture/SVG/" + (i + 1) + ".svg"
    );
    materials[i] = new THREE.MeshBasicMaterial({ map: textures[i] });
    let mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 20, 20),
      materials[i]
    );
    mesh.name = i;
    mesh.tear = i;
    mesh.description = i;

    mesh.position.set(start.x, start.y, start.z);
    sphere.add(mesh);
  }
}

//  Raycasting - mouse over object
function onMouseMove(event) {
  //  Calculate mouse position in normalized device coordinates (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
  requestAnimationFrame(animate);
  if (allTrees && !pointLoaded) {
    trees = allTrees;
    console.log("trees:", trees);
    addPoints();
    pointLoaded = true;
  }
  render();
}

//  Calcolo lat lng
function calc(lat, lng) {
  let phi = (90 - lat) * (Math.PI / 180);
  let theta = (lng + 180) * (Math.PI / 180);
  let x = -(Math.sin(phi) * Math.cos(theta));
  let y = Math.cos(phi);
  let z = Math.sin(phi) * Math.sin(theta);
  return { x, y, z };
}

function render() {
  camera.updateMatrixWorld();
  //   update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  //   calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(sphere.children, false);
  // const dai = raycaster.intersectObjects(sphere, false);

  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      INTERSECTED = intersects[0].object;
      //  Scale Up
      INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = 1.4;

      //  Nome dell'albero
      let treeIndex = INTERSECTED.name;
      document.getElementById("treeName").innerHTML = trees[treeIndex].type;
      //  Numero di strappi
      let treeTear = INTERSECTED.tear;
      document.getElementById("treeStrappi").innerHTML =
        "Sheets:  " + trees[treeTear].strappi;
      console.log(trees[treeIndex].strappi);
      console.log(trees[treeTear].type);
    }
  } else {
    if (INTERSECTED)
      //  Scale down
      INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = 1;
    document.getElementById("treeName").innerHTML = null;
    document.getElementById("treeStrappi").innerHTML = null;
  }

  controls.update();
  renderer.render(scene, camera);
}
