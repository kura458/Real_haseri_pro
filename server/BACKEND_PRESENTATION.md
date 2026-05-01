# Haseri Backend Presentation (Current State)

## 1) What this backend is
- Framework: Laravel 13 (PHP 8.3+)
- Purpose (current code): Admin authentication API skeleton (`/api/v1/admin/*`) with OTP flow, base models, policies, rules, and service layer foundations.

## 2) Important note for presentation
- `README.md` documents a much larger planned architecture.
- The **actual files currently in the project** are fewer.
- For your presentation, say: "This document explains the real current codebase snapshot in `haseri/backend` as of April 28, 2026."

## 3) Folder-by-folder and file-by-file explanation
Legend:
- `Built-in`: Comes from default Laravel scaffold.
- `Generated`: Created by Laravel/package command (artisan/package publish) then may be edited.
- `Created`: Project-specific custom code.

### Root: `backend/`
- `.editorconfig` - `Built-in` - Editor formatting defaults.
- `.env.example` - `Built-in` (edited possible) - Environment template.
- `.gitattributes` - `Built-in` - Git text normalization.
- `.gitignore` - `Built-in` (edited possible) - Ignore vendor/build/runtime files.
- `.npmrc` - `Created` - NPM behavior config.
- `artisan` - `Built-in` - Laravel CLI entrypoint.
- `composer.json` - `Built-in + Created edits` - PHP dependencies/scripts for this app.
- `composer.lock` - `Generated` - Locked PHP dependency versions.
- `package-lock.json` - `Generated` - Locked Node dependency versions.
- `package.json` - `Built-in + Created edits` - Frontend tool scripts/dependencies.
- `PACKAGES.md` - `Created` - Project package notes.
- `phpunit.xml` - `Built-in` (edited possible) - Test runtime config.
- `README.md` - `Created` - Project documentation (currently not aligned with snapshot).
- `vite.config.js` - `Built-in` (edited possible) - Vite bundler config.

### `app/` (application business code)

#### `app/Enums`
- `JobStatus.php` - `Created` - Domain enum for job status.

#### `app/Events/Job`
- `JobPosted.php` - `Created` - Event fired when a job is posted.

#### `app/Exceptions/Custom`
- `ApiException.php` - `Created` - Custom API exception class.

#### `app/Http/Controllers`
- `Controller.php` - `Built-in` - Base controller.

#### `app/Http/Controllers/Api/V1/Auth`
- `AdminAuthController.php` - `Created` - Admin login/verify otp/refresh/logout endpoints.

#### `app/Http/Controllers/Api/V1/Job`
- `JobController.php` - `Created` - Placeholder/minimal job controller.

#### `app/Http/Middleware`
- `AdminMiddleware.php` - `Created` - Admin access rule middleware.
- `CustomerMiddleware.php` - `Created` - Customer role/access middleware.

#### `app/Http/Requests/Api/V1/Auth`
- `AdminLoginRequest.php` - `Created` - Validation for admin login input.
- `LoginRequest.php` - `Created` - Validation for generic login input.
- `VerifyOtpRequest.php` - `Created` - Validation for OTP verification.

#### `app/Http/Resources/Api/V1`
- `ReviewResource.php` - `Created` - API response transformer for review payload.

#### `app/Listeners/Auth`
- `CreateUserProfile.php` - `Created` - Listener to create a profile on auth-related event.

#### `app/Models`
- `Admin.php` - `Created` - Admin model.
- `AdminOtp.php` - `Created` - OTP model for admin login flow.
- `User.php` - `Built-in + Created edits` - Main user model.

#### `app/Notifications/Job`
- `JobPostedNotification.php` - `Created` - Notification for job posted event.

#### `app/Policies`
- `UserPolicy.php` - `Created` - Authorization policy for user actions.

#### `app/Providers`
- `AppServiceProvider.php` - `Built-in` (possibly edited) - Service container bootstrapping.

#### `app/Rules`
- `EthiopianPhoneNumber.php` - `Created` - Custom phone validator.
- `NotExpiredOtp.php` - `Created` - OTP expiry validator.
- `StrongPassword.php` - `Created` - Password strength validator.
- `UniqueServicePerProvider.php` - `Created` - Business uniqueness validator.
- `ValidOtpCode.php` - `Created` - OTP correctness validator.

#### `app/Services/Auth`
- `AdminAuthService.php` - `Created` - Admin auth business logic.
- `AdminOtpService.php` - `Created` - OTP issuance/verification logic.

#### `app/Services/User`
- `ProfileService.php` - `Created` - User profile business helper.

#### `app/Support`
- `BrevoService.php` - `Created` - Brevo integration helper.
- `TelegramBot.php` - `Created` - Telegram integration helper.

### `bootstrap/`
- `app.php` - `Built-in` (edited possible) - App bootstrap and middleware/route setup.
- `providers.php` - `Built-in` (edited possible) - Registered providers list.

#### `bootstrap/cache`
- `.gitignore` - `Built-in` - Keeps cache directory tracked but empty.

### `config/`
- `activitylog.php` - `Generated` (package publish) - Spatie activitylog config.
- `app.php` - `Built-in` (edited possible) - Core app config.
- `auth.php` - `Built-in` (edited possible) - Guards/providers/password brokers.
- `broadcasting.php` - `Built-in` - Broadcasting config.
- `cache.php` - `Built-in` - Cache stores/drivers.
- `cors.php` - `Built-in/Generated` - CORS rules.
- `data.php` - `Generated` (package publish) - Spatie laravel-data config.
- `database.php` - `Built-in` (edited possible) - DB connections/migrations settings.
- `filesystems.php` - `Built-in` - Filesystem disks config.
- `logging.php` - `Built-in` - Log channels config.
- `mail.php` - `Built-in` - Mail transports/config.
- `permission.php` - `Generated` (package publish) - Spatie permission config.
- `queue.php` - `Built-in` - Queue connections/jobs config.
- `sanctum.php` - `Generated` (package install/publish) - Sanctum auth tokens config.
- `services.php` - `Built-in` (edited possible) - Third-party service credentials.
- `session.php` - `Built-in` - Session storage/behavior.

### `database/`
- `.gitignore` - `Built-in` - Keep folder while ignoring runtime files.

#### `database/factories`
- `UserFactory.php` - `Built-in` (edited possible) - Fake user data factory.

#### `database/migrations`
- `0001_01_01_000000_create_users_table.php` - `Built-in` - Users table.
- `0001_01_01_000001_create_cache_table.php` - `Built-in` - Cache table.
- `0001_01_01_000002_create_jobs_table.php` - `Built-in` - Queue jobs tables.
- `2026_04_26_182742_create_personal_access_tokens_table.php` - `Generated` - Sanctum table.
- `2026_04_27_115426_create_permission_tables.php` - `Generated` - Spatie permission tables.
- `2026_04_27_115824_create_activity_log_table.php` - `Generated` - Spatie activity log table.
- `2026_04_27_141121_create_admins_table.php` - `Created` - Custom admins table.
- `2026_04_27_141136_create_admin_otps_table.php` - `Created` - Custom admin otps table.

#### `database/seeders`
- `DatabaseSeeder.php` - `Built-in` (edited possible) - Main seeder entry point.

### `public/`
- `.htaccess` - `Built-in` - Apache rewrite/security rules.
- `favicon.ico` - `Built-in` - Default favicon placeholder.
- `index.php` - `Built-in` - HTTP entrypoint.
- `robots.txt` - `Built-in` - Search crawler rules.

### `resources/`

#### `resources/css`
- `app.css` - `Built-in` (edited possible) - Main stylesheet entry.

#### `resources/js`
- `app.js` - `Built-in` (edited possible) - Main JS entry.
- `echo.js` - `Generated/Built-in` - Laravel Echo realtime setup.

#### `resources/views`
- `welcome.blade.php` - `Built-in` (edited possible) - Default landing blade view.

### `routes/`
- `api.php` - `Built-in + Created edits` - API route root; loads `routes/api/admin.php` under `/api/v1`.
- `channels.php` - `Built-in` - Broadcast channel auth routes.
- `console.php` - `Built-in` - Artisan command route definitions.
- `web.php` - `Built-in` (edited possible) - Web routes.

#### `routes/api`
- `admin.php` - `Created` - Admin auth API endpoints.
- `auth.php` - `Created` (currently empty placeholder).

### `storage/` (runtime data)

#### `storage/app`
- `.gitignore` - `Built-in`.

#### `storage/app/private`
- `.gitignore` - `Built-in`.

#### `storage/app/public`
- `.gitignore` - `Built-in`.

#### `storage/framework`
- `.gitignore` - `Built-in`.

#### `storage/framework/cache`
- `.gitignore` - `Built-in`.

#### `storage/framework/cache/data`
- `.gitignore` - `Built-in`.

#### `storage/framework/sessions`
- `.gitignore` - `Built-in`.

#### `storage/framework/testing`
- `.gitignore` - `Built-in`.

#### `storage/framework/views`
- `.gitignore` - `Built-in`.

#### `storage/logs`
- `.gitignore` - `Built-in`.

### `tests/`
- `TestCase.php` - `Built-in` - Base test case.

#### `tests/Feature`
- `ExampleTest.php` - `Built-in` - Example feature test.

#### `tests/Unit`
- `ExampleTest.php` - `Built-in` - Example unit test.

## 4) How to run this backend (step by step)

### Prerequisites
- PHP `8.3+`
- Composer `2.x`
- Node.js `18+` and npm
- SQLite (or MySQL/PostgreSQL if you change `.env`)

### Setup (first time)
1. Open terminal in `C:\Users\Hp\Documents\Haseri\haseri\backend`
2. Install PHP dependencies:
   - `composer install`
3. Create env file:
   - `copy .env.example .env`
4. Generate app key:
   - `php artisan key:generate`
5. If using SQLite (default in `.env.example`):
   - `New-Item -ItemType File -Path database\database.sqlite -Force`
6. Run migrations:
   - `php artisan migrate`
7. Install frontend dependencies:
   - `npm install`

### Run in development (simple)
1. Terminal A (backend server):
   - `php artisan serve`
2. Terminal B (frontend assets watcher):
   - `npm run dev`
3. Optional Terminal C (queue worker for notifications/jobs):
   - `php artisan queue:listen --tries=1 --timeout=0`

### Run with one command
- `composer run dev`
- This starts server + queue listener + log tail + vite concurrently.

### Useful checks
- List routes: `php artisan route:list`
- Run tests: `composer test`
- Clear caches if config changes: `php artisan optimize:clear`

## 5) API routes currently implemented (visible)
- `POST /api/v1/admin/login`
- `POST /api/v1/admin/verify-otp`
- `POST /api/v1/admin/refresh` (auth:admin)
- `POST /api/v1/admin/logout` (auth:admin)

## 6) Presentation talking points (short)
1. Laravel 13 backend with clean layered structure (`Controllers -> Services -> Models/Rules`).
2. Custom admin OTP authentication is the most complete implemented feature.
3. Project includes Spatie packages (permission, activitylog, data, media library) and Sanctum setup.
4. Current snapshot is foundational; README describes a broader target architecture beyond current files.
