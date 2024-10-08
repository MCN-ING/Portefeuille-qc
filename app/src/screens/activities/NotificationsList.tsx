import {
  BasicMessageRecord,
  CredentialExchangeRecord,
  ProofExchangeRecord,
  SdJwtVcRecord,
  W3cCredentialRecord,
} from '@credo-ts/core'
import { useTheme } from '@hyperledger/aries-bifold-core'
import { CustomNotification, CustomNotificationRecord } from '@hyperledger/aries-bifold-core/App/types/notification'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'

import NotificationListItem, { NotificationType } from '../../components/NotificationListItem'
import { NotificationReturnType } from '../../hooks/notifications'

// TODO: Mettre ça dans Notification et l'exporter
type NotificationRecord =
  | BasicMessageRecord
  | CredentialExchangeRecord
  | ProofExchangeRecord
  | SdJwtVcRecord
  | W3cCredentialRecord
  | CustomNotificationRecord

// Function to group notifications by date
const groupNotificationsByDate = (notifications: NotificationReturnType) => {
  const groupedNotifications: { [key: string]: NotificationReturnType } = {
    today: [],
    thisWeek: [],
    lastWeek: [],
    older: [],
  }

  notifications.forEach((notification) => {
    const notificationDate = moment(notification.createdAt)
    const today = moment()

    if (notificationDate.isSame(today, 'day')) {
      groupedNotifications.today.push(notification)
    } else if (notificationDate.isSame(today, 'week')) {
      groupedNotifications.thisWeek.push(notification)
    } else if (notificationDate.isSame(today.subtract(1, 'week'), 'week')) {
      groupedNotifications.lastWeek.push(notification)
    } else {
      groupedNotifications.older.push(notification)
    }
  })

  const sections = []

  if (groupedNotifications.today.length > 0) {
    sections.push({ title: "Aujourd'hui", data: groupedNotifications.today })
  }
  if (groupedNotifications.thisWeek.length > 0) {
    sections.push({ title: 'Cette semaine', data: groupedNotifications.thisWeek })
  }
  if (groupedNotifications.lastWeek.length > 0) {
    sections.push({ title: 'La semaine dernière', data: groupedNotifications.lastWeek })
  }
  if (groupedNotifications.older.length > 0) {
    sections.push({ title: 'Plus ancien', data: groupedNotifications.older })
  }

  return sections
}

type sectionType = { title: string; data: NotificationReturnType }

const NotificationsList: React.FC<{
  notifications: NotificationReturnType
  customNotification: CustomNotification | undefined
  openSwipeableId: string | null
  handleOpenSwipeable: (id: string | null) => void
}> = ({ notifications, customNotification, openSwipeableId, handleOpenSwipeable }) => {
  const [setions, setSections] = useState<sectionType[]>([])
  const { ColorPallet, TextTheme } = useTheme()

  useEffect(() => {
    setSections(groupNotificationsByDate(notifications as NotificationReturnType))
  }, [notifications])

  const styles = StyleSheet.create({
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
      marginVertical: 8,
    },
    bodyText: {
      fontSize: TextTheme.labelTitle.fontSize,
      fontWeight: TextTheme.labelTitle.fontWeight,
      color: TextTheme.labelTitle.color,
    },
    bodyEventTime: {
      marginVertical: 8,
      color: ColorPallet.grayscale.mediumGrey,
      fontSize: 12,
    },
    sectionSeparator: {
      height: 1,
      backgroundColor: ColorPallet.grayscale.lightGrey,
      marginTop: 4,
    },
    sectionHeaderContainer: {
      marginBottom: 12,
    },
    notificationContainer: {
      marginTop: 12,
    },
  })

  const renderItem = useCallback(
    ({ item }: { item: NotificationRecord }) => {
      let component = null

      if (item.type === 'BasicMessageRecord') {
        component = (
          <NotificationListItem
            openSwipeableId={openSwipeableId}
            onOpenSwipeable={handleOpenSwipeable}
            notificationType={NotificationType.BasicMessage}
            notification={item}
          />
        )
      } else if (item.type === 'CredentialRecord') {
        let notificationType = NotificationType.CredentialOffer
        if (item.revocationNotification) {
          notificationType = NotificationType.Revocation
        }
        component = (
          <NotificationListItem
            openSwipeableId={openSwipeableId}
            onOpenSwipeable={handleOpenSwipeable}
            notificationType={notificationType}
            notification={item}
          />
        )
      } else if (item.type === 'CustomNotification' && customNotification) {
        component = (
          <NotificationListItem
            openSwipeableId={openSwipeableId}
            onOpenSwipeable={handleOpenSwipeable}
            notificationType={NotificationType.Custom}
            notification={item}
            customNotification={customNotification}
          />
        )
      } else {
        component = (
          <NotificationListItem
            openSwipeableId={openSwipeableId}
            onOpenSwipeable={handleOpenSwipeable}
            notificationType={NotificationType.ProofRequest}
            notification={item}
          />
        )
      }

      return (
        <View style={styles.notificationContainer}>
          {component}
          <View style={styles.separator} />
        </View>
      )
    },
    [openSwipeableId, handleOpenSwipeable]
  )

  const renderSectionHeader = ({ section }: { section: sectionType }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.bodyText, styles.bodyEventTime]}>{section.title}</Text>
      <View style={styles.sectionSeparator} />
    </View>
  )

  return (
    <SectionList
      sections={setions}
      keyExtractor={(item: NotificationRecord) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={<Text style={[styles.bodyText, styles.bodyEventTime]}>Il n'y a rien d'autre</Text>}
    />
  )
}

export default NotificationsList
