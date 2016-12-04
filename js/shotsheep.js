$(document).ready(function(){
    //60秒倒计时
    var timeCountNum = 60;
    var timeCountTimer = null;
    function CountSixty(){
    	var timeCount = timeCountNum < 10 ? '0' + timeCountNum : timeCountNum;
		$('.timer-icon').html(timeCount);
		timeCountNum--;
		if(timeCountNum < 0){
			clearInterval(timeCountTimer);
			clearInterval(showSheepTimer);
			$('.timer-icon').hide();
			$('.play-again').css({'display':'block'});
			$('#result span').html(shootNum);
			$('#result').show();
		}
    };

	//获取随机数
	function getRandom(begin,end){
        return Math.floor(Math.random() * (end - begin)) + begin;
    };
    //清空选区
    function cleanSelection(){
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    };

    //每1050ms随机出现一只羊
    var showSheepTimer = null;
    function showSheep(){
    	cleanSelection();
    	var RandomNum =  getRandom(0,6);
    	$('.animate-sheep').eq(RandomNum).children('img').show();
    	setTimeout(function(){
    		$('.animate-sheep').eq(RandomNum).children('img').hide();
    	},1000)
    };

    //获取射击的数量并显示
    var shootNum = 0;
	$('.target-sheep').on('click touchstart',function(){
		$(this).hide();
		shootNum++;
		$('#shotCount .unit').html(shootNum%10);
		$('#shotCount .decade').html(parseInt(shootNum%100/10));
		$('#shotCount .hundreds').html(parseInt(shootNum/100));	
	});

    //点击重新开始时刷新
	$('.play-again').on('click',function(){
		timeCountNum = 60;
		$('#result').hide();
		$('.timer-icon').show();
		$('.play-again').css({'display':'none'})
		timeCountTimer = setInterval(CountSixty,1000);
		showSheepTimer = setInterval(showSheep,1550);
		shootNum = 0;
		$('.unit,.decade,.hundreds').html(0);
	});

    //开幕4秒倒计时
	var beginArr = ['03','02','01','GO!'];
	var beginTimer = null;
	var beginNum = 0;
    beginTimer = setInterval(CountFour,1000);
    function CountFour(){
    	beginNum++;
    	$('.countDown').html(beginArr[beginNum]);
    	if(beginNum > 3){
    		$('#screenMask').hide();
    		beginNum = 0;
    		clearInterval(beginTimer);
    		timeCountTimer = setInterval(CountSixty,1000);
		    showSheepTimer = setInterval(showSheep,1050);
    	}
    };
})