

$(document).ready(function(){
	
	

	// 游戏截图
	function theImg(){
	    var sst=$(".snopshot");
	    if(sst.length==1){
	    	sst.css({
	    		"position":"relative",
	    		"text-align":"center"
	    	}).find("img").css({
	    		"max-width":"840px",
	    		"max-height":"840px;"
	    	}).next(".elementOverlay").hide();
	    	$(".snap-shot-btn").hide();
	    }
	    else if(sst.length==2){
	    	sst.css({"position":"relative","float":"left"}).find("img").css({"max-width":"400px","margin-right":"10px"}).next(".elementOverlay").hide();
	    	$(".snap-shot-btn").hide();
	    }
	    else{
	      	var img = new Image();              	
			img.onload = function(){
				
				var imgWidth = img.width;
				var imgHeight = img.height;
				console.log("imgHeight:"+imgHeight);
				if(imgWidth > imgHeight){
					imgHeight = 390;
					imgWidth = (390*(img.width))/(img.height);
				}else{
					imgWidth = 400;
					imgHeight = (400*(img.height))/(img.width);
				}
				var snapShotWrap = new posterTvGrid(
					'snapShotWrap',
					{
					imgHeight : imgHeight,//图片宽高，来调整框架样式
					imgWidth : imgWidth,
					imgP : parseInt(imgWidth/1.2)//小图与大图比例暂定1比1.2
					}
				);
			
			}
			
			img.src =  $(".snapShotCont li").eq(0).find("img").attr("src");

	    }
	}
	theImg();



});







