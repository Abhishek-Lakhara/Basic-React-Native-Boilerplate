import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { themeType, TLanguageScreenProps } from '@/interface';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { AppContext } from '@/app/providers/LanguageProvider';
import { ASYNC_KEYS, languageList } from '@/utils/contant.utils';
import { useDebounce } from '@/hooks/useDebounce';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { CustomButton, GradiantBackground } from '@/components';
import { navigateAndSimpleReset } from '@/utils/navigation.utils';
import { setAsyncStorage } from '@/utils/helper.utils';

export default function LanguageScreen({ navigation }: TLanguageScreenProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { currentLanguage, changeLanguage } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(languageList);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = languageList.filter(item =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
      setFilteredLanguages(filtered);
    } else {
      setFilteredLanguages(languageList);
    }
  }, [debouncedSearch]);

  const renderItem = ({ item }: { item: (typeof languageList)[0] }) => {
    const isSelected = currentLanguage === item.code;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && { backgroundColor: themeColor.yellowS1 },
        ]}
        onPress={() => changeLanguage(item.code)}
        activeOpacity={0.7}
      >
        <View style={styles.itemLeft}>
          <View style={styles.flagContainer}>
            <Image source={item.flag} style={styles.flag} />
          </View>
          <Text style={[styles.languageName, { color: themeColor.secondary }]}>
            {item.name}
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          {isSelected ? (
            <View
              style={[
                styles.selectedIndicator,
                { backgroundColor: themeColor.yellow },
              ]}
            >
              <Ionicons name="checkmark" size={fontSize.f14} color="white" />
            </View>
          ) : (
            <View
              style={[
                styles.unselectedIndicator,
                { borderColor: themeColor.borderColor },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GradiantBackground>
      <View style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: themeColor.secondary }]}>
            Choose the language
          </Text>
          <Text style={[styles.subtitle, { color: themeColor.textS2 }]}>
            Select your preferred language below This helps us serve you better.
          </Text>
        </View>

        <View
          style={[
            styles.listContainer,
            {
              backgroundColor: themeColor.backgroundColorS1,
              borderColor: themeColor.borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.searchSection,
              { borderBottomColor: 'rgba(0,0,0,0.05)' },
            ]}
          >
            <Ionicons
              name="search"
              size={fontSize.f20}
              color={themeColor.secondary}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor={themeColor.textS2}
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <FlatList
            data={filteredLanguages}
            renderItem={renderItem}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.listContent}
            bounces={false}
          />
        </View>

        {currentLanguage ? (
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Continue"
              onPress={async () => {
                await setAsyncStorage(ASYNC_KEYS.IS_LANGAUGE_SELECTED, 'true');
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigateAndSimpleReset('AuthStack');
                }
              }}
              style={[styles.button, { backgroundColor: themeColor.secondary }]}
              textStyle={styles.buttonText}
              isGradiantRequired={false}
            />
          </View>

        ) : null}
      </View>
    </GradiantBackground>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      paddingHorizontal: wp('5%'),
    },
    header: {
      marginTop: hp('2%'),
      marginBottom: hp('3%'),
    },
    title: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f28,
      marginBottom: hp('1%'),
      letterSpacing: -0.5,
    },
    subtitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f16,
      lineHeight: fontSize.f22,
    },
    listContainer: {
      flexShrink: 1,
      borderRadius: 25,
      overflow: 'hidden',
      borderWidth: 1,
      marginBottom: hp('3%'),
    },
    searchSection: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('4%'),
      height: 60,
      borderBottomWidth: 1,
      backgroundColor: themeColor.backgroundColorS2,
    },
    searchInput: {
      flex: 1,
      marginLeft: wp('3%'),
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f16,
      color: themeColor.secondary,
    },
    listContent: {
      paddingBottom: hp('1%'),
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp('4%'),
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
      backgroundColor: themeColor.backgroundColorS2,
    },

    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flagContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      overflow: 'hidden',
      marginRight: wp('4%'),
      backgroundColor: themeColor.backgroundColorS2,
    },
    flag: {
      width: '100%',
      height: '100%',
    },
    languageName: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f18,
    },
    indicatorContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedIndicator: {
      width: 22,
      height: 22,
      borderRadius: 11,
      justifyContent: 'center',
      alignItems: 'center',
    },
    unselectedIndicator: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1.5,
    },
    buttonContainer: {
      paddingBottom: hp('2%'),
    },
    button: {
      width: '100%',
      height: 55,
      borderRadius: 15,
      marginTop: 0,
    },
    buttonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f18,
      textTransform: 'none',
    },
  });
