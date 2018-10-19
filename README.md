# express-middleware-condition

`unless(middleware, options)`

* **middleware** Middleware to skip
* **options** Conditions to test
    * **[paths]** Can be an array of string, an array of object or a string
    * **[extensions]** Can be a string or an array of string


## Paths ##
Allow to filter on originalUrl and methods
* **path** Can be an object or a string
    * **urls** Can be a string or an array of string
    * **[methods]** Can be a string or an array of string

```javascript
{ paths: '/foo' }
{ paths: ['/foo', '/bar'] }
{ paths: [{ urls: '/foo', method: 'GET' }] }
{ paths: [{ urls: ['/foo', '/bar'], method: ['GET', 'PUT'] }] }
```

## Extensions ##
Allow to filter on the path end extension (with or without the dot)
```javascript
{ extensions: '*' }
{ extensions: 'jpg' }
{ extensions: '.jpg' }
{ extensions: ['.jpg', 'css'] }
```
