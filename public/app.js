import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import * as TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { objectDirection } from 'three/webgpu';


let animatedInAvatar = false;
let avatar = null;



let replacementAvatar = null;
let replacementAvatarURL = "https://aryehmischel-portfolio-bucket.s3.us-east-2.amazonaws.com/avatarWithAnimation.glb"
let animationComplete = false;


//start shader
var start = false;
let tweenBodyAnimation = null;
let tweenHairAnimation = null;
let tweenClothesAnimation = null;
let tweenShoesAnimation = null;

// Shader material
let bodyDissolveShader = null;
let clothesDissolveShader = null;
let shoesDissolveShader = null;
let hairDissolveShader = null;


let ourBodyBaseMaterial = null;
let ourClothesBaseMaterial = null;
let ourShoesBaseMaterial = null;
let ourHairBaseMaterial = null;

let ourBodyNode = null;
let ourClothesNode = null;
let ourShoesNode = null;
let ourHairNode = null;


const noiseTexture = new THREE.TextureLoader().load('./assets/noise6.png');
noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

const noiseTexture2 = new THREE.TextureLoader().load('./assets/noiseCircle.png');
noiseTexture2.wrapS = noiseTexture2.wrapT = THREE.RepeatWrapping;

const noiseTexture3 = new THREE.TextureLoader().load('./assets/noise4.png');
noiseTexture3.wrapS = noiseTexture3.wrapT = THREE.RepeatWrapping;


const directionNoise = new THREE.TextureLoader().load('./assets/noise7.jpeg');
noiseTexture3.wrapS = noiseTexture3.wrapT = THREE.RepeatWrapping;

const doubleNoise = new THREE.TextureLoader().load('./assets/doubleNoise2.png');

//animation variables
let group = null;



// Scene setup
const scene = new THREE.Scene();

// Set background color
scene.background = new THREE.Color(0x0000ff);






// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
camera.position.y = 1.6;


// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
composer.addPass(bloomPass);

createSceneLighting()
// createControls()
let loader = new GLTFLoader();


loader.load(
  './assets/models/AryehAvatarNonInteractive2.glb', //
  function (gltf) {
    avatar = gltf.scene;
    // avatar.scale.set(0.01, 0.01, 0.01);

    avatar.traverse((node) => {
      if (node.isMesh) {
        console.log(node.name)
      }
      if (node.name == "avaturn_body_1") {
        ourBodyBaseMaterial = node.material.clone()
        ourBodyBaseMaterial.emissiveIntensity = 10;
        node.material.visible = false;
        console.log(node)
        // node.material.transparent = true
        ourBodyNode = node;
      }
      if (node.name == "avaturn_body_4") {
        ourClothesBaseMaterial = node.material.clone()

        // ourBaseMaterial.emissiveIntensity = 10;
        node.material.visible = false;
        ourClothesNode = node;
        //  // node.material.transparent = true
      }
      if (node.name == "avaturn_body_3") {
        ourShoesBaseMaterial = node.material.clone()
        ourShoesNode = node;
        // ourBaseMaterial.emissiveIntensity = 10;
        node.material.visible = false;
        //  // node.material.transparent = true
      }
      if (node.name == "avaturn_body_2") {
        ourHairBaseMaterial = node.material.clone()
        ourHairNode = node;
        // ourBaseMaterial.emissiveIntensity = 10;
        node.material.visible = false;
        //   console.log(node)
        //  // node.material.transparent = true
        //   ourNode = node;
      }


    });
    createShaders()
    scene.add(avatar);
  },
  undefined,
  function (error) {
    console.error(error);
  }

);

loader.load(replacementAvatarURL, function (gltf) {
  replacementAvatar = gltf.scene;
  replacementAvatar.visible = false;
  scene.add(replacementAvatar);

},
  undefined,
  function (error) {
    console.error(error);

  }
);

function createShaders() {

  shoesDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourShoesBaseMaterial,
    uniforms: {
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      uColor: { value: new THREE.Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: noiseTexture2 },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  hairDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourHairBaseMaterial,
    uniforms: {
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      uColor: { value: new THREE.Color(0.4, 0.4, 0.4) }, // Add a uniform for the color
      noiseTexture: { value: directionNoise },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  clothesDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourClothesBaseMaterial,
    uniforms: {
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      uColor: { value: new THREE.Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: doubleNoise },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  bodyDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourBodyBaseMaterial,
    uniforms: {
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      uColor: { value: new THREE.Color(0.4, 0.4, 0.4) }, // Add a uniform for the color
      noiseTexture: { value: doubleNoise },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });



  ourBodyNode.material = bodyDissolveShader;
  ourClothesNode.material = clothesDissolveShader;
  ourShoesNode.material = shoesDissolveShader;
  ourHairNode.material = hairDissolveShader;

}


let vs = `
      varying vec2 vUv;
      void main() {
          vUv = uv;
      }
    `;

let fs = `
      uniform float time;
      uniform vec3 uColor; // Declare the uniform
      varying vec2 vUv;
      uniform float threshold;
      uniform sampler2D noiseTexture; //alpha noise texture for diffuse effect
      void main() {

        vec3 noise = texture2D(noiseTexture, vUv).rgb;
        float dissolve = noise.g;
        if (dissolve < threshold) {
           discard;
         }

       float edge = threshold + 0.025;

       if(threshold > 0.00001){
         if (dissolve < edge) {
           csm_FragColor = vec4(vec3(uColor), 1.0) * 2.0;

        }
       }


        csm_Emissive = vec3(0.0, 1.0, 0.0);
        csm_FragColor = csm_FragColor;
     }
    `;


// Animation loop
function animate() {

  if (!animatedInAvatar && avatar) {
    animateTogether()
    animatedInAvatar = true;
  }

  if (animationComplete && replacementAvatar) {
    console.log("replacing avatar")
    avatar.visible = false;
    replacementAvatar.visible = true;
    animationComplete = false;
  }




  if (tweenBodyAnimation) {
    tweenBodyAnimation.update()
  }
  if (tweenHairAnimation) {
    tweenHairAnimation.update()
  }
  if (tweenClothesAnimation) {
    tweenClothesAnimation.update()
  }
  if (tweenShoesAnimation) {
    tweenShoesAnimation.update()
  }

  composer.render();
  requestAnimationFrame(animate);
}

animate();



// Handle window resize
window.addEventListener('resize', () => {
  // Update camera aspect ratio and projection matrix
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});



//animations 

function animateBodyIn() {
  tweenBodyAnimation = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 2000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate((object) => {
      // updateMaterial(object.x);
      console.log("object", object.x)
      bodyDissolveShader.uniforms.threshold.value = object.x;

    });
  tweenBodyAnimation.start();

}


function animateClothesIn() {

  tweenClothesAnimation = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 1000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)

    .onUpdate((object) => {
      clothesDissolveShader.uniforms.threshold.value = object.x;

    });
  tweenClothesAnimation.start();
}


function animateShoesIn() {

  tweenShoesAnimation = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 400)
    .easing(TWEEN.Easing.Cubic.InOut)
    .delay(1400)
    .onComplete(() => {
      console.log("animation complete")
      animationComplete = true
    })
    .onUpdate((object) => {
      shoesDissolveShader.uniforms.threshold.value = object.x;
    });
  tweenShoesAnimation.start();

}

async function animateAll() {
  await waitForSeconds(1.5)
  animateClothesIn();
  await waitForSeconds(1.5)
  animateBodyIn();
  await waitForSeconds(1.5)
  animateShoesIn();
}

function animateTogether() {
  animateBodyIn();
  animateClothesIn();
  animateShoesIn();
}

const waitForSeconds = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

window.animateBodyIn = animateBodyIn;
window.animateClothesIn = animateClothesIn;
window.animateShoesIn = animateShoesIn;

window.animateAll = animateAll;
window.animateTogether = animateTogether;




function updateMaterial(threshold) {
}

window.updateMaterial = updateMaterial;






//create orbit controller
function createControls() {
  let controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2.3, 0);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.listenToKeyEvents(window); // optional
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.screenSpacePanning = false;
  controls.minDistance = 0;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  controls.keys = {
    LEFT: 'KeyA',  // Use 'A' key to rotate left
    UP: 'KeyW',    // Use 'W' key to rotate up
    RIGHT: 'KeyD', // Use 'D' key to rotate right
    BOTTOM: 'KeyS' // Use 'S' key to rotate down
  };
  return controls;
}

function createSceneLighting() {
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  // directionalLight.position.set(5, 10, 7.5);
  // directionalLight.castShadow = true;
  // directionalLight.shadow.mapSize.width = 2048;
  // directionalLight.shadow.mapSize.height = 2048;
  // directionalLight.shadow.camera.near = 0.5;
  // directionalLight.shadow.camera.far = 500;
  // scene.add(directionalLight);


  // const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.4);

  // Ambient light for soft global illumination
  const ambientLight = new THREE.AmbientLight("#666666", 10); // Soft white light
  scene.add(ambientLight);


  // Hemisphere light for sky and ground lighting
  const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 1);
  hemisphereLight.position.set(0, 20, 0);
  scene.add(hemisphereLight);
 
 
  // Spotlight to focus on the subject
  const spotLight = new THREE.SpotLight("#CDCDCD", 5);

  spotLight.position.set(0, 1.2, 0);
  spotLight.target.position.set(0, 1.2, -1.5); // Point the spotlight at the subject
  spotLight.castShadow = true;
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 50;
}