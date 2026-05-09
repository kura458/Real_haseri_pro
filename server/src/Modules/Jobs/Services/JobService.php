<?php
namespace Haseri\Backend\Modules\Jobs\Services;

use Haseri\Backend\Modules\Jobs\Repositories\JobRepository;
use Haseri\Backend\Shared\Models\Job;
use Haseri\Backend\Shared\Models\Address;
use Haseri\Backend\Modules\Payments\Services\PaymentService;
use Haseri\Backend\Shared\Exceptions\NotFoundException;
#jop posting service
class JobService
{
    private $repository;
    private $paymentService;

    public function __construct()
    {
        $this->repository = new JobRepository();
        $this->paymentService = new PaymentService();
    }

    public function create($userId, array $data)
    {
        if (!empty($data['city'])) {
            $address = Address::updateOrCreate(
                ['user_id' => $userId, 'is_primary' => true],
                [
                    'city' => $data['city'],
                    'sub_city' => $data['sub_city'] ?? null,
                    'woreda' => $data['woreda'] ?? null,
                    'kebele' => $data['kebele'] ?? null,
                    'specific_location' => $data['specific_location'] ?? null,
                ]
            );
            $addressId = $address->id;
        } else {
            $primary = Address::where('user_id', $userId)->where('is_primary', true)->first();
            $addressId = $primary ? $primary->id : null;
        }

        return Job::create([
            'customer_id' => $userId,
            'category_id' => $data['category_id'],
            'address_id' => $addressId,
            'title' => $data['title'],
            'description' => $data['description'] ?? '',
            'price' => $data['price'],
            'commission' => $data['price'] * 0.15,
            'status' => 'open',
        ]);
    }

    public function getAll(array $filters = [])
    {
        return $this->repository->filter($filters);
    }

    public function getById($id)
    {
        $job = $this->repository->findById($id);
        if (!$job) throw new NotFoundException('Job not found');
        return $job;
    }

    public function getByCustomer($userId)
    {
        return $this->repository->findByCustomer($userId);
    }

    public function getByTechnician($userId)
    {
        return $this->repository->findByTechnician($userId);
    }

    public function complete($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        $job->update(['status' => 'completed', 'completed_at' => now()]);
        return $job;
    }

    public function cancel($jobId)
    {
        $job = Job::find($jobId);
        if (!$job) throw new NotFoundException('Job not found');
        $job->update(['status' => 'cancelled']);
        return $job;
    }
}