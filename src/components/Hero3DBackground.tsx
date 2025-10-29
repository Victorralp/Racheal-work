import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, OrbitControls, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Floating sphere component
const FloatingSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      // GSAP animation for floating movement
      gsap.to(meshRef.current.position, {
        y: meshRef.current.position.y + 0.5,
        duration: 2 + Math.random() * 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </Sphere>
  );
};

// Floating box component
const FloatingBox = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        x: meshRef.current.position.x + 0.3,
        duration: 3 + Math.random() * 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
      <meshStandardMaterial color={color} transparent opacity={0.5} />
    </Box>
  );
};

// Floating torus component
const FloatingTorus = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.position, {
        z: meshRef.current.position.z + 0.4,
        duration: 2.5 + Math.random() * 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <Torus ref={meshRef} position={position} args={[0.2, 0.1, 16, 32]}>
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </Torus>
  );
};

// Main 3D scene component
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {/* Floating geometric shapes */}
      <FloatingSphere position={[-2, 1, -1]} color="#3b82f6" />
      <FloatingSphere position={[2, -1, -2]} color="#8b5cf6" />
      <FloatingSphere position={[0, 2, -3]} color="#06b6d4" />
      
      <FloatingBox position={[-1, -1, -1]} color="#f59e0b" />
      <FloatingBox position={[1.5, 0.5, -2]} color="#ef4444" />
      
      <FloatingTorus position={[0, -1.5, -1]} color="#10b981" />
      <FloatingTorus position={[-1.5, 1, -2]} color="#f97316" />
    </group>
  );
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Main Hero3DBackground component
export const Hero3DBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]} // Limit pixel ratio for performance
      >
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="city" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/40" />
    </div>
  );
};