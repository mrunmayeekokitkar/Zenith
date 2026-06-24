// app/globe/layout.tsx
import type { ReactNode } from "react";

export default function GlobeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Cesium widget styles served from /public/cesium/ (copied at build time by prebuild script) */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link rel="stylesheet" href="/cesium/Widgets/widgets.css" />
      {children}
    </>
  );
}
