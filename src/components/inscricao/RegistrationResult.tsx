import {
  safePaymentUrl,
  type RegistrationResult as Result,
} from '../../contracts/api'

const copy = {
  pending: {
    title: 'Solicitação recebida',
    description:
      'Sua inscrição aguarda pagamento. A confirmação será enviada pelo WhatsApp após a aprovação.',
  },
  confirmed: {
    title: 'Inscrição confirmada',
    description:
      'Seu pagamento foi aprovado e sua inscrição está confirmada. O acesso ao evento será enviado pelo WhatsApp quando estiver liberado.',
  },
  expired: {
    title: 'Prazo encerrado',
    description:
      'O prazo de pagamento desta solicitação terminou. Você pode tentar retomá-la enquanto as inscrições estiverem abertas.',
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
      {result.status === 'pending' && result.paymentExpiresAt && (
        <p>
          Link de pagamento válido até{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'America/Cuiaba',
          }).format(new Date(result.paymentExpiresAt))}{' '}
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
