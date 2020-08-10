new ClipboardJS(".btn-copy")
let app=new Vue({el:"#app",data:{snackbarText:"",redirectUrl:"",snackbar:!1,timeout:1500,customUrl:"",isCustom:!1,domain:`${window.location.hostname}`,isLoading:!1,shortValue:"",isDone:!1},methods:{async store(){this.isLoading=!0
await axios.post("/store-url",{shortUrl:this.customUrl==""?null:this.customUrl,redirectUrl:this.redirectUrl}).then((result)=>{this.isDone=!0
this.isLoading=!1
this.shortValue=`${result.data.data.shortUrl}`}).catch((err)=>{this.snackbarText="Something is Error"
this.snackbar=!0})},copyClipboard(){this.snackbarText="copy to clipboard"
this.snackbar=!0},openLink(){window.open(`${this.shortValue}`)}},vuetify:new Vuetify({})})