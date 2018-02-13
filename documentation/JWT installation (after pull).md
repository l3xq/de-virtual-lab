1. $ composer update


2. Check if the following is on adequate places:


	In `config/app.php`
```
'providers' => [....  
	Tymon\JWTAuth\Providers\LaravelServiceProvider::class, 
	]

'aliases' => [.... 
	'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class,
    'JWTFactory' => Tymon\JWTAuth\Facades\JWTFactory::class 
    ]

```


3. $ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"


4. $ php artisan jwt:secret


5. Apply new DB schema. 


6. $ php artisan serve




*Note:* 


There is a user with credentials [ admin@de.lab / secret ].
Auth has been enabled on all POST/PUT/DELETE routes. Also, there are routes for a password reset and admin editing, but I guess we won't need that.


To test this out, in Postman collection (under admin.service) there is an AUTH method. Login with given credentials and get the token to test other routes. Auth type is Bearer token.