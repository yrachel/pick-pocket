var images = document.getElementsByTagName('img');

function postData(url, threshold){
	$.ajax({
		type: "POST",
   		url: "/has_pocket",
   		data: {url: url, threshold: threshold},
   		success: function(response) {
    		window.alert(response)
			if (response=="false") {
				$('img[src="'+url+'"]').hide();
			}
   		},
   		error: function(xhr){
   			alert('Status Text: ' + xhr.statusText + ' ' + xhr.responseText)
   		}
	});
}

for (var i = 0; i < images.length; i++){
	postData(images[i].src, 0.5);
}
