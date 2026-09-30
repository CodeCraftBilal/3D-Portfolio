"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import gsap from "gsap";
import { overview, cameraViews } from "@/lib/room-config";
import { useRoomStore } from "@/store/room-store";

export function CameraRig() {
  const controls = useRef<OrbitControlsImpl>(null);
  const entered = useRef(false);
  const { camera, invalidate, size } = useThree();
  const section = useRoomStore((s) => s.section);
  const resetCount = useRoomStore((s) => s.resetCount);
  const reducedMotion = useRoomStore((s) => s.reducedMotion);
  const mobile = size.width < 650;

  useEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;
    const view = section ? cameraViews[section] : overview;
    const distance = mobile && !section ? 1.2 : 1;
    const [x, y, z] = view.position;
    if (!entered.current) {
      camera.position.set(x * 1.24, y * 1.2, z * 1.24);
      orbit.target.set(...overview.target);
      entered.current = true;
    }
    orbit.enabled = false;
    const timeline = gsap.timeline({
      onUpdate: () => {
        orbit.update();
        invalidate();
      },
      onComplete: () => {
        orbit.enabled = !section;
        invalidate();
      },
    });
    timeline.to(
      camera.position,
      {
        x: x * distance,
        y: y * distance,
        z: z * distance,
        duration: reducedMotion ? 0 : 1.55,
        ease: "power3.inOut",
      },
      0,
    );
    timeline.to(
      orbit.target,
      {
        x: view.target[0],
        y: view.target[1],
        z: view.target[2],
        duration: reducedMotion ? 0 : 1.55,
        ease: "power3.inOut",
      },
      0,
    );
    return () => {
      timeline.kill();
    };
  }, [camera, invalidate, mobile, reducedMotion, resetCount, section]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enabled={!section}
      enablePan={false}
      enableZoom={false}
      minAzimuthAngle={0.18}
      maxAzimuthAngle={1.25}
      minPolarAngle={0.63}
      maxPolarAngle={1.35}
      rotateSpeed={0.45}
      enableDamping
      dampingFactor={0.07}
      target={overview.target}
    />
  );
}
