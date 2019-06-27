# Consents Summary

[React](https://facebook.github.io/react) plugin for displaying Consents Summary. Each consent's details can be shown as Consent Receipt in human-readable JSON form. 

Quick Use
-----------------------

Download package using [npm](https://www.npmjs.com/):

    $ npm install --save @datafund/consents-viewer


<br/>Import package to your React app:
```javascript
import { ConsentsSummary } from 'consents-summary';
```

<br/>Prepare Consent Receipt data:
 ```javascript  
let tokenData = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdXJpc2RpY3Rpb24iOiJTSSIsImNvbnNlbnRSZWNlaXB0SUQiOiJmZDFlNWJkNy0xODJjLTQyNDctOTA2NC1mMTYzYWVhNTllYjEiLCJwdWJsaWNLZXkiOiItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxuTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRVZzL281K3VRYlRqTDNjaHluTDR3WGdVZzJSOVxucTlVVThJNW1Fb3ZVZjg2UVo3a09CSWpKd3FuekQxb21hZ2VFSFd3SGRCTzZCK2RGYWJtZFQ5UE94Zz09XG4tLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0iLCJpYXQiOjE1NjE1NTMyOTEsImV4cCI6MTU2MTU5NjQ5MSwiYXVkIjoiaHR0cHM6Ly9kYXRhZnVuZC5pbyIsImlzcyI6IkRhdGFmdW5kIiwic3ViIjoiQ29uc2VudCBSZWNlaXB0In0.MEYCIQCsF_1Z5gXruTD_8Lvqwj3Tl72bG70aDGJaVH3vgDONOwIhAP04LqN2z6J5iflFlMz9bYldSgx8MaVuUHNRKCW_YW0r" 
```
   
<br/>Include component with data parameter in render() method of your app:
 ```javascript  
<ConsentsSummary data={{tokenData}} />
```

## Props
- `data` (JWT token)
  
