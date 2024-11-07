import { Button, ButtonType, useTheme } from '@hyperledger/aries-bifold-core'
import { CustomRecord, HistoryRecord } from '@hyperledger/aries-bifold-core/App/modules/history/types'
import { useFocusEffect } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HistoryListItem from '../../components/HistoryListItem'
import { ActivitiesStackParams, Screens } from '../../navigators/navigators'
import { TabTheme } from '../../theme'

export type SelectedHistoryType = { id: string; deleteAction?: () => void }

const iconSize = 24

// Function to group history items by date
const groupHistoryByDate = (historyItems: CustomRecord[], t: (key: string) => string) => {
  const groupedHistory: {
    today: CustomRecord[]
    thisWeek: CustomRecord[]
    lastWeek: CustomRecord[]
    older: CustomRecord[]
  } = {
    today: [],
    thisWeek: [],
    lastWeek: [],
    older: [],
  }

  historyItems.forEach((item) => {
    const itemDate = moment(item.content.createdAt)
    const today = moment()

    if (itemDate.isSame(today, 'day')) {
      groupedHistory.today.push(item)
    } else if (itemDate.isSame(today, 'week')) {
      groupedHistory.thisWeek.push(item)
    } else if (itemDate.isSame(today.subtract(1, 'week'), 'week')) {
      groupedHistory.lastWeek.push(item)
    } else {
      groupedHistory.older.push(item)
    }
  })

  const sections = []
  if (groupedHistory.today.length > 0) {
    sections.push({ title: t('Activities.Timing.Today'), data: groupedHistory.today })
  }
  if (groupedHistory.thisWeek.length > 0) {
    sections.push({ title: t('Activities.Timing.ThisWeek'), data: groupedHistory.thisWeek })
  }
  if (groupedHistory.lastWeek.length > 0) {
    sections.push({ title: t('Activities.Timing.LastWeek'), data: groupedHistory.lastWeek })
  }
  if (groupedHistory.older.length > 0) {
    sections.push({ title: t('Activities.Timing.Older'), data: groupedHistory.older })
  }

  return sections
}

const HistoryList: React.FC<{
  historyRecords: CustomRecord[]
  openSwipeableId: string | null
  handleOpenSwipeable: (id: string | null) => void
  navigation: StackNavigationProp<ActivitiesStackParams>
}> = ({ historyRecords, openSwipeableId, handleOpenSwipeable, navigation }) => {
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const [filteredRecords, setFilteredRecords] = useState<CustomRecord[]>(historyRecords)
  const [sections, setSections] = useState<{ title: string; data: CustomRecord[] }[]>([])
  const [selectedHistory, setSelectedHistory] = useState<SelectedHistoryType[] | null>(null)

  // Refresh data when screen gains focus
  useFocusEffect(
    useCallback(() => {
      setFilteredRecords(historyRecords)
    }, [historyRecords])
  )

  useEffect(() => {
    setSections(groupHistoryByDate(filteredRecords, t))
  }, [filteredRecords])

  useEffect(() => {
    if (selectedHistory != null) {
      navigation?.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    } else {
      navigation?.getParent()?.setOptions({ tabBarStyle: { display: 'flex', ...TabTheme.tabBarStyle } })
    }
  }, [selectedHistory])

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
    historyContainer: {
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
  })

  const handleDelete = (id: string) => {
    setFilteredRecords((prevRecords) => prevRecords.filter((record) => record.content.id !== id))
  }

  const handleViewDetails = (item: CustomRecord) => {
    navigation.navigate(Screens.HistoryDetail, { item })
  }

  const renderItem = useCallback(
    ({ item }: { item: CustomRecord }) => (
      <View style={styles.historyContainer}>
        <HistoryListItem
          item={item}
          selected={(selectedHistory?.filter((selected) => selected.id === item?.content.id)?.length ?? 0) > 0}
          setSelected={(item) => {
            if ((selectedHistory?.filter((selected) => selected.id === item.id)?.length ?? 0) > 0) {
              setSelectedHistory(selectedHistory?.filter((selected) => selected.id !== item.id) ?? [])
              return
            }
            setSelectedHistory([...(selectedHistory || []), item])
          }}
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          activateSelection={selectedHistory != null}
          onDelete={handleDelete}
          onViewDetails={() => handleViewDetails(item)}
        />
      </View>
    ),
    [selectedHistory, openSwipeableId, handleOpenSwipeable]
  )

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.bodyText, styles.sectionSeparator]}>{section.title}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <SectionList
        style={styles.sectionList}
        sections={sections}
        keyExtractor={(item: CustomRecord) => (item.content as HistoryRecord).id || Math.random().toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderSectionHeader={renderSectionHeader}
        ListFooterComponent={
          <View style={selectedHistory != null && { paddingBottom: 200 }}>
            <Text style={styles.footerText}>{t('Activities.FooterNothingElse')}</Text>
          </View>
        }
      />
      {selectedHistory != null && (
        <View style={styles.selectionMultiActionContainer}>
          <View style={styles.actionButtonContainer}>
            <Button
              title={t('Global.Remove')}
              onPress={() => {
                selectedHistory.forEach((history) => history.deleteAction?.())
                setSelectedHistory(null)
              }}
              buttonType={ButtonType.ModalCritical}
            >
              <MaterialCommunityIcon name={'trash-can-outline'} size={iconSize} style={{ color: 'white' }} />
            </Button>
            <View style={{ height: 24 }} />
            <Button
              title={t('Global.Cancel')}
              onPress={() => setSelectedHistory(null)}
              buttonType={ButtonType.Secondary}
            />
          </View>
        </View>
      )}
    </View>
  )
}

export default HistoryList
