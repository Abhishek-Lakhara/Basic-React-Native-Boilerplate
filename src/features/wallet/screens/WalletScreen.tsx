import React, { useState } from 'react';
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
import {
  IconGradientBorder,
  InfoComponent,
  CustomToogle,
  AutoMandateSettings,
} from '@/components';


import StackHeader from '@/components/headers/StackHeader';
import {
  fontFamily,
  fontSize,
  Ionicons,
  Feather,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import CardImageComponent from '@/components/layouts/common/CardImageComponent';
import LinearGradient from 'react-native-linear-gradient';

const WalletScreen: React.FC<types.TWalletScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const [isMandateActive, setIsMandateActive] = useState(true);


  const transactions = [
    {
      id: '1',
      title: t('wallet.added_money'),
      method: 'UPI',
      time: 'Today • 6:18 PM',
      amount: '5,000',
      status: t('wallet.completed'),
      type: 'credit',
      icon: 'add',
    },
    {
      id: '2',
      title: t('wallet.bought_gold'),
      method: 'Wallet',
      time: 'Today • 10:42 AM',
      amount: '- 1,984',
      status: t('wallet.completed'),
      type: 'debit',
      icon: 'cart-outline',
    },
    {
      id: '3',
      title: t('wallet.interest_earned'),
      method: 'Pending',
      time: 'Mon • 9:00 AM',
      amount: '+ 46.60',
      status: t('wallet.not_credited'),
      type: 'interest',
      icon: 'sparkles-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <StackHeader
        title={t('wallet.wallet_details')}
        subtitle={t('wallet.wallet_details_subtitle')}
        showBackIcon={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Balance Card */}
        <CardImageComponent style={styles.mainCard}>
          <View style={styles.mainCardHeader}>
            <View>
              <Text style={styles.totalLabel}>
                {t('wallet.total_wallet_balance')}
              </Text>
              <View style={styles.totalAmountRow}>
                <Text style={styles.totalAmountSymbol}>₹</Text>
                <Text style={styles.totalAmountValue}>12,480</Text>
                <Text style={styles.cashLabel}>({t('wallet.cash')})</Text>
              </View>
            </View>
            <IconGradientBorder>
              <Ionicons
                name="wallet-outline"
                size={24}
                color={themeColor.secondary}
              />
            </IconGradientBorder>
          </View>

          <View style={styles.protectedBadge}>
            <Ionicons
              name="shield-checkmark"
              size={16}
              color={themeColor.secondary}
            />
            <Text style={styles.protectedText}>
              {t('wallet.protected')} • {t('wallet.instant_credits')}
            </Text>
          </View>

          <View style={styles.subCardsRow}>
            <View style={styles.subCard}>
              <View style={styles.subCardHeader}>
                <Text style={styles.subCardTitle}>{t('wallet.available')}</Text>
                <View style={styles.iconBoxDark}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={themeColor.white}
                  />
                </View>
              </View>
              <Text style={styles.subCardValue}>₹ 12,380</Text>
              <Text style={styles.subCardInfo}>
                {t('wallet.withdraw_anytime')}
              </Text>
            </View>

            <View style={styles.subCard}>
              <View style={styles.subCardHeader}>
                <Text style={styles.subCardTitle}>{t('wallet.locked')}</Text>
                <View style={styles.iconBoxLight}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={themeColor.secondary}
                  />
                </View>
              </View>
              <Text style={styles.subCardValue}>₹ 100</Text>
              <Text style={styles.subCardInfo}>
                {t('wallet.reserve_policy')}
              </Text>
            </View>
          </View>
        </CardImageComponent>

        <View style={styles.sectionRow}>
          <View style={styles.sectionTitleRow}>
            <Ionicons name="refresh" size={20} color={themeColor.secondary} />
            <Text style={styles.sectionTitle}>{t('wallet.automandate')}</Text>
          </View>

          <View style={styles.activeBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.activeBadgeText}>{t('wallet.active')}</Text>
          </View>
        </View>

        <View style={styles.mandateCard}>
          <View style={styles.mandateHeader}>
            <View>
              <Text style={styles.mandateCardLabel}>
                {t('wallet.daily_mandate')}
              </Text>
              <View style={styles.mandateValueRow}>
                <Text style={styles.mandateValueSymbol}>₹</Text>
                <Text style={styles.mandateValueText}>500</Text>
                <Text style={styles.mandateValueUnit}>
                  {t('wallet.per_day')}
                </Text>
              </View>
            </View>
            <CustomToogle
              value={isMandateActive}
              onChange={setIsMandateActive}
              activeColor={themeColor.secondary}
            />
          </View>
          <View style={styles.mandateFooter}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={themeColor.gold}
            />
            <Text style={styles.mandateFooterText}>
              {t('wallet.next_today_at', { val: '9:00 AM' })}
            </Text>
          </View>
        </View>

        <AutoMandateSettings
          isVisible={isMandateActive}
          onUpdate={data => {
            console.log('Update Mandate:', data);
          }}
        />


        {/* Transactions Section */}
        <View style={styles.transactionsHeaderRow}>
          <Text style={styles.transactionsTitle}>
            {t('wallet.recent_transactions')}
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>{t('wallet.view_all')}</Text>
          </TouchableOpacity>
        </View>

        {transactions.map(item => (
          <View key={item.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.transactionIconBox,
                  item.type === 'interest' && { backgroundColor: '#ECFDF5' },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color={
                    item.type === 'interest' ? '#059669' : themeColor.white
                  }
                />
              </View>
              <View>
                <Text style={styles.transactionTitle}>{item.title}</Text>
                <Text style={styles.transactionSubtitle}>
                  {item.method} • {item.time}
                </Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  item.type === 'interest' && { color: '#059669' },
                ]}
              >
                ₹ {item.amount}
              </Text>
              <Text style={styles.transactionStatus}>{item.status}</Text>
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('AddMoney')}
          >
            <View style={styles.actionIconBox}>
              <Ionicons name="add" size={24} color={themeColor.white} />
            </View>
            <Text style={styles.actionTitle}>
              {t('wallet.add_money_label')}
            </Text>
            <Text style={styles.actionSubtitle}>UPI / Bank</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Withdraw')}
          >
            <View
              style={[
                styles.actionIconBox,
                { backgroundColor: themeColor.grayS3 },
              ]}
            >
              <Feather
                name="arrow-up-right"
                size={24}
                color={themeColor.secondary}
              />
            </View>
            <Text style={styles.actionTitle}>{t('wallet.withdraw_label')}</Text>
            <Text style={styles.actionSubtitle}>₹1000 min</Text>
          </TouchableOpacity>

          <LinearGradient
            colors={themeColor.goldGradient as any}
            style={styles.actionCardGradient}
          >
            <View
              style={[
                styles.actionIconBox,
                { backgroundColor: themeColor.white },
              ]}
            >
              <Ionicons name="list" size={24} color={themeColor.secondary} />
            </View>
            <Text style={styles.actionTitle}>{t('wallet.all')}</Text>
            <Text style={styles.actionSubtitle}>
              {t('wallet.transactions')}
            </Text>
          </LinearGradient>
        </View>

        {/* Secure Controls Banner */}
        <InfoComponent
          isDark
          title={t('wallet.secure_wallet_controls')}
          description={t('wallet.secure_wallet_desc')}
          customIcon="shield-checkmark-outline"
          style={styles.secureInfoComponent}
        />
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
    mainCard: {
      padding: 24,
      marginTop: 10,
    },
    mainCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    totalLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    totalAmountRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 4,
    },
    totalAmountSymbol: {
      fontSize: fontSize.f20,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    totalAmountValue: {
      fontSize: fontSize.f32,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    cashLabel: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginLeft: 4,
    },
    walletIconCircle: {
      width: 56,
      height: 56,
      borderRadius: 20,
      backgroundColor: theme.goldLight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    protectedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 16,
      marginTop: 20,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    protectedText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    subCardsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 24,
    },
    subCard: {
      flex: 1,
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    subCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    subCardTitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    iconBoxDark: {
      width: 32,
      height: 32,
      borderRadius: 12,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconBoxLight: {
      width: 32,
      height: 32,
      borderRadius: 12,
      backgroundColor: theme.grayS3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subCardValue: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    subCardInfo: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 4,
    },
    sectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 32,
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
    activeBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: theme.greenS1,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    greenDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.green,
    },
    activeBadgeText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      color: theme.green,
    },
    mandateCard: {
      backgroundColor: theme.white,
      padding: 20,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    mandateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    mandateCardLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    mandateValueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 4,
    },
    mandateValueSymbol: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    mandateValueText: {
      fontSize: fontSize.f28,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    mandateValueUnit: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    mandateFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.grayS3,
    },
    mandateFooterText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    settingsCard: {
      backgroundColor: theme.white,
      padding: 24,
      borderRadius: 24,
      marginTop: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
    },
    settingsDesc: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      lineHeight: 20,
      marginBottom: 24,
    },
    inputLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    amountInputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.grayS3,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 16,
      marginBottom: 8,
    },
    amountInputSymbol: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginRight: 8,
    },
    amountInput: {
      flex: 1,
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      padding: 0,
    },
    limitsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    limitText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    dropdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.grayS3,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
    },
    dropdownLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    dropdownLabel: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondary,
    },
    dropdownValueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.grayS2,
    },
    dropdownValue: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    updateBtn: {
      backgroundColor: theme.secondary,
      paddingVertical: 18,
      borderRadius: 16,
      alignItems: 'center',
      marginTop: 12,
    },
    updateBtnText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.white,
    },
    transactionsHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
      marginBottom: 20,
    },
    transactionsTitle: {
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
    transactionItem: {
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
    transactionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    transactionIconBox: {
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    transactionTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    transactionSubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    transactionRight: {
      alignItems: 'flex-end',
    },
    transactionAmount: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    transactionStatus: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    quickActionsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 32,
    },
    actionCard: {
      flex: 1,
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    actionCardGradient: {
      flex: 1,
      padding: 16,
      borderRadius: 24,
    },
    actionIconBox: {
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    actionTitle: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    actionSubtitle: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    secureInfoComponent: {
      marginTop: 32,
    },
  });

export default WalletScreen;
