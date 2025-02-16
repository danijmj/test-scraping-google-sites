const { CONTENT_TYPE_JSON } = require('../constant/common');
const { 
  METHOD_GET, 
  METHOD_POST, 
  METHOD_PUT, 
  METHOD_DELETE 
} = require('../constant/http');
const { 
  handleGet
} = require('../handler/booking');
const { sendResponse } = require('../helper/http');

const handleBookingRoutes = (req, res, parsedUrl) => {
  if (req.method === METHOD_GET) {
    handleGet(req, res, parsedUrl);
  } else {
    sendResponse(res, 404, CONTENT_TYPE_JSON, { error: 'Method not allowed' });
  }
};

module.exports = { handleBookingRoutes };
