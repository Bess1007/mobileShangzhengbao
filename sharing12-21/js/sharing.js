window.addEventListener('load', function() {
    /*表单填写显示隐藏*/
    mui('body').on('tap','.openPledge',function () {
        document.documentElement.scrollTop = 0;
        /*document.getElementsByClassName("zzao")[0].style.display='block';*/
        document.getElementById("tc").style.display='block';
    });
    mui('body').on('tap','#quxiao',function () {
        /*  document.getElementsByClassName("zzao")[0].style.display='none';*/
        document.getElementById("tc").style.display='none';
    });

    /*选择日期*/
    (function($) {
        $.init();
        var result = $('.dateResult');
        var btns = $('.btn');
        btns.each(function(i, btn) {

            btn.addEventListener('tap', function() {
                var optionsJson = this.getAttribute('data-options') || '{}';
                var options = JSON.parse(optionsJson);
                var id = this.getAttribute('id');
                console.log(i)
                /*
                 * 首次显示时实例化组件
                 * 示例为了简洁，将 options 放在了按钮的 dom 上
                 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
                 */
                var picker = new $.DtPicker(options);
                picker.show(function(rs) {
                    /*
                     * rs.value 拼合后的 value
                     * rs.text 拼合后的 text
                     * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
                     * rs.m 月，用法同年
                     * rs.d 日，用法同年
                     * rs.h 时，用法同年
                     * rs.i 分（minutes 的第二个字母），用法同年
                     */
                    result[i].innerText =  rs.text;
                    /*
                     * 返回 false 可以阻止选择框的关闭
                     * return false;
                     */
                    /*
                     * 释放组件资源，释放后将将不能再操作组件
                     * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
                     * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
                     * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
                     */
                    picker.dispose();
                });
            }, false);
        });
    })(mui);


    /*获取设备高度*/
    var winheight = window.screen.availHeight;
    document.getElementsByClassName("share-content")[0].style.minHeight=winheight+'px';


    /*日期选项为必填项时*/
    mui('body').on('tap', '.form_submitbtn', function() {
        var len = mui("#validataF .dateRequires").length;
        for(var i=0;i<len;i++){
            if(mui("#validataF .dateRequires")[i].firstElementChild.innerHTML == ""){
                mui("#validataF .dateRequires")[i].style.border='1px solid #D95C5C';
                mui("#validataF .dateRequires")[i].nextElementSibling.style.borderColor='#D95C5C';
                mui("#validataF .dateRequires")[i].nextElementSibling.style.color='#ffffff';
            }else{
                mui("#validataF .dateRequires")[i].style.border='1px solid rgba(0, 0, 0, 0.15)';
                mui("#validataF .dateRequires")[i].nextElementSibling.style.borderColor='rgba(0, 0, 0, 0.15)';
                mui("#validataF .dateRequires")[i].nextElementSibling.style.color='rgba(0, 0, 0, 0.65)';
            }
        }
    })
}, false);


