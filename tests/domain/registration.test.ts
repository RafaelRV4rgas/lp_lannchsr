import { describe, expect, it } from 'vitest'
import {
  formatBrazilianPhone,
  formatCpf,
  normalizeRegistration,
  validateRegistration,
  type RegistrationInput,
} from '../../src/domain/registration'

it('formats and limits CPF and Brazilian phone input', () => {
  expect(formatCpf('52998224725')).toBe('529.982.247-25')
  expect(formatCpf('529.982.247-25999')).toBe('529.982.247-25')
  expect(formatCpf('52998')).toBe('529.98')
  expect(formatBrazilianPhone('65999991234')).toBe('(65) 99999-1234')
  expect(formatBrazilianPhone('6533331234')).toBe('(65) 3333-1234')
  expect(formatBrazilianPhone('+55 65 99999-1234')).toBe('(65) 99999-1234')
  expect(formatBrazilianPhone('65999991234999')).toBe('(65) 99999-1234')
})

export const validInput: RegistrationInput = {
  fullName: 'Pessoa de Teste',
  cpf: '529.982.247-25',
  profession: 'Médico',
  email: 'teste@example.com',
  whatsapp: '(65) 99999-1234',
  whatsappConsent: true,
}
describe('registration validation', () => {
  it('accepts valid input and normalizes it', () => {
    expect(validateRegistration(validInput)).toEqual({})
    expect(normalizeRegistration(validInput)).toMatchObject({
      cpf: '52998224725',
      whatsapp: '+5565999991234',
    })
  })
  it('rejects invalid CPF, contacts and consent', () => {
    for (const cpf of ['11111111111', '52998224724', ''])
      expect(validateRegistration({ ...validInput, cpf })).toHaveProperty('cpf')
    expect(
      validateRegistration({
        ...validInput,
        email: 'bad',
        whatsapp: '123',
        whatsappConsent: false,
      }),
    ).toMatchObject({
      email: expect.any(String),
      whatsapp: expect.any(String),
      whatsappConsent: expect.any(String),
    })
  })
  it('requires all academic fields for students of any course only', () => {
    expect(
      validateRegistration({ ...validInput, profession: 'student' }),
    ).toMatchObject({
      course: expect.any(String),
      semester: expect.any(String),
      university: expect.any(String),
    })
    expect(
      validateRegistration({
        ...validInput,
        profession: 'student',
        course: 'Direito',
        semester: '2',
        university: 'Universidade de teste',
      }),
    ).toEqual({})
    expect(
      normalizeRegistration({ ...validInput, course: 'stale' }).course,
    ).toBeUndefined()
  })
})

it('rejects semesters outside the dropdown options', () => {
  const student = {
    ...validInput,
    profession: 'student',
    course: 'Direito',
    university: 'Universidade de teste',
  }
  for (const semester of ['', 'zero', '0', '14']) {
    expect(validateRegistration({ ...student, semester })).toHaveProperty(
      'semester',
    )
  }
  expect(validateRegistration({ ...student, semester: 'outro' })).toEqual({})
})
