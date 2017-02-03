var SEPARATION = 100,
  AMOUNTX = 150,
  AMOUNTY = 150;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 85,
  mouseY = -342;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

window.start = function() {
  init();
  animate();
}

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(130, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3500;

  scene = new THREE.Scene();

  particles = [];

  var material = new THREE.SpriteMaterial({
    color: "rgb(120, 120, 120)",
  });

  var i = 0;

  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++] = new THREE.Sprite(material);
      particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
      particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
      particle.scale.set(2000, 2000, 100)
      scene.add(particle);
    }
  }
  setUpCameraAndEvents();
}

function setUpCameraAndEvents() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( "#bdbdbd", .15 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.append( renderer.domElement );

  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - (windowHalfY * 2.5);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  camera.position.x += (mouseX - camera.position.x) * .15;
  camera.position.y += (-mouseY - camera.position.y) * .15;
  camera.lookAt(scene.position);

  var i = 0;
  for (var ix = 0; ix < AMOUNTX; ix++) {
    for (var iy = 0; iy < AMOUNTY; iy++) {
      particle = particles[i++];
      particle.position.y = (Math.cos((ix + count) * 0.5) * 100) + (Math.sin((iy + count) * 0.8) * 50);
      particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.5) + 1) * 2 + (Math.sin((iy + count) * 0.8) + 1) * 2;
    }
  }

  renderer.render(scene, camera);

  count += 0.1;

}
