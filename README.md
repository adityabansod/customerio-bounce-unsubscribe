# customerio-bounce-unsubscribe

Simple node.js application that hooks up to the Customer.io webhooks (http://customer.io/docs/webhooks.html) and listens for `email_bounced` notifications. 

Upon receiving an email bounce, it fires off an unsubscribe request to Customer.io for that user.

# Flow

1. Customer.io webhook calls this app (host it on your own Heroku instance)
2. For any calls that were an `email_bounced` event
3. Fire an HTTP PUT request to Customer.io to unsubscribe that user who bounced

# Set up

Grab the repo and deploy it to Heroku
```bash
$ git clone https://github.com/adityabansod/customerio-bounce-unsubscribe/
$ cd customerio-bounce-unsubscribe
$ heroku apps:create
$ heroku config:set CUSTOMER_IO_SITE_ID=xxx
$ heroku config:set CUSTOMER_IO_SECRET=yyy
$ git push heroku master
$ heroku apps:open
```

Then, set the Heroku URL (it'll be in your browser window) to the webhook in Customer.io: https://manage.customer.io/integration.

# Env Vars
* `CUSTOMER_IO_SITE_ID` -- the site id for your customer.io installation
* `CUSTOMER_IO_SECRET` -- your API key / secret
