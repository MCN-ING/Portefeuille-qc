import { useTheme } from '@hyperledger/aries-bifold-core'
import React from 'react'
import { Image, StyleSheet, Text, View, ImageSourcePropType } from 'react-native'

type InfosDisplayProps = {
  title?: string
  screen?: Array<string>
  detail?: string
  visual?: ImageSourcePropType
  question?: string
  answer?: string
}

const InfosDisplay: React.FC<InfosDisplayProps> = ({ title, detail, visual, question, answer }) => {
  const { SettingsTheme, TextTheme, ColorPallet } = useTheme()

  const styles = StyleSheet.create({
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      //paddingTop: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionHeaderText: {
      flexShrink: 1,
    },
    sectionText: {
      fontWeight: 'normal',
      // paddingTop: 16,
      // marginBottom: 14,
    },
    ImgRow: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    imgContainer: {
      height: '100%',
      width: '100%',
      borderRadius: 20,
      backgroundColor: ColorPallet.brand.secondary,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    sectionContainer: {
      marginBottom: 32,
      height: 240,
      borderRadius: 16,
      shadowColor: ColorPallet.notification.infoText,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      elevation: 4,
      shadowOpacity: 0.24,
    },
  })
  return (
    <View style={[styles.section]}>
      <View>
        <Text
          style={[TextTheme.headingThree, styles.sectionHeaderText, { paddingBottom: 24 }]}
          accessibilityRole="header"
        >
          {title ? title : question}
        </Text>
        <Text style={[TextTheme.headingFour, styles.sectionText, { paddingBottom: 24 }]}>
          {detail ? detail : answer}
        </Text>
      </View>
      {visual && (
        <View style={styles.sectionContainer}>
          <View style={styles.imgContainer}>
            <Image source={visual} style={styles.ImgRow} />
          </View>
        </View>
      )}
    </View>
  )
}
export default InfosDisplay
