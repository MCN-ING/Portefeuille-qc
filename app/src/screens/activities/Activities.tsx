import { useAgent } from '@credo-ts/react-hooks'
import { TOKENS, useServices, useTheme } from '@hyperledger/aries-bifold-core'
import { CustomRecord, RecordType, HistoryCardType } from '@hyperledger/aries-bifold-core/App/modules/history/types'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Toast from 'react-native-toast-message'

import { ActivitiesStackParams } from '../../navigators/navigators'

import HistoryList from './HistoryList'
import NotificationsList from './NotificationsList'

const NotificationTab = 'Notifications'
const HistoryTab = 'Historique'

export type ActivitiesProps = {
  navigation: StackNavigationProp<ActivitiesStackParams>
}

const Activities: React.FC<ActivitiesProps> = ({ navigation }) => {
  const [openSwipeableId, setOpenSwipeableId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState(NotificationTab)
  const [historyRecords, setHistoryRecords] = useState<CustomRecord[]>([])

  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()
  const { agent } = useAgent()

  // Load services
  const [{ customNotificationConfig: customNotification, useNotifications }] = useServices([TOKENS.NOTIFICATIONS])
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const notifications = useNotifications({ isHome: false } as NotificationsInputProps)

  useEffect(() => {
    const addSampleHistoryRecords = async () => {
      const historyManager = agent ? loadHistory(agent) : undefined
      if (historyManager) {
        const sampleRecords = [
          {
            type: HistoryCardType.CardAccepted,
            message: 'Attestation offer accepted',
            createdAt: new Date(),
            correspondenceId: 'attestation-123',
            correspondenceName: 'Government Ministry',
          },
          {
            type: HistoryCardType.CardDeclined,
            message: 'Attestation offer declined',
            createdAt: new Date(),
            correspondenceId: 'attestation-456',
            correspondenceName: 'Health Department',
          },
          {
            type: HistoryCardType.InformationSent,
            message: 'Presentation information shared',
            createdAt: new Date(),
            correspondenceId: 'presentation-789',
            correspondenceName: 'Finance Authority',
          },
          {
            type: HistoryCardType.PinChanged,
            message: 'Wallet PIN updated',
            createdAt: new Date(),
            correspondenceId: 'security-update',
            correspondenceName: 'Digital Wallet',
          },
        ]

        try {
          for (const record of sampleRecords) {
            await historyManager.saveHistory(record)
          }
        } catch (error) {
          Toast.show({
            type: 'error',
            text1: t('Error'),
            text2: 'Could not save sample history records.',
          })
        }
      }
    }

    if (activeTab === HistoryTab) {
      addSampleHistoryRecords()
    }
  }, [activeTab, agent])

  // Load history records
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyManager = agent ? loadHistory(agent) : undefined

        if (historyManager) {
          const records = await historyManager.getHistoryItems({ type: RecordType.HistoryRecord })
          records.sort((a, b) => Number(b.content.createdAt) - Number(a.content.createdAt))
          setHistoryRecords(records)
        } else {
          Toast.show({
            type: 'info',
            text1: t('Info'),
            text2: 'History manager not loaded or agent is undefined.',
          })
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t('Error'),
          text2: 'Could not fetch history records.',
        })
      }
    }

    if (activeTab === HistoryTab && agent) {
      fetchHistory()
    }
  }, [activeTab, agent])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 16,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    tabHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      gap: 8,
      borderBottomColor: ColorPallet.brand.secondary,
      marginBottom: 16,
      marginHorizontal: 16,
      alignItems: 'center',
      maxHeight: 70,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingBottom: 8,
      paddingHorizontal: 8,
      borderBottomWidth: 4,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomWidth: 4,
      borderBottomColor: ColorPallet.brand.primary,
    },
    tabText: {
      ...TextTheme.labelTitle,
    },
    activeTabText: {
      color: ColorPallet.brand.primary,
    },
    tabContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  return (
    <View style={styles.container}>
      {/* Tab-like Header */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === NotificationTab && styles.activeTab]}
          onPress={() => setActiveTab(NotificationTab)}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, activeTab === NotificationTab && styles.activeTabText]}>
              {t('Screens.Notifications')}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === HistoryTab && styles.activeTab]}
          onPress={() => setActiveTab(HistoryTab)}
        >
          <Text style={[styles.tabText, activeTab === HistoryTab && styles.activeTabText]}>{t('Screens.History')}</Text>
        </TouchableOpacity>
      </View>

      {activeTab === NotificationTab ? (
        <NotificationsList
          openSwipeableId={openSwipeableId}
          handleOpenSwipeable={setOpenSwipeableId}
          navigation={navigation}
        />
      ) : (
        <HistoryList
          historyRecords={historyRecords}
          openSwipeableId={openSwipeableId}
          handleOpenSwipeable={setOpenSwipeableId}
          navigation={navigation}
        />
      )}
    </View>
  )
}

export default Activities
