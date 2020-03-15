<template>
    <div class="patient-card">
        <div class="header" v-if="card && card.patientName">
            <Avatar :name="card.patientName" ></Avatar>
            <div class="patient-name">
                {{ card.patientName }}
            </div>
            <div class="actions">
                <div class="action action-done" @click="onCardStatusChange"  v-if="card.status === 'PENDING'">
                    Done
                </div>
                <div class="action action-done" @click="onCardStatusChange"  v-else>
                    Todo
                </div>
            </div>
        </div>
        <div class="content">
            <div class="arrhythmias">
                <div class="arrhythmia" v-for="(item, index) of card.arrhythmias" :key="`index-${index}`">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Card from '@/models/Card';
import Avatar from './Avatar';

export default {
    components: {
        Avatar,
    },
    props: {
        card: {
            type: Object,
            required: true,
        },
    },
    methods: {
        onCardStatusChange() {
            const status = this.card.status === 'PENDING' ? 'DONE' : 'PENDING';
            // if current status === pending, switch to done, otherwise change it to pending
            this.$emit('update', new Card({ ...this.card, ...{ status } }));
        },
    },
}
</script>
<style lang="scss" scoped>
    .patient-card {
        position: relative;
        box-shadow: 2px 1px 10px 0px #b3b3b3;
        margin: 15px 0px;
        padding: 15px;
        background: white;
        .header {
            display: flex;
            .patient-name {
                line-height: 60px;
                padding: 0px 15px;
            }
        }
        .content {
            .arrhythmias {
                padding-top: 15px;
                display: flex;
                .arrhythmia {
                    padding: 3px;
                    border: 1px solid #b3b3b3;
                    border-radius: 5px;
                    & {
                        margin-right: 5px;
                    }
                }
            }
        }
        .actions {
            position: absolute;
            right: 15px;
            .action {
                cursor: pointer;
                padding: 5px;
                border: 1px solid #6bbbff;
                &:hover {
                    background: #6bbbff;
                    color: white;
                }
            }
        }
    }
</style>