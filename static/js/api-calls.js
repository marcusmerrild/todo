//var apiBaseUrl = 'https://todo-cph-api.herokuapp.com/poc/'
var apiBaseUrl = 'http://127.0.0.1:8000/poc/'


// is called when navigation to calender-page is initiated, and
// month picker is changed
function getCalendarDates(month) {
	if (typeof month === 'undefined') {
		month = 'month-three';
	}
	console.log(month);

	var jqxhr = $.getJSON(apiBaseUrl + "calendar-dates/?q=" + month, function () {
			console.log("success");
		})
		.done(function (data) {
			$("#datepicker-table-content tr").remove();
			var currentYear = data.current_year;
			var currentMonth = data.current_month;
			var combinedYearMonth = currentYear + currentMonth;

			$.each(data.calendar_dates, function (n, row) {
				$('#datepicker-table-content').append(
					'<tr style="text-align:center">' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[0] + '"><div id="div_' + combinedYearMonth + row[0] + '"><span>' + row[0] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[1] + '"><div id="div_' + combinedYearMonth + row[1] + '"><span>' + row[1] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[2] + '"><div id="div_' + combinedYearMonth + row[2] + '"><span>' + row[2] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[3] + '"><div id="div_' + combinedYearMonth + row[3] + '"><span>' + row[3] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[4] + '"><div id="div_' + combinedYearMonth + row[4] + '"><span>' + row[4] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[5] + '"><div id="div_' + combinedYearMonth + row[5] + '"><span>' + row[5] + '</span></div></td>' +
					'<td class="calendar-table-column" id="' + combinedYearMonth + row[6] + '"><div id="div_' + combinedYearMonth + row[6] + '"><span>' + row[6] + '</span></div></td>' +
					'</tr>');
			});
		})
		.fail(function () {
			console.log("error");
		});
}

function getCalendarMonths() {
	var jqxhr = $.getJSON(apiBaseUrl + "calendar-months/", function () {
			console.log("success");
		})
		.done(function (data) {
			$("#datepicker-table-header tr").remove();
			$('#datepicker-table-header').append(
				'<tr style="text-align:center">' +
				'<td id="month-one" class="datepicker-header">' + data.month_one + '</td>' +
				'<td id="month-two" class="datepicker-header">' + data.month_two + '</td>' +
				'<td id="month-three" class="datepicker-header">' + data.month_three + '</td>' +
				'<td id="month-four" class="datepicker-header">' + data.month_four + '</dt>' +
				'<td id="month-five" class="datepicker-header">' + data.month_five + '</dt>' +
				'</td>'
			);

			// initiates the month in the middel with white text
			$('#month-three').addClass("select-month");
		})
		.fail(function () {
			console.log("error");
		});
}

$("#calendar-page").on("click", "#btnFindEvents", function () {
		$.getJSON(apiBaseUrl + "event-preview/?q=" + "all", function () {
			console.log("success");
		})
		.done(function (data) {
			$.each(data, function (n, item) {
				$('.event-carousel-container').slick('slickAdd',
				'<div class="event-carousel-images" style="background-image: url(' + item.pict_src + ')">' + 
					'<div class="event-carousel-images-text">' +
						'<span style="font-size:4vh">' + item.name + '</span>' + 
						'<br>' +
						'<span style="font-size:3vh">' + item.short_desc + '</span>' +
						'<span style="font-size:3vh;float:right;">' + item.location + '</span>' +
					'</div>' +
				'</div>');
			});
			forwToPage('#event-page', '#calendar-page');
		})
		.fail(function () {
			console.log("error");
		});
	
	forwToPage('#event-page', '#calendar-page');
		$('.event-carousel-container').slick({
		arrows: false
	});
});


$(".modal-body").on("click", "#btnSignIn", function () {
	$.ajax({
		type: "POST",
		url: apiBaseUrl + 'login/',
		data: $('#frmSignIn').serialize(),
		success: function (response) {
			if (response['status'] == 0) {
				// to prevent CORS with cookies is this value past as a parameter, and saved locally
				$.cookie('sessionid', response['value'], {
					expires: response['exp_date']
				})
			}
		}
	}).done(function (response) {
		if (response['status'] == 0) {
		// hide elements regarding to not signed in
		$("#btnShowSignInModal").css('display', 'none');
		$("#txtWelcomeNotSignedIn").css('display', 'none');
		
		// show elements regarding to signed in
		$("#btnShowCategories").css('display', '');
		$( "#txtUserName" ).text( response['user'] );
		$("#txtWelcomeSignedIn").css('display', '');
		
		// close the modal
		$('#modalSignIn').modal('hide');
		
		} else if (response['status'] == 1) {
			$("#id_username").css('border-color', 'red');
			$("#id_password").css('border-color', 'red');
		};
		})

});


$(".modal-body").on("click", "#btnCreateUser", function () {
	$.ajax({
		type: "POST",
		url: apiBaseUrl + 'create-user/',
		data: $('#frmCreateUser').serialize(),
		success: function (response) {
			if (response['status_code'] == 0) {
				$('#modalCreateUser').modal('hide');
				$('#modalUserCreated').modal('show');
			} else if (response['status_code'] == 1) {
				console.log(response['error_messages']);
				$('#ErrorCreatingUser').find('p').remove()
				response['error_messages'].forEach(function(form_error) {
					$( "#ErrorCreatingUser" ).append( "<p>" + form_error + "</p>" );
				});
			};
		}
	}).done(function (response) {})
});