import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ConfettiBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Floating hexagonal shapes (cyber)
    const hexCount = 30;
    const hexagons: THREE.Mesh[] = [];

    for (let i = 0; i < hexCount; i++) {
      const geometry = new THREE.RingGeometry(0.3, 0.4, 6);
      const colorChoice = Math.random();
      const color = colorChoice < 0.4 ? 0xffd700 : (colorChoice < 0.7 ? 0xff0055 : 0x00d4ff);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.3,
        side: THREE.DoubleSide,
      });
      const hex = new THREE.Mesh(geometry, material);
      hex.position.set(
        (Math.random() - 0.5) * 25,
        Math.random() * 20 - 5,
        (Math.random() - 0.5) * 10 - 5
      );
      hex.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      hex.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: Math.random() * 0.005 + 0.002,
        floatOffset: Math.random() * Math.PI * 2,
      };
      hexagons.push(hex);
      scene.add(hex);
    }

    // Digital rain particles
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    const gold = new THREE.Color(0xffd700);
    const cyan = new THREE.Color(0x00d4ff);
    const pink = new THREE.Color(0xff0055);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? gold : (colorChoice < 0.75 ? cyan : pink);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities.push(-Math.random() * 0.03 - 0.01);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Trophy wireframe rotating
    const trophyGroup = new THREE.Group();

    // Base
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.6, 0.3, 8);
    const baseMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -1;
    trophyGroup.add(base);

    // Cup body
    const cupGeometry = new THREE.CylinderGeometry(0.3, 0.5, 1.5, 8, 1, true);
    const cupMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.position.y = 0.2;
    trophyGroup.add(cup);

    // Handles
    const handleGeometry = new THREE.TorusGeometry(0.25, 0.05, 8, 16, Math.PI);
    const handleMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const leftHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    leftHandle.position.set(-0.5, 0.3, 0);
    leftHandle.rotation.z = Math.PI / 2;
    trophyGroup.add(leftHandle);

    const rightHandle = new THREE.Mesh(handleGeometry, handleMaterial);
    rightHandle.position.set(0.5, 0.3, 0);
    rightHandle.rotation.z = -Math.PI / 2;
    trophyGroup.add(rightHandle);

    trophyGroup.position.z = -3;
    scene.add(trophyGroup);

    camera.position.z = 10;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate hexagons
      hexagons.forEach((hex) => {
        hex.rotation.z += hex.userData.rotSpeed;
        hex.position.y += Math.sin(time + hex.userData.floatOffset) * 0.003;
      });

      // Animate particles (digital rain)
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += velocities[i];

        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 20;
          positions[i * 3] = (Math.random() - 0.5) * 30;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate trophy
      trophyGroup.rotation.y += 0.008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      hexagons.forEach((hex) => {
        hex.geometry.dispose();
        (hex.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0020 0%, #05000a 50%, #000005 100%)' }}
    />
  );
};

export default ConfettiBackground;
