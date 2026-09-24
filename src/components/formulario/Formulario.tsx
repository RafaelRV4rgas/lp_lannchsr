import { useRef, useState, type FormEvent } from 'react'
import {
  calculatePriceCents,
  formatPrice,
  requestsAvailable,
  type SymposiumRules,
} from '../../domain/symposium'
import {
  formatBrazilianPhone,
  formatCpf,
  normalizeRegistration,
  semesterOptions,
  validateRegistration,
  type RegistrationErrors,
  type RegistrationInput,
} from '../../domain/registration'
import './Formulario.css'
import {eventContent} from "../../content/event.ts";

interface Props {
  rules?: SymposiumRules
  previewWhenClosed?: boolean
  onSubmit?: (
    input: RegistrationInput,
    idempotencyKey: string,
  ) => Promise<{ accepted: true }>
}
const emptyInput: RegistrationInput = {
  fullName: '',
  cpf: '',
  profession: '',
  email: '',
  whatsapp: '',
  whatsappConsent: false,
}
export function Formulario({
  rules = eventContent.rules,
  onSubmit,
  previewWhenClosed = false,
}: Props) {
  const [input, setInput] = useState<RegistrationInput>(emptyInput)
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'accepted' | 'error'
  >('idle')
  const submitting = useRef(false)
  const key = useRef<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const student = input.profession === 'student'
  const available = requestsAvailable(rules)
  const hasErrors = Object.values(errors).some(Boolean)
  const change = (name: keyof RegistrationInput, value: string | boolean) => {
    setInput((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => ({ ...previous, [name]: undefined }))
    setStatus('idle')
    key.current = null
  }
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (submitting.current) return
    const nextErrors = validateRegistration(input)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (!available) return
    submitting.current = true
    setStatus('sending')
    try {
      if (!onSubmit) throw new Error('SERVICE_UNAVAILABLE')
      key.current ??= crypto.randomUUID()
      await onSubmit(normalizeRegistration(input), key.current)
      setStatus('accepted')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }
  if (!available && !previewWhenClosed)
    return (
      <div
        className="registration-card closed-registration"
        data-scroll-reveal
        data-reveal-delay="1"
      >
        <span className="small-label">VAMOS NOS ENCONTRAR EM BREVE</span>
        <h3>
          Novas conexões
          <br />
          começam aqui.
        </h3>
        <p>
          A data e o valor serão divulgados antes da abertura das inscrições.
        </p>
        <div className="student-note">
          <span aria-hidden="true">↗</span>
          <div>
            <strong>{formatPrice(rules.studentPriceCents)} para estudantes</strong>
            <p>De qualquer curso, por autodeclaração.</p>
          </div>
        </div>
        <button className="button" disabled>
          Inscrições em breve
        </button>
        <p className="form-footnote">Evento on-line</p>
      </div>
    )
  if (status === 'accepted')
    return (
      <div className="registration-card" role="status">
        <h3>Solicitação recebida</h3>
        <p>
          Enviaremos uma mensagem para o WhatsApp informado. Nossa equipe
          continuará o atendimento por lá para conferir seus dados e fornecer
          as orientações de pagamento.
        </p>
        <p>O envio do formulário ainda não confirma sua inscrição.</p>
      </div>
    )
  function field(
    name: keyof RegistrationInput,
    label: string,
    type = 'text',
    autoComplete?: string,
  ) {
    return (
      <div className="field" key={name}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={name === 'cpf' || name === 'whatsapp' ? 'numeric' : undefined}
          maxLength={name === 'cpf' ? 14 : name === 'whatsapp' ? 19 : 254}
          value={String(input[name] ?? '')}
          onChange={(e) => {
            const value =
              name === 'cpf'
                ? formatCpf(e.target.value)
                : name === 'whatsapp'
                  ? formatBrazilianPhone(e.target.value)
                  : e.target.value
            change(name, value)
          }}
          required
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span id={`${name}-error`} className="field-error">
            {errors[name]}
          </span>
        )}
      </div>
    )
  }
  return (
    <form
      className="registration-card"
      data-scroll-reveal
      data-reveal-delay="1"
      onSubmit={submit}
      noValidate
      ref={formRef}
      aria-label="Solicitação de inscrição"
    >
      <p className="small-label">SUA SOLICITAÇÃO</p>
      <h3>Faça parte do nosso evento.</h3>
      {!available && (
        <p>
          Prévia do formulário. As inscrições ainda estão fechadas e nenhum dado
          será enviado.
        </p>
      )}
      {hasErrors && (
        <p role="alert" className="field-error">
          Preencha os campos obrigatórios e corrija os dados destacados abaixo.
        </p>
      )}
      <p className="form-process-note">
        Ao enviar este formulário, você solicitará sua inscrição. Nossa equipe
        continuará o atendimento pelo WhatsApp para conferir os dados e enviar
        as orientações de pagamento. A inscrição somente será confirmada após
        essa etapa.
      </p>
      <p className="form-price">
        {rules.basePriceCents === null
          ? 'Valor em breve'
          : formatPrice(
              calculatePriceCents(
                rules.basePriceCents!,
                rules.studentPriceCents,
                student,
              ),
            )}
        {student && (
          <span>Valor para estudantes</span>
        )}
      </p>
      <fieldset disabled={status === 'sending'}>
        <legend className="sr-only">Dados do participante</legend>
        {field('fullName', 'Nome completo', 'text', 'name')}
        {field('cpf', 'CPF')}
        <div className="field">
          <label htmlFor="profession">Profissão</label>
          <select
            id="profession"
            name="profession"
            value={input.profession}
            onChange={(e) => change('profession', e.target.value)}
            required
            aria-invalid={!!errors.profession}
            aria-describedby={
              errors.profession ? 'profession-error' : undefined
            }
          >
            <option value="">Selecione</option>
            <option value="student">Estudante</option>
            <option>Médico</option>
            <option>Residente</option>
            <option>Profissional de saúde</option>
            <option>Outra profissão</option>
          </select>
          {errors.profession && (
            <span className="field-error" id="profession-error">
              {errors.profession}
            </span>
          )}
        </div>
        {student && (
          <div className="academic-fields">
            <p className="student-verification-note">
              A carteirinha será conferida posteriormente pelo WhatsApp. Não
              envie o documento por este formulário.
            </p>
            {field('course', 'Curso')}
            <div className="field">
              <label htmlFor="semester">Semestre</label>
              <select
                id="semester"
                name="semester"
                value={input.semester ?? ''}
                onChange={(e) => change('semester', e.target.value)}
                required
                aria-invalid={!!errors.semester}
                aria-describedby={
                  errors.semester ? 'semester-error' : undefined
                }
              >
                <option value="">Selecione o semestre</option>
                {semesterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <span id="semester-error" className="field-error">
                  {errors.semester}
                </span>
              )}
            </div>
            {field('university', 'Universidade')}
          </div>
        )}
        {field('email', 'E-mail', 'email', 'email')}
        {field('whatsapp', 'WhatsApp com DDD', 'tel', 'tel')}
        <label className="consent">
          <input
            name="whatsappConsent"
            type="checkbox"
            checked={input.whatsappConsent}
            onChange={(e) => change('whatsappConsent', e.target.checked)}
            aria-invalid={!!errors.whatsappConsent}
            aria-describedby={
              errors.whatsappConsent ? 'consent-error' : undefined
            }
            required
          />
          <span>
            Autorizo a LANNcHSR a entrar em contato comigo pelo WhatsApp para
            conferir os dados desta solicitação, orientar o pagamento,
            confirmar a inscrição e enviar informações relacionadas ao
            simpósio.
          </span>
        </label>
        {errors.whatsappConsent && (
          <span className="field-error" id="consent-error">
            {errors.whatsappConsent}
          </span>
        )}
      </fieldset>
      <p className="form-privacy">
        Os dados informados serão utilizados para processar sua solicitação de
        inscrição e realizar o atendimento relacionado ao evento. A condição
        de estudante será conferida manualmente pelo WhatsApp. Não envie
        carteirinha ou comprovante de pagamento por este formulário.
      </p>
      {status === 'error' && (
        <p role="alert" className="field-error">
          Não foi possível enviar agora. Seus dados foram mantidos; tente
          novamente.
        </p>
      )}
      <button className="button" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando solicitação…' : 'Solicitar inscrição'}
      </button>
      <p className="form-footnote">
        O envio do formulário ainda não confirma sua inscrição.
      </p>
    </form>
  )
}
