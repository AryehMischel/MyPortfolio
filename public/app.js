import { Scene, TorusGeometry, TextureLoader, Vector2, Vector3, Vector4, Color, Mesh, DoubleSide, ACESFilmicToneMapping, PCFSoftShadowMap, PlaneGeometry, ShaderMaterial, PerspectiveCamera, WebGLRenderer } from 'three';


console.log("loaded all modules", performance.now())


const assetPath = "https://d368ik34cg55zg.cloudfront.net/"
let torusMaterial = null;


const canvas = document.getElementById('myCanvas');

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0.0, 1.6, 0.5); // Adjust the camera position 0.005, 1.6, 0.5
camera.layers.enable(1);
window.camera = camera;

// createSceneLighting();

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
backgroundMesh.layers.set(1);
backgroundMesh.position.set(0, 0, -5);

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


// Render the scene
function animate(time) {
  if (torusMaterial) {
    torusMaterial.uniforms.time.value += 0.01;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}
animate();
console.log("scene loaded", performance.now())


// function createSceneLighting() {
//   // Ambient light for soft global illumination
//   const hemiLight = new HemisphereLight(0x0000ff, 0x00ff00, 0.4);
//   const ambientLight = new AmbientLight("#666666", 10); // Soft white light
//   scene.add(ambientLight, hemiLight);


//   // point light for the face
//   const pointLight = new PointLight(0xffffff, 1, 100);
//   pointLight.position.set(0, 3, -2); // Position the point light above the subject
//   pointLight.castShadow = true;
//   scene.add(pointLight);


//   // Fill light to reduce shadows under the eyes
//   const fillLight = new PointLight(0xffffff, 0.5, 50);
//   fillLight.position.set(0, 1.5, -1); // Position the fill light in front of the subject
//   scene.add(fillLight);

// }

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

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix();

}


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



let matcapTexture = new TextureLoader().load(assetPath + 'matcap3.jpg');

let torus = null;
function addTorus() {
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
      brightness: { value: 0.7 }, // Set initial brightness
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
    torus.position.y = 1.6;
  torus.position.z = -1.2;

  torus.scale.set(0.2, 0.2, 0.2);
  scene.add(torus);
  window.torus = torus;

}
addTorus()


