<?php
namespace Haseri\Backend\Modules\Jobs\Resources;

class JobCollection
{
    public static function format($jobs)
    {
        return array_map(function ($job) {
            return JobResource::format($job);
        }, $jobs->toArray());
    }
}