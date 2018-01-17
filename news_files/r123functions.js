function eventTracking(eventType, bahasa, opt_action) {
	
	var eng_cat = '';
	var s_cat = '';
	var e_cat = '';
	
	switch(eventType) {
		case 'search_basic' :
			eventCat = 'Search Box Homepage - ';
			e_cat = (cat == 'disewa')?'Rent':'Sale';
			eventCat += e_cat +' - '+ bahasa;
			
			break;
		case 'search_advanced' :
			eventCat = 'Advance Search Box - ';
			s_cat = $('#t-category').val();
			e_cat = (s_cat == 'Disewa')?'Rent':'Sale';
			eventCat += e_cat +' - '+ bahasa;
			
			break;
		case 'refine_search' :
			eventCat = 'Refine Search Box - ';
			s_cat = $('#refine_category').val();
			e_cat = (s_cat == 'r')?'Rent':'Sale';
			eventCat += e_cat +' - '+ bahasa;
			
			break;
	}
	
	//var pushing = '_gaq.push([\'_trackEvent\', \''+ eventCat +'\', \''+ opt_action +'\')';
	//console.log(pushing);
	setTimeout(function() {
		_gaq.push(['_trackEvent', eventCat, opt_action]);
	}, 100);
	
}

function eTracking(category, label, option, url) {
	
	if(typeof(option) == "undefined") {
		option = '';
	}
	//alert(category);
	//var per = "_gaq.push(['_trackEvent', '"+ category +"', '"+ label +"', '"+ option +"']);";
	//console.log(per);
	// set timout dulu
	_gaq.push(['_trackEvent', category, label, option ]);
	
	if(typeof(url) !== 'undefined'){ 
		setTimeout(function(){ 
			location.href=base_url+'/'+url.replace(base_url+'/',''); 
		}, 100); 
	} 
	return true;
}

// JavaScript Document
function RevealContact(wrapper, ContactType, AgentId)
{
	/*$(wrapper).show();
	if(hideclosure)
	{
		$(closure).hide();
	}*/
	$.ajax({
		url:"ajaxfolder/ajax_features.php?f=getAgentContact&AgentId="+AgentId+"&ContactType="+ContactType,
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(response){
			$(wrapper).html(response);
		}
	})
}

function CountLeads(LinkName, AgentID)
{
	$.ajax({
		url: "ajaxfolder/ajax_features.php?f=AgentLeadCount&name="+LinkName+"&agent="+AgentID,
		contentType:'application/x-www-form-urlencoded; charset=UTF-8'
	})
}

function setCookie(c_name,value,exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie = c_name + "=" + c_value + "; domain=rumah123.com; path=/";
}

function getCookie(c_name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == c_name) {
			return unescape(y);
		}
	}
}

function ShowPPCForm()
{
	$("#PopUpBG").show();
	$("#PopUpFrame").fadeIn(1000);
	$("#PopUpFrame").attr("src",domain_prefix+"/statics/ppcform.php");
	$("#PopUpFrame").css({
		'top':'35%',
		'width':'561px',
		'height':'449px',
	})
}
function HidePPCForm()
{
	$("#PopUpFrame").fadeOut(1000,function(){
		$("#PopUpBG").hide();	
		$("#PopUpFrame").attr("src","");
	});
	setCookie("_ppc_cookie","1",1);
}

/*$(document).ready(function(){
	var ppcCookie = getCookie("_ppc_cookie");
	if(ppcCookie=="" || ppcCookie==undefined){
		ShowPPCForm();
	}
})*/

function ClickThroughEmailAlert(type, cat)
{
	var url = location.href;
	if(url.indexOf("#emailalert")>0)
	{
		$.ajax({
			url:"ajaxfolder/ajax_features.php?f=clickThrough&opt="+type+"&cat="+cat,
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			success:function(){}
		})
	}
}

function GeneratePropinsiOptions(){
	var ComboOptions="";
	var ProvinsiLength=Provinsi.length;
	ComboOptions="<option value='all'>Semua Propinsi</option>";
	for(i=0; i<ProvinsiLength; i++){
		ComboOptions+="<option value='"+Provinsi[i][2]+"'>"+Provinsi[i][2]+"</option>";
	}
	return ComboOptions;
}

function GenerateKotaOptions(strProvinsi){
	var ComboOptions="";
	var KodePropinsi;
	ComboOptions="<option value='all'>Semua Kota</option>";
	var ProvinsiLength=Provinsi.length;
	for(i=0; i<ProvinsiLength; i++){
		if(Provinsi[i][2]==strProvinsi){
			KodePropinsi=Provinsi[i][0];
		}
	}
	var KotaLength=Kota.length;
	for(i=0; i<KotaLength; i++){
		if(Kota[i][1]==KodePropinsi){
			ComboOptions+="<option value='"+Kota[i][2]+"'>"+Kota[i][2]+"</option>";	
		}		
	}
	return ComboOptions;
}

function FormatCurrency(objNum) 
{
    var num = objNum.value
    var ent, dec;
    if (num != '' && num != objNum.oldvalue)
    {
        num = MoneyToNumber(num);
        if (isNaN(num))
        {
            objNum.value = (objNum.oldvalue) ? objNum.oldvalue : '';
        } else {
            var ev = (navigator.appName.indexOf('Netscape') != -1) ? Event : event;
            
            if (ev.keyCode == 190 || !isNaN(num.split('.')[1]))
            {
                objNum.value = AddCommas(num.split('.')[0]) + '.' + num.split('.')[1];
            }
            else
            {
                objNum.value = AddCommas(num.split('.')[0]);
            }

            objNum.oldvalue = objNum.value;
        }
    }
}

function MoneyToNumber(num){
	return (num.replace(/,/g, ''));	
}

function AddCommas(num) {
    numArr = new String(num).split('').reverse();

    if (lang == 'id') {
        var delimiter = '.';
    } else {
        var delimiter = ',';
    }

    for (i = 3; i < numArr.length; i += 3)
    {
        numArr[i] += delimiter;
    }
    return numArr.reverse().join('');
}

function CloseTreasureHuntFrame(){
	setCookie("_treasurehunt_cookie","1",1);
	$("#CampaignPopUp").hide("slow");	
}

function DeleteInquiry(InquiryId)
{
	var confirmDelete = confirm("Hapus Inquiry tepilih?");
	if(confirmDelete)
	{
		$.ajax({
			url:"/admin/class_ajax/enduser_management.php",
			type:"post",
			data:{"f":"DeleteInquiry", "id":InquiryId},
			success:function(){
				alert("Inquery sudah dihapus.");
				location.reload();
			}
		})	
	}
}

function showVideo()
{
	$(".listing-detail-gallery-image-box").hide();
	$(".listing-detail-gallery-video-box").show();
	$(".listing-detail-gallery-map-box").hide();
	$("#imageNav").removeClass('active');
	$("#imageNav").addClass('inactive');
	$("#videoNav").addClass('active');
	$("#videoNav").removeClass('inactive');
	$("#mapNav").removeClass('active');
	$("#mapNav").addClass('inactive');
}

function showImage()
{
	$(".listing-detail-gallery-image-box").show();
	$(".listing-detail-gallery-video-box").hide();
	$(".listing-detail-gallery-map-box").hide();
	$("#imageNav").addClass('active');
	$("#imageNav").removeClass('inactive');
	$("#videoNav").removeClass('active');
	$("#videoNav").addClass('inactive');
	$("#mapNav").removeClass('active');
	$("#mapNav").addClass('inactive');
}

function showMap()
{
	$(".listing-detail-gallery-image-box").hide();
	$(".listing-detail-gallery-video-box").hide();
	$(".listing-detail-gallery-map-box").show();
	$("#imageNav").addClass('inactive');
	$("#imageNav").removeClass('active');
	$("#videoNav").removeClass('active');
	$("#videoNav").addClass('inactive');
	$("#mapNav").removeClass('inactive');
	$("#mapNav").addClass('active');
}

function videoSlideLeft()
{
	var scrollLeft = ($(".yt_holder ul").css("left")==undefined)?0:$(".yt_holder ul").css("left");
	scrollLeft = parseInt(scrollLeft.replace("px",""));
	if(scrollLeft<0)
	{
		$(".yt_holder ul").animate({"left": "+=50px"}, "slow");
	}
	else
	{
		$(".yt_holder ul").animate({"left": "=0px"}, "slow");	
	}
}

function videoSlideRight()
{
	var scrollLeft = ($(".yt_holder ul").css("left")==undefined)?0:$(".yt_holder ul").css("left");
	scrollLeft = parseInt(scrollLeft.replace("px",""));
	var RightLimit = 0-($(".yt_holder ul li").outerWidth()*2);
	if(scrollLeft>RightLimit)
	{
		$(".yt_holder ul").animate({"left": "-=50px"}, "slow");
	}
}

function hideBrokenImage(brokenImage, UseSubstitute)
{
	if(UseSubstitute)
	{
		brokenImage.src="http://images.rumah123.com/photo/no_photo.jpg";
	}
	else
	{
		brokenImage.style.display="none";	
	}		
}

function GetScreenWidth()
{
	var winW = 630;
	if (document.body && document.body.offsetWidth) {
	 winW = document.body.offsetWidth;
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=='CSS1Compat' &&
		document.documentElement &&
		document.documentElement.offsetWidth ) {
	 winW = document.documentElement.offsetWidth;
	 winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
	 winW = window.innerWidth;
	 winH = window.innerHeight;
	}
	return winW
}

function toggleDialog(dialog, dialogBg)
{
	$(dialogBg).css({
		"opacity":"0.6",
		"z-index":"9999998",
	});
	$(dialogBg).show();
	$(dialog).css({
		"width":"590px",
		"z-index":"9999999",
		"background":"#fff",
		"position":"fixed",
		"left":"50%",
		"top":"50%",
		"margin-top":"-200px",
		"margin-left":"-285px",
	});
	$(dialog).slideDown("slow");
	$(dialogBg).click(function(){
		closeDialog(dialog, '#backgroundPopup')
	})
}

function closeDialog(dialog, dialogBg)
{
	$(dialog).slideUp("slow");
	$(dialogBg).hide();	
}

function showemailform()
{
	toggleDialog('#dialog-container', '#backgroundPopup')
	$('#dialog-container').css({"height":"410px"})
	$.ajax({
		url:'/ajax/consumeremail/nobootstrap',
		cache:true,
		success: function(response){
			$("#dialog-container").html(response);
			var content = "<h4>"+$("title").text()+"</h4><br>";
			content+="<p>"+$("meta[name=description]").attr("content")+"</p><br>";
			content+="<a href='"+document.URL+"'>"+document.URL+"</a>";
			$("#mail-message").html(content);
		}
	})
}

function sendemail()
{
	var mandatoryField = true;
	$("input[type=text]").each(function(){
		if($(this).attr("data-required")=='yes')
		{
			if($(this).val()=="")
			{
				alert($(this).attr("data-error-message"))
				$(this).addClass("feedback-error");
				$(this).focus();
				mandatoryField = false;
				return false;	
			}			
		}
		/*if($(this).attr("data-format")=='email')
		{
			if(!ValidateEmail($(this)))
			{
				alert('Format alamat email yang Anda masukkan tidak sesuai.');
				mandatoryField = false;
				return false;
			}
		}*/
	})
	if(!mandatoryField)
	{
		return false;	
	}
	var from = $("#mail-from").val();
	var to = $("#mail-to").val();
	var comment = $("#mail-comment").val();
	var message = $("#mail-message").html();
	$.ajax({
		url:'/ajax/consumeremail/nobootstrap',
		type:"post",
		data:{from:from, to:to, comment:comment, message:message},
		success: function(response){
			closeDialog('#dialog-container', '#backgroundPopup')
			//$("#dialog-container").html(response);
			//setInterval("closeDialog('#dialog-container', '#dialog-bg')", 3000);
		}
	});
}

function isValidPhone(num) {
  var parsed = true;
  var validnumber = "1234567890";
  for (var i=0; i < num.length; i++) {
    var char = num.charAt(i).toLowerCase();
    if (validnumber.indexOf(char) != -1)
      continue;
    parsed = false;
    break;
  }
  return parsed;
}

function ValidateEmail(inputText)  
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(inputText.value.match(mailformat))  
	{  
		return true;  
	}  
	else  
	{  
		return false;  
	}  
}

function showListingRent()
{
	$("#related-listing-sale").hide();
	$("#related-listing-rent").show();
	$("#relatedSalebtn").removeClass('active');
	$("#relatedSalebtn").addClass('inactive');
	$("#relatedRentbtn").removeClass('inactive');
	$("#relatedRentbtn").addClass('active');
}

function showListingSale()
{
	$("#related-listing-sale").show();
	$("#related-listing-rent").hide();
	$("#relatedRentbtn").removeClass('active');
	$("#relatedRentbtn").addClass('inactive');
	$("#relatedSalebtn").removeClass('inactive');
	$("#relatedSalebtn").addClass('active');

}

function showListingView(val) 
{
	var url = location.href
	url = url.replace(/#/, '');
	if(val == 'map') {
		url = url.replace(/-[0-9]-/, '-');
	}
	var href = url.split("?"); 
	
	var prms=""; 
	
	if(href.length>1) { 
		var prm = href[1].split("&"); 
		var prmsort = "";
		var prmhal = "";	
		
		if(prm.length>0){ 
			for(var x=0;x<prm.length;x++){ 		
				if(val != 'list') {
					if(prm[x].search("view=")>=0) prms+="";
					else prms+="&"+prm[x];
				} else {
					if(prm[x].search("view=")>=0) {
						if(prm.length>1) {
							x = x+1;
							prms+="?"+prm[x];
						} else prms+="";
						
					} else {
					
						if(x>0)
							prms+="&"+prm[x];
						else
							prms+="?"+prm[0];
					
					}
				}
			} 
		} 
	} 
	
	if(val == 'list') {
		document.location.href=href[0]+prms;
	} else
		document.location.href=href[0]+"?view="+val+prms; 
}

function showListingInquiry(agentId, adsId, lang, area, image, logo, company){
	if(agentId==""){return false;}
	var width = 740;
	var marginLeft = 0 - (width/2);
	$('#commercial-modal').css({
		height:'auto',
		width:width+'px',
		'margin-left':marginLeft+'px',
	});
	$.ajax({
		url:'templates/layout/parts/enquiry_form.php',
		type:'post',
		data:{agentId:agentId, adsId:adsId, lang:lang, area:area, image:image, logo:logo, company:company},
		success:function(response){
			$('#commercial-modal').html(response);			
			$('#commercial-modal').modal('show')
		}
	})
	var LinkName = 'EMAILAGENT_'+agentId+(adsId!=''?"_"+adsId.substring(0,3).toUpperCase()+"_"+adsId.substring(3):'');
	CountLeads(LinkName, agentId);
}

function showSecListingInquiry(agentId, adsId, lang, area, image, logo, company){
	if(agentId==""){return false;}
	var width = 740;
	var marginLeft = 0 - (width/2);
	$('#commercial-modal').css({
		height:'auto',
		width:width+'px',
		'margin-left':marginLeft+'px',
	});
	$.ajax({
		url:'templates/layout/parts/dev_enquiry_form.php',
		type:'post',
		data:{agentId:agentId, adsId:adsId, lang:lang, area:area, image:image, logo:logo, company:company},
		success:function(response){
			$('#commercial-modal').html(response);			
			$('#commercial-modal').modal('show')
		}
	})
	var LinkName = 'EMAILAGENT_'+agentId+(adsId!=''?"_"+adsId.substring(0,3).toUpperCase()+"_"+adsId.substring(3):'');
	CountLeads(LinkName, agentId);
}

function ShowDevInquiry(devId, logo, companyId, lang){
	if(devId==""){return false;}
	$.ajax({
		url:'templates/layout/parts/dev_enquiry_form.php',
		type:'post',
		data:{devId:devId, logo:logo, lang:lang, logo:logo, companyId:companyId},
		success:function(response){
			$('#pop_up_box').html(response);			
			//$('#commercial-modal').modal('show')
		}
	})
	
	$("#pop_up_box").lightbox_me({centered: true, zIndex: 1000099, onLoad: function() {
		$("#pop_up_box").find("input:first").focus();
	}});
	
	//e.preventDefault();
	/*
	var width = 740;
	var marginLeft = 0 - (width/2);
	$('#commercial-modal').css({
		height:'auto',
		width:width+'px',
		'margin-left':marginLeft+'px',
	});
	$.ajax({
		url:'templates/layout/parts/dev_enquiry_form.php',
		type:'post',
		data:{devId:devId, logo:logo, lang:lang, logo:logo, companyId:companyId},
		success:function(response){
			$('#commercial-modal').html(response);			
			$('#commercial-modal').modal('show')
		}
	})
	//var LinkName = 'EMAILAGENT_'+agentId+(adsId!=''?"_"+adsId.substring(0,3).toUpperCase()+"_"+adsId.substring(3):'');
	//CountLeads(LinkName, agentId);
	*/
}

function sendListingInquiry(adsId, agentId, lang){
	var flash = '<div class="alert alert-success">sukses</div>';
	$('.alert-error').remove();
	if($('#inputNama').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Name cannot be empty':'Nama harus diisi')+'</div>';
		$(flash).insertAfter('#inputNama');
		$('#inputNama').focus();
		return false;
	}
	if($('#inputPhone').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Phone cannot be empty':'Telepon harus diisi')+'</div>';
		$(flash).insertAfter('#inputPhone');
		$('#inputPhone').focus();
		return false;
	}else {	
		if(!isValidPhone($('#inputPhone').val()))
		{
			flash = '<div class="alert alert-error">'+(lang=='en'?'Invalid phone number':'Hanya diperbolehkan menggunakan angka')+'</div>';
			$(flash).insertAfter('#inputPhone');
			$('#inputPhone').focus();
			return false;
		}	
	}
	if($('#inputEmail').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Email cannot be empty':'Alamat email harus diisi')+'</div>';
		$(flash).insertAfter('#inputEmail');
		$('#inputEmail').focus();
		return false;
	}
	else {
		if(!ValidateEmail(document.getElementById('inputEmail')))
		{
			flash = '<div class="alert alert-error">'+(lang=='en'?'Invalid email format!':'Format alamat email yang Anda masukkan tidak sesuai.')+'</div>';
			$(flash).insertAfter('#inputEmail');
			$('#inputEmail').focus();
			return false;
		}	
	}
	var inputTipe='';
	$(".inputTipe:checked").each(function() {
		inputTipe += $(this).val()+',';
	});
	var data = {
			agentId: agentId,
			adsId: adsId,
			lang: lang,
			name: $('#inputNama').val(),
			phone: $('#inputPhone').val(),
			email: $('#inputEmail').val(),
			message: $('#inputPesan').val(),
			age: $('#inputUmur').val(),
			type: inputTipe.substring(0,inputTipe.length),
			newsletter: $('#chkNewsletter').val(),
			newsalert: $('#chkNewsAlert').val(),
		};
		
	$.ajax({
		url: "ajaxfolder/ajax_features.php?f=sendInquiry",
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		async: false,
		type: "post",
		data:data,
		success: function(response){
			
		}
	});
	var message="";
	if(lang=='en'){
		message = 'Your inquiry has been sent to the Agent. Thank you for visiting Rumah123.com.';	
	}else{
		message = 'Inkuiri anda sudah dikirim. Terima kasih.';
	}
	$('<div class="alert alert-success">sukses</div>').appendTo('#commercial-modal .form-horizontal');
	setTimeout(function(){$('#commercial-modal').modal('hide')}, 1000)
}
function showAgentContact(wrapper, ContactType, LinkName, AgentId){
	$.ajax({
		url: "ajaxfolder/ajax_features.php?f=AgentLeadCount&name="+LinkName+"&agent="+AgentId,
		contentType:'application/x-www-form-urlencoded; charset=UTF-8'
	});
	$.ajax({
		url:"ajaxfolder/ajax_features.php?f=getAgentContact&AgentId="+AgentId+"&ContactType="+ContactType,
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(response){
			if(response!=""){
				$(wrapper).html(response);
				$(wrapper).css({'color':'#000', 'font-size':'13px;'});
			}
		}
	});
}

function createEmailAlert(area, type, category, price_min, price_max, url, search_id, lang, table) {
	
	$.post('plain.php?do=reg_email_alert', {area : area, type: type, category:category, pricemin :price_min, pricemax:price_max, url:url, search_id : search_id, lang:lang, table:table}, function(result) {
		
		location.reload();
	});
}

function deleteSavedEmailAlert(email_alert_id, email, lang) {
	
	var conf = confirm((lang=='en'?"Are you sure you want to delete email alert for this search criteria?":"Anda yakin akan menghapus email alert untuk kriteria pencarian ini?"));
	
	if(conf == true){
		$.post('plain.php?do=del_email_alert&user_email='+ email +'&email_alert_id='+ email_alert_id, function(data) {
			location.reload();
		});
	} 	
}

function noEmailAlert(lang) {
	
	var msg = (lang=='id'?'Kriteria ini tidak dapat dijadikan email alert karena kriteria ini tidak memiliki area':'This criteria can not be used as an email alert because this criterion has no area');
	alert(msg);
}

function leadsDev(devId, objectID, detail)
{
	$("#"+objectID).html(detail);
	$("#"+objectID).focus();
	$.ajax({
		url:"perumahan-baru/perumahanBaru/countLeads",
		type:"post",
		data:{id:devId, type:objectID},
		success: function(){}
	})	
}

function slNextSlide(slideId, ListingId){
	secImageCount = $('#' + slideId).children().length;
	secSlideIndex = $('#secondary-gallery-pointer-'+ ListingId).text();
	
	if(secSlideIndex==secImageCount){return false;}
	currentSecSlide = secSlideIndex;
	secSlideIndex++;
	
	if(secSlideIndex==secImageCount){
		$('#btn-next-' + ListingId).css({
			'opacity':'.5'
		});
	}
	$('.secondary-slide-prev').css({
			'opacity':1
		});
	$('#secondary-gallery-pointer-'+ ListingId).html(secSlideIndex);
	$('#'+ slideId +' div:nth-child('+secSlideIndex+')').animate({
		'left':0,
		'width':'100%',
		'text-align':'center',
	}, {
		duration: 1000,
	});	
	$('#'+ slideId +' div:nth-child('+currentSecSlide+')').animate({
		'left':'-450px',
		'z-index':4,
		'position':'absolute'
	}, {
		duration: 1500,
	});
}

function SlPrevSlide(slideId, ListingId){
	secSlideIndex = $('#secondary-gallery-pointer-'+ ListingId).text();
	console.log('sec : ' + secSlideIndex);
	if(secSlideIndex==1){return false;}
	currentSecSlide = secSlideIndex;
	secSlideIndex--;
	if(secSlideIndex==1){
		$('.secondary-slide-prev').css({
			'opacity':'.5'
		});
	}
	$('.secondary-slide-next').css({
			'opacity':1
		});
	$('.secondary-image-pointer').html(secSlideIndex);
	$('#'+ slideId +' div:nth-child('+secSlideIndex+')').animate({
		'left':0,
		'width':'100%',
		'text-align':'center',
	}, {
		duration: 1000,
	});	
	$('#'+ slideId +' div:nth-child('+currentSecSlide+')').animate({
		'left':'280px',
		'z-index':4,
	}, {
		duration: 1500,
	});
}

function validateInquiryDevPopup() {
	var validation=true;
	$("#contact-popup-form .isrequired").each(function(){
		if($(this).val()=="")
		{
			error_message = $(this).attr('isnull');
			$(this).attr({
				'data-content':error_message,
				'data-original-title':'Error'
			});
			$(this).parent().addClass('error');
			$(this).popover({trigger:'focus', content:error_message});
			
			$(this).focus();
			$('.popover-title').css({'color':'#F00'});
			$('.popover-content').css({'color':'#000'});
			$('.popover').css({'z-index':'1000102'});
			validation=false;
			return validation;
		}
		else if($(this).attr('id')=="ContactForm_email"){
			if(!validateEmail($(this).val())){
				error_message = $(this).attr('isinvalid');
				$(this).attr({
					'data-content':error_message,
					'data-original-title':'Error'
				});
				
				$(this).popover({trigger:'focus', content:error_message});
				$('.popover').css({'z-index':'1000102'});
				$(this).focus();
				$('.popover-title').css({'color':'#F00'});
				$('.popover-content').css({'color':'#000'});
				
				validation=false;
				return validation;
			}
		}
	})
	return validation;

}

function sendSecListingInquiry(adsId, agentId, lang){
	var flash = '<div class="alert alert-success">sukses</div>';
	$('.alert-error').remove();
	if($('#inputNama').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Name cannot be empty':'Nama harus diisi')+'</div>';
		$(flash).insertAfter('#inputNama');
		$('#inputNama').focus();
		return false;
	}
	if($('#inputPhone').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Phone cannot be empty':'Telepon harus diisi')+'</div>';
		$(flash).insertAfter('#inputPhone');
		$('#inputPhone').focus();
		return false;
	}else {	
		if(!isValidPhone($('#inputPhone').val()))
		{
			flash = '<div class="alert alert-error">'+(lang=='en'?'Invalid phone number':'Hanya diperbolehkan menggunakan angka')+'</div>';
			$(flash).insertAfter('#inputPhone');
			$('#inputPhone').focus();
			return false;
		}	
	}
	if($('#inputEmail').val()==""){
		flash = '<div class="alert alert-error">'+(lang=='en'?'Email cannot be empty':'Alamat email harus diisi')+'</div>';
		$(flash).insertAfter('#inputEmail');
		$('#inputEmail').focus();
		return false;
	}
	else {
		if(!ValidateEmail(document.getElementById('inputEmail')))
		{
			flash = '<div class="alert alert-error">'+(lang=='en'?'Invalid email format!':'Format alamat email yang Anda masukkan tidak sesuai.')+'</div>';
			$(flash).insertAfter('#inputEmail');
			$('#inputEmail').focus();
			return false;
		}	
	}
	var inputTipe='';
	$(".inputTipe:checked").each(function() {
		inputTipe += $(this).val()+',';
	});
	var data = {
			agentId: agentId,
			adsId: adsId,
			lang: lang,
			name: $('#inputNama').val(),
			phone: $('#inputPhone').val(),
			email: $('#inputEmail').val(),
			message: $('#inputPesan').val(),
			age: $('#inputUmur').val(),
			type: inputTipe.substring(0,inputTipe.length),
			newsletter: $('#chkNewsletter').val(),
			newsalert: $('#chkNewsletter').val(),
		};
		
	$.ajax({
		url: "ajaxfolder/ajax_features.php?f=sendSecDevInquiry",
		contentType:'application/x-www-form-urlencoded; charset=UTF-8',
		async: false,
		type: "post",
		data:data,
		success: function(response){
			
		}
	});
	var message="";
	if(lang=='en'){
		message = 'Your inquiry has been sent to the Agent. Thank you for visiting Rumah123.com.';	
	}else{
		message = 'Inkuiri anda sudah dikirim. Terima kasih.';
	}
	$('<div class="alert alert-success">sukses</div>').appendTo('#commercial-modal .form-horizontal');
	setTimeout(function(){$('#commercial-modal').modal('hide')}, 1000)
}

function processPAPopup(e) {
	
	var h = window.location,
        l = s_area!=''?s_area:'',
        j = $.cookie("paCnt") || 0;
		
	"False" == e ? $.cookie("paCnt", 1, {
		path: "/"
	}) : $.cookie("paCnt", 1 * j +1, {
		path: "/"
	});
	
	if(l != '' &&  3 <= $.cookie("paCnt")) {
		eApopUp();
	}
}


function eApopUp() {

	var width = 440;
	var marginLeft = 0 - (width/2);
	$('#commercial-modal').css({
		height:'auto',
		width:width+'px',
		'margin-left':marginLeft+'px',
	});
	
	$.ajax({
		url:'templates/layout/tools/email_alert.php',
		type:'post',
		data:{area:s_area, cat:s_cat, opt:s_opt, lang:s_lang, pricemin :s_pricemin, pricemax:s_pricemax, currency : s_kurs},
		success:function(response){
			$('#commercial-modal').html(response);			
			$('#commercial-modal').modal('show');
		}
	});
	
}

function resetPAPopup() {
    
    $.cookie("paCnt", null, {
        path: "/"
    })
}
