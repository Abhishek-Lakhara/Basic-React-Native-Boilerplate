import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';

import StackHeader from '@/components/headers/StackHeader';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import CardImageComponent from '@/components/layouts/common/CardImageComponent';
import { handleShare } from '@/utils/helper.utils';
import { EShare } from '@/interface/general.type';
import Clipboard from '@react-native-clipboard/clipboard';

const RewardScreen = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const historyItems = [
    {
      id: '1',
      title: t('reward.interest_credited'),
      subtitle: t('reward.weekly_earnings') + ' • Today',
      amount: '+₹46.60',
      icon: 'cash-outline',
      iconColor: '#059669',
      iconBg: '#ECFDF5',
    },
    {
      id: '2',
      title: t('reward.friend_referral_bonus'),
      subtitle: t('reward.successfully_verified') + ' • Yesterday',
      amount: '+₹500.00',
      icon: 'person-add-outline',
      iconColor: '#D97706',
      iconBg: '#FFFBEB',
    },
    {
      id: '3',
      title: t('reward.cashback_reward'),
      subtitle:
        t('reward.promo_code', { code: 'WELCOME100' }) + ' • 2 days ago',
      amount: '+₹100.00',
      icon: 'pricetag-outline',
      iconColor: themeColor.white,
      iconBg: themeColor.secondary,
    },
  ];

  const referralCode = 'AARAV245';

  const onCopyLink = () => {
    Clipboard.setString(`goldinvest.com/r/${referralCode}`);
  };

  const onShare = (type: EShare) => {
    handleShare(referralCode, type, 500);
  };

  return (
    <View style={styles.container}>
      <StackHeader
        title={t('reward.rewards')}
        subtitle={t('reward.rewards_subtitle')}
        showBackIcon={true}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.screenTitle}>{t('reward.your_rewards')}</Text>
            <Text style={styles.screenSubtitle}>
              {t('reward.track_earnings')}
            </Text>
          </View>
          <View style={styles.trophyContainer}>
            <Ionicons name="trophy-outline" size={24} color={themeColor.gold} />
          </View>
        </View>

        {/* Total Rewards Card */}
        <CardImageComponent style={styles.rewardCard}>
          <View style={styles.rewardCardHeader}>
            <View>
              <Text style={styles.rewardLabel}>
                {t('reward.total_rewards_earned')}
              </Text>
              <View style={styles.amountRow}>
                <Text style={styles.currencySymbol}>₹</Text>
                <Text style={styles.amountText}>2,485</Text>
              </View>
            </View>
            <View style={styles.trendBadge}>
              <Ionicons name="trending-up" size={14} color="#059669" />
              <Text style={styles.trendText}>+₹186.40</Text>
            </View>
          </View>
        </CardImageComponent>

        {/* Claim Banner */}
        <View style={styles.claimBanner}>
          <View style={styles.claimLeft}>
            <View style={styles.giftIconBox}>
              <Ionicons
                name="gift-outline"
                size={24}
                color={themeColor.green}
              />
            </View>
            <View>
              <Text style={styles.claimTitle}>
                {t('reward.cashback_ready')}
              </Text>
              <Text style={styles.claimSubtitle}>
                {t('reward.claim_bonus')}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.claimBtn}>
            <Text style={styles.claimBtnText}>{t('reward.claim_now')}</Text>
          </TouchableOpacity>
        </View>

        {/* Referral Section */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <Ionicons
              name="people-outline"
              size={20}
              color={themeColor.secondary}
            />
            <Text style={styles.sectionTitle}>
              {t('reward.referral_rewards')}
            </Text>
          </View>
          <Text style={styles.invitedText}>
            {t('reward.invited_pending', { invited: '3', pending: '1' })}
          </Text>
        </View>

        <View style={styles.referralCard}>
          <Text style={styles.referralTitle}>
            {t('reward.invite_and_earn')}
          </Text>
          <Text style={styles.referralSubtitle}>{t('reward.friends_get')}</Text>

          <View style={styles.linkBox}>
            <View>
              <Text style={styles.linkLabel}>
                {t('reward.your_referral_link')}
              </Text>
              <Text style={styles.linkValue}>
                goldinvest.com/r/{referralCode}
              </Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={onCopyLink}>
              <Ionicons
                name="copy-outline"
                size={20}
                color={themeColor.secondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.shareRow}>
            <TouchableOpacity
              style={styles.shareItem}
              onPress={() => onShare(EShare.WHATSAPP)}
            >
              <View
                style={[styles.shareIconBox, { backgroundColor: '#E8F5E9' }]}
              >
                <Ionicons name="logo-whatsapp" size={20} color="#2E7D32" />
              </View>
              <Text style={styles.shareLabel}>{t('reward.whatsapp')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareItem}
              onPress={() => onShare(EShare.MAIL)}
            >
              <View
                style={[styles.shareIconBox, { backgroundColor: '#E3F2FD' }]}
              >
                <Ionicons name="mail-outline" size={20} color="#1565C0" />
              </View>
              <Text style={styles.shareLabel}>{t('reward.email')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareItem}
              onPress={() => onShare(EShare.LINK)}
            >
              <View
                style={[styles.shareIconBox, { backgroundColor: '#F5F5F5' }]}
              >
                <Ionicons
                  name="share-social-outline"
                  size={20}
                  color={themeColor.secondary}
                />
              </View>
              <Text style={styles.shareLabel}>{t('reward.more')}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Interest Banner */}
        <View style={styles.interestBanner}>
          <View style={styles.interestLeft}>
            <View style={styles.sparkleIconBox}>
              <Ionicons name="sparkles-outline" size={20} color="#059669" />
            </View>
            <View>
              <Text style={styles.interestValue}>{t('reward.earned')}</Text>
              <Text style={styles.interestSubtitle}>
                {t('reward.next_credit', { val: 'Monday 9:00 AM' })}
              </Text>
            </View>
          </View>
          <Text style={styles.weeklyInterestLabel}>
            {t('reward.weekly_interest')}
          </Text>
        </View>

        {/* History Section */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>{t('reward.rewards_history')}</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{t('reward.view_all')}</Text>
          </TouchableOpacity>
        </View>

        {historyItems.map(item => (
          <View key={item.id} style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View
                style={[
                  styles.historyIconBox,
                  { backgroundColor: item.iconBg },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={item.iconColor}
                />
              </View>
              <View>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <Text style={[styles.itemAmount, { color: '#059669' }]}>
              {item.amount}
            </Text>
          </View>
        ))}

        <View style={styles.disclaimerRow}>
          <Ionicons
            name="information-circle-outline"
            size={16}
            color={themeColor.secondaryS2}
          />
          <Text style={styles.disclaimerText}>
            {t('reward.rewards_disclaimer')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('15%'),
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 24,
    },
    screenTitle: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    screenSubtitle: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 4,
    },
    trophyContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    rewardCard: {
      padding: 24,
      borderRadius: 32,
    },
    rewardCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    rewardLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    amountRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      marginTop: 8,
    },
    currencySymbol: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginRight: 4,
    },
    amountText: {
      fontSize: fontSize.f36,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    trendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ECFDF5',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      gap: 4,
    },
    trendText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: '#059669',
    },
    claimBanner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.secondary,
      padding: 16,
      borderRadius: 24,
      marginTop: 24,
    },
    claimLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    giftIconBox: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: 'rgba(52, 199, 89, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    claimTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.white,
    },
    claimSubtitle: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: '#A1A1AA',
      marginTop: 2,
    },
    claimBtn: {
      backgroundColor: theme.gold,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 14,
    },
    claimBtnText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 16,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    sectionTitle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    invitedText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
    },
    referralCard: {
      backgroundColor: theme.white,
      padding: 24,
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
    },
    referralTitle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      lineHeight: 22,
    },
    referralSubtitle: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 8,
    },
    linkBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#F8FAFC',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 16,
      marginTop: 24,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    linkLabel: {
      fontSize: fontSize.f10,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    linkValue: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 4,
    },
    copyBtn: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    shareRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
    },
    shareItem: {
      flex: 1,
      alignItems: 'center',
    },
    shareIconBox: {
      width: 56,
      height: 56,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    shareLabel: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      color: '#059669',
    },
    interestBanner: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      marginTop: 24,
      borderWidth: 1,
      borderColor: '#E2E8F0',
    },
    interestLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    sparkleIconBox: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: '#ECFDF5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    interestValue: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    interestSubtitle: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    weeklyInterestLabel: {
      fontSize: fontSize.f10,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
    },
    historyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 20,
    },
    historyTitle: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    viewAllText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    historyItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    historyLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    historyIconBox: {
      width: 44,
      height: 44,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    itemSubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    itemAmount: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
    },
    disclaimerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 24,
      paddingHorizontal: 8,
    },
    disclaimerText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      flex: 1,
      lineHeight: 16,
    },
  });

export default RewardScreen;
