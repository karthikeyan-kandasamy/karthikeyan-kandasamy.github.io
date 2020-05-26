function identify(custom_user_id) {

  if (window.DatagranWebInterface) {
    // Call Android interface
    
    //alert("Android");
    window.DatagranWebInterface.identify(custom_user_id);
  } else if (window.webkit
      && window.webkit.messageHandlers) {
    // Call iOS interface
    
    alert("iOS");
    var message = { command: 'identify', userId: custom_user_id };
    window.webkit.messageHandlers.datagran.postMessage(message);
  } else {
    // Call Web interface
    
    alert("Web");
  }
}

function reset() {

  if (window.DatagranWebInterface) {
    // Call Android interface
    
    //alert("Android");
    window.DatagranWebInterface.reset();
  } else if (window.webkit
      && window.webkit.messageHandlers) {
    // Call iOS interface
    
    alert("iOS");
    var message = { command: 'reset' };
    window.webkit.messageHandlers.datagran.postMessage(message);
  } else {
    // Call Web interface
    
    alert("Web");
  }
}


function trackCustom(name, params) {

  if (window.DatagranWebInterface) {
    // Call Android interface
    
    //alert("Android");
    window.DatagranWebInterface.identify(name, JSON.stringify(params));
  } else if (window.webkit
      && window.webkit.messageHandlers) {
    // Call iOS interface
    
    //alert("iOS");
    var message = { command: 'trackCustom', name: name, parameters: params };
    window.webkit.messageHandlers.datagran.postMessage(message);
  } else {
  	// Call Web interface
  
    alert("Web");
  }
}

function updateGeoParam(addGeo) {

  if (window.DatagranWebInterface) {
    // Call Android interface
    
    //alert("Android");
    window.DatagranWebInterface.updateGeoParam(addGeo);
  } else if (window.webkit
      && window.webkit.messageHandlers) {
    // Call iOS interface
    
    //alert("iOS");
    var message = { command: 'updateGeoParam', addGeo: addGeo };
    window.webkit.messageHandlers.datagran.postMessage(message);
  } else {
  	// Call Web interface
  
    alert("Web");
  }
}

