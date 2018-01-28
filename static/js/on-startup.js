// function to detect userplatform - we assume that this app should only accesible on mobile devices
function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	// Windows Phone must come first because its UA also contains "Android"
	if (/windows phone/i.test(userAgent)) {
		return true;
	}

	if (/android/i.test(userAgent)) {
		return true;
	}

	// iOS detection from: http://stackoverflow.com/a/9039885/177710
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return true;
	}

	return false;
}


// standard JS function to fetch cookie
function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i]);
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

$(document).ready(function () {

	// get boolean, dertermining if it os a mobile device
	var mobileDevice = getMobileOperatingSystem();

	if (mobileDevice == false) {
		$("#container-pc").css('display', '');
		$('.carousel-pc').slick({
			arrows: false
		});
	} else {
		// resizes the image background, if the height/width ratio is wrong
		var imgWidth = $('body').width();
		var imgHeight = $('body').height();
		if (imgWidth / imgHeight < 0.5626) {
			$("#welcome-page").css('height', '100%');
		}
		$("#container").css('display', '');
	};

	// fetch session cookie
	var sessionid = getCookie('sessionid');

	// verify that the sessionid is valid, and get username
	$.ajax({
		type: "POST",
		xhrFields: {
			withCredentials: true
		},
		beforeSend: function (request) {
			request.setRequestHeader('sessionid', sessionid);
		},
		url: apiBaseUrl + 'welcome-check/',
		success: function (response) {
			if (response['status_code'] == 0) {
				//the user is signed in
				console.log(response['user']);
				$("#btnShowCategories").css('display', '');
				$("#txtWelcomeSignedIn").css('display', '');
				$("#txtUserName").text(response['user']);
			} else if (response['status_code'] == 1) {
				//the user is not signed in
				console.log('Sign in user');
				$("#btnShowSignInModal").css('display', '');
				$("#txtWelcomeNotSignedIn").css('display', '');
			}
		}
	});
});
