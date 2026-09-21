import { useEffect, useState } from 'react';
import './Lightbox.css';

export default function Lightbox({ src, alt = '', onClose }) {
    const [zoomed, setZoomed] = useState(false);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!src) return null;

    return (
        <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label={alt}>
            <div className="lightbox__box" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox__close" onClick={onClose} aria-label="Close image viewer">
                    ✕
                </button>

                <div className={`lightbox__viewport ${zoomed ? 'is-zoomed' : ''}`}>
                    <img
                        src={src}
                        alt={alt}
                        className="lightbox__image"
                        onClick={() => setZoomed((z) => !z)}
                        draggable="false"
                    />
                </div>

                <p className="lightbox__hint">{zoomed ? 'Tap image to zoom out' : 'Tap image to zoom in'}</p>
            </div>
        </div>
    );
}