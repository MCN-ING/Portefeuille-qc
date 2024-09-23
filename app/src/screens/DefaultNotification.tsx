import {
  useTheme,
  Button,
  ButtonType,
  testIdWithKey,
  Screens,
  NotificationStackParams,
} from '@hyperledger/aries-bifold-core'
import { StackScreenProps } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import HeaderText from '../components/HeaderText'

type DefaultProps = StackScreenProps<NotificationStackParams, Screens.CustomNotification>

const DefaultNotification: React.FC<DefaultProps> = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    container: {
      height: '100%',
      padding: 20,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    pageContainer: {
      marginBottom: 20,
    },
    textHeaderTitle: {
      ...TextTheme.headingThree,
      flexShrink: 1,
      color: TextTheme.headingThree.color,
    },
    textSectionTitle: {
      ...TextTheme.title,
      flexShrink: 1,
      color: TextTheme.bold.color,
    },
    button: {
      margin: 15,
      marginTop: 24,
      marginBottom: 20,
    },
    section: {
      paddingVertical: 12,
      paddingHorizontal: 10,
    },
    sectionDescription: {
      ...TextTheme.normal,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
      paddingTop: 8,
    },
    sectionDescriptionTitle: {
      ...TextTheme.normal,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
      paddingTop: 32,
    },
  })

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <HeaderText title={t('DefaultNotificationPage.Title')} />
          <Text style={styles.sectionDescriptionTitle}> {t('DefaultNotificationPage.Description')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textSectionTitle}>{t('DefaultNotificationPage.SAGConnexion')}</Text>
          <Text style={styles.sectionDescription}> {t('DefaultNotificationPage.SAGConnexionDescription')}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.textSectionTitle}>{t('DefaultNotificationPage.ANIGRequest')}</Text>
          <Text style={styles.sectionDescription}> {t('DefaultNotificationPage.ANIGAcceptDescription')}</Text>
        </View>
        <View style={styles.button}>
          <Button
            buttonType={ButtonType.Primary}
            testID={testIdWithKey('StartProcess')}
            accessibilityLabel={t('DefaultNotificationPage.ButtonTitle')}
            title={t('DefaultNotificationPage.ButtonTitle')}
          ></Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DefaultNotification
