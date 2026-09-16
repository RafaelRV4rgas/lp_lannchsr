import { BrainVisual } from './BrainVisual'
import './Hero.css'
interface Props {
  title: string
  subtitle: string
  registrationAvailable: boolean
}
export function Hero({ title, subtitle, registrationAvailable }: Props) {
  return (
    <section
      className="hero container"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        {/*<p className="eyebrow">*/}
          {/*<span className="status-dot" /> SIMPÓSIO ON-LINE · LANNcHSR*/}
        {/*</p>*/}
        <h1 id="hero-title" aria-label={title}>
          Neurocirurgia
          <br />é tudo a<br />
          <em>mesma coisa?</em>
        </h1>
        <p className="hero-description">{subtitle}</p>
        <div className="hero-actions">
          <a
            className="button"
            href={registrationAvailable ? '#inscricao' : '#sobre'}
          >
            {registrationAvailable
              ? 'Solicitar inscrição'
              : 'Conheça o simpósio'}{' '}
            <span aria-hidden="true">➔</span>
          </a>
          <span className="hero-date">
            Data e horário
            <br />
            <strong>em breve</strong>
          </span>
        </div>
      </div>
      <BrainVisual />
      <div className="hero-bottom">
        <span>UM UNIVERSO DE POSSIBILIDADES</span>
        <a href="#sobre" aria-label="Explorar o simpósio">
          EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
