const url = require('url');
const { sendResponse } = require('../helper/http');
const { handleGoogleSitesRoutes } = require('./googleSitesRoute');
const { handleBookingRoutes } = require('./bookingRoute');
const { CONTENT_TYPE_HTML, CONTENT_TYPE_JSON } = require('../constant/common');

const handleRequest = (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Delegate specific route handling to specialized modules
  console.log("dddddd",parsedUrl)
  console.log(parsedUrl.pathname, parsedUrl.pathname.startsWith('/booking'))
  if (parsedUrl.pathname == '/'){
    // Return HTML response for the home page
    sendResponse(res, 200, CONTENT_TYPE_HTML, `<b>Google Sites scraping (<a href = '/google-sites'>url (/google-sites?url)</a></b><br>Booking scraping (<a href = '/booking'>url (/booking?url)</a>`);
  }else if (parsedUrl.pathname.startsWith('/google-sites')) {
    handleGoogleSitesRoutes(req, res, parsedUrl);
  } else if (parsedUrl.pathname.startsWith('/booking')) {
    console.log("entrado")
    handleBookingRoutes(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Endpoint not found' });
  }
};

module.exports = { handleRequest };
