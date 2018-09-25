
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



/*关注*/
    mui('body').on('tap','#payAtt',function () {
        var followed = /*$(this).find('.infocollectHeart').hasClass('fa-heart');*/this.getElementsByClassName('infocollectHeart')[0].classList.contains('fa-heart');
        var infocollectHeart = /*$(this).find('.infocollectHeart');*/this.getElementsByClassName('infocollectHeart')[0];
        if(followed){
            var btnArray = ['否', '是'];
            mui.confirm('确认取消关注？','温馨提示', btnArray, function(e) {
                if (e.index == 1) {
                    // infocollectHeart.removeClass('fa-heart').addClass('fa-heart-o');
                    /*infocollectHeart.next().html('未关注');*/
                    infocollectHeart.classList.remove('fa-heart');
                    infocollectHeart.classList.add('fa-heart-o');
                   /* infocollectHeart.nextElementSibling.innerHTML='未关注';*/
                }
            })
        }else{
         /*   infocollectHeart.removeClass('fa-heart-o').addClass('fa-heart');
            infocollectHeart.next().html('已关注');*/
            infocollectHeart.classList.add('fa-heart');
            infocollectHeart.classList.remove('fa-heart-o');
         /*   infocollectHeart.nextElementSibling.innerHTML='已关注';*/
            mui.toast('关注成功');
        }
    })

    /*上收下拉*/
    mui('.dropD_box').on('tap','.dropD_tit_ico ',function () {
        if(this.classList.contains('actived')){
            this.classList.remove('actived');
            this.parentNode.parentNode.children[1].classList.remove('actived');
        }else{
            this.classList.add('actived');
            this.parentNode.parentNode.children[1].classList.add('actived');
        }
    })
};


