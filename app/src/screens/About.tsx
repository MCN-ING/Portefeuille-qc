import { useTheme, testIdWithKey } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const HelpCenter: React.FC = () => {
  const { SettingsTheme, TextTheme, ColorPallet } = useTheme()
  const { t } = useTranslation()
  const iconSize = 30

  const styles = StyleSheet.create({
    container: {
      flex: 2,
      paddingHorizontal: 20,
      backgroundColor: ColorPallet.brand.primaryBackground,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      paddingTop: 24,
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      <SectionRow
        title={t('About.Accessibility')}
        accessibilityLabel={t('About.Accessibility')}
        testID={testIdWithKey(t('About.Accessibility').toLowerCase())}
        showRowSeparator
        rowIcon={arrowIcon}
      >
        <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
      </SectionRow>
      <View style={[styles.sectionSeparator]}></View>
      <SectionRow
        title={t('About.TermsOfUse')}
        accessibilityLabel={t('About.TermsOfUse')}
        testID={testIdWithKey(t('About.TermsOfUse').toLowerCase())}
        showRowSeparator
        rowIcon={arrowIcon}
      >
        <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
      </SectionRow>
      <View style={[styles.sectionSeparator]}></View>
      <SectionRow
        title={t('About.PrivacyPolicy')}
        accessibilityLabel={t('About.PrivacyPolicy')}
        testID={testIdWithKey(t('About.PrivacyPolicy').toLowerCase())}
        rowIcon={arrowIcon}
      >
        <Text style={[TextTheme.headingFour, { fontWeight: 'normal' }]}></Text>
      </SectionRow>
      <View style={[styles.sectionSeparator]}></View>
      <View style={[styles.sectionCopyright]}>
        <Text style={styles.sectionCopyrightText}> {t('OptionsPlus.Copyright')}</Text>
      </View>
    </SafeAreaView>
  )
}

export default HelpCenter
