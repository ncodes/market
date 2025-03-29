export default function IconOpenLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="matrix(1 0 0 -1 0 24)" fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <rect
          fill="#C8ED5A"
          opacity=".3"
          transform="rotate(135 11.646 12.146)"
          x="10.646"
          y="5.146"
          width="2"
          height="14"
          rx="1"
        />
        <path
          d="M15.596 8.61a1 1 0 1 1 2 0v8.486a1 1 0 0 1-.956 1l-8.132.353a1 1 0 1 1-.087-1.998l7.175-.312V8.61z"
          fill="#C8ED5A"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}
