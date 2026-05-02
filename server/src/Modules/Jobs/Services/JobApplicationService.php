<?php
namespace Haseri\Backend\Modules\Jobs\Services;

use Haseri\Backend\Shared\Models\JobApplication;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Notification;
use Haseri\Backend\Shared\Exceptions\NotFoundException;
use Haseri\Backend\Shared\Exceptions\ConflictException;
use Haseri\Backend\Shared\Exceptions\UnauthorizedException;

class JobApplicationService
{
    public function apply($providerId, $jobId, array $data)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        if ($job->status !== 'open') throw new ConflictException('Job is not open');

        $exists = JobApplication::where('job_id', $jobId)
            ->where('provider_id', $providerId)
            ->exists();
        if ($exists) throw new ConflictException('You already applied');

        $application = JobApplication::create([
            'job_id' => $jobId,
            'provider_id' => $providerId,
            'message' => $data['message'] ?? null,
            'proposed_price' => $data['proposed_price'] ?? null,
            'status' => 'pending',
        ]);

        Notification::create([
            'user_id' => $job->customer_id,
            'title' => 'New Application',
            'message' => 'A provider applied to your job: ' . $job->title,
            'type' => 'new_application',
            'reference_id' => $application->id,
        ]);

        return $application;
    }

    public function getByJob($jobId)
    {
        return JobApplication::with('provider')
            ->where('job_id', $jobId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function getByProvider($providerId)
    {
        return JobApplication::with('job')
            ->where('provider_id', $providerId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function accept($applicationId, $customerId)
    {
        $application = JobApplication::with('job')->find($applicationId);
        if (!$application) throw new NotFoundException('Application not found');
        if ($application->job->customer_id !== $customerId) throw new UnauthorizedException('Not authorized');

        $application->update(['status' => 'accepted']);
        $application->job->update([
            'technician_id' => $application->provider_id,
            'accepted_application_id' => $application->id,
            'status' => 'assigned',
        ]);

        JobApplication::where('job_id', $application->job_id)
            ->where('id', '!=', $applicationId)
            ->update(['status' => 'rejected']);

        Notification::create([
            'user_id' => $application->provider_id,
            'title' => 'Application Accepted',
            'message' => 'You have been assigned to: ' . $application->job->title,
            'type' => 'application_accepted',
            'reference_id' => $application->id,
        ]);

        return ['message' => 'Application accepted'];
    }

    public function reject($applicationId)
    {
        $application = JobApplication::find($applicationId);
        if (!$application) throw new NotFoundException('Application not found');

        $application->update(['status' => 'rejected']);

        Notification::create([
            'user_id' => $application->provider_id,
            'title' => 'Application Rejected',
            'message' => 'Your application was not accepted',
            'type' => 'application_rejected',
            'reference_id' => $application->id,
        ]);

        return ['message' => 'Application rejected'];
    }
}