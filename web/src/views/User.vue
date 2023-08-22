<template>
    <div>
        <main-nav :title="$t('userDetails')" />

        <n-list class="main-content-wrap profile-wrap" bordered>
            <!-- 基础信息 -->
            <n-spin :show="userLoading">
                <div class="profile-baseinfo" v-if="user.id > 0">
                    <div class="avatar">
                        <n-avatar :size="72" :src="user.avatar" />
                    </div>
                    <div class="base-info">
                        <div class="username">
                            <strong>{{ user.nickname }}</strong>
                            <span> @{{ user.username }} </span>
                            <n-tag
                                v-if="store.state.userInfo.id > 0 && store.state.userInfo.username != user.username && user.is_friend"
                                class="top-tag" type="info" size="small" round>{{$t('friends')}}</n-tag>
                            <n-tag
                                v-if="store.state.userInfo.id > 0 && store.state.userInfo.username != user.username && user.is_following"
                                class="top-tag" type="success" size="small" round>{{$t('followed')}}</n-tag>
                            <n-tag v-if="user.is_admin" class="top-tag" type="error" size="small" round>{{$t('administrator')}}</n-tag>
                        </div>
                        <div class="userinfo">
                            <span class="info-item">UID. {{ user.id }} </span>
                            <span class="info-item">{{$t('Joined in {date}', {date: formatDate(user.created_on)}) }}</span>
                        </div>
                        <div v-if="false" class="userinfo">
                            <span class="info-item">
                                <router-link
                                    @click.stop
                                    class="following-link"
                                    :to="{
                                        name: 'following',
                                        query: { 
                                            s: user.username, 
                                            n: user.nickname,
                                            t: 'follows',
                                        },
                                    }"
                                >
                                    关注&nbsp;&nbsp;{{ user.follows}}
                                </router-link>
                            </span>
                            <span class="info-item">
                                <router-link
                                    @click.stop
                                    class="following-link"
                                    :to="{
                                        name: 'following',
                                        query: { 
                                            s: user.username, 
                                            n: user.nickname,
                                            t: 'followings',
                                        },
                                    }"
                                >
                                    粉丝&nbsp;&nbsp;{{ user.followings }}
                                </router-link>
                            </span>
                        </div>
                    </div>

                    <div class="user-opts"
                        v-if="store.state.userInfo.id > 0 && store.state.userInfo.username != user.username">
                        <n-dropdown placement="bottom-end" trigger="click" size="small" :options="userOptions"
                            @select="handleUserAction">
                            <n-button quaternary circle>
                                <template #icon>
                                    <n-icon>
                                        <more-horiz-filled />
                                    </n-icon>
                                </template>
                            </n-button>
                        </n-dropdown>
                    </div>
                </div>

                <!-- 私信组件 -->
                <whisper :show="showWhisper" :user="user" @success="whisperSuccess" />
                <!-- 加好友组件 -->
                <whisper-add-friend :show="showAddFriendWhisper" :user="user" @success="addFriendWhisperSuccess" />
            </n-spin>
            <n-tabs class="profile-tabs-wrap" type="line" animated @update:value="changeTab">
                <n-tab-pane name="post" :tab="$t('tabs.bubble')"> </n-tab-pane>
                <n-tab-pane name="comment" :tab="$t('tabs.comments')"> </n-tab-pane>
                <n-tab-pane name="highlight" :tab="$t('tabs.highlights')"> </n-tab-pane>
                <n-tab-pane name="media" :tab="$t('tabs.media')"> </n-tab-pane>
                <n-tab-pane name="star" :tab="$t('tabs.likes')"> </n-tab-pane>
            </n-tabs>
            <div v-if="loading" class="skeleton-wrap">
                <post-skeleton :num="pageSize" />
            </div>
            <div v-else>
                <div class="empty-wrap" v-if="list.length === 0">
                    <n-empty size="large" :description="$t('noDataAvailable')" />
                </div>

                <div v-if="store.state.desktopModelShow">
                    <n-list-item v-for="post in list" :key="post.id">
                        <post-item :post="post" />
                    </n-list-item>
                </div>
                <div v-else>
                    <n-list-item v-for="post in list" :key="post.id">
                        <mobile-post-item :post="post" />
                    </n-list-item>
                </div>
            </div>
        </n-list>
        <div class="pagination-wrap" v-if="totalPage > 0">
            <n-pagination
                :page="page"
                @update:page="updatePage"
                :page-slot="!store.state.collapsedRight ? 8 : 5" 
                :page-count="totalPage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, ref, reactive, watch, onMounted, computed } from 'vue';
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { getUserProfile, getUserPosts, changeUserStatus, deleteFriend, followUser, unfollowUser } from '@/api/user';
import { useDialog, DropdownOption } from 'naive-ui';
import WhisperAddFriend from '../components/whisper-add-friend.vue';
import { MoreHorizFilled } from '@vicons/material';
import { formatDate } from '@/utils/formatTime';
import {
    PaperPlaneOutline,
    PersonAddOutline,
    PersonRemoveOutline,
    CubeOutline,
    BodyOutline,
    WalkOutline
} from '@vicons/ionicons5';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const dialog = useDialog();
const store = useStore();
const route = useRoute();

const loading = ref(false);
const user = reactive<Item.UserInfo>({
    id: 0,
    avatar: '',
    username: '',
    nickname: '',
    is_admin: false,
    is_friend: true,
    is_following: false,
    created_on: 0,
    follows: 0,
    followings: 0,
    status: 1,
});
const userLoading = ref(false);
const showWhisper = ref(false);
const showAddFriendWhisper = ref(false);
const list = ref<Item.PostProps[]>([]);
const username = ref(route.query.s || '');
const page = ref(+(route.query.p as string) || 1);
const pageType = ref<"post" | "comment" | "highlight" | "media" | "star">('post');
const postPage = ref(+(route.query.p as string) || 1);
const commentPage = ref(1)
const highlightPage = ref(1)
const mediaPage = ref(1)
const starPage = ref(1);
const pageSize = ref(20);
const totalPage = ref(0);

const loadPage = () => {
    switch(pageType.value) {
        case "post":
            loadPosts();
            break;
        case "comment":
            loadCommentPosts();
            break;
        case "highlight":
            loadHighlightPosts();
            break;
        case "media":
            loadMediaPosts();
            break;
        case "star":
            loadStarPosts();
            break;
    } 
};
const loadPosts = () => {
    loading.value = true;
    getUserPosts({
        username: username.value as string,
        style: "post",
        page: page.value,
        page_size: pageSize.value,
    })
        .then((rsp) => {
            loading.value = false;
            list.value = rsp.list || [];
            totalPage.value = Math.ceil(rsp.pager.total_rows / pageSize.value);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            list.value = []
            loading.value = false;
        });
};
const loadCommentPosts = () => {
    loading.value = true;
    getUserPosts({
        username: username.value as string,
        style: "comment",
        page: page.value,
        page_size: pageSize.value,
    })
        .then((rsp) => {
            loading.value = false;
            list.value = rsp.list || [];
            totalPage.value = Math.ceil(rsp.pager.total_rows / pageSize.value);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            list.value = []
            loading.value = false;
        });
};
const loadHighlightPosts = () => {
    loading.value = true;
    getUserPosts({
        username: username.value as string,
        style: "highlight",
        page: page.value,
        page_size: pageSize.value,
    })
        .then((rsp) => {
            loading.value = false;
            list.value = rsp.list || [];
            totalPage.value = Math.ceil(rsp.pager.total_rows / pageSize.value);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            list.value = []
            loading.value = false;
        });
};
const loadMediaPosts = () => {
    loading.value = true;
    getUserPosts({
        username: username.value as string,
        style: "media",
        page: page.value,
        page_size: pageSize.value,
    })
        .then((rsp) => {
            loading.value = false;
            list.value = rsp.list || [];
            totalPage.value = Math.ceil(rsp.pager.total_rows / pageSize.value);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            list.value = []
            loading.value = false;
        });
};
const loadStarPosts = () => {
    loading.value = true;
    getUserPosts({
        username: username.value as string,
        style: "star",
        page: page.value,
        page_size: pageSize.value,
    })
        .then((rsp) => {
            loading.value = false;
            list.value = rsp.list || [];
            totalPage.value = Math.ceil(rsp.pager.total_rows / pageSize.value);
            window.scrollTo(0, 0);
        })
        .catch((err) => {
            list.value = []
            loading.value = false;
        });
};
const changeTab = (tab: "post" | "comment" | "highlight" | "media" | "star") => {
    pageType.value = tab;
    switch(pageType.value) {
        case "post":
            page.value = postPage.value
            loadPosts();
            break;
        case "comment":
            page.value = commentPage.value
            loadCommentPosts();
            break;
        case "highlight":
            page.value = highlightPage.value
            loadHighlightPosts();
            break;
        case "media":
            page.value = mediaPage.value
            loadMediaPosts();
            break;
        case "star":
            page.value = starPage.value
            loadStarPosts();
            break;
    }
};
const loadUser = () => {
    userLoading.value = true;
    getUserProfile({
        username: username.value as string,
    })
        .then((res) => {
            userLoading.value = false;
            user.id = res.id;
            user.avatar = res.avatar;
            user.username = res.username;
            user.nickname = res.nickname;
            user.is_admin = res.is_admin;
            user.is_friend = res.is_friend;
            user.created_on = res.created_on;
            user.is_following = res.is_following;
            user.follows = res.follows;
            user.followings = res.followings;
            user.status = res.status;
            loadPage();
        })
        .catch((err) => {
            userLoading.value = false;
            console.log(err);
        });
};
const updatePage = (p: number) => {
    page.value = p;
    switch(pageType.value) {
        case "post":
            postPage.value = p
            loadPosts();
            break;
        case "comment":
            commentPage.value = page.value
            loadCommentPosts();
            break;
        case "highlight":
            highlightPage.value = page.value
            loadHighlightPosts();
            break;
        case "media":
            mediaPage.value = page.value
            loadMediaPosts();
            break;
        case "star":
            starPage.value = page.value
            loadStarPosts();
            break;
    }
};
const openWhisper = () => {
    showWhisper.value = true;
};
const openAddFriendWhisper = () => {
    showAddFriendWhisper.value = true;
};
const whisperSuccess = () => {
    showWhisper.value = false;
};
const addFriendWhisperSuccess = () => {
    showAddFriendWhisper.value = false;
};
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
};
const userOptions = computed(() => {
    let options: DropdownOption[] = [{
        label: $t('privateMessage'),
        key: 'whisper',
        icon: renderIcon(PaperPlaneOutline)
    }];
    /* if (store.state.userInfo.is_admin) {
        if (user.status === 1) {
            options.push({
                label: $t('mute'),
                key: 'banned',
                icon: renderIcon(CubeOutline)
            });
        } else {
            options.push({
                label: $t('unmute'),
                key: 'deblocking',
                icon: renderIcon(CubeOutline)
            });
        }
    } */
    /* if (user.is_following) {
        options.push({
            label: $t('unfollow'),
            key: 'unfollow',
            icon: renderIcon(WalkOutline)
        })
    } else {
        options.push({
            label: $t('follow'),
            key: 'follow',
            icon: renderIcon(BodyOutline)
        })
    } */
    if (user.is_friend) {
        options.push({
            label: $t('removeFriend'),
            key: 'delete',
            icon: renderIcon(PersonRemoveOutline)
        });
    } else {
        options.push({
            label: $t('addFriend'),
            key: 'requesting',
            icon: renderIcon(PersonAddOutline)
        });
    }
    return options;
});
const handleUserAction = (
    item: 'whisper' | 'follow' | 'unfollow' | 'delete' | 'requesting' | 'banned' | 'deblocking'
) => {
    switch (item) {
        case 'whisper':
            openWhisper();
            break;
        case 'delete':
            openDeleteFriend();
            break;
        case 'requesting':
            openAddFriendWhisper();
            break;
        case 'follow':
        case 'unfollow':
            handleFollowUser();
            break;
        case 'banned':
        case 'deblocking':
            banUser();
            break;
        default:
            break;
    }
};
const openDeleteFriend = () => {
    dialog.warning({
        title: $t('removeFriend'),
        content: $t('deletingFriendTips', {name: user.nickname}),
        positiveText: $t('confirmAction'),
        negativeText: $t('cancel'),
        onPositiveClick: () => {
            userLoading.value = true;
            deleteFriend({
                user_id: user.id,
            })
                .then((res) => {
                    userLoading.value = false;
                    user.is_friend = false
                    loadPosts();
                })
                .catch((err) => {
                    userLoading.value = false;
                    console.log(err);
                });
        },
    });
};
const handleFollowUser = () => {
    dialog.success({
        title: $t('prompt'),
        content:
        '确定' + (user.is_following ? '取消关注' : '关注') + '该用户吗？',
        positiveText: $t('confirmAction'),
        negativeText: $t('cancel'),
        onPositiveClick: () => {
            userLoading.value = true;
            if (user.is_following) {
                unfollowUser({
                    user_id: user.id,
                }).then((_res) => {
                    userLoading.value = false;
                    window.$message.success($t('unfollowSuccess'));
                    loadUser();
                })
                .catch((err) => {
                    userLoading.value = false;
                    console.log(err);
                });
            } else {
                followUser({
                    user_id: user.id,
                }).then((_res) => {
                    userLoading.value = false;
                    window.$message.success($t('followSuccess'));
                    loadUser();
                })
                .catch((err) => {
                    userLoading.value = false;
                    console.log(err);
                });
            }
        },
    });
};
const banUser = () => {
    dialog.warning({
        title: $t('warning'),
        content:
            '确定对该用户进行' +
            (user.status === 1 ? '禁言' : '解封') +
            '处理吗？',
        positiveText: $t('confirmAction'),
        negativeText: $t('cancel'),
        onPositiveClick: () => {
            userLoading.value = true;
            changeUserStatus({
                id: user.id,
                status: user.status === 1 ? 2 : 1,
            })
                .then((_res) => {
                    userLoading.value = false;
                    if (user.status === 1) {
                        window.$message.success($t('muteSuccess'));
                    } else {
                        window.$message.success($t('unmuteSuccess'));
                    }
                    loadUser();
                })
                .catch((err) => {
                    userLoading.value = false;
                    console.log(err);
                });
        },
    });
};
watch(
    () => ({
        path: route.path,
        query: route.query,
    }),
    (to, from) => {
        if (from.path === '/u' && to.path === '/u') {
            username.value = route.query.s || '';
            loadUser();
        }
    }
);
onMounted(() => {
    loadUser();
});
</script>

<style lang="less" scoped>
.profile-tabs-wrap {
    padding: 0 16px;
}

.profile-baseinfo {
    display: flex;
    padding: 16px;

    .avatar {
        width: 72px;
    }

    .base-info {
        position: relative;
        margin-left: 12px;
        width: calc(100% - 84px);

        .username {
            line-height: 16px;
            font-size: 16px;
        }

        .userinfo {
            font-size: 14px;
            line-height: 14px;
            margin-top: 10px;
            opacity: 0.75;
            .info-item {
                margin-right: 12px;
            }
        }

        .top-tag {
            transform: scale(0.75);
        }
    }

    .user-opts {
        position: absolute;
        top: 16px;
        right: 16px;
        opacity: 0.75;
    }
}

.pagination-wrap {
    padding: 10px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}
.dark {
    .profile-wrap, .pagination-wrap {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>