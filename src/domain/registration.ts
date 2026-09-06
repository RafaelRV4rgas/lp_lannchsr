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
    if (!data.semester || data.semester.length > 40)
      errors.semester = 'Informe seu semestre.'
    if (!data.university || data.university.length > 160)
      errors.university = 'Informe sua universidade.'
  }
  return errors
}
