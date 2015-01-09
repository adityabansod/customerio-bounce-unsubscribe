var express = require('express'),
    bodyparser = require('body-parser'),
    request = require('request'),
    app = express(),
    port = process.env.PORT || 5000,
    cioSecret = process.env.CUSTOMER_IO_SECRET || '',
    cioSiteId = process.env.CUSTOMER_IO_SITE_ID || '';

// Set up Express
app.use(express.compress());
app.use(bodyparser.json({'limit': '10mb'}));
console.log('customer.io bounce unsubscriber starting on ' + port + '...');
console.log('running in ' + (cioSiteId == '' ? 'test' : 'production') + ' mode');
app.listen(port);

// POST route to handle customer.io webhook
app.post('/customer-io-webhook', function(req, res) {
    var userAgent = req.headers['user-agent'] || '';
    if(userAgent.indexOf('Customer.io') == -1 && cioSiteId != '') {
        res.send({'error': 'user agent not customer.io'});
        console.log('request wasnt from customer.io');
        return;
    }

    var cio = {
        eventType: req.body.event_type,
        customerId: req.body.data.customer_id,
        emailId: req.body.data.email_id,
        emailAddress: req.body.data.email_address
    };

    // console.log(cio.eventType + ' (' + cio.customerId + ')');
    if(cio.eventType == 'email_bounced') {
        console.log(cio.emailAddress + ' (' + cio.customerId + ') has bounced, unsubcribing');
        unsubscribe(cio.customerId);
    }
    res.send();
});

// helper function to unsubscribe a user
function unsubscribe(id) {
    var options = {
        url: 'https://track.customer.io/api/v1/customers/' + id,
        form: {'unsubscribed': 'true'},
        auth: {
            user: cioSiteId,
            pass: cioSecret
        }
    };

    request.put(options, function(err, httpResponse, body) {
        if(httpResponse.statusCode != 200) {
            console.log('errored when trying to unsubscribe ' + id, err);
        } else {
            console.log('succesfully unsubscribed ' + id);
        }
    });
}
