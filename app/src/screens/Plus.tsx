import { useTheme, Button, ButtonType, testIdWithKey, Screens, TabStacks } from '@hyperledger/aries-bifold-core'
import { HomeStackParams } from '@hyperledger/aries-bifold-core/App/types/navigators'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import CalendarImg from '../assets/img/calendar-empty.svg'
import ClockImg from '../assets/img/clock.svg'
import PhoneImg from '../assets/img/telephone.svg'

const Plus: React.FC = () => {
  const { ColorPallet, TextTheme } = useTheme()
  const { t } = useTranslation()
  const { navigate } = useNavigation<StackNavigationProp<HomeStackParams>>()

  const styles = StyleSheet.create({
    container: {
      height: '77%',
      padding: 20,
      marginBottom: 20,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    textHeaderTitle: {
      ...TextTheme.headingThree,
      flexShrink: 1,
      color: TextTheme.headingThree.color,
      paddingTop: 8,
      paddingBottom: 8,
    },
    textSectionTitle: {
      ...TextTheme.title,
      flexShrink: 1,
      color: TextTheme.bold.color,
      paddingTop: 8,
      paddingBottom: 8,
    },
    button: {
      marginTop: 10,
      marginBottom: 10,
    },
    section: {
      paddingVertical: 12,
    },
    sectionJoin: {
      paddingVertical: 12,
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center', // Aligne les éléments verticalement
      height: 40, // Hauteur du conteneur (si nécessaire)
    },
    sectionDoubleRow: {
      paddingTop: 10,
      flexDirection: 'row',
      alignItems: 'flex-start', // Aligne l'image et le texte en haut

      height: 100, // Hauteur du conteneur (si nécessaire)
    },
    phoneImage: {
      width: 24, // Ajustez la largeur de l'image
      height: 24, // Ajustez la hauteur de l'image
      // marginRight: 10, // Espace entre l'image et le texte
    },
    sectionDescription: {
      ...TextTheme.normal,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
      marginLeft: 10,
    },
  })

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <ScrollView style={styles.container}>
        <View style={styles.button}>
          <Button
            buttonType={ButtonType.Secondary}
            testID={testIdWithKey('AppParams')}
            accessibilityLabel={t('OptionsPlus.ButtonParamsApp')}
            title={t('OptionsPlus.ButtonParamsApp')}
            onPress={() => navigate(TabStacks.HomeStack as never, { screen: Screens.Home } as never)}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            buttonType={ButtonType.Secondary}
            testID={testIdWithKey('HelpCenter')}
            accessibilityLabel={t('OptionsPlus.ButtonHelpCenter')}
            title={t('ptionsPlus.ButtonHelpCenter')}
            onPress={() => navigate(TabStacks.HomeStack as never, { screen: Screens.Home } as never)}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            buttonType={ButtonType.Secondary}
            testID={testIdWithKey('StartProcess')}
            accessibilityLabel={t('OptionsPlus.ButtonAbout')}
            title={t('ptionsPlus.ButtonAbout')}
            onPress={() => navigate(TabStacks.HomeStack as never, { screen: Screens.Home } as never)}
          ></Button>
        </View>
        <View style={styles.sectionJoin}>
          <Text style={styles.textHeaderTitle}> {t('OptionsPlus.TitleSupport')}</Text>
          <Text style={styles.sectionDescription}> {t('OptionsPlus.DetailSupport')}</Text>
        </View>
        <View style={styles.sectionJoin}>
          <Text style={styles.textSectionTitle}> {t('OptionsPlus.JoinUsTitle')}</Text>
        </View>
        <View style={styles.sectionRow}>
          <CalendarImg />
          <Text style={styles.sectionDescription}> {t('OptionsPlus.DaysOpen')}</Text>
        </View>
        <View style={styles.sectionRow}>
          <ClockImg />
          <Text style={styles.sectionDescription}> {t('OptionsPlus.OpeningHours')}</Text>
        </View>
        <View style={styles.sectionDoubleRow}>
          <PhoneImg style={styles.phoneImage} />
          <Text style={styles.sectionDescription}>
            {' '}
            {t('OptionsPlus.PhoneNumber')}
            {'\n'}
            {t('OptionsPlus.TollFreeNumber')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Plus
