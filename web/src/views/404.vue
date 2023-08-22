<template>
    <div>
        <main-nav title="404" />

        <n-list class="main-content-wrap wrap404" bordered>
            <n-result status="404" :title="$t('notFound404')" :description="$t('viewMore')">
                <template #footer>
                    <n-button @click="goHome">{{ $t('backToHomePage') }}</n-button>
                </template>
            </n-result>
        </n-list>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => {
    router.push({
        path: '/',
    });
};
</script>

<style lang="less" scoped>
.wrap404 {
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.dark {
    .main-content-wra {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>