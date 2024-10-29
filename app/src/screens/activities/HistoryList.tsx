import { Button, ButtonType, useTheme } from '@hyperledger/aries-bifold-core'
import { CustomNotification } from '@hyperledger/aries-bifold-core/App/types/notification'
import moment from 'moment'
import React, { useState, useCallback, useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import { View, Text, SectionList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import NotificationListItem, { NotificationTypeEnum } from '../../components/NotificationListItem'
import { NotificationReturnType, NotificationType } from '../../hooks/notifications'

export type SelectedHistoryType = { id: string; deleteAction?: () => void }

const iconSize = 24

const HistoryList: React.FC<{
  historyItems: NotificationReturnType | undefined
  customNotification: CustomNotification | undefined
  openSwipeableId: string | null
  handleOpenSwipeable: (id: string | null) => void
}> = ({ historyItems = [], customNotification, openSwipeableId, handleOpenSwipeable }) => {
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedHistory, setSelectedHistory] = useState<SelectedHistoryType[] | null>(null)

  const filteredItems = useMemo(() => {
    return historyItems.filter(
      (item) => 'content' in item && item.content?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [historyItems, searchQuery])

  // Memoize sections to avoid rerenders
  const sections = useMemo(() => {
    return groupHistoryByDate(filteredItems, t)
  }, [filteredItems, t])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      zIndex: 1,
    },
    sectionList: {
      flex: 1,
      paddingHorizontal: 16,
    },
    separator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.secondary,
    },
    bodyText: {
      ...TextTheme.labelSubtitle,
    },
    bodyEventTime: {
      marginTop: 8,
      color: ColorPallet.grayscale.mediumGrey,
      fontSize: 12,
    },
    sectionSeparator: {
      height: 1,
      backgroundColor: ColorPallet.brand.secondary,
      marginTop: 4,
    },
    sectionHeaderContainer: {
      marginBottom: 12,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    notificationContainer: {
      marginVertical: 16,
    },
    footerText: {
      ...TextTheme.labelSubtitle,
      color: ColorPallet.grayscale.mediumGrey,
    },
    selectionMultiActionContainer: {
      width: '100%',
      maxHeight: 200,
      position: 'absolute',
      shadowOffset: { width: 0, height: -3 },
      shadowColor: ColorPallet.grayscale.darkGrey,
      shadowOpacity: 0.1,
      shadowRadius: 5,
      bottom: 0,
      zIndex: 99,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    actionButtonContainer: {
      margin: 25,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'lightgray',
      borderWidth: 1,
      width: '92%',
      alignSelf: 'center',
      marginVertical: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      paddingHorizontal: 8,
      backgroundColor: 'white',
    },
    searchButton: {
      backgroundColor: ColorPallet.brand.primary,
      padding: 10,
      marginLeft: 8,
    },
  })

  const renderItem = useCallback(
    ({ item }: { item: NotificationType }) => {
      let notificationType: NotificationTypeEnum

      // Assign notification type based on item type
      switch (item.type) {
        case 'BasicMessageRecord':
          notificationType = NotificationTypeEnum.BasicMessage
          break
        case 'CredentialRecord':
          notificationType = item.revocationNotification
            ? NotificationTypeEnum.Revocation
            : NotificationTypeEnum.CredentialOffer
          break
        case 'ProofRecord':
          notificationType = NotificationTypeEnum.ProofRequest
          break
        case 'CustomNotification':
          notificationType = NotificationTypeEnum.Custom
          break
        default:
          notificationType = NotificationTypeEnum.BasicMessage // Fallback type
      }

      // Render NotificationListItem with appropriate type and props
      return (
        <View style={styles.notificationContainer}>
          <NotificationListItem
            openSwipeableId={openSwipeableId}
            onOpenSwipeable={handleOpenSwipeable}
            notificationType={notificationType}
            notification={item}
            customNotification={item.type === 'CustomNotification' ? customNotification : undefined}
            activateSelection={selectedHistory != null}
            selected={selectedHistory?.some((selectedItem) => selectedItem.id === item.id) ?? false}
            setSelected={() => {
              const alreadySelected = selectedHistory?.some((selectedItem) => selectedItem.id === item.id)
              setSelectedHistory(
                alreadySelected
                  ? selectedHistory?.filter((selectedItem) => selectedItem.id !== item.id) ?? null
                  : [...(selectedHistory || []), { id: item.id, deleteAction: undefined }]
              )
            }}
          />
        </View>
      )
    },
    [openSwipeableId, handleOpenSwipeable, selectedHistory, customNotification]
  )

  const renderSectionHeader = ({ section }: { section: { title: string; data: NotificationReturnType } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.bodyText, styles.bodyEventTime]}>{section.title}</Text>
      <View style={styles.sectionSeparator} />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for an item"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton}>
          <MaterialCommunityIcon name="magnify" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <SectionList
        style={styles.sectionList}
        sections={sections}
        keyExtractor={(item: NotificationType) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={
          <View style={selectedHistory != null ? { paddingBottom: 200 } : {}}>
            <Text style={[styles.footerText]}>{t('Activities.FooterNothingElse')}</Text>
          </View>
        }
      />
      {selectedHistory && (
        <View style={styles.selectionMultiActionContainer}>
          <View style={styles.actionButtonContainer}>
            <Button
              title={'Supprimer'}
              onPress={() => {
                selectedHistory.forEach((notification) => notification.deleteAction?.())
                setSelectedHistory(null)
              }}
              buttonType={ButtonType.ModalCritical}
            >
              <MaterialCommunityIcon name={'trash-can-outline'} size={iconSize} style={{ color: 'white' }} />
            </Button>
            <View style={{ height: 24 }} />
            <Button title={'Annuler'} onPress={() => setSelectedHistory(null)} buttonType={ButtonType.Secondary} />
          </View>
        </View>
      )}
    </View>
  )
}

export default HistoryList

function groupHistoryByDate(historyItems: NotificationReturnType, t: TFunction<'translation', undefined>) {
  // Explicitly type each array in groupedHistory as NotificationType[]
  const groupedHistory: {
    today: NotificationType[]
    thisWeek: NotificationType[]
    lastWeek: NotificationType[]
    older: NotificationType[]
  } = { today: [], thisWeek: [], lastWeek: [], older: [] }

  const today = moment()

  historyItems.forEach((notification) => {
    const notificationDate = moment(notification.createdAt)
    if (notificationDate.isSame(today, 'day')) groupedHistory.today.push(notification)
    else if (notificationDate.isSame(today, 'week')) groupedHistory.thisWeek.push(notification)
    else if (notificationDate.isSame(today.subtract(1, 'week'), 'week')) groupedHistory.lastWeek.push(notification)
    else groupedHistory.older.push(notification)
  })

  return [
    ...(groupedHistory.today.length ? [{ title: t('Activities.Timing.Today'), data: groupedHistory.today }] : []),
    ...(groupedHistory.thisWeek.length
      ? [{ title: t('Activities.Timing.ThisWeek'), data: groupedHistory.thisWeek }]
      : []),
    ...(groupedHistory.lastWeek.length
      ? [{ title: t('Activities.Timing.LastWeek'), data: groupedHistory.lastWeek }]
      : []),
    ...(groupedHistory.older.length ? [{ title: t('Activities.Timing.Older'), data: groupedHistory.older }] : []),
  ]
}
