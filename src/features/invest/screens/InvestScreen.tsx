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
  QuantitySelector,
  CostSummary,
} from '@/components';
import StackHeader from '@/components/headers/StackHeader';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import CardImageComponent from '@/components/layouts/common/CardImageComponent';
import { SVG } from '@/assets';
import LinearGradient from 'react-native-linear-gradient';

const InvestScreen: React.FC<types.TInvestScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const [mode, setMode] = useState<'amount' | 'grams'>('amount');
  const [value, setValue] = useState(3000);
  const livePrice = 6201;

  return (
    <View style={styles.container}>
      <StackHeader
        title={t('invest.buy_digital_gold')}
        subtitle={t('invest.invest')}
        showBackIcon={true}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Info Card */}
        <CardImageComponent style={styles.topCard}>
          <View style={styles.topCardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goldLabel}>{t('invest.gold_24k')}</Text>
              <Text style={styles.mainTitle}>{t('invest.instant_buy')}</Text>
              <View style={styles.pureBadge}>
                <Ionicons
                  name="shield-checkmark"
                  size={14}
                  color={themeColor.gold}
                />
                <Text style={styles.pureText}>
                  {t('invest.pure_gold')} • {t('invest.stored_securely')}
                </Text>
              </View>
            </View>
            <IconGradientBorder>
              <SVG.InvestIcon
                color={themeColor.secondary}
                width={24}
                height={24}
              />
            </IconGradientBorder>
          </View>

          <View style={styles.livePriceBox}>
            <View style={styles.livePriceLeft}>
              <View style={styles.chartIconCircle}>
                <Ionicons
                  name="trending-up"
                  size={18}
                  color={themeColor.secondary}
                />
              </View>
              <View>
                <Text style={styles.livePriceLabel}>
                  {t('invest.live_gold_price')}
                </Text>
                <Text style={styles.livePriceValue}>
                  ₹ {livePrice.toLocaleString()}{' '}
                  <Text style={styles.perGram}>/ g</Text>
                </Text>
              </View>
            </View>
            <View style={styles.livePriceRight}>
              <Text style={styles.updatedText}>
                {t('invest.updated_just_now')}
              </Text>
              <Ionicons
                name="time-outline"
                size={14}
                color={themeColor.secondaryS2}
              />
            </View>
          </View>
        </CardImageComponent>

        {/* Quantity Selector */}
        <QuantitySelector
          mode={mode}
          onModeChange={setMode}
          value={value}
          onValueChange={setValue}
          livePrice={livePrice}
        />


        {/* Cost Summary */}
        <CostSummary
          amount={mode === 'amount' ? value : value * livePrice}
          grams={mode === 'grams' ? value : value / livePrice}
          livePrice={livePrice}
        />

        {/* Wallet Selector */}
        <View style={styles.walletCard}>
          <View style={styles.walletIconCircle}>
            <Ionicons name="wallet" size={24} color={themeColor.secondary} />
          </View>
          <View style={styles.walletInfo}>
            <Text style={styles.walletTitle}>
              {t('invest.pay_with_wallet')}
            </Text>
            <Text style={styles.walletSubtitle}>
              {t('invest.available_balance', { val: '12,380' })}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeText}>{t('invest.change')}</Text>
          </TouchableOpacity>
        </View>

        {/* Action Footer (Now inside ScrollView) */}
        <View style={styles.footerInner}>
          <View style={styles.footerContent}>
            <View>
              <Text style={styles.totalPayableLabel}>
                {t('invest.total_payable')}
              </Text>
              <Text style={styles.totalPayableValue}>
                ₹ {( (mode === 'amount' ? value : value * livePrice) + 59.0 + 49.2).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity style={styles.buyBtn} onPress={() => {}}>
              <LinearGradient
                colors={themeColor.goldGradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buyGradient}
              >
                <Text style={styles.buyText}>{t('invest.buy_now')}</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={themeColor.secondary}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <Text style={styles.termsText}>{t('invest.terms_buy')}</Text>
        </View>
      </ScrollView>
    </View>
  );
};


export default InvestScreen;

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('25%'),
    },
    topCard: {
      padding: 24,
      marginTop: 10,
    },
    topCardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    goldLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    mainTitle: {
      fontSize: fontSize.f22,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      maxWidth: wp('50%'),
      lineHeight: 28,
    },
    pureBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginTop: 16,
      alignSelf: 'flex-start',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    pureText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    livePriceBox: {
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    livePriceLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    chartIconCircle: {
      width: 44,
      height: 44,
      borderRadius: 16,
      backgroundColor: theme.grayS3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    livePriceLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    livePriceValue: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 2,
    },
    perGram: {
      fontSize: fontSize.f12,
      color: theme.secondaryS2,
    },
    livePriceRight: {
      alignItems: 'flex-end',
      gap: 2,
    },
    updatedText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    walletCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      marginTop: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    walletIconCircle: {
      width: 52,
      height: 52,
      borderRadius: 18,
      backgroundColor: theme.gold,
      justifyContent: 'center',
      alignItems: 'center',
    },
    walletInfo: {
      flex: 1,
      marginLeft: 16,
    },
    walletTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    walletSubtitle: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    changeText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
    },
    footerInner: {
      backgroundColor: theme.white,
      padding: 24,
      borderRadius: 32,
      marginTop: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
    },

    footerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    totalPayableLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    totalPayableValue: {
      fontSize: fontSize.f20,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 4,
    },
    buyBtn: {
      width: wp('45%'),
      height: 56,
      borderRadius: 18,
      overflow: 'hidden',
    },
    buyGradient: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    buyText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    termsText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textAlign: 'center',
      lineHeight: 16,
    },
  });
