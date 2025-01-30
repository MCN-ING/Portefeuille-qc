import { useTheme, useStore, testIdWithKey, DispatchAction } from '@hyperledger/aries-bifold-core'
import { i18n, Locales } from '@hyperledger/aries-bifold-core/App/localization'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, Modal } from 'react-native'
import { getBuildNumber, getVersion } from 'react-native-device-info'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import SettingHeader from '../components/settings/SettingHeader'
import SettingRow from '../components/settings/SettingRow'
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
      padding: 16,
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
    },
    sectionHeader: {
      backgroundColor: SettingsTheme.groupBackground,
      flexDirection: 'row',
      alignItems: 'center',
    },
    scroll: {
      flexGrow: 1,
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
  })

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
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <SettingHeader title={t('Settings.Preference')} />
        <SettingRow
          title={t('Settings.Language')}
          testID={testIdWithKey('Language')}
          onPress={() => navigation.navigate(Screens.Language)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>{currentLanguage}</Text>
        </SettingRow>
        <SettingRow
          title={t('Settings.Tours')}
          testID={testIdWithKey('Tours')}
          onPress={() => navigation.navigate(Screens.Tours)}
          rowIcon={arrowIcon}
          style={{ marginBottom: 32 }}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>
            {store.tours.enableTours ? t('Settings.ToursActive') : t('Settings.ToursDisabled')}
          </Text>
        </SettingRow>
        <SettingHeader title={t('Settings.Security')} />
        <SettingRow
          title={t('Settings.MyPin')}
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
        </SettingRow>
        <SettingRow
          title={t('Settings.Biometrics')}
          testID={testIdWithKey('Biometrics')}
          onPress={() => navigation.navigate(Screens.UseBiometry)}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}>
            {store.preferences.useBiometry ? t('Settings.BiometricActive') : t('Settings.BiometricDisabled')}
          </Text>
        </SettingRow>
        {store.preferences.useManageEnvironment && (
          <SettingRow
            title={t('Developer.Environment')}
            testID={testIdWithKey('Environment')}
            showRowSeparator
            onPress={() => {
              setEnvironmentModalVisible(true)
            }}
          >
            <Text
              style={[TextTheme.label, { fontWeight: 'normal', color: ColorPallet.brand.link, alignSelf: 'center' }]}
            >
              {Object.keys(store.developer.environment)[0]}
            </Text>
          </SettingRow>
        )}
        <SettingRow
          title={t('Settings.Version')}
          testID={testIdWithKey('Version')}
          onPress={() => {
            incrementDeveloperMenuCounter()
          }}
          style={{ marginBottom: 32 }}
        >
          <Text style={[TextTheme.normal, { alignSelf: 'center' }]}>
            {getVersion()} {`(${getBuildNumber()})`}
          </Text>
        </SettingRow>

        {store.preferences.developerModeEnabled && <Developer />}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Settings
