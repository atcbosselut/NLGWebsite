var inpF, hist;
var inpFdefault = "Enter your text here.";

window.onload = setup;

function getResponse(){
  // Pushing prompt to the history
  var prompt = inpF.value;
  if (prompt === inpFdefault || prompt === "")
    return; // show warning message?
  hist = document.getElementById("history");
  hist.innerHTML += `<div class="history user">${prompt}</div>`;
  inpF.value = "";
  console.log([inpF.value]);
  console.log(prompt);

  // Sending stuff to server (for now, no server)
  var nlgResponse = "SWABHA's MY FAVORITE NLPer!";

  var toSend;
  toSend = $.trim(prompt).replace(/\n/g,"|||");
  toSend += '|';

  toSend += getDim() + '|' + getSampling();
  console.log(toSend);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
  	if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
      console.log(xmlHttp.responseText);
      nlgResponse = xmlHttp.responseText;
      hist.innerHTML = `<div class="history nlg">${nlgResponse}</div>`;
      checkboxes(document.getElementById("enableDialogue"));
      checkboxes(document.getElementById("separateTalkTurns"));
    }
  }
  xmlHttp.open("POST", window.location.href+"?inputText="+toSend, true);
  xmlHttp.send();
}


function getSampling(){
  var retval = "";

  if (document.getElementById("g").checked){
    return "g";
  }
  else if (document.getElementById("b5").checked){
    return "b5";
  }
  else {
    return "b10";
  }
}

function getDim(){
  var retval = "";

  if (document.getElementById("xintent").checked){
    retval += "xIntent,";
  }

  if (document.getElementById("xreact").checked){
    retval += "xReact,";
  }
  if (document.getElementById("oreact").checked){
    retval += "oReact,";
  }
  if (document.getElementById("xattrib").checked){
    retval += "xAttrib,";
  }
  if (document.getElementById("xeffect").checked){
    retval += "xEffect,";
  }
  if (document.getElementById("oeffect").checked){
    retval += "oEffect,";
  }
  if (document.getElementById("xneed").checked){
    retval += "xNeed,";
  }
  if (document.getElementById("xwant").checked){
    retval += "xWant,";
  }
  if (document.getElementById("owant").checked){
    retval += "oWant,";
  }
  return retval.slice(0, -1);
}

function checkboxes(cb){
	if (cb.id === "enableDialogue"){
		if (cb.checked)
			$(".nlg").addClass("dialogue")
		else
			$(".nlg").removeClass("dialogue")
	} else if (cb.id === "separateTalkTurns" ){
		if (cb.checked)
			$(".removable").show();
		else
			$(".removable").hide();
	}
}

function setup(){
  /*Input field aesthetics*/
  inpF = document.getElementById("inputfield");
  inpF.onfocus = function(){
    if(inpF.value === inpFdefault){
      inpF.style = "color: black;font-style: normal";
      inpF.value = "";
    }
  };
  inpF.onblur = function(){
    if (inpF.value === ""){
      inpF.style = "color: grey;font-style: italic;";
      inpF.value = inpFdefault;
    }
  };
  inpF.onkeyup = function(e){
    if (e.keyCode === 13 && !e.shiftKey){
      getResponse();
    }
  };
}