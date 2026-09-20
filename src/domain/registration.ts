export interface RegistrationInput {
  fullName: string
  cpf: string
  profession: string
  course?: string
  semester?: string
  university?: string
  email: string
  whatsapp: string
  whatsappConsent: boolean
}
export type RegistrationErrors = Partial<
  Record<keyof RegistrationInput, string>
>
export const digitsOnly = (value: string): string => value.replace(/\D/g, '')

export function formatCpf(value: string): string {
  const digits = digitsOnly(value).slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export function formatBrazilianPhone(value: string): string {
  const raw = digitsOnly(value)
  const digits = (raw.length > 11 && raw.startsWith('55') ? raw.slice(2) : raw)
    .slice(0, 11)
  if (digits.length <= 2) return digits ? `(${digits}` : ''
  const ddd = digits.slice(0, 2)
  const number = digits.slice(2)
  const prefixLength = digits.length === 11 ? 5 : 4
  if (number.length <= prefixLength) return `(${ddd}) ${number}`
  return `(${ddd}) ${number.slice(0, prefixLength)}-${number.slice(prefixLength)}`
}
export const semesterOptions = [
  ...Array.from({ length: 12 }, (_, index) => ({
    value: String(index + 1),
    label: `${index + 1}º semestre`,
  })),
  { value: 'outro', label: 'Outros' },
]

export function validCpf(value: string): boolean {
  const digits = digitsOnly(value)
  if (!/^\d{11}$/.test(digits) || /^(\d)\1{10}$/.test(digits)) return false
  for (const length of [9, 10]) {
    const sum = [...digits.slice(0, length)].reduce(
      (total, digit, i) => total + Number(digit) * (length + 1 - i),
      0,
    )
    const check = ((sum * 10) % 11) % 10
    if (check !== Number(digits[length])) return false
  }
  return true
}

export function normalizeRegistration(
  input: RegistrationInput,
): RegistrationInput {
  const phone = digitsOnly(input.whatsapp)
  const student = input.profession === 'student'
  return {
    fullName: input.fullName.trim().replace(/\s+/g, ' '),
    cpf: digitsOnly(input.cpf),
    profession: input.profession.trim(),
    email: input.email.trim().toLowerCase(),
    whatsapp: `+${phone.length <= 11 ? '55' : ''}${phone}`,
    whatsappConsent: input.whatsappConsent,
    ...(student
      ? {
          course: input.course?.trim(),
          semester: input.semester?.trim(),
          university: input.university?.trim(),
        }
      : {}),
  }
}

export function validateRegistration(
  input: RegistrationInput,
): RegistrationErrors {
  const data = normalizeRegistration(input)
  const errors: RegistrationErrors = {}
  if (
    data.fullName.length < 3 ||
    data.fullName.length > 160 ||
    data.fullName.split(' ').length < 2
  )
    errors.fullName = 'Informe seu nome completo.'
  if (!validCpf(data.cpf)) errors.cpf = 'Informe um CPF válido.'
  if (!data.profession || data.profession.length > 100)
    errors.profession = 'Selecione sua profissão.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    errors.email = 'Informe um e-mail válido.'
  if (!/^\+55[1-9]{2}(?:9\d{8}|[2-5]\d{7})$/.test(data.whatsapp))
    errors.whatsapp = 'Informe um número brasileiro com DDD.'
  if (data.whatsappConsent !== true)
    errors.whatsappConsent = 'Autorize o envio das mensagens da inscrição.'
  if (data.profession === 'student') {
    if (!data.course || data.course.length > 160)
      errors.course = 'Informe seu curso.'
    if (!semesterOptions.some((option) => option.value === data.semester))
      errors.semester = 'Selecione seu semestre.'
    if (!data.university || data.university.length > 160)
      errors.university = 'Informe sua universidade.'
  }
  return errors
}
