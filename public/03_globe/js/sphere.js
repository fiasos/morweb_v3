//  Standard global variables
let trees = [];
let pointLoaded = false;
let container, canvas;
let camera, scene, raycaster, renderer;
let INTERSECTED = "";
let sphere;
const mouse = new THREE.Vector2();
raycaster = new THREE.Raycaster();

init();
animate();

// //  Titolo
// let title = document.getElementById("disappear");
// title.innerHTML += "Discover our trees";

function init() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  container = document.createElement("div");
  document.body.appendChild(container);
  //  CAMERA
  //  *Funziona con entrambe le camere
  camera = new THREE.PerspectiveCamera(20, w / h, 0.1, 1000);

  // camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0, 10);
  // camera.zoom = 100;

  camera.position.x = -10;

  // Draw a line from pointA in the given direction at distance 100
  var pointA = new THREE.Vector3(0, 0, 0);
  var direction = new THREE.Vector3(10, 0, 0);
  direction.normalize();

  var distance = 100; // at what distance to determine pointB

  var pointB = new THREE.Vector3();
  pointB.addVectors(pointA, direction.multiplyScalar(distance));

  var geometry = new THREE.Geometry();
  geometry.vertices.push(pointA);
  geometry.vertices.push(pointB);
  var material = new THREE.LineBasicMaterial({ color: 0xff0000 });
  var line = new THREE.Line(geometry, material);
  scene.add(line);

  //  SCENA
  scene = new THREE.Scene();

  //  RENDER
  //  Background trasparente (alpha:true)
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: vascan,
  });
  renderer.setSize(w, h);
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
  console.log(" renderer.domElement:", renderer.domElement);
  controls.minDistance = 7;
  controls.maxDistance = 20;
  controls.enableDamping = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 3;
  container.appendChild(renderer.domElement);

  document.addEventListener("mousemove", onMouseMove);
}

//  POINTS
let textures = [];
let materials = [];

function addPoints() {
  const size = 0.05;
  const segments = 20;
  for (let i = 0; i < trees.length; i++) {
    let start = calc(trees[i].lat, trees[i].lng);
    textures[i] = new THREE.TextureLoader().load(
      "/public/03_globe/assets/01_img/texture/SVG/" + (i + 1) + ".svg"
    );
    materials[i] = new THREE.MeshBasicMaterial({ map: textures[i] });
    let mesh = new THREE.Mesh(
      new THREE.SphereGeometry(size, segments, segments),
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

  // scene.add(
  //   new THREE.ArrowHelper(
  //     raycaster.ray.direction,
  //     raycaster.ray.origin,
  //     10,
  //     0xff0000,
  //     0.05,
  //     0.05
  //   )
  // );
}

function animate() {
  requestAnimationFrame(animate);
  if (allTrees && !pointLoaded) {
    trees = allTrees;
    console.log("trees:", trees);
    addPoints();
    pointLoaded = true;
  }
  //  TODO Aggiungere loading prima di punti
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

  if (intersects.length > 0) {
    // console.log("intersects:", intersects);
    intersects.forEach((i) => {
      if (INTERSECTED != i.object) {
        INTERSECTED = i.object;
        //  Scale Up
        INTERSECTED.scale.x = INTERSECTED.scale.y = INTERSECTED.scale.z = 1.4;

        //  Nome dell'albero
        let treeIndex = INTERSECTED.name;
        document.getElementById("treeName").innerHTML = trees[treeIndex].type;
        //  Numero di strappi
        let treeTear = INTERSECTED.tear;
        document.getElementById(
          "treeStrappi"
        ).innerHTML = `Sheets: ${trees[treeTear].strappi}`;
        console.log(trees[treeIndex].strappi);
        console.log(trees[treeTear].type);
      }
    });
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

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
