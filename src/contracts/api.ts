import type { RegistrationInput } from '../domain/registration'

export interface RegistrationClient {
  submit(
    input: RegistrationInput,
    idempotencyKey: string,
  ): Promise<{ accepted: true }>
}
