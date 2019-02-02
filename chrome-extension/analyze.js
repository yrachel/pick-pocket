var images = document.getElementsByTagName('img');
/*srcList = [];

for (var i = 0; i < images.length; i++){
	srcList.push(images[i].src);
}*/

function postData(url, threshold){
	$.ajax({
		type: "POST",
   		url: "/has_pocket",
   		data: {url: url, threshold: threshold},
   		success: function(response) {
    		window.alert(response)
   		},
   		error: function(xhr){
   			alert('Status Text: ' + xhr.statusText + ' ' + xhr.responseText)
   		}

	});
}

for (var i = 0; i < images.length; i++){
	postData(images[i].src, 0.5);
}
