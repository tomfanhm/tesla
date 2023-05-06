import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import CameraAndControls from "./components/CameraAndControls";
import Car from "./components/Car";
import Ground from "./components/Ground";
import HeadLight from "./components/HeadLight";
import Lighting from "./components/Lighting";
import PostProgress from "./components/PostProgress";

function App() {
  return (
    <div className="container">
      <Canvas
        shadows
        gl={{
          alpha: true,
          antialias: true,
        }}
      >
        <CameraAndControls />
        <Lighting />
        <Suspense
          fallback={
            <Html center>
              <div className="spinner"></div>
            </Html>
          }
        >
          <Ground />
          <Car />
          <HeadLight />
        </Suspense>
        <PostProgress />
        <color args={[0, 0, 0]} attach="background" />
      </Canvas>
    </div>
  );
}

export default App;
