function getStatusCode(url) {
  var url_trimmed = url.trim();
  // Check if script cache has a cached status code for the given url
  var cache = CacheService.getScriptCache();
  var result = cache.get(url_trimmed);
  
  // If value is not in cache/or cache is expired fetch a new request to the url
  if (!result) {

    var options = {
      'muteHttpExceptions': true,
      'followRedirects': false
    };
    var response = UrlFetchApp.fetch(url_trimmed, options);
    var responseCode = response.getResponseCode();

    // Store the response code for the url in script cache for subsequent retrievals
    cache.put(url_trimmed, responseCode, 21600); // cache maximum storage duration is 6 hours
    result = responseCode;
  }

  return result;
}
