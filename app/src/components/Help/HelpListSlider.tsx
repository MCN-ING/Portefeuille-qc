import { useTheme } from '@hyperledger/aries-bifold-core'
import { i18n } from '@hyperledger/aries-bifold-core/App/localization'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useEffect, useState, useCallback } from 'react'
import { Animated, DeviceEventEmitter, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { itemsDataEn } from '../../assets/Index_en'
import { itemsDataFr } from '../../assets/Index_fr'
import { hitSlop } from '../../constants'
import { BCWalletEventTypes } from '../../events/eventTypes'
import { RootStackParams, Screens, Stacks } from '../../navigators/navigators'

const HelpListSlider: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const { ColorPallet, TextTheme } = useTheme()
  const currentLanguage = i18n.language
  const indexJs = currentLanguage === 'fr' ? itemsDataFr.centreAide.sommaire : itemsDataEn.centreAide.sommaire
  const [addHelpPressed, setAddHelpPressed] = useState<boolean>(false)
  const [localRouteName, setLocalRouteName] = useState<string>('Home')

  const [slideAnim] = useState(new Animated.Value(200))
  const styles = StyleSheet.create({
    centeredView: {
      position: 'absolute',
      top: 0, // Position initiale du modal
      left: 0,
      right: 0,
      justifyContent: 'flex-start',
      zIndex: 2,
    },
    outsideListener: {
      position: 'absolute',
      top: 400,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
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
      textAlign: 'left',
      width: '100%',
      maxWidth: '100%',
    },
    modalView: {
      backgroundColor: ColorPallet.grayscale.white,
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      shadowColor: '#000',
      padding: 20,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '100%',
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
      alignItems: 'flex-start',
      marginVertical: 12,
      flexWrap: 'wrap',
    },
    drawerRowItem: {
      color: ColorPallet.brand.primary,
    },
  })
  const paramDataClose = {
    isActive: false,
  }
  const deactivateSlider = useCallback(() => {
    DeviceEventEmitter.emit(BCWalletEventTypes.ADD_HELP_PRESSED, paramDataClose)
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
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 300,
        useNativeDriver: true,
      }).start()
    }
  }, [addHelpPressed])

  function hasTitle(item: { title: string } | { question: string }): item is { title: string } {
    return (item as { title: string }).title !== undefined
  }
  function validateScreen(screen: string, routeName: string) {
    const tblScreen = screen.split(' ').map((item) => item.trim())
    for (let i = 0; i < tblScreen.length; i++) {
      if (tblScreen[i] === routeName) {
        return true
      }
    }
    return false // Si aucune correspondance n'est trouvée
  }
  return (
    <Modal transparent={true} visible={addHelpPressed} onRequestClose={deactivateSlider}>
      <TouchableOpacity style={styles.outsideListener} onPress={deactivateSlider} hitSlop={hitSlop} />
      <View style={styles.centeredView}>
        <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
          <View>
            {indexJs.map((sectionItem, index) => (
              <View key={index}>
                {sectionItem.sections.map((section, indexSect) => (
                  <View key={indexSect}>
                    {section.content.map((contentItem, indexContent) => (
                      <View key={indexContent}>
                        {validateScreen(contentItem.screen, localRouteName) && (
                          <TouchableOpacity
                            style={styles.drawerRow}
                            onPress={() => {
                              deactivateSlider()
                              navigation.navigate(Stacks.HelpCenterStack, {
                                screen: Screens.HelpCenterPage,
                                params: {
                                  selectedSection: sectionItem.sections,
                                  sectionNo: indexSect,
                                  titleParam: contentItem.title,
                                },
                              })
                            }}
                            accessible={true}
                          >
                            <Text style={{ ...styles.drawerRowItem, marginLeft: 5 }}>
                              {hasTitle(contentItem) && contentItem.title}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default HelpListSlider
