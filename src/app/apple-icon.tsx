import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <img
      src="https://avatars.githubusercontent.com/u/75738518?v=4"
      width={180}
      height={180}
      style={{
        borderRadius: 32,
      }}
    />,
    {
      ...size,
    },
  );
}
