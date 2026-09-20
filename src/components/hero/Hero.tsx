import {BrainVisual} from './BrainVisual'
import './Hero.css'

interface Props {
    title: string
    subtitle: string
    data: string
    registrationAvailable: boolean
}

export function Hero({title, subtitle, data, registrationAvailable}: Props) {
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
                    <br/>é tudo a<br/>
                    <em>mesma coisa?</em>
                </h1>
                <p className="hero-description">{subtitle}</p>
                <span className="hero-description" style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                }}>
                    <strong>Data do evento: {data}</strong>
                </span>
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
                </div>
            </div>
            <BrainVisual/>
            <div className="hero-bottom">
                <span>UM UNIVERSO DE POSSIBILIDADES</span>
                <a href="#sobre" aria-label="Explorar o simpósio">
                    EXPLORE <span aria-hidden="true">↓</span>
                </a>
            </div>
        </section>
    )
}
