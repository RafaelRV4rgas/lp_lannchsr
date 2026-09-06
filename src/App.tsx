import './App.css'
import { Hero } from './components/hero/Hero'
import { EventSections } from './components/event/EventSections'
import { Footer } from './components/footer/Footer'
import { Formulario } from './components/formulario/Formulario'
import { eventContent } from './content/event'
import { defaultEventRules, registrationsAvailable } from './domain/event'
import { registrationClient } from './services/registration-client'

export default function App() {
  return (
    <>
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
          Inscrições <span aria-hidden="true">↗</span>
        </a>
      </header>
      <main id="conteudo">
        <Hero
          title={eventContent.title}
          subtitle={eventContent.subtitle}
          registrationAvailable={registrationsAvailable(defaultEventRules)}
        />
        <EventSections content={eventContent} />
        <section
          className="registration-section container section-space"
          id="inscricao"
          aria-labelledby="registration-title"
        >
          <div>
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
            rules={defaultEventRules}
            onSubmit={registrationClient.submit}
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
