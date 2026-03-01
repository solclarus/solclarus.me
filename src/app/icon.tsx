import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <img
      src="https://avatars.githubusercontent.com/u/75738518?v=4"
      width={32}
      height={32}
      style={{
        borderRadius: 6,
      }}
    />,
    {
      ...size,
    },
  );
}
