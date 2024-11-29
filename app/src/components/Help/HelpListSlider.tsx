import { useTheme } from '@hyperledger/aries-bifold-core'
import { i18n } from '@hyperledger/aries-bifold-core/App/localization'
import React, { useEffect, useState, useCallback } from 'react'
import { Animated, DeviceEventEmitter, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { itemsDataEn } from '../../assets/Index_en'
import { itemsDataFr } from '../../assets/Index_fr'
import { hitSlop } from '../../constants'
import { BCWalletEventTypes } from '../../events/eventTypes'

const AddCredentialSlider: React.FC = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const currentLanguage = i18n.language
  const indexJs = currentLanguage === 'fr' ? itemsDataFr.centreAide.sommaire : itemsDataEn.centreAide.sommaire
  const [addHelpPressed, setAddHelpPressed] = useState<boolean>(false)

  const [slideAnim] = useState(new Animated.Value(-500))
  const styles = StyleSheet.create({
    centeredView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'flex-start', // Aligner vers le haut
    },
    outsideListener: {
      height: '100%',
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.white,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20, // Arrondir le bas du modal
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    drawerTitleText: {
      ...TextTheme.normal,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    drawerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 12,
    },
    drawerRowItem: {
      color: ColorPallet.grayscale.black,
    },
  })

  const deactivateSlider = useCallback(() => {
    DeviceEventEmitter.emit(BCWalletEventTypes.ADD_HELP_PRESSED, false)
  }, [])

  useEffect(() => {
    const handle = DeviceEventEmitter.addListener(BCWalletEventTypes.ADD_HELP_PRESSED, (value?: boolean) => {
      const newVal = value === undefined ? !addHelpPressed : value
      setAddHelpPressed(newVal)
    })

    return () => {
      handle.remove()
    }
  }, [])

  useEffect(() => {
    if (addHelpPressed) {
      // Animer le modal depuis le haut
      Animated.timing(slideAnim, {
        toValue: 0, // Déplacement vers le bas (0 = position finale)
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      // Animer le modal vers le haut (hors de l'écran)
      Animated.timing(slideAnim, {
        toValue: -500, // Position hors de l'écran
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [addHelpPressed])

  return (
    <Modal transparent={true} visible={addHelpPressed} onRequestClose={deactivateSlider}>
      <TouchableOpacity style={styles.outsideListener} onPress={deactivateSlider} />
      <View style={styles.centeredView}>
        <Animated.View
          style={[
            styles.modalView,
            { transform: [{ translateY: slideAnim }] }, // Animation de translation du modal
          ]}
        >
          <TouchableOpacity
            testID="close-modal"
            accessibilityLabel="Close"
            accessibilityRole={'button'}
            onPress={deactivateSlider}
            hitSlop={hitSlop}
          >
            <Icon name="window-close" size={35} style={styles.drawerRowItem}></Icon>
          </TouchableOpacity>

          <TouchableOpacity style={styles.drawerRow}>
            <View>
              {indexJs.map((item, index) => (
                <View key={index}></View>
              ))}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default AddCredentialSlider
