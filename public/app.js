import * as THREE from 'three'; window.THREE = THREE;
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from '@tweenjs/tween.js'
const customCursorDataURL = 'data:image/x-icon;base64,AAACAAEAICAAAAMAAQCoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIEpP8CAJf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREDIvAwGx/wEBsv8FApD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgDevoDAbT/BACz/wMBsP8VEILpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQOQ/wMAs/8BALT/BAC2/wQDq/9VVZwyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA6H/AwCz/wABuf8DA9r/AgHM/wABnf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU01+EgMAs/8DALT/AQHb/wAA3v8AAN7/AADe/wAAoP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANBYL6BACz/wECsv8AAN7/AADe/wAA3v8AAN7/AADe/wEAl/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlv8GALP/BQPV/wAA3v8AAN7/AADe/wAA3v8AAN7/AwDi/wAAlv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwOp/wUAs/8BAN//AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AQPa/wADov81MWIUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGZnnhsEArD/AAC8/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wYFzP8HBn36AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQKE/wIAs/8DAdz/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AAHc/wAA3f8AApr/MjCJVwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJn/AwKv/wAA3/8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AwDf/wAB3v8BAtn/AAGV/xcTdqwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQErP8AAcb/AAHc/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AQLa/wcFt/8IBJL/JSB2YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaFneJBAC4/wAB3P8AAdv/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3/8AANz/AAHe/1pU/v9dU/7/AQGM/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDjP8AALP/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AwDh/wAA3v8cHOD/W1T9/1tS//9MR+X/ZmZ7DQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABACh/wICyv8AAN3/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wIB3v8CBOD/VE3+/1tS//9cVfn/BQKQ/youOggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8fKgIEArD/AQDh/wEA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/HRjf/1pS/P9bU/7/AQGQ/0JBg1EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAOD9wIAtf8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAOD/BQLU/1tR//9cU///LyzL/xEJf+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJP/BQTN/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wEA3f8AAdr/AwDa/1VM//9cUP//X1r8/wcFiP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUDp/8CAOD/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AQHe/0hD+v9cU/7/XVb+/wIAjP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2NngsAgK3/wAC3f8AAN7/AADe/wAA3v8AAN7/AADe/wAA3v8AAN7/AQDf/w4K1v9cUv//WVX7/wUElf9FQGciAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcGhP4BAcv/AADc/wAA3v8AAN7/AADe/wAA3v8AAN7/AADe/wED2/9YV/r/XFb9/wcEnf8wL3huAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACY/wAC2v8AAdv/AADe/wAA3v8AAN7/AADe/wIB3f83Nfb/W1P8/yMguf8OC3rkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADA6v/AADe/wAA3v8AAN7/AADe/wAA3v8GBtj/WVH9/01H7P8DAnz3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1KYUgAAvP8AAN7/AADe/wEB3f8BAeD/Uk3//1hN+f8AAIf/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAYv/BgLc/wEA3/8AAN7/CQXU/11V+v8FAI3/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAk/8AANr/BgPc/1tV//8AAJD/EQ0pHgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCq/y8t8f8IBZn/TUSTaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeWZ9KPT+DewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////////////z////8f///+D////g////4H///+A////AH///wA///8AH///AAf//gAD//4AAH/+AAAf/AAAB/wAAAf8AAAP/AAAP/gAAH/4AAH/+AAH//gAH//wAH//8AD///AD///wD///4D///+D////j//////////////8='
const avatarPath = "https://aryehmischel-portfolio-bucket.s3.us-east-2.amazonaws.com/avatarWithAnimation.glb"  //"./avatarWithAnimation.glb" //"https://aryehmischel-portfolio-bucket.s3.us-east-2.amazonaws.com/AvatarNoEyesNormalPose.glb"; //"https://aryehmischel-portfolio-bucket.s3.us-east-2.amazonaws.com/AvatarSemiSmile.glb"  
const eyeModelPath = "https://aryehmischel-portfolio-bucket.s3.us-east-2.amazonaws.com/AryehAvatarFullBodyJustEyesAndFaceRig.glb"
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


function play(){
  console.log("plaing animation")
  action.play();
}

window.play = play;


let debug = false;
const morphTargetsDict = {};
// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const raycaster2 = new THREE.Raycaster();
raycaster.layers.set(1); // insure it only detects intersection with objects on layer 1 aka our target sphere
raycaster2.layers.set(1); // insure it only detects intersection with objects on layer 1 aka our target sphere
const mouse = new THREE.Vector2();
const previousMouseIntersectionPoint = new THREE.Vector2();
// Create a scene
const scene = new THREE.Scene();
// Create a camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
camera.position.set(0.005, 1.6, 0.5); // Adjust the camera position 0.005, 1.6, 0.5
window.camera = camera;
const renderer = createRenderer()
createSceneLighting();
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


var clock = new THREE.Clock();
// Render the scene
function animate(time) {
    if (mixer) {
              var deltaSeconds = clock.getDelta();
              mixer.update(deltaSeconds);
          }

  if (model && eyeBoneLeft && cube) {
    
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
  if (tween) {
    tween.update()
  }

  if(eyeBlinkingTween){
    eyeBlinkingTween.update()
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
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
function rotateEyes(leftEye = eyeBoneLeft, rightEye = eyeBoneRight) {
  // cube.getWorldPosition(targetPosition)

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
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setClearColor(0x000000, 0); // The second parameter is the alpha value
  renderer.physicallyCorrectLights = true;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadows
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // Set the pixel ratio to the device's pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
  // Set the size of the renderer
  renderer.setSize(canvas.width, canvas.height);
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
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(5, 10, 7.5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  // scene.add(directionalLight);
  // Ambient light for soft global illumination
  const hemiLight = new THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.4 ); 
  const ambientLight = new THREE.AmbientLight("#666666", 10); // Soft white light
  scene.add(ambientLight, hemiLight);
  // Hemisphere light for sky and ground lighting
  // const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x444444, 1);
  // hemisphereLight.position.set(0, 20, 0);
  // scene.add(hemisphereLight);
  // Spotlight to focus on the subject
  const spotLight = new THREE.SpotLight("#CDCDCD", 5);
  
  spotLight.position.set(0, 1.2, 0);
  spotLight.target.position.set(0, 1.2, -1.5); // Point the spotlight at the subject
  spotLight.castShadow = true;
  spotLight.angle = Math.PI / 6;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 50;
  // scene.add(spotLight);
  // scene.add(spotLight.target);
  // Point light for additional localized lighting
 
  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // pointLight.position.set(0, 3, -2); // Position the point light above the subject
  // pointLight.castShadow = true;
  // scene.add(pointLight);
 
 
  // Fill light to reduce shadows under the eyes
  const fillLight = new THREE.PointLight(0xffffff, 0.5, 50);
  fillLight.position.set(0, 1.5, -1); // Position the fill light in front of the subject
  scene.add(fillLight);
}
// event listeners
setCanvasSize()
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);
//helper functions
window.mobileCheck = function() {
let check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
return check;
};
let isMobile = mobileCheck()

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
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
    const touch = event.touches[0]; // Get the first touch
    const x =   touch.pageX;
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
workSection.addEventListener("mouseenter", (event) =>{
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
  const x =   touch.pageX - rect.left;
  const y = touch.pageY - rect.top;
  const u = (x / rect.width) * 2 - 1;
  const v = (y / rect.height) * 2 - 1;
  const mouse = new THREE.Vector2(u, -v);
  detectMouseOverSphereColl(mouse);

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
const targetInterval = 3000; // Average interval for 15 events per minute (4000 ms)
function fireEvent() {
  if (!leftEyeBlink) {
    setTimeout(fireEvent, minInterval);
  }
  const currentTime = Date.now();
  // Check if enough time has passed since the last event
  if (currentTime - lastEventTime >= minInterval) {
    eyeBlinkingTween = new TWEEN.Tween(leftEyeBlink)
      .to({ value: 1 }, 100) // 250 milliseconds
      .easing(TWEEN.Easing.In) // Apply quadratic easing
      .onUpdate(() => {
        targetInfluences[0] = leftEyeBlink.value;
        targetInfluences[7] = leftEyeBlink.value;
      });
    let tweenBack = new TWEEN.Tween(leftEyeBlink)
      .to({ value: 0 }, 100) // 250 milliseconds
      .easing(TWEEN.Easing.Out) // Apply quadratic easing
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
  const randomDelay = Math.random() * 2000; // Random delay up to 2 seconds
  const nextEventDelay = targetInterval + randomDelay - 1000; // Ensure it's still around 15/min
  setTimeout(fireEvent, nextEventDelay);
}


scheduleNextEvent();
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
//create our sphere collider and cube target
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
sphere.layers.set(1); // Only check layer 0
// Apply the shader material to the sphere
sphere.material = edgeHighlightMaterial;
// load in and set our gltf models
// Load the GLTF model
function loadModels() {
  loader.load(avatarPath, function (gltf) {
    console.log("starting")
    model = gltf.scenes[0];
    let face = model.children[0]


    gltf.animations.forEach((clip) => {
            
            console.log(clip.name); // Log the name of each animation
            if(clip.name === "ArmatureAction"){
                console.log("neckmove loaded");
                randomAnimationClip = clip;
                action = mixer.clipAction(randomAnimationClip, model);
              
            }
       
        });


    model.traverse((object) => {
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
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, -2);
    headBone.parent.add(headBoneHelper);
    headBoneHelper.position.copy(headBone.position);
    headBone.parent.add(headBoneOriginHelper);
    headBoneOriginHelper.position.copy(headBone.position);
    headBoneOriginHelper.rotation.copy(headBone.rotation);
    neckBone.parent.add(neckBoneOriginHelper);
    neckBoneOriginHelper.position.copy(neckBone.position);
    neckBoneOriginHelper.rotation.copy(neckBone.rotation);
    scene.add(model);
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
      eyeModel.position.set(0, 0, -2);
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
       animateHeadBackToCenter()
      //
      action.play();
    });
  });
}