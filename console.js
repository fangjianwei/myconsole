
(function(W){
	var F = this;
	this.showDebug = false;
	this.cssStyle = {
		console_log:  	'border:1px solid #CCC;color:#333;padding:0px 5px;min-height:24px;line-height:24px;margin-bottom:-1px;padding-left:30px;',
		console_info: 	'background-color:#EBF5FF;border:1px solid #CCC;color:#333;padding:0px 5px;min-height:24px;line-height:24px;margin-bottom:-1px;padding-left:30px;',
		console_warn: 	'background-color:#FFFFC8;border:1px solid #CCC;color:#333;padding:0px 5px;min-height:24px;line-height:24px;margin-bottom:-1px;padding-left:30px;',
		console_error:	'background-color:#FFEBEB;border:1px solid #CCC;color:#FF0000;padding:0px 5px;min-height:24px;line-height:24px;margin-bottom:-1px;padding-left:30px;',
		console_group:	'margin-top:20px;font-size:16px;font-weight:bolder;',
		console_log_function:'color:green;'
	};
	
	var getCssText = function(vals){
		var cssText = '';
		if (!vals||vals=='') return '';
		
		var valArray = vals.split(' ');
		for( x in valArray ){
			var key = valArray[x];
			var value = F.cssStyle[key];
			if( value ){
				cssText += value;
			}
		}
		
		return cssText;
	}
	
	W.myConsole = W.myConsole||{};

	myConsole.isDev = function(show){
		if(show&&show===true){
			F.showDebug = true;
		}else{
			F.showDebug = false;
		}
	}
	
	myConsole.assert = function(){
	};
	
	myConsole.clear = function(){
	};

	myConsole.count = function(){
	};
	
	myConsole.debug = function(){
	};
	
	myConsole.dir = function(){
	};
	
	myConsole.dirxml = function(){
	};
	
	myConsole.error = function(){
		var args=Array.prototype.slice.call(arguments);
		consoleHelper.showerror(args.join(" "));
	};
	
	myConsole.exception = function(){
	};
	
	myConsole.group = function(name){
		consoleHelper.showgroup(name);
	};
	
	myConsole.groupCollapsed = function(){
	};
	
	myConsole.groupEnd = function(){
	};
	
	myConsole.info = function(){
		var args=Array.prototype.slice.call(arguments);
		if(args.length==1){
			if(arguments[0] instanceof Array){
				consoleHelper.showinfo("["+args[0]+"]");
			}
			else if(arguments[0] instanceof Function){
				consoleHelper.showinfo(args[0],"console_log_function");
			}
			else{
				consoleHelper.showinfo(args[0]);
			}
		}
		else{
			consoleHelper.showinfo(args.join(" "));
		}
	};
	
	/**
	 * @param content
	 * @param pattern 
	 *	Pattern	Type
	 *	 %s	String
	 *	 %d, %i	Integer (numeric formatting is not yet supported)
	 *	 %f	Floating point number (numeric formatting is not yet supported)
	 *	 %o	Object hyperlink
	 *	 %c	Style formatting 
	 */
	myConsole.log = function(){
		var args=Array.prototype.slice.call(arguments);
		if(args.length>1){
			var i=1,hasstyle=false;
			if(args[0].indexOf("%c")==0){
				args[0]=args[0].replace(/%c/,"");
				i=2;
				hasstyle=true;
			}
			for(;i<args.length;i++){
				if(/%s|%d|%i|%o/.test(args[0])){
					args[0]=args[0].replace(/%s|%d|%i|%o/,args[i]);
				}
				else{
					break;
				}
			}
			if(i<args.length){
				args[0]=args[0]+" "+args.slice(i).join(" ");
			}
			if(hasstyle){
				consoleHelper.showlog(args[0],args[1]);
			}
			else{
				consoleHelper.showlog(args[0]);
			}
		}
		else if(args.length==1){
			if(arguments[0] instanceof Array){
				consoleHelper.showlog("["+args[0]+"]");
			}
			else if(arguments[0] instanceof Function){
				consoleHelper.showlog(args[0],null,"console_log_function");
			}
			else{
				consoleHelper.showlog(args[0]);
			}
		}
		else{
			consoleHelper.showlog("");
		}
	};
	myConsole.memoryProfile = function(){
	};
	
	myConsole.memoryProfileEnd = function(){
	};
	myConsole.profile = function(){
	};
	myConsole.profileEnd = function(){
	};
	myConsole.table = function(){
	};
	myConsole.time = function(){
	};
	myConsole.timeEnd = function(){
	};
	myConsole.timeStamp = function(){
	};
	myConsole.trace = function(){
	};
	myConsole.warn = function(){
		var args=Array.prototype.slice.call(arguments);
		if(args.length==1){
			if(arguments[0] instanceof Array){
				consoleHelper.showwarn("["+args[0]+"]");
			}
			else if(arguments[0] instanceof Function){
				consoleHelper.showwarn(args[0],"console_log_function");
			}
			else{
				consoleHelper.showwarn(args[0]);
			}
		}
		else{
			consoleHelper.showwarn(args.join(" "));
		}
	}	
	
	var consoleHelper={
		showlog:function(val,style,cla){
			if(cla){
				cla="console_log "+cla;
			}
			else{
				cla="console_log";
			}
			this.show(val,style,cla);
		},
		showinfo:function(val,cla){
			if(cla){
				cla="console_info "+cla;
			}
			else{
				cla="console_info";
			}
			this.show(val,null,cla);
		},            
		showwarn:function(val,cla){
			if(cla){
				cla="console_warn "+cla;
			}
			else{
				cla="console_warn";
			}
			this.show(val,null,cla);
		},
		showerror:function(val){
			this.show(val,null,"console_error");
		},
		showgroup:function(val){
			if(!val){
				val="";
			}
			this.show(val+":",null,"console_group");
		},
		show:function(val,style,cla){
			var _showconsole = document.getElementById("showconsole");
			if( F.showDebug===false ){ 
				if(_showconsole){
					_showconsole.parentNode.removeChild(_showconsole);
				}
				return;
			}
			
			if( !_showconsole ){
				_showconsole = document.createElement('div');
				_showconsole.setAttribute('id','showconsole');
				_showconsole.style.cssText = 'position:fixed;_position:absolute;background:#ccc;left:0;bottom:0;width:100%;_width:expression(document.body.clientWidth);border:1px solid green;z-index:9999999;_top:expression(document.documentElement.scrollTop+document.body.scrollTop+document.body.clientHeight-this.offsetHeight);';
				document.body.appendChild(_showconsole);
				document.body.style.cssText = '_background-image:url(text.txt);_background-attachment:fixed;' + document.body.style.cssText; 
				
				var titleDiv = document.createElement("div");
				titleDiv.style.cssText = 'background-color:#668B8B;height:28px;';
				titleDiv.innerHTML = '<div style="float:left;padding:4px 4px;">Console</div>'
									+'<div style="float:right;padding:4px 4px;">'
									+'	<a href="javascript:;">clear</a> ' 
									+'	<a href="javascript:;">min</a> '
									+'	<a href="javascript:;">max</a> '
									+'</div>';
				_showconsole.appendChild(titleDiv);
				
				var _contentDiv = document.createElement("div");
				_contentDiv.setAttribute('id','consoleContentDiv');
				_contentDiv.style.cssText = 'height:100px;overflow-y:auto;';
				_showconsole.appendChild(_contentDiv);
				
				var titleEventDiv = titleDiv.lastChild;
				var titleEventAs = titleEventDiv.children;
				var i=0;

				titleEventAs[0].onclick = function(){
					_contentDiv.innerHTML = '';
				};
				
				titleEventAs[1].onclick = function(){
					_contentDiv.style.display = 'none';
				};
				
				titleEventAs[2].onclick = function(){
					_contentDiv.style.display = 'block';
				}
				
			}
			


			var div=document.createElement("div");
			
			if(cla){
				div.style.cssText = getCssText(cla);
			}
			
			//else{
			//	div.className=cla;
			//}
			
			var oText=document.createTextNode( (new Date())+ ' ' +val);
			div.appendChild(oText);
			var _consoleContentDiv = document.getElementById("consoleContentDiv");
			if( _consoleContentDiv.childNodes[0] ){
				_consoleContentDiv.insertBefore(div,_consoleContentDiv.childNodes[0]);
			}else{
				_consoleContentDiv.appendChild(div);
			}
		}
	};	
	
})(window);


// polyfill, provide a fallback if the console doesn't exist
if (!console) {

	var console	= {},
		func	= function () { return false; };

	console.log		= func;
	console.info	= func;
	console.warn	= func;
	console.error	= func;

}

