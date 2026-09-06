import { eventContent } from '../../content/event'
import './Footer.css'
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <p className="eyebrow">REALIZAÇÃO</p>
            <div className="organization">
              <img
                src="/images/lannchsR-logo.jpg"
                alt="Logotipo da LANNc Hospital Santa Rosa"
                width="90"
                height="72"
                loading="lazy"
              />
              <div>
                <strong>LANNcHSR</strong>
                <p>{eventContent.organization}</p>
              </div>
            </div>
          </div>
          <div className="president">
            <span className="small-label">PRESIDÊNCIA DO EVENTO</span>
            <p>{eventContent.president}</p>
          </div>
        </div>
        <div className="supporters">
          <p className="small-label">APOIO</p>
          <ul>
            {eventContent.supporters.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
        <div className="footer-bottom">
          <p>© 2026 LANNcHSR. Todos os direitos reservados.</p>
          <p>Desenvolvimento · Rafael Ribeiro Vargas</p>
          <a href="#inicio">Voltar ao início ↑</a>
        </div>
      </div>
    </footer>
  )
}
