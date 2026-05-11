<!--  These is  has-40 and it is all abt technical skills management  -->

<?php
namespace Haseri\Backend\Shared\Models;

use Illuminate\Database\Eloquent\Model;

class TechnicianSkill extends Model
{
    protected $table = 'technician_skills';
    public $timestamps = false;
    protected $fillable = ['user_id', 'skill_name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}