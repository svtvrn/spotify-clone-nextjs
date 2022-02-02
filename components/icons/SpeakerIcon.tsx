export function SpeakerIcon({ fill }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      version="1"
      viewBox="0 0 75 75"
      xmlSpace="preserve"
    >
      <g className="stroke-blue-700" strokeWidth="5">
        <path
          className="fill-blue-700"
          strokeLinejoin="round"
          d="M39.389 13.769L22.235 28.606 6 28.606 6 47.699 21.989 47.699 39.389 62.75 39.389 13.769z"
        ></path>
        <path
          fill="none"
          strokeLinecap="round"
          d="M48.128 49.03a20.087 20.087 0 00-.085-21.453"
        ></path>
        <path
          fill="none"
          strokeLinecap="round"
          d="M55.082 20.537a29.86 29.86 0 015.884 17.84 29.83 29.83 0 01-5.788 17.699"
        ></path>
      </g>
    </svg>
  );
}
