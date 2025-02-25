export default function IconBought(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h16v16H0z" />
        <path
          d="M11.064 11.397a.667.667 0 0 1-.943 0L4.464 5.741a.667.667 0 0 1 .943-.943l5.657 5.657c.26.26.26.682 0 .942z"
          fill="#C8ED5A"
          opacity=".3"
        />
        <path
          d="M10.397 5.74a.667.667 0 0 1 1.334 0v5.657c0 .357-.281.651-.638.667l-5.421.235a.667.667 0 1 1-.058-1.332l4.783-.208V5.741z"
          fill="#C8ED5A"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
}
