import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds/build/utils/metadata'
import {
  BasicMessageRecord,
  CredentialExchangeRecord as CredentialRecord,
  CredentialState,
  ProofExchangeRecord as ProofExchangeRecord,
  ProofState,
  SdJwtVcRecord,
  W3cCredentialRecord,
} from '@credo-ts/core'
import { useCredentialByState, useProofByState, useBasicMessages, useAgent } from '@credo-ts/react-hooks'
import { BifoldAgent, useStore } from '@hyperledger/aries-bifold-core'
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

import { attestationCredDefIds } from '../constants'
import { showPersonCredentialSelector } from '../helpers/BCIDHelper'
import { isProofRequestingAttestation } from '../services/attestation'
import { BCState } from '../store'

interface CustomNotification {
  type: 'CustomNotification'
  createdAt: Date
  id: string
}

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

// Shared variable for history notifications
let historyNotifications: NotificationReturnType = []

// Shared function to prepare the notifications list
const fetchNotifications = (
  basicMessages: BasicMessageRecord[],
  offers: CredentialRecord[],
  credsReceived: CredentialRecord[],
  credsDone: CredentialRecord[],
  proofsDone: ProofExchangeRecord[],
  proofsRequested: ProofExchangeRecord[],
  openIDCredReceived: SdJwtVcRecord | W3cCredentialRecord | null,
  nonAttestationProofs: ProofExchangeRecord[],
  store: BCState,
  isHome: boolean
): NotificationReturnType => {
  const unseenMessages: BasicMessageRecord[] = basicMessages.filter((msg) => {
    const meta = msg.metadata.get(BasicMessageMetadata.customMetadata) as BasicMessageCustomMetadata
    return !meta?.seen && (!meta?.seenOnHome || !isHome)
  })

  const contactsWithUnseenMessages: string[] = []
  const messagesToShow: BasicMessageRecord[] = []
  unseenMessages.forEach((msg) => {
    if (!contactsWithUnseenMessages.includes(msg.connectionId)) {
      contactsWithUnseenMessages.push(msg.connectionId)
      messagesToShow.push(msg)
    }
  })

  const receivedOffers: CredentialRecord[] = offers.filter((offer) => {
    const metadata = offer.metadata.get(CredentialMetadata.customMetadata) as CredentialCustomMetadata
    return !metadata?.seenOnHome || !isHome
  })

  const revoked = credsDone.filter((cred: CredentialRecord) => {
    const metadata = cred!.metadata.get(CredentialMetadata.customMetadata) as CredentialCustomMetadata
    if (
      cred?.revocationNotification &&
      metadata?.revoked_seen == undefined &&
      (metadata?.seenOnHome == undefined || !isHome)
    ) {
      return cred
    }
  })

  const credentials = [...credsDone, ...credsReceived]
  const credentialDefinitionIDs = credentials.map(
    (c) => c.metadata.data[AnonCredsCredentialMetadataKey].credentialDefinitionId as string
  )

  const invitationDate = new Date(store.attestationAuthentification.createdAt)
  const custom: CustomNotification[] =
    showPersonCredentialSelector(credentialDefinitionIDs) &&
    !store.attestationAuthentification.isDismissed &&
    (!store.attestationAuthentification.isSeenOnHome || !isHome)
      ? [
          {
            id: store.attestationAuthentification.id,
            type: store.attestationAuthentification.type as 'CustomNotification',
            createdAt: invitationDate,
          },
        ]
      : []

  const proofs = nonAttestationProofs.filter((proof) => {
    return (
      ![ProofState.Done, ProofState.PresentationReceived].includes(proof.state) ||
      (proof.isVerified !== undefined &&
        !(proof.metadata.data[ProofMetadata.customMetadata] as CustomMetadata)?.details_seen &&
        (!(proof.metadata.data[ProofMetadata.customMetadata] as CustomMetadata)?.seenOnHome || !isHome))
    )
  })

  const openIDCreds: Array<SdJwtVcRecord | W3cCredentialRecord> = []
  if (openIDCredReceived) {
    openIDCreds.push(openIDCredReceived)
  }

  const notif = [...messagesToShow, ...custom, ...receivedOffers, ...proofs, ...revoked, ...openIDCreds].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Log the initial notifications before any filtering is applied
  //console.log("Initial notifications (unfiltered):", notif)

  return notif
}

export const useNotifications = ({ openIDUri, isHome = true }: NotificationsInputProps): NotificationReturnType => {
  const { records: basicMessages } = useBasicMessages()
  const [notifications, setNotifications] = useState<NotificationReturnType>([])

  const credsReceived = useCredentialByState(CredentialState.CredentialReceived)
  const credsDone = useCredentialByState(CredentialState.Done)
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived])
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const proofsRequested = useProofByState(ProofState.RequestReceived)

  // Ensure openIDCredReceived is either an SdJwtVcRecord | W3cCredentialRecord or null
  const openIDCredReceived = useOpenID({ openIDUri }) ?? null

  const { agent } = useAgent()
  const [store] = useStore<BCState>()
  const [nonAttestationProofs, setNonAttestationProofs] = useState<ProofExchangeRecord[]>([])

  useEffect(() => {
    Promise.all(
      [...proofsRequested, ...proofsDone].map(async (proof: ProofExchangeRecord) => {
        const isAttestation = await isProofRequestingAttestation(proof, agent as BifoldAgent, attestationCredDefIds)
        return {
          value: proof,
          include: !isAttestation,
        }
      })
    ).then((val) => setNonAttestationProofs(val.filter((v) => v.include).map((data) => data.value)))
  }, [proofsRequested, proofsDone])

  useEffect(() => {
    const notif = fetchNotifications(
      basicMessages,
      offers,
      credsReceived,
      credsDone,
      proofsDone,
      proofsRequested,
      openIDCredReceived,
      nonAttestationProofs,
      store,
      isHome
    )

    // Set historyNotifications as the full, unfiltered list
    historyNotifications = notif.slice()

    // Filter for notifications as per isHome and set state
    setNotifications(isHome ? notif.slice(0, 5) : notif)

    // Remove filtered notifications from historyNotifications to retain the initial list minus filtered items
    historyNotifications = historyNotifications.filter((item) => !notifications.includes(item))

    // Log the filtered notifications in `useNotifications`
    //console.log("Filtered notifications:", notifications)
    //console.log("Updated historyNotifications:", historyNotifications)
  }, [
    offers,
    credsReceived,
    credsDone,
    basicMessages,
    nonAttestationProofs,
    store.attestationAuthentification.isDismissed,
    store.attestationAuthentification.isSeenOnHome,
  ])

  return notifications
}

export const useHistoryNotifications = (): NotificationReturnType => {
  // Log the history notifications when accessed
  //console.log("History notifications:", historyNotifications)
  return historyNotifications
}
