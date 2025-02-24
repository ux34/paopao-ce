<template>
    <div class="follow-item">
        <n-thing content-indented>
            <template #avatar>
                <n-avatar :size="54" :src="contact.avatar" />
            </template>
            <template #header>
                <span class="nickname-wrap">
                    <router-link
                        @click.stop
                        class="username-link"
                        :to="{
                            name: 'user',
                            query: { s: contact.username },
                        }"
                    >
                        {{ contact.nickname }}
                    </router-link>
                </span>
                 <span class="username-wrap"> @{{ contact.username }} </span>      
                <n-tag
                    v-if="contact.is_following"
                    class="top-tag" type="success" size="small" round>{{$t('followed')}}</n-tag>
                <div class="user-info">
                    <span class="info-item">
                        UID. {{ contact.user_id }}
                    </span>
                     <span class="info-item">
                        {{$t('Joined in {date}', {date: formatDate(contact.created_on)}) }}
                    </span>
                </div>
            </template>
            <template #header-extra>
                <div class="item-header-extra">
                    <n-dropdown
                        placement="bottom-end"
                        trigger="click"
                        size="small"
                        :options="followOptions"
                        @select="handleFollowAction"
                    >
                        <n-button quaternary circle>
                            <template #icon>
                                <n-icon>
                                    <more-horiz-filled />
                                </n-icon>
                            </template>
                        </n-button>
                    </n-dropdown>
                </div>
            </template>
        </n-thing>
    </div>
</template>

<script setup lang="ts">
import { h, computed } from 'vue';
import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { useDialog, DropdownOption } from 'naive-ui';
import { useRouter } from 'vue-router';
import { followUser, unfollowUser } from '@/api/user';
import { formatDate } from '@/utils/formatTime';
import { MoreHorizFilled } from '@vicons/material';
import {
    BodyOutline,
    WalkOutline
} from '@vicons/ionicons5';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const dialog = useDialog();
const router = useRouter();

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
};

const handleFollowUser = () => {
    dialog.success({
        title: $t('prompt'),
        content:
            $t('confirmAction') + (props.contact.is_following ? $t('unfollow') : $t('follow')) + $t('该用户吗？'),
        positiveText: $t('confirmAction'),
        negativeText: $t('cancel'),
        onPositiveClick: () => {
            if (props.contact.is_following) {
                unfollowUser({
                    user_id: props.contact.user_id,
                }).then((_res) => {
                    window.$message.success($t('unfollowSuccess'));
                    props.contact.is_following=false;
                })
                .catch((err) => {
                    console.log(err);
                });
            } else {
                followUser({
                    user_id: props.contact.user_id,
                }).then((_res) => {
                    window.$message.success($t('followSuccess'));
                    props.contact.is_following=true;
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        },
    });
};

const handleFollowAction = (
    item: 'follow' | 'unfollow' 
) => {
    switch (item) {
        case 'follow':
        case 'unfollow':
            handleFollowUser();
            break;
        default:
            break;
    }
};


const props = withDefaults(defineProps<{
    contact: Item.ContactItemProps
}>(), {})

const followOptions = computed(() => {
    let options: DropdownOption[] = [];
    if (props.contact.is_following) {
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
    }
    return options;
});

const goUserProfile = (username: string) => {
    router.push({
        name: 'user',
        query: { s: username },
    });
};
</script>

<style lang="less" scoped>
.follow-item {
    display: border-box;
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 12px;
    padding-bottom: 12px;

    &:hover {
        background: #f7f9f9;
    }

    .nickname-wrap {
        line-height: 16px;
        font-size: 16px;
    }
    .username-wrap {
        line-height: 16px;
        font-size: 16px;
    }

    .top-tag {
        transform: scale(0.75);
    }
    .user-info {
        .info-item {
            font-size: 14px;
            line-height: 14px;
            margin-right: 8px;
            opacity: 0.75;
        }
    }
    .item-header-extra {
        display: flex;
        align-items: center;
        opacity: 0.75;
    }
}

.dark {
    .follow-item {
        &:hover {
            background: #18181c;
        }
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>