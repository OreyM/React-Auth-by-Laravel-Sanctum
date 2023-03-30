# React Auth by Laravel Sanctum

## Init Laravel test API server

```bash
composer require laravel/sanctum
```

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider
```

```bash
php artisan migrate
```

Check the **App\Http\Kernel** class, this line should be uncommented:

```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    ...
],
```

Update `'supports_credentials'` key in **config/cors.php** to `true`:

```php
'supports_credentials' => true
```

Customize your **.env** file:

```dotenv
FRONTEND_URL=http://localhost:5173 #specify your frontend domain and port if required
SESSION_DOMAIN=localhost #specify your backend domain
SANCTUM_STATEFUL_DOMAIN=localhost:5173 #specify your frontend domain without http(s) and port if required

SESSION_DRIVER=cookie
```

and DB, for example:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=react_auth_api
DB_USERNAME=root
DB_PASSWORD=
```

In **config/sanctum.php** add your client domain along with port(if local) in `'stateful'` key as follows, for example `localhost:5173`:

```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', sprintf(
    '%s%s%s',
    'localhost,localhost:5173,127.0.0.1,127.0.0.1:8000,::1',
    env('APP_URL') ? ','.parse_url(env('APP_URL'), PHP_URL_HOST) : '',
    env('FRONTEND_URL') ? ','.parse_url(env('FRONTEND_URL'), PHP_URL_HOST) : ''
))),
```

### Test user

```bash
php artisan make:seeder UsersSeeder
```

```php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
         User::factory()->create([
             'name'     => 'Test User',
             'email'    => 'test@example.com',
             'password' => Hash::make('secret'),
         ]);
    }
}
```

In **Database\Seeders\DatabaseSeeder** class:

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(UsersSeeder::class);
    }
}
```

```bash
php artisan db:seed --class=UserSeeder
# or
php artisan migrate:fresh --seed
```

### Test mail service

```url
https://mailtrap.io/
```

With the default Laravel setup you can configure your mailing configuration by setting these values in the **.env** file in the root directory of your project:

```dotenv
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=USER_NAME # edit this
MAIL_PASSWORD=PASSWORD # edit this
MAIL_ENCRYPTION=tls
```
