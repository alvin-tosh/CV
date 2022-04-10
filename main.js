import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();



const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const render = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

render.setPixelRatio( window.devicePixelRatio);
render.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

render.render( scene, camera );

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight, ambientLight )

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add( lightHelper, gridHelper );


const controls = new OrbitControls(camera, render.domElement);


function addstar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material);

  const[x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set(x, y, z);
  scene.add(star);

}

Array(1000).fill().forEach(addstar);

const spaceTexture = new THREE.TextureLoader().load('stellar.jpg');
scene.background = spaceTexture;

//avatar
const myTexture = new THREE.TextureLoader().load('Screenshot_2022-02-13-15-20-54-98.jpg');

const my = new THREE.Mesh(
  new THREE.BoxGeometry(4,4,4),
  new THREE.MeshBasicMaterial({map: myTexture})
);
scene.add(my);

//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4,40,40),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture,
  })
);
scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

my.position.z = -5;
my.position.x = 2;


function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  my.rotation.y += 0.01;
  my.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  //controls.update();

  render.render( scene, camera );
}

animate();


