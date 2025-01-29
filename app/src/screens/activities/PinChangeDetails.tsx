import { useAgent } from '@credo-ts/react-hooks'
import { TOKENS, useServices, useTheme } from '@hyperledger/aries-bifold-core'
import { formatTime } from '@hyperledger/aries-bifold-core/App/utils/helpers'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import HeaderText from '../../components/HeaderText'
import useHistoryDetailPageStyles from '../../hooks/useHistoryDetailPageStyles'
import { HistoryStackParams, Screens } from '../../navigators/navigators'
import { handleDeleteHistoryWithConfirmation } from '../../utils/historyUtils'

type PinChangeDetailsProp = StackScreenProps<HistoryStackParams, Screens.PinChangeDetails>

const PinChangeDetails: React.FC<PinChangeDetailsProp> = ({ route, navigation }) => {
  const { TextTheme } = useTheme()
  const { item } = route.params
  const { t } = useTranslation()
  const { agent } = useAgent()
  const [loadHistory] = useServices([TOKENS.FN_LOAD_HISTORY])
  const styles = useHistoryDetailPageStyles()

  const modifiedDate = item?.content.createdAt
    ? formatTime(item.content.createdAt, { includeHour: true })
    : t('Record.InvalidDate')

  const iconSize = 24

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.contentContainer, styles.headerStyle]}>
        <HeaderText title={t('History.CardDescription.WalletPinUpdated')} />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.date}>
          {t('Date.ModifiedOn')} {modifiedDate}
        </Text>
      </ScrollView>

      <View style={styles.lineSeparator} />

      <TouchableOpacity
        style={styles.deleteContainer}
        onPress={() => handleDeleteHistoryWithConfirmation(item.content.id ?? '', agent, loadHistory, t, navigation)}
        accessibilityRole="button"
        accessibilityLabel={t('History.Button.DeleteHistory')}
      >
        <MaterialCommunityIcon
          name={'trash-can-outline'}
          size={iconSize}
          style={styles.trashIcon}
          accessibilityRole="image"
          accessibilityLabel={t('History.Icon.Delete')}
        />
        <Text style={[TextTheme.normal, styles.deleteText]}>{t('History.Button.DeleteHistory')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default PinChangeDetails
