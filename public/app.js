import * as THREE from 'three'; window.THREE = THREE;
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';



import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/Addons.js';

console.log("loaded all modules", performance.now())

let isMobile = false;
window.mobileCheck = function () {
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
};
mobileCheck()
let mobileAnimation = null;
let fingerDown = false;
let animationContainer = document.getElementById('animationContainer');
let bubble = 0;
let bubbleClasses = ["bubble x1", "bubble x2", "bubble x3", "bubble x4", "bubble x5", "bubble x6", "bubble x7", "bubble x8"];
console.log(animationContainer)





const assetPath = "https://d368ik34cg55zg.cloudfront.net/"
const customCursorDataURL = 'data:image/x-icon;base64,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'
const avatarPath = assetPath + "avatarWithAnimation.glb"
const eyeModelPath = assetPath + "AryehAvatarFullBodyJustEyesAndFaceRig.glb"


let NonInteractiveAvatarPath = assetPath + "AryehAvatarNonInteractiveWithEyes.glb"

let NonInteractiveAvatar = null;
let InteractiveAvatar = null;
let interactiveAvatarInScene = false;


let torusMaterial = null;

const animateHeadTriggerRectColl = document.getElementById('head-trigger-collider');
const canvas = document.getElementById('myCanvas');

let containersOverlappingWithTriggerColl = document.getElementsByClassName("intersects-with-coll")
let mouseOverElementOverlappingCollider = false;
let customCursorShowing = false;
let targetPosition = new THREE.Vector3();
//visual helpers
let neckBone = null;
let headBone = null;
let neckBoneHelper = new THREE.Object3D();
let neckBoneOriginHelper = new THREE.Object3D();
let headBoneHelper = new THREE.Object3D();
let headBoneOriginHelper = new THREE.Object3D();
let eyeBoneRight = null;
let eyeBoneRightHelper = new THREE.Object3D();
let eyeBoneLeft = null;
let eyeBoneLeftHlper = new THREE.Object3D();
let model = null;


const mixer = new THREE.AnimationMixer();
let randomAnimationClip;
let action;

//tween for head movement
let tween = null;
let eyeBlinkingTween = null;
let tweenBack = null;


//shaders,Materials & Meshes for avatar
let dissolveEffectStarted = false;
let dissolveEffectFinished = false;

let bodyDissolveShader = null;
let clothesDissolveShader = null;
// let shoesDissolveShader = null;
let eyesDissolveShader = null;
let hairDissolveShader = null;


let ourBodyBaseMaterial = null;
let ourClothesBaseMaterial = null;
// let ourShoesBaseMaterial = null;
let ourEyesBaseMaterial = null;
let ourHairBaseMaterial = null;

let ourBodyNode = null;
let ourClothesNode = null;
// let ourShoesNode = null;
let ourEyesNode = null;
let ourHairNode = null;

//tween for shaders
let brightenTween = null;
let fadeOutTween = null;

let tweenBodyDissolveShader = null;
let tweenHairDissolveShader = null;
let tweenClothesDissolveShader = null;
let tweenEyesDissolveShader = null;

//noise textures for dissolve shaders
// const noiseTexture = new THREE.TextureLoader().load('./assets/noise6.png');
// noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

const noiseTexture2 = new THREE.TextureLoader().load(assetPath + 'noiseCircle.png');
noiseTexture2.wrapS = noiseTexture2.wrapT = THREE.RepeatWrapping;

const noiseTexture3 = new THREE.TextureLoader().load(assetPath + 'noise4.png');
noiseTexture3.wrapS = noiseTexture3.wrapT = THREE.RepeatWrapping;


const directionNoise = new THREE.TextureLoader().load(assetPath + 'noise7.jpeg');
const doubleNoise = new THREE.TextureLoader().load(assetPath + 'doubleNoise2.png');




function play() {
  console.log("plaing animation")
  action.play();
}

window.play = play;


let debug = false;
const morphTargetsDict = {};
// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const raycaster2 = new THREE.Raycaster();
raycaster.layers.set(2); // insure it only detects intersection with objects on layer 1 aka our target sphere
raycaster2.layers.set(2); // insure it only detects intersection with objects on layer 1 aka our target sphere
const mouse = new THREE.Vector2();
const previousMouseIntersectionPoint = new THREE.Vector2();
// Create a scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color("#fbdad9");
// scene.background.opacity = 0.1
// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.0, 1.6, 0.5); // Adjust the camera position 0.005, 1.6, 0.5
camera.layers.enable(1);
window.camera = camera;
let dirLight = null;
let hemiLight = null;
let spotLight = null;
createSceneLighting();

const backgroundGeometry = new THREE.PlaneGeometry(20, 20);
const backgroundMaterial = new THREE.ShaderMaterial({
  uniforms: {
    color: { value: new THREE.Color("#fadad9").convertSRGBToLinear() }  //#fddfdf 
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(2.50, color.g * 1.65, color.b * 1.65 , 1.0);
    }
  `,
  side: THREE.DoubleSide
});

backgroundMaterial.toneMapped = false


window.backgroundMaterial = backgroundMaterial;

// backgroundMaterial.toneMapping = THREE.NoToneMapping;



backgroundMaterial.needsUpdate = true;

const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
backgroundMesh.layers.set(1);
backgroundMesh.position.set(0, 0, -5);

scene.add(backgroundMesh);
// const renderer = createRenderer()//new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  powerPreference: "high-performance",
  antialias: true,

});

renderer.autoClear = false;
renderer.setClearColor(0x000000, 0); // The second parameter is the alpha value

renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
renderer.toneMapping = THREE.ACESFilmicToneMapping;  //THREE.CineonToneMapping  //
renderer.toneMappingExposure = 1;

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvas.width, canvas.height);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.colorManagement = true;

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);

renderPass.alpha = 0;
renderPass.clear = true;
renderPass.clearDepth = true;


window.renderer = renderer;
composer.addPass(renderPass);

const bloomPass = new UnrealBloomPass(new THREE.Vector2(canvas.clientWidth, canvas.clientHeight), 0.5, 0.4, 4.85);
composer.addPass(bloomPass);

// const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
// composer.addPass(gammaCorrectionPass);

// Mirrors the eyes rotation and position, used for checking valid rotations
const checkRightEye = new THREE.Object3D();
const checkLeftEye = new THREE.Object3D();

// Create a GLTF loader
const loader = new GLTFLoader();

//for blend shape animation (aka morph targets, blend keys, shape keys, etc)
let targetInfluences;
let morphTargetDictionary;
let faceMesh = null;

//load and set 3d models (the avatar and it's eyes are seperate models)
loadModels()
let freezeEyes = false;
let animateHead = false
let interactiveAvatarLoaded = false;
var clock = new THREE.Clock();

// Render the scene
function animate(time) {
  if (mixer) {
    var deltaSeconds = clock.getDelta();
    mixer.update(deltaSeconds);
  }



  // if (!isMobile) {

  if (InteractiveAvatar && animateHead) {
    if (isMobile && !fingerDown && mobileAnimation) {
      // Get the bounding rectangles of the canvas and the animateHeadTriggerRectColl element
      const canvasRect = canvas.getBoundingClientRect();
      const triggerRect = mobileAnimation.getBoundingClientRect();
      // Calculate the relative position of the triggerRect within the canvas
      const triggerCenterX = triggerRect.left + triggerRect.width / 2;
      const triggerCenterY = triggerRect.top + triggerRect.height / 2;

      const canvasCenterX = canvasRect.left + canvasRect.width / 2;
      const canvasCenterY = canvasRect.top + canvasRect.height / 2;

      const relativeX = (triggerCenterX - canvasRect.left) / canvasRect.width * 2 - 1;
      // const relativeY = (triggerCenterY - canvasRect.top) / canvasRect.height * 2 - 1;
      const relativeY = 1 - (triggerCenterY - canvasRect.top) / canvasRect.height * 2;

      // console.log("animated box Relative Position: ", relativeX, relativeY);
      detectMouseOverSphereColl(new THREE.Vector2(relativeX.toFixed(2), relativeY.toFixed(2)));

    }





    headBoneHelper.lookAt(targetPosition);
    let [yaw, pitch] = calculateYawAndPitchDifference(headBoneHelper.rotation, headBoneOriginHelper.rotation);
    const time = Date.now() * 0.001;
    const targetQuaternion = calculateTargetQuaternion(neckBone, cube.position);
    const correctionQuaternion = new THREE.Quaternion();
    correctionQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); // Rotate 180 degrees around the Y-axis
    const correctedTargetQuaternion = targetQuaternion.clone().multiply(correctionQuaternion);
    headBone.quaternion.slerp(correctedTargetQuaternion, 0.02);
    if (true || Math.abs(THREE.MathUtils.radToDeg(yaw)) > 6 || Math.abs(THREE.MathUtils.radToDeg(pitch)) > 4) {
      //animate neck
      const offsetQuaternion = new THREE.Quaternion();
      offsetQuaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI * -0.19); // Adjust the axis and angle as needed
      const finalTargetQuaternion = correctedTargetQuaternion.multiply(offsetQuaternion);
      const halfwayQuaternion = new THREE.Quaternion().copy(neckBoneOriginHelper.quaternion).slerp(finalTargetQuaternion, 0.35);
      neckBone.quaternion.slerp(halfwayQuaternion, 0.03);
    }
    /*else {
      const offsetQuaternion = new THREE.Quaternion();
      offsetQuaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI * -0.19); // Adjust the axis and angle as needed
      const finalTargetQuaternion = correctedTargetQuaternion.multiply(offsetQuaternion);
      // const halfwayQuaternion = new THREE.Quaternion().copy(neckBoneOriginHelper.quaternion).slerp(finalTargetQuaternion, 0.35);
      neckBone.quaternion.slerp(neckBoneOriginHelper.quaternion, 0.015);
    } */
    //  else{
    //   const offsetQuaternion = new THREE.Quaternion();
    //   offsetQuaternion.setFromAxisAngle(new THREE.Vector3(-1, 0, 0), Math.PI * -0.19); // Adjust the axis and angle as needed
    //   const finalTargetQuaternion = correctedTargetQuaternion.multiply(offsetQuaternion);
    //   const halfwayQuaternion = new THREE.Quaternion().copy(neckBoneOriginHelper.quaternion).slerp(finalTargetQuaternion, 0.35);
    //   neckBone.quaternion.slerp(halfwayQuaternion, 0.01);
    // }
    // if (!freezeEyes) {

    rotateEyes();
    // }
  }


  // }




  //tween stuff

  //rotate head to center tween
  if (tween) {
    tween.update()
  }

  if (eyeBlinkingTween) {
    eyeBlinkingTween.update()
  }

  if (tweenBack) {
    tweenBack.update()
  }


  //dissolve shaders
  if (tweenBodyDissolveShader) {
    tweenBodyDissolveShader.update()
  }
  if (tweenHairDissolveShader) {
    tweenHairDissolveShader.update()
  }
  if (tweenClothesDissolveShader) {
    tweenClothesDissolveShader.update()
  }
  if (tweenEyesDissolveShader) {
    tweenEyesDissolveShader.update()
  }


  if (brightenTween) {
    brightenTween.update()
  }

  if (fadeOutTween) {
    fadeOutTween.update()
  }




  if (NonInteractiveAvatar && !dissolveEffectStarted) {
    dissolveEffectStarted = true;
    animateTogether()
  }


  if (torusMaterial) {
    torusMaterial.uniforms.time.value += 0.01;
  }

  if (!interactiveAvatarLoaded && eyeBoneLeft && interactiveAvatarInScene && dissolveEffectFinished) {
    interactiveAvatarLoaded = true;
    swapAvatars()
    removeTorus()


  }

  requestAnimationFrame(animate);


  renderer.clear();

  if (!interactiveAvatarLoaded) {
    //   camera.layers.set(1);
    composer.render();
    //   renderer.clearDepth();
    //   camera.layers.set(0);
  }

  renderer.render(scene, camera);

}

animate();
console.log("scene loaded", performance.now())




//functions for calculating head and neck movement
function calculateTargetQuaternion(object, targetPosition) {
  const targetQuaternion = new THREE.Quaternion();
  const direction = new THREE.Vector3().subVectors(targetPosition, object.getWorldPosition(new THREE.Vector3())).normalize();
  const up = new THREE.Vector3(0, 1, 0); // Assuming the up direction is along the Y-axis
  const matrix = new THREE.Matrix4().lookAt(object.getWorldPosition(new THREE.Vector3()), targetPosition, up);
  targetQuaternion.setFromRotationMatrix(matrix);
  const correctionQuaternion = new THREE.Quaternion();
  correctionQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); // Rotate 180 degrees around the Y-axis
  const correctedTargetQuaternion = targetQuaternion.clone().multiply(correctionQuaternion);
  const currentQuaternion = headBone.quaternion.clone();
  const euler = new THREE.Euler().setFromQuaternion(currentQuaternion, 'XYZ');
  const targetEuler = new THREE.Euler().setFromQuaternion(correctedTargetQuaternion, 'XYZ');
  let [yaw2, pitch2] = calculateYawAndPitchDifference(euler, targetEuler);
  // if (THREE.MathUtils.radToDeg(pitch2) > 20 || THREE.MathUtils.radToDeg(yaw2) > 14) {
  //   freezeEyes = true
  // } else {
  //   freezeEyes = false
  // }
  return targetQuaternion;
}

function calculateYawAndPitchDifference(euler1, euler2) {
  const yawDifference = euler2.y - euler1.y;
  const pitchDifference = euler2.x - euler1.x;
  return [yawDifference, pitchDifference];
}




//functions for rotating towards target position
function rotateEyes() {

  cube.getWorldPosition(targetPosition)

  eyeBoneLeft.lookAt(targetPosition);
  eyeBoneRight.lookAt(targetPosition);

  //imported eyebones foward direction is set to the y axis and therefor need rotated
  eyeBoneLeft.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI * -0.55);
  eyeBoneRight.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI * -0.55);
}

//scene helper functions
function addArrowHelpers(object) {
  const arrowHelperX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 30, 0xff0000);
  const arrowHelperY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 30, 0xFFFF00);
  const arrowHelperZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 30, 0x00ff00);
  arrowHelperX.visible = false;
  arrowHelperY.visible = false;
  arrowHelperZ.visible = false;
  try {
    object.add(arrowHelperX, arrowHelperY, arrowHelperZ);
    helpers.push(arrowHelperX, arrowHelperY, arrowHelperZ);
  } catch {
    console.log("error adding arrow helpers")
  }
}


//create return renderer
function createRenderer() {

  return renderer;
}

//create return controller
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


  // Ambient light for soft global illumination
  const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.4);
  const ambientLight = new THREE.AmbientLight("#666666", 10); // Soft white light
  scene.add(ambientLight, hemiLight);


  // point light for the face
  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 3, -2); // Position the point light above the subject
  pointLight.castShadow = true;
  scene.add(pointLight);


  // Fill light to reduce shadows under the eyes
  const fillLight = new THREE.PointLight(0xffffff, 0.5, 50);
  fillLight.position.set(0, 1.5, -1); // Position the fill light in front of the subject
  scene.add(fillLight);


}


function resetLights() {

  if (dirLight) {
    dirLight.intensity = 1.5;
  }

  if (hemiLight) {
    hemiLight.intensity = 2;
  }

  if (spotLight) {
    spotLight.intensity = 21;
  }

}

function dimLights() {

  const dimmingFactor = 0.2; // Adjust this value to control the dimming level

  if (dirLight) {
    dirLight.intensity *= dimmingFactor;
  }

  if (hemiLight) {
    hemiLight.intensity *= dimmingFactor;
  }

  if (spotLight) {
    spotLight.intensity *= dimmingFactor;
  }

}





// event listeners
setCanvasSize()
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);
//helper functions


function setCanvasSize() {
  canvas.style.width = window.innerWidth
  canvas.style.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function resizeCanvas() {
  if (isMobile && window.matchMedia("(orientation: portrait)").matches) {
    camera.zoom = 1;
  }
  if (isMobile && window.matchMedia("(orientation: landscape)").matches) {
    camera.zoom = 1.5;
  }



  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  renderPass.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix();

}

function setCustomCursor() {
  console.log("setting custom cursor")
  document.body.style.cursor = `url(${customCursorDataURL}), auto`;
}

function setCursor() {
  console.log("setting cursor, what the actual")
  document.body.style.cursor = 'default';
}
window.setCustomCursor = setCustomCursor;
window.setCursor = setCursor;


//over main collider element, it's pretty weird and confusing. there is def a better way to do this
const isMouseOverElement = (mouseX, mouseY, element) => {
  const rect = element.getBoundingClientRect();
  return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
};


//add event listeners to all elements that overlap with the trigger collider
for (var i = 0; i < containersOverlappingWithTriggerColl.length; i++) {
  containersOverlappingWithTriggerColl[i].addEventListener('mousemove', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const u = (x / rect.width) * 2 - 1;
      const v = (y / rect.height) * 2 - 1;
      let mouse = new THREE.Vector2(u, -v);
      console.log("mouse relative position not mobile", mouse)
      detectMouseOverSphereColl(mouse)
    } else {
      if (customCursorShowing) {
        animateHeadBackToCenter()
        customCursorShowing = false;
        mouseOverElementOverlappingCollider = false;
        setCursor()
      }
    }
  });


  containersOverlappingWithTriggerColl[i].addEventListener('mouseleave', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const u = (x / rect.width) * 2 - 1;
      const v = (y / rect.height) * 2 - 1;
      let mouse = new THREE.Vector2(u, -v);
      detectMouseOverSphereColl(mouse)
    } else {
      if (customCursorShowing) {
        animateHeadBackToCenter()
        customCursorShowing = false;
        mouseOverElementOverlappingCollider = false;
        setCursor()
      }
    }
  });

  containersOverlappingWithTriggerColl[i].addEventListener("touchstart", (event) => {
    fingerDown = true;
  });


  containersOverlappingWithTriggerColl[i].addEventListener('touchmove', (event) => {
    const touch = event.touches[0]; // Get the first touch
    const mouseX = touch.pageX;
    const mouseY = touch.pageY;
    if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
      const rect = canvas.getBoundingClientRect();
      const x = event.touches[0].clientX - rect.left;
      const y = event.touches[0].clientY - rect.top;
      const u = (x / rect.width) * 2 - 1;
      const v = (y / rect.height) * 2 - 1;
      let mouse = new THREE.Vector2(u, -v);
      detectMouseOverSphereColl(mouse)
      // const mouseX = (event.clientX - animateHeadTriggerRectColl.left) / animateHeadTriggerRectColl.width;
      // const mouseY = (event.clientY - animateHeadTriggerRectColl.top) / animateHeadTriggerRectColl.height;
      // console.log(`Normalized X: ${mouseX}, Normalized Y: ${mouseY}`)
    } else {
      if (customCursorShowing) {
        animateHeadBackToCenter()
        customCursorShowing = false;
        mouseOverElementOverlappingCollider = false;
        setCursor()
      }
    }


  })


  //this is confusing, but basically if it's over a collider and then it isn't start aniamtion back to center
  containersOverlappingWithTriggerColl[i].addEventListener('touchend', (event) => {
    fingerDown = false;
    const touch = event.touches[0]; // Get the first touch
    const x = touch.pageX;
    const y = touch.pageY;

    if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
      if (customCursorShowing) {
        animateHeadBackToCenter()
      }
    }

  })

}




let leaveTimeout;

let workSection = document.getElementById("work-section")
workSection.addEventListener("mouseenter", (event) => {
  if (customCursorShowing) {
    customCursorShowing = false;
    setCursor();
    animateHeadBackToCenter()
  }
});






animateHeadTriggerRectColl.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const u = (x / rect.width) * 2 - 1;
  const v = (y / rect.height) * 2 - 1;
  const mouse = new THREE.Vector2(u, -v);
  detectMouseOverSphereColl(mouse);
});

animateHeadTriggerRectColl.addEventListener('mouseleave', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const u = (x / rect.width) * 2 - 1;
    const v = (y / rect.height) * 2 - 1;
    let mouse = new THREE.Vector2(u, -v);
    detectMouseOverSphereColl(mouse)
  } else {
    if (customCursorShowing) {
      animateHeadBackToCenter()
      customCursorShowing = false;
      mouseOverElementOverlappingCollider = false;
      setCursor()
    }
  }
});

animateHeadTriggerRectColl.addEventListener('touchmove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const touch = event.touches[0]; // Get the first touch
  const x = touch.pageX - rect.left;
  const y = touch.pageY - rect.top;
  const u = (x / rect.width) * 2 - 1;
  const v = (y / rect.height) * 2 - 1;
  const finger = new THREE.Vector2(u, -v);
  detectFingerOverSphereColl(finger);

});

animateHeadTriggerRectColl.addEventListener('touchend', (event) => {
  fingerDown = false;
})

animateHeadTriggerRectColl.addEventListener('touchstart', (event) => {
  fingerDown = true;
});






let timeout;
//detect if mouse is over collider
function detectMouseOverSphereColl(mouse) {
  raycaster.setFromCamera(mouse, camera);
  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true);
  // Check if the sphere is intersected
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object === sphere) {
      previousMouseIntersectionPoint.copy(mouse);
      if (leaveTimeout) {
        clearTimeout(leaveTimeout)
      }
      if (tween) {
        if (tween.isPlaying()) {
          tween.stop()
        }
      }

      if (!customCursorShowing) {
        setCustomCursor();
        customCursorShowing = true;
      }
      const hitPoint = intersects[i].point;
      cube.position.copy(hitPoint);
      return;
    }
  }
  if (customCursorShowing) {
    customCursorShowing = false;
    setCursor();
    animateHeadBackToCenter()
  }
}






//detect if finger is over collider
function detectFingerOverSphereColl(finger) {

  raycaster.setFromCamera(finger, camera);
  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true);
  // Check if the sphere is intersected
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object === sphere) {
      previousMouseIntersectionPoint.copy(finger);
      if (leaveTimeout) {
        clearTimeout(leaveTimeout)
      }

      if (tween) {
        if (tween.isPlaying()) {
          tween.stop()
        }
      }

      if (!customCursorShowing) {
        // setCustomCursor();
        customCursorShowing = true;
      }

      const hitPoint = intersects[i].point;
      cube.position.copy(hitPoint);
      return;
    }
  }


  if (customCursorShowing) {
    customCursorShowing = false;
    animateHeadBackToCenter()
    // setCursor();
  }




}














window.detectMouseOverSphereColl = detectMouseOverSphereColl;
//resets head back to center

function animateHeadBackToCenter() {
  //instead of animate the head we should just find the last mouse uv coords and just animate them to to 0, 0
  if (tween && tween.isPlaying()) {
    tween.stop()
  }
  let mouse2 = { u: previousMouseIntersectionPoint.x, v: previousMouseIntersectionPoint.y };
  let center = { u: 0, v: 0 };
  tween = new TWEEN.Tween(mouse2)
    .to(center, 1000) // Interpolating to the end vector
    .easing(TWEEN.Easing.Circular.InOutt)           // Ease-out for smooth animation
    .onUpdate(() => {
      let mouse2Vector = new THREE.Vector2(mouse2.u, mouse2.v);
      raycaster2.setFromCamera(mouse2Vector, camera);
      // Calculate objects intersecting the ray
      const intersects = raycaster2.intersectObjects(scene.children, true);
      // Check if the sphere is intersected
      for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object === sphere) {
          const hitPoint = intersects[i].point;
          cube.position.copy(hitPoint);
        }
      }
    })
  tween.start();
}

//adds random blinking animation
let leftEyeBlink = null;
let lastEventTime = 0;
const minInterval = 250; // Minimum interval between events in milliseconds
const targetInterval = 4000; // Average interval for 15 events per minute (4000 ms)

function fireEvent() {
  if (!leftEyeBlink) {
    setTimeout(fireEvent, minInterval);
  }
  const currentTime = Date.now();

  // Check if enough time has passed since the last event
  if (currentTime - lastEventTime >= minInterval) {

    // let randomNumberBetween50And100 = Math.floor(Math.random() * 100) + 50; 
    let randomNumber2Between200And350 = Math.floor(Math.random() * 350) + 200;
    let randomDelay = Math.floor(Math.random() * 150) + 50;
    eyeBlinkingTween = new TWEEN.Tween(leftEyeBlink)
      .to({ value: 1 }, 100)
      .easing(TWEEN.Easing.Sinusoidal.InOut) // Apply quadratic easing
      .onUpdate(() => {
        targetInfluences[0] = leftEyeBlink.value;
        targetInfluences[7] = leftEyeBlink.value;
      });

    tweenBack = new TWEEN.Tween(leftEyeBlink)
      .to({ value: 0 }, randomNumber2Between200And350) // 250 milliseconds
      .easing(TWEEN.Easing.Sinusoidal.InOut) // Apply quadratic easing
      .delay(randomDelay)
      .onUpdate(() => {
        targetInfluences[0] = leftEyeBlink.value;
        targetInfluences[7] = leftEyeBlink.value;
      });

    eyeBlinkingTween.chain(tweenBack);
    eyeBlinkingTween.start();
    // Update the last event time
    lastEventTime = currentTime;
    // Schedule the next event
    scheduleNextEvent();
  } else {
    // If the event can't be fired yet, schedule the next check
    setTimeout(fireEvent, minInterval);
  }
}


function scheduleNextEvent() {
  console.log("blinking time")
  const randomDelay = Math.random() * 2000; // Random delay up to 2 seconds
  const nextEventDelay = targetInterval + randomDelay - 1000; // Ensure it's still around 15/min
  setTimeout(fireEvent, nextEventDelay);
}


//start the blinking
function startBlinking() {
  scheduleNextEvent();

}



//sphere shader

// Vertex Shader
const vertexShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
vNormal = normalize(normalMatrix * normal);
vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;


// Fragment Shader
const fragmentShader = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
vec3 normal = normalize(vNormal);
vec3 viewDir = normalize(-vPosition);
float edge = dot(normal, viewDir);
float edgeFactor = smoothstep(0.0, 0.2, edge);
vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0), edgeFactor);
float alpha = 1.0 - edgeFactor;
gl_FragColor = vec4(color, alpha);
}
`;


// Create Shader Material
const edgeHighlightMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true // Enable transparency
});


// create our sphere collider and cube target
// cube is the target. meaning the character should always look at the cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true,
  opacity: 0.0
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 1.3, 2);
cube.scale.set(0.1, 0.1, 0.1);
scene.add(cube);

// sphere represents target zone. if our mouse is over the sphere the cube will move to the intersection point of a raycast from our mouse screenspace position and the sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true,
  opacity: 0
});


const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, -1.2); //0, 1.6, -1
sphere.scale.set(7.75, 5, 1); //1.5, 1.5, 0.5
scene.add(sphere);
sphere.layers.set(2); // Only check layer 0
// Apply the shader material to the sphere
sphere.material = edgeHighlightMaterial;




// Load the GLTF model
function loadModels() {


  //first load dummy avatar
  loader.load(
    NonInteractiveAvatarPath, //
    function (gltf) {
      NonInteractiveAvatar = gltf.scene;
      // avatar.scale.set(0.01, 0.01, 0.01);

      NonInteractiveAvatar.traverse((node) => {
        if (node.isMesh) {
          console.log(node.name)
          node.layers.set(1);
        }

        if (node.name == "avaturn_body_1") {
          ourBodyBaseMaterial = node.material.clone()
          ourBodyNode = node;
        }

        if (node.name == "avaturn_body_4") {
          ourEyesBaseMaterial = node.material.clone()
          ourEyesNode = node;
        }

        if (node.name == "avaturn_body_3") {
          ourClothesBaseMaterial = node.material.clone()
          ourClothesNode = node;
        }

        if (node.name == "avaturn_body_2") {
          ourHairBaseMaterial = node.material.clone()
          ourHairNode = node;
        }


      });

      createShaders()
      NonInteractiveAvatar.layers.set(1);
      NonInteractiveAvatar.position.set(0, 0, -2);
      scene.add(NonInteractiveAvatar);
      window
    },
    undefined,
    function (error) {
      console.error(error);
    }

  );









  //load in interactive avatar
  loader.load(avatarPath, function (gltf) {

    InteractiveAvatar = gltf.scenes[0];
    let face = InteractiveAvatar.children[0]

    gltf.animations.forEach((clip) => {

      console.log(clip.name); // Log the name of each animation
      if (clip.name === "ArmatureAction") {
        randomAnimationClip = clip;
        action = mixer.clipAction(randomAnimationClip, InteractiveAvatar);

      }

    });


    InteractiveAvatar.traverse((object) => {

      if (object.isMesh) {
        object.layers.set(0);
        // object.material.ACESFilmicToneMapping = true;
        // object.material.colorSpace = THREE.LinearSRGBColorSpace;  
      }
      if (object.morphTargetInfluences) {
        if (faceMesh === null) {
          faceMesh = object;
          targetInfluences = faceMesh.morphTargetInfluences;
          morphTargetDictionary = faceMesh.morphTargetDictionary;
          window.targetInfluences = targetInfluences;
          window.morphTargetDictionary = morphTargetDictionary;
          leftEyeBlink = { "value": targetInfluences[0] };
        }
      }

      if (object.isSkinnedMesh) {
        if (neckBone === null) {
          neckBone = object.skeleton.bones.find(bone => bone.name === 'Neck');
          window.neckBone = neckBone;
          console.log(neckBone);
        }
        if (headBone === null) {
          headBone = object.skeleton.bones.find(bone => bone.name === 'Head');
          window.headBone = headBone;
          console.log(headBone);
        }
      }
    });

    InteractiveAvatar.scale.set(1, 1, 1);
    InteractiveAvatar.position.set(0, 10, -2);

    headBone.parent.add(headBoneHelper);
    headBoneHelper.position.copy(headBone.position);
    headBone.parent.add(headBoneOriginHelper);
    headBoneOriginHelper.position.copy(headBone.position);
    headBoneOriginHelper.rotation.copy(headBone.rotation);

    neckBone.parent.add(neckBoneOriginHelper);
    neckBoneOriginHelper.position.copy(neckBone.position);
    neckBoneOriginHelper.rotation.copy(neckBone.rotation);

    InteractiveAvatar.visible = true;
    InteractiveAvatar.layers.set(0);
    scene.add(InteractiveAvatar);
    interactiveAvatarInScene = true;


    //load in eyeball model
    loader.load(eyeModelPath, function (gltf) {
      const eyeModel = gltf.scenes[0];
      eyeModel.traverse((object) => {
        if (object.isSkinnedMesh) {
          if (eyeBoneRight === null) {
            eyeBoneRight = object.skeleton.bones.find(bone => bone.name === 'DEF_eyeR'); //DEF_eyeR
            window.eyeBoneRight = eyeBoneRight;
          }
          if (eyeBoneLeft === null) {
            eyeBoneLeft = object.skeleton.bones.find(bone => bone.name === 'MCH-eyeL'); //DEF_eyeL
            window.eyeBoneLeft = eyeBoneLeft;
            console.log(eyeBoneLeft);
          }
        }
      });
      eyeModel.scale.set(1, 1, 1);
      eyeModel.position.set(0, 10, -2);


      // eyeModel.layers.set(0);

      // Store the eyeModel's world position
      const eyeModelWorldPosition = new THREE.Vector3();
      eyeModel.getWorldPosition(eyeModelWorldPosition);


      // Add the eyeModel to the headBone
      headBone.add(eyeModel);



      // Convert the stored world position to the local position relative to the headBone
      const eyeModelLocalPosition = new THREE.Vector3();
      headBone.worldToLocal(eyeModelLocalPosition.copy(eyeModelWorldPosition));


      // Set the eyeModel's position to the calculated local position
      eyeModel.position.copy(eyeModelLocalPosition);
      headBone.add(eyeModel);
      eyeBoneRight.parent.add(eyeBoneRightHelper);
      eyeBoneRightHelper.position.copy(eyeBoneRight.position);
      eyeBoneRightHelper.rotation.copy(eyeBoneRight.rotation);


    })
  })
}
createTorus()


function createTorus() {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const torus = new THREE.Mesh(geometry, material);
  scene.add(torus);
  window.torus = torus;
}


//create shaders
function createShaders() {

  eyesDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourEyesBaseMaterial,
    uniforms: {
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      edgeColor: { value: new THREE.Color(0, 0.57, 1) }, // Add a uniform for the color
      thickness: { value: 3.0 },
      dim: { value: false },
      noiseTexture: { value: directionNoise },
    },

    vertexShader: vs,
    fragmentShader: fs,

  });

  hairDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourHairBaseMaterial,
    uniforms: {
      dim: { value: false },
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      thickness: { value: 3.0 },
      edgeColor: { value: new THREE.Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: noiseTexture2 },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });


  clothesDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourClothesBaseMaterial,
    uniforms: {
      dim: { value: false },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      edgeColor: { value: new THREE.Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: doubleNoise },
      brightness: { value: 3.0 },
      growFade: { value: false },
      thickness: { value: 1.0 },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  bodyDissolveShader = new CustomShaderMaterial({
    baseMaterial: ourBodyBaseMaterial,
    uniforms: {
      dim: { value: false },
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      thickness: { value: 3.0 },
      edgeColor: { value: new THREE.Color(1, 0.27, 0.63) }, // Add a uniform for the color

      noiseTexture: { value: doubleNoise },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  ourBodyNode.material = bodyDissolveShader;
  ourClothesNode.material = clothesDissolveShader;
  ourEyesNode.material = eyesDissolveShader;
  ourHairNode.material = hairDissolveShader;

}



async function swapAvatars() {

  interactiveAvatarLoaded = true;
  dissolveEffectFinished
  if (tweenBodyDissolveShader.isPlaying()) {
    tweenBodyDissolveShader.stop()
  }
  if (tweenClothesDissolveShader.isPlaying()) {
    tweenClothesDissolveShader.stop()
  }
  if (tweenEyesDissolveShader.isPlaying()) {
    tweenEyesDissolveShader.stop()
  }
  if (tweenHairDissolveShader.isPlaying()) {
    tweenHairDissolveShader.stop()
  }


  tweenBodyDissolveShader = null;
  tweenClothesDissolveShader = null;
  tweenEyesDissolveShader = null;
  tweenHairDissolveShader = null;

  InteractiveAvatar.position.set(0, 0, -2);
  NonInteractiveAvatar.position.set(0, 10, -2);
  backgroundMesh.visible = false;



  action.play();
  await waitForSeconds(0.25)
  animateHead = true;
  startBlinking();
  //animate towards current mouse position
  await waitForSeconds(0.25)
  if (isMobile) {
    mobileAnimation = document.createElement('div');
    mobileAnimation.id = 'mobileAnimation'; // Set the ID to 'mobileAnimation'
    // <div class="bubble x5" style="--animation-duration: calc(25s + 10s * random())"></div>
    mobileAnimation.className = 'bubble x1'; // Correctly assign the class
    bubble++;
    // Random duration between 25s and 35s
    animationContainer.appendChild(mobileAnimation);
    // mobileAnimation.className = 'moving-div'; // Correctly assign the class
    // document.body.appendChild(mobileAnimation);
    mobileAnimation.addEventListener("animationend", async (event) => {

      //   console.log("animation iteration")
      console.log(mobileAnimation.className, bubbleClasses[bubble], bubble)
      let newclassname;
      if(bubbleClasses[bubble + 1] != undefined){
        newclassname = bubbleClasses[bubble++]
      }else{
        bubble = 0;
        newclassname = bubbleClasses[bubble]
      }
      mobileAnimation.className = "none";
      await waitForSeconds(1)
      mobileAnimation.className = newclassname;
      // mobileAnimation.style.top = `${Math.random() * 70}%`;
      // const randomDuration = 2 + Math.random() * 4;
      // mobileAnimation.style.setProperty('--animation-duration', `${randomDuration}s`);

    });
  }

  await waitForSeconds(2)
  NonInteractiveAvatar.parent.remove(NonInteractiveAvatar);


}

function animateHairIn() {
  tweenHairDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 400)
    .easing(TWEEN.Easing.Cubic.InOut)
    .delay(1400)
    .onComplete(() => {
      console.log("complete hat animation", performance.now())

      if (!interactiveAvatarLoaded && eyeBoneLeft && interactiveAvatarInScene) {
        swapAvatars()
      } else {
        console.log("start the animation vertex shader loop...")
        dissolveEffectFinished = true
        addTorus()
      }

    })
    .onUpdate((object) => {
      hairDissolveShader.uniforms.threshold.value = object.x;
    });
  tweenHairDissolveShader.start();
}

function animateBodyIn() {
  tweenBodyDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 1400)
    .delay(300)
    // .easing(TWEEN.Easing.Cubic.InOut)
    .onComplete(() => {

    })
    .onUpdate((object) => {
      bodyDissolveShader.uniforms.threshold.value = object.x;
    })
    .start();

}


function animateClothesIn() {

  tweenClothesDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 1000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onComplete(() => { })
    .onUpdate((object) => {
      clothesDissolveShader.uniforms.threshold.value = object.x;

    });
  tweenClothesDissolveShader.start();
}


function animateEyesIn() {

  tweenEyesDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 1000)
    // .easing(TWEEN.Easing.Cubic.InOut)
    .delay(200)
    .onComplete(() => {

    })
    .onUpdate((object) => {
      eyesDissolveShader.uniforms.threshold.value = object.x;
    });

  tweenEyesDissolveShader.start();

}



function fadeOutShaders() {

  fadeOutTween = new TWEEN.Tween({ x: 75 })
    .to({ x: -2 }, 1000)
    .easing(TWEEN.Easing.Elastic.InOut)
    .onComplete(() => {

      NonInteractiveAvatar.visible = false;
      animateHead = true;
      animateHeadBackToCenter();
    })
    .onUpdate((object) => {
      console.log("Second tween running")
      if (object.x < 50 && !InteractiveAvatar.visible) {
        InteractiveAvatar.visible = true;
      }
      clothesDissolveShader.uniforms.brightness.value = object.x
      bodyDissolveShader.uniforms.brightness.value = object.x
      hairDissolveShader.uniforms.brightness.value = object.x
      eyesDissolveShader.uniforms.brightness.value = object.x
    });

  // brightenTween.chain(fadeOutTween)
  fadeOutTween.start();
  console.log("starting fade out ", performance.now())

}

async function animateAll() {
  await waitForSeconds(1.5)
  animateClothesIn();
  await waitForSeconds(1.5)
  animateBodyIn();
  await waitForSeconds(1.5)
  animateEyesIn();
}

function animateTogether() {
  animateBodyIn();
  animateClothesIn();
  animateEyesIn();
  animateHairIn();
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
window.animateEyesIn = animateEyesIn;
window.animateHairIn = animateHairIn;

window.animateAll = animateAll;
window.animateTogether = animateTogether;



let vs = `
      uniform bool growFade;
      varying vec2 vUv;
          uniform float brightness;
      void main() {
          vUv = uv;
          if(growFade){
            csm_Position = vec3(csm_Position.x, csm_Position.y, csm_Position.z + (0.004 * brightness));
          }
      }
    `;

let fs = `
      uniform bool dim;
      uniform float brightness;
      uniform float thickness;
      uniform bool growFade;
      uniform float time;
      uniform vec3 edgeColor; // Declare the uniform
      varying vec2 vUv;
      uniform float threshold;
      uniform sampler2D noiseTexture; //alpha noise texture for diffuse effect
          void main() {


            vec3 noise = texture2D(noiseTexture, vUv).rgb;
            float dissolve = noise.g;
     
     
            if (dissolve < threshold) {
              discard;
            }
           float edge = threshold + (thickness / 100.0);

            if(threshold > 0.1){

            if (dissolve < edge ) {

               csm_Emissive = edgeColor * 20.0;
          
            } else{
           
        
          }
         
        }  
          csm_UnlitFac =  csm_UnlitFac;

      }
    `;



let torusVS = `
uniform float time;
uniform float progress;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vEye;
uniform vec2 pixels;
uniform float distortion;
uniform vec3 axis;
uniform vec3 axis2;
uniform float speed;
float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}
float qinticInOut(float t) {
  return t < 0.5
    ? +16.0 * pow(t, 5.0)
    : -0.5 * abs(pow(2.0 * t - 2.0, 5.0)) + 1.0;
}
void main() {
  vUv = uv;
  float norm = 4.;
  norm = 0.5;
  vec3 newpos = position;
  float offset = ( dot(axis2,position) +norm/2.)/norm;
  // float offset = ( dot(vec3(1.,0.,0.),position) +norm/2.)/norm;

  // float localprogress = clamp( (progress - 0.01*distortion*offset)/(1. - 0.01*distortion),0.,1.); 
  float localprogress = clamp( (fract(time*speed) - 0.01*distortion*offset)/(1. - 0.01*distortion),0.,1.); 

  localprogress = qinticInOut(localprogress)*PI;


  newpos = rotate(newpos,axis,localprogress);
  vec3 newnormal = rotate(normal,axis,localprogress);

  vNormal = normalMatrix*newnormal;
  vec4 worldPosition = modelMatrix * vec4( newpos, 1.0);
  vEye = normalize(worldPosition.xyz - cameraPosition);
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newpos, 1.0 );
  vPosition = newpos;
  }
  `;

let torusFS = `
uniform float brightness; // Uniform for brightness
uniform vec3 emissiveColor; // Uniform for emissive color
uniform float time;
uniform float progress;
uniform sampler2D matcaptexture;
uniform vec4 resolution;
uniform float flatNormals;
uniform vec3 axis;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vEye;
varying vec3 vPosition;
float PI = 3.141592653589793238;
vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}
vec3 normals(vec3 pos) {
  vec3 fdx = dFdx(pos);
  vec3 fdy = dFdy(pos);
  return normalize(cross(fdx, fdy));
}
void main()	{

  vec2 muv;
    if(flatNormals>0.5){
        muv = matcap(vEye,normals(vPosition));
    } else{
        muv = matcap(vEye,vNormal);
    }
    
    vec4 c = texture2D(matcaptexture,muv);


    // Calculate edge factor based on normal
    float edgeFactor = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 1.0, 0.0))), 2.0);

    edgeFactor = 1.0 - edgeFactor;
    vec3 finalColor = vec3(c.rgb);
    
    if(edgeFactor > 0.90 || edgeFactor < 0.1){
        finalColor = c.rgb * brightness + emissiveColor * edgeFactor;
    
    }
      
    gl_FragColor = vec4(finalColor, c.a);
    // Apply brightness and emissive color

   
}
  `;



let matcapTexture = new THREE.TextureLoader().load(assetPath + 'matcap3.jpg');

let torus = null;
function addTorus() {

  bodyDissolveShader.uniforms.dim.value = true;
  clothesDissolveShader.uniforms.dim.value = true;
  eyesDissolveShader.uniforms.dim.value = true;
  hairDissolveShader.uniforms.dim.value = true;


  torusMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      progress: { value: 0.0 },
      pixels: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      distortion: { value: 4.0 },
      axis: { value: new THREE.Vector3(-1, 0, 0) },
      axis2: { value: new THREE.Vector3(-1, 0, 0) },
      speed: { value: 1.0 },
      matcaptexture: { value: matcapTexture },
      flatNormals: { value: 0.0 },
      resolution: { value: new THREE.Vector4(window.innerWidth, window.innerHeight, 1.0 / window.innerWidth, 1.0 / window.innerHeight) },
      brightness: { value: 0.7 }, // Set initial brightness
      emissiveColor: { value: new THREE.Color(1, 0.97, 0.05) }, // Set initial emissive color gold: 
    },
    vertexShader: torusVS,
    fragmentShader: torusFS,
    side: THREE.DoubleSide,
    transparent: true,

  });





  const geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
  torus = new THREE.Mesh(geometry, torusMaterial);
  torus.axis = new THREE.Vector3(1.0, 0, 0.),
    torus.position.y = 1.6;
  torus.position.z = -1.2;

  torus.scale.set(0.2, 0.2, 0.2);
  torus.layers.set(1);
  scene.add(torus);
  window.torus = torus;

}

function removeTorus() {
  // resetLights()
  scene.remove(torus);
  torusMaterial.dispose();
  torusMaterial = null;
}

window.scene = scene;
window.addTorus = addTorus;
