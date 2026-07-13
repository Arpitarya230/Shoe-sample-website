import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, HelpCircle, Sparkles, Check, RefreshCw } from "lucide-react";

// Presets definitions
interface ColorPreset {
  name: string;
  upper: string;
  midsole: string;
  sole: string;
  accent: string;
  laces: string;
  bgGradient: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: "AERO Fire (Signature)",
    upper: "#FF6B00",
    midsole: "#111111",
    sole: "#222222",
    accent: "#FFFFFF",
    laces: "#FFFFFF",
    bgGradient: "from-orange-950/20 to-zinc-950",
  },
  {
    name: "Midnight Stealth",
    upper: "#1C1C1C",
    midsole: "#111111",
    sole: "#1E1E1E",
    accent: "#FF6B00",
    laces: "#111111",
    bgGradient: "from-zinc-900 to-black",
  },
  {
    name: "Alabaster Luxe",
    upper: "#F5F5F7",
    midsole: "#EAEAEA",
    sole: "#D4D4D4",
    accent: "#FF6B00",
    laces: "#FF6B00",
    bgGradient: "from-neutral-900/30 to-zinc-950",
  },
  {
    name: "Cyber Neon",
    upper: "#06B6D4",
    midsole: "#D946EF",
    sole: "#111111",
    accent: "#FFFFFF",
    laces: "#000000",
    bgGradient: "from-purple-950/20 to-zinc-950",
  },
  {
    name: "Forest Wilderness",
    upper: "#3F4C38",
    midsole: "#B27C3F",
    sole: "#111111",
    accent: "#FF6B00",
    laces: "#FFFFFF",
    bgGradient: "from-emerald-950/20 to-zinc-950",
  },
];

export default function ThreeDShowcase() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Customization states
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>(COLOR_PRESETS[0]);
  const [upperColor, setUpperColor] = useState(COLOR_PRESETS[0].upper);
  const [midsoleColor, setMidsoleColor] = useState(COLOR_PRESETS[0].midsole);
  const [soleColor, setSoleColor] = useState(COLOR_PRESETS[0].sole);
  const [accentColor, setAccentColor] = useState(COLOR_PRESETS[0].accent);
  const [lacesColor, setLacesColor] = useState(COLOR_PRESETS[0].laces);
  
  const [activePart, setActivePart] = useState<"upper" | "midsole" | "sole" | "accent" | "laces">("upper");
  const [autoRotate, setAutoRotate] = useState(true);
  const [isOrdered, setIsOrdered] = useState(false);

  // References to THREE objects to update materials dynamically
  const materialsRef = useRef<{
    upper?: THREE.MeshStandardMaterial;
    midsole?: THREE.MeshStandardMaterial;
    sole?: THREE.MeshStandardMaterial;
    accent?: THREE.MeshStandardMaterial;
    laces?: THREE.MeshStandardMaterial;
  }>({});

  const shoeGroupRef = useRef<THREE.Group | null>(null);

  // Apply preset helper
  const applyPreset = (preset: ColorPreset) => {
    setSelectedPreset(preset);
    setUpperColor(preset.upper);
    setMidsoleColor(preset.midsole);
    setSoleColor(preset.sole);
    setAccentColor(preset.accent);
    setLacesColor(preset.laces);
  };

  // Update Three.js materials when state changes
  useEffect(() => {
    const mats = materialsRef.current;
    if (mats.upper) mats.upper.color.set(upperColor);
    if (mats.midsole) mats.midsole.color.set(midsoleColor);
    if (mats.sole) mats.sole.color.set(soleColor);
    if (mats.accent) mats.accent.color.set(accentColor);
    if (mats.laces) mats.laces.color.set(lacesColor);
  }, [upperColor, midsoleColor, soleColor, accentColor, lacesColor]);

  // Set up Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Create Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 6.5);

    // 2. Create Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // 3. Create Shoe Model Group
    const shoeGroup = new THREE.Group();
    shoeGroupRef.current = shoeGroup;
    scene.add(shoeGroup);

    // Create custom modular materials
    const upperMat = new THREE.MeshStandardMaterial({
      color: upperColor,
      roughness: 0.5,
      metalness: 0.1,
      bumpScale: 0.05,
    });
    const midsoleMat = new THREE.MeshStandardMaterial({
      color: midsoleColor,
      roughness: 0.4,
      metalness: 0.2,
    });
    const soleMat = new THREE.MeshStandardMaterial({
      color: soleColor,
      roughness: 0.8,
      metalness: 0.1,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.2,
      metalness: 0.8, // Shiny metallic accent
    });
    const lacesMat = new THREE.MeshStandardMaterial({
      color: lacesColor,
      roughness: 0.7,
      metalness: 0.0,
    });

    materialsRef.current = {
      upper: upperMat,
      midsole: midsoleMat,
      sole: soleMat,
      accent: accentMat,
      laces: lacesMat,
    };

    // ---- Programmatic Shoe Modeling ----

    // 1. Outer Outsole (Base)
    const outsoleGeom = new THREE.BoxGeometry(3.6, 0.15, 1.4, 4, 1, 2);
    // Deform geometry slightly for organic curved rocker
    const pos = outsoleGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Lift front and back up for high-end rocker curve
      if (x > 1) {
        pos.setY(i, pos.getY(i) + 0.15 * Math.pow(x - 1, 2));
      } else if (x < -1) {
        pos.setY(i, pos.getY(i) + 0.08 * Math.pow(Math.abs(x) - 1, 2));
      }
    }
    outsoleGeom.computeVertexNormals();
    const outsoleMesh = new THREE.Mesh(outsoleGeom, soleMat);
    outsoleMesh.position.y = -0.4;
    outsoleMesh.castShadow = true;
    outsoleMesh.receiveShadow = true;
    shoeGroup.add(outsoleMesh);

    // 2. Midsole (Cushioning Frame)
    const midsoleGeom = new THREE.BoxGeometry(3.55, 0.45, 1.35, 4, 1, 2);
    const mPos = midsoleGeom.attributes.position;
    for (let i = 0; i < mPos.count; i++) {
      const x = mPos.getX(i);
      if (x > 0.8) {
        mPos.setY(i, mPos.getY(i) + 0.15 * Math.pow(x - 0.8, 2));
      } else if (x < -0.8) {
        mPos.setY(i, mPos.getY(i) + 0.1 * Math.pow(Math.abs(x) - 0.8, 2));
      }
    }
    midsoleGeom.computeVertexNormals();
    const midsoleMesh = new THREE.Mesh(midsoleGeom, midsoleMat);
    midsoleMesh.position.y = -0.12;
    midsoleMesh.castShadow = true;
    midsoleMesh.receiveShadow = true;
    shoeGroup.add(midsoleMesh);

    // 3. Air Cushion Pods (Embedded in Midsole)
    const podGroup = new THREE.Group();
    const podGeom = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 12);
    podGeom.rotateX(Math.PI / 2);
    const podMat = new THREE.MeshPhysicalMaterial({
      color: "#06B6D4",
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
    });
    
    // Add 3 air pods near heel of midsole
    for (let i = 0; i < 3; i++) {
      const pod = new THREE.Mesh(podGeom, podMat);
      pod.position.set(-0.6 - i * 0.4, -0.12, 0);
      pod.castShadow = true;
      podGroup.add(pod);
    }
    shoeGroup.add(podGroup);

    // 4. Main Upper Shell
    const upperGroup = new THREE.Group();

    // Heel Collar
    const heelGeom = new THREE.BoxGeometry(1.4, 1.4, 1.15, 2, 2, 2);
    const heelMesh = new THREE.Mesh(heelGeom, upperMat);
    heelMesh.position.set(-0.7, 0.45, 0);
    heelMesh.rotation.z = -Math.PI / 10;
    heelMesh.castShadow = true;
    upperGroup.add(heelMesh);

    // Toe Box (Sloped front)
    const toeGeom = new THREE.BoxGeometry(1.8, 0.9, 1.12, 2, 2, 2);
    // Slant toe box down at front
    const tPos = toeGeom.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const x = tPos.getX(i);
      if (x > 0) {
        tPos.setY(i, tPos.getY(i) - 0.3 * (x / 0.9));
      }
    }
    toeGeom.computeVertexNormals();
    const toeMesh = new THREE.Mesh(toeGeom, upperMat);
    toeMesh.position.set(0.7, 0.25, 0);
    toeMesh.castShadow = true;
    upperGroup.add(toeMesh);

    // Collar Collar ring (Opening)
    const collarGeom = new THREE.CylinderGeometry(0.42, 0.45, 0.4, 16);
    const collarMesh = new THREE.Mesh(collarGeom, lacesMat);
    collarMesh.position.set(-0.55, 1.1, 0);
    collarMesh.rotation.z = -Math.PI / 12;
    collarMesh.castShadow = true;
    upperGroup.add(collarMesh);

    shoeGroup.add(upperGroup);

    // 5. Stylized Side Logo Stripe (Metallic Accent)
    const stripeGeom = new THREE.TorusGeometry(0.7, 0.08, 8, 24, Math.PI / 1.3);
    const stripeMesh = new THREE.Mesh(stripeGeom, accentMat);
    stripeMesh.position.set(-0.1, 0.25, 0.58);
    stripeMesh.rotation.set(0.1, Math.PI / 2.3, -Math.PI / 5);
    stripeMesh.castShadow = true;
    shoeGroup.add(stripeMesh);

    // Symmetrical logo stripe on inner side
    const stripeMeshInner = stripeMesh.clone();
    stripeMeshInner.position.z = -0.58;
    stripeMeshInner.rotation.x = -0.1;
    shoeGroup.add(stripeMeshInner);

    // 6. Laces (Tied on top of foot)
    const lacesGroup = new THREE.Group();
    const laceGeom = new THREE.BoxGeometry(0.1, 0.05, 0.7);
    for (let i = 0; i < 4; i++) {
      const lace = new THREE.Mesh(laceGeom, lacesMat);
      lace.position.set(0.1 + i * 0.22, 0.72 - i * 0.05, 0);
      lace.rotation.y = (i % 2 === 0 ? 0.15 : -0.15);
      lace.rotation.z = -Math.PI / 11;
      lace.castShadow = true;
      lacesGroup.add(lace);
    }
    shoeGroup.add(lacesGroup);

    // Tilt shoe up slightly for dynamic presentation
    shoeGroup.rotation.set(0.1, -Math.PI / 4, 0.05);

    // ---- Ambient & Directional Lighting ----
    const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
    scene.add(ambientLight);

    // Studio Key Light (Orange toned top light)
    const keyLight = new THREE.DirectionalLight("#ffffff", 1.8);
    keyLight.position.set(5, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Soft Rim Light (From back to catch contours)
    const rimLight = new THREE.DirectionalLight("#FF6B00", 1.0);
    rimLight.position.set(-6, 2, -4);
    scene.add(rimLight);

    // Bottom Fill Light
    const fillLight = new THREE.DirectionalLight("#06B6D4", 0.3);
    fillLight.position.set(0, -5, 2);
    scene.add(fillLight);

    // ---- Mouse Drag Navigation / Interaction ----
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotationY = -Math.PI / 4;
    let targetRotationX = 0.1;
    let targetScale = 1.0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;

      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;
      
      // Limit X tilt
      targetRotationX = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, targetRotationX));

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Zoom on wheel
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScale += e.deltaY * -0.0006;
      targetScale = Math.max(0.7, Math.min(1.4, targetScale));
    };

    // Attach mouse listeners
    const canvas = renderer.domElement;
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    // Touch support for mobiles
    let isTouching = false;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isTouching = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevX;
      const deltaY = e.touches[0].clientY - prevY;
      targetRotationY += deltaX * 0.007;
      targetRotationX += deltaY * 0.007;
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };
    const handleTouchEnd = () => {
      isTouching = false;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    // ---- Render Animation Loop ----
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);

      // Auto rotation in idle mode
      if (autoRotate && !isDragging && !isTouching) {
        targetRotationY += 0.003;
      }

      // Smooth interpolation (damping)
      shoeGroup.rotation.y += (targetRotationY - shoeGroup.rotation.y) * 0.08;
      shoeGroup.rotation.x += (targetRotationX - shoeGroup.rotation.x) * 0.08;
      
      const currentScale = shoeGroup.scale.x;
      const lerpedScale = currentScale + (targetScale - currentScale) * 0.1;
      shoeGroup.scale.set(lerpedScale, lerpedScale, lerpedScale);

      // Gentle floating animation
      const elapsedTime = clock.getElapsedTime();
      shoeGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.1;

      // Pulse air pods glow
      const podColorVal = 0.5 + Math.sin(elapsedTime * 2) * 0.2;
      podMat.emissive.setRGB(0, podColorVal * 0.7, podColorVal * 0.9);

      renderer.render(scene, camera);
    };

    animate();

    // ---- Resize Handler ----
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ---- Cleanup ----
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose materials & geometries
      outsoleGeom.dispose();
      midsoleGeom.dispose();
      podGeom.dispose();
      heelGeom.dispose();
      toeGeom.dispose();
      collarGeom.dispose();
      stripeGeom.dispose();
      laceGeom.dispose();

      upperMat.dispose();
      midsoleMat.dispose();
      soleMat.dispose();
      accentMat.dispose();
      lacesMat.dispose();
      podMat.dispose();

      renderer.dispose();
    };
  }, [autoRotate]);

  return (
    <section id="customizer" className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Background radial lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Interactive 3D Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Perfect Fit</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base">
            Spin, zoom, and customize our flagship racing shoe in real-time. Choose from curated design presets or design yours from laces to outsole.
          </p>
        </div>

        {/* Customizer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 1. 3D Canvas Container */}
          <div className="lg:col-span-7 flex flex-col glass-panel rounded-3xl overflow-hidden relative min-h-[450px] lg:min-h-[550px] group border-zinc-800">
            {/* Top Toolbar */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20 pointer-events-none">
              <div className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white/80 text-xs font-mono backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <RotateCw className="w-3 h-3 animate-spin-slow text-brand-orange" />
                Drag to Rotate • Scroll to Zoom
              </div>
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 pointer-events-auto ${
                  autoRotate
                    ? "bg-brand-orange/20 border-brand-orange/40 text-brand-orange hover:bg-brand-orange/30"
                    : "bg-black/60 border-white/10 text-white/60 hover:text-white"
                }`}
                title={autoRotate ? "Pause Auto-Rotation" : "Resume Auto-Rotation"}
              >
                <RefreshCw className={`w-4.5 h-4.5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "12s" }} />
              </button>
            </div>

            {/* Canvas Mount */}
            <div
              ref={mountRef}
              className={`w-full flex-grow bg-gradient-to-b ${selectedPreset.bgGradient} transition-all duration-1000 cursor-grab active:cursor-grabbing`}
            />

            {/* Dynamic Footnotes */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-brand-orange uppercase block mb-1">
                  Model No: AERO-01
                </span>
                <span className="text-lg font-black text-white tracking-tight uppercase">
                  AERO Carbon Core Custom
                </span>
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-3 text-right">
                <span className="text-[10px] text-zinc-400 block font-mono">ESTIMATED SHIELDING</span>
                <span className="text-xs font-bold text-green-400">98% Energy Return</span>
              </div>
            </div>
          </div>

          {/* 2. Control Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel rounded-3xl border-zinc-800 p-8">
            <div>
              {/* Presets List */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <span>1. Curated Concepts</span>
                  <span className="h-[1px] flex-grow bg-zinc-800" />
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {COLOR_PRESETS.map((p) => {
                    const isSelected = selectedPreset.name === p.name;
                    return (
                      <button
                        key={p.name}
                        onClick={() => applyPreset(p)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-300 flex items-center gap-2 ${
                          isSelected
                            ? "bg-white text-brand-black border-white scale-[1.02] shadow-lg shadow-white/5"
                            : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: p.upper }}
                        />
                        {p.name.replace(" (Signature)", "")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Component Parts Selector */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <span>2. Select Component</span>
                  <span className="h-[1px] flex-grow bg-zinc-800" />
                </h3>
                <div className="grid grid-cols-5 gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800/80">
                  {(["upper", "midsole", "accent", "laces", "sole"] as const).map((part) => (
                    <button
                      key={part}
                      onClick={() => setActivePart(part)}
                      className={`py-2 rounded-lg text-2xs md:text-xs font-mono uppercase transition-all duration-200 ${
                        activePart === part
                          ? "bg-zinc-800 text-brand-orange font-bold shadow-inner"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paint Swatches */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                  <span>3. Apply Colorway</span>
                  <span className="h-[1px] flex-grow bg-zinc-800" />
                </h3>
                <div className="grid grid-cols-8 gap-3">
                  {[
                    "#FF6B00", // Aero Orange
                    "#111111", // Pitch Black
                    "#FFFFFF", // Stark White
                    "#EAEAEA", // Light Grey
                    "#3F4C38", // Forest Green
                    "#B27C3F", // Sand Tan
                    "#06B6D4", // Electric Cyan
                    "#D946EF", // Cyber Magenta
                    "#EF4444", // Crimson Red
                    "#EAB308", // Golden Yellow
                    "#2563EB", // Cobalt Blue
                    "#4B5563", // Slate Grey
                    "#1E1E1E", // Dark Grey
                    "#14532D", // Dark Green
                    "#F43F5E", // Rose Pink
                    "#7C3AED", // Violet
                  ].map((color) => {
                    // Check if color matches current active part
                    let isCurrentColor = false;
                    if (activePart === "upper" && upperColor.toLowerCase() === color.toLowerCase()) isCurrentColor = true;
                    if (activePart === "midsole" && midsoleColor.toLowerCase() === color.toLowerCase()) isCurrentColor = true;
                    if (activePart === "sole" && soleColor.toLowerCase() === color.toLowerCase()) isCurrentColor = true;
                    if (activePart === "accent" && accentColor.toLowerCase() === color.toLowerCase()) isCurrentColor = true;
                    if (activePart === "laces" && lacesColor.toLowerCase() === color.toLowerCase()) isCurrentColor = true;

                    return (
                      <button
                        key={color}
                        onClick={() => {
                          if (activePart === "upper") setUpperColor(color);
                          if (activePart === "midsole") setMidsoleColor(color);
                          if (activePart === "sole") setSoleColor(color);
                          if (activePart === "accent") setAccentColor(color);
                          if (activePart === "laces") setLacesColor(color);
                        }}
                        className={`aspect-square w-full rounded-full transition-all duration-300 relative border flex items-center justify-center ${
                          isCurrentColor
                            ? "border-brand-orange scale-110 shadow-lg shadow-brand-orange/20"
                            : "border-zinc-800 hover:scale-105 hover:border-zinc-600"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      >
                        {isCurrentColor && (
                          <Check className={`w-4 h-4 ${color === "#FFFFFF" || color === "#EAEAEA" ? "text-black" : "text-white"}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Specifications List */}
              <div className="bg-zinc-900/40 border border-zinc-800/60 p-5 rounded-2xl mb-8">
                <h4 className="text-2xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Live Customizer Blueprint</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-mono">
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Upper Frame:</span>
                    <span className="text-white font-bold uppercase">{upperColor}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Midsole Core:</span>
                    <span className="text-white font-bold uppercase">{midsoleColor}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Logo Accent:</span>
                    <span className="text-white font-bold uppercase">{accentColor}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Speed Laces:</span>
                    <span className="text-white font-bold uppercase">{lacesColor}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Traction Sole:</span>
                    <span className="text-white font-bold uppercase">{soleColor}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800/40 pb-1">
                    <span className="text-zinc-500">Pod Cushion:</span>
                    <span className="text-cyan-400 font-bold uppercase">Nitrogen Core</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom order trigger */}
            <div>
              {isOrdered ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center text-green-400 text-sm font-medium animate-fade-in">
                  <Check className="w-5 h-5 mx-auto mb-2 stroke-[2.5]" />
                  Your custom AERO Carbon has been added to cart!
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOrdered(true);
                    setTimeout(() => setIsOrdered(false), 4000);
                  }}
                  className="w-full py-4 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-brand-black font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-brand-orange/10 hover:shadow-white/5 active:scale-[0.99]"
                >
                  Confirm Custom Pair ($259.99)
                </button>
              )}
              <span className="text-3xs text-center block text-zinc-500 mt-3 font-mono">
                *Individually handcrafted. Ships in 12-14 business days. No extra customization fees.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
