import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@hyperledger/aries-bifold-core';
import { useDefaultStackOptions } from '@hyperledger/aries-bifold-core/App/navigators/defaultStackOptions';

import ActivityNotifications from '../screens/activities/Activities';
import { Screens } from './navigators-override';

const ActivitiesStack: React.FC = () => {
  const StackActivities = createStackNavigator<any>();
  const theme = useTheme();
  const defaultStackOptions = useDefaultStackOptions(theme);

  return (
    <StackActivities.Navigator
      initialRouteName={Screens.ActivityNotifications}
      screenOptions={{ ...defaultStackOptions, headerShown: true }}
    >
      <StackActivities.Screen
        name={Screens.ActivityNotifications}
        component={ActivityNotifications}
      />
    </StackActivities.Navigator>
  );
};

export default ActivitiesStack;
