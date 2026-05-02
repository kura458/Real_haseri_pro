<?php
namespace Haseri\Backend\Modules\Jobs\Services;

use Haseri\Backend\Shared\Models\JobCategory;
use Haseri\Backend\Shared\Exceptions\NotFoundException;

class JobCategoryService
{
    public function all()
    {
        return JobCategory::where('is_active', true)->orderBy('name')->get();
    }

    public function create(array $data)
    {
        return JobCategory::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);
    }

    public function update($id, array $data)
    {
        $category = JobCategory::find($id);
        if (!$category) throw new NotFoundException('Category not found');

        $category->update([
            'name' => $data['name'] ?? $category->name,
            'description' => $data['description'] ?? $category->description,
        ]);

        return $category;
    }

    public function delete($id)
    {
        $category = JobCategory::find($id);
        if (!$category) throw new NotFoundException('Category not found');

        $category->update(['is_active' => false]);
        return ['message' => 'Category removed'];
    }
}