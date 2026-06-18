import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StreakLinesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Cyber grid lines
    const gridHelper = new THREE.GridHelper(40, 40, 0xdc143c, 0x1a0030);
    gridHelper.position.y = -8;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Vertical cyber lines
    const lineCount = 60;
    const lines: THREE.Line[] = [];

    for (let i = 0; i < lineCount; i++) {
      const points = [];
      const isVertical = Math.random() > 0.5;
      const startX = (Math.random() - 0.5) * 30;
      const startY = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15 - 5;

      if (isVertical) {
        points.push(new THREE.Vector3(startX, -10, z));
        points.push(new THREE.Vector3(startX, 10, z));
      } else {
        points.push(new THREE.Vector3(-20, startY, z));
        points.push(new THREE.Vector3(20, startY, z));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const colorChoice = Math.random();
      const color = colorChoice < 0.5 ? 0x00d4ff : (colorChoice < 0.8 ? 0xff0055 : 0x8b00ff);
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: Math.random() * 0.25 + 0.05,
      });

      const line = new THREE.Line(geometry, material);
      line.userData.speed = (Math.random() - 0.5) * 0.02;
      line.userData.originalX = startX;
      lines.push(line);
      scene.add(line);
    }

    // Floating data particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = Math.random() > 0.5 ? new THREE.Color(0x00d4ff) : new THREE.Color(0xff0055);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.set(0, 2, 15);
    camera.lookAt(0, 0, 0);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      lines.forEach((line) => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        if (line.userData.speed !== 0) {
          positions[0] += line.userData.speed;
          positions[3] += line.userData.speed;
          if (Math.abs(positions[0]) > 20) {
            line.userData.speed = -line.userData.speed;
          }
        }
        line.geometry.attributes.position.needsUpdate = true;
      });

      particles.rotation.y += 0.0005;

      // Pulsing effect
      lines.forEach((line, i) => {
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = 0.1 + Math.sin(time * 2 + i) * 0.05;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      lines.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(180deg, #050008 0%, #0a0015 50%, #000510 100%)' }}
    />
  );
};

export default StreakLinesBackground;
