<template>
    <div class="todos-page">
        <div class="todos-filters">
            <input type="text" :placeholder="'Filter by patient name and arythmias'" :value="queryString" @input="onFilterInput" />
            <div class="clear-btn" v-if="queryString && queryString.length > 0" @click="onQueryStringClear">&times;</div>
        </div>
        <div class="todos-content">
            <div class="todos-panel todos-pending">
                <h4 class="panel-title">Todo</h4>
                <div class="cards-list">
                    <PatientCard @update="onUpdate" v-for="card of todos" :card="card" :key="card.id"></PatientCard>
                </div>
            </div>
            <div class="todos-panel todos-done">
                <h4 class="panel-title">Done</h4>
                <div class="cards-list">
                    <PatientCard @update="onUpdate" v-for="card of dones" :card="card" :key="card.id"></PatientCard>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CardService from '@/services/CardService';

import PatientCard from '@/components/PatientCard.vue';

function debounce(fn, wait) {
    let t;
    return function () {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, arguments), wait);
    };
}

export default {
    components: {
        PatientCard,
    },
    data() {
        return {
            cards: [],
            cardService: new CardService(this.$api),
        };
    },
    computed: {
        todos() {
            return this.cards.filter((card) => card.status === 'PENDING');
        },
        dones() {
            return this.cards.filter((card) => card.status === 'DONE'
                                            || card.status === 'COMPLETED');
        },
        queryString() {
            return this.$store.getters.queryString;
        },
    },
    created() {
        // init todos list
        this.cardService.fetchCards().then((cards) => {
            this.$store.dispatch('initialize', cards);
        });
        // watch for todos list changes
        this.$store.watch(() => this.$store.getters.cards, (value) => {
            this.cards = [...value];
        }, {
            immediate: true,
        });
        // debounce input
        this.onFilterInput = debounce(this.onFilterInput, 500);
    },

    methods: {
        // changed status
        onUpdate(card) {
            this.$store.dispatch('cardUpdated', card);
        },

        onFilterInput(e) {
            this.$store.dispatch('applyFilters', e.target.value);
        },
        onQueryStringClear() {
            this.$store.dispatch('clearFilters');
        },
    }
}
</script>
<style lang="scss" scoped>
    .todos-page {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: #fbfbfb;
        .todos-content {
            display: flex;
        }
        .todos-pending,
        .todos-done {
            flex: 1;
            border: 2px solid #d8d8d8;
        }
        .panel-title {
            padding: 15px;
            margin: 0;
            text-align: center;
            border-bottom: 2px solid #d8d8d8;
        }

        .todos-filters {
            padding: 15px;
            position: relative;
            input {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                font-variant: tabular-nums;
                list-style: none;
                font-feature-settings: 'tnum';
                position: relative;
                display: inline-block;
                width: 100%;
                height: 32px;
                padding: 4px 11px;
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                line-height: 1.5;
                background-color: #fff;
                background-image: none;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                transition: all 0.3s;
            }

            .clear-btn {
                position: absolute;
                right: 20px;
                top: 25px;
                padding: 1px 6px;
                background: #ececec;
                border-radius: 25px;
                top: 22px;
                cursor: pointer;
            }
        }

        .todos-content {
            flex: 1;
        }

        .cards-list { 
            padding: 15px;
        }
    }
</style>