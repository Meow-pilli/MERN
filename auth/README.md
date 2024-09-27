# Express OpenID Connect POC

This sample demonstrates authentication for an Express Node.js app. The sample quickly shows how to log in, log out, and view profile information of the logged-in user.


## Running This POC Locally

1. Install the dependencies with npm:

```bash
npm install
```


2. Create  `.env` and add the following values. 


- `CLIENT_ID` - your Auth0 application client id
- `ISSUER_BASE_URL` - absolute URL to your Auth0 application domain (ie: `https://accountName.auth0.com`)
- `SECRET` - a randomly rengerated string. You can generate one on the command line with the following `openssl rand -hex 32`
- `PORT` - your localhost port

3. Run the sample app:

```bash
npm start
```

The POC will be served at `localhost:3000`.



