function backToPage(nextPage, currentPage) {
	$(nextPage).css('display', '');
	// get only page name without class and id specifyer
	$(nextPage).css('left', '-100%');

	$(nextPage).animate({
		left: '0%'
	}, 250, function () {
		$(currentPage).css('display', 'none');
	});
}

function forwToPage(nextPage, currentPage) {
	$(nextPage).css('display', '');

	$(nextPage).css('left', '0%')

	$(currentPage).animate({
		left: '-100%'
	}, 250, function () {
		$(currentPage).css('display', 'none');
	});
}

// go from Category back to Welcome
$('#back-welcome-category').click(function () {
	backToPage('#welcome-page', '#category-page');
	return false;
});

// go from Category back to event-page
$('#back-calendar-event').click(function () {
	backToPage('#calendar-page', '#event-page');
	return false;
});

// go from Calender back to Category
$('#back-category-calender').click(function () {
	backToPage('#category-page', '#calendar-page');
	return false;
});

$('.select-category').click(function () {
	var chosenCategory = this.id;
	getCalendarMonths();
	getCalendarDates();
	forwToPage('#calendar-page', '#category-page');
	return false;
});


$('#btnShowCategories').click(function () {
	var imgWidth = $( "#welcome-page"  ).width();
	var imgHeight = (imgWidth/375) * 205;
	$( ".image-container" ).css('height', imgHeight);
	forwToPage('#category-page', '#welcome-page');
	return false;
});
