import { useTheme } from '@hyperledger/aries-bifold-core'
import { i18n } from '@hyperledger/aries-bifold-core/App/localization'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState, useCallback } from 'react'
import {
  Animated,
  DeviceEventEmitter,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { itemsDataEn } from '../../assets/Index_en'
import { itemsDataFr } from '../../assets/Index_fr'
import { hitSlop } from '../../constants'
import { BCWalletEventTypes } from '../../events/eventTypes'
import { RootStackParams, Screens, Stacks } from '../../navigators/navigators'

type ItemSection = {
  title?: string
  text?: string
  visual?: ImageSourcePropType
  question?: string
  answer?: string
}

type ItemSectionType = {
  title: string
  screen: string
  content: ItemSection[]
}

const HelpListSlider: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const { ColorPallet, TextTheme } = useTheme()
  const currentLanguage = i18n.language
  const indexJs = currentLanguage === 'fr' ? itemsDataFr.centreAide.sommaire : itemsDataEn.centreAide.sommaire
  const [addHelpPressed, setAddHelpPressed] = useState<boolean>(false)
  const [localRouteName, setLocalRouteName] = useState<string>('Home')
  const [slideAnim] = useState(new Animated.Value(-500))
  const styles = StyleSheet.create({
    centeredView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'flex-start',
    },
    outsideListener: {
      height: '100%',
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
      paddingBottom: 10,
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

  const paramDataClose = {
    isActive: false,
  }

  const deactivateSlider = useCallback(() => {
    DeviceEventEmitter.emit(BCWalletEventTypes.ADD_HELP_PRESSED, paramDataClose)
  }, [])

  const goToHelpScreen = useCallback((section: ItemSectionType[], index: number) => {
    deactivateSlider()
    navigation.navigate(Stacks.HelpCenterStack, {
      screen: Screens.HelpCenterPage,
      params: { selectedSection: section, sectionNo: index },
    })
  }, [])

  useEffect(() => {
    const handle = DeviceEventEmitter.addListener(BCWalletEventTypes.ADD_HELP_PRESSED, (paramData) => {
      const { isActive, routeName } = paramData
      const newVal = isActive === undefined ? !addHelpPressed : isActive
      setAddHelpPressed(newVal)
      setLocalRouteName(routeName)
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

          <View style={styles.drawerRow}>
            <View>
              {indexJs.map((item, index) => (
                <View key={`${item.title}-${index}`}>
                  {item.sections &&
                    item.sections[0].screen === localRouteName &&
                    item.sections.map((section, indexSec) => (
                      <Pressable
                        key={`${section.title}-${indexSec}`} // Clé unique pour chaque section
                        onPress={() => goToHelpScreen(item.sections, indexSec)}
                        accessible={true}
                      >
                        <View>
                          <Text style={styles.rowTitle}>{section.title}</Text>
                        </View>
                      </Pressable>
                    ))}
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default HelpListSlider
