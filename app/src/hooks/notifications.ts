import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds'
import {
  BasicMessageRecord,
  CredentialExchangeRecord as CredentialRecord,
  CredentialState,
  ProofExchangeRecord as ProofExchangeRecord,
  ProofState,
  SdJwtVcRecord,
  W3cCredentialRecord,
} from '@credo-ts/core'
import { useCredentialByState, useProofByState, useBasicMessages } from '@credo-ts/react-hooks'
import { useStore } from '@hyperledger/aries-bifold-core'
import { useOpenID } from '@hyperledger/aries-bifold-core/App/modules/openid/hooks/openid'
import {
  BasicMessageMetadata,
  CredentialMetadata,
  basicMessageCustomMetadata,
  credentialCustomMetadata,
} from '@hyperledger/aries-bifold-core/App/types/metadata'
import { CustomNotificationRecord } from '@hyperledger/aries-bifold-core/App/types/notification'
import { ProofCustomMetadata, ProofMetadata } from '@hyperledger/aries-bifold-verifier'
import { useEffect, useState } from 'react'

import { showPersonCredentialSelector } from '../helpers/BCIDHelper'
import { BCState } from '../store'

export interface CustomMetadata extends ProofCustomMetadata {
  seenOnHome?: boolean
}

export interface BasicMessageCustomMetadata extends basicMessageCustomMetadata {
  seenOnHome?: boolean
}

export interface CredentialCustomMetadata extends credentialCustomMetadata {
  seenOnHome?: boolean
}

export type NotificationsInputProps = {
  openIDUri?: string
  isHome?: boolean
}

export type NotificationType =
  | BasicMessageRecord
  | CredentialRecord
  | ProofExchangeRecord
  | CustomNotificationRecord
  | SdJwtVcRecord
  | W3cCredentialRecord

export type NotificationReturnType = Array<NotificationType>

// Shared function to prepare the notifications list
function filterNotifications(
  initialNotifications: NotificationReturnType,
  isHome: boolean,
  store: BCState
): { notifications: NotificationReturnType; historique: NotificationReturnType } {
  const notifications: NotificationReturnType = []
  const historique: NotificationReturnType = []

  initialNotifications.forEach((notif) => {
    let metadata

    // Vérifie les Basic Messages
    if (notif instanceof BasicMessageRecord) {
      metadata = notif.metadata.get(BasicMessageMetadata.customMetadata) as BasicMessageCustomMetadata
      if (!metadata?.seen && (!metadata?.seenOnHome || !isHome)) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }

    // Vérifie les Credential Offers
    else if (notif instanceof CredentialRecord && notif.state === CredentialState.OfferReceived) {
      metadata = notif.metadata.get(CredentialMetadata.customMetadata) as CredentialCustomMetadata
      if (!metadata?.seenOnHome || !isHome) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }

    // Vérifie les Credentials complétés ou révoqués
    else if (notif instanceof CredentialRecord && notif.state === CredentialState.Done) {
      metadata = notif.metadata.get(CredentialMetadata.customMetadata) as CredentialCustomMetadata
      if (notif.revocationNotification && !metadata?.revoked_seen && (!metadata?.seenOnHome || !isHome)) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }

    // Vérifie les Custom Notifications
    else if ('type' in notif && notif.type === 'CustomNotification') {
      const credentialDefinitionIDs = initialNotifications
        .filter((c) => 'metadata' in c && c.metadata)
        .map((c) => (c as CredentialRecord).metadata.data[AnonCredsCredentialMetadataKey]?.credentialDefinitionId)

      if (
        showPersonCredentialSelector(credentialDefinitionIDs) &&
        !store.attestationAuthentification.isDismissed &&
        (!store.attestationAuthentification.isSeenOnHome || !isHome)
      ) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }

    // Vérifie les Proofs
    else if (notif instanceof ProofExchangeRecord) {
      metadata = notif.metadata.get(ProofMetadata.customMetadata) as CustomMetadata
      if (
        ![ProofState.Done, ProofState.PresentationReceived].includes(notif.state) ||
        (notif.isVerified !== undefined && !metadata?.details_seen && (!metadata?.seenOnHome || !isHome))
      ) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }

    // Vérifie les OpenID Credentials
    else if (notif instanceof SdJwtVcRecord || notif instanceof W3cCredentialRecord) {
      const metadata = notif.metadata.get(CredentialMetadata.customMetadata) as CredentialCustomMetadata | undefined
      if (metadata && 'seenOnHome' in metadata && (!metadata.seenOnHome || !isHome)) {
        notifications.push(notif)
      } else {
        historique.push(notif)
      }
    }
  })

  return { notifications, historique }
}

export const useNotifications = ({ openIDUri, isHome = true }: NotificationsInputProps): NotificationReturnType => {
  const { records: basicMessages } = useBasicMessages()
  const credsReceived = useCredentialByState(CredentialState.CredentialReceived)
  const credsDone = useCredentialByState(CredentialState.Done)
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived])
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const openIDCredReceived = useOpenID({ openIDUri })

  const [store] = useStore<BCState>()
  const [nonAttestationProofs] = useState<ProofExchangeRecord[]>([])
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationReturnType>([])

  useEffect(() => {
    const initialNotifications = [
      ...basicMessages,
      ...credsReceived,
      ...credsDone,
      ...proofsDone,
      ...offers,
      ...nonAttestationProofs,
      openIDCredReceived,
    ].filter(Boolean) as NotificationReturnType

    const { notifications } = filterNotifications(initialNotifications, isHome, store)
    setFilteredNotifications(notifications.splice(0, 5) as NotificationReturnType)
  }, [
    basicMessages,
    credsReceived,
    credsDone,
    proofsDone,
    offers,
    nonAttestationProofs,
    openIDCredReceived,
    store,
    isHome,
  ])

  return filteredNotifications
}

export const useHistoryNotifications = ({
  openIDUri,
  isHome = false,
}: NotificationsInputProps): NotificationReturnType => {
  const { records: basicMessages } = useBasicMessages()
  const credsReceived = useCredentialByState(CredentialState.CredentialReceived)
  const credsDone = useCredentialByState(CredentialState.Done)
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived])
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const openIDCredReceived = useOpenID({ openIDUri })

  const [store] = useStore<BCState>()
  const [nonAttestationProofs] = useState<ProofExchangeRecord[]>([])
  const [historique, setHistorique] = useState<NotificationReturnType>([])

  useEffect(() => {
    const initialNotifications = [
      ...basicMessages,
      ...credsReceived,
      ...credsDone,
      ...proofsDone,
      ...offers,
      ...nonAttestationProofs,
      openIDCredReceived,
    ].filter(Boolean) as NotificationReturnType

    const { historique } = filterNotifications(initialNotifications, isHome, store)
    setHistorique(historique)
  }, [
    basicMessages,
    credsReceived,
    credsDone,
    proofsDone,
    offers,
    nonAttestationProofs,
    openIDCredReceived,
    store,
    isHome,
  ])
  return historique
}
