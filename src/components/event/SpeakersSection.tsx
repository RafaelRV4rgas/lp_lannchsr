import {useEffect, useRef} from 'react'
import type {Speaker, Talk} from '../../content/speakers'
import './SpeakersSection.css'

interface Props {
    speakers: Speaker[]
    talks: Talk[]
}

interface SpeakerCard {
    speaker: Speaker
    topic: string
}

export function SpeakersSection({speakers, talks}: Props) {
    const listRef = useRef<HTMLOListElement>(null)
    const byId = new Map(speakers.map((speaker) => [speaker.id, speaker]))
    const cards: SpeakerCard[] = talks.flatMap((talk) =>
        talk.speakerIds.map((id) => {
            const speaker = byId.get(id)
            if (!speaker) throw new Error(`Palestrante não cadastrado: ${id}`)
            return {speaker, topic: talk.title}
        }),
    )

    useEffect(() => {
        const list = listRef.current
        if (!list || !('IntersectionObserver' in window)) return

        const items = Array.from(list.children)
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                }
            },
            {threshold: 0.12, rootMargin: '0px 0px -8% 0px'},
        )

        list.classList.add('is-reveal-ready')
        for (const item of items) observer.observe(item)

        return () => observer.disconnect()
    }, [])

    return (
        <div className="speakers-section" id="palestrantes">
            <h3 className="speakers-title eyebrow">Quem conduz essa jornada.</h3>
            <ol ref={listRef} className="speakers-grid" aria-label="Palestrantes do simpósio">
                {cards.map(({speaker, topic}) => {
                    const hasPlaceholderPhoto = speaker.photoUrl === '/images/speaker-placeholder.webp'

                    return (
                        <li key={speaker.id}>
                            <article className="speaker-card" aria-labelledby={`speaker-${speaker.id}`}>
                                <figure className="speaker-photo">
                                    <img
                                        src={speaker.photoUrl}
                                        alt={hasPlaceholderPhoto
                                            ? 'Retrato genérico demonstrativo, não representa o palestrante'
                                            : `Foto de ${speaker.name}`}
                                        width="128"
                                        height="160"
                                        loading="lazy"
                                    />
                                </figure>

                                <div className="speaker-content">
                                    <div className="speaker-name-line">
                                        <h3 id={`speaker-${speaker.id}`}>{speaker.name}</h3>
                                        <p className={`speaker-crm`}>
                                            {speaker.crm}
                                        </p>
                                    </div>
                                    <p className="speaker-topic">{topic}</p>
                                    <p className="speaker-bio">{speaker.bio}</p>
                                </div>
                            </article>
                        </li>
                    )
                })}
            </ol>

        </div>
    )
}
