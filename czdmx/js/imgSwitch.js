(function($){
    var browserV = (navigator.userAgent.toLowerCase().match( /.+(?:ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1];
    var browserVersion = (browserV == "2.0" || browserV == "1.0")? false : true;
    var posterTvGrid = function(o, options){
    this.parent = $("#" + o);
    this.body = $("body");
    if(this.parent.length <= 0){
    return false;
    }
	$(".snopshot:eq(0) span").removeClass("elementOverlay").addClass("elementOverlays");
this.options = $.extend({}, posterTvGrid.options, options);
this.reset(); //resize
var _this = this;
$(window).resize(function(){
    _this.reset();
    });
};
posterTvGrid.prototype = {
	
    //��ʼ��
    reset : function(options){
    if(typeof(options) == 'object'){
    $.extend(this.options, options);
    }
this.total = this.parent.find("img").length; //�ܵ�ͼƬ����
this.pageNow = this.options.initPage; //��ǰ��ʾ�ڼ���
this.preLeft = 0;
this.nextLeft = this.options.width-this.options.imgP;
this.preNLeft = -this.options.imgP;
this.nextNLeft = this.options.width;
this.pageNowLeft = (this.options.width-this.options.imgWidth)/2//���еĵ�ǰͼ
this.drawContent(); //����ͼƬ�ߴ��趨�������ʽ
},
drawContent : function(){
    this.parent.css({height:this.options.imgHeight+"px"});
this.parent.find(".snapShotCont").css({height:this.options.imgHeight+"px"});
this.parent.find(".snopshot").css({width:'0px', opacity: 0, left:this.options.width/2+'px', zIndex:0, marginTop: '135px'});
this.parent.find(".snopshot:nth-child("+this.pageNow+")").css({width:this.options.imgWidth+'px',height:this.options.imgHeight+'px',opacity:1,left:this.pageNowLeft+'px',zIndex:3,marginTop:0});
var pre = this.pageNow > 1 ? this.pageNow-1 : this.total;
var next = this.pageNow == this.total ? 1 : this.pageNow+1;
//ֻ���ȣ��ø߶��Լ�ȥ�ȱ�ѹ��
this.parent.find(".snopshot:nth-child("+pre+")").css({opacity: 1, left: this.preLeft+'px', width: this.options.imgP+'px', zIndex: 0, marginTop: this.options.imgHeight/12+'px'});
this.parent.find(".snopshot:nth-child("+next+")").css({opacity: 1, left: this.nextLeft+'px',width: this.options.imgP+'px', zIndex: 0, marginTop: this.options.imgHeight/12+'px'});
this.bind();
//this.start();
},
bind : function(){
    this.leftNav = this.parent.find("#shotPrev");
    this.rightNav = this.parent.find("#shotNext");
    var _this = this;
    //_this.parent.mouseover(function(){
    //_this.stop();
    //_this.leftNav.show();
    //_this.rightNav.show();
    //}).mouseout(function(){
    //_this.start();
    //});
_this.leftNav.click(function(){
	if(_this.total > 2){
		_this.turn("right");
	}else if(_this.total == 2){//���������ͼƬ�������Ҫ���Ҳ����ҵ�
		_this.turn("left");
	}
    
    });
_this.rightNav.click(function(){
    _this.turn("left");
    });
},
start: function(){
    var _this = this;
    if(_this.timerId) _this.stop();
    _this.timerId = setInterval(function(){
    _this.turn(_this.options.direct);
    }, _this.options.delay);
},
stop: function(){
    clearInterval(this.timerId);
    },
turn : function(dir){
    var _this = this;

    if(dir == "right"){
    var page = _this.pageNow -1;
    if(page <= 0) page = _this.total;
    }else{
    var page = _this.pageNow + 1;
    if(page > _this.total) page = 1;
    }
_this.turnpage(page, dir);
},
turnpage : function(page,dir){
    var _this = this;
    if(_this.locked) {
    return false;
    } //���ر���
_this.locked = true;
if(_this.pageNow == page) return false; //����պ��ǵ�ǰҳ��,������nav������һ�㲻�����
//��Ҫ�Ķ�������
var run = function(page, dir, t){
    var pre = page > 1 ? page -1: _this.total;
    var next = page == _this.total ? 1 : page + 1;
    var preP = pre - 1 >= 1 ? pre-1 : _this.total;
    var nextN = next + 1 > _this.total ? 1 : next+1;
    if(dir == 'left'){
    //��ǰ�ı����ߵ�Сͼ
_this.parent.find(".snopshot:nth-child("+_this.pageNow+")").css({zIndex: 0});
_this.parent.find(".snopshot:nth-child("+pre+")").css({zIndex: 2});
if(browserVersion){
    //_this.parent.find(".snopshot:nth-child("+pre+")").find(".elementOverlay").css({opacity: 0.4});
	_this.parent.find(".snopshot:nth-child("+pre+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
}
_this.parent.find(".snopshot:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', width: _this.options.imgP + 'px', height:_this.options.imgHeight/1.2+'px', zIndex: 2, marginTop: _this.options.imgHeight/12+'px'}, t);

//��ʾ�µ����ͼ
_this.parent.find(".snopshot:nth-child("+page+")").css({zIndex: 3});
//_this.parent.find(".snopshot:nth-child("+page+")").find(".elementOverlay").css({opacity:0});
if(browserVersion){
    //_this.parent.find(".snopshot:nth-child("+page+")").find(".elementOverlay").css({opacity: 0});
	//_this.parent.find(".snopshot:nth-child("+page+")").find(".elementOverlay").addclass("picbgs");
	_this.parent.find(".snopshot:nth-child("+page+")").find("span").removeClass("elementOverlay").addClass("elementOverlays");
	//_this.parent.find(".snopshot:eq("+page+") span").remove();

}
_this.parent.find(".snopshot:nth-child("+page+")").animate({width:_this.options.imgWidth + 'px',height:_this.options.imgHeight + 'px',opacity:1,left:_this.pageNowLeft + 'px',zIndex:3,marginTop:0}, t);


_this.parent.find(".snopshot:nth-child("+next+")").css({opacity: 0, left: _this.nextNLeft+'px', height: '100px', width: _this.options.imgP + 'px', zIndex: 2, marginTop: '85px'});
if(browserVersion){
    //_this.parent.find(".snopshot:nth-child("+next+")").find(".elementOverlay").css({opacity: 0.4});
	_this.parent.find(".snopshot:nth-child("+next+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
}
_this.parent.find(".snopshot:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', width: _this.options.imgP + 'px', height:_this.options.imgHeight/1.2+'px', zIndex: 2, marginTop: _this.options.imgHeight/12 + 'px'}, t, "",function(){
    if(_this.total === 3){
        _this.locked=false;
    }
});


if(_this.total != 3){
    _this.parent.find(".snopshot:nth-child("+preP+")").css({zIndex:0});
    if(browserVersion){
//        _this.parent.find(".snopshot:nth-child("+preP+")").find(".elementOverlay").css({opacity: 0.4});
		_this.parent.find(".snopshot:nth-child("+preP+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
    }
    if(_this.total == 2){javascript:void(0);
	    if(_this.total === 2){
//	    	alert(_this.parent.find(".snopshot:nth-child("+preP+")").find("img").attr('src'));
	    	_this.parent.find(".snopshot:nth-child("+preP+")").find("span").css({opacity: 0});
	    	_this.parent.find(".snopshot:nth-child("+next+")").find("span").css({opacity: .4});
	        _this.locked=false;
	    }
    	_this.parent.find(".snopshot:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', width: _this.options.imgP + 'px', height:_this.options.imgHeight/1.2+'px', zIndex: 2, marginTop: _this.options.imgHeight/12 + 'px'}, t, "",function(){

    	});
    }else{
    	_this.parent.find(".snopshot:nth-child("+preP+")").animate({width:_this.options.imgP+'px', opacity: 0, left:_this.preNLeft+'px', zIndex:0, marginTop: '85px'},t, "", function(){_this.locked=false;});
    }
    
}
} else{
    _this.parent.find(".snopshot:nth-child("+_this.pageNow+")").css({zIndex: 0});

_this.parent.find(".snopshot:nth-child("+next+")").css({zIndex: 2});
if(browserVersion){
    //_this.parent.find(".snopshot:nth-child("+next+")").find(".elementOverlay").css({opacity: 0.4});
	_this.parent.find(".snopshot:nth-child("+next+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
}
_this.parent.find(".snopshot:nth-child("+next+")").animate({opacity: 1, left: _this.nextLeft+'px', width: _this.options.imgP + 'px', height:_this.options.imgHeight/1.2+'px', zIndex: 2, marginTop: _this.options.imgHeight/12+'px'}, t);


//��ʾ�µ����ͼ
_this.parent.find(".snopshot:nth-child("+page+")").css({zIndex: 3});

        if(browserVersion){
           // _this.parent.find(".snopshot:nth-child("+page+")").find(".elementOverlay").css({opacity: 0});
			
	_this.parent.find(".snopshot:nth-child("+page+")").find("span").removeClass("elementOverlay").addClass("elementOverlays");
	
		//_this.parent.find(".snopshot:eq("+page+") span").remove();
	
        }
_this.parent.find(".snopshot:nth-child("+page+")").animate({width:_this.options.imgWidth + 'px',height:_this.options.imgHeight + 'px',opacity:1,left:_this.pageNowLeft + 'px',zIndex:3,marginTop:0}, t);


_this.parent.find(".snopshot:nth-child("+pre+")").css({opacity: 0, left: _this.preNLeft+'px', height: '100px', width: _this.options.imgP + 'px', zIndex: 2, marginTop: '85px'});
        if(browserVersion){
            //_this.parent.find(".snopshot:nth-child("+pre+")").find(".elementOverlay").css({opacity: 0.4});
	_this.parent.find(".snopshot:nth-child("+pre+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
        }
_this.parent.find(".snopshot:nth-child("+pre+")").animate({opacity: 1, left: _this.preLeft+'px', width: _this.options.imgP + 'px', height:_this.options.imgHeight/1.2+'px', zIndex: 2, marginTop: _this.options.imgHeight/12 + 'px'}, t, "",function(){
    if(_this.total === 3){
        _this.locked = false;
    }
});

        if(_this.total != 3){
            _this.parent.find(".snopshot:nth-child("+nextN+")").css({zIndex:0});
            if(browserVersion){
                //_this.parent.find(".snopshot:nth-child("+nextN+")").find(".elementOverlay").css({opacity: 0.4});
			_this.parent.find(".snopshot:nth-child("+nextN+")").find("span").removeClass("elementOverlays").addClass("elementOverlay");
            }
            _this.parent.find(".snopshot:nth-child("+nextN+")").animate({width:_this.options.imgP+'px', opacity: 0, left:_this.nextNLeft+'px', zIndex:0, marginTop: '85px'},t, "", function(){_this.locked=false;});
        }
}
_this.pageNow = page;
};//��������
run(page,dir,_this.options.speed);
}
};
posterTvGrid.options = {
    total : 5,
    offsetPages : 3,//Ĭ�Ͽ����������
    direct : "left",//�����ķ���
    initPage : 1,//Ĭ�ϵ�ǰ��ʾ�ڼ���
    className : "snapShotWrap",//�������ʽ
    autoWidth : true,//Ĭ�ϲ������ÿ�
    width : 860,//��������Ҫʹ�õ�ʱ���ڴ�,Ĭ���ɳ����Զ��ж�
    height : 310,//������
    delay : 5000,//������������룩
    speed : 500, //�����ٶȺ���
    imgP : 200 //ͼƬƫ��
    };
window.posterTvGrid = posterTvGrid;
})(jQuery);


