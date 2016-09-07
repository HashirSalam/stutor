

///////////////////////////////   
   function onAddTag(tag) {
      alert("ADD: " + tag);
    }
    function onRemoveTag(tag) {
      alert("Removed a tag: " + tag);
    }

    function onChangeTag(input,tag) {
      alert("Changed a tag: " + tag);
    }
	
	//For Name
$(function() {
	
		
	
		
		
		
		
		
        $('#editbtn').on('click', function() {
			
			$('#savebtn').toggle();
			$('#cancelbtn').toggle();
            //$(this).hide();
            $('#txtBoxValue').hide();
            $('#txtBox').show();
			
			//$("#cancelbtn").css("display","inline");
			
        });
    
        $('#txtBox').on('blur', function() {
            var that = $(this);
            $('#txtBoxValue').text(that.val()).show();
            that.hide();
			
			$('#savebtn').toggle();
			$('#cancelbtn').toggle();
        });
		

    });
////////////////////////////////////////////////////////////	

//For Summary
$(function() {
	
        $('#editbtn2').on('click', function() {
			
			$('#savebtn2').toggle();
			$('#cancelbtn2').toggle();
            //$(this).hide();
            $('#summaryBoxValue').hide();
            $('#summarybox').show();
			
			//$("#cancelbtn").css("display","inline");
			
        });
    
        $('#summarybox').on('blur', function() {
            var that = $(this);
            $('#summaryBoxValue').text(that.val()).show();
            that.hide();
			
			
			$('#savebtn2').toggle();
			$('#cancelbtn2').toggle();
        });
		
		
    });
////////////////////////////////////////////////////////////

//For Certifications
$(function() {
        $('#deletecert1').on('click', function() {
			 $(".cert1").html("");
        });
		
		$('#deletecert2').on('click', function() {
			 $(".cert2").html("");
        });
		
		$('#deletecert3').on('click', function() {
			 $(".cert3").html("");
        });
   
 /////////////////////////////////////////// Edit buttons
 
         $('#editcert1').on('click', function() {
     
			$(this).hide();//hide edit button
			$('#deletecert1').hide();//hide close button
			
			var value = $('.cert1').html();
			
			$('#newcert1').val(value);
			
			$('#newcert1').show();
            $('.cert1').hide();
            
			
        });
    
        $('#newcert1').on('blur', function() {
            var that = $(this);
            $('.cert1').text(that.val()).show();
            that.hide();
			$("#editcert1").show();//show edit button again
			$('#deletecert1').show();//show close button again
        });
		
		
		
		
		
		
		
   
    });
////////////////////////////////////////////////////////////

    $(function() {

      $('#tags_1').tagsInput({width:'auto'});
      $('#tags_2').tagsInput({
        width: 'auto',
        onChange: function(elem, elem_tags)
        {
          var languages = ['php','ruby','javascript'];
          $('.tag', elem_tags).each(function()
          {
            if($(this).text().search(new RegExp('\\b(' + languages.join('|') + ')\\b')) >= 0)
              $(this).css('background-color', 'yellow');
          });
        }
      });
      $('#tags_3').tagsInput({
        width: 'auto',

        //autocomplete_url:'test/fake_plaintext_endpoint.html' //jquery.autocomplete (not jquery ui)
        autocomplete_url:'test/fake_json_endpoint.html' // jquery ui autocomplete requires a json endpoint
      });


// Uncomment this line to see the callback functions in action
//			$('input.tags').tagsInput({onAddTag:onAddTag,onRemoveTag:onRemoveTag,onChange: onChangeTag});

// Uncomment this line to see an input with no interface for adding new tags.
//			$('input.tags').tagsInput({interactive:false});
    });