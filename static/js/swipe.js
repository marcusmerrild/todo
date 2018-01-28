// On before slide change
$('.event-carousel-container').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  console.log(nextSlide);
  $('input[name="carouselCount"]').val( nextSlide );
});