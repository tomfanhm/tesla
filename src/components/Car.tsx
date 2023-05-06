import { useGLTF, useVideoTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const lightingMeshKey = [
  "chrome_Lights_head_l_right_front_light_0",
  "chrome_Lights_head_l_left_front_light_0",
  "foglights_r_foglight_r_0",
  "foglights_l_foglight_l_0",
  "turn_indicat_r_indicator_rf_0",
  "turn_indicat_l_indicator_lf_0",
  "rear_lightsl_left_rear_light_0",
  "rear_lightsr_right_rear_light_0",
  "pantulans_pantulans0_0",
  "light_turn_rr_boot_indicator_rr_0",
  "light_breake_breaklight_l_0",
];

interface Node<T> {
  name: string;
  children: T[];
}

function findNode<T extends Node<T>>(data: T, name: string): T | undefined {
  return data.children.reduce((res: T | undefined, d: T) => {
    if (res) {
      return res;
    }
    if (d.name === name) {
      return d;
    }

    return findNode(d, name);
  }, undefined);
}

const Car: React.FC = () => {
  const gltf = useGLTF("/gltf/tesla/scene.gltf");
  const texture = useVideoTexture("/video/pexels.mp4", {
    unsuspend: "canplay",
    crossOrigin: "Anonymous",
    muted: true,
    loop: true,
    start: true,
  });

  useEffect(() => {
    if (gltf) {
      //re-size
      gltf.scene.scale.set(0.01, 0.01, 0.01);
      gltf.scene.position.set(0, 0.84, 0);
      gltf.scene.rotation.set(0, Math.PI, 0);
      gltf.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
          object.material.envMapIntensity = 10;
        }
      });
      //set grow items
      const lightingMesh = lightingMeshKey.map((key) =>
        findNode<THREE.Mesh | THREE.Object3D>(gltf.scene, key)
      );
      lightingMesh
        .flatMap((f) => (f ? [f] : []))
        .forEach((element) => {
          if (element instanceof THREE.Mesh) {
            element.material.toneMapped = false;
            element.material.color.r = 100;
            element.material.color.g = 100;
            element.material.color.b = 100;
          }
        });
    }
  }, [gltf]);

  useEffect(() => {
    if (gltf && texture) {
      const LCD = findNode<THREE.Mesh | THREE.Object3D>(
        gltf.scene,
        "LCDs_LCDs0_0"
      );
      if (LCD instanceof THREE.Mesh) {
        LCD.material = new THREE.MeshBasicMaterial();
        LCD.material.map = texture;
      }
    }
  }, [gltf, texture]);

  const carRef = useRef<THREE.Object3D>(null);

  useFrame(({ clock }) => {
    if (gltf) {
      const elapsed = clock.getElapsedTime();
      const frontWheel =
        gltf.scene.children[0].children[0].children[0].children[0].children[7]
          .children[0];
      const backWheel =
        gltf.scene.children[0].children[0].children[0].children[0].children[7]
          .children[1];
      const speed = -2 * elapsed;
      //Wheel
      frontWheel.children.forEach((element) => {
        element.rotation.x = speed;
      });

      backWheel.children.forEach((element) => {
        element.rotation.x = speed;
      });
    }
  });

  return <primitive object={gltf.scene} ref={carRef} />;
};
export default Car;
