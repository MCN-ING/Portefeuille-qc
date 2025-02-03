import { useTheme } from '@hyperledger/aries-bifold-core'
import { StyleSheet, Text, View } from 'react-native'

const SettingHeader = ({ title }: { title: string }): JSX.Element => {
  const { TextTheme, SettingsTheme } = useTheme()
  const styles = StyleSheet.create({
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      alignItems: 'center',
    },
    sectionHeader: {
      backgroundColor: SettingsTheme.groupBackground,
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
  return (
    <View style={[styles.section, styles.sectionHeader]}>
      <Text style={[TextTheme.headingThree, { flexShrink: 1 }]} accessibilityRole="header">
        {title}
      </Text>
    </View>
  )
}

export default SettingHeader
