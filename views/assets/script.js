new ClipboardJS(".btn-copy")
let app = new Vue({
    el: "#app",
    data: {
        snackbarText: "",
        redirectUrl: "",
        snackbar: false,
        timeout: 1500,
        customUrl: "",
        isCustom: false,
        domain: `${window.location.hostname}`,
        isLoading: false,
        shortValue: "",
        isDone: false
    },
    methods: {
        async store() {
            this.isLoading = true
            await axios.post("/store-url", {
                shortUrl: this.customUrl == "" ? null : this.customUrl,
                redirectUrl: this.redirectUrl
            })
                .then((result) => {
                    this.isDone = true
                    this.isLoading = false
                    this.shortValue = `${result.data.data.shortUrl}`
                }).catch((err) => {
                    this.snackbarText = "Something is Error"
                    this.snackbar = true
                });
        },
        copyClipboard() {
            this.snackbarText = "copy to clipboard"
            this.snackbar = true
        },
        openLink() {
            window.open(`${this.shortValue}`)
        }
    },
    vuetify: new Vuetify({})
})