var gaCategory = 'v5/Top Nav Menu + Search Form - ' + lang.toUpperCase();
var gaAction = 'Search - Button';
var gaLabel;
var search_request_type = 'area';

$(document).ready(function() {
	$(".select-pretty select").change(function(){
		$(this).parent().find(".select-label").text( $(this).find("option:selected").text() );
	});

	$('.dropdown-menu .expanded-menu, .dropdown-menu input, form#login-Form > .checkbox, .select-pretty select').click(function(event) {
		event.stopPropagation();
	});

	$('.menu-btn').click(function(){
		$('#bottom-bar').toggleClass('hide-mobile');
	});

	$('.topbarmenu-btn').click(function(){
		$('#top-bar').toggleClass('hide-mobile');
	});

	$(".primary-search-form .select-pretty").change(function(){
        if ($(this).find("option:selected").val() != 'perumahan-baru')
            $(this).parent().find(".select-label").text( $(this).find("option:selected").text().substr(0,8) );
        else
            $(this).parent().find(".select-label").text( $(this).find("option:selected").text().substr(0,6) );   
	});

	$(".lang-wrapper .select-pretty").change(function(){
		$(this).parent().find(".select-label").html( '<i class="fa fa-globe"></i>' + $(this).find("option:selected").text() );
	});

	$(window).on('beforeunload', function(){
        $('#filter-category').val(catAds);
    });

    $(".primary-search-form #keyword").on('keypress', function (e) {
        search_request_type = 'keyword_area';
    });

	$('#filter-search').click(function(e) {
        gaCategory = 'v5/Top Nav Menu + Search Form - ' + lang.toUpperCase();
        gaAction = 'Search Button';
        gaLabel = '';    
	    searchFilter();
	    e.preventDefault();
	});
    
    $('#frmTopFilter').on('submit', function(e){
        e.preventDefault();
        gaCategory = 'v5/Top Nav Menu + Search Form - ' + lang.toUpperCase();
        gaAction = 'Search Button';
        gaLabel = '';    
	    searchFilter();
    });
    
});

function searchFilter() 
{
	var params = {};
    
        // gatracking
        nonInteractiveTracking(gaCategory, gaAction, gaLabel);    

	var category = $('#filter-category').sanitize();
	var keyword = $('.primary-search-form #keyword').sanitize();
	var idtype = keyword.substring(0,3);
	var idnumber = parseInt(keyword.substring(3,keyword.length));	

	if((jQuery.inArray(idtype, ["hos","hor","aps","apr","cos","cor","shs","shr","css","csr","fas","far","was","war","las","lar", "npr", "nps"])>=0) && idnumber>0){
        $.ajax({
            url: baseUrl+"/ajax/idsearch/"+lang,
            dataType: "jsonp",
            data: {
                featureClass: "P",
                style: "full",
                maxRows: 1,
                name_startsWith: keyword
            },
            success: function( data ) {
                if(data.ids.length>0){
                    $.map( data.ids, function( item ){
                        setTimeout(function(){ location.href=baseUrl+'/'+item.url; }, 300);
                        return false;
                    });
                }else{
                    var searchIdMessage = lang=='en'?'Listing ID not found':'Listing ID tidak ditemukan';
                    alert(searchIdMessage);                         
                }
            }
        });
        return false;
    }

    var type = typeAds.toLowerCase();
    console.log(category);
    if (category != 'perumahanbaru') {
	    if(jQuery.inArray(type, ["apartemen","apartment"])>=0) type='apartemen'; 
	    else if(jQuery.inArray(type, ["ruko","shophouse"])>=0) type='ruko';         
	    else if(jQuery.inArray(type, ["ruangusaha","commercial-space"])>=0) type='ruangusaha';
	    else if(jQuery.inArray(type, ["pabrik","factory"])>=0) type='pabrik';
	    else if(jQuery.inArray(type, ["kantor","office-space"])>=0) type='kantor';
	    else if(jQuery.inArray(type, ["gudang","warehouse"])>=0) type='gudang';
	    //else if(jQuery.inArray(type, ["new-properties","perumahan-baru","perumahanbaru"])>=0) { type='perumahan-baru/perumahan-baru'; category=''; } 
	    else if(jQuery.inArray(type, ["serviced-apartment"])>=0) { type='listing-serviced-apartment'; category=''; }
	    else if(jQuery.inArray(type, ["holiday-villa","villa"])>=0) { type='listing-villa'; category='';}
	    else if(jQuery.inArray(type, ["building-directory","direktori-properti"])>=0) { type='direktori-properti-residensial'; category=''; }
	    else if(jQuery.inArray(type, ["overseas","luar-negeri"])>=0) { type='luar-negeri'; category=''; } 
	    else if(jQuery.inArray(type, ["commercial","komersial"])>=0){ type='komersial';}
	    else if(jQuery.inArray(type, ["land","tanah"])>=0) type='tanah';
	    else type='rumah';
	} else {
		type='perumahan-baru/perumahan-baru';
		category='';
	}
	console.log(type);
	console.log(category);
    if(jQuery.inArray(type, ["apartemen","apartment","ruko","shophouse","tanah","land","rumah","house","commercial",
        "komersial","gudang","factory","pabrik","warehouse","perkantoran","kantor","office","office-space","commercial-space","ruangusaha"])>=0){     
        if ($('.primary-search-form #keyword').val().length){
            keywords = $('.primary-search-form #keyword').val().split("; ");
            if(search_request_type == 'keyword_area'){
                params.keyword_area = addslashes($('.primary-search-form #keyword').val());
            }else{
                params.area = addslashes($('.primary-search-form #keyword').val());
            }
            
        }

        if (jQuery.inArray(typeAds.toLowerCase(), ["warehouse", "gudang"])>=0){
            params.commercialtype = 'wa';
        }
        else if (jQuery.inArray(typeAds.toLowerCase(), ["factory", "pabrik"])>=0){
            params.commercialtype = 'fa';
        }
        else if (jQuery.inArray(typeAds.toLowerCase(), ["office-space", "perkantoran"])>=0){
            params.commercialtype = 'of';
        }
        else if (jQuery.inArray(typeAds.toLowerCase(), ["commercial-space", "ruang-usaha"])>=0){
            params.commercialtype = 'cs';
        }
        query = $.param(params);
        query = (query.length) ? query : '';

        searchUrl=(lang==='en'?'en/':'')+'search?type='+type+'&category='+category+'&'+query;
    } else {
    	if (type=='perumahan-baru/perumahan-baru' || type=='direktori-properti-residensial') {
            keyword = (keyword.length>0)?$('.primary-search-form #keyword').val().split(";",1):''
            searchUrl = (type+((category.length>0 || category.length>0)?'-'+category:'')+((keyword.length>0)?'-di':'')+(keyword.length>0?'-'+slug(keyword[0]).replace('--',''):'')+'-'+lang+'.html');    
        } else {
            keyword = (keyword.length>0)?$('.primary-search-form #keyword').val().split(";",1):'';
            searchUrl = (type+((category.length>0 || category.length>0)?'-'+category:'')+((keyword.length>0)?'-di':'')+(keyword.length>0?'-'+slug(keyword).replace('--',''):('-all'))+'-'+lang+'.html');
        }
    }

	if (category == 'newproperties') {
        var search_param = "";
        if($(".primary-search-form #keyword ").val().length>0){               
            search_param = $(".primary-search-form #keyword ").val().split(",");
            search_param = search_param[0].replace(";", "");
            searchUrl = "perumahan-baru/perumahan-baru-di-"+search_param.toLowerCase()+"-"+lang+".html";    
        }
        if ($(".primary-search-form #keyword ").val().length<=0) {
            searchUrl = "perumahan-baru/perumahan-baru-di-indonesia-"+lang+".html";
        }
    }

    document.location = baseUrl+'/'+searchUrl;

    return false;
}
