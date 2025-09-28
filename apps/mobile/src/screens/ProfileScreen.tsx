import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Animated,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, useGlobalLoading } from '../components'
import {
  colors,
  spacing,
  fontSize,
} from '../../../../packages/design-tokens/src'
import { trpc } from '../utils/trpc'
import { supabase } from '../../lib/supabase'

interface ProfileScreenProps {
  onSignOut: () => void
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSignOut }) => {
  const insets = useSafeAreaInsets()
  const [scrollY] = useState(new Animated.Value(0))
  const { showLoading, hideLoading } = useGlobalLoading()

  // Get user profile data
  const { data: userProfile, isLoading, error } = trpc.user.me.useQuery()
  const { mutateAsync: signOut, isPending } = trpc.user.signOut.useMutation({
    onSuccess: async () => {
      await supabase.auth.signOut()
      hideLoading()
      onSignOut()
    },
    onError: error => {
      hideLoading()
      Alert.alert('错误', error.message)
    },
  })

  // Show/hide global loading based on isPending
  useEffect(() => {
    if (isPending) {
      showLoading('正在退出登录...')
    } else {
      hideLoading()
    }

    return () => {
      hideLoading()
    }
  }, [isPending, showLoading, hideLoading])

  // 定义渐变的关键点
  const HEADER_SCROLL_DISTANCE = 120

  // 创建动画插值
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 3, HEADER_SCROLL_DISTANCE],
    outputRange: [
      'rgba(102, 126, 234, 1)',
      'rgba(102, 126, 234, 0.95)',
      'rgba(255, 255, 255, 0.98)',
    ],
    extrapolate: 'clamp',
  })

  const headerTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE * 0.8],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  })

  const headerTitleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [10, 5, 0],
    extrapolate: 'clamp',
  })

  const headerShadowOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.1, 0.2],
    extrapolate: 'clamp',
  })

  const borderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 0.5],
    extrapolate: 'clamp',
  })

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
    },
  )

  const handleSignOut = async () => {
    Alert.alert('退出登录', '确定要退出登录吗？', [
      {
        text: '取消',
        style: 'cancel',
      },
      {
        text: '退出',
        style: 'destructive',
        onPress: async () => {
          await signOut()
        },
      },
    ])
  }

  const handleEditProfile = () => {
    Alert.alert('提示', '编辑资料功能即将推出')
  }

  const settingsItems = [
    {
      id: 'general',
      title: '通用',
      icon: 'settings-outline',
      iconColor: '#FF6B8A',
      onPress: () => Alert.alert('通用', '通用设置功能即将推出'),
    },
    {
      id: 'appearance',
      title: '外观',
      icon: 'color-palette-outline',
      iconColor: '#8B5CF6',
      onPress: () => Alert.alert('外观', '外观设置功能即将推出'),
    },
    {
      id: 'data',
      title: '数据控制',
      icon: 'server-outline',
      iconColor: '#3B82F6',
      onPress: () => Alert.alert('数据控制', '数据控制功能即将推出'),
    },
    {
      id: 'account',
      title: '账户',
      icon: 'people-outline',
      iconColor: '#F59E0B',
      onPress: () => Alert.alert('账户', '账户设置功能即将推出'),
    },
    {
      id: 'automation',
      title: '自动化',
      icon: 'flash-outline',
      iconColor: '#8B5CF6',
      onPress: () => Alert.alert('自动化', '自动化功能即将推出'),
    },
    {
      id: 'shortcuts',
      title: '列表',
      icon: 'list-outline',
      iconColor: '#06B6D4',
      onPress: () => Alert.alert('列表', '列表功能即将推出'),
    },
    {
      id: 'privacy',
      title: '隐私',
      icon: 'shield-checkmark-outline',
      iconColor: '#6366F1',
      onPress: () => Alert.alert('隐私', '隐私设置功能即将推出'),
    },
    {
      id: 'about',
      title: '关于',
      icon: 'information-circle-outline',
      iconColor: '#F59E0B',
      onPress: () => Alert.alert('关于', '关于页面功能即将推出'),
    },
  ]

  const renderSettingItem = (item: any, index: number) => (
    <Animated.View
      key={item.id}
      style={{
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, -index * 2],
              extrapolate: 'clamp',
            }),
          },
        ],
        opacity: scrollY.interpolate({
          inputRange: [0, 50, 150],
          outputRange: [1, 1, 0.9],
          extrapolate: 'clamp',
        }),
      }}
    >
      <TouchableOpacity
        style={styles.settingItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.settingItemLeft}>
          <View
            style={[
              styles.settingIcon,
              { backgroundColor: item.iconColor + '20' },
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={20}
              color={item.iconColor}
            />
          </View>
          <Text style={styles.settingTitle}>{item.title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </TouchableOpacity>
    </Animated.View>
  )

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: '#667eea',
            zIndex: 1001,
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        </Animated.View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            height: insets.top,
            backgroundColor: '#667eea',
            zIndex: 1001,
          }}
        >
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        </Animated.View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>加载失败</Text>
          <Text style={styles.errorDetails}>{error.message}</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          height: insets.top,
          backgroundColor: headerBackgroundColor,
          zIndex: 1001,
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
      </Animated.View>

      {/* Fixed Header */}
      <Animated.View
        style={[
          styles.fixedHeader,
          {
            paddingTop: insets.top,
            backgroundColor: headerBackgroundColor,
            borderBottomWidth: borderOpacity,
            borderBottomColor: 'rgba(0, 0, 0, 0.1)',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: headerShadowOpacity,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ translateY: headerTitleTranslateY }],
          }}
        >
          <Animated.Text
            style={[styles.fixedHeaderTitle, { opacity: headerTitleOpacity }]}
          >
            设置
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              paddingTop: 40,
              backgroundColor: scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: ['#667eea', '#764ba2'],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Animated.View
              style={[
                styles.avatar,
                {
                  transform: [
                    {
                      scale: scrollY.interpolate({
                        inputRange: [0, HEADER_SCROLL_DISTANCE],
                        outputRange: [1, 0.8],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image
                source={{
                  uri: userProfile?.user_metadata.image || '',
                }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="cover"
                alt={userProfile?.user_metadata.name[0]}
              />
            </Animated.View>
          </View>

          <Animated.Text
            style={[
              styles.userName,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            {userProfile?.user_metadata.name}
          </Animated.Text>

          <Animated.Text
            style={[
              styles.userHandle,
              {
                opacity: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            @{userProfile?.user_metadata.handle}
          </Animated.Text>

          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            }}
          >
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>编辑</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        {/* Settings Items */}
        <View style={styles.settingsContainer}>
          {settingsItems.map((item, index) => renderSettingItem(item, index))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutItem}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <View style={styles.settingItemLeft}>
            <View
              style={[styles.settingIcon, { backgroundColor: '#FF384220' }]}
            >
              <Ionicons name="log-out-outline" size={20} color="#FF3842" />
            </View>
            <Text style={[styles.settingTitle, { color: '#FF3842' }]}>
              登出
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixedHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontSize.lg,
    color: colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    fontSize: fontSize.lg,
    color: colors.error[500],
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  errorDetails: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 30,
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  settingsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 2,
    borderRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 17,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
  },
  signOutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
  },
})
