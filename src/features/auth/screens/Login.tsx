import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useToastMessage } from '@/hooks';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { registerFCMToken } from '@/utils/helper.utils';
import AuthComponent from '@/components/layouts/auth/AuthComponent';
import { navigate } from '@/utils/navigation.utils';
import {
  CountryCodeInput,
  countryData,
  validatePhone,
  type Country,
  type CountryCodeInputStyles,
} from '@laxkar77/react-native-country-code-input';
import { useSendOtpMutation } from '@/features/auth/authApi';

type LoginFormValues = {
  phone: string;
};

export default function Login() {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { t } = useTranslation();
  const { showSuccess, showError } = useToastMessage();
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryData.find(c => c.code === 'IN') || countryData[0],
  );

  useEffect(() => {
    registerFCMToken().catch(() => undefined);
  }, []);

  const handleLogin = async (values: LoginFormValues) => {
    const countryCode = selectedCountry.dialCode.replace(/\D/g, '');
    const phone = `${selectedCountry.dialCode}${values.phone}`.replace(/\s/g, '');

    try {
      const response = await sendOtp({ phone, countryCode }).unwrap();

      showSuccess(response.message || t('auth.otp_sent', 'OTP sent successfully'));
      navigate('AuthStack', {
        screen: 'OtpVerification',
        params: {
          countryCode: selectedCountry.dialCode,
          phoneNumber: values.phone,
        },
      });
    } catch {
      showError(t('auth.otp_failed', 'Failed to send OTP'));
    }
  };

  const inputStyles: CountryCodeInputStyles = {
    container: styles.phoneInputContainer,
    label: styles.phoneLabel,
    inputWrapper: styles.phoneInputWrapper,
    countrySection: styles.countrySection,
    dialCodeText: styles.dialText,
    input: styles.phoneInput,
    errorText: styles.errorText,
    separator: { backgroundColor: themeColor.borderColor },
    modalOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
    bottomSheet: { backgroundColor: themeColor.backgroundColorS1 },
    modalTitle: { color: themeColor.secondary },
    searchContainer: { backgroundColor: themeColor.backgroundColorS2 },
    searchInput: { color: themeColor.secondary },
    listItem: { borderBottomColor: themeColor.borderColor },
    selectedListItem: { backgroundColor: themeColor.backgroundColorS2 },
    listItemName: { color: themeColor.secondary },
    listItemDialCode: { color: themeColor.secondaryS2 },
    checkmark: { color: themeColor.secondary },
  };

  return (
    <AuthComponent
      title="India's First AI-Powered Multilingual Messenger"
      cardLabel="Login to continue to BharaTalk"
    >
      <Formik<LoginFormValues>
        initialValues={{ phone: '' }}
        validate={values => {
          const errors: Partial<Record<keyof LoginFormValues, string>> = {};
          if (!values.phone) {
            errors.phone = 'errors.phoneRequired';
          } else if (!validatePhone(values.phone, selectedCountry)) {
            errors.phone = 'errors.invalidPhone';
          }
          return errors;
        }}
        onSubmit={handleLogin}
        enableReinitialize={false}
      >
        {({ handleSubmit, values, errors, setFieldValue }) => (
          <>
            <CountryCodeInput
              value={values.phone}
              onChangeText={text => setFieldValue('phone', text)}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              showPhoneIcon={false}
              label={t('auth.mobile_number')}
              placeholder={t('auth.mobile_placeholder')}
              styles={inputStyles}
              renderDropdownIcon={() => (
                <Ionicons
                  name="chevron-down"
                  size={fontSize.f12}
                  color={themeColor.secondaryS2}
                />
              )}
            />

            {errors.phone && values.phone ? (
              <Text style={styles.errorText}>
                {errors.phone === 'errors.phoneRequired'
                  ? t('errors.phoneRequired')
                  : t('errors.invalidPhone')}
              </Text>
            ) : null}

            <Pressable
              onPress={handleSubmit as any}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.submitPressed,
                isLoading && styles.submitDisabled,
              ]}
            >
              <Text style={styles.submitText}>
                {isLoading ? t('common.loading', 'Loading...') : t('auth.continue_mobile')}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={fontSize.f18}
                color={themeColor.white}
                style={styles.submitIcon}
              />
            </Pressable>
          </>
        )}
      </Formik>
    </AuthComponent>
  );
}

const createStyle = (themeColor: any) =>
  StyleSheet.create({
    phoneInputContainer: {
      width: '100%',
    },
    phoneLabel: {
      color: themeColor.textS2,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginBottom: 12,
    },
    phoneInputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColor.backgroundColorS1,
      borderColor: themeColor.borderColor,
    },
    countrySection: {
      backgroundColor: themeColor.backgroundColorS1,
      height: 52,
    },
    dialText: {
      color: themeColor.secondary,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
      marginLeft: 6,
      marginRight: 2,
    },
    phoneInput: {
      flex: 1,
      color: themeColor.secondary,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      paddingVertical: 0,
      height: '100%',
    },
    errorText: {
      marginTop: hp('0.8%'),
      color: themeColor.red,
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
    },
    submitButton: {
      marginTop: hp('2.3%'),
      minHeight: 58,
      borderRadius: 16,
      backgroundColor: themeColor.actionBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('5%'),
      shadowColor: themeColor.shadow,
      shadowOpacity: 0.22,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 14,
      elevation: 6,
    },
    submitPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    submitDisabled: {
      opacity: 0.75,
    },
    submitText: {
      color: themeColor.white,
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
    },
    submitIcon: {
      marginLeft: 10,
    },
    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('2.2%'),
    },
    signupText: {
      color: themeColor.textS2,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginRight: 6,
    },
    signupLink: {
      color: themeColor.secondary,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    }
  });
