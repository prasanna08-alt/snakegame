export default function Header() {
  return (
    <div className="header">
      <svg width="46" height="40" viewBox="0 0 46 40" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7dff9a" />
            <stop offset="100%" stopColor="#0c9a3a" />
          </linearGradient>
        </defs>
        <path
          d="M6 6 C6 34, 20 34, 22 20 C24 8, 36 8, 38 30"
          fill="none"
          stroke="url(#logoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="6" cy="6" r="4.5" fill="url(#logoGrad)" />
        <circle cx="5" cy="5" r="1" fill="#000" />
        <circle cx="8" cy="5" r="1" fill="#000" />
      </svg>
      <h1>SNAKE GAME</h1>
    </div>
  );
}
