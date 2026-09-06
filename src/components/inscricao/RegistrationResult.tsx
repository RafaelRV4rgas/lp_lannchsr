import {
  safePaymentUrl,
  type RegistrationResult as Result,
} from '../../contracts/api'

const copy = {
  pending: {
    title: 'Solicitação recebida',
    description:
      'Sua inscrição aguarda pagamento. A confirmação será enviada pelo WhatsApp após a aprovação e a atribuição da vaga.',
  },
  confirmed: {
    title: 'Inscrição confirmada',
    description:
      'Seu pagamento foi aprovado e sua vaga está confirmada. O acesso ao evento será enviado pelo WhatsApp quando estiver liberado.',
  },
  expired: {
    title: 'Prazo encerrado',
    description:
      'O prazo desta solicitação terminou. Você pode tentar retomá-la, conforme a disponibilidade de vagas e as inscrições abertas.',
  },
  paid_without_seat: {
    title: 'Pagamento em análise',
    description:
      'Recebemos seu pagamento, mas não foi possível atribuir uma vaga. A organização precisa verificar a situação. Não faça outro pagamento.',
  },
}
export function RegistrationResult({
  result,
  onResume,
  busy = false,
}: {
  result: Result
  onResume?: () => void
  busy?: boolean
}) {
  const message = copy[result.status]
  const paymentUrl = safePaymentUrl(result.paymentUrl)
  return (
    <div className="registration-card" role="status">
      <h2>{message.title}</h2>
      <p>{message.description}</p>
      {result.status === 'pending' && result.reservationExpiresAt && (
        <p>
          Vaga reservada até{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Cuiaba',
          }).format(new Date(result.reservationExpiresAt))}{' '}
          (horário de Cuiabá).
        </p>
      )}
      {result.status === 'pending' &&
        (paymentUrl ? (
          <a
            className="button"
            href={paymentUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Pagar inscrição ↗
          </a>
        ) : (
          <p>
            O link de pagamento ainda não está disponível. Consulte novamente em
            instantes.
          </p>
        ))}
      {result.status === 'expired' && onResume && (
        <button className="button" onClick={onResume} disabled={busy}>
          {busy ? 'Consultando…' : 'Retomar inscrição'}
        </button>
      )}
    </div>
  )
}
