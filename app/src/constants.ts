import { CredentialExchangeRecord, ProofExchangeRecord, ConnectionRecord } from '@aries-framework/core'

export const PINValidationRules = {
  only_numbers: true,
  min_length: 6,
  max_length: 6,
  no_repeated_numbers: 3,
  no_repetition_of_the_two_same_numbers: false,
  no_series_of_numbers: true,
  no_even_or_odd_series_of_numbers: false,
  no_cross_pattern: false,
}
export const hitSlop = { top: 44, bottom: 44, left: 44, right: 44 }

export type records = CredentialExchangeRecord | ProofExchangeRecord | ConnectionRecord
export type lookBack = 'day' | 'week' | 'month' | 'year' | 'all'
export type HistoryActionstype = 'CredentialRecord' | 'ProofRecord' | 'ConnectionRecord'
