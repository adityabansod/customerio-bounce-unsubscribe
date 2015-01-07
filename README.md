# customerio-bounce-unsubscribe

Simple node.js application that hooks up to the Customer.io webhooks (http://customer.io/docs/webhooks.html) and listens for `email_bounced` notifications. 

Upon receiving an email bounce, it fires off an unsubscribe request to Customer.io for that user. 

# Env Vars
* `CUSTOMER_IO_SITE_ID` -- the site id for your customer.io installation
* `CUSTOMER_IO_SECRET` -- your API key / secret
