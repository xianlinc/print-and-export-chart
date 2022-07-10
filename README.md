# test-recaptcha

We will use google recaptcha v3. pls read the documentation thoroughly. 

(https://developers.google.com/recaptcha/intro) especially for the followings. 

1. v2 and v3 Demo. https://recaptcha-demo.appspot.com/ (source:https://github.com/google/recaptcha/tree/php8-support/examples. "php8-support" is latest and current demo branch)
2. Different versions: https://developers.google.com/recaptcha/docs/versions
3. loading recaptcha api script (async/preload, etc) https://developers.google.com/recaptcha/docs/loading, 
4. client site integration. https://developers.google.com/recaptcha/docs/v3
5. backend integration. https://developers.google.com/recaptcha/docs/verify
We need to use API Management to call googl api from backend in Azure Environment since our VEEN compartment cannot access public internet directly.
