export default function Icon3Dots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(.418)" fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle fill="#FFF" cx="12" cy="5" r="2" />
        <circle fill="#FFF" cx="12" cy="12" r="2" />
        <circle fill="#FFF" cx="12" cy="19" r="2" />
      </g>
    </svg>
  );
}
