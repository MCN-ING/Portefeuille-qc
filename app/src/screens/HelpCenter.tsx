import { useTheme, testIdWithKey } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import ContactUs from '../components/ContactUs'

const HelpCenter: React.FC = () => {
  const { SettingsTheme, TextTheme, ColorPallet } = useTheme()
  const { t } = useTranslation()
  const iconSize = 30

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
      paddingTop: 24,
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
    },
    sectionSeparator: {
      marginBottom: 10,
    },
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.brand.secondary,
      marginTop: 10,
    },
    sectionCopyright: {
      flex: 1,
      justifyContent: 'flex-end',
      ...TextTheme.headingOne,
      margin: 10,
    },
    sectionCopyrightText: {
      ...TextTheme.caption,
      color: TextTheme.normal.color,
      textAlign: 'left',
      textDecorationLine: 'none',
      marginLeft: 10,
    },
  })

  const SectionHeader = ({ title }: { title: string }): JSX.Element => (
    <>
      <View style={[styles.section, styles.sectionHeader]}>
        <Text style={[TextTheme.headingThree, { flexShrink: 1 }]}>{title}</Text>
      </View>
    </>
  )
  interface SectionRowProps {
    title: string
    accessibilityLabel?: string
    testID?: string
    children: JSX.Element
    showRowSeparator?: boolean
    subContent?: JSX.Element
    onPress?: () => void
    rowIcon?: JSX.Element
  }
  const SectionRow = ({
    title,
    accessibilityLabel,
    testID,
    onPress,
    children,
    showRowSeparator,
    subContent,
    rowIcon,
  }: SectionRowProps) => (
    <>
      <View style={[styles.section]}>
        <Pressable
          onPress={onPress}
          accessible={true}
          accessibilityLabel={accessibilityLabel}
          testID={testID}
          style={styles.sectionRow}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.rowTitle}>{title}</Text>

            {children}

            {rowIcon}
          </View>
        </Pressable>
        {subContent}
      </View>
      {showRowSeparator && (
        <View style={{ backgroundColor: SettingsTheme.groupBackground }}>
          <View style={[styles.rowSeparator]}></View>
        </View>
      )}
    </>
  )
  const arrowIcon = <MaterialIcon style={{ paddingLeft: 10 }} name={'keyboard-arrow-right'} size={iconSize} />
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SectionHeader title="Apprendre l'Application" />
        <SectionRow
          title="Guide d'utilisation"
          accessibilityLabel={t('Settings.Language')}
          testID={testIdWithKey(t('Settings.Language').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <SectionRow
          title="Lorem ipsum"
          accessibilityLabel={t('Settings.History')}
          testID={testIdWithKey(t('Settings.History').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <SectionRow
          title="Lorem ipsum dolor"
          accessibilityLabel={t('Settings.MyPin')}
          testID={testIdWithKey(t('Settings.MyPin').toLowerCase())}
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <SectionHeader title="Tutoriel" />
        <SectionRow
          title="Tour guidé de l'application"
          accessibilityLabel={t('Settings.MyPin')}
          testID={testIdWithKey(t('Settings.MyPin').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <SectionRow
          title="Recevoir et partager une attestation"
          accessibilityLabel={t('Settings.Biometrics')}
          testID={testIdWithKey(t('Settings.Biometrics').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <SectionRow
          title="Aidez nous à améliorer l'application"
          accessibilityLabel={t('Settings.Version')}
          testID={testIdWithKey(t('Settings.Version').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <SectionHeader title="Votre opinion" />
        <SectionRow
          title="Signaler un problème"
          accessibilityLabel={t('Settings.MyPin')}
          testID={testIdWithKey(t('Settings.MyPin').toLowerCase())}
          showRowSeparator
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <SectionRow
          title="Partager votre opinion de l'application"
          accessibilityLabel={t('Settings.MyPin')}
          testID={testIdWithKey(t('Settings.MyPin').toLowerCase())}
          rowIcon={arrowIcon}
        >
          <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
        </SectionRow>
        <View style={[styles.sectionSeparator]}></View>
        <ContactUs />
        <View style={[styles.sectionCopyright]}>
          <Text style={styles.sectionCopyrightText}> {t('OptionsPlus.Copyright')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HelpCenter
