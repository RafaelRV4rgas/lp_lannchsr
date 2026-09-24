export interface SymposiumRules {
  registrationClosesAt: string
  timeZone: string | null
  basePriceCents: number | null
  studentPriceCents: number
}

export function calculatePriceCents(
  base: number,
  studentPrice: number,
  student: boolean,
): number {
  if (
    !Number.isSafeInteger(base) ||
    base <= 0 ||
    !Number.isSafeInteger(studentPrice) ||
    studentPrice <= 0
  )
    throw new Error('INVALID_PRICE')
  return student ? studentPrice : base
}

function validDate(value: string): boolean {
  if (
    !value ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(value) ||
    !Number.isFinite(Date.parse(value))
  )
    return false
  const [year, month, day] = value.slice(0, 10).split('-').map(Number)
  const calendar = new Date(Date.UTC(year, month - 1, day))
  return (
    calendar.getUTCFullYear() === year &&
    calendar.getUTCMonth() === month - 1 &&
    calendar.getUTCDate() === day
  )
}

export function requestsAvailable(
  rules: SymposiumRules,
  now: Date = new Date(),
): boolean {
  if (!validDate(rules.registrationClosesAt) || !Number.isFinite(now.getTime()))
    return false
  return now.getTime() < Date.parse(rules.registrationClosesAt)
}

export const formatPrice = (cents: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    cents / 100,
  )
