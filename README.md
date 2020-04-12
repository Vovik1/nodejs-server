# NodeJS-Server

## Usefull URLs

### SignUp user with POST request

```
https://glacial-chamber-22605.herokuapp.com/api/signup
```
### SignIn user with POST request

```
https://glacial-chamber-22605.herokuapp.com/api/signin
```
Returned response is token

### Get all lectures
 ```
https://glacial-chamber-22605.herokuapp.com/api/lecture
```
### Post lecture
```
https://glacial-chamber-22605.herokuapp.com/api/lecture

example: async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
       'Access-Token': <token-after-sign-in>
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://glacial-chamber-22605.herokuapp.com/api/lecture', 
    {
        title: "Learning React 2",
        videoUrl: "rtsp://leart-react.com",
	    description: "Best way to learn is watch videos",
	    messages: "Some text here"
        }
    )
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });
```