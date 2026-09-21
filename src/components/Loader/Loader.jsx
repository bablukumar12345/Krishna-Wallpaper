import './Loader.css';

export default function Loader({ fullscreen = true }) {
  return (
    <div className={`loader ${fullscreen ? 'loader--fullscreen' : ''}`} role="status" aria-live="polite">
      <div className="loader__mark">
        <span></span><span></span><span></span>
      </div>
      <p>Loading Krishna Wallpaper…</p>
    </div>
  );
}
