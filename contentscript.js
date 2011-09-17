// Send popup subrepo update information
function getGithubHash( request, sender, sendResponse ) {
	jQuery( "table.code.diff.notimage.modified" ).each(function( i, el ) {
		var jel = jQuery( el );
		var regex = /\.hgsubstate/;
		if ( regex.test( jel.find( "a" ).text() ) ) {
			var ghHash = jel.find ( ".added .ch" ).text();
			sendResponse({ ghHash: ghHash });
		}
	});
}

// Listen for the popup to request subrepo update information
chrome.extension.onRequest.addListener( getGithubHash );

// Notify the background page to show a leaf icon if there is a subrepo update
var regex = /\.hgsubstate/;
if ( regex.test( jQuery( "body" ).text() ) ) {
	chrome.extension.sendRequest({}, function( response ) {});
}

