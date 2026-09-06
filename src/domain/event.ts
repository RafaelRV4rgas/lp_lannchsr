export interface EventRules {
  startsAt: string | null
  timeZone: string | null
  registrationsOpen: boolean
  basePriceCents: number | null
  studentDiscountPercent: number
  capacity: number
  reservationEnabled: boolean | null
  integrationsReady: boolean
}

export const defaultEventRules: Readonly<EventRules> = Object.freeze({
  startsAt: null,
  timeZone: null,
  registrationsOpen: false,
  basePriceCents: null,
  studentDiscountPercent: 10,
  capacity: 2000,
  reservationEnabled: null,
  integrationsReady: false,
})

export function calculatePriceCents(
  base: number,
  discount: number,
  student: boolean,
): number {
  if (
    !Number.isSafeInteger(base) ||
    base <= 0 ||
    !Number.isInteger(discount) ||
    discount < 0 ||
    discount >= 100
  )
    throw new Error('INVALID_PRICE')
  const price = student
    ? Number((BigInt(base) * BigInt(100 - discount) + 50n) / 100n)
    : base
  if (price < 1) throw new Error('INVALID_PRICE')
  return price
}

function validDate(value: string | null): boolean {
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

export function canOpenRegistrations(rules: EventRules): boolean {
  if (
    !validDate(rules.startsAt) ||
    !rules.timeZone ||
    rules.basePriceCents === null ||
    typeof rules.reservationEnabled !== 'boolean' ||
    !rules.integrationsReady ||
    !Number.isSafeInteger(rules.capacity) ||
    rules.capacity <= 0
  )
    return false
  try {
    new Intl.DateTimeFormat('pt-BR', { timeZone: rules.timeZone }).format()
    calculatePriceCents(
      rules.basePriceCents,
      rules.studentDiscountPercent,
      true,
    )
    return true
  } catch {
    return false
  }
}

export const registrationsAvailable = (rules: EventRules): boolean =>
  rules.registrationsOpen && canOpenRegistrations(rules)
export const formatPrice = (cents: number): string =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    cents / 100,
  )
