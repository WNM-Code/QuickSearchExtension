var searches = {"google":"https://www.google.com/search?q=",
                "duck":"https://duckduckgo.com/?q=",
                "bing":"https://www.bing.com/search?q="};

var alteration = {"&": "%26",
                  "?": "%3F",
                  "%": "%25",
                  "=": "%3D",
                  " ": "+"};

var default_search = "duck";

document.addEventListener("keydown", function(e) {
  // Help came from https://stackoverflow.com/a/14562869/6897392
   if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
     text = getSelectionText();
     if(text != ""){
        e.stopImmediatePropagation();
        e.preventDefault();
        getSearch();
        doSearch();
      }
    }
   }, false);

function getSelectionText() {
  // Help came from https://stackoverflow.com/a/5379408/6897392
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    text = text.replace(/&/g, alteration["&"]);
    text = text.replace(/\?/g, alteration["?"]);
    text = text.replace(/%/g, alteration["%"]);
    text = text.replace(/=/g, alteration["="]);
    text = text.replace(/ /g, alteration[" "]);
    return text;
}

function openInNewTab(url) {
  // Help came from https://stackoverflow.com/a/11384018/6897392
  var win = window.open(url, '_blank');
  win.focus();
  return false;
}

function getSearch(){

  function setCurrentSearch(result) {
    default_search = result.search_type || "google";
  }

  function onGetError(error) {
    console.log(`Error: ${error}`);
  }

  var searchPromise = browser.storage.sync.get("search_type");
  searchPromise.then(setCurrentSearch, onGetError);
}

function doSearch(){
  // Help came from https://stackoverflow.com/a/53144549/6897392
    setTimeout(() => {
      console.log(default_search + text);
      openInNewTab(searches[default_search]+text);
    }, 50);
}
