import { Scene, Matrix4, Raycaster, MeshBasicMaterial, SphereGeometry, Quaternion, Euler, MathUtils, Object3D, AnimationMixer, AmbientLight, PointLight, HemisphereLight, TorusGeometry, TextureLoader, Vector2, Vector3, Vector4, Color, Mesh, DoubleSide, ACESFilmicToneMapping, PCFSoftShadowMap, PlaneGeometry, ShaderMaterial, PerspectiveCamera, WebGLRenderer } from 'three';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as TWEEN from '@tweenjs/tween.js'
import { PostProcessing } from 'three/webgpu';
import { update } from '@tweenjs/tween.js';


//GLOBAL VARIABLES
const waitForSeconds = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
};

// client network speed
let speedInMbps = null;
let networkSpeedThreshold = 12; //not accurate at all 

// src's
let rootPath = "https://d368ik34cg55zg.cloudfront.net/"
let avatarPath = rootPath + "avatarWithAnimation.glb"
let nonInteractiveAvatarPath = rootPath + "AryehAvatarNonInteractiveWithEyes.glb"
let avatarEyeModelPath = rootPath + "AryehAvatarFullBodyJustEyesAndFaceRig.glb"


//models
let interactiveAvatar = null; //interactive avatar model
let nonInteractiveAvatar = null; //smaller dummy model(no animations, reduced textures and geometry)

//interactiveAvatar part's
let neckBone = null;
let headBone = null;
let eyeBoneRight = null;
let eyeBoneLeft = null;

//helpers
let neckBoneHelper = new Object3D();
let neckBoneOriginHelper = new Object3D();
let headBoneHelper = new Object3D();
let headBoneOriginHelper = new Object3D();
let eyeBoneRightHelper = new Object3D();
let eyeBoneLeftHlper = new Object3D();


//nonInteractiveAvatar part's
let avatarBodyNode = null;
let avatarEyesNode = null;
let avatarClothesNode = null;
let avatarHairNode = null;

//avatar dissolve shaders
let avatarEyesDissolveShader = null;
let avatarHairDissolveShader = null;
let avatarClothesDissolveShader = null;
let avatarBodyDissolveShader = null;

//materials
let avatarBodyBaseMaterial = null;
let avatarEyesBaseMaterial = null;
let avatarClothesBaseMaterial = null;
let avatarHairBaseMaterial = null;

const customCursorDataURL = 'data:image/x-icon;base64,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'

//noise textures
const textureLoader = new TextureLoader();// Load the textures using the same TextureLoader instance
const noiseTexture2 = textureLoader.load(rootPath + 'noiseCircle.png');// noiseTexture2.wrapS = noiseTexture2.wrapT = THREE.RepeatWrapping;
const noiseTexture3 = textureLoader.load(rootPath + 'noise4.png');// noiseTexture3.wrapS = noiseTexture3.wrapT = THREE.RepeatWrapping;
const directionNoise = textureLoader.load(rootPath + 'noise7.jpeg');
const doubleNoise = textureLoader.load(rootPath + 'doubleNoise2.png');


//animations
let mobileAnimation = null;

//different css animations attached to each class
let bubbleClasses = ["bubble x1", "bubble x2", "bubble x3", "bubble x4", "bubble x5"];
let bubbleIndex = 0;
const mixer = new AnimationMixer();
let action = null;

//morph targets for manual face animation
let faceMesh = null;
let targetInfluences = null;
let morphTargetDictionary = null;

//blinking animation
let leftEyeBlink = null;
let rightEyeBlink = null;

//main idle animation
let idleAnimation = null;

//tween for dissolve shaders
let tweenClothesDissolveShader = null;
let tweenBodyDissolveShader = null;
let tweenHairDissolveShader = null;
let tweenEyesDissolveShader = null;


//tween for head animating back to center position
let animateAvatarToOriginTween = null;


//colliders
const animateHeadTriggerRectColl = document.getElementById('head-trigger-collider');
let containersOverlappingWithTriggerColl = document.getElementsByClassName("intersects-with-coll")

//flags
let customCursorShowing = false;
let isAvatarTracking = false;
let swappingAvatarMethod = true;
let interactiveAvatarLoaded = false; //flag to check if interactive avatar is loaded
let interactiveAvatarInScene = false; //flag to check if interactive avatar is in the scene
let usePostProcessing = true; //flag to enable/disable post processing
let dissolveEffectStarted = false; //flag to check if the dissolve effect has started
let dissolveShaderPlaying = false;  //flag to update dissolve shader uniforms via tweening
let dissolveEffectFinished = false; //flag to check if the dissolve effect has finished
let isMobile = false; //flag to check if the user is on a mobile device
let animateHead = false; //flag to animate the head
let fingerDown = false;



//misc objects 
let silluetteMesh = null;
let sphere3DCollider = null;

//misc elements
let animationContainer = document.getElementById('animationContainer'); //container for css animations
let workSection = document.getElementById("work-section")

//transform objects
let targetPosition = new Vector3();

//argument variables
let leaveTimeout = null;




//not super accurate, but might use it in conjunction with other method AKA estimateNetworkSpeed()
if (navigator.connection) {
  const downlink = navigator.connection.downlink; // Effective bandwidth estimate in Mbps
  console.log(`navigator estimated download speed: ${downlink} `);
}


//load models based on estimateNetworkSpeed
estimateNetworkSpeed();

//checking network speed after dom content loaded is much more accurate, downside is we have to wait
document.addEventListener('DOMContentLoaded', (event) => {

});

// Create a GLTF loader
const loader = new GLTFLoader();

//three js canvas
const canvas = document.getElementById('myCanvas');

//CDN path for assets
const assetPath = "https://d368ik34cg55zg.cloudfront.net/"

//animated spinning 3d donut
let torus = null; //animated torus
let torusMaterial = null; //animated torus material

//three js scene setup
const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.0, 1.6, 0.5);
camera.layers.enable(1);


//renderer for non post processing
const renderer = customWebGLRenderer();

//renderer for post processing
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
renderPass.alpha = 0;
renderPass.clear = true;
renderPass.clearDepth = true;
composer.addPass(renderPass);

//bloom pass for post processing
const bloomPass = new UnrealBloomPass(new Vector2(canvas.clientWidth, canvas.clientHeight), 0.5, 0.4, 4.85);
composer.addPass(bloomPass);


//scene lighting
createSceneLighting();


//create raycaster for mouse and touch events
let raycaster = createRaycaster();

//create virtual mouse
const mouse = new Vector2();
const previousMouseIntersectionPoint = new Vector2();


//general event listeners
window.addEventListener('resize', resizeCanvas);
window.addEventListener('load', resizeCanvas);

//set canvas's initial size
setCanvasSize()

//mesh with color corrected shader accounting for ACESFilmicToneMapping tonemapping
const backgroundMesh = colorCorrectedBackGroundMesh();
backgroundMesh.layers.set(1); // 1 = post processing layer, 0 = default layer
backgroundMesh.position.set(0, 0, -5);
scene.add(backgroundMesh);






// Render the scene
function animate(time) {

  // spinning torus animation (loading animation)
  if (torusMaterial) {
    torusMaterial.uniforms.time.value += 0.01;
  }

  // start the dissolve effect
  if (nonInteractiveAvatar && !dissolveEffectStarted) {
    dissolveEffectStarted = true;
    dissolveShaderPlaying = true;
    animateDissolveShaders();
  }

  // Update the dissolve shader via TWEEN animation
  if (dissolveShaderPlaying) {
    updateDissolveShaders();
  }

  if(animateAvatarToOriginTween){
    animateAvatarToOriginTween.update();
    console.log("updating")
  }

  if (interactiveAvatar && animateHead) {
    if (isMobile) {
      //do some mobile related things
    }
    rotateHead();
    rotateEyes();

  }

  if (!interactiveAvatarLoaded && eyeBoneLeft && interactiveAvatarInScene && dissolveEffectFinished) {
    interactiveAvatarLoaded = true;
    swapAvatars()
    removeTorus()


  }



  requestAnimationFrame(animate);

  // renderer.clear(); //must clear renderer when switching between post processing and non post processing
  if (usePostProcessing) {
    composer.render();
  } else {
    renderer.clear();
    renderer.render(scene, camera);
  }

}

animate();



//helper functions
function setCanvasSize() {
  canvas.style.width = window.innerWidth
  canvas.style.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}


function resizeCanvas() {
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix();

}



function createSceneLighting() {
  // Ambient light for soft global illumination
  const hemiLight = new HemisphereLight(0x0000ff, 0x00ff00, 0.4);
  const ambientLight = new AmbientLight("#666666", 10); // Soft white light
  scene.add(ambientLight, hemiLight);


  // point light for the face
  const pointLight = new PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 3, -2); // Position the point light above the subject
  pointLight.castShadow = true;
  scene.add(pointLight);


  // Fill light to reduce shadows under the eyes
  const fillLight = new PointLight(0xffffff, 0.5, 50);
  fillLight.position.set(0, 1.5, -1); // Position the fill light in front of the subject
  scene.add(fillLight);

}






function addTorus() {

  if (torus) {
    torus.visible = true;
    return;
  }
  let matcapTexture = new TextureLoader().load(assetPath + 'matcap3.jpg');
  torusMaterial = new ShaderMaterial({
    uniforms: {
      time: { value: 0.0 },
      progress: { value: 0.0 },
      pixels: { value: new Vector2(window.innerWidth, window.innerHeight) },
      distortion: { value: 4.0 },
      axis: { value: new Vector3(-1, 0, 0) },
      axis2: { value: new Vector3(-1, 0, 0) },
      speed: { value: 1.0 },
      matcaptexture: { value: matcapTexture },
      flatNormals: { value: 0.0 },
      resolution: { value: new Vector4(window.innerWidth, window.innerHeight, 1.0 / window.innerWidth, 1.0 / window.innerHeight) },
      brightness: { value: 6.7 }, // Set initial brightness
      emissiveColor: { value: new Color(1, 0.97, 0.05) }, // Set initial emissive color gold:
    },
    vertexShader: torusVS,
    fragmentShader: torusFS,
    side: DoubleSide,
    transparent: true,

  });

  const geometry = new TorusGeometry(0.5, 0.2, 16, 100);
  torus = new Mesh(geometry, torusMaterial);
  torus.axis = new Vector3(1.0, 0, 0.),
    torus.scale.set(0.2, 0.2, 0.2);
  torus.position.set(0, 1.6, -1.2);
  scene.add(torus);

}


function removeTorus() {
  // resetLights()
  scene.remove(torus);
  torusMaterial.dispose();
  torusMaterial = null;
}

function hideTorus() {
  if (torus) {
    torus.visible = false;
  }
}


















// create and return a color corrected background mesh
function colorCorrectedBackGroundMesh() {
  const backgroundGeometry = new PlaneGeometry(20, 20);
  const backgroundMaterial = new ShaderMaterial({
    uniforms: {
      color: { value: new Color("#fadad9").convertSRGBToLinear() }  //#fddfdf
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
    side: DoubleSide
  });

  backgroundMaterial.toneMapped = false
  window.backgroundMaterial = backgroundMaterial;
  backgroundMaterial.needsUpdate = true;
  const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial);
  return backgroundMesh;


}

function customWebGLRenderer() {
  const renderer = new WebGLRenderer({
    canvas: canvas,
    powerPreference: "high-performance",
    antialias: true,
  });

  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0); // The second parameter is the alpha value

  renderer.shadowMap.type = PCFSoftShadowMap; // Soft shadows
  renderer.toneMapping = ACESFilmicToneMapping;  //CineonToneMapping  //
  renderer.toneMappingExposure = 1;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.width, canvas.height);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.colorManagement = true;
  return renderer;

}

function loadModels() {

  //first load dummy avatar
  loader.load(
    nonInteractiveAvatarPath, //
    function (gltf) {
      nonInteractiveAvatar = gltf.scene;
      // avatar.scale.set(0.01, 0.01, 0.01);
      nonInteractiveAvatar.traverse((node) => {
        if (node.isMesh) {
          console.log(node.name)
          node.layers.set(1);
        }

        if (node.name == "avaturn_body_1") {
          avatarBodyBaseMaterial = node.material.clone()
          avatarBodyNode = node;
        }

        if (node.name == "avaturn_body_4") {
          avatarEyesBaseMaterial = node.material.clone()
          avatarEyesNode = node;
        }

        if (node.name == "avaturn_body_3") {
          avatarClothesBaseMaterial = node.material.clone()
          avatarClothesNode = node;
        }

        if (node.name == "avaturn_body_2") {
          avatarHairBaseMaterial = node.material.clone()
          avatarHairNode = node;
        }


      });

      createDissolveShaders()
      nonInteractiveAvatar.layers.set(1);
      nonInteractiveAvatar.position.set(0, 0, -2);
      hideTorus();
      if (silluetteMesh) {
        silluetteMesh.visible = false;
      }
      scene.add(nonInteractiveAvatar);
    },
    undefined,
    function (error) {
      console.error(error);
    }

  );



  //then load interactive avatar
  loader.load(avatarPath, function (gltf) {
    console.log("Interactive Avatar Loading ", performance.now());
    interactiveAvatar = gltf.scenes[0];
    // let face = interactiveAvatar.children[0]

    gltf.animations.forEach((clip) => {
      if (clip.name === "ArmatureAction") {
        idleAnimation = clip;
        action = mixer.clipAction(idleAnimation, interactiveAvatar);
      }
    });


    interactiveAvatar.traverse((object) => {
      if (object.isMesh) {
        object.layers.set(0);
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

    interactiveAvatar.scale.set(1, 1, 1);
    interactiveAvatar.position.set(0, 10, -2);

    headBone.parent.add(headBoneHelper);
    headBoneHelper.position.copy(headBone.position);
    headBone.parent.add(headBoneOriginHelper);
    headBoneOriginHelper.position.copy(headBone.position);
    headBoneOriginHelper.rotation.copy(headBone.rotation);

    neckBone.parent.add(neckBoneOriginHelper);
    neckBoneOriginHelper.position.copy(neckBone.position);
    neckBoneOriginHelper.rotation.copy(neckBone.rotation);

    interactiveAvatar.layers.set(0);
    // removeTorus();
    // silluetteMesh.visible = false;
    // backgroundMesh.visible = false;
    // usePostProcessing = false;
    scene.add(interactiveAvatar);
    // console.log("Interactive Avatar Loaded ", performance.now());
    interactiveAvatarInScene = true;

    //load in eyeball model
    loader.load(avatarEyeModelPath, function (gltf) {
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
      const eyeModelWorldPosition = new Vector3();
      eyeModel.getWorldPosition(eyeModelWorldPosition);


      // Add the eyeModel to the headBone
      headBone.add(eyeModel);



      // Convert the stored world position to the local position relative to the headBone
      const eyeModelLocalPosition = new Vector3();
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



//Loading Models

function loadNonInteractiveAvatar() {


}

function loadInteractiveAvatar() {



}



function createSiluetteMesh() {
  const textureLoader = new TextureLoader();
  const avatarSiluetteTexture = textureLoader.load(rootPath +'silluetteNoBackground.png');

  const planeGeometry = new PlaneGeometry(1.5, 1.5);
  const planeMaterial = new ShaderMaterial({
    uniforms: {
      uTexture: { value: avatarSiluetteTexture }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: `
    uniform sampler2D uTexture;
    varying vec2 vUv;
    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      if (texColor.a < 0.1) discard;
      gl_FragColor = texColor;
    }
  `,
    transparent: true
  });

  silluetteMesh = new Mesh(planeGeometry, planeMaterial);
  silluetteMesh.position.set(0, 1.5, -4);
  scene.add(silluetteMesh);
}



















//shaders

//torous shader
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




//functions that use shaders

//create dissolve shaders
function createDissolveShaders() {

  avatarEyesDissolveShader = new CustomShaderMaterial({
    baseMaterial: avatarEyesBaseMaterial,
    uniforms: {
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      edgeColor: { value: new Color(0, 0.57, 1) }, // Add a uniform for the color
      thickness: { value: 3.0 },
      dim: { value: false },
      noiseTexture: { value: directionNoise },
    },

    vertexShader: vs,
    fragmentShader: fs,

  });

  avatarHairDissolveShader = new CustomShaderMaterial({
    baseMaterial: avatarHairBaseMaterial,
    uniforms: {
      dim: { value: false },
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      thickness: { value: 3.0 },
      edgeColor: { value: new Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: noiseTexture2 },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });


  avatarClothesDissolveShader = new CustomShaderMaterial({
    baseMaterial: avatarClothesBaseMaterial,
    uniforms: {
      dim: { value: false },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      edgeColor: { value: new Color(1, 0.27, 0.63) }, // Add a uniform for the color
      noiseTexture: { value: doubleNoise },
      brightness: { value: 3.0 },
      growFade: { value: false },
      thickness: { value: 1.0 },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  avatarBodyDissolveShader = new CustomShaderMaterial({
    baseMaterial: avatarBodyBaseMaterial,
    uniforms: {
      dim: { value: false },
      growFade: { value: false },
      brightness: { value: 10.0 },
      time: { value: 0.2 },
      threshold: { value: 2.0 },
      thickness: { value: 3.0 },
      edgeColor: { value: new Color(1, 0.27, 0.63) }, // Add a uniform for the color

      noiseTexture: { value: doubleNoise },
    },
    vertexShader: vs,
    fragmentShader: fs,

  });

  avatarBodyNode.material = avatarBodyDissolveShader;
  avatarClothesNode.material = avatarClothesDissolveShader;
  avatarEyesNode.material = avatarEyesDissolveShader;
  avatarHairNode.material = avatarHairDissolveShader;

}


//tween dissolve shaders
function animateHairIn() {
  tweenHairDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 400)
    .easing(TWEEN.Easing.Cubic.InOut)
    .delay(1400)
    .onComplete(() => {
      console.log("complete hat animation", performance.now())

      if (!interactiveAvatarLoaded && interactiveAvatarInScene) {
   
        swapAvatars()
      } else {
        console.log("start the donut animation again...")
        dissolveShaderPlaying = false;
        dissolveEffectFinished = true;
        addTorus()
      }
    })
    .onUpdate((object) => {
      avatarHairDissolveShader.uniforms.threshold.value = object.x;
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
      avatarBodyDissolveShader.uniforms.threshold.value = object.x;
    })
    .start();

}


function animateClothesIn() {

  tweenClothesDissolveShader = new TWEEN.Tween({ x: 1 })
    .to({ x: 0 }, 1000)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onComplete(() => { })
    .onUpdate((object) => {
      avatarClothesDissolveShader.uniforms.threshold.value = object.x;

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
      avatarEyesDissolveShader.uniforms.threshold.value = object.x;
    });

  tweenEyesDissolveShader.start();

}

function animateDissolveShaders() {
  animateBodyIn();
  animateClothesIn();
  animateEyesIn();
  animateHairIn();
}


function updateDissolveShaders() {
  if (tweenClothesDissolveShader) {
    tweenClothesDissolveShader.update();
  }
  if (tweenBodyDissolveShader) {
    tweenBodyDissolveShader.update();
  }
  if (tweenEyesDissolveShader) {
    tweenEyesDissolveShader.update();
  }
  if (tweenHairDissolveShader) {
    tweenHairDissolveShader.update();
  }
}

//swap dummy avatar for interactive avatar
async function swapAvatars() {
  console.log("show be deleting the dummy avatar...")
  interactiveAvatarLoaded = true;
  usePostProcessing = false;
  backgroundMesh.visible = false;

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

  interactiveAvatar.position.set(0, 0, -2);
  nonInteractiveAvatar.position.set(0, 10, -2);

  backgroundMesh.visible = false;

  if (silluetteMesh) {
    silluetteMesh.visible = false;
  }

  usePostProcessing = false;




  // action.play();
  await waitForSeconds(0.25)
  animateHead = true;
  // startBlinking();
  //animate towards current mouse position
  await waitForSeconds(0.25)
  if (isMobile) {
    mobileAnimation = document.createElement('div');
    mobileAnimation.id = 'mobileAnimation'; // Set the ID to 'mobileAnimation'
    // <div class="bubble x5" style="--animation-duration: calc(25s + 10s * random())"></div>
    mobileAnimation.className = 'bubble x1'; // Correctly assign the class
    bubbleIndex++;
    // Random duration between 25s and 35s
    animationContainer.appendChild(mobileAnimation);
    // mobileAnimation.className = 'moving-div'; // Correctly assign the class
    // document.body.appendChild(mobileAnimation);
    mobileAnimation.addEventListener("animationend", async (event) => {

      //   console.log("animation iteration")
      console.log(mobileAnimation.className, bubbleClasses[bubbleIndex], bubbleIndex)
      let newclassname;
      if (bubbleClasses[bubbleIndex + 1] != undefined) {
        newclassname = bubbleClasses[bubbleIndex++]
      } else {
        bubbleIndex = 0;
        newclassname = bubbleClasses[bubbleIndex]
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
  nonInteractiveAvatar.parent.remove(nonInteractiveAvatar);


  // nonInteractiveAvatar.parent.remove(nonInteractiveAvatar);


}




// sphere collider is our world space target for raycasting. 
// the mouse events will shoot a raycast from it's position on the canvas 
//and the intersection point will be the target position used to animate the avatar
const sphereGeometry = new SphereGeometry(1, 32, 32);
const sphereMaterial = new MeshBasicMaterial({
  color: 0x0000ff,
  transparent: true,
  opacity: 0
});


sphere3DCollider = new Mesh(sphereGeometry, sphereMaterial);
sphere3DCollider.position.set(0, 1, -1.2); //0, 1.6, -1
sphere3DCollider.scale.set(7.75, 5, 1); //1.5, 1.5, 0.5
sphere3DCollider.layers.set(2); // only visible to raycaster
sphere3DCollider.material = sphereMaterial;
scene.add(sphere3DCollider);



function createRaycaster() {
  const raycaster = new Raycaster();
  raycaster.layers.set(2);
  return raycaster;

}


//animate the avatar back towards center origin orientation
function animateAvatarToOrigin() {
    //instead of animate the head we should just find the last mouse uv coords and just animate them to to 0, 0
    if (animateAvatarToOriginTween && animateAvatarToOriginTween.isPlaying()) {
      console.error("should never happen")
      animateAvatarToOriginTween.stop()
    }
    let mouse2 = { u: previousMouseIntersectionPoint.x, v: previousMouseIntersectionPoint.y };
    let center = { u: 0, v: 0 };

    animateAvatarToOriginTween = new TWEEN.Tween(mouse2)
      .to(center, 1000) // Interpolating to the end vector
      .easing(TWEEN.Easing.Circular.InOutt)    
      .onComplete(()=>{
        animateAvatarToOriginTween = null;
      })       // Ease-out for smooth animation
      .onUpdate(() => {
        let mouse2Vector = new Vector2(mouse2.u, mouse2.v);
        raycaster.setFromCamera(mouse2Vector, camera);
        // Calculate objects intersecting the ray
        const intersects = raycaster.intersectObjects(scene.children, true);
        // Check if the sphere is intersected
        for (let i = 0; i < intersects.length; i++) {
          if (intersects[i].object === sphere3DCollider) {
            targetPosition = intersects[i].point;
          }
        }
      })
      animateAvatarToOriginTween.start();
}

// functions for detecting mouse and touch events for interactive avatar

//over main collider element, it's pretty weird and confusing. there is def a better way to do this
const isMouseOverElement = (mouseX, mouseY, element) => {
  const rect = element.getBoundingClientRect();
  return mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;
};



//a simple hack. currently the hitbox for the avatar extend past the hero section so we can manually detect
//when the mouse leaves the hero section and disable avatar tracking
workSection.addEventListener("mouseenter", (event) => {
  if (isAvatarTracking) {
    disableAvatarTracking()
  }
});



animateHeadTriggerRectColl.addEventListener('mouseleave', (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  if(isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const u = (x / rect.width) * 2 - 1;
    const v = (y / rect.height) * 2 - 1;
    let mouse = new Vector2(u, -v);
    detectMouseOverSphereColl(mouse)
  } else {
    if (isAvatarTracking) {
      disableAvatarTracking()
    }
  }
});





animateHeadTriggerRectColl.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const u = (x / rect.width) * 2 - 1;
  const v = (y / rect.height) * 2 - 1;
  const mouse = new Vector2(u, -v);
  detectMouseOverSphereColl(mouse);
});







//add event listeners to all elements that sit on top of the animateHeadTriggerRectColl
for (var i = 0; i < containersOverlappingWithTriggerColl.length; i++) {


  containersOverlappingWithTriggerColl[i].addEventListener('mousemove', (event) => {
    detectMouseThroughOverlappingElement(event);
  });

 
  containersOverlappingWithTriggerColl[i].addEventListener('mouseleave', (event) => {
    detectMouseLeavingOverlappingElement(event)
  });


}


function detectMouseThroughOverlappingElement(event) {
  const rect = canvas.getBoundingClientRect()

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const u = (x / rect.width) * 2 - 1;
  const v = (y / rect.height) * 2 - 1;
  let mouse = new Vector2(u, -v);
  detectMouseOverSphereColl(mouse)
}

//when mouse leaves a collider element we toggle off avatar tracking as long as mouse has not entered a new collider
function detectMouseLeavingOverlappingElement(event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  if (isMouseOverElement(mouseX, mouseY, animateHeadTriggerRectColl)) {
    // const rect = canvas.getBoundingClientRect();
    // const x = event.clientX - rect.left;
    // const y = event.clientY - rect.top;
    // const u = (x / rect.width) * 2 - 1;
    // const v = (y / rect.height) * 2 - 1;
    // let mouse = new THREE.Vector2(u, -v);
    // detectMouseOverSphereColl(mouse)
  } else {
    if (isAvatarTracking) {
      disableAvatarTracking()
    }

  }
}




//detect if mouse is over collider
function detectMouseOverSphereColl(mouse) {
  raycaster.setFromCamera(mouse, camera);
  // Calculate objects intersecting the ray
  const intersects = raycaster.intersectObjects(scene.children, true);
  // Check if the sphere collider is intersected
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object === sphere3DCollider) {
      // console.log("mouse over sphere collider")
      previousMouseIntersectionPoint.copy(mouse);
      if (leaveTimeout) {
        clearTimeout(leaveTimeout)
      }

      if (!isAvatarTracking) {
        enableAvatarTracking()
      }
      targetPosition = intersects[i].point;
      return;
      // //if head is animating back to center stop it and start animating towards the mouse
      // if (animateAvatarToOriginTween && animateAvatarToOriginTween.isPlaying()) {
      //   animateAvatarToOriginTween.stop()
      // }


      // if (!customCursorShowing) {
      //   // setCustomCursor();
      //   customCursorShowing = true;
      // }


    }
  }
  //if not intersecting with sphere collider then toggle red cursor and animate avatar to origin position
  //red cursor indicates that the mouse is over the interactive avatar
  if (isAvatarTracking) {
    disableAvatarTracking()
    // enableAvatarTracking()
    //startAvatarTracking()
    // isAvatarTracking

    //setCursor();
    //animateHeadBackToCenter()
  }
}


//handle state when avatar starts tracking an object
function enableAvatarTracking() {
  console.log("enabling avatar tracking")
  if (isAvatarTracking) {
    console.error("avatar tracking is already enabled")
    return
  }
  if (animateAvatarToOriginTween && animateAvatarToOriginTween.isPlaying()) {
    animateAvatarToOriginTween.stop()
  }

  isAvatarTracking = true;
  customCursorShowing = true;
  setCustomCursor()
}

//handle state when avatar stops tracking an object
function disableAvatarTracking() {
  console.log("disabling avatar tracking")
  if (!isAvatarTracking) {
    console.error("avatar tracking is already disabled")
    return
  }
  isAvatarTracking = false;
  customCursorShowing = false;
  animateAvatarToOrigin()
  setCursor()

}



//function to toggle mouse cursor. red means avatar is tracking, white means it is not.
function setCustomCursor() {
  document.body.style.cursor = `url(${customCursorDataURL}), auto`;
}

function setCursor() {
  document.body.style.cursor = 'default';
}



function estimateNetworkSpeed() {
  let userImageLink = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
  let time_start, end_time;

  // The size in bytes
  let downloadSize = 82000;
  let downloadImgSrc = new Image();

  downloadImgSrc.onload = function () {
    end_time = new Date().getTime();
    displaySpeed();
  };
  time_start = new Date().getTime();
  downloadImgSrc.src = userImageLink;

  function displaySpeed() {
    let timeDuration = (end_time - time_start) / 1000;
    let loadedBits = downloadSize * 8;
    /* Converts a number into string
       using toFixed(2) rounding to 2 */
    let bps = (loadedBits / timeDuration).toFixed(2);
    let speedInKbps = (bps / 1024).toFixed(2);
    speedInMbps = (speedInKbps / 1024).toFixed(2) * 10;
    console.log("Your connection speed is: " + speedInMbps + " Mbps");

    if (speedInMbps > networkSpeedThreshold) {
      console.log("loading in dummy")
      loadModels();
    } else {
      console.log("loading in interactive avatar without dummy")
      setTimeout(() => { createSiluetteMesh() }, 1);
      setTimeout(() => { addTorus() }, 1);//timeout to insure this is queued up to run on the next event loop
      loadModels();
    }



  }

}


//helper functions for rotating head and eyes


//functions for calculating head and neck movement
function calculateTargetQuaternion(object, targetPosition) {
  const targetQuaternion = new Quaternion();
  const up = new Vector3(0, 1, 0); // Assuming the up direction is along the Y-axis
  const matrix = new Matrix4().lookAt(object.getWorldPosition(new Vector3()), targetPosition, up);
  targetQuaternion.setFromRotationMatrix(matrix);
  const correctionQuaternion = new Quaternion();
  correctionQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI); // Rotate 180 degrees around the Y-axis
  return targetQuaternion;
}

function calculateYawAndPitchDifference(euler1, euler2) {
  const yawDifference = euler2.y - euler1.y;
  const pitchDifference = euler2.x - euler1.x;
  return [yawDifference, pitchDifference];
}




function rotateEyes() {


  eyeBoneLeft.lookAt(targetPosition);
  eyeBoneRight.lookAt(targetPosition);

  //imported eyebones foward direction is set to the y axis and therefor need rotated
  eyeBoneLeft.rotateOnAxis(new Vector3(-1, 0, 0), Math.PI * -0.55);
  eyeBoneRight.rotateOnAxis(new Vector3(-1, 0, 0), Math.PI * -0.55);
}

function rotateHead() {

  headBoneHelper.lookAt(targetPosition);
  let [yaw, pitch] = calculateYawAndPitchDifference(headBoneHelper.rotation, headBoneOriginHelper.rotation);
  const targetQuaternion = calculateTargetQuaternion(neckBone, targetPosition);
  const correctionQuaternion = new Quaternion();
  correctionQuaternion.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI); // Rotate 180 degrees around the Y-axis
  const correctedTargetQuaternion = targetQuaternion.clone().multiply(correctionQuaternion);
  headBone.quaternion.slerp(correctedTargetQuaternion, 0.02);

  if (true || Math.abs(MathUtils.radToDeg(yaw)) > 6 || Math.abs(MathUtils.radToDeg(pitch)) > 4) {
    const offsetQuaternion = new Quaternion();
    offsetQuaternion.setFromAxisAngle(new Vector3(-1, 0, 0), Math.PI * -0.19); // Adjust the axis and angle as needed
    const finalTargetQuaternion = correctedTargetQuaternion.multiply(offsetQuaternion);
    const halfwayQuaternion = new Quaternion().copy(neckBoneOriginHelper.quaternion).slerp(finalTargetQuaternion, 0.35);
    neckBone.quaternion.slerp(halfwayQuaternion, 0.03);
  }


}


