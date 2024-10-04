import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { defaultTheme } from '../../theme';

const { TextTheme } = defaultTheme;

const HistoryList: React.FC = () => {
  return (
    <View style={styles.historyContent}>
      <Text style={styles.historyText}>Historique des notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  historyContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  historyText: {
    fontSize: TextTheme.normal.fontSize,
    color: TextTheme.normal.color,
  },
});

export default HistoryList;
