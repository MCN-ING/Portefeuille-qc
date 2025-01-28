import {
  Button,
  ButtonType,
  DispatchAction,
  EventTypes,
  OnboardingStackParams,
  Screens,
  TOKENS,
  testIdWithKey,
  useAnimatedComponents,
  useAuth,
  useServices,
  useStore,
  useTheme,
} from '@hyperledger/aries-bifold-core'
import { HistoryCardType, HistoryRecord } from '@hyperledger/aries-bifold-core/App/modules/history/types'
import PINEnter, { PINEntryUsage } from '@hyperledger/aries-bifold-core/App/screens/PINEnter'
import { useAppAgent } from '@hyperledger/aries-bifold-core/App/utils/agent'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Switch,
  ScrollView,
  Pressable,
  DeviceEventEmitter,
  Linking,
  Platform,
} from 'react-native'
import { PERMISSIONS, RESULTS, request, check, PermissionStatus } from 'react-native-permissions'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderText from '../components/HeaderText'
import Progress from '../components/Progress'
import { CustomModal, CustomModalProps } from '../components/modals/CustomModal'

enum UseBiometryUsage {
  InitialSetup,
  ToggleOnOff,
}

type SettingsPopup = Pick<CustomModalProps, 'title' | 'description' | 'primary' | 'secondary' | 'onDismissPressed'>

const UseBiometry: React.FC = () => {
  const [store, dispatch] = useStore()
  const { agent } = useAppAgent()
  const { t } = useTranslation()
  const [{ enablePushNotifications }, logger, historyManagerCurried, historyEnabled, historyEventsLogger] = useServices(
    [TOKENS.CONFIG, TOKENS.UTIL_LOGGER, TOKENS.FN_LOAD_HISTORY, TOKENS.HISTORY_ENABLED, TOKENS.HISTORY_EVENTS_LOGGER]
  )
  const { isBiometricsActive, commitPIN, disableBiometrics } = useAuth()
  const [biometryAvailable, setBiometryAvailable] = useState(false)
  const [biometryEnabled, setBiometryEnabled] = useState(store.preferences.useBiometry)
  const [continueEnabled, setContinueEnabled] = useState(true)
  const [settingsPopupConfig, setSettingsPopupConfig] = useState<null | SettingsPopup>(null)
  const [canSeeCheckPIN, setCanSeeCheckPIN] = useState<boolean>(false)
  const { ColorPallet, TextTheme } = useTheme()
  const { ButtonLoading } = useAnimatedComponents()
  const navigation = useNavigation<StackNavigationProp<OnboardingStackParams>>()
  const screenUsage = useMemo(() => {
    return store.onboarding.didCompleteOnboarding ? UseBiometryUsage.ToggleOnOff : UseBiometryUsage.InitialSetup
  }, [store.onboarding.didCompleteOnboarding])

  const BIOMETRY_PERMISSION = PERMISSIONS.IOS.FACE_ID

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 20,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    image: {
      minWidth: 200,
      minHeight: 200,
      marginBottom: 66,
    },
    useToUnlockContainer: {
      flexShrink: 1,
      marginRight: 10,
      justifyContent: 'center',
    },
    biometryAvailableGap: {
      rowGap: 16,
    },
  })

  useEffect(() => {
    isBiometricsActive().then((result) => {
      setBiometryAvailable(result)
    })
  }, [isBiometricsActive])

  useEffect(() => {
    if (screenUsage === UseBiometryUsage.InitialSetup) {
      return
    }

    if (biometryEnabled) {
      commitPIN(biometryEnabled).then(() => {
        dispatch({
          type: DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled],
        })
      })
    } else {
      disableBiometrics().then(() => {
        dispatch({
          type: DispatchAction.USE_BIOMETRY,
          payload: [biometryEnabled],
        })
      })
    }
  }, [screenUsage, biometryEnabled, commitPIN, disableBiometrics, dispatch])

  const logHistoryRecord = useCallback(
    (type: HistoryCardType) => {
      try {
        if (!(agent && historyEnabled)) {
          logger.trace(
            `[${UseBiometry.name}]:[logHistoryRecord] Skipping history log, either history function disabled or agent undefined!`
          )
          return
        }
        const historyManager = historyManagerCurried(agent)

        /** Save history record for card accepted */
        const recordData: HistoryRecord = {
          type: type,
          message: type,
          createdAt: new Date(),
        }
        historyManager.saveHistory(recordData)
      } catch (err: unknown) {
        logger.error(`[${UseBiometry.name}]:[logHistoryRecord] Error saving history: ${err}`)
      }
    },
    [agent, historyEnabled, logger, historyManagerCurried]
  )

  const continueTouched = useCallback(async () => {
    setContinueEnabled(false)

    await commitPIN(biometryEnabled)

    dispatch({
      type: DispatchAction.USE_BIOMETRY,
      payload: [biometryEnabled],
    })
    if (enablePushNotifications) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: Screens.UsePushNotifications }],
        })
      )
    } else {
      dispatch({ type: DispatchAction.DID_COMPLETE_ONBOARDING, payload: [true] })
    }
  }, [biometryEnabled, commitPIN, dispatch, enablePushNotifications, navigation])

  const onOpenSettingsDismissed = () => {
    setSettingsPopupConfig(null)
  }

  const onOpenSettingsTouched = async () => {
    await Linking.openSettings()
    onOpenSettingsDismissed()
  }

  const onOpenRootSettingsTouch = async () => {
    if (Platform.OS === 'ios') {
      await Linking.openURL('App-Prefs:')
    } else if (Platform.OS === 'android') {
      await Linking.sendIntent('android.settings.SETTINGS')
    }
    onOpenSettingsDismissed()
  }

  const logBiometryChange = useCallback(
    (enabled: boolean) => {
      if (
        store.onboarding.didAgreeToTerms &&
        store.onboarding.didConsiderBiometry &&
        historyEventsLogger.logToggleBiometry
      ) {
        const type = enabled ? HistoryCardType.ActivateBiometry : HistoryCardType.DeactivateBiometry
        logHistoryRecord(type)
      }
    },
    [store.onboarding.didAgreeToTerms, store.onboarding.didConsiderBiometry]
  )

  const onAuthenticationComplete = useCallback(
    (status: boolean) => {
      // If successfully authenticated the toggle may proceed.
      if (status) {
        setBiometryEnabled((previousState) => {
          const newState = !previousState
          logBiometryChange(newState)
          return newState
        })
      }
      DeviceEventEmitter.emit(EventTypes.BIOMETRY_UPDATE, false)
      setCanSeeCheckPIN(false)
    },
    [
      historyEventsLogger.logToggleBiometry,
      logHistoryRecord,
      store.onboarding.didAgreeToTerms,
      store.onboarding.didConsiderBiometry,
    ]
  )

  const onSwitchToggleAllowed = useCallback(
    (newValue: boolean) => {
      if (screenUsage === UseBiometryUsage.ToggleOnOff) {
        if (newValue) {
          setCanSeeCheckPIN(true)
        } else {
          onAuthenticationComplete(!newValue)
        }
        DeviceEventEmitter.emit(EventTypes.BIOMETRY_UPDATE, true)
      } else {
        setBiometryEnabled(newValue)
      }
    },
    [
      screenUsage,
      historyEventsLogger.logToggleBiometry,
      logHistoryRecord,
      store.onboarding.didAgreeToTerms,
      store.onboarding.didConsiderBiometry,
    ]
  )

  const onRequestSystemBiometrics = useCallback(
    async (newToggleValue: boolean) => {
      const permissionResult: PermissionStatus = await request(BIOMETRY_PERMISSION)
      switch (permissionResult) {
        case RESULTS.GRANTED:
        case RESULTS.LIMITED:
        case RESULTS.UNAVAILABLE:
          // Granted
          onSwitchToggleAllowed(newToggleValue)
          break
        default:
          break
      }
    },
    [onSwitchToggleAllowed, BIOMETRY_PERMISSION]
  )

  const onCheckSystemBiometrics = useCallback(async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      // Android doesn't need to prompt biometric permission
      // for an app to use it.
      return biometryAvailable ? RESULTS.GRANTED : RESULTS.UNAVAILABLE
    } else if (Platform.OS === 'ios') {
      return await check(BIOMETRY_PERMISSION)
    }

    return RESULTS.UNAVAILABLE
  }, [biometryAvailable, BIOMETRY_PERMISSION])

  const toggleSwitch = useCallback(async () => {
    const newValue = !biometryEnabled

    if (!newValue) {
      // Turning off doesn't require OS'es biometrics enabled
      onSwitchToggleAllowed(newValue)
      return
    }

    // If the user is turning it on, they need
    // to first authenticate the OS'es biometrics before this action is accepted
    const permissionResult: PermissionStatus = await onCheckSystemBiometrics()
    switch (permissionResult) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        // Already granted
        onSwitchToggleAllowed(newValue)
        break
      case RESULTS.BLOCKED:
        // Previously denied
        setSettingsPopupConfig({
          title: t('Biometry.BiometryBlocked'),
          description: t('Biometry.BiometryBlockedDesc'),
          primary:
            Platform.OS === 'ios' ? { label: t('Global.GoToSettings'), action: onOpenSettingsTouched } : undefined,
          secondary: { label: t('Global.Close'), action: onOpenSettingsDismissed },
          onDismissPressed: onOpenSettingsDismissed,
        })
        break
      case RESULTS.DENIED:
      case RESULTS.UNAVAILABLE:
        // Has not been requested
        if (!biometryAvailable) {
          setSettingsPopupConfig({
            title: t('Biometry.BiometryDisabled'),
            description: t('Biometry.SetupBiometricsDesc'),
            primary: { label: t('Global.GoToSettings'), action: onOpenRootSettingsTouch },
            secondary: { label: t('Global.Close'), action: onOpenSettingsDismissed },
            onDismissPressed: onOpenSettingsDismissed,
          })
          return
        }
        await onRequestSystemBiometrics(newValue)
        break
      default:
        break
    }
  }, [onSwitchToggleAllowed, onRequestSystemBiometrics, onCheckSystemBiometrics, biometryEnabled, t])

  const showHeader = store.onboarding.didAgreeToTerms && !store.onboarding.didConsiderBiometry
  const inBiometryScreenFromSettings = store.onboarding.didAgreeToTerms && store.onboarding.didConsiderBiometry

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      {settingsPopupConfig && (
        <CustomModal
          title={settingsPopupConfig.title}
          description={settingsPopupConfig.description}
          primary={
            settingsPopupConfig.primary && {
              label: settingsPopupConfig.primary.label,
              action: settingsPopupConfig.primary.action,
            }
          }
          secondary={
            settingsPopupConfig.secondary && {
              label: settingsPopupConfig.secondary.label,
              action: settingsPopupConfig.secondary.action,
            }
          }
          onDismissPressed={onOpenSettingsDismissed}
        />
      )}
      {showHeader && (
        <View style={{ marginTop: 25 }}>
          <View style={{ marginHorizontal: 50 }}>
            <Progress progressPercent={100} progressText={t('Biometry.ProgressBarText')} progressFill="primary" />
          </View>
        </View>
      )}
      <ScrollView style={styles.container}>
        <HeaderText title={!inBiometryScreenFromSettings ? t('Screens.Biometry') : t('Screens.UseBiometry')} />
        <View style={{ marginTop: 20 }}>
          {biometryAvailable ? (
            <View style={styles.biometryAvailableGap}>
              <Text style={TextTheme.normal}>{t('Biometry.EnabledText1')}</Text>
              <Text style={TextTheme.normal}>
                {t('Biometry.EnabledText2')}
                <Text style={TextTheme.bold}> {t('Biometry.Warning')}</Text>
              </Text>
            </View>
          ) : (
            <View style={styles.biometryAvailableGap}>
              <Text style={TextTheme.normal}>{t('Biometry.NotEnabledText1')}</Text>
              <Text style={TextTheme.normal}>{t('Biometry.NotEnabledText2')}</Text>
            </View>
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 20,
          }}
        >
          <View style={styles.useToUnlockContainer}>
            <Text style={TextTheme.bold}>{t('Biometry.UseToUnlock')}</Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Pressable
              testID={testIdWithKey('ToggleBiometrics')}
              accessible
              accessibilityHint={
                biometryEnabled ? t('Biometry.BiometryHintDeactivate') : t('Biometry.BiometryHintActivate')
              }
              accessibilityLabel={biometryEnabled ? t('Biometry.On') : t('Biometry.Off')}
              accessibilityState={{
                selected: biometryEnabled,
              }}
              accessibilityRole={'togglebutton'}
            >
              <Switch
                trackColor={{ false: ColorPallet.grayscale.lightGrey, true: ColorPallet.brand.primaryDisabled }}
                thumbColor={biometryEnabled ? ColorPallet.brand.primary : ColorPallet.grayscale.mediumGrey}
                ios_backgroundColor={ColorPallet.grayscale.lightGrey}
                onValueChange={toggleSwitch}
                value={biometryEnabled}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <View style={{ marginTop: 'auto', margin: 20 }}>
        {store.onboarding.didCompleteOnboarding || (
          <Button
            title={t('Global.Continue')}
            accessibilityLabel={t('Global.Continue')}
            testID={testIdWithKey('Continue')}
            onPress={continueTouched}
            buttonType={ButtonType.Primary}
            disabled={!continueEnabled}
          >
            {!continueEnabled && <ButtonLoading />}
          </Button>
        )}
      </View>
      <Modal
        style={{ backgroundColor: ColorPallet.brand.primaryBackground }}
        visible={canSeeCheckPIN}
        onRequestClose={() => setCanSeeCheckPIN(false)}
        transparent={false}
        animationType={'slide'}
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={{ flex: 1 }}>
          <PINEnter
            usage={PINEntryUsage.PINCheck}
            setAuthenticated={onAuthenticationComplete}
            onCancelAuth={setCanSeeCheckPIN}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}

export default UseBiometry
