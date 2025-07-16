import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { Button, Input, Logo } from '../components'
import {
  colors,
  spacing,
  fontSize,
} from '../../../../packages/design-tokens/src'
import { trpc } from '../utils/trpc'
import { supabase } from '../../lib/supabase'

interface SignInScreenProps {
  onSignInSuccess?: () => void
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState('864129545@qq.com')
  const [password, setPassword] = useState('zzj123,.')
  const [loading, setLoading] = useState(false)

  // Use tRPC auth hook
  const { mutateAsync: signIn, isPending: isSigningIn } =
    trpc.user.signIn.useMutation({
      onSuccess: data => {
        Alert.alert('成功', '登录成功！')
        console.log('Sign in data:', data)
        if (!data.data.session) {
          Alert.alert('错误', '登录失败，请重试')
          return
        }
        // Call the success callback to navigate to profile
        supabase.auth.setSession(data.data.session)
      },
      onError: error => {
        Alert.alert('错误', `登录失败: ${error.message}`)
      },
    })

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('错误', '请填写邮箱和密码')
      return
    }

    try {
      // Use tRPC signIn mutation
      // signIn({
      //   email,
      //   password,
      // })
      signInWithEmail()
    } catch (error) {
      // Error handling is done in the hook
      console.error('Sign in error:', error)
    }
  }

  const handleForgotPassword = () => {
    Alert.alert('提示', '忘记密码功能即将推出')
  }

  const handleSignUp = () => {
    Alert.alert('提示', '注册功能即将推出')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Logo size={64} />
              <Text style={styles.title}>
                Sign In to <Text style={styles.titleBold}>Flash</Text>
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />

              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isPassword
                autoCapitalize="none"
                autoComplete="password"
              />

              <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                  title="Login"
                  onPress={handleSignIn}
                  disabled={!email || !password}
                  isLoading={loading}
                  style={styles.loginButton}
                />
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Debug Info - Show if authenticated */}
            {/* {isAuthenticated && user && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugText}>
                  Logged in as: {user.email || 'User'}
                </Text>
              </View>
            )} */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    alignItems: 'center',
    minWidth: 300,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  title: {
    fontSize: fontSize['2xl'],
    color: colors.gray[700],
    marginTop: spacing.xl,
  },
  titleBold: {
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    gap: spacing.md,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  linkText: {
    color: colors.gray[500],
    fontSize: fontSize.sm,
  },
  loginButton: {
    minWidth: 100,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    width: '100%',
    marginVertical: spacing.xl,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  signUpText: {
    color: colors.gray[700],
    fontSize: fontSize.sm,
  },
  signUpLink: {
    color: colors.primary[500],
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  debugContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    width: '100%',
  },
  debugText: {
    color: colors.gray[600],
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
})
