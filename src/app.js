var step = 1; // visible frame
var targetStep = 1; // frame to animate to
var images = new Array; // stores all of the frames for quick access
var scrollPos; // scroll position of the window
var totalFrames = 99; // the number of images in the sequence of JPEG files

// reduce CPU consumption, improve performance and make this possible
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame    || 
		  window.oRequestAnimationFrame      || 
		  window.msRequestAnimationFrame     || 
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

(function animloop(){ // the smoothest animation loop possible
  requestAnimFrame(animloop);
  targetStep = Math.max( Math.round( getYOffset() / 30 ) , 1 ); // what frame to animate to
  
  // increment the step until we arrive at the target step
  if (targetStep != step) {
  	step += (targetStep - step) / 5; 
  }
  changeFrame();
})();

function changeFrame() {
	var thisStep = Math.round(step); // calculate the frame number
	if(images.length > 0 && images[thisStep]) { // if the image exists in the array
		if(images[thisStep].complete) { // if the image is downloaded and ready
			if($('#video').attr('src') != images[thisStep].src) { // save overhead...?
				$('#video').attr('src',images[thisStep].src); // change the source of our placeholder image
			}
		}
	}
}

// fit everything to the screen
function resizeAdjustments() {
	// increase the height of the document 30 pixels for every frame in the JPEG sequence
	$('html, body').css('height',(totalFrames*30)+'px');
	var image_width   = $('#video').css('width').replace('px','');
	var image_height  = $('#video').css('height').replace('px','');
	var height_ratio  = image_height / document.body.clientHeight;
	var width_ratio   = image_width / document.body.clientWidth;
	
	if (height_ratio < width_ratio) {
		// reposition the video image
		$('#video').css('top',0);
		// calculate the difference we need to accomodate for
		var difference = parseInt(image_width-document.body.clientWidth);
		$('#video').css('width','auto');
		// resize image to fill the height of the viewport
		$('#video').css('height','100%');
		
		if (document.body.clientWidth < image_width) {
			// reposition the video image from the left
			$('#video').css('left',(difference/2)*-1);
		} else {
			$('#video').css('left',0);
		}
	} else {
		$('#video').css('left',0);
		// calculate the difference we need to accomodate for
		var difference = parseInt(image_height-document.body.clientHeight);
		
		if (document.body.clientHeight<image_height) {
			// reposition the video image from the top
			$('#video').css('top',(difference/2)*-1);
		} else {
			$('#video').css('top',0);
		}
		// resize image to fill the width of the viewport
		$('#video').css('width','100%');
		$('#video').css('height','auto');
	}
}

// get distance scrolled from the top
function getYOffset() {
  var pageY;
	if(typeof(window.pageYOffset)=='number') {
		pageY=window.pageYOffset;
	} else {
		pageY=document.documentElement.scrollTop; // IE
	}
	return pageY;
}

// pad numbers with leading zeros for JPEG sequence file names
function pad(number, length) {
	var str = '' + number; 
	while (str.length < length) { 
		str = '0' + str; 
	} 
	return str;
}

$(window).scroll(function() {   
  if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
    document.getElementById('quoteSection').innerHTML = randomText;
    $("#quoteSection").addClass('visible');
  } else {
    $("#quoteSection").removeClass('visible');
    randomTextFunc();
  }
});

var randomText;
randomTextFunc()
  	  
function randomTextFunc() {
	if(typeof quotes != "undefined") {
  		randomText = quotes[Math.floor(Math.random()*(quotes.length))];
  } else if(typeof quotes === "undefined") {
		randomText = "Sorry, I was unable to load any quotes. Try refreshing the page.";
	}
}