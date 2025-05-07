# Event-Management-System

Currently useable routes
/api/user/auth/register
endpoint take in these info:
username
email
password

use these exact words as the key name
---

/api/user/auth/login
endpoint take in these info:
email
password

use these exact words as the key name

endpoint return this info:
a json web token value

please store this token somewhere as it will be used to authenticate the user for further actions
read below on how to use the token for authentication
---
/api/user/auth/secret
in the fetch request, store the web token in a header named "Authorization" 
every endpoint will check the web token before proceeding to the next check

example code:
fetch('/api/user/auth/secret', {
  headers: {
    'Authorization': `${token}`, // Include the token in the Authorization header
  },
})

/api/imageupload
use this to test image uploading
endpoint take in these info:
email
password

use these exact words as the key name
image

check the server/uploads folder to see if the image has been uploaded