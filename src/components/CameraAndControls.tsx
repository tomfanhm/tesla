import React, { Fragment, useRef } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const focusCar = new THREE.Vector3(3, 3, 3);
const focusLCD = new THREE.Vector3(0, 1, 0.2);

const CameraAndControls: React.FC = () => {
  const camera = useRef<THREE.PerspectiveCamera>(null);
  const control = useRef<OrbitControlsImpl>(null);

  const { position } = useControls("Camera", {
    position: {
      options: ["out-car", "in-car"],
    },
  });

  useFrame(() => {
    const alpha = 0.05;
    if (camera.current && control.current) {
      let z: number = control.current.target.z;
      switch (position) {
        case "in-car":
          camera.current.position.lerp(focusLCD, alpha);
          z = THREE.MathUtils.lerp(z, 5, alpha);
          control.current.target.set(0, 0, z);
          break;
        case "out-car":
          camera.current.position.lerp(focusCar, alpha);
          z = THREE.MathUtils.lerp(z, 0, alpha);
          control.current.target.set(0, 0, z);
          break;
        default:
          camera.current.position.lerp(focusCar, alpha);
          break;
      }
    }
  });

  return (
    <Fragment>
      <PerspectiveCamera
        makeDefault
        fov={75}
        position={[5, 5, 15]}
        ref={camera}
      />
      <OrbitControls
        maxPolarAngle={1.5}
        target={[0, 0, 0]}
        makeDefault
        ref={control}
      />
    </Fragment>
  );
};
export default CameraAndControls;
