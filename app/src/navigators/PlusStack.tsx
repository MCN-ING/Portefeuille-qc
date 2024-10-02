import { useTheme } from '@hyperledger/aries-bifold-core'
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/App/navigators/defaultStackOptions'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Plus from '../screens/Plus'

import { Screens, PlusStackParams } from './navigators'

const PlusStack: React.FC = () => {
  const StackPlus = createStackNavigator<PlusStackParams>()
  const theme = useTheme()
  const defaultStackOptions = useDefaultStackOptions(theme)

  return (
    <StackPlus.Navigator
      initialRouteName={Screens.OptionsPlus}
      screenOptions={{ ...defaultStackOptions, headerShown: false }}
    >
      <StackPlus.Screen name={Screens.OptionsPlus} component={Plus} />
    </StackPlus.Navigator>
  )
}

export default PlusStack
