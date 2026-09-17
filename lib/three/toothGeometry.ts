import * as THREE from "three";

/**
 * Builds a low-poly, faceted "gem tooth" silhouette — an abstract molar
 * profile lathed around the Y axis with a deliberately low segment count
 * so it reads as a cut-gem sculpture rather than a literal anatomical
 * tooth. Used as the hero's centerpiece 3D object.
 */
export function createToothGeometry(segments = 10): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.04, -1.12), // root tip — blunt, not needle-sharp
    new THREE.Vector2(0.13, -1.0),
    new THREE.Vector2(0.17, -0.82),
    new THREE.Vector2(0.16, -0.62), // root body
    new THREE.Vector2(0.13, -0.4), // neck / gumline (narrowest)
    new THREE.Vector2(0.24, -0.2),
    new THREE.Vector2(0.38, -0.02),
    new THREE.Vector2(0.49, 0.14), // crown shoulder widening
    new THREE.Vector2(0.52, 0.32), // widest point — molar crown
    new THREE.Vector2(0.46, 0.46),
    new THREE.Vector2(0.32, 0.56), // flatter occlusal dome, not a sharp cusp
    new THREE.Vector2(0.12, 0.61),
    new THREE.Vector2(0.0, 0.62), // crown apex
  ];

  const geometry = new THREE.LatheGeometry(points, segments);
  geometry.computeVertexNormals();
  return geometry;
}
