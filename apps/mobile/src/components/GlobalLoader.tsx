import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native'
import {
  colors,
  spacing,
  fontSize,
} from '../../../../packages/design-tokens/src'

interface GlobalLoaderProps {
  visible: boolean
  text?: string
  transparent?: boolean
}

const { width, height } = Dimensions.get('window')

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({
  visible,
  text = '正在加载...',
  transparent = false,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, fadeAnim, scaleAnim])

  if (!visible) return null

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.backdrop} />
        
        <Animated.View
          style={[
            styles.loaderContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.loader}>
            <ActivityIndicator
              size="large"
              color={colors.primary[500]}
              style={styles.spinner}
            />
            <Text style={styles.text}>{text}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 140,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  spinner: {
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray[700],
    textAlign: 'center',
  },
})
