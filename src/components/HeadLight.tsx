import React, { Fragment, useEffect, useRef } from "react";
import * as THREE from "three";

const HeadLight: React.FC = () => {
  const light1 = useRef<THREE.SpotLight>(null);
  const light2 = useRef<THREE.SpotLight>(null);
  useEffect(() => {
    if (light1.current) {
      light1.current.target.position.set(-1.3, -5, 15);
      light1.current.target.updateMatrixWorld();
    }
    if (light2.current) {
      light2.current.target.position.set(1.3, -5, 15);
      light2.current.target.updateMatrixWorld();
    }
  }, []);
  return (
    <Fragment>
      <spotLight
        color={[1, 1, 1]}
        intensity={50}
        angle={(Math.PI / 2) * 0.2}
        penumbra={0.5}
        position={[-0.8, 0.8, 2.3]}
        castShadow
        ref={light1}
      />

      <spotLight
        color={[1, 1, 1]}
        intensity={50}
        angle={(Math.PI / 2) * 0.2}
        penumbra={0.5}
        position={[0.8, 0.8, 2.3]}
        castShadow
        ref={light2}
      />
    </Fragment>
  );
};

export default HeadLight;
