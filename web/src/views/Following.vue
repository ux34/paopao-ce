<template>
    <div>
        <main-nav :title="nickname" :back="true" />

        <n-list class="main-content-wrap" bordered>
            <n-tabs type="line" animated :default-value="tabler" @update:value="changeTab">
                <n-tab-pane name="follows" :tab="$t('following')" />
                <n-tab-pane name="followings" :tab="$t('myFans')" />
            </n-tabs>
            <div v-if="loading" class="skeleton-wrap">
                <post-skeleton :num="pageSize" />
            </div>
            <div v-else>
                <div class="empty-wrap" v-if="list.length === 0">
                    <n-empty size="large" :description="$t('noDataAvailable')" />
                </div>

                <n-list-item v-for="contact in list" :key="contact.user_id">
                     <follow-item
                        :contact="contact"
                     />
                </n-list-item>
            </div>
        </n-list>
    </div>

    <div class="pagination-wrap" v-if="totalPage > 0">
        <n-pagination 
            :page="page" 
            @update:page="updatePage"
            :page-slot="!store.state.collapsedRight ? 8 : 5" 
            :page-count="totalPage" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUserFollows, getUserFollowings } from '@/api/user';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const store = useStore();
const route = useRoute();

const loading = ref(false);
const list = ref<Item.ContactItemProps[]>([]);
const nickname= route.query.n as string || $t("fanDetails");
const username = route.query.s as string || "";
const tabler = ref(route.query.t as string || "follows")
const page = ref(+(route.query.p as string) || 1);
const pageSize = ref(20);
const totalPage = ref(0);

const updatePage = (p: number) => {
    page.value = p;
    loadPage();
};

const changeTab = (tab: "follows" | "followings") => {
    tabler.value = tab;
    loadPage();
};

const loadPage = () => {
    if (tabler.value === "follows") {
        loadFollows(username);
    } else if (tabler.value === "followings") {
        loadFollowings(username);
    }
}

const loadFollows = (username: string, scrollToBottom: boolean = false) => {
    if (list.value.length === 0) {
        loading.value = true;
    }
    getUserFollows({
        username: username,
        page: page.value,
        page_size: pageSize.value,
    })
        .then((res) => {
            loading.value = false;
            list.value = res.list || [];
            totalPage.value = Math.ceil(res.pager.total_rows / pageSize.value);

            if (scrollToBottom) {
                setTimeout(() => {
                    window.scrollTo(0, 99999);
                }, 50);
            }
        })
        .catch((err) => {
            loading.value = false;
        });
};

const loadFollowings = (username: string, scrollToBottom: boolean = false) => {
    if (list.value.length === 0) {
        loading.value = true;
    }
    getUserFollowings({
        username: username,
        page: page.value,
        page_size: pageSize.value,
    })
        .then((res) => {
            loading.value = false;
            list.value = res.list || [];
            totalPage.value = Math.ceil(res.pager.total_rows / pageSize.value);

            if (scrollToBottom) {
                setTimeout(() => {
                    window.scrollTo(0, 99999);
                }, 50);
            }
        })
        .catch((err) => {
            loading.value = false;
        });
};

onMounted(() => {
    loadPage();
});
</script>

<style lang="less" scoped>

.main-content-wrap {
    padding: 20px;
}

.pagination-wrap {
        padding: 10px;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }

.dark {
    .main-content-wrap, .empty-wrap, .skeleton-wrap {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>