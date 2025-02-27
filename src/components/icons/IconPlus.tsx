export default function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="matrix(1 0 0 -1 0 16)" fill="#FFF" fill-rule="evenodd">
        <rect x="2.667" y="7.333" width="10.667" height="1.333" rx=".667" />
        <path d="M8.667 3.333v9.334a.667.667 0 0 1-1.334 0V3.333a.667.667 0 0 1 1.334 0z" opacity=".3" />
      </g>
    </svg>
  );
}
