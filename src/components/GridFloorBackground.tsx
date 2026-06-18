import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GridFloorBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Cyber grid extending to infinity
    const gridSize = 60;
    const gridDivisions = 60;
    const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00d4ff, 0x1a0030);
    gridHelper.position.y = -5;
    gridHelper.material.opacity = 0.4;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Secondary grid (closer, different angle)
    const gridHelper2 = new THREE.GridHelper(80, 80, 0xff0055, 0x0a0015);
    gridHelper2.position.y = -6;
    gridHelper2.material.opacity = 0.2;
    gridHelper2.material.transparent = true;
    gridHelper2.rotation.x = 0.1;
    scene.add(gridHelper2);

    // Digital data stream lines
    const streamCount = 40;
    const streams: THREE.Line[] = [];

    for (let i = 0; i < streamCount; i++) {
      const points = [];
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 30;

      for (let j = 0; j < 10; j++) {
        points.push(new THREE.Vector3(
          x + (Math.random() - 0.5) * 0.5,
          -5 + Math.random() * 15,
          z + j * 2
        ));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const color = Math.random() > 0.5 ? 0x00d4ff : 0xff0055;
      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: Math.random() * 0.3 + 0.1,
      });

      const line = new THREE.Line(geometry, material);
      line.userData.speed = Math.random() * 0.02 + 0.01;
      streams.push(line);
      scene.add(line);
    }

    // Floating data nodes
    const nodeCount = 50;
    const nodeGeometry = new THREE.OctahedronGeometry(0.15, 0);
    const nodes: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const color = Math.random() > 0.5 ? 0x00d4ff : 0xff0055;
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });
      const node = new THREE.Mesh(nodeGeometry, material);
      node.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 10 - 3,
        (Math.random() - 0.5) * 30
      );
      node.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.05,
        floatSpeed: Math.random() * 0.01 + 0.005,
        floatOffset: Math.random() * Math.PI * 2,
      };
      nodes.push(node);
      scene.add(node);
    }

    // Connection lines between nodes
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < 30; i++) {
      const nodeA = nodes[Math.floor(Math.random() * nodes.length)];
      const nodeB = nodes[Math.floor(Math.random() * nodes.length)];
      const points = [nodeA.position.clone(), nodeB.position.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, connectionMaterial);
      scene.add(line);
    }

    camera.position.set(0, 3, 15);
    camera.lookAt(0, -2, -10);

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

      // Move grid
      gridHelper.position.z = (time * 2) % 2;

      // Animate streams
      streams.forEach((stream) => {
        const positions = stream.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += stream.userData.speed;
          if (positions[i + 2] > 20) {
            positions[i + 2] = -20;
          }
        }
        stream.geometry.attributes.position.needsUpdate = true;
      });

      // Animate nodes
      nodes.forEach((node) => {
        node.rotation.x += node.userData.rotSpeed;
        node.rotation.y += node.userData.rotSpeed * 0.5;
        node.position.y += Math.sin(time + node.userData.floatOffset) * 0.002;
      });

      // Pulse effect on grid
      gridHelper.material.opacity = 0.3 + Math.sin(time) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      gridHelper.geometry.dispose();
      (gridHelper.material as THREE.Material).dispose();
      streams.forEach((stream) => {
        stream.geometry.dispose();
        (stream.material as THREE.Material).dispose();
      });
      nodes.forEach((node) => {
        node.geometry.dispose();
        (node.material as THREE.Material).dispose();
      });
      nodeGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'linear-gradient(180deg, #05000a 0%, #0a0015 40%, #000510 100%)' }}
    />
  );
};

export default GridFloorBackground;
