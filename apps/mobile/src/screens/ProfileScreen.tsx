import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { Button } from '../components'
import {
  colors,
  spacing,
  fontSize,
} from '../../../../packages/design-tokens/src'
import { trpc } from '../utils/trpc'

interface ProfileScreenProps {
  onSignOut: () => void
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSignOut }) => {
  // Get user profile data
  const { data: userProfile, isLoading, error } = trpc.user.me.useQuery()
  
  // Get user posts (with empty filter for now)
  const { data: userPosts } = trpc.post.all.useQuery({ limit: 10 })

  const handleSignOut = () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '退出',
          style: 'destructive',
          onPress: onSignOut,
        },
      ]
    )
  }

  const handleEditProfile = () => {
    Alert.alert('提示', '编辑资料功能即将推出')
  }

  const handleSettings = () => {
    Alert.alert('提示', '设置功能即将推出')
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>加载失败</Text>
          <Text style={styles.errorDetails}>{error.message}</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userProfile?.email?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          </View>
          
          <Text style={styles.userName}>
            {userProfile?.email?.split('@')[0] || '用户'}
          </Text>
          
          <Text style={styles.userEmail}>
            {userProfile?.email || 'user@example.com'}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>编辑资料</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {userPosts?.posts?.length || 0}
            </Text>
            <Text style={styles.statLabel}>文章</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>关注者</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>关注中</Text>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>用户ID</Text>
            <Text style={styles.infoValue}>
              {userProfile?.id || 'N/A'}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>注册时间</Text>
            <Text style={styles.infoValue}>
              {userProfile?.created_at 
                ? new Date(userProfile.created_at).toLocaleDateString()
                : 'N/A'
              }
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>个人简介</Text>
            <Text style={styles.infoValue}>
              这个人很懒，什么都没有留下...
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSettings}
          >
            <Text style={styles.actionButtonText}>设置</Text>
          </TouchableOpacity>

          <Button
            title="退出登录"
            onPress={handleSignOut}
            style={styles.signOutButton}
            textStyle={styles.signOutButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: spacing.lg,
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
    marginBottom: spacing.xl,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: fontSize['2xl'],
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing.md,
  },
  editButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: fontSize.sm,
    color: colors.gray[700],
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.gray[50],
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
  },
  infoContainer: {
    marginBottom: spacing.xl,
  },
  infoItem: {
    marginBottom: spacing.lg,
  },
  infoLabel: {
    fontSize: fontSize.sm,
    color: colors.gray[600],
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.base,
    color: colors.gray[900],
  },
  actionsContainer: {
    gap: spacing.md,
  },
  actionButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: fontSize.base,
    color: colors.gray[700],
    fontWeight: '500',
  },
  signOutButton: {
    backgroundColor: colors.error[500],
  },
  signOutButtonText: {
    color: '#FFFFFF',
  },
})
