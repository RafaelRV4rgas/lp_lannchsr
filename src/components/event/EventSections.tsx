import type {EventContent} from '../../content/event'
import './EventSections.css'
import {SpeakersSection} from './SpeakersSection'
import {useScrollReveal} from '../motion/useScrollReveal'

export function EventSections({content}: { content: EventContent }) {
    useScrollReveal()
    return (
        <>
            <section
                className="about container section-space"
                id="sobre"
                aria-labelledby="about-title"
            >
                <div data-scroll-reveal>
                    <p className="eyebrow">A RESPOSTA É: NÃO.</p>
                    <h2 id="about-title">
                        Uma especialidade.
                        <br/>
                        <em>Muitos universos.</em>
                    </h2>
                </div>
                <div className="about-copy" data-scroll-reveal data-reveal-delay="1">
                    <p>
                        Cada grande área da neurocirurgia tem suas próprias perguntas,
                        técnicas e formas de cuidar.
                    </p>
                    <p className="muted">
                        Neste simpósio, especialistas compartilham o que acontece além dos
                        livros: as patologias que tratam, os procedimentos que realizam e as
                        escolhas que deram forma às suas carreiras.
                    </p>
                    <p className="muted">
                        Para quem está começando, escolhendo a residência ou descobrindo o
                        próximo caminho.
                    </p>
                    <a className="text-link" href="#programacao">
                        Explore o encontro <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </section>
            <section className="benefits-band" aria-label="O que você vai encontrar">
                <div className="container benefits-grid">
                    {content.benefits.map((benefit, index) => (
                        <article
                            key={benefit.number}
                            data-scroll-reveal
                            data-reveal-delay={index + 1}
                        >
                            <span className="benefit-number">{benefit.number}</span>
                            <h3>{benefit.title}</h3>
                            <p>{benefit.text}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section
                className="container section-space"
                id="programacao"
                aria-labelledby="program-title"
            >
                <div className="section-heading" data-scroll-reveal>
                    <div style={{flex: 1}}>
                        <h2 id="program-title">
                            Cada área,
                            <br/>
                            <em>uma nova descoberta.</em>
                        </h2>
                    </div>
                    <p className="muted" style={{flex: 1}}>
                        Ao longo de dez temas, o simpósio percorre diferentes caminhos da
                        neurocirurgia — das técnicas vasculares ao neurointensivismo —
                        apresentados por especialistas que vivem essas áreas na prática.
                    </p>
                </div>
                <SpeakersSection speakers={content.speakers} talks={content.talks}/>
            </section>
            <section
                className="faq-section container section-space"
                id="duvidas"
                aria-labelledby="faq-title"
            >
                <div data-scroll-reveal>
                    <p className="eyebrow">ANTES DO ENCONTRO</p>
                    <h2 id="faq-title">
                        Suas dúvidas,
                        <br/>
                        <em>respondidas.</em>
                    </h2>
                </div>
                <div className="faq-list" data-scroll-reveal data-reveal-delay="1">
                    {content.faq.map((item) => (
                        <details key={item.question}>
                            <summary>
                                {item.question}
                                <span aria-hidden="true">+</span>
                            </summary>
                            <p>{item.answer}</p>
                        </details>
                    ))}
                </div>
            </section>
        </>
    )
}
