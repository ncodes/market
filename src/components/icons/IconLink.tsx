export default function IconLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path d="M17 33.97 33.97 17 17 .03.03 17z" />
        <path
          d="M14 21a2 2 0 0 0 2-2v-1h-3a1 1 0 0 1-.993-.883L12 17a1 1 0 0 1 1-1h3v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4z"
          fill="#8DE969"
          opacity=".3"
        />
        <path
          d="M24 21a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1h3a1 1 0 0 1 .993.883L22 17a1 1 0 0 1-1 1h-3v1a2 2 0 0 0 2 2h4z"
          fill="#8DE969"
        />
      </g>
    </svg>
  );
}
