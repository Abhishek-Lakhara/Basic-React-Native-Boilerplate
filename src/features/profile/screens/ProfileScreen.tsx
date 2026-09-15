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
import {
  IconGradientBorder,
  CustomToogle,
} from '@/components';
import MainHeader from '@/components/headers/MainHeader';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import CardImageComponent from '@/components/layouts/common/CardImageComponent';

import { onLogout } from '@/utils/helper.utils';

const ProfileScreen: React.FC<types.TProfileScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);


  return (
    <View style={styles.container}>
      <MainHeader greeting="Good morning" name="Aarav" showUserIcon={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Verification Status Row */}
        <View style={styles.statusRow}>
          <View style={styles.statusBadge}>
            <View style={styles.greenDot} />
            <Text style={styles.statusText}>{t('profile.kyc_verified')}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: 'transparent' }]}>
            <Text style={[styles.statusText, { color: themeColor.secondaryS2 }]}>
              {t('profile.bank_linked')}
            </Text>
          </View>
        </View>

        {/* Account & Security Card */}
        <CardImageComponent style={styles.accountCard}>
          <View style={styles.accountHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardSubtitle}>
                {t('profile.profile_settings')}
              </Text>
              <Text style={styles.cardTitle}>
                {t('profile.account_security')}
              </Text>
              <View style={styles.badgesRow}>
                <View style={styles.miniBadge}>
                  <View style={styles.greenDotSmall} />
                  <Text style={styles.miniBadgeText}>
                    {t('profile.kyc_verified')}
                  </Text>
                </View>
                <View style={styles.miniBadge}>
                  <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                  <Text style={styles.miniBadgeText}>
                    {t('profile.bank_verified')}
                  </Text>
                </View>
              </View>
            </View>
            <IconGradientBorder>
              <Ionicons
                name="person-outline"
                size={24}
                color={themeColor.secondary}
              />
            </IconGradientBorder>
          </View>

          <View style={styles.subCardsRow}>
            <TouchableOpacity style={styles.subCard}>
              <View style={styles.subCardIconBox}>
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color={themeColor.secondary}
                />
              </View>
              <View>
                <Text style={styles.subCardLabel}>{t('profile.wallet')}</Text>
                <Text style={styles.subCardValue}>{t('profile.view_det')}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.subCard}>
              <View style={styles.subCardIconBox}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color={themeColor.secondary}
                />
              </View>
              <View>
                <Text style={styles.subCardLabel}>{t('profile.reports')}</Text>
                <Text style={styles.subCardValue}>{t('profile.transacti')}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </CardImageComponent>

        {/* Profile Info Card */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleYellow}>
              <Ionicons
                name="card-outline"
                size={20}
                color={themeColor.secondary}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>{t('profile.profile_info')}</Text>
              <Text style={styles.sectionSubtitle}>
                {t('profile.identity_desc')}
              </Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editBtnText}>{t('profile.edit')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <View style={styles.listItemIcon}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={themeColor.secondaryS2}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listLabel}>{t('profile.full_name')}</Text>
                <Text style={styles.listValue}>Aarav Mehta</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={themeColor.secondaryS2}
              />
            </View>

            <View style={styles.listItem}>
              <View style={styles.listItemIcon}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={themeColor.secondaryS2}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listLabel}>{t('profile.email')}</Text>
                <Text style={styles.listValue}>aarav.mehta@email.com</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                <Text style={styles.verifiedText}>{t('profile.verified')}</Text>
              </View>
            </View>

            <View style={[styles.listItem, { borderBottomWidth: 0 }]}>
              <View style={styles.listItemIcon}>
                <Ionicons
                  name="call-outline"
                  size={20}
                  color={themeColor.secondaryS2}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listLabel}>{t('profile.phone')}</Text>
                <Text style={styles.listValue}>+91 98XXXXXX12</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
                <Text style={styles.verifiedText}>{t('profile.verified')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bank Account Card */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleGray}>
              <Ionicons
                name="business-outline"
                size={20}
                color={themeColor.secondary}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>
                {t('profile.bank_account')}
              </Text>
              <Text style={styles.sectionSubtitle}>{t('profile.bank_desc')}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
              <Text style={styles.verifiedText}>{t('profile.verified')}</Text>
            </View>
          </View>

          <View style={styles.bankInfoGrid}>
            <View style={styles.bankInfoItem}>
              <Text style={styles.bankInfoLabel}>{t('profile.account_holder')}</Text>
              <Text style={styles.bankInfoValue}>Aarav Mehta</Text>
            </View>
            <View style={styles.bankInfoItem}>
              <Text style={styles.bankInfoLabel}>{t('profile.ifsc')}</Text>
              <Text style={styles.bankInfoValue}>HDFC0001234</Text>
            </View>
            <View style={styles.bankInfoItem}>
              <Text style={styles.bankInfoLabel}>{t('profile.bank')}</Text>
              <Text style={styles.bankInfoValue}>HDFC Bank</Text>
            </View>
            <View style={styles.bankInfoItem}>
              <Text style={styles.bankInfoLabel}>{t('profile.account')}</Text>
              <Text style={styles.bankInfoValue}>•••• 4821</Text>
            </View>
          </View>

          <View style={styles.bankActions}>
            <TouchableOpacity style={styles.addBankBtn}>
              <Text style={styles.addBankBtnText}>
                {t('profile.add_bank_account')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.editAccountText}>
                {t('profile.edit_account')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* KYC Verification Card */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View
              style={[styles.iconCircleGray, { backgroundColor: '#F0FDF4' }]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#22C55E"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>
                {t('profile.kyc_verification')}
              </Text>
              <Text style={styles.sectionSubtitle}>{t('profile.kyc_desc')}</Text>
            </View>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>{t('profile.view')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.kycStatusRow}>
            <View style={styles.kycBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#22C55E" />
              <Text style={styles.kycBadgeText}>
                {t('profile.verified')} • {t('profile.pan_selfie')}
              </Text>
            </View>
          </View>

          <View style={styles.kycDetails}>
            <View style={styles.rowBetween}>
              <Text style={styles.kycLabel}>{t('profile.verified_on')}</Text>
              <Text style={styles.kycValue}>12 Feb 2026</Text>
            </View>
            <View style={styles.rowBetween}>
              <Text style={styles.kycLabel}>{t('profile.status')}</Text>
              <Text style={[styles.kycValue, { color: '#059669' }]}>
                {t('profile.approved')}
              </Text>
            </View>
          </View>
        </View>

        {/* Preferences Card */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconCircleGray}>
              <Ionicons
                name="settings-outline"
                size={20}
                color={themeColor.secondary}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>{t('profile.preferences')}</Text>
              <Text style={styles.sectionSubtitle}>
                {t('profile.notifications_language')}
              </Text>
            </View>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.listItemIcon}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color={themeColor.secondary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.prefTitle}>{t('profile.notifications')}</Text>
              <Text style={styles.prefSubtitle}>
                {t('profile.notifications_desc')}
              </Text>
            </View>
            <CustomToogle
              value={isNotificationsEnabled}
              onChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
            />
          </View>

          <TouchableOpacity
            style={[styles.preferenceItem, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('LanguageScreen')}
          >
            <View style={styles.listItemIcon}>
              <Ionicons
                name="language-outline"
                size={20}
                color={themeColor.secondary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.prefTitle}>{t('profile.language')}</Text>
              <Text style={styles.prefSubtitle}>English (India)</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={themeColor.secondaryS2}
            />
          </TouchableOpacity>

        </View>

        {/* Logout Card */}
        <View style={styles.whiteCard}>
          <View style={styles.cardHeader}>
            <View
              style={[
                styles.iconCircleGray,
                { backgroundColor: themeColor.secondary },
              ]}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color={themeColor.white}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.sectionTitle}>{t('profile.log_out')}</Text>
              <Text style={styles.sectionSubtitle}>
                {t('profile.log_out_desc')}
              </Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
              <Text style={styles.logoutBtnText}>{t('profile.logout_btn')}</Text>
            </TouchableOpacity>

          </View>
        </View>

        <Text style={styles.helpText}>{t('profile.help_text')}</Text>
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
      paddingBottom: hp('5%'),
    },
    statusRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
      marginBottom: 20,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    greenDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#22C55E',
    },
    statusText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    accountCard: {
      padding: 24,
      marginBottom: 24,
    },
    accountHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    cardSubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    cardTitle: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    badgesRow: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 12,
    },
    miniBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: theme.white,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    greenDotSmall: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#22C55E',
    },
    miniBadgeText: {
      fontSize: fontSize.f11,
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
      padding: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    subCardIconBox: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: theme.grayS3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subCardLabel: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    subCardValue: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 2,
    },
    whiteCard: {
      backgroundColor: theme.white,
      borderRadius: 32,
      padding: 20,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    iconCircleYellow: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.gold,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconCircleGray: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    sectionSubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    editBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 14,
      backgroundColor: '#F8FAFC',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    editBtnText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    listContainer: {
      backgroundColor: theme.white,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.grayS3,
      paddingHorizontal: 16,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.grayS3,
      gap: 12,
    },
    listItemIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    listValue: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 2,
    },
    verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    verifiedText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      color: '#059669',
    },
    bankInfoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 24,
    },
    bankInfoItem: {
      width: '47%',
    },
    bankInfoLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    bankInfoValue: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 4,
    },
    bankActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addBankBtn: {
      backgroundColor: theme.white,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    addBankBtnText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    editAccountText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    viewBtn: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 14,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    viewBtnText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    kycStatusRow: {
      marginBottom: 20,
    },
    kycBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    kycBadgeText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: '#059669',
    },
    kycDetails: {
      borderTopWidth: 1,
      borderTopColor: theme.grayS3,
      paddingTop: 16,
      gap: 12,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    kycLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    kycValue: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    preferenceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.grayS3,
      gap: 12,
    },
    prefTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    prefSubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    logoutBtn: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 18,
      backgroundColor: theme.gold,
    },
    logoutBtnText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    helpText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textAlign: 'center',
      marginTop: 24,
    },
  });

export default ProfileScreen;

