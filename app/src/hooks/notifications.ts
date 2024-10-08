import { AnonCredsCredentialMetadataKey } from '@credo-ts/anoncreds/build/utils/metadata'
import {
  BasicMessageRecord,
  CredentialExchangeRecord as CredentialRecord,
  CredentialState,
  ProofExchangeRecord,
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
import { ProofMetadata } from '@hyperledger/aries-bifold-verifier'
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

export interface ProofCustomMetadata {
  details_seen?: boolean
  seenOnHome?: boolean
  proof_request_template_id?: string
  delete_conn_after_seen?: boolean
}

export type NotificationsInputProps = {
  openIDUri?: string
  isHome?: boolean
}

export type NotificationReturnType = Array<
  | BasicMessageRecord
  | CredentialRecord
  | ProofExchangeRecord
  | CustomNotificationRecord
  | SdJwtVcRecord
  | W3cCredentialRecord
>

export const useNotifications = ({ openIDUri, isHome = true }: NotificationsInputProps): NotificationReturnType => {
  const { records: basicMessages } = useBasicMessages()
  const [notifications, setNotifications] = useState([])

  const credsReceived = useCredentialByState(CredentialState.CredentialReceived)
  const credsDone = useCredentialByState(CredentialState.Done)
  const proofsDone = useProofByState([ProofState.Done, ProofState.PresentationReceived])
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const proofsRequested = useProofByState(ProofState.RequestReceived)
  const openIDCredReceived = useOpenID({ openIDUri })

  const { agent } = useAgent()
  const [store] = useStore<BCState>()
  const [nonAttestationProofs, setNonAttestationProofs] = useState<ProofExchangeRecord[]>([])

  useEffect(() => {
    // get all unseen messages
    const unseenMessages: BasicMessageRecord[] = basicMessages.filter((msg) => {
      const meta = msg.metadata.get(BasicMessageMetadata.customMetadata) as basicMessageCustomMetadata
      return !meta?.seen && (!meta?.seenOnHome || !isHome)
    })

    // add one unseen message per contact to notifications
    const contactsWithUnseenMessages: string[] = []
    const messagesToShow: BasicMessageRecord[] = []
    unseenMessages.forEach((msg) => {
      if (!contactsWithUnseenMessages.includes(msg.connectionId)) {
        contactsWithUnseenMessages.push(msg.connectionId)
        messagesToShow.push(msg)
      }
    })

    const receivedOffers: CredentialRecord[] = offers.filter((offer) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = offer.metadata.get(CredentialMetadata.customMetadata) as credentialCustomMetadata
      return !metadata?.seenOnHome || !isHome
    })

    const revoked = credsDone.filter((cred: CredentialRecord) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const metadata = cred!.metadata.get(CredentialMetadata.customMetadata) as credentialCustomMetadata
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
          !(proof.metadata.data[ProofMetadata.customMetadata] as ProofCustomMetadata)?.details_seen &&
          (!(proof.metadata.data[ProofMetadata.customMetadata] as ProofCustomMetadata)?.seenOnHome || !isHome))
      )
    })

    const openIDCreds: Array<SdJwtVcRecord | W3cCredentialRecord> = []
    if (openIDCredReceived) {
      openIDCreds.push(openIDCredReceived)
    }

    const notif = [...messagesToShow, ...custom, ...receivedOffers, ...proofs, ...revoked, ...openIDCreds].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    setNotifications(isHome ? (notif.splice(0, 5) as never[]) : (notif as never[]))
  }, [
    offers,
    credsReceived,
    credsDone,
    basicMessages,
    nonAttestationProofs,
    store.attestationAuthentification.isDismissed,
    store.attestationAuthentification.isSeenOnHome,
  ])

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

  return notifications
}
