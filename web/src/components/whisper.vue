<template>
    <n-modal
        :show="show"
        @update:show="closeModal"
        class="whisper-card"
        preset="card"
        size="small"
        :title="$t('privateMessage')"
        :mask-closable="false"
        :bordered="false"
        :style="{
            width: '360px',
        }"
    >
        <div class="whisper-wrap">
            <n-alert :show-icon="false">
                {{$t('sendingPrivateMessageTo')}}
                <n-ellipsis style="max-width: 100%">
                    <n-gradient-text type="success">
                        {{ user.nickname }}@{{ user.username }}
                    </n-gradient-text>
                </n-ellipsis>
            </n-alert>
            <div class="whisper-line">
                <n-input
                    type="textarea"
                    :placeholder="$t('enterPrivateMessageContent')"
                    :autosize="{
                        minRows: 5,
                        maxRows: 10,
                    }"
                    v-model:value="content"
                    maxlength="200"
                    show-count
                />
            </div>
            <div class="whisper-line send-wrap">
                <n-button
                    strong
                    secondary
                    type="primary"
                    :loading="loading"
                    @click="sendWhisper"
                >{{$t('send')}}</n-button>
            </div>
        </div>
    </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { sendUserWhisper } from '@/api/user';
import { useI18n } from 'vue-i18n';

const $t = useI18n().t;
const props = withDefaults(
    defineProps<{
        show: boolean;
        user: Item.UserInfo;
    }>(),
    {
        show: false,
    }
);
const content = ref('');
const loading = ref(false);

const emit = defineEmits<{
    (e: 'success'): void;
}>();
const closeModal = () => {
    emit('success');
};
const sendWhisper = () => {
    loading.value = true;
    sendUserWhisper({
        user_id: props.user.id,
        content: content.value,
    })
        .then((res: any) => {
            window.$message.success($t('sendSuccess'));
            loading.value = false;
            content.value = '';

            closeModal();
        })
        .catch((err: any) => {
            loading.value = false;
        });
};
</script>

<style lang="less" scoped>
.whisper-wrap {
    .whisper-line {
        margin-top: 10px;

        &.send-wrap {
            .n-button {
                width: 100%;
            }
        }
    }
}
.dark {
    .whisper-wrap {
        background-color: rgba(16, 16, 20, 0.75);
    }
}
</style>