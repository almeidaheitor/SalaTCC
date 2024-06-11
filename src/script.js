import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let mixer = null

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

gltfLoader.load(
    '/models/SalaComCameras.gltf',
    (gltf) =>
    {
        //gltf.scene.scale.set(0.1, 0.1, 0.1)
        scene.add(gltf.scene)
        
        const F08 = 'S_F_08'
        const meshF08 = gltf.scene.getObjectByName('S_F_08')
        if(F08){
            console.log('Mesh encontrado: F08', F08)
            meshF08.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        const E14 = 'S_E_14'
        const meshE14 = gltf.scene.getObjectByName('S_E_14')
        if(E14){
            console.log('Mesh encontrado: E14', E14)
            meshE14.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        const D01 = 'S_D_01'
        const meshD01 = gltf.scene.getObjectByName('S_D_01')
        if(D01){
            console.log('Mesh encontrado: D01', D01)
            meshD01.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        const C04 = 'S_C_04'
        const meshC04 = gltf.scene.getObjectByName('S_C_04')
        if(C04){
            console.log('Mesh encontrado: C04', C04)
            meshC04.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        const B10 = 'S_B_10'
        const meshB10 = gltf.scene.getObjectByName('S_B_10')
        if(B10){
            console.log('Mesh encontrado: B10', B10)
            meshB10.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        const A13 = 'S_A_13'
        const meshA13 = gltf.scene.getObjectByName('S_A_13')
        if(A13){
            console.log('Mesh encontrado: A13', A13)
            meshA13.userData.clickable = true
        } else {
            console.log('Mesh não encontrado')
        }

        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
    }
)

//Função para atualizar a posição do mouse
function onMouseMove(event){
    //Calcula a posição normalizada do mouse
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
}

//Função para detectar cliques do mouse
function onMouseClick(event){
    onMouseMove(event)
    raycaster.setFromCamera(mouse, activeCamera)

    const intersects = raycaster.intersectObjects(scene.children, true)

    const clickableObjectsToCameras = {
        S_F_08: cameraF08,
        S_E_14: cameraE14,
        S_D_01: cameraD01,
        S_C_04: cameraC04,
        S_B_10: cameraB10,
        S_A_13: cameraA13
    }

    if (intersects.length > 0) {
        const firstIntersectedObject = intersects[0].object;
        if (firstIntersectedObject.userData.clickable) {
            const objectName = firstIntersectedObject.userData.name;
            console.log(`Mesh clicado: ${objectName}`, firstIntersectedObject);
            // Verifica se o objeto clicado tem uma câmera associada
            if (clickableObjectsToCameras[objectName]) {
                activeCamera = clickableObjectsToCameras[objectName];
            } else {
                console.log(`Nenhuma câmera associada encontrada para o objeto ${objectName}`);
            }
        }
    }

}

window.addEventListener('mousemove', onMouseMove, false)
window.addEventListener('click', onMouseClick, false)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    cameraInicial.aspect = sizes.width / sizes.height
    cameraInicial.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

const cameraInicial = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraInicial.position.set(360.2362060546875, 136.86610412597656, -29.527559280395508)
scene.add(cameraInicial)

const cameraF08 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraF08.position.set(18.700790405273438, 203.40159606933594, -157.4803009033203)
cameraF08.rotation.x = 0; 
cameraF08.rotation.y = 105;
cameraF08.rotation.z = 0;

scene.add(cameraF08)

const cameraE14 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraE14.position.set(81.69291687011719, 189.22830200195312, -274.6062927246094)
cameraE14.rotation.x = 0; 
cameraE14.rotation.y = 115;
cameraE14.rotation.z = 0;
scene.add(cameraE14)

const cameraD01 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraD01.position.set(121.06300354003906, 175.0550994873047, -20.669288635253906)
cameraD01.rotation.x = 0; 
cameraD01.rotation.y = 74;
cameraD01.rotation.z = 0;
scene.add(cameraD01)

const cameraC04 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraC04.position.set(160.43309020996094, 160.88189697265625, -79.72441101074219)
cameraC04.rotation.x = 0; 
cameraC04.rotation.y = 74;
cameraC04.rotation.z = 0;
scene.add(cameraC04)

const cameraB10 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraB10.position.set(199.8031005859375, 146.7086944580078, -195.8660888671875)
cameraB10.rotation.x = 0; 
cameraB10.rotation.y = 73.7;
cameraB10.rotation.z = 0;
scene.add(cameraB10)

const cameraA13 = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 1000)
cameraA13.position.set(239.17318725585938, 132.535400390625, -254.92129516601562)
cameraA13.rotation.x = 0; 
cameraA13.rotation.y = 73.55;
cameraA13.rotation.z = 0;
scene.add(cameraA13)

let activeCamera = cameraInicial

// Controls
const controls = new OrbitControls(activeCamera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(mixer)
    {
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, activeCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()