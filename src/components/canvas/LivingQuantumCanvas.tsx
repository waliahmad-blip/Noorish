import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FacetId } from '../../types/protocol';

interface LivingQuantumCanvasProps {
  activeFacet: FacetId;
  onFacetChange: (facet: FacetId) => void;
}

const PARTICLE_COUNT = 7500;

function createGlowTexture(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.25, 'rgba(220, 245, 255, 0.9)');
  grad.addColorStop(0.55, 'rgba(0, 240, 255, 0.4)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Generate the 4 specialized morph geometries
function generateMorphTargets(): Record<FacetId, Float32Array> {
  const targets: Record<FacetId, Float32Array> = {
    officer: new Float32Array(PARTICLE_COUNT * 3),
    economist: new Float32Array(PARTICLE_COUNT * 3),
    'ai-governor': new Float32Array(PARTICLE_COUNT * 3),
    founder: new Float32Array(PARTICLE_COUNT * 3),
    convergence: new Float32Array(PARTICLE_COUNT * 3)
  };

  // 1. Officer: Sovereign Spinal Column of Statecraft + Superluminal Equatorial Torus
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    if (i < 2500) {
      const progress = (i / 2500) * 2 - 1;
      const y = progress * 1.5;
      const radius = 0.12 * (1 + 0.4 * Math.sin(y * 8)) + Math.random() * 0.08;
      const angle = (i % 360) * (Math.PI / 18);
      targets.officer[idx] = Math.cos(angle) * radius;
      targets.officer[idx + 1] = y;
      targets.officer[idx + 2] = Math.sin(angle) * radius;
    } else {
      const u = ((i - 2500) / 5000) * Math.PI * 2 * 12;
      const v = ((i - 2500) / 5000) * Math.PI * 2;
      const R = 1.35 + (Math.random() - 0.5) * 0.1;
      const r = 0.42 + (Math.random() - 0.5) * 0.08;
      targets.officer[idx] = (R + r * Math.cos(v)) * Math.cos(u);
      targets.officer[idx + 1] = r * Math.sin(v) * 0.65;
      targets.officer[idx + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    }
  }

  // 2. Economist: Multilateral Intersecting Orthogonal Rings & Fibonacci Spiral
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    if (i < 3000) {
      const theta = (i / 3000) * Math.PI * 2;
      const r = 1.4 + (Math.random() - 0.5) * 0.12;
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      targets.economist[idx] = x * Math.cos(0.6) - y * Math.sin(0.6);
      targets.economist[idx + 1] = (x * Math.sin(0.6) + y * Math.cos(0.6)) * 0.9;
      targets.economist[idx + 2] = (Math.random() - 0.5) * 0.15;
    } else if (i < 6000) {
      const theta = ((i - 3000) / 3000) * Math.PI * 2;
      const r = 1.4 + (Math.random() - 0.5) * 0.12;
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      targets.economist[idx] = x * Math.cos(-0.6) - z * Math.sin(-0.6);
      targets.economist[idx + 1] = (Math.random() - 0.5) * 0.15;
      targets.economist[idx + 2] = x * Math.sin(-0.6) + z * Math.cos(-0.6);
    } else {
      const t = (i - 6000) / 1500;
      const r = Math.sqrt(t) * 1.1;
      const theta = t * Math.PI * 18;
      targets.economist[idx] = r * Math.cos(theta);
      targets.economist[idx + 1] = (Math.random() - 0.5) * 0.18;
      targets.economist[idx + 2] = r * Math.sin(theta);
    }
  }

  // 3. AI Governor: Cerebral Synaptic Neural Cortex (Left & Right Hemispheres)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    const isRight = i % 2 === 0;
    const sign = isRight ? 1 : -1;
    const u = (i / PARTICLE_COUNT) * Math.PI * 2;
    const v = (Math.random() - 0.5) * Math.PI;

    const cortexRipple = 0.08 * Math.sin(u * 12) * Math.cos(v * 10);
    const radiusX = 0.55 + cortexRipple;
    const radiusY = 0.75 + cortexRipple;
    const radiusZ = 0.95 + cortexRipple;

    const x = sign * (0.35 + Math.abs(Math.cos(v) * Math.sin(u)) * radiusX);
    const y = Math.sin(v) * radiusY + 0.15;
    const z = Math.cos(v) * Math.cos(u) * radiusZ;

    targets['ai-governor'][idx] = x + (Math.random() - 0.5) * 0.06;
    targets['ai-governor'][idx + 1] = y + (Math.random() - 0.5) * 0.06;
    targets['ai-governor'][idx + 2] = z + (Math.random() - 0.5) * 0.06;
  }

  // 4. Founder: Double Helix Bio-Molecular Spiral & Radiant Starburst Shell
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    if (i < 4200) {
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const progress = (i / 4200) * 2 - 1;
      const y = progress * 1.5;
      const angle = y * 5.5 + strand;
      const r = 0.65 + (Math.random() - 0.5) * 0.08;
      targets.founder[idx] = r * Math.cos(angle);
      targets.founder[idx + 1] = y;
      targets.founder[idx + 2] = r * Math.sin(angle);
    } else {
      const phi = Math.acos(-1 + (2 * (i - 4200)) / 3300);
      const theta = Math.sqrt(3300 * Math.PI) * phi;
      const r = 1.35 + (Math.random() - 0.5) * 0.25;
      targets.founder[idx] = r * Math.cos(theta) * Math.sin(phi);
      targets.founder[idx + 1] = r * Math.sin(theta) * Math.sin(phi);
      targets.founder[idx + 2] = r * Math.cos(phi);
    }
  }

  // 5. Convergence: Harmonized Quantum Singularity Core
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = i * 3;
    const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
    const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
    const r = (i < 2000 ? 0.55 : 1.3) + (Math.random() - 0.5) * 0.18;
    targets.convergence[idx] = r * Math.cos(theta) * Math.sin(phi);
    targets.convergence[idx + 1] = r * Math.sin(theta) * Math.sin(phi);
    targets.convergence[idx + 2] = r * Math.cos(phi);
  }

  return targets;
}


export const LivingQuantumCanvas: React.FC<LivingQuantumCanvasProps> = ({ activeFacet }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetColorRef = useRef<THREE.Color>(new THREE.Color('#00F0FF'));
  const currentFacetRef = useRef<FacetId>(activeFacet);

  const facetTelemetry: Record<FacetId, { label: string; hz: number; col: string }> = {
    officer: { label: 'SOVEREIGN STATE STRATEGIST • TORUS & CROWN', hz: 528, col: '#00F0FF' },
    economist: { label: 'MULTILATERAL HARMONIC RINGS • FIBONACCI DISK', hz: 639, col: '#00FFA3' },
    'ai-governor': { label: 'SYNAPTIC NEURAL CORTEX • DUAL HEMISPHERES', hz: 741, col: '#8B5CF6' },
    founder: { label: 'CELLULAR DOUBLE-HELIX & CELESTIAL HALO', hz: 852, col: '#F43F5E' },
    convergence: { label: 'HARMONIZED SOVEREIGN SINGULARITY', hz: 963, col: '#00F0FF' }
  };

  useEffect(() => {
    currentFacetRef.current = activeFacet;
    const config = facetTelemetry[activeFacet] || facetTelemetry.convergence;
    targetColorRef.current.set(config.col);
  }, [activeFacet]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let w = container.clientWidth;
    let h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 50);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const morphTargets = generateMorphTargets();
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const initialTarget = morphTargets[activeFacet] || morphTargets.convergence;
    for (let i = 0; i < currentPositions.length; i++) {
      currentPositions[i] = initialTarget[i];
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

    const glowTexture = createGlowTexture();
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(facetTelemetry[activeFacet]?.col || '#00F0FF'),
      size: 0.048,
      map: glowTexture,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    const coreGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(facetTelemetry[activeFacet]?.col || '#00F0FF'),
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Raycasting & Pointer Repulsion
    const pointer = new THREE.Vector2(-999, -999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectionPoint = new THREE.Vector3();

    let isDrag = false;
    let lastX = 0;
    let rotVelY = 0.003;
    let tiltX = 0;
    let tiltY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (isDrag) {
        const delta = e.clientX - lastX;
        particleSystem.rotation.y += delta * 0.006;
        rotVelY = delta * 0.003;
        lastX = e.clientX;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      isDrag = true;
      lastX = e.clientX;
    };

    const onPointerUp = () => {
      isDrag = false;
    };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        tiltX = (e.gamma / 45) * 0.2;
        tiltY = ((e.beta - 45) / 45) * 0.2;
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', onOrient);
    }

    const onResize = () => {
      if (!containerRef.current) return;
      w = containerRef.current.clientWidth;
      h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // 4-Second Biological Respiration Wave
      const breath = 1.0 + 0.05 * Math.sin(t * 1.57);

      // Smooth color morphing
      material.color.lerp(targetColorRef.current, 0.06);
      coreMat.color.lerp(targetColorRef.current, 0.06);

      // Active target positions
      const targetPos = morphTargets[currentFacetRef.current] || morphTargets.convergence;
      const positions = geometry.attributes.position.array as Float32Array;

      // Pointer Raycast
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        const tx = targetPos[idx] * breath;
        const ty = targetPos[idx + 1] * breath;
        const tz = targetPos[idx + 2] * breath;

        // Base Lerp toward morph target
        positions[idx] += (tx - positions[idx]) * 0.05;
        positions[idx + 1] += (ty - positions[idx + 1]) * 0.05;
        positions[idx + 2] += (tz - positions[idx + 2]) * 0.05;

        // Pointer electromagnetic fluid repulsion
        const dx = positions[idx] - intersectionPoint.x;
        const dy = positions[idx + 1] - intersectionPoint.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 0.75 && dist > 0.001) {
          const force = (0.75 - dist) * 0.09;
          positions[idx] += (dx / dist) * force;
          positions[idx + 1] += (dy / dist) * force;
          positions[idx + 2] += (Math.random() - 0.5) * force * 0.5;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Inertial and ambient rotation
      if (!isDrag) {
        rotVelY *= 0.95;
        particleSystem.rotation.y += 0.003 + rotVelY;
      }
      particleSystem.rotation.x = tiltY + Math.sin(t * 0.8) * 0.03;
      particleSystem.rotation.z = -tiltX;

      // Pulsate core mesh
      const coreScale = 1.0 + 0.15 * Math.sin(t * 3.14);
      coreMesh.scale.set(coreScale, coreScale, coreScale);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('deviceorientation', onOrient);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
      glowTexture.dispose();
      geometry.dispose();
      material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  const activeInfo = facetTelemetry[activeFacet] || facetTelemetry.convergence;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Dynamic Telemetry HUD */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl glass-quantum text-[11px] font-mono tracking-wider text-slate-200 border border-cyan-500/30 pointer-events-none flex flex-wrap items-center justify-center gap-3 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: activeInfo.col }} />
          <span className="text-white font-bold">{activeInfo.label}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-cyan-400">
          <span>•</span>
          <span>7,500 PARTICLES</span>
          <span>•</span>
          <span>4.0s BIOLOGICAL PULSE</span>
        </div>
      </div>
    </div>
  );
};

