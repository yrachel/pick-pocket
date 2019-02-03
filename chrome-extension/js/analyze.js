var images = document.getElementsByTagName('img');

function postData(url, threshold, done){
	$.ajax({
		type: "POST",
   		url: "http://127.0.0.1:8080" + "/has_pocket",
   		data: {url: url, threshold: threshold},
   		success: function(response) {
    		console.log(response)
			// if (response=="false") {
			// 	let normalized_url = url.substring(url.indexOf("//"))
			// 	console.log("attempting to remove: "  + normalized_url)
			// 	$('img[src*="'+normalized_url+'"]').fadeOut("slow");
			// }
			done(response);
   		},
   		error: function(xhr){
   			console.log('Status Text: ' + xhr.statusText) //+ ' ' + xhr.responseText)
			done();
		}
	});
}

// for (var i = 0; i < images.length; i++){
// 	var img = images[i].src;
// 	setTimeout(function() {
// 		postData(img, 0.5);
// 	}, i*1000);
// }

// run the first one, with no delay
// pass callback which calls itself + 1
function scheduleNextPost(i, delay=0) {
	setTimeout(function() {
		console.log(images[i].src)
		if(images[i].src == '') {
			if (i+1 < images.length) {
				scheduleNextPost(i+1, delay=0);
			}
			return;
		}
		postData(images[i].src, 0.25, function(result){
			// find and remove the image
			if (result == "false") {
				$(images[i]).fadeOut("slow");
			}
			if (i+1 < images.length) {
				scheduleNextPost(i+1);
			}
		});
	}, delay);
}

scheduleNextPost(0, delay=0);
