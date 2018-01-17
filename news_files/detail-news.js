$(function() {

    $("#text-berita").keypress(function(event){
        $('#link_berita').val('');
    });
    
    $("#text-berita").keydown(function(event){
        $('#link_berita').val('');
    });
    
    $("#text-berita").autocomplete({
        source: "/find-news",
        minLength: 1,
        select: function( event, ui ) {
			var isi = ui.item.link_berita;
			
            if (isi.substring(0,1) == "/") {
				$('#link_berita').val(ui.item.link_berita);

			} else {
				$('#link_berita').val("/"+ui.item.link_berita); 
			}
        }
    });
    
    $('#text-berita').keypress(function (e) {
        if (e.which == 13) {
            $('#cari-berita').click();
            return false;
        }
    });
    
    $("#cari-berita").click(function(event){
        event.preventDefault();

        var linkberita = $('#link_berita').val();
        
        if (linkberita != '') {
            window.location.replace(linkberita);

        } else {
            var keyword = $('#text-berita').val();
            
            if (keyword!='') {
                textKey = '?keyword='+keyword;

            } else {
                textKey = ''; 
            }

            window.location.replace('/search'+textKey);
        }
    });

});

$(window).load(function() {
    $("img.lazy").lazyload({
      effect: "fadeIn"
    });
});