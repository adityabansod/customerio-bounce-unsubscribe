var express = require('express'),
    bodyparser = require('body-parser')
    app = express(),
    port = process.env.PORT || 5000,
    cioSecret = process.env.CUSTOMER_IO_SECRET || '',
    cioSiteId = process.env.CUSTOMER_IO_SITE_ID || '';
app.use(express.compress());
app.use(bodyparser.json());
app.listen(port);
console.log('customer.io bounce unsubscriber starting on ' + port + '...');
console.log('running in ' + (cioSiteId == '' ? 'test' : 'production') + ' mode');


/* https://track.customer.io/api
Definition
PUT https://track.customer.io/api/v1/customers/{CUSTOMER_ID}

Example request
curl -i https://track.customer.io/api/v1/customers/5 \
   -X PUT \
   -u YOUR-SITE-ID-HERE:YOUR-SECRET-API-KEY-HERE \
   -d email=customer@example.com \
 -d name=Bob \
   -d plan=premium
   */
/*
    POST /my_webhook HTTP/1.1
    Accept: 
    User-Agent: Customer.io Web Hooks 1.0
    Content-Type: application/json
    Host: example.com
    Content-Length: 226
    {
      "event_type": "email_delivered",
      "event_id": "5b68360d2bf711479352",
      "timestamp": 1352005930,
      "data": {
        "customer_id": "568",
        "email_address": "customer@example.com",
        "email_id": "34",
        "subject": "Why haven't you visited lately?",
        "campaign_id": "33",
        "campaign_name": "Inactivity Teaser"
      }
    }

*/


app.post('/customer-io-webhook', function(req, res) {
    console.log(req.method + ' request: ' + req.url);
    var userAgent = req.headers['user-agent'] || '';
    if(userAgent.indexOf('Customer.io') == -1 && cioSiteId != '') {
        res.send({'error': 'user agent not customer.io'});
        console.log('request wasnt from customer.io');
        return;
    }

    var cio = {};
    cio.eventType = req.body.event_type;
    cio.customerId = req.body.data.customer_id;
    cio.emailId = req.body.data.email_id;
    cio.emailAddress = req.body.data.email_address;

    if(cio.eventType == 'email_bounced') {
        console.log(cio.emailAddress + ' has bounced, unsubcribing');
    }

    console.log(cio);
	res.send();
});

function

