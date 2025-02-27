export default function IconSold(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path d="M16 16H0V0h16z" />
        <path
          d="M4.936 4.603c.26-.26.682-.26.943 0l5.657 5.656a.667.667 0 0 1-.943.943L4.936 5.545a.667.667 0 0 1 0-.942z"
          fill="#FF8080"
          opacity=".3"
        />
        <path
          d="M5.603 10.26a.667.667 0 0 1-1.334 0V4.602c0-.357.281-.651.638-.667l5.421-.235a.667.667 0 1 1 .058 1.332l-4.783.208v5.018z"
          fill="#FF8080"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
}
