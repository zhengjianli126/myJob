// 定义全局变量
var transEndTime=null,xTtime=null;
	//读取变现详情数据
             function getAjaxDate() {
//                 var str=common.app.myQueryURLParameter(window.location.href);
            	 var str=common.app.myQueryURLParameter('http://localhost:8080/tendering/?id=ZR555001180121090008');
                 $.ajax({
             		url:"debtAsset/project/detail",
             		dataType:'json',
             		data:{'transCode':str.id},
             		type:'get',
             		cache:false,
             		success:function(data){		
             			console.log(data)
             			var JSONData = data.data[0];
             			//转让剩余时间倒计时
             			transEndTime = conversionTwoTimes(data.data[0].transEndTime);//获取转让结束时间
                        xTtime = conversionTwoTimes(data.time);//获取系统时间
             			for(key in JSONData){
             				if($("#"+key)){
             					$("#"+key).html(JSONData[key]);
             				}			
             			}
                        
             		}
             	});
             }
             getAjaxDate();
//修改时间格式
			function conversionTwoTimes(strTime){
				var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
				var formatedDate = strTime.replace(pattern, '$1/$2/$3 $4:$5:$6');
				return formatedDate;
			}
			//转让剩余时间倒计时
			function getSpanTime(transEndTime,xTtime) {
				console.log(transEndTime,xTtime);
		        var strTime = new Date(transEndTime);
		        var nowTime = new Date(xTtime);
		        var strSpan = strTime.getTime();
		        var nowSpan = nowTime.getTime();
		        var diffTime = strSpan - nowSpan;
		        console.log(diffTime);
		        if (diffTime > 0) {
		            var hours = Math.floor(diffTime / (1000 * 60 * 60));
		            var hoursMS = hours * 1000 * 60 * 60;
		            var minutesMS = diffTime - hoursMS;
		            var minutes = Math.floor(minutesMS / (1000 * 60));
		            var secondsMS = minutesMS - minutes * 1000 * 60;
		            var seconds = Math.floor(secondsMS / 1000);
		            return addzero(hours) + ":" + addzero(minutes) + ":" + addzero(seconds);
		        } else {
		        	return "00时00分00秒"
		        }
		    }
			//处理倒计时缺十位
		    function addzero(val) {
		        return Number(val) < 10 ? "0" + val : val;
		    }
   //展示倒计时
		    var oDiv = document.getElementById("XQcuTimesy");
		    oDiv.innerHTML = getSpanTime(transEndTime,xTtime);
		    var timeStr = window.setInterval(function () {
		    	getAjaxDate();
		        oDiv.innerHTML = getSpanTime(transEndTime,xTtime);
		    }, 1000);