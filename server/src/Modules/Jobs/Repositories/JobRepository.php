<?php
namespace Haseri\Backend\Modules\Jobs\Repositories;

use Haseri\Backend\Shared\Models\Job;

class JobRepository
{
    public function filter(array $filters)
    {
        $query = Job::with(['customer', 'category', 'address'])
            ->where('status', 'open');

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['city'])) {
            $query->whereHas('address', function ($q) use ($filters) {
                $q->whereRaw('LOWER(city) = ?', [strtolower($filters['city'])]);
            });
        }

        if (!empty($filters['search'])) {
            $search = strtolower($filters['search']);
            $query->where(function ($q) use ($search) {
                $q->whereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        if (!empty($filters['sort'])) {
            switch ($filters['sort']) {
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'price_high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'price_low':
                    $query->orderBy('price', 'asc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        return $query->get();
    }

    public function findById($id)
    {
        return Job::with(['customer', 'category', 'address', 'applications.provider'])->find($id);
    }

    public function findByCustomer($userId)
    {
        return Job::with(['category', 'address', 'technician'])
            ->where('customer_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function findByTechnician($userId)
    {
        return Job::with(['category', 'address', 'customer'])
            ->where('technician_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
    }
}