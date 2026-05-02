<?php
namespace Haseri\Backend\Modules\Jobs\Resources;

class JobResource
{
    public static function format($job)
    {
        return [
            'id' => $job->id,
            'title' => $job->title,
            'description' => $job->description,
            'price' => $job->price,
            'commission' => $job->commission,
            'status' => $job->status,
            'category' => $job->category ? $job->category->name : null,
            'customer' => $job->customer ? [
                'id' => $job->customer->id,
                'name' => $job->customer->first_name . ' ' . $job->customer->last_name,
            ] : null,
            'technician' => $job->technician ? [
                'id' => $job->technician->id,
                'name' => $job->technician->first_name . ' ' . $job->technician->last_name,
            ] : null,
            'address' => $job->address ? [
                'city' => $job->address->city,
                'sub_city' => $job->address->sub_city,
                'specific_location' => $job->address->specific_location,
            ] : null,
            'created_at' => $job->created_at,
        ];
    }
}