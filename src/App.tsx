import './App.css'
import type {EventRules} from './domain/event'

import { Hero } from './components/hero/Hero'
import { EventSections } from './components/event/EventSections'
import { Footer } from './components/footer/Footer'
import { Formulario } from './components/formulario/Formulario'
import { eventContent } from './content/event'
import { registrationsAvailable } from './domain/event'
import { registrationClient } from './services/registration-client'
import {SmoothScroll} from './components/motion/SmoothScroll'
import {useScrollReveal} from './components/motion/useScrollReveal'

export default function App() {
  const defaultRules: EventRules = eventContent.rules;
  useScrollReveal()

  return (
    <>
      <SmoothScroll />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header container">
        <a className="wordmark" href="#inicio" aria-label="LANNcHSR — início">
          LANN<span>c</span>HSR
          <span className="wordmark-caption">NEUROLOGIA E NEUROCIRURGIA</span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#sobre">O simpósio</a>
          <a href="#programacao">Programação</a>
          <a href="#duvidas">Dúvidas</a>
        </nav>
        <a className="header-cta" href="#inscricao">
          Inscrever-se <span aria-hidden="true">➔</span>
        </a>
      </header>
      <main id="conteudo">
        <Hero
          title={eventContent.title}
          subtitle={eventContent.subtitle}
          data={eventContent.dateLabel}
          registrationAvailable={registrationsAvailable(defaultRules)}
        />
        <EventSections content={eventContent} />
        <section
          className="registration-section container section-space"
          id="inscricao"
          aria-labelledby="registration-title"
        >
          <div data-scroll-reveal>
            <p className="eyebrow">SEU PRÓXIMO PASSO</p>
            <h2 id="registration-title">
              Encontre a área
              <br />
              que faz sentido
              <br />
              <em>para você.</em>
            </h2>
            <p className="muted">
              Um encontro para ampliar perspectivas e conhecer os muitos
              caminhos da neurocirurgia.
            </p>
          </div>
          <Formulario
            rules={defaultRules}
            previewWhenClosed={import.meta.env.DEV}
            onSubmit={registrationClient.submit}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
