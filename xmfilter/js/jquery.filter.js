$(function() {
	/*选择分类*/
    multilevel(".classify1");
    multilevel(".classify2");
	function multilevel(pClass) {
        var classifyHeight, classifyListHeight, classify = $(pClass+" .filtrate-classify-list li.active>.labelcell").html();
        $(pClass+" .filtrate-classify-list li .labelcell").click(function() {
            $(pClass+" .filtrate-classify-list li").removeClass("active");		//取消其他分类的选中状态
            $(this).parent("li").addClass("active");						//给被点击分类标记选中状态
            $(this).next("ul").find("ul").hide();						//关闭被点击分类的孙分类
            $(this).parent("li").siblings("li").children("ul").hide();	//关闭父分类其他同等级类的子分类
            $(this).next("ul").show();									//显示被点击分类的子分类
            classify = $(this).html();									//获取被选中的分类值
            classifyHeight = parseInt($(pClass+" .filtrate-classify").css("height"));			//获取分类盒子的高度
            classifyListHeight = parseInt($(pClass+" .filtrate-classify-list").css("height"));//获取分类列表的高度
            if (classifyHeight != classifyListHeight) {								//盒子高度与列表高度不同
                $(pClass+ ".classify").addClass("show");
                $(pClass+" .classify .labelcell span").html("收起");									//显示为可收起
                $(pClass+" .filtrate-classify").animate({height: classifyListHeight});		//展开或收起盒子
            }
        });
        /*收起&展开分类*/
        $(pClass+" .classify .labelcell").click(function() {
            var classifyState = $(this).find("span").html();
            classifyHeight = parseInt($(pClass+" .filtrate-classify").css("height"));			//获取分类盒子的高度
            classifyListHeight = parseInt($(pClass+" .filtrate-classify-list").css("height"));//获取分类列表的高度
            if (classifyState != "收起" && classifyHeight != classifyListHeight) {//展开分类
                $(pClass+" .classify").addClass("show");
                $(pClass+" .classify .labelcell span").html("收起");
                $(pClass+" .filtrate-classify").animate({height: classifyListHeight});
            } else if (classifyState == "收起") {//收起分类
                $(pClass+" .classify").removeClass("show");
                if (classify != "") {//已选分类
                    $(pClass+" .classify .labelcell span").html(classify);
                } else {//未选分类
                    $(pClass+" .classify .labelcell span").html("展开");
                }
                $(pClass+" .filtrate-classify").animate({height: 0});
            }
        });
    }

	/*选择single标签*/
    singleselect(".singlep1");
    singleselect(".singlep2");
	function singleselect(pClass) {
        var address = "";
        $(pClass+" .filtrate-address li .labelcell").click(function() {
            var addressLi = $(this).parent("li");
            var addressState = addressLi.hasClass("active");
            if (addressState == true) {
                addressLi.removeClass("active");
                address = "";
            } else {
                addressLi.addClass("active").siblings("li").removeClass("active");
                address = $(this).html();
            }
        });
        /*收起&展开single标签*/
        $(pClass+" .singlelabelbox .labelcell").click(function() {
            var categoryState = $(this).find("span").html();
            var addressHeight = $(pClass+" .filtrate-address ul").css("height");
            if (categoryState != "收起") {//展开single标签
                $(pClass+" .singlelabelbox").addClass("show");
                $(pClass+" .singlelabelbox .labelcell span").html("收起");
                $(pClass+" .filtrate-address").animate({height: addressHeight});
            } else {//收起single标签
                $(pClass+" .singlelabelbox").removeClass("show");
                if (address == "") {//未选single标签
                    address = "全部";
                }
                $(pClass+" .singlelabelbox .labelcell span").html(address);
                $(pClass+" .filtrate-address").animate({height: 0});
            }
        });
    }

	/*清空筛选条件*/
	$(".filtrate-reset").click(function() {
		/*清空分类*/
		$(".classify").removeClass("show");
		$(".classify .labelcell span").html("展开");
		classify = $(".filtrate-classify-list li.active>a").html();
		$(".filtrate-classify-list li").removeClass("active");
		$(".filtrate-classify-list>li").addClass("active");
		$(".filtrate-classify-list li ul li ul").hide();
		/*收起分类*/
		classifyHeight = parseInt($(".filtrate-classify").css("height"));	
		if (classifyHeight > 0) {
			$(".filtrate-classify").animate({height: 0});
		}
		/*清空single标签*/
		$(".singlelabelbox").removeClass("show");
		$(".singlelabelbox .labelcell span").html("展开");
		address = "";
		/*收起single标签*/
		var addressBoxHeight = parseInt($(".filtrate-address ul").css("height"));
		if (addressBoxHeight > 0) {
			$(".filtrate-address").animate({height: 0});
		}
		/*清空已选single标签*/
		$(".filtrate-address ul li").removeClass("active");
	});
});