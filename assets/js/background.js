var SEPARATION = (Math.random() * 100) + 100,
  amountX = 100,
  amountY = 100;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 85,
  mouseY = -342;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var freqX = (Math.random() * .5) + .2,
  freqY = (Math.random() * .5) + .2;

window.start = function() {
  init();
  animate();
}

function init() {

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2500;

  scene = new THREE.Scene();

  particles = [];

  var material = new THREE.SpriteMaterial({
    color: "rgb(93, 116, 120)",
  });

  var i = 0;

  for (var iX = 0; iX < amountX; iX++) {
    for (var iY = 0; iY < amountY; iY++) {
      particle = particles[i++] = new THREE.Sprite(material);
      particle.position.x = iX * SEPARATION - ((amountX * SEPARATION) / 2);
      particle.position.z = iY * SEPARATION - ((amountY * SEPARATION) / 2);
      particle.scale.set(10, 10, 10)
      scene.add(particle);
    }
  }
  setUpCameraAndEvents();
}

function setUpCameraAndEvents() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( "rgb(28, 28, 28)", 1 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.prepend( renderer.domElement );

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
  for (var iX = 0; iX < amountX; iX++) {
    for (var iY = 0; iY < amountY; iY++) {
      particle = particles[i++];
      particle.position.y = 1.5 * (Math.cos((iX + count) * freqX) * 100) + (Math.sin((iY + count) * freqY) * 50);
      particle.scale.x = particle.scale.y =  4 + ((Math.sin((iX + count) * freqX) + 1) * 2 + (Math.sin((iY + count) * freqY) + 1) * 2);
    }
  }

  renderer.render(scene, camera);

  count += 0.1;

}
