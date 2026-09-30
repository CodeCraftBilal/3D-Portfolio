import { ImageResponse } from "next/og";

export const alt = "Bilal Khan — A little space. A lot of ideas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        background: "#f5f3ec",
        color: "#303a31",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 700 }}>bk.</span>
        <span style={{ fontSize: 20, letterSpacing: 3 }}>
          BILAL KHAN / DEVELOPER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 86,
          lineHeight: 1.1,
          letterSpacing: -4,
          marginTop: 65,
        }}
      >
        <span>A little space.</span>
        <span style={{ color: "#b66c4e" }}>A lot of ideas.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 22,
          marginTop: 45,
          color: "#71776b",
        }}
      >
        React Native · Full-stack development · Pakistan
      </div>
      <div
        style={{
          position: "absolute",
          right: 90,
          top: 245,
          width: 190,
          height: 190,
          border: "2px solid #d4d9c9",
          borderRadius: 95,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#849178",
          fontSize: 82,
        }}
      >
        ↗
      </div>
    </div>,
    size,
  );
}
