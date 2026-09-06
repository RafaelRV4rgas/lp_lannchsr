import { describe, expect, it } from 'vitest'
import {
  normalizeRegistration,
  validateRegistration,
  type RegistrationInput,
} from '../../src/domain/registration'

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
