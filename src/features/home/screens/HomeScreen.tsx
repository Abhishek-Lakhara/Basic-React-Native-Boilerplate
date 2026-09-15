import { StyleSheet, View, ScrollView } from 'react-native';
import React from 'react';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import * as types from '@/interface';
import MainHeader from '@/components/headers/MainHeader';
import { useTranslation } from 'react-i18next';
import { wp, hp } from '@/utils/responsive.utils';
import { getSalutation } from '@/utils/helper.utils';

import HomeGoldCard from '@/components/layouts/home/HomeGoldCard';
import HomeStatsRow from '@/components/layouts/home/HomeStatsRow';
import HomeQuickActions from '@/components/layouts/home/HomeQuickActions';
import HomeGoldTrend from '@/components/layouts/home/HomeGoldTrend';
import HomeRecentActivity from '@/components/layouts/home/HomeRecentActivity';
import InfoComponent from '@/components/layouts/common/InfoComponent';

export default function HomeScreen() {
  const styles = useThemedStyles(createStyles);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MainHeader greeting={t(getSalutation())} name="Aarav" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeGoldCard />
        <HomeStatsRow />
        <HomeQuickActions />
        <HomeGoldTrend />
        <HomeRecentActivity />

        <InfoComponent
          isDark
          title={t('home.secure_withdrawals')}
          description={t('home.secure_withdrawals_desc')}
          customIcon="shield-checkmark-outline"
          style={styles.footerInfo}
        />
      </ScrollView>
    </View>
  );
}

const createStyles = (themeColor: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.backgroundColor,
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('15%'),
    },
    footerInfo: {
      marginTop: 32,
    },
  });
