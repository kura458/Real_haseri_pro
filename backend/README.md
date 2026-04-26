```bash
backend/
│
├── app/
│   ├── Console/
│   │   └── Commands/
│   │       ├── SendNotifications.php
│   │       ├── CleanExpiredOtps.php
│   │       └── UpdateProviderStats.php
│   │
│   ├── Enums/
│   │   ├── UserRole.php
│   │   ├── AccountType.php
│   │   ├── JobStatus.php
│   │   ├── JobType.php
│   │   ├── ApplicationStatus.php
│   │   ├── InviteStatus.php
│   │   ├── ContractStatus.php
│   │   ├── PaymentStatus.php
│   │   ├── NotificationChannel.php
│   │   └── ReportStatus.php
│   │
│   ├── Events/
│   │   ├── Auth/
│   │   │   ├── UserRegistered.php
│   │   │   └── EmailVerified.php
│   │   ├── Job/
│   │   │   ├── JobPosted.php
│   │   │   ├── JobApplicationSubmitted.php
│   │   │   └── ProviderInvited.php
│   │   ├── Contract/
│   │   │   ├── ContractCreated.php
│   │   │   └── ContractCompleted.php
│   │   ├── Payment/
│   │   │   └── PaymentCompleted.php
│   │   ├── Review/
│   │   │   └── ReviewSubmitted.php
│   │   ├── Chat/
│   │   │   └── MessageSent.php
│   │   └── Report/
│   │       └── UserReported.php
│   │
│   ├── Exceptions/
│   │   ├── Handler.php
│   │   └── Custom/
│   │       ├── ApiException.php
│   │       ├── UnauthorizedException.php
│   │       └── ValidationException.php
│   │
│   ├── Helpers/
│   │   ├── ApiResponse.php
│   │   ├── Helper.php
│   │   └── MediaHelper.php
│   │
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── V1/
│   │   │           ├── Auth/
│   │   │           │   ├── UserAuthController.php
│   │   │           │   └── AdminAuthController.php
│   │   │           ├── User/
│   │   │           │   ├── ProfileController.php
│   │   │           │   └── SessionController.php
│   │   │           ├── Provider/
│   │   │           │   ├── ProviderController.php
│   │   │           │   ├── ProviderStatsController.php
│   │   │           │   └── ProviderServiceController.php
│   │   │           ├── Customer/
│   │   │           │   ├── CustomerController.php
│   │   │           │   └── CustomerStatsController.php
│   │   │           ├── Job/
│   │   │           │   ├── JobController.php
│   │   │           │   ├── ApplicationController.php
│   │   │           │   └── InviteController.php
│   │   │           ├── Contract/
│   │   │           │   └── ContractController.php
│   │   │           ├── Payment/
│   │   │           │   ├── PaymentController.php
│   │   │           │   └── PaymentMethodController.php
│   │   │           ├── Review/
│   │   │           │   └── ReviewController.php
│   │   │           ├── Chat/
│   │   │           │   ├── ConversationController.php
│   │   │           │   └── MessageController.php
│   │   │           ├── Notification/
│   │   │           │   └── NotificationController.php
│   │   │           ├── Badge/
│   │   │           │   └── BadgeController.php
│   │   │           ├── Service/
│   │   │           │   ├── CategoryController.php
│   │   │           │   └── ServiceController.php
│   │   │           ├── Location/
│   │   │           │   ├── CityController.php
│   │   │           │   └── AddressController.php
│   │   │           ├── Admin/
│   │   │           │   ├── AdminController.php
│   │   │           │   ├── ReportController.php
│   │   │           │   └── AuditLogController.php
│   │   │           └── Public/
│   │   │               └── PublicController.php
│   │   │
│   │   ├── Middleware/
│   │   │   ├── Authenticate.php
│   │   │   ├── AdminMiddleware.php
│   │   │   ├── ProviderMiddleware.php
│   │   │   ├── CustomerMiddleware.php
│   │   │   ├── EmailVerifiedMiddleware.php
│   │   │   ├── ForceJsonResponse.php
│   │   │   └── Cors.php
│   │   │
│   │   ├── Requests/
│   │   │   └── Api/
│   │   │       └── V1/
│   │   │           ├── Auth/
│   │   │           │   ├── LoginRequest.php
│   │   │           │   ├── RegisterCustomerRequest.php
│   │   │           │   ├── RegisterProviderRequest.php
│   │   │           │   ├── AdminLoginRequest.php
│   │   │           │   ├── VerifyOtpRequest.php
│   │   │           │   ├── ForgotPasswordRequest.php
│   │   │           │   ├── ResetPasswordRequest.php
│   │   │           │   ├── VerifyEmailRequest.php
│   │   │           │   └── ResendVerificationRequest.php
│   │   │           ├── User/
│   │   │           │   ├── UpdateProfileRequest.php
│   │   │           │   └── UploadPhotoRequest.php
│   │   │           ├── Provider/
│   │   │           │   ├── UpdateProviderRequest.php
│   │   │           │   └── ProviderServiceRequest.php
│   │   │           ├── Customer/
│   │   │           │   └── UpdateCustomerRequest.php
│   │   │           ├── Job/
│   │   │           │   ├── StoreJobRequest.php
│   │   │           │   ├── UpdateJobRequest.php
│   │   │           │   ├── ApplicationRequest.php
│   │   │           │   └── InviteRequest.php
│   │   │           ├── Contract/
│   │   │           │   └── StoreContractRequest.php
│   │   │           ├── Payment/
│   │   │           │   ├── InitiatePaymentRequest.php
│   │   │           │   └── PaymentMethodRequest.php
│   │   │           ├── Review/
│   │   │           │   └── StoreReviewRequest.php
│   │   │           ├── Chat/
│   │   │           │   └── SendMessageRequest.php
│   │   │           ├── Notification/
│   │   │           │   └── UpdateChannelRequest.php
│   │   │           ├── Admin/
│   │   │           │   └── ReportActionRequest.php
│   │   │           └── Location/
│   │   │               └── AddressRequest.php
│   │   │
│   │   └── Resources/
│   │       └── Api/
│   │           └── V1/
│   │               ├── UserResource.php
│   │               ├── UserProfileResource.php
│   │               ├── ProviderResource.php
│   │               ├── ProviderDetailResource.php
│   │               ├── CustomerResource.php
│   │               ├── JobResource.php
│   │               ├── JobDetailResource.php
│   │               ├── ApplicationResource.php
│   │               ├── InviteResource.php
│   │               ├── ContractResource.php
│   │               ├── PaymentResource.php
│   │               ├── PaymentMethodResource.php
│   │               ├── ReviewResource.php
│   │               ├── ConversationResource.php
│   │               ├── MessageResource.php
│   │               ├── NotificationResource.php
│   │               ├── NotificationChannelResource.php
│   │               ├── BadgeResource.php
│   │               ├── CategoryResource.php
│   │               ├── ServiceResource.php
│   │               ├── CityResource.php
│   │               ├── AddressResource.php
│   │               ├── ReportResource.php
│   │               └── AuditLogResource.php
│   │
│   ├── Listeners/
│   │   ├── Auth/
│   │   │   ├── SendEmailVerification.php
│   │   │   └── CreateUserProfile.php
│   │   ├── Job/
│   │   │   ├── SendJobNotification.php
│   │   │   └── UpdateProviderApplications.php
│   │   ├── Contract/
│   │   │   └── SendContractNotification.php
│   │   ├── Payment/
│   │   │   └── SendPaymentNotification.php
│   │   ├── Stats/
│   │   │   ├── UpdateProviderStats.php
│   │   │   └── UpdateCustomerStats.php
│   │   └── Notification/
│   │       └── SendNotificationToChannels.php
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── UserProfile.php
│   │   ├── UserSession.php
│   │   ├── EmailVerification.php
│   │   ├── OtpCode.php
│   │   ├── Customer.php
│   │   ├── Provider.php
│   │   ├── Admin.php
│   │   ├── City.php
│   │   ├── Address.php
│   │   ├── Category.php
│   │   ├── Service.php
│   │   ├── ProviderService.php
│   │   ├── Badge.php
│   │   ├── UserBadge.php
│   │   ├── Job.php
│   │   ├── JobApplication.php
│   │   ├── JobInvite.php
│   │   ├── Contract.php
│   │   ├── PaymentMethod.php
│   │   ├── Payment.php
│   │   ├── Review.php
│   │   ├── Conversation.php
│   │   ├── Message.php
│   │   ├── NotificationChannel.php
│   │   ├── Notification.php
│   │   ├── ProviderStat.php
│   │   ├── CustomerStat.php
│   │   ├── Report.php
│   │   └── AuditLog.php
│   │
│   ├── Notifications/                       # Laravel Notification classes
│   │   ├── Auth/
│   │   │   ├── EmailVerificationNotification.php
│   │   │   └── PasswordResetNotification.php
│   │   ├── Job/
│   │   │   ├── JobPostedNotification.php
│   │   │   ├── ApplicationReceivedNotification.php
│   │   │   ├── ApplicationAcceptedNotification.php
│   │   │   └── ApplicationRejectedNotification.php
│   │   ├── Contract/
│   │   │   ├── ContractCreatedNotification.php
│   │   │   └── ContractCompletedNotification.php
│   │   ├── Payment/
│   │   │   └── PaymentReceivedNotification.php
│   │   ├── Review/
│   │   │   └── NewReviewNotification.php
│   │   ├── Chat/
│   │   │   └── NewMessageNotification.php
│   │   └── Admin/
│   │       ├── NewReportNotification.php
│   │       └── UserBannedNotification.php
│   │
│   ├── Policies/                            # Authorization Policies
│   │   ├── UserPolicy.php
│   │   ├── ProviderPolicy.php
│   │   ├── CustomerPolicy.php
│   │   ├── JobPolicy.php
│   │   ├── ApplicationPolicy.php
│   │   ├── ContractPolicy.php
│   │   ├── PaymentPolicy.php
│   │   ├── ReviewPolicy.php
│   │   ├── MessagePolicy.php
│   │   ├── NotificationPolicy.php
│   │   └── ReportPolicy.php
│   │
│   ├── Providers/
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   ├── EventServiceProvider.php
│   │   ├── RouteServiceProvider.php
│   │   └── NotificationServiceProvider.php
│   │
│   ├── Rules/                               # Custom Validation Rules
│   │   ├── EthiopianPhoneNumber.php
│   │   ├── StrongPassword.php
│   │   ├── ValidTelebirrNumber.php
│   │   ├── ValidOtpCode.php
│   │   ├── NotExpiredOtp.php
│   │   ├── UniqueServicePerProvider.php
│   │   ├── JobBelongsToCustomer.php
│   │   ├── ApplicationBelongsToJob.php
│   │   └── ContractBelongsToUser.php
│   │
│   ├── Services/                            # Business Logic Services
│   │   ├── Auth/
│   │   │   ├── AuthService.php
│   │   │   └── OtpService.php
│   │   ├── User/
│   │   │   └── ProfileService.php
│   │   ├── Provider/
│   │   │   ├── ProviderService.php
│   │   │   └── ProviderStatsService.php
│   │   ├── Customer/
│   │   │   └── CustomerStatsService.php
│   │   ├── Job/
│   │   │   ├── JobService.php
│   │   │   └── ApplicationService.php
│   │   ├── Contract/
│   │   │   └── ContractService.php
│   │   ├── Payment/
│   │   │   ├── PaymentService.php
│   │   │   ├── CommissionService.php
│   │   │   └── TelebirrService.php
│   │   ├── Review/
│   │   │   └── ReviewService.php
│   │   ├── Chat/
│   │   │   └── ChatService.php
│   │   ├── Notification/
│   │   │   ├── NotificationService.php
│   │   │   ├── Channels/
│   │   │   │   ├── EmailChannel.php
│   │   │   │   ├── TelegramChannel.php
│   │   │   │   └── DatabaseChannel.php
│   │   │   └── NotificationDispatcher.php
│   │   ├── Admin/
│   │   │   ├── AdminService.php
│   │   │   └── AuditLogService.php
│   │   ├── Location/
│   │   │   └── LocationService.php
│   │   └── Badge/
│   │       └── BadgeService.php
│   │
│   └── Support/                             # Helper/Support Classes
│       ├── ApiHelper.php
│       ├── MediaHelper.php
│       ├── SmsService.php
│       ├── TelegramBot.php
│       └── CommissionCalculator.php
│
├── bootstrap/
│   └── app.php
│
├── config/
│   ├── app.php
│   ├── auth.php
│   ├── cors.php
│   ├── sanctum.php
│   ├── services.php
│   ├── notifications.php
│   └── media.php
│
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   ├── ProviderFactory.php
│   │   ├── CustomerFactory.php
│   │   ├── JobFactory.php
│   │   └── ReviewFactory.php
│   │
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_user_profiles_table.php
│   │   ├── 0001_01_01_000002_create_user_sessions_table.php
│   │   ├── 2024_01_01_000001_create_email_verifications_table.php
│   │   ├── 2024_01_01_000002_create_otp_codes_table.php
│   │   ├── 2024_01_01_000003_create_customers_table.php
│   │   ├── 2024_01_01_000004_create_providers_table.php
│   │   ├── 2024_01_01_000005_create_admins_table.php
│   │   ├── 2024_01_01_000006_create_cities_table.php
│   │   ├── 2024_01_01_000007_create_addresses_table.php
│   │   ├── 2024_01_01_000008_create_categories_table.php
│   │   ├── 2024_01_01_000009_create_services_table.php
│   │   ├── 2024_01_01_000010_create_provider_services_table.php
│   │   ├── 2024_01_01_000011_create_badges_table.php
│   │   ├── 2024_01_01_000012_create_user_badges_table.php
│   │   ├── 2024_01_01_000013_create_jobs_table.php
│   │   ├── 2024_01_01_000014_create_job_applications_table.php
│   │   ├── 2024_01_01_000015_create_job_invites_table.php
│   │   ├── 2024_01_01_000016_create_contracts_table.php
│   │   ├── 2024_01_01_000017_create_payment_methods_table.php
│   │   ├── 2024_01_01_000018_create_payments_table.php
│   │   ├── 2024_01_01_000019_create_reviews_table.php
│   │   ├── 2024_01_01_000020_create_conversations_table.php
│   │   ├── 2024_01_01_000021_create_messages_table.php
│   │   ├── 2024_01_01_000022_create_notification_channels_table.php
│   │   ├── 2024_01_01_000023_create_notifications_table.php
│   │   ├── 2024_01_01_000024_create_provider_stats_table.php
│   │   ├── 2024_01_01_000025_create_customer_stats_table.php
│   │   ├── 2024_01_01_000026_create_reports_table.php
│   │   └── 2024_01_01_000027_create_audit_logs_table.php
│   │
│   └── seeders/
│       ├── DatabaseSeeder.php
│       ├── UserSeeder.php
│       ├── AdminSeeder.php
│       ├── ProviderSeeder.php
│       ├── CustomerSeeder.php
│       ├── CategorySeeder.php
│       ├── ServiceSeeder.php
│       ├── BadgeSeeder.php
│       └── CitySeeder.php
│
├── routes/
│   ├── api.php                               # Main API route hub
│   └── api/                                  # Feature-based route files
│       ├── auth.php
│       ├── user.php
│       ├── provider.php
│       ├── customer.php
│       ├── jobs.php
│       ├── contracts.php
│       ├── payments.php
│       ├── reviews.php
│       ├── chat.php
│       ├── notifications.php
│       ├── badges.php
│       ├── services.php
│       ├── location.php
│       ├── admin.php
│       └── public.php
│
├── storage/
│   └── app/
│       └── public/
│           ├── avatars/
│           ├── resumes/
│           ├── logos/
│           └── media/
│
├── .env
├── .env.example
├── artisan
├── composer.json
└── README.md 

```