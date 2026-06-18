import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleSphereBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create wireframe sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(4, 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xdc143c,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireframeSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(wireframeSphere);

    // Inner glowing sphere
    const innerSphereGeometry = new THREE.IcosahedronGeometry(3.5, 1);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0050,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    scene.add(innerSphere);

    // Particle system - cyber grid particles
    const particleCount = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sphereRadius = 6;

    const cyberBlue = new THREE.Color(0x00d4ff);
    const cyberPink = new THREE.Color(0xff0055);
    const cyberPurple = new THREE.Color(0x8b00ff);

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      positions[i * 3] = sphereRadius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = sphereRadius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = sphereRadius * Math.cos(phi);

      // Random cyber colors
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.4) color = cyberBlue;
      else if (colorChoice < 0.7) color = cyberPink;
      else color = cyberPurple;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Orbiting rings
    const ringCount = 3;
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < ringCount; i++) {
      const ringGeometry = new THREE.TorusGeometry(5 + i * 0.8, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x00d4ff : 0xdc143c,
        transparent: true,
        opacity: 0.3 - i * 0.08,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + i * 0.3;
      ring.rotation.y = i * 0.5;
      rings.push(ring);
      scene.add(ring);
    }

    camera.position.z = 12;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      particles.rotation.x += 0.001;
      particles.rotation.y += 0.002;

      wireframeSphere.rotation.x += 0.002;
      wireframeSphere.rotation.y += 0.003;

      innerSphere.rotation.x -= 0.003;
      innerSphere.rotation.y -= 0.002;

      rings.forEach((ring, i) => {
        ring.rotation.z += 0.005 * (i + 1) * (i % 2 === 0 ? 1 : -1);
      });

      // Mouse interaction
      const positions = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const distance = Math.sqrt(
          Math.pow(x - mouseRef.current.x * 4, 2) +
          Math.pow(y - mouseRef.current.y * 4, 2)
        );

        if (distance < 2) {
          const repulsion = (2 - distance) * 0.015;
          const angle = Math.atan2(y - mouseRef.current.y * 4, x - mouseRef.current.x * 4);
          positions[i3 + 1] += Math.sin(angle) * repulsion;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0015 0%, #000000 50%, #000510 100%)' }}
    />
  );
};

export default ParticleSphereBackground;
