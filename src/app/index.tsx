import React, { useEffect, useRef } from 'react'
import { Animated, useWindowDimensions, View } from 'react-native'

import { router } from 'expo-router'

import SvgLogo from '@assets/icons/logo.svg'
import SvgWhiteLogo from '@assets/icons/white-logo.svg'

import { Colors } from '@/constants/Colors'

class Logo extends React.Component<
  { color: string; width: number; height: number },
  object
> {
  render() {
    if (this.props.color === Colors.light.primary)
      return (
        <SvgLogo
          width={this.props.width}
          height={this.props.height}
          fill={Colors.light.primary}
        />
      )

    return (
      <SvgWhiteLogo
        width={this.props.width}
        height={this.props.height}
        fill={this.props.color}
      />
    )
  }
}

const AnimatedLogo = Animated.createAnimatedComponent(Logo)

function Circle({
  animatedValue,
  background,
}: {
  animatedValue: Animated.Value
  background: string
}) {
  const { width, height } = useWindowDimensions()

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          backgroundColor: background,
          borderRadius: 9999,
          width: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, width / 0.5, width * 1.2],
          }),
          height: animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, width / 0.5, height * 1.2],
          }),
        },
      ]}
    ></Animated.View>
  )
}

export default function Splashscreen() {
  const { width } = useWindowDimensions()

  const whiteCircle = useRef(new Animated.Value(0)).current
  const blueCircle = useRef(new Animated.Value(0)).current
  const logoColor = useRef(new Animated.Value(0)).current

  const ANIMATION_DURATION = 1000
  const LOGO_WIDTH = width / 2

  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(whiteCircle, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
          Animated.timing(logoColor, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(blueCircle, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
          Animated.timing(logoColor, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() =>
        setTimeout(() => {
          router.replace('/(public)/auth')
        }, ANIMATION_DURATION / 2),
      )
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View className="flex-1 flex items-center relative justify-center bg-primary">
      <Circle animatedValue={whiteCircle} background={Colors.light.white} />
      <Circle animatedValue={blueCircle} background={Colors.light.primary} />
      <AnimatedLogo
        width={LOGO_WIDTH}
        height={LOGO_WIDTH / 2}
        color={logoColor.interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.light.white, Colors.light.primary],
        })}
      />
    </View>
  )
}
