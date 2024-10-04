import React, { useCallback } from 'react';
import { View, StyleSheet, SectionList, Text } from 'react-native';
import NotificationListItem, { NotificationType } from '../../components/NotificationListItem';
import { useNotifications } from '../../hooks/notifications';
import { defaultTheme } from '../../theme';
import moment from 'moment';

const { ColorPallet, TextTheme } = defaultTheme;

// Function to group notifications by date
const groupNotificationsByDate = (notifications) => {
  const groupedNotifications = {
    today: [],
    thisWeek: [],
    lastWeek: [],
    older: [],
  };

  notifications.forEach((notification) => {
    const notificationDate = moment(notification.date);
    const today = moment();

    if (notificationDate.isSame(today, 'day')) {
      groupedNotifications.today.push(notification);
    } else if (notificationDate.isSame(today, 'week')) {
      groupedNotifications.thisWeek.push(notification);
    } else if (notificationDate.isSame(today.subtract(1, 'week'), 'week')) {
      groupedNotifications.lastWeek.push(notification);
    } else {
      groupedNotifications.older.push(notification);
    }
  });

  return groupedNotifications;
};

const NotificationsList: React.FC<{ openSwipeableId: string | null, handleOpenSwipeable: (id: string | null) => void, customNotification: any }> = ({ openSwipeableId, handleOpenSwipeable, customNotification }) => {
  const notifications = useNotifications();

  const groupedNotifications = groupNotificationsByDate(notifications);

  const sections = [
    { title: 'Aujourd\'hui', data: groupedNotifications.today },
    { title: 'Cette semaine', data: groupedNotifications.thisWeek },
    { title: 'La semaine dernière', data: groupedNotifications.lastWeek },
    { title: 'Plus ancien', data: groupedNotifications.older },
  ];

  const renderItem = useCallback(({ item }: { item: any }) => {
    let component = null;

    if (item.type === 'BasicMessageRecord') {
      component = (
        <NotificationListItem
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          notificationType={NotificationType.BasicMessage}
          notification={item}
        />
      );
    } else if (item.type === 'CredentialRecord') {
      let notificationType = NotificationType.CredentialOffer;
      if (item.revocationNotification) {
        notificationType = NotificationType.Revocation;
      }
      component = (
        <NotificationListItem
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          notificationType={notificationType}
          notification={item}
        />
      );
    } else if (item.type === 'CustomNotification' && customNotification) {
      component = (
        <NotificationListItem
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          notificationType={NotificationType.Custom}
          notification={item}
          customNotification={customNotification}
        />
      );
    } else {
      component = (
        <NotificationListItem
          openSwipeableId={openSwipeableId}
          onOpenSwipeable={handleOpenSwipeable}
          notificationType={NotificationType.ProofRequest}
          notification={item}
        />
      );
    }

    return (
      <View style={styles.notificationContainer}>
        {component}
        <View style={styles.separator} />
      </View>
    );
  }, [openSwipeableId, handleOpenSwipeable]);

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeaderContainer}>
      <Text style={[styles.bodyText, styles.bodyEventTime]}>
        {title}
      </Text>
      <View style={styles.sectionSeparator} />
    </View>
  );

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: ColorPallet.grayscale.lightGrey,
    marginVertical: 8,
  },
  bodyText: {
    fontSize: TextTheme.labelTitle.fontSize,
    fontWeight: TextTheme.labelTitle.fontWeight,
    color: TextTheme.labelTitle.color,
  },
  bodyEventTime: {
    marginVertical: 8,
    color: ColorPallet.grayscale.mediumGrey,
    fontSize: 12,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: ColorPallet.grayscale.lightGrey,
    marginTop: 4,
  },
  sectionHeaderContainer: {
    marginBottom: 12,
  },
  notificationContainer: {
    marginTop: 12,
  },
});

export default NotificationsList;
