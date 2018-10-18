# express-middleware-condition

`unless(middleware, options)`

* **middleware** Middleware to skip
* **options** Conditions to test
    * **[paths]** Can be an array of string, an array of object or a string


## Paths ##
Allow to filter on originalUrl and methods
* **path** Can be an object or a string
    * **urls** Can be a string or an array of string
    * **[methods]** Can be a string or an array of string

`{ paths: '/foo' }`
`{ paths: ['/foo', '/bar'] }`
`{ paths: [{ urls: '/foo', method: 'GET' }] }`
`{ paths: [{ urls: ['/foo', '/bar'], method: ['GET', 'PUT'] }] }`
