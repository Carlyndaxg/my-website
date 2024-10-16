import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// smooth edge effect with antialias true 
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(document.getElementById('model3d').clientWidth, document.getElementById('model3d').clientHeight);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);  // renders across different devices 

// set background color transparent with alpha 0
renderer.setClearColor(0x000000, 0)

// add shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById('model3d').appendChild(renderer.domElement);  // add renderer to html doc 

// set up scene 
const scene = new THREE.Scene()

// set up camera, asepct ratio, near/far plane, position 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(5, 3.5, 10);
camera.lookAt(0, 0, 0);  // camera looks at origin of scene 

// orbiting controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.autoRotate = true;
controls.autoRotateSpeed = -1.15;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

// add geometry to render scene properly 
// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);  // makes scene sit flat on ground 
// const groundMaterial = new THREE.MeshStandardMaterial({
    // color: 0x222222,
    // side: THREE.DoubleSide  
// });  // render both sides of plane 
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// add light to see model 
const spotLight = new THREE.SpotLight(0xffffff, 900, 100, 0.2, 1);
spotLight.position.set(0, -30, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.001;
scene.add(spotLight)

const bottomdirectionalLight = new THREE.DirectionalLight(0xffffff, 5);  // white light 
bottomdirectionalLight.position.set(0, 30, 0).normalize();  // position 
bottomdirectionalLight.castShadow = true;  // shadow casting
scene.add(bottomdirectionalLight);

const leftdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.7); 
leftdirectionalLight.position.set(-30, 0, 0).normalize();
leftdirectionalLight.castShadow = true;
scene.add(leftdirectionalLight);

const rightdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.7); 
rightdirectionalLight.position.set(30, 0, 0).normalize();
leftdirectionalLight.castShadow = true;
scene.add(rightdirectionalLight);

const frontdirectionalLight = new THREE.DirectionalLight(0xfffffff, 1.7);
frontdirectionalLight.position.set(0, 0, 30).normalize();
frontdirectionalLight.castShadow = true;
scene.add(frontdirectionalLight);

const backdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.7);
backdirectionalLight.position.set(0, 0, -30).normalize();
backdirectionalLight.castShadow = true;
scene.add(backdirectionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  // soft white light
scene.add(ambientLight);

/*
// function to load the GLTF model based on browser screen width BUGGY DO NOT USE
function loadModel(isMobile) {
  const loader = new GLTFLoader().setPath('minecraft-jellie-cat/source/');
  loader.load('scene.gltf', (gltf) => {
      console.log('Loading model'); 
      const mesh = gltf.scene;

      mesh.traverse((child) => {
          if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
          }
      });

      if (isMobile) {
          mesh.position.set(0, -1.5, -0.5); 
          mesh.rotation.y = Math.PI;
          mesh.scale.set(4.5, 4.5, 4.5); 
          scene.add(mesh);
      } else {
          // for desktop
          mesh.position.set(0, -1.5, -0.5);
          mesh.rotation.y = Math.PI;
          mesh.scale.set(5, 5, 5); 
          scene.add(mesh);
      }
  });
}

// initial load of the model based on screen width
loadModel(window.innerWidth <= 780);

// update model on resize
window.addEventListener('resize', () => {
  // clear the existing model before loading a new one
  while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
  }

  loadModel(window.innerWidth <= 780); 
}); 
*/

// create gltf loader, no browser screen sensing
const loader = new GLTFLoader().setPath('minecraft-jellie-cat/source/'); 
loader.load('scene.gltf', (gltf) => {
    console.log('Loading model'); 
    const mesh = gltf.scene;

    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    mesh.position.set(0, -1.5, -0.5);
    mesh.rotation.y = Math.PI;
    mesh.scale.set(5, 5, 5);
    scene.add(mesh);
});  

// render scene 

// document.getElementById('progress-container').style.display = 'none';
// }, (xhr) => {
  // console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
// }, (error) => {
  // console.error(error);
// });

window.addEventListener('resize', () => {
  const model3dContainer = document.getElementById('model3d');
  camera.aspect = model3dContainer.clientWidth / model3dContainer.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(model3dContainer.clientWidth, model3dContainer.clientHeight);
});

// window.addEventListener('resize', () => {
  // camera.aspect = window.innerWidth / window.innerHeight;
  // camera.updateProjectionMatrix();
  // renderer.setSize(window.innerWidth, window.innerHeight);
// });

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera); 
}

animate();
