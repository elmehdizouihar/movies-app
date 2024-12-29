<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'film_id',
        'name',
        'title',
        'overview',
        'poster_path',
        'release_date',
        'popularity',
        'vote_average',
        'vote_count',
        'media_type',
        'original_language'
    ];
}
