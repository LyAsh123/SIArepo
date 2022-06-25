<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class UserJob extends Model{
    protected $table = 'tbluser';
    // column sa table
    protected $fillable = [
        'id', 'username', 'password', 'gender', 'jobid',
    ];

    public $timestamps = false;
}