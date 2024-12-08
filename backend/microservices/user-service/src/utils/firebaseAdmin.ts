import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();
  
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "buildr-ffca2",
        "private_key_id": "0074ae1942a5d09c0480cc35f0dc11378ddd503c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDKq7o+dirn5wO2\nXHTyjfyBP79tUksYT7IgyWlO8e7j1vmgARt7945dHuY8s7taNxx3jVX5JmTwari6\nXnPtVcUQbLSd1+68oLW/MdO0PZTTGZdkR/4kzPpz2pkkvfRg2pH2o0oHpmkjmkM+\nDuTwmKHMe33XkABRxVPevyt4RMglh0E1twwLtwEHDM5KLG2WnXBMx6QYzZ/oxkF+\npKcY31C2iZZSGd5Rrzx92IDCAnxzZnsALUAvwFaJ94DhnDB/5OmSPlLLuc038unS\nWVodUqUNn4VsH3CYb2lkmV+Oja7/iUqosP28IwEGoQJLRggYqcJXfDCTWq+rp2LY\nj7J9DrfLAgMBAAECggEAAyZREihu+USnU52zOZPIUU/mzzGgtiOC7qyCpPXwkvzj\nyz9JKI+L2FmjFV1rs3a4zAjXxbP5jJzz+v19yrnzApLV6cAR1z+eI3cIRbxRREiZ\nCDdwNS00VTmX+LC1DA5Jh245N843wxRiKCQ+HZkZpp5iscdsodixuXv6FnfnLmIZ\nJlTmRreyxP+QuZK96PEAd2DDlotbJY+yrxYNbAw2swohikCC++FYaE21Rg8tyhjd\n9MwgCGwUorV9nUNism0MvaBmjGU3BDC7B9tNTHJfyYy0PEcNomWdkdf3eUqJT3Lw\n4D7Wiyj/meM6busWLd6DWXNtIAui4JI0Ia/KoA7aGQKBgQDlk02Cpx0lL/elnOfk\ndW+8r4KYsPPANvtIX/J89A20AvHihAiJQmsqal/zAf4+AdcWSD2++zgUprbR3ihN\nxMP1RH6BIBRehlpFHhWgKbtFWHS7XJO5FFYJQd9UBv3Rq87MXf2TG7tTbdWhdBcA\nuPNORVkFV3GI6EOaTeRF7QE/IwKBgQDh/6aWbwnWo1iXHD9C9PaNsNEuRAw4sXRy\nc1ds2iI7vhD1b8xnLxrG4o3mKHblxflzITsT+1JUCa1v3F4nZZuSO53XwRIJrMIv\nrcWCd2GGr6O+IFBLcrFzX8uveHp5a0rP7wer+mCzR+cSYeyFsDjZX7w40GSVbkmX\njlViS5DDOQKBgG4CA+ZThdfIAHdPlJ8Y1w4nXAEm6eZ1cjvgHiZaHCbiMl5EvoJn\nXUrZ5lhf4CB+aT64Jz5Yyyq6KGiwd8esPepNhAEECj6xSphMLjitRpuYI3eUiQTr\nBb8x3X46S24pUdMERvozE7SKsQ/IvS0PcydSe7HfkPv1sE9Ee9o2E57ZAoGADGy0\nqOKT5OP4E96ur6yt/V4yMdv13AwNfdlPfiGD7krlvciWsTmKvFJqQLQKzVkT/Ltf\n9xpDDXG2wkaYOoxAgEqcw+bOag/AYUSpbiHID9KKKwK1x2AX12L13MC/4vr+Eu5u\nOos6U8DpOD5/9V2Z0oGL5Ie4b+qvSxC9KvlCjSkCgYBb1w0WOYTTOc2vUgMjJeVc\nIpLsvan9vAwMAA+9em9jH+XI2Vmbpusp3ALq+OTTHEcfmGiAa+pTh90KJTZrYFfU\n8sg3/egwCv+oF+ECmpD9PErb52nFKI6aIhget3Td7b+5V/+2cRQVFyB6EQ4gZ2gu\nZNyCsLLpVneFR0KnKEyEKA==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-mpo2o@buildr-ffca2.iam.gserviceaccount.com",
        "client_id": "106117575880768010597",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mpo2o%40buildr-ffca2.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
      }
      ),
    storageBucket: 'gs://buildr-ffca2.appspot.com' 
  });
  
  const bucket = admin.storage().bucket();

  export default bucket;
