import React, { useLayoutEffect } from "react";
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RepeatWrapping } from "three";

const Ground: React.FC = () => {
  const [normal, rough] = useTexture([
    "/texture/car/aerial_asphalt_01_rough_2k.jpg",
    "/texture/car/rough_plasterbrick_05_rough_2k.jpg",
  ]);

  useLayoutEffect(() => {
    [normal, rough].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(10, 10);
    });
  }, [normal, rough]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const t = elapsed * -0.2;

    if (normal && rough) {
      normal.offset.set(0, t % 1);
      rough.offset.set(0, t % 1);
    }
  });

  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <MeshReflectorMaterial
        normalMap={normal}
        roughnessMap={rough}
        dithering={true}
        color={[0, 0, 0]}
        roughness={1}
        blur={[99, 99]}
        mixBlur={99} // 模糊強度
        mixStrength={99} // 反射強度
        mixContrast={1} // 反射對比度
        resolution={1024} // 分辨率
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        reflectorOffset={0.2}
      />
    </mesh>
  );
};
export default Ground;
