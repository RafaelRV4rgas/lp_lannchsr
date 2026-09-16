import { useEffect, useRef, useState, type FormEvent } from 'react'
import { registrationClient } from '../../services/registration-client'
import type {
  RegistrationClient,
  RegistrationResult as Result,
} from '../../contracts/api'
import { digitsOnly, formatCpf, validCpf } from '../../domain/registration'
import { RegistrationResult } from './RegistrationResult'
import '../formulario/Formulario.css'

// The router reads and removes the fragment before mounting. No token is persisted.
export function RegistrationPage({
  accessToken,
  client = registrationClient,
}: {
  accessToken: string | null
  client?: RegistrationClient
}) {
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState(!!accessToken)
  const [error, setError] = useState('')
  const [cpf, setCpf] = useState('')
  const [sent, setSent] = useState(false)
  const [showRecovery, setShowRecovery] = useState(!accessToken)
  const pending = useRef(false)
  const resumeKey = useRef<string | null>(null)
  useEffect(() => {
    if (!accessToken) return
    let active = true
    client
      .read(accessToken)
      .then((value) => {
        if (active) {
          setResult(value)
          setShowRecovery(false)
        }
      })
      .catch(() => {
        if (active) {
          setShowRecovery(true)
          setError(
            'Não foi possível consultar. Tente novamente ou solicite um novo link de acesso.',
          )
        }
      })
      .finally(() => {
        if (active) setBusy(false)
      })
    return () => {
      active = false
    }
  }, [accessToken, client])
  async function refresh(resume = false) {
    if (!accessToken || pending.current) return
    pending.current = true
    setBusy(true)
    setError('')
    try {
      resumeKey.current ??= crypto.randomUUID()
      setResult(
        await (resume
          ? client.resume(accessToken, resumeKey.current)
          : client.read(accessToken)),
      )
      setShowRecovery(false)
    } catch {
      setShowRecovery(true)
      setError(
        'Não foi possível consultar. Solicite um novo link se o acesso tiver expirado.',
      )
    } finally {
      pending.current = false
      setBusy(false)
    }
  }
  async function recover(event: FormEvent) {
    event.preventDefault()
    if (pending.current) return
    if (!validCpf(cpf)) {
      setError('Informe um CPF válido.')
      return
    }
    pending.current = true
    setBusy(true)
    setError('')
    try {
      await client.recover(digitsOnly(cpf))
      setSent(true)
    } catch {
      setError('Não foi possível enviar agora. Tente novamente mais tarde.')
    } finally {
      pending.current = false
      setBusy(false)
    }
  }
  return (
    <main className="container section-space" style={{ maxWidth: 700 }}>
      <a className="text-link" href="/">
        ← Voltar ao simpósio
      </a>
      <p className="eyebrow" style={{ marginTop: 40 }}>
        SUA INSCRIÇÃO
      </p>
      {busy && <p role="status">Consultando…</p>}
      {result && (
        <RegistrationResult
          result={result}
          onResume={() => void refresh(true)}
          busy={busy}
        />
      )}
      {accessToken && (
        <button
          className="button"
          disabled={busy}
          onClick={() => void refresh()}
        >
          Atualizar situação
        </button>
      )}
      {error && (
        <p role="alert" className="field-error">
          {error}
        </p>
      )}
      {showRecovery &&
        (sent ? (
          <p role="status">
            Se houver uma inscrição para os dados informados, enviaremos as
            instruções ao WhatsApp cadastrado. Se você perdeu acesso ao número,
            procure a organização.
          </p>
        ) : (
          <form className="registration-card" onSubmit={recover} noValidate>
            <h2>Retomar inscrição</h2>
            <p>
              Solicite um link seguro pelo WhatsApp originalmente cadastrado. O
              CPF não permite consultar os dados da inscrição diretamente.
            </p>
            <div className="field">
              <label htmlFor="recovery-cpf">CPF</label>
              <input
                id="recovery-cpf"
                inputMode="numeric"
                autoComplete="off"
                value={cpf}
                maxLength={14}
                onChange={(event) => setCpf(formatCpf(event.target.value))}
                required
              />
            </div>
            <button className="button" disabled={busy}>
              Solicitar link seguro
            </button>
          </form>
        ))}
    </main>
  )
}
