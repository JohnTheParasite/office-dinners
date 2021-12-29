export default {
    props: {
        options: {
            required: true
        },
        initValue: {
            default: null
        }
    },
    data() {
        return {
            value: null
        }
    },
    methods: {
        reset() {
            if (this.initValue !== null) {
                this.value = this.initValue
            } else {
                this.value = (this.options.find(x => x.selected) || (this.options.length && this.options[0]) || {}).value
            }
        }
    },
    created() {
        this.reset();
    }
}
