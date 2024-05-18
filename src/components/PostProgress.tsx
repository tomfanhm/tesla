import { Effects } from "@react-three/drei";
import { extend, Object3DNode } from "@react-three/fiber";
import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
    }
  }
}

const PostProgress: React.FC = () => {
  return (
    <Effects disableGamma>
      {/* threshhold = 1, nothing bloom, default */}
      <unrealBloomPass threshold={1} strength={1} radius={0.5} />
    </Effects>
  );
};
export default PostProgress;
