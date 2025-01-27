import { useTheme, useStore, testIdWithKey, DispatchAction } from '@hyperledger/aries-bifold-core'
import { i18n, Locales } from '@hyperledger/aries-bifold-core/App/localization'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, AccessibilityRole } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { Screens, SettingStackParams, Stacks } from '../navigators/navigators'
import { BCState } from '../store'

import Developer from './Developer'
import IASEnvironment from './IASEnvironment'

type SettingsProps = StackScreenProps<SettingStackParams>

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const { SettingsTheme, TextTheme, ColorPallet } = useTheme()
  const [store, dispatch] = useStore<BCState>()
  const currentLanguage = i18n.t('Language.code', { context: i18n.language as Locales })
  const developerOptionCount = useRef(0)
  const [environmentModalVisible, setEnvironmentModalVisible] = useState<boolean>(false)
  const { t } = useTranslation()

  const touchCountToEnableBiometrics = 9
  const iconSize = 30

  const shouldDismissModal = () => {
    setEnvironmentModalVisible(false)
  }

  const incrementDeveloperMenuCounter = () => {
    if (developerOptionCount.current >= touchCountToEnableBiometrics) {
      developerOptionCount.current = 0
      dispatch({
        type: DispatchAction.ENABLE_DEVELOPER_MODE,
        payload: [true],
      })

      return
    }

    developerOptionCount.current = developerOptionCount.current + 1
  }

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    mainSection: {
      flex: 5,
    },
    textHeaderTitle: {
      ...TextTheme.headingThree,
      flexShrink: 1,
      color: TextTheme.headingThree.color,
      paddingTop: 8,
      paddingBottom: 8,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      alignItems: 'center',
      paddingVertical: 12,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
      paddingBottom: 0,
    },
    scroll: {
      flexGrow: 1,
      paddingHorizontal: 20,
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.secondary,
      marginTop: 10,
    },
  })
  const SectionHeader = ({ title }: { title: string }): JSX.Element => (
    <View style={[styles.section, styles.sectionHeader]}>
      <Text style={[TextTheme.headingThree, { flexShrink: 1 }]} accessibilityRole="header">
        {title}
      </Text>
    </View>
  )
  interface SectionRowProps {
    title: string
    accessibilityRole?: AccessibilityRole
    testID?: string
    children: JSX.Element
    showRowSeparator?: boolean
    subContent?: JSX.Element
    onPress?: () => void
    rowIcon?: JSX.Element
  }
  const SectionRow = ({
    title,
    accessibilityRole = undefined,
    testID,
    onPress,
    children,
    showRowSeparator,
    subContent,
    rowIcon,
  }: SectionRowProps) => (
    <View style={showRowSeparator && styles.rowSeparator}>
      <TouchableOpacity testID={testID} onPress={onPress} accessibilityRole={accessibilityRole}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.rowTitle}>{title}</Text>

            {children}

            {rowIcon}
          </View>
          {subContent}
        </View>
      </TouchableOpacity>
    </View>
  )
  const arrowIcon = (
    <MaterialIcon name={'keyboard-arrow-right'} size={iconSize} accessible={false} accessibilityLabel="" />
  )
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Modal
        visible={environmentModalVisible}
        transparent={false}
        animationType={'slide'}
        onRequestClose={() => {
          return
        }}
      >
        <IASEnvironment shouldDismissModal={shouldDismissModal} />
      </Modal>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionHeader title={t('Settings.Preference')} />
        <SectionRow
          title={t('Settings.Language')}
          accessibilityRole="button"
          testID={testIdWithKey('Language')}
          onPress={() => navigation.navigate(Screens.Language)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>{currentLanguage}</Text>
        </SectionRow>
        <SectionRow
          title={t('Settings.Tours')}
          accessibilityRole="button"
          testID={testIdWithKey('Tours')}
          onPress={() => navigation.navigate(Screens.Tours)}
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>
            {store.tours.enableTours ? t('Settings.ToursActive') : t('Settings.ToursDisabled')}
          </Text>
        </SectionRow>
        <SectionHeader title={t('Settings.Security')} />
        <SectionRow
          title={t('Settings.MyPin')}
          accessibilityRole="button"
          testID={testIdWithKey('MyPin')}
          onPress={() =>
            navigation
              .getParent()
              ?.navigate(Stacks.SettingsStack, { screen: Screens.CreatePIN, params: { updatePin: true } })
          }
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>{t('Settings.ChangePin')}</Text>
        </SectionRow>
        <SectionRow
          title={t('Settings.Biometrics')}
          accessibilityRole="button"
          testID={testIdWithKey('Biometrics')}
          onPress={() => navigation.navigate(Screens.UseBiometry)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>
            {store.preferences.useBiometry ? t('Settings.BiometricActive') : t('Settings.BiometricDisabled')}
          </Text>
        </SectionRow>
        {store.preferences.useManageEnvironment && (
          <SectionRow
            title={t('Developer.Environment')}
            accessibilityRole="button"
            testID={testIdWithKey('Environment')}
            showRowSeparator={true}
            onPress={() => {
              setEnvironmentModalVisible(true)
            }}
          >
            <Text
              style={[TextTheme.label, { fontWeight: 'normal', color: ColorPallet.brand.link, alignSelf: 'center' }]}
            >
              {Object.keys(store.developer.environment)[0]}
            </Text>
          </SectionRow>
        )}
        <SectionRow
          title={t('Settings.Version')}
          testID={testIdWithKey('Version')}
          onPress={() => {
            incrementDeveloperMenuCounter()
          }}
        >
          <Text style={[TextTheme.normal, { alignSelf: 'center' }]}>
            {getVersion()} {`(${getBuildNumber()})`}
          </Text>
        </SectionRow>

        {store.preferences.developerModeEnabled && <Developer />}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
