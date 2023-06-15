import { useTheme } from 'aries-bifold'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ActivitySortBy = ({ setSortType, sortType }: any) => {
  const theme = useTheme()
  const { t } = useTranslation()

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.ColorPallet.brand.primaryBackground,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      marginVertical: 15,
      maxHeight: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'flex-start',
    },
    pastille: {
      width: 18,
      height: 18,
      borderRadius: 9,
      borderColor: theme.ColorPallet.grayscale.darkGrey,
      borderWidth: 1,
      borderStyle: 'solid',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
    },
    innerPastille: {
      width: 11,
      height: 11,
      borderRadius: 5.5,
      backgroundColor: theme.ColorPallet.brand.primary,
    },
  })

  return (
    <View style={styles.container}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Text style={theme.TextTheme.modalTitle}>{t('Activity.sortBy')}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setSortType('asc')}>
          <Text style={theme.TextTheme.modalNormal}>{t('Activity.newToOld')}</Text>
          <View style={styles.pastille}>{sortType === 'asc' && <View style={styles.innerPastille} />}</View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSortType('desc')}>
          <Text style={theme.TextTheme.modalNormal}>{t('Activity.oldToNew')}</Text>
          <View style={styles.pastille}>{sortType === 'desc' && <View style={styles.innerPastille} />}</View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ActivitySortBy
