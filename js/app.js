
window.onload = function () {
    var aniShow = "pop-in";
    //a标签点击事件
    mui('body').on('tap', 'a', function() {
        if(this.classList.contains('mui-action-back')==false&&this.classList.contains('noLink')==false){
            var id = this.getAttribute("data-wid");
            if(!id) {
                id = this.getAttribute('href');
            }
            var href = this.getAttribute('href');

            //非plus环境，直接走href跳转
            if(!mui.os.plus){
                location.href = href;
                return;
            }

            var titleType = this.getAttribute("data-title-type");

            var webview_style = {
                popGesture: "close"
            }
            var extras = {};


            if(titleType == "native") {
                webview_style.statusbar = {
                    background: "#f7f7f7"
                }

                mui.openWindowWithTitle({
                    url:href,
                    id:id,
                    styles:webview_style,
                    show:{
                        event:"loaded",
                        extras:extras
                    },
                    waiting: {
                        autoShow: false
                    }
                },{
                    title:{
                        text:this.innerText.trim()
                    },
                    back:{
                        image:{
                            base64Data:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII="
                        }
                    }
                });
            } else if(href && ~href.indexOf('.html')) {
                var extras = {};
                if(titleType && titleType=="transparent_native") {
                    webview_style.titleNView = {
                        'backgroundColor': '#f7f7f7',
                        'titleText': this.innerHTML.trim(),
                        'titleColor': '#000000',
                        type: 'transparent',
                        autoBackButton: true,
                        splitLine: {
                            color: '#cccccc'
                        }
                    }
                }else {
                    webview_style.statusbar = {
                        background: "#f7f7f7"
                    }
                }

                var webview = plus.webview.create(this.href,id,webview_style,extras);
                webview.addEventListener("titleUpdate",function () {
                    setTimeout(function () {
                        webview.show(aniShow,150);
                    },100);
                });
            }
        }

    });

    /*******发布项目列表页面&我的项目列表页面----点击任一项目状态关闭popover*******/
    mui('body').on('tap','.ztlist',function () {
        mui('.mui-popover').popover('hide');
    });

    /*解决页面内容过长时弹框位置不正确问题*/
  /*  var uip = document.getElementById("topPopover");
    uip.style.position = "absolute";*/

/*******************项目表单编辑页验证**********************/
mui.plusReady(
    mui('body').on('tap', '.form_submitbtn', function() {
        var len = mui("#validataF .inputRequired").length;
        for(var i=0;i<len;i++){
            if(!mui("#validataF .inputRequired")[i].value || mui("#validataF .inputRequired")[i].value.trim() == ""){
                mui("#validataF .inputRequired")[i].style.border='1px solid #D95C5C';
                mui("#validataF .inputRequired")[i].nextElementSibling.style.borderColor='#D95C5C';
                mui("#validataF .inputRequired")[i].nextElementSibling.style.color='#ffffff';
                check = false;
                console.log(check);
            }else{
                check = true;
                mui("#validataF .inputRequired")[i].style.border='1px solid rgba(0, 0, 0, 0.15)';
                mui("#validataF .inputRequired")[i].nextElementSibling.style.borderColor='rgba(0, 0, 0, 0.15)';
                mui("#validataF .inputRequired")[i].nextElementSibling.style.color='rgba(0, 0, 0, 0.65)';
            }
        }
        if(check){
            mui.alert('验证通过!')
        }else{
            mui.alert('不允许为空!');
        }
    })
)
//必须验证
    var required = document.getElementsByClassName("inputRequired");
    /*console.log(required);*/
    for(var i=0;i<required.length;i++){
        required[i].addEventListener('blur',function(){
            if(this.value == null || this.value.trim() ==""){
                this.style.border = "1px solid #D95C5C";
                this.nextElementSibling.style.borderColor='#D95C5C';
                this.nextElementSibling.style.color='#ffffff';
            }else{
                this.style.border = "1px solid rgba(0, 0, 0, 0.15)";
                this.nextElementSibling.style.borderColor='rgba(0, 0, 0, 0.15)';
                this.nextElementSibling.style.color='rgba(0, 0, 0, 0.65)';
            }
        })
    }

    //手机验证
    var mobile = document.getElementsByClassName('mobile');
    for(var i=0;i<mobile.length;i++){
        mobile[i].addEventListener('blur',function(){
            console.log(this.value);
            //var reg = new RegExp('^1[3|5|8]\d{9}$');
            //var reg= new RegExp('^[0-9]*$');
            //console.log(reg.test(this.value));
            if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.value))){
                this.style.border = '1px solid red';
            }else{
                this.style.border = "1px solid #ddd";
            }
        })
    }
    //座机验证
    var phone = document.getElementsByClassName('phone');
    for(var i=0;i<mobile.length;i++){
        phone[i].addEventListener('blur',function(){
            console.log(this.value);
            //var reg = new RegExp("^0\d{2,3}-?\d{7,8}$");
            //if(!reg.test(this.value)){
            if(!(/^0\d{2,3}-?\d{7,8}$/.test(this.value))){
                this.style.border = '1px solid red';
            }else{
                this.style.border = "1px solid #ddd";
            }
        })
    }
/*******************项目表单编辑页验证end**********************/

};


