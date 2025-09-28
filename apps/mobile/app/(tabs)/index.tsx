import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native'
import { trpc } from '../../src/utils/trpc'
import { Ionicons } from '@expo/vector-icons'
import { PostAllOutput } from 'trpc-config'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 48) / 2 // 两列布局，考虑padding

const VideoCard: React.FC<{ item: PostAllOutput['posts'][number] }> = ({
  item,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start()
  }

  const formatDate = (date?: Date | null) => {
    if (!date) return '未知时间'

    const now = new Date()
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    )

    if (diffInHours < 1) return '刚刚'
    if (diffInHours < 24) return `${diffInHours} 小时前`
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)} 天前`
    return `${Math.floor(diffInHours / (24 * 7))} 周前`
  }

  // 生成随机视频时长
  const getDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const imgSrc =
    item.contentHtml?.match(/<img[^>]+src="([^">]+)"/)?.[1] ||
    item.attachments?.[0]?.url

  return (
    <Animated.View
      style={[styles.videoCard, { transform: [{ scale: scaleAnim }] }]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* 视频缩略图容器 */}
        <View style={styles.thumbnailContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            source={{
              uri: imgSrc,
            }}
            style={styles.thumbnail}
            resizeMode="cover"
            accessibilityLabel={`视频缩略图: ${item.title || '无标题'}`}
          />
          {/* 视频时长标签 */}
          {item.attachments?.[0]?.durationInSeconds &&
            item.attachments[0].durationInSeconds > 0 && (
              <View style={styles.durationTag}>
                <Text style={styles.durationText}>
                  {getDuration(item.attachments[0].durationInSeconds)}
                </Text>
              </View>
            )}
        </View>

        {/* 视频信息 */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title || '无标题'}
          </Text>

          {/* 用户信息 */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={16} color="#666" />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.username} numberOfLines={1}>
                {item.rssSub?.title ? item.rssSub.title : '未知用户'}
              </Text>
              <Text style={styles.publishTime}>
                {formatDate(item.datePublished)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const {
    data: postsData,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.all.useInfiniteQuery(
    {
      limit: 10,
    },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    },
  )

  const refreshMutation = trpc.post.refresh.useMutation()

  const posts = postsData?.pages.flatMap(page => page.posts) ?? []

  const onRefresh = async () => {
    setRefreshing(true)
    try {
      // First, trigger the refresh endpoint to fetch newest RSS items
      const refreshResult = await refreshMutation.mutateAsync({ force: true })

      if (refreshResult.success) {
        // Then refetch the posts to get the updated data
        await refetch()
      }
    } catch (error) {
      console.error('Error refreshing:', error)
    } finally {
      setRefreshing(false)
    }
  }

  // Show refreshing state if either manual refresh or mutation is loading
  const isRefreshing = refreshing || refreshMutation.isLoading

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  const renderItem = ({ item }: { item: PostAllOutput['posts'][number] }) => (
    <VideoCard item={item} />
  )

  const renderFooter = () => {
    if (!isFetchingNextPage) return null
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color="#FF6B35" />
      </View>
    )
  }

  const tabs = [
    { title: '推荐', color: '#FF6B35' },
    { title: '热门', color: '#4ECDC4' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* 头部 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>视频</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onRefresh}
            disabled={isRefreshing}
          >
            <Ionicons
              name={isRefreshing ? 'sync' : 'refresh'}
              size={24}
              color={isRefreshing ? '#FF6B35' : '#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 标签页 */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tab,
              activeTab === index && { backgroundColor: tab.color },
            ]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 内容区域 */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.url}-${index}`}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  videoCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnailContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  durationTag: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  publishTime: {
    fontSize: 11,
    color: '#999',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  loadingFooter: {
    paddingVertical: 20,
    alignItems: 'center',
  },
})
