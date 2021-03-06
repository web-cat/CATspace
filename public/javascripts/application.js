// Place your application-specific JavaScript functions and classes here
//FBJS Animation stuff... 
//http://wiki.developers.facebook.com/index.php/FBJS/Animation
  function obscureDiv(div_id){
    return obscure(Animation(document.getElementById(div_id)));      
  }
  
  function obscure(animation){
     return animation.to('height', '0px').to('opacity', 0).hide();
  }

  function obscureSlow(animation){
     return animation.duration(4000).checkpoint().to('opacity', 100).to('opacity', 0).hide();
  }
  
  function revealDiv(div_id){
    return  reveal(Animation(document.getElementById(div_id)));
  }
  
  function reveal(animation){
    return animation.to('height', 'auto').from('0px').to('opacity', 1).from(0).blind().show()
  }
  
  function highlightDiv(div_id){
    return  highlight(Animation(document.getElementById(div_id)));
  }

  function highlight(animation){
    return animation.to('background', '#F5EE7E').duration(1000).checkpoint().to('background', '#FAFBCC');
  }
  
  function returnToNormal(animation){
    return animation.to('background', '#FFFFFF').duration(2000).checkpoint().to('background', '#FFFFFF');
  }
 
 // Replace FBML 
  function updateDiv(div_id, data){
    $(div_id).setInnerFBML(data); 
  }
  
function flipVisibility(div_id) {
	if (document.getElementById(div_id).getStyle('display') == "block") {
		document.getElementById(div_id).setStyle('display','none');
	} else {
		document.getElementById(div_id).setStyle('display','block');
	}
}

//For in-place editing
function flashObj(obj) {    
            obj.setStyle('background-color', "#EFFFDF");
			obj.setStyle('border', "1px solid #0ACA22");
			// obj.setStyle('padding', "3px");
        }

function unFlashObj(obj) {    
            obj.setStyle('background-color', "#FFFFFF");
			obj.setStyle('border', "1px solid #FFFFFF");
			// obj.setStyle('padding', "none");
        }
  
  //Ajax form submit with a confirmation dialog
  // http://wiki.developers.facebook.com/index.php/FBJS/Examples/Ajax
  
   // BEGIN ajax_submit_form
   function submitForm(varForm, url, div_id){ 
    try {
		//Grab the user ID from the FORM
		user = varForm.serialize().user;
		uid = parseInt(varForm.serialize().user);
		if( uid == undefined || uid == 0 || isNaN(uid) || user.length == 0) throw RangeError;
        // $(div_id).setInnerFBML("Loading..."); 
		
		var ajax = new Ajax();
        ajax.responseType = Ajax.FBML; 
        ajax.ondone = function(data) { 
		  // Replace FBML 
          $(div_id).setInnerFBML(data); 
          //Animate the updated div.
          returnToNormal(highlight(div_id).checkpoint()).go();
        }; 
        ajax.post(url, varForm.serialize()); 
      }  
    catch(err) {
      new Dialog().showMessage("Error","Something weird happened. Sorry. This is an Alpha: "+ err);
    }            
    return false;
  } 
  // END ajax_submit_form
  
  function ajaxCall(vars, url, div_id){ 
   try {
	var ajax = new Ajax();
       ajax.responseType = Ajax.FBML; 
       ajax.ondone = function(data) { 
	  // Replace FBML 
         $(div_id).setInnerFBML(data); 
         //Animate the updated div.
         returnToNormal(highlightDiv(div_id).checkpoint()).go();
       }; 
       ajax.post(url, vars); 
     }  
   catch(err) {
     new Dialog().showMessage("Error","Something weird happened. Sorry. This is an Alpha: "+ err);
   }            
   return false;
 } 

  function ajaxUpdateField(id, field, value, url){ 
   try {
	var ajax = new Ajax();
       ajax.responseType = Ajax.FBML; 
       ajax.ondone = function(data) { 

		// Replace FBML 
		//TODO: Handle error in data -> this might mean change controller to send a 404 or 503
		$(field+"_field").setInnerFBML(data); 

		//hide the other divs
		document.getElementById(field+'_field').setStyle("display","block");
		document.getElementById(field+'_editing_section').setStyle("display","none");		
		document.getElementById(field+'_saving_section').setStyle("display","none");		

		
		//Animate the updated div.
		//returnToNormal(highlightDiv(field+'_field').checkpoint()).go();
		 
       }; 
       ajax.post(url, "id="+id+"&name="+field+"&value="+value); 
     }  
   catch(err) {
     new Dialog().showMessage("Error","Something weird happened. Sorry. This is an Alpha: "+ err);
   }            
   return false;
 }

  function fadeAway(id) {
	obscureSlow(highlightDiv(id).checkpoint()).go();
	//animation(document.getElementById(id)).duration(2000).checkpoint().to('height', '0px').to('opacity', 0).hide().go();
  }


  function ajaxDeleteItem(id, url, div_id){ 
   try {
		//Confirmation Dialog sends request on Confirm    
	   dlg = new Dialog(); 
	   dlg.showChoice("Confirm Delete", "Are you sure you want to delete this item?", "Yes", "No"); 
	   dlg.onconfirm = function() { 
			//obscure(highlightDiv(div_id).checkpoint()).go();
			var ajax = new Ajax();
       		ajax.responseType = Ajax.FBML; 
       		ajax.ondone = function(data) {  
         		//Delete the div.
				obscure(highlightDiv(div_id).checkpoint()).go();
       		}; 
       		ajax.post(url, "id="+id); 
		}
	}  
   catch(err) {
     new Dialog().showMessage("Error","Something weird happened. Sorry. This is an Alpha: "+ err);
   }            
   return false;
 } 

  function ajaxDeleteFile(id, url, div_id, path){ 
   try {
		//Confirmation Dialog sends request on Confirm    
	   dlg = new Dialog(); 
	   dlg.showChoice("Confirm Delete", "Are you sure you want to delete this file?", "Yes", "No"); 
	   dlg.onconfirm = function() { 
			// obscure(highlightDiv(div_id).checkpoint()).go();
			var ajax = new Ajax();
       		ajax.responseType = Ajax.FBML; 
       		ajax.ondone = function(data) {  
         		// Delete the div.
				obscure(highlightDiv(div_id).checkpoint()).go();
       		}; 
       		ajax.post(url, "path="+path); 
		}
	}  
   catch(err) {
     new Dialog().showMessage("Error","Something weird happened. Sorry. This is an Alpha: "+ err);
   }            
   return false;
 } 
