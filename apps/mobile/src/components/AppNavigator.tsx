/**
 * Simple navigation component for demo purposes
 */

import React, { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SignInScreen, ProfileScreen } from '../screens'
import { Session } from '@supabase/supabase-js'
import { trpc } from '../utils/trpc'
import { supabase } from '../../lib/supabase'

type Screen = 'profile' | 'settings'

export const AppNavigator: React.FC = async () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('profile')

  const session = await supabase.auth.getSession()
  const isAuthenticated = !!session

  const handleSignInSuccess = () => {
    setCurrentScreen('profile')
  }

  const handleSignOut = () => {
    setCurrentScreen('profile')
  }

  const renderTabBar = () => {
    if (!isAuthenticated) return null

    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, currentScreen === 'profile' && styles.activeTab]}
          onPress={() => setCurrentScreen('profile')}
        >
          <Text
            style={[
              styles.tabText,
              currentScreen === 'profile' && styles.activeTabText,
            ]}
          >
            个人资料
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, currentScreen === 'settings' && styles.activeTab]}
          onPress={() => setCurrentScreen('settings')}
        >
          <Text
            style={[
              styles.tabText,
              currentScreen === 'settings' && styles.activeTabText,
            ]}
          >
            设置
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderScreen = () => {
    if (!isAuthenticated) {
      return <SignInScreen onSignInSuccess={handleSignInSuccess} />
    }

    switch (currentScreen) {
      case 'profile':
        return <ProfileScreen onSignOut={handleSignOut} />
      case 'settings':
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>设置页面</Text>
            <Text style={styles.placeholderSubtext}>功能即将推出...</Text>
          </View>
        )
      default:
        return <ProfileScreen onSignOut={handleSignOut} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Bar */}
      {renderTabBar()}
      {/* Screen content */}
      <View style={styles.screenContainer}>{renderScreen()}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  screenContainer: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#6B7280',
  },
})
