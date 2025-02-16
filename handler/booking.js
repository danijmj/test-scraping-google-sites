// Importing necessary modules and functions from other files
const { 
  Booking, 
} = require('../scraping/booking');
const { sendResponse } = require('../helper/http');
const { CONTENT_TYPE_JSON } = require('../constant/common');

// Handling GET requests to retrieve site information
const handleGet = async (req, res, parsedUrl) => {
// Check if the path is the google site
if (parsedUrl.path.startsWith("/booking")) {
  // Extract the site URL from either path or query parameters
  const urlID = parsedUrl.query.url || parseInt(parsedUrl.path.split('/').pop());
  console.log("parsedUrl.query.url", parsedUrl.query.url)
  // Get the comments by url
  const content = await new Booking().getCommentsFromUrl(urlID);

  if (content) {
    // If the site is found, send a response with the site details
    sendResponse(res, 200, CONTENT_TYPE_JSON, content);
  } else {
    // If the site is not found, send a 404 error response
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'data not found' });
  }
} else {
  // If the endpoint is not recognized, send a 404 error response
  sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
}
};


// Exporting the functions to be used in other parts of the application
module.exports = { handleGet };
