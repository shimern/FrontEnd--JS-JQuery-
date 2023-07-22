$(".JQButton").click(function()
			{
				var buttonPos=$(".JQButton").position().top;
				var buttonLen = $(".JQButton").height();
				var containerLen = $(".container").height();
				var scrollHeight = buttonLen+containerLen+buttonPos; 
				
				var scrollTime=600;
				$("body,html").animate({"scrollTop":scrollHeight},scrollTime);
			});
			