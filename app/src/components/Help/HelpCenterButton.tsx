import { useTheme } from '@hyperledger/aries-bifold-core'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceEventEmitter, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { BCWalletEventTypes } from '../../events/eventTypes'

const HelpCenterButton = () => {
  const { t } = useTranslation()
  const { ColorPallet, TextTheme } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
    },
    text: {
      ...TextTheme.label,
      color: ColorPallet.brand.headerText,
    },
  })

  const activateSlider = useCallback(() => {
    DeviceEventEmitter.emit(BCWalletEventTypes.ADD_HELP_PRESSED, true)
  }, [])

  return (
    <TouchableOpacity style={styles.container} onPress={activateSlider}>
      <Text style={styles.text}>{t('HelpCenter.Help')}</Text>
    </TouchableOpacity>
  )
}

export default HelpCenterButton
