<?php
namespace Haseri\Backend\Modules\Jobs\Resources;

class ApplicationResource
{
    public static function format($application)
    {
        return [
            'id' => $application->id,
            'job_id' => $application->job_id,
            'message' => $application->message,
            'proposed_price' => $application->proposed_price,
            'status' => $application->status,
            'provider' => $application->provider ? [
                'id' => $application->provider->id,
                'name' => $application->provider->first_name . ' ' . $application->provider->last_name,
                'avatar' => $application->provider->avatar,
            ] : null,
            'created_at' => $application->created_at,
        ];
    }
}