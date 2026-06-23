import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Center, Bounds } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import * as THREE from 'three';

const GLB_URL = '/qqlogo.glb';
const MIN_DISPLAY_MS = 2000;

useGLTF.preload(GLB_URL);

/** Static GLB logo — no spin, no animation. */
function LogoModel({ onReady }: { onReady: () => void }) {
  const { scene } = useGLTF(GLB_URL);

  // Clone so repeated mounts don't share a mutated graph.
  const model = useMemo(() => {
    const s = scene.clone(true);
    s.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && 'emissive' in mat) {
          mat.emissive = new THREE.Color('#0a3a44');
          mat.emissiveIntensity = 0.35;
        }
      }
    });
    return s;
  }, [scene]);

  useEffect(() => { onReady(); }, [onReady]);

  return (
    <Bounds fit margin={1.2}>
      <Center>
        <primitive object={model} />
      </Center>
    </Bounds>
  );
}

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const ready = useRef(false);
  const mounted = useRef(Date.now());

  // Dismiss once the model is ready AND the minimum display time elapsed.
  // A hard cap guarantees we never trap the user if the GLB stalls.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - mounted.current;
      if ((ready.current && elapsed >= MIN_DISPLAY_MS) || elapsed >= 8000) {
        setVisible(false);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          <div className="w-[min(92vw,560px)] h-[min(92vw,560px)] max-h-[62vh]">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 3.6], fov: 45 }}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
              <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#5eeaff" />
              <Suspense fallback={null}>
                <LogoModel onReady={() => { ready.current = true; }} />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="qq-display text-white text-xl md:text-2xl mt-2"
          >
            Quantum<span className="text-[color:var(--color-cyan)]"> Qubit</span>
          </motion.div>
          <div className="qq-label text-white/40 mt-3">Chapter 02 · Loading</div>

          {/* indeterminate progress sweep */}
          <div className="mt-6 w-[min(60vw,220px)] h-px bg-white/10 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 w-1/3 bg-[color:var(--color-cyan)]"
              animate={{ x: ['-100%', '320%'] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
