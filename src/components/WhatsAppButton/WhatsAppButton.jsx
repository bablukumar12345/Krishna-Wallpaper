import './WhatsAppButton.css';

const WHATSAPP_NUMBER = '919955197472'; // 9955197472 with India country code

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Krishna Wallpaper, I'd like to know more about your products and get a quotation."
  );
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with Krishna Wallpaper on WhatsApp"
    >
      <span className="whatsapp-fab__ring"></span>
      <span className="whatsapp-fab__icon">
        <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff">
          <path d="M16.02 2.667c-7.36 0-13.33 5.97-13.33 13.33 0 2.35.62 4.55 1.7 6.46L2.67 29.33l6.99-1.83a13.26 13.26 0 0 0 6.36 1.62h.01c7.36 0 13.33-5.97 13.33-13.33 0-3.56-1.39-6.9-3.9-9.42a13.24 13.24 0 0 0-9.43-3.91zm0 24.4h-.01a11.06 11.06 0 0 1-5.64-1.54l-.4-.24-4.15 1.09 1.11-4.05-.26-.42a11.04 11.04 0 0 1-1.7-5.9c0-6.11 4.97-11.08 11.08-11.08 2.96 0 5.74 1.15 7.84 3.25a11.02 11.02 0 0 1 3.24 7.85c0 6.11-4.97 11.04-11.11 11.04zm6.08-8.29c-.33-.17-1.96-.97-2.27-1.08-.3-.11-.53-.17-.75.17-.22.33-.86 1.08-1.06 1.31-.2.22-.39.25-.72.08-.33-.17-1.4-.52-2.66-1.65-.98-.88-1.65-1.96-1.84-2.29-.19-.33-.02-.51.15-.68.15-.15.33-.39.5-.58.17-.2.22-.33.33-.55.11-.22.06-.42-.03-.58-.08-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57l-.64-.01c-.22 0-.58.08-.88.42-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.17.22 2.32 3.55 5.63 4.98.79.34 1.4.54 1.88.7.79.25 1.51.21 2.08.13.63-.1 1.96-.8 2.24-1.58.28-.77.28-1.44.2-1.58-.08-.14-.3-.22-.63-.39z"/>
        </svg>
      </span>
    </a>
  );
}
