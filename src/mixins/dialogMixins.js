export const dialogMixins = {
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            p_dialogVisible: this.dialogVisible
        }
    },
    watch: {
        dialogVisible(val) {
            this.p_dialogVisible = val
        },
        p_dialogVisible(val) {
            this.$emit("update:dialogVisible", val)
        }
    },
    methods: {
        closeDialog() {
            this.$emit("resetBodyStyle");
            this.p_dialogVisible = false;
        },

        handleOpen() { },

        handleClose() {
            this.closeDialog();
        }
    }
}