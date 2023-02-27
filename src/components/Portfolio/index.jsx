import {useEffect, useRef} from 'react'
import styles from './Portfolio.module.css'

import * as THREE from 'three'

export default function Portfolio() {
  const canvasContainer = useRef(null)

  useEffect(() => {
    /*
     *Basic Parameter
     */
    var renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(window.innerWidth, window.innerHeight)

    if (window.innerWidth > 800) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.shadowMap.needsUpdate = true
    }

    canvasContainer.current.appendChild(renderer.domElement)

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    var camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      500,
    )

    camera.position.set(0, 2, 14)

    /*
     *Fog Background
     */

    // var setcolor = 0xf02050

    let scene = new THREE.Scene()
    // scene.background = new THREE.Color(setcolor)
    // scene.fog = new THREE.Fog(setcolor, 10, 16)

    /*
     *Lights
     */
    var ambientLight = new THREE.AmbientLight(0xffffff, 4)
    scene.add(ambientLight)

    /*
     *create portfolio
     */
    var cube;
    var init = function () {
      var geometry = new THREE.BoxGeometry(1.5, 3, 0.3);
      var material = new THREE.MeshStandardMaterial({color: 0x323232});
      cube = new THREE.Mesh(geometry, material)
      cube.position.set(0, 3, 0);
      scene.add(cube);
    }

    /*
     *Animate
     */
    var animate = function () {
      requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }

    /*
     *Start Functions
     */
    init()
    animate()
  }, [])

  return (
    <>
      <div className={styles.canvasContainer} ref={canvasContainer}></div>
    </>
  )
}
