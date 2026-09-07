import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FacetId } from '../../types/protocol';
export { LivingQuantumCanvas } from './LivingQuantumCanvas';


interface ChronoPrismCanvasProps {
  activeFacet: FacetId;
  onFacetChange: (facet: FacetId) => void;
}

export const ChronoPrismCanvas: React.FC<ChronoPrismCanvasProps> = ({ activeFacet }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRotationYRef = useRef<number>(0);
  const targetColorRef = useRef<THREE.Color>(new THREE.Color('#00F0FF'));

  useEffect(() => {
    const config: Record<FacetId, { rot: number; col: string }> = {
      'officer': { rot: 0, col: '#00F0FF' },
      'economist': { rot: Math.PI * 0.5, col: '#00FFA3' },
      'ai-governor': { rot: Math.PI, col: '#8B5CF6' },
      'founder': { rot: Math.PI * 1.5, col: '#F43F5E' },
      'convergence': { rot: Math.PI * 2, col: '#00F0FF' }
    };
    const c = config[activeFacet] || config.convergence;
    targetRotationYRef.current = c.rot;
    targetColorRef.current.set(c.col);
  }, [activeFacet]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let w = container.clientWidth;
    let h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.set(0, 0.2, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x0a1020, 1.5));
    const dir1 = new THREE.DirectionalLight(0x00F0FF, 3.0);
    dir1.position.set(3, 4, 3);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0x8B5CF6, 2.5);
    dir2.position.set(-3, -2, -2);
    scene.add(dir2);

    const spot = new THREE.SpotLight(0x00F0FF, 6, 12, Math.PI / 4, 0.3);
    spot.position.set(0, 3, 2.5);
    scene.add(spot);

    const group = new THREE.Group();
    scene.add(group);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.95,
      roughness: 0.02,
      ior: 2.4,
      thickness: 1.8,
      transparent: true,
      specularColor: new THREE.Color(0x00F0FF),
      attenuationColor: new THREE.Color(0x8B5CF6),
      attenuationDistance: 1.2
    });

    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 1.1, 1.6, 6), glassMat);
    upper.position.y = 0.8;
    group.add(upper);

    const lower = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.001, 1.4, 6), glassMat);
    lower.position.y = -0.7;
    group.add(lower);

    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00F0FF,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x00F0FF,
      emissiveIntensity: 0.4
    });
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.4), coreMat);
    group.add(core);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x8B5CF6, wireframe: true, transparent: true, opacity: 0.45 });
    const wireCage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 1), wireMat);
    group.add(wireCage);

    const ringMat = new THREE.MeshStandardMaterial({ color: 0x00F0FF, metalness: 0.8, roughness: 0.2, wireframe: true });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.008, 16, 64), ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.65, 0.006, 16, 64), wireMat);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);


    // Quantum Photonic Particles Cloud
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 1.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00F0FF,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Mobile Gyroscope and Pointer Drag Handling
    let tiltX = 0, tiltY = 0, isDrag = false, lastX = 0;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        tiltX = (e.gamma / 45) * 0.25;
        tiltY = ((e.beta - 45) / 45) * 0.25;
      }
    };
    if (window.DeviceOrientationEvent) window.addEventListener('deviceorientation', onOrient);

    const onDown = (e: PointerEvent) => { isDrag = true; lastX = e.clientX; };
    const onMove = (e: PointerEvent) => {
      if (!isDrag) return;
      group.rotation.y += (e.clientX - lastX) * 0.008;
      lastX = e.clientX;
    };
    const onUp = () => { isDrag = false; };

    renderer.domElement.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    const onResize = () => {
      if (!containerRef.current) return;
      w = containerRef.current.clientWidth;
      h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let id: number;
    const clock = new THREE.Clock();
    const animate = () => {
      id = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.position.y = Math.sin(t * 1.5) * 0.08;

      if (!isDrag) {
        if (activeFacet === 'convergence') {
          group.rotation.y += 0.008;
        } else {
          group.rotation.y += (targetRotationYRef.current - group.rotation.y) * 0.05;
        }
      }
      group.rotation.x = tiltY + Math.sin(t * 0.8) * 0.03;
      group.rotation.z = -tiltX;

      core.rotation.y += 0.02;
      wireCage.rotation.x -= 0.015;
      ring1.rotation.z += 0.01;
      ring2.rotation.x += 0.008;
      particles.rotation.y += 0.003;

      spot.color.lerp(targetColorRef.current, 0.05);
      coreMat.color.lerp(targetColorRef.current, 0.05);
      coreMat.emissive.lerp(targetColorRef.current, 0.05);
      particleMat.color.lerp(targetColorRef.current, 0.05);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('deviceorientation', onOrient);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, [activeFacet]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-quantum text-[11px] font-mono tracking-wider text-cyan-400 border border-cyan-500/30 pointer-events-none flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
        <span>QUANTUM HYPER-PRISM • 3D REFRACTIVE ENGINE</span>
      </div>
    </div>
  );
};

