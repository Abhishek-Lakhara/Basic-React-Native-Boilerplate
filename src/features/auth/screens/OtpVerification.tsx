import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { fontFamily, fontSize, Ionicons, Feather } from '@/utils/fontIcon.utils';
import { wp, hp } from '@/utils/responsive.utils';
import {
  navigateAndSimpleReset,
  resetToNestedScreen,
  navigate,
} from '@/utils/navigation.utils';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import AuthComponent from '@/components/layouts/auth/AuthComponent';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/features/auth/authSlice';

export default function OtpVerification({ route }: any) {
  const { phoneNumber = '', countryCode = '' } = route.params || {};
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return;
    }

    const isKycCompleted = await getAsyncStorage(ASYNC_KEYS.IS_KYC_COMPLETED);
    dispatch(setCredentials({ accessToken: 'dummy_token' }));
    if (isKycCompleted) {
      navigateAndSimpleReset('MainStack');
    } else {
      resetToNestedScreen('MainStack', 'KycDetails');
    }
  };

  return (
    <AuthComponent
      title="India's First AI-Powered Multilingual Messenger"
      cardLabel={`Enter OTP Sent to ${countryCode}${phoneNumber}`}
      onLanguagePress={() => navigate('LanguageScreen')}
      bottomContent={
        <View>
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn&apos;t get OTP?</Text>
            <Pressable>
              <Text style={styles.resendLink}>Resend OTP</Text>
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <View style={styles.chatIconBubble}>
              <Feather
                name="message-circle"
                size={fontSize.f20}
                color={themeColor.secondary}
              />
            </View>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.featuresRow}>
            {[
              {
                icon: 'shield-outline',
                label: 'End-to-End\nEncrypted',
              },
              {
                icon: 'language-outline',
                label: 'AI Powered\nTranslation',
              },
              {
                icon: 'globe-outline',
                label: 'Multi-Language\nSupport',
              },
              {
                icon: 'flash-outline',
                label: 'Fast &\nReliable',
              },
            ].map(item => (
              <View key={item.label} style={styles.featureItem}>
                <View style={styles.featureIconWrap}>
                  <Ionicons
                    name={item.icon as any}
                    size={fontSize.f20}
                    color={themeColor.secondary}
                  />
                </View>
                <Text style={styles.featureLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      }
    >
      <View style={styles.otpBoxWrapper}>
        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          onFilled={setOtp}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusStickStyle: {
              backgroundColor: themeColor.secondary,
            },
            focusedPinCodeContainerStyle: {
              borderColor: themeColor.secondary,
              borderWidth: 2,
            },
          }}
        />

        <Pressable
          onPress={handleVerify}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitPressed,
          ]}
        >
          <Text style={styles.submitText}>Confirm OTP</Text>
          <Ionicons
            name="arrow-forward"
            size={fontSize.f18}
            color={themeColor.white}
            style={styles.submitIcon}
          />
        </Pressable>
      </View>
    </AuthComponent>
  );
}

const createStyle = (themeColor: any) =>
  StyleSheet.create({
    otpBoxWrapper: {
      marginTop: hp('0.5%'),
    },
    otpContainer: {
      justifyContent: 'space-between',
    },
    otpBox: {
      width: wp('11.5%'),
      height: wp('12.5%'),
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.08)',
      backgroundColor: themeColor.white,
    },
    otpText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f18,
      color: themeColor.secondary,
    },
    submitButton: {
      marginTop: hp('2.3%'),
      minHeight: 58,
      borderRadius: 16,
      backgroundColor: themeColor.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('5%'),
      shadowColor: themeColor.secondary,
      shadowOpacity: 0.22,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 14,
      elevation: 6,
    },
    submitPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    submitText: {
      color: themeColor.white,
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
    },
    submitIcon: {
      marginLeft: 10,
    },
    resendRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('2.2%'),
    },
    resendText: {
      color: themeColor.textS2,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginRight: 6,
    },
    resendLink: {
      color: themeColor.secondary,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('2.5%'),
      marginBottom: hp('4%'),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: 'rgba(15, 23, 42, 0.16)',
    },
    chatIconBubble: {
      marginHorizontal: wp('3%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    featuresRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: hp('2%'),
    },
    featureItem: {
      width: '23%',
      alignItems: 'center',
    },
    featureIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: themeColor.white,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: hp('1%'),
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 3,
    },
    featureLabel: {
      textAlign: 'center',
      color: themeColor.secondary,
      fontSize: fontSize.f10,
      lineHeight: fontSize.f12,
      fontFamily: fontFamily.semiBold,
    },
  });
