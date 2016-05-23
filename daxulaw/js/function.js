// JavaScript Document
function update_page(url){
	if(url){
		window.location = url;
	}
}

function getPositionInTextBox(textBox){
    //如果是Firefox
	var start = 0,end = 0;
    if(typeof(textBox.selectionStart) == "number"){
        start = textBox.selectionStart;
        end = textBox.selectionEnd;
    }else if(document.selection){
		//下面是IE(6.0)的方法，麻烦得很，还要计算上'/n'
	    var range = document.selection.createRange();
	    if(range.parentElement().id == textBox.id){
	    	var len = range.text.length;
	        // create a selection of the whole textarea
	        var range_all = document.body.createTextRange();
	        range_all.moveToElementText(textBox);
	        //两个range，一个是已经选择的text(range)，一个是整个textarea(range_all)
	        //range_all.compareEndPoints()比较两个端点，如果range_all比range更往左(further to the left)，则                //返回小于0的值，则range_all往右移一点，直到两个range的start相同。
	        // calculate selection start point by moving beginning of range_all to beginning of range
	        for (start=0; range_all.compareEndPoints("StartToStart", range) < 0; start++)
	            range_all.moveStart('character', 1);
	        // get number of line breaks from textarea start to selection start and add them to start
	        // 计算一下/n
	        for (var i = 0; i <= start; i ++){
	            if (textBox.value.charAt(i) == '/n')
	                start++;
	        }
	        /*
	        // create a selection of the whole textarea
	         var range_all = document.body.createTextRange();
	         range_all.moveToElementText(textBox);
	         // calculate selection end point by moving beginning of range_all to end of range
	         for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end ++)
	             range_all.moveStart('character', 1);
	             // get number of line breaks from textarea start to selection end and add them to end
	             for (var i = 0; i <= end; i ++){
	                 if (textBox.value.charAt(i) == '/n')
	                     end ++;
	             }
	        */
	        end = start + len;
	        }
	  }
	return [start,end];
}


function hide_note(redirect_url){
	var div = $('alert_bar');
	div.style.display = 'none';
	if (redirect_url) {
		window.location = redirect_url;
	}
	return false;
}

function dismiss_note(url, pars, redirect_url){
	var my_ajax = new Ajax.Request( url, { method: 'get', parameters: pars, onComplete: hide_note(redirect_url) } );
}

var xmlhttp = null;
function createXMLHttpRequest(){
	var xmlhttp = null;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	}else{
		// code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
}

function keepSession(appHeader){
	window.setInterval(function(){
		if(xmlhttp == null){
			xmlhttp = createXMLHttpRequest();
		}
		xmlhttp.open("GET",appHeader + "/pages/messages/template2/blankpage.htm",true);
		xmlhttp.send();
		},300000);
}

function show_help_answer(id, num_of_faqs){
	for(var i=0; i<20; i++){
			try{
			var opened_div = $('faq_opened'+i);
		    var closed_div = $('faq_closed'+i);
		    
		    	opened_div.style.display = 'none';
				closed_div.style.display = 'block';

				if(i == id){
				opened_div.style.display = 'block';
				closed_div.style.display = 'none';
				}
			}catch(e){
			}
		
	}
}

function show_tab(tab_group, tab_name){
	var tab_group = $('tab_group');
	var tds = tab_group.getElementsByTagName('td');
	
	for(var i=0; i<tds.length; i++){
		if(tds[i].className.substring(0,7) != 'tab_gap'){
			var tab = $(tds[i].id);
			var panel = $('panel_' + tds[i].id )
			if(tab != null && panel != null){
				// hide panel
				panel.style.display = 'none';
				// set tab to unselected
				tds[i].className = 'tab';
			}
		}
	}
	
    var my_tab = $(tab_name);
    var my_panel = $('panel_' + tab_name);
	
    if(my_tab != null && my_panel != null){
		// show proper panel
  my_panel.style.display = '';
		// select proper tab
  my_tab.className = 'tab_selected';
	}

	// return false so href won't fire
	return false;
}
function activeMenu(cell,imageUrl){
	document.getElementById(cell).src = imageUrl;
	//cell.style.backgroundColor="#80ADE8";
	//var StaticHostPath="http://localhost:8080/static";
	//cell.background="http://localhost:8080/static/images/but_index02.gif";
	//cell.innerHTML="<a href=\"<c:url value='/welcome.do?method=viewWelcome'/>\" class=\"linkMenu\" id=\"MenuLink_home\"><img src=\""+StaticHostPath+"/images/but_index02.gif\" border=\"0\"></a>";
}
function deactiveMenu(cell,imageUrl){
	document.getElementById(cell).src = imageUrl;
	//cell.style.backgroundColor="transparent";
	//var StaticHostPath="http://localhost:8080/static";
	//cell.innerHTML="<a href=\"<c:url value='/welcome.do?method=viewWelcome'/>\" class=\"linkMenu\" id=\"MenuLink_home\"><img src=\""+StaticHostPath+"/images/but_index01.gif\" border=\"0\"></a>";
}
function showMenu(groupName,itemName){
	try{
				//var groupCell=$("MenuGroup_"+groupName);
				//var groupLink=$("MenuLink_"+groupName);
				//var groupRow=$("MenuRow_"+groupName);
				var itemLink=document.getElementById("MenuItem_"+itemName);
				//groupCell.style.backgroundColor="#05ADE8";
				//groupCell.onmouseover=null;
				//groupCell.onmouseout=null;
				//groupLink.className="linkMenuActive";
				//groupRow.style.display="";
				itemLink.style.textDecoration="underline";
	}catch(e){
	 
	}
}

function isdigit(s){
	var r,re;
	re = /\d*/i; //\d表示数字,*表示匹配多个数字
	r = s.match(re);
	return (r==s);
}
function IsDigit(){
  return ((event.keyCode >= 48) && (event.keyCode <= 57));
}
function _trim(str){
	if(str == null){
		return '';
	}
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

function addContactsToList(listId,msgId,planId,rgId,status,findEmail,type,link,listInternalName,listExternalName,currentPage,pagerMethod,falg,clicktype){
	showMask();
	jQuery.ajax({
		url:'contactsOperateConcern.do?method=addToList',
		data:"&listsId="+listId+"&msgId="+msgId+"&planId="+planId+"&rgId="+rgId+"&status="+status+"&findEmail="+findEmail+"&type="+type+"&link="+link+"&listInternalName="+listInternalName+"&listExternalName="+listExternalName+"&fromajax=1&falg="+falg+"&clicktype="+clicktype,
		type: "POST",		
		success:function(data){
			closeMask();
			window.location.href='contactsViewConcern.do?method=viewList&back=true&new=true&flag=1' + "&listsId="+listId+"&msgId="+msgId+"&planId="+planId+"&rgId="+rgId+"&status="+status+"&findEmail="+findEmail+"&type="+type+"&link="+link+"&listInternalName="+listInternalName+"&listExternalName="+listExternalName+"&currentPage="+currentPage+"&pagerMethod="+pagerMethod+"&falg="+falg+"&clicktype="+clicktype;
		},
		error:function(xhr,type,exception){
			closeMask();
			alert(exception);
		}		
	});
	
}


function cleanContactsToList(listId,chkType,newListIds,listIds,chkMethod,operate,enName,exName){
	
	showMask();
	jQuery.ajax({
		url:'cleanContact.do?method=clean',
		data:"&listId="+listId+"&chkType="+chkType+"&newListIds="+newListIds+"&listIds="+listIds+"&chkMethod="+chkMethod+"&operate="+operate+"&enName="+enName+"&exName="+exName,
		type:"POST",
		success:function(){
			closeMask();
			window.location.href='cleanContact.do?method=cleanResult';
		},
		error:function(xhr,type,exception){
			closeMask();
			alert(exception);
		}
	});
}



function checkContactsTask(listId,chkType,newListIds,listIds,chkMethod,operate,enName,exName,countContactNumber){
	jQuery.ajax({
		url:'cleanContact.do?method=checkContactClean',
		data:"&listId="+listId+"&cleanType="+chkType+"&newListId="+newListIds+"&listIds="+listIds+"&chkMethod="+chkMethod+"&operate="+operate+"&enName="+enName+"&exName="+exName+"&countContactNumber="+countContactNumber,
		type:"POST",
		success:function(resObj){
			if(resObj.count==1){
				alert("您的清理任务已经提交，请等待！");
				return ;
			}else{
				cleanContactsTaskToList(listId,chkType,newListIds,listIds,chkMethod,operate,enName,exName,countContactNumber);
			}
		}
	});
}

function cleanContactsTaskToList(listId,chkType,newListIds,listIds,chkMethod,operate,enName,exName,countContactNumber){
	showMask();
	jQuery.ajax({
		url:'cleanContact.do?method=clean',
		data:"&listId="+listId+"&chkType="+chkType+"&newListIds="+newListIds+"&listIds="+listIds+"&chkMethod="+chkMethod+"&operate="+operate+"&enName="+enName+"&exName="+exName+"&countContactNumber="+countContactNumber,
		type:"POST",
		success:function(){
			closeMask();
			window.location.href='cleanContact.do?method=cleanResult';
		},
		error:function(xhr,type,exception){
			closeMask();
			alert(exception);
		}
	});
}

function isNullObject(obj){
	return (obj == null || !obj || typeof obj == 'undefine');
}
function isEmail(value){
	var reg=/^\w+[-+._\w+]*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return reg.test(value);
}
function isNumber(s){
	var re = /^[-\+]?\d+(\.\d+)?$/; 
	return  re.test(s);
}

function correctPNG() // correctly handle PNG transparency in Win IE 5.5 & 6. 
{ 
    var arVersion = navigator.appVersion.split("MSIE") 
    var version = parseFloat(arVersion[1]) 
    if ((version >= 5.5) && (document.body.filters)) 
    { 
       for(var j=0; j<document.images.length; j++) 
       { 
          var img = document.images[j] 
          var imgName = img.src.toUpperCase() 
          if (imgName.substring(imgName.length-3, imgName.length) == "PNG") 
          { 
             var imgID = (img.id) ? "id='" + img.id + "' " : "" 
             var imgClass = (img.className) ? "class='" + img.className + "' " : "" 
             var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' " 
             var imgStyle = "display:inline-block;" + img.style.cssText 
             if (img.align == "left") imgStyle = "float:left;" + imgStyle 
             if (img.align == "right") imgStyle = "float:right;" + imgStyle 
             if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle 
             var strNewHTML = "<span " + imgID + imgClass + imgTitle 
             + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";" 
             + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader" 
             + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>";
             img.outerHTML = strNewHTML 
             j = j-1 
          } 
       } 
    }     
}
var BrowserInfo={
	_cacheInfo:null,
	_reg:{
		rwebkit:/(webkit)[ \/]([\w.]+)/,
		ropera:/(opera)(?:.*version)?[ \/]([\w.]+)/,
		rmsie:/(msie) ([\w.]+)/,
		rmozilla: /(mozilla)(?:.*? rv:([\w.]+))?/
	},
	_userAgent:navigator.userAgent,
	info:function(){
		if (this._cacheInfo){
			return this._cacheInfo;
		}  
		var ua = this._userAgent.toLowerCase();   
		reg=this._reg;   
		match = reg.rwebkit.exec(ua) || 
				reg.ropera.exec(ua) || 
				reg.rmsie.exec(ua) || 
				ua.indexOf("compatible") < 0 && reg.rmozilla.exec(ua) ||   
				[];   
		bInfo = { core: match[1] || "", version: match[2] || "0" };   
		this._cacheInfo=bInfo;   
		return bInfo;     
	} 
} 
function popWinonSelect(cbrowser,display){
 	var browserInfo = BrowserInfo.info();
    if(browserInfo.core == cbrowser.core && browserInfo.version == cbrowser.version){
    	var selects = document.getElementsByTagName("select");
 	for(var i = 0 ;i < selects.length;i++){
 		selects[i].style.visibility= display ? 'visible' : "hidden";
     	}
    }	
}
