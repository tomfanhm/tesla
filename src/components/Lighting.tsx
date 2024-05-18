import React, { Fragment } from "react";
import { useControls } from "leva";
import * as THREE from "three";

const positions = [new THREE.Vector3(5, 10, 0), new THREE.Vector3(-5, 10, 0)];

const Lighting: React.FC = () => {
  const { color, intensity } = useControls("Light", {
    color: "#ffe692",
    intensity: { value: 1, min: 0.1, max: 1, step: 0.1 },
  });

  return (
    <Fragment>
      {positions.map((pos, i) => (
        <spotLight
          key={i}
          color={color}
          intensity={intensity} // 光照強度
          angle={0.7} // 光線散射角度，最大為Math.PI/2
          penumbra={0.5} // 聚光錐的半影衰減百分比。在0和1之間的值。默認為0。
          position={pos}
        />
      ))}
    </Fragment>
  );
};
export default Lighting;
