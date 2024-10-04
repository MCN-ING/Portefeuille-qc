import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RootStack from '@hyperledger/aries-bifold-core/App/navigators/RootStack';
import ActivitiesStack from './ActivitiesStack';
import TermsStack from './TermsStack';

const MainStack = createStackNavigator();

const AppNavigator = () => {
  return (
    <MainStack.Navigator >


      {/* Inclusion du RootStack provenant de bifold sans modification du titre */}
      <MainStack.Screen
        name="RootStack"
        component={RootStack}
        options={{ headerShown: false }}
      />

      {/* Inclusion de Stack local */}
      <MainStack.Screen
        name="ActivitiesStack"
        component={ActivitiesStack}
        options={{ headerShown: false }}
      />

      <MainStack.Screen
        name="TermsStack"
        component={TermsStack}
        options={{ headerShown: false }}
      />
      
    </MainStack.Navigator>
  );
};

export default AppNavigator;
