var inpF, hist;
var inpFdefault = "Enter your text here.";

window.onload = setup;

function getResponse(){
  // Pushing prompt to the history
  var prompt = inpF.value;
  if (prompt === inpFdefault || prompt === "")
    return; // show warning message?
  hist = document.getElementById("history");
  hist.innerHTML = `<div class="history user">${prompt}</div>`;
  inpF.value = "";
  console.log([inpF.value]);
  console.log(prompt);

  // Sending stuff to server (for now, no server)
  var nlgResponse = "temp";

  var toSend;
  toSend = $.trim(prompt).replace(/\n/g,"|||");
  toSend += '|';
  if(document.getElementById('fileid').value=="atomic"){
    toSend += getDimAtomic() + '|' + getSampling();

  }
  else{
    toSend += getDimConceptNet() + '|' + getSampling();
  }
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

function getDimConceptNet(){
  var retval = "";
  if (document.getElementById("AtLocation").checked){
    retval += "AtLocation,";
  }

  if (document.getElementById("CapableOf").checked){
    retval += "CapableOf,";
  }
  if (document.getElementById("Causes").checked){
    retval += "Causes,";
  }
  if (document.getElementById("CausesDesire").checked){
    retval += "CausesDesire,";
  }
  if (document.getElementById("CreatedBy").checked){
    retval += "CreatedBy,";
  }
  if (document.getElementById("DefinedAs").checked){
    retval += "DefinedAs,";
  }
  if (document.getElementById("Desires").checked){
    retval += "Desires,";
  }
  if (document.getElementById("HasA").checked){
    retval += "HasA,";
  }
  if (document.getElementById("HasFirstSubevent").checked){
    retval += "HasFirstSubevent,";
  }

  if (document.getElementById("HasLastSubevent").checked){
    retval += "HasLastSubevent,";
  }
  if (document.getElementById("HasPrerequisite").checked){
    retval += "HasPrerequisite,";
  }
  if (document.getElementById("HasProperty").checked){
    retval += "HasProperty,";
  }
  if (document.getElementById("HasSubevent").checked){
    retval += "HasSubevent,";
  }
  if (document.getElementById("IsA").checked){
    retval += "IsA,";
  }
  if (document.getElementById("MadeOf").checked){
    retval += "MadeOf,";
  }
  if (document.getElementById("MotivatedByGoal").checked){
    retval += "MotivatedByGoal,";
  }
  if (document.getElementById("PartOf").checked){
    retval += "PartOf,";
  }
  if (document.getElementById("ReceivesAction").checked){
    retval += "ReceivesAction,";
  }
  if (document.getElementById("SymbolOf").checked){
    retval += "SymbolOf,";
  }
  if (document.getElementById("UsedFor").checked){
    retval += "UsedFor,";
  }

  if (document.getElementById("all").checked){
    retval = "all";
  }
  return retval.slice(0, -1);
}

function getDimAtomic(){
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
  if (document.getElementById("xattr").checked){
    retval += "xAttr,";
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
  if (document.getElementById("all").checked){
    retval = "all";
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