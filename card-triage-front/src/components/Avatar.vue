<template>
    <div class="avatar"
        :style="{'background': `#${this.color}`}"
        :class="{'round': this.type === 'round', 'square': this.type === 'square'}">
        {{ label.toUpperCase() }}
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: 'round', // round | square
        },
    },
    data() {
        return {
            color: (0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
        };
    },
    computed: {
        label() {
            return this.name && this.name.length > 2 ? this.name.substring(0, 2) : this.name;
        },
    }
};
</script>
<style lang="scss" scoped>
    .avatar {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: white;
        font-size: x-large;

        &.round {
            border-radius: 60px;
        }
    }
</style>