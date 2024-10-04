import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TOKENS, useServices } from '@hyperledger/aries-bifold-core';
import { useTranslation } from 'react-i18next';
import NotificationsList from './NotificationsList';
import HistoryList from './HistoryList';
import { defaultTheme } from '../../theme';
import { useNotifications } from '../../hooks/notifications';

const { ColorPallet, TextTheme } = defaultTheme;

const Activities: React.FC = () => {
  const [openSwipeableId, setOpenSwipeableId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Notifications');
  const [{ customNotificationConfig: customNotification }] = useServices([TOKENS.NOTIFICATIONS]);
  const { t } = useTranslation();
  const notifications = useNotifications();
  const notificationCount = notifications.length;

  return (
    <View style={styles.container}>
      {/* Tab-like Header */}
      <View style={styles.tabHeader}>
        <TouchableOpacity
          style={[styles.tab, activeTab === t('Screens.Notifications') && styles.activeTab]}
          onPress={() => setActiveTab(t('Screens.Notifications'))}
        >
          <View style={styles.tabContent}>
            <Text style={[styles.tabText, activeTab === t('Screens.Notifications') && styles.activeTabText]}>
              {t('Screens.Notifications')}
            </Text>
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Historique' && styles.activeTab]}
          onPress={() => setActiveTab('Historique')}
        >
          <Text style={[styles.tabText, activeTab === 'Historique' && styles.activeTabText]}>Historique</Text>
        </TouchableOpacity>
      </View>

      {activeTab === t('Screens.Notifications') ? (
        <NotificationsList openSwipeableId={openSwipeableId} handleOpenSwipeable={setOpenSwipeableId} customNotification={customNotification} />
      ) : (
        <HistoryList />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorPallet.brand.primaryBackground,
  },
  tabHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: ColorPallet.grayscale.lightGrey,
    marginBottom: 16,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: ColorPallet.brand.primary,
  },
  tabText: {
    fontSize: TextTheme.labelTitle.fontSize,
    fontWeight: TextTheme.labelTitle.fontWeight,
    color: ColorPallet.grayscale.darkGrey,
  },
  activeTabText: {
    color: ColorPallet.brand.primary,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: ColorPallet.brand.primary,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8, 
  },
  badgeText: {
    color: ColorPallet.brand.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Activities;
