import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { TLandingScreenStackProps } from '@/interface/navigation.type';
import Video from 'react-native-video';
import { IMAGES } from '@/assets';
import { Ionicons } from '@/utils/fontIcon.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import { setAsyncStorage } from '@/utils/helper.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { fontFamily } from '@/utils/fontIcon.utils';

export default function LandingScreen({ navigation }: TLandingScreenStackProps) {
  const [step, setStep] = useState(0);

  const isSecondStep = step === 1;
  const title = isSecondStep
    ? 'One App. Every Language.'
    : 'Speak Beyond Languages';
  const description = isSecondStep
    ? 'Experience seamless messaging, voice, and connection without language barriers.'
    : 'Connect, chat, and express yourself instantly with AI-powered multilingual conversations.';
  const buttonText = isSecondStep ? 'Start Messaging' : 'Next';

  const handleNext = async () => {
    if (!isSecondStep) {
      setStep(1);
      return;
    }

    await setAsyncStorage(ASYNC_KEYS.IS_LANDING_COMPLETED, 'true');
    navigation.replace('AuthStack', { screen: 'Login' });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Video
        source={IMAGES.onBoardingBg}
        style={styles.video}
        resizeMode="cover"
        repeat
        muted
        paused={false}
        playInBackground={false}
        playWhenInactive={false}
      />
      <View style={styles.overlayWrap} pointerEvents="box-none">
        <View style={styles.overlayCard}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
            <Ionicons
              name="arrow-forward"
              size={22}
              color="#FFFFFF"
              style={styles.buttonIcon}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlayWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  overlayCard: {
    width: '100%',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: wp('7%'),
    paddingTop: hp('3.2%'),
    paddingBottom: hp('4.2%'),
    backgroundColor: 'rgba(246, 248, 252, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
    shadowColor: '#0F172A',
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 10,
  },
  title: {
    color: '#243056',
    fontSize: 25,
    lineHeight: 31,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginBottom: hp('1.2%'),
  },
  description: {
    color: '#334155',
    fontSize: 17,
    lineHeight: 24,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginBottom: hp('3.2%'),
  },
  button: {
    minHeight: 58,
    borderRadius: 18,
    backgroundColor: '#232D54',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: fontFamily.semiBold,
  },
  buttonIcon: {
    marginLeft: 10,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});
