import type { EventContent } from '../../content/event'
import './EventSections.css'
export function EventSections({ content }: { content: EventContent }) {
  return (
    <>
      <section
        className="about container section-space"
        id="sobre"
        aria-labelledby="about-title"
      >
        <div>
          <p className="eyebrow">A RESPOSTA É: NÃO.</p>
          <h2 id="about-title">
            Uma especialidade.
            <br />
            <em>Muitos universos.</em>
          </h2>
        </div>
        <div className="about-copy">
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
          {content.benefits.map((benefit) => (
            <article key={benefit.number}>
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
        <div className="section-heading">
          <div>
            <p className="eyebrow">CONHECIMENTO EM PERSPECTIVA</p>
            <h2 id="program-title">
              Cada área,
              <br />
              <em>uma nova descoberta.</em>
            </h2>
          </div>
          <p className="muted">
            Diferentes rotinas, técnicas e trajetórias.
            <br />
            Um encontro para ampliar seu olhar.
          </p>
        </div>
        <div className="program-columns">
          <article>
            <span className="small-label">01 / PROGRAMAÇÃO</span>
            {content.schedule.length ? (
              content.schedule.map((item) => (
                <div
                  className="program-item"
                  key={`${item.time}-${item.title}`}
                >
                  <span>{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.speaker}</p>
                </div>
              ))
            ) : (
              <>
                <h3>
                  O próximo capítulo
                  <br />
                  está chegando.
                </h3>
                <p className="muted">
                  A programação completa, com os temas e horários das sessões,
                  será divulgada em breve.
                </p>
              </>
            )}
          </article>
          <article id="palestrantes">
            <span className="small-label">02 / PALESTRANTES</span>
            {content.speakers.length ? (
              content.speakers.map((speaker) => (
                <div className="program-item" key={speaker.name}>
                  {speaker.photoUrl && (
                    <img
                      src={speaker.photoUrl}
                      alt={speaker.name}
                      width="160"
                      height="160"
                      loading="lazy"
                    />
                  )}
                  <h3>{speaker.name}</h3>
                  <p>{speaker.specialty}</p>
                  <p>{speaker.bio}</p>
                </div>
              ))
            ) : (
              <>
                <h3>
                  Experiências que
                  <br />
                  abrem caminhos.
                </h3>
                <p className="muted">
                  Conheça em breve os especialistas que compartilharão suas
                  experiências com você.
                </p>
              </>
            )}
          </article>
        </div>
      </section>
      <section
        className="faq-section container section-space"
        id="duvidas"
        aria-labelledby="faq-title"
      >
        <div>
          <p className="eyebrow">ANTES DO ENCONTRO</p>
          <h2 id="faq-title">
            Suas dúvidas,
            <br />
            <em>respondidas.</em>
          </h2>
        </div>
        <div className="faq-list">
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
