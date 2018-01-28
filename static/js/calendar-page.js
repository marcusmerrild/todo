$("#datepicker-table-content").on("click", "td", function () {	
	if ((this.id).indexOf('-') == -1 ) {
		$("#div_" + this.id).toggleClass("select-date");
	}
});

$("#datepicker-table-header").on("click", "td", function () {
	$(".datepicker-header").removeClass("select-month");
	$("#" + this.id).addClass("select-month");
	getCalendarDates(this.id);
});
