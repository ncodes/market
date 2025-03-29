export default function IconSeeMore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M.639 0h24v24h-24z" />
        <path
          d="M17.932 4.793a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.383.03l-6-5.5a1 1 0 1 1 1.352-1.474l5.294 4.853 5.323-5.323z"
          fill="#000"
          fillRule="nonzero"
        />
        <path
          d="M17.932 11.793a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.383.03l-6-5.5a1 1 0 0 1 1.352-1.474l5.294 4.853 5.323-5.323z"
          fill="#000"
          fillRule="nonzero"
          opacity=".3"
        />
      </g>
    </svg>
  );
}
