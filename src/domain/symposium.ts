export interface SymposiumRules {
  startsAt: string
  timeZone: string | null
  requestsOpen: boolean
  basePriceCents: number | null
  studentPriceCents: number
  backendReady: boolean
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

export function canOpenRequests(rules: SymposiumRules): boolean {
  if (
    !validDate(rules.startsAt) ||
    !rules.timeZone ||
    rules.basePriceCents === null ||
    !rules.backendReady
  )
    return false
  try {
    new Intl.DateTimeFormat('pt-BR', { timeZone: rules.timeZone }).format()
    calculatePriceCents(
      rules.basePriceCents,
      rules.studentPriceCents,
      true,
    )
    return true
  } catch {
    return false
  }
}

export const requestsAvailable = (rules: SymposiumRules): boolean =>
  rules.requestsOpen && canOpenRequests(rules)

export const formatPrice = (cents: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    cents / 100,
  )
