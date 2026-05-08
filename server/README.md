# Haseri Server (Backend)

Enterprise-grade PHP backend powering the Haseri marketplace. This service provides authentication, user management, jobs, payments, reviews, and notifications via a modular, layered architecture.

## Overview
- **Core**: Application bootstrap, routing, database connection.
- **Modules**: Feature-driven domains (Auth, Customer, Technician, Jobs, Payments, Reviews, Notifications, Admin).
- **Shared**: Common helpers, models, enums, exceptions, and reusable services.
- **Storage**: Logs, cache, and file uploads.
- **Database**: Migration scripts and migration runner.

## Requirements
- PHP 8.1+ (CLI enabled)
- Composer
- MySQL (via XAMPP)
- Apache (via XAMPP)

## Setup
1. **Install dependencies**
	```bash
	composer install
	```
2. **Configure environment**
	- Copy `.env` and update database, app URL, and mail settings as needed.
	- Ensure MySQL is running in XAMPP.
3. **Run migrations**
	```bash
	php database/migrate.php
	```
4. **Serve the app**
	- Point XAMPP Apache document root to `server/public`, or configure a virtual host.

## Project Structure
```bash
server/
├── .env
├── .gitattributes
├── .gitignore
├── BACKEND_PRESENTATION.md
├── bootstrap/
│   └── app.php
├── composer.json
├── composer.lock
├── database/
│   ├── migrate.php
│   ├── migrations/
│   │   ├── 001_create_users_table.php
│   │   ├── 002_create_admins_table.php
│   │   ├── 003_create_admin_otps_table.php
│   │   ├── 004_create_refresh_tokens_table.php
│   │   ├── 005_create_addresses_table.php
│   │   ├── 006_create_customer_verifications_table.php
│   │   ├── 007_create_technician_verifications_table.php
│   │   ├── 008_create_payments_table.php
│   │   ├── 009_create_job_categories_table.php
│   │   ├── 010_create_jobs_table.php
│   │   ├── 011_create_job_applications_table.php
│   │   ├── 012_create_reviews_table.php
│   │   ├── 013_create_notifications_table.php
│   │   ├── 014_create_messages_table.php
│   │   └── 015_add_cover_and_skills.php
│   └── seeder/
├── public/
│   ├── .htaccess
│   └── index.php
├── src/
│   ├── Config/
│   │   ├── chapa.php
│   │   ├── cors.php
│   │   ├── database.php
│   │   └── upload.php
│   ├── Core/
│   │   ├── Application.php
│   │   ├── database.php
│   │   └── Router.php
│   ├── Modules/
│   │   ├── Admin/
│   │   │   ├── Controllers/
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── JobApprovalController.php
│   │   │   │   ├── SettingsController.php
│   │   │   │   ├── TechnicianApprovalController.php
│   │   │   │   └── UserManagementController.php
│   │   │   └── Services/
│   │   │       ├── DashboardService.php
│   │   │       ├── SettingsService.php
│   │   │       ├── TechnicianApprovalService.php
│   │   │       └── UserManagementService.php
│   │   ├── Auth/
│   │   │   ├── Controllers/
│   │   │   │   ├── AdminAuthController.php
│   │   │   │   ├── ForgotPasswordController.php
│   │   │   │   ├── GoogleAuthController.php
│   │   │   │   ├── LoginController.php
│   │   │   │   ├── RegisterController.php
│   │   │   │   └── ResetPasswordController.php
│   │   │   ├── Middleware/
│   │   │   │   └── AuthMiddleware.php
│   │   │   ├── Requests/
│   │   │   │   ├── AdminLoginRequest.php
│   │   │   │   ├── AdminOtpRequest.php
│   │   │   │   ├── LoginRequest.php
│   │   │   │   ├── RegisterRequest.php
│   │   │   │   ├── ResetPasswordRequest.php
│   │   │   │   └── VerifyIdentityRequest.php
│   │   │   ├── Resources/
│   │   │   └── Services/
│   │   │       ├── AdminAuthService.php
│   │   │       ├── ForgotPasswordService.php
│   │   │       ├── LoginService.php
│   │   │       ├── RegisterService.php
│   │   │       └── ResetPasswordService.php
│   │   ├── Chat/
│   │   │   ├── Controllers/
│   │   │   │   └── ChatController.php
│   │   │   └── Services/
│   │   │       └── ChatService.php
│   │   ├── Customer/
│   │   │   ├── Profile/
│   │   │   │   ├── Controllers/
│   │   │   │   │   └── CustomerProfileController.php
│   │   │   │   └── Services/
│   │   │   │       └── CustomerProfileService.php
│   │   │   └── Verification/
│   │   │       ├── Controllers/
│   │   │       │   └── CustomerVerificationController.php
│   │   │       └── Services/
│   │   │           └── CustomerVerificationService.php
│   │   ├── Jobs/
│   │   │   ├── Controllers/
│   │   │   │   ├── JobApplicationController.php
│   │   │   │   ├── JobCategoryController.php
│   │   │   │   └── JobController.php
│   │   │   ├── Repositories/
│   │   │   │   └── JobRepository.php
│   │   │   ├── Requests/
│   │   │   │   ├── ApplicationRequest.php
│   │   │   │   └── CreateJobRequest.php
│   │   │   ├── Resources/
│   │   │   │   ├── ApplicationResource.php
│   │   │   │   ├── JobCollection.php
│   │   │   │   └── JobResource.php
│   │   │   └── Services/
│   │   │       ├── JobApplicationService.php
│   │   │       ├── JobCategoryService.php
│   │   │       └── JobService.php
│   │   ├── Notifications/
│   │   │   ├── Controllers/
│   │   │   │   └── NotificationController.php
│   │   │   └── Services/
│   │   │       └── NotificationService.php
│   │   ├── Payments/
│   │   │   ├── Controllers/
│   │   │   │   └── PaymentController.php
│   │   │   └── Services/
│   │   │       ├── ChapaService.php
│   │   │       └── PaymentService.php
│   │   ├── Public/
│   │   │   ├── Controllers/
│   │   │   │   └── PublicController.php
│   │   │   └── Services/
│   │   │       └── PublicService.php
│   │   ├── Reviews/
│   │   │   ├── Controllers/
│   │   │   │   └── ReviewController.php
│   │   │   ├── Requests/
│   │   │   │   └── CreateReviewRequest.php
│   │   │   └── Services/
│   │   │       └── ReviewService.php
│   │   └── Technician/
│   │       ├── Controllers/
│   │       │   ├── TechnicianController.php
│   │       │   └── TechnicianVerificationController.php
│   │       └── Services/
│   │           ├── TechnicianService.php
│   │           └── TechnicianVerificationService.php
│   ├── Routes/
│   │   ├── admin.php
│   │   ├── api.php
│   │   ├── auth.php
│   │   ├── chat.php
│   │   ├── customer.php
│   │   ├── jobs.php
│   │   ├── notifications.php
│   │   ├── payments.php
│   │   ├── public.php
│   │   ├── reviews.php
│   │   └── technician.php
│   └── Shared/
│       ├── Enums/
│       │   ├── ApplicationStatus.php
│       │   ├── DocumentType.php
│       │   ├── JobStatus.php
│       │   ├── NotificationType.php
│       │   ├── PaymentType.php
│       │   ├── UserRole.php
│       │   └── VerificationStatus.php
│       ├── Exceptions/
│       │   ├── BadRequestException.php
│       │   ├── ConflictException.php
│       │   ├── ForbiddenException.php
│       │   ├── HttpException.php
│       │   ├── InternalServerErrorException.php
│       │   ├── NotFoundException.php
│       │   ├── TooManyRequestsException.php
│       │   ├── UnauthorizedException.php
│       │   └── ValidationException.php
│       ├── Helpers/
│       │   ├── Cookie.php
│       │   ├── CorsHelper.php
│       │   ├── EmailHelper.php
│       │   ├── JWT.php
│       │   ├── Response.php
│       │   ├── ValidationHelper.php
│       │   └── Upload/
│       │       ├── FileUploader.php
│       │       └── ImageUploader.php
│       ├── Models/
│       │   ├── Address.php
│       │   ├── Admin.php
│       │   ├── AdminOtp.php
│       │   ├── CustomerVerification.php
│       │   ├── Job.php
│       │   ├── JobApplication.php
│       │   ├── JobCategory.php
│       │   ├── Message.php
│       │   ├── Notification.php
│       │   ├── Payment.php
│       │   ├── RefreshToken.php
│       │   ├── Review.php
│       │   ├── TechnicianSkill.php
│       │   ├── TechnicianVerification.php
│       │   └── User.php
│       ├── services/
│       │   ├── AnalyticsService.php
│       │   └── TrustScoreService.php
│       └── Traits/
│           ├── HasLocation.php
│           └── Notifiable.php
├── storage/
│   ├── cache/
│   ├── logs/
│   └── uploads/
│       ├── covers/
│       ├── documents/
│       ├── ids/
│       │   └── 69f64dd51a83e_1777749461.png
│       ├── jobs/
│       └── profiles/
└── vendor/
```

## Notes
- All API routes are defined under [src/Routes](src/Routes).
- Module controllers handle HTTP boundaries, services contain business logic.
- Keep uploads under `storage/uploads` with appropriate permissions.
update the server