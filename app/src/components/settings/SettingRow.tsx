import { useTheme } from '@hyperledger/aries-bifold-core'
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

interface SectionRowProps {
  title: string
  testID?: string
  children?: JSX.Element
  showRowSeparator?: boolean
  onPress?: () => void
  rowIcon?: JSX.Element
  style?: StyleProp<ViewStyle>
}

const SettingRow = ({ title, testID, onPress, children, showRowSeparator, rowIcon, style }: SectionRowProps) => {
  const { ColorPallet, TextTheme, SettingsTheme } = useTheme()
  const styles = StyleSheet.create({
    rowSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: ColorPallet.grayscale.lightGrey,
    },
    section: {
      backgroundColor: SettingsTheme.groupBackground,
      alignItems: 'center',
    },
    rowTitle: {
      ...TextTheme.headingFour,
      flex: 1,
      fontWeight: 'normal',
      flexWrap: 'wrap',
    },
  })
  return (
    <View style={showRowSeparator && styles.rowSeparator}>
      <TouchableOpacity testID={testID} onPress={onPress} accessibilityRole={'button'}>
        <View style={[styles.section, { paddingVertical: 12 }, style]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.rowTitle}>{title}</Text>

            {children}

            {rowIcon}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default SettingRow
