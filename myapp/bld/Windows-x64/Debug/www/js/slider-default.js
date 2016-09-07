$(function(){
	
	var currentValue = $('#currentValue');
	
	$('#defaultSlider').change(function(){
	    currentValue.html(this.value);
	});
	
	// Trigger the event on load, so
	// the value field is populated:
	
	$('#defaultSlider').change();
	
});