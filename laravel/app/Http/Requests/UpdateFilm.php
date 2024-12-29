<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFilm extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',  // Le titre est obligatoire
            'popularity' => 'nullable|numeric|min:0',  // La popularité doit être supérieure ou égale à 0
            'vote_average' => 'nullable|numeric|min:0|max:10',  // La note moyenne doit être entre 0 et 10
            'vote_count' => 'nullable|numeric|min:0',  // Le nombre de votes doit être supérieur ou égal à 0
        ];
    }

    /**
     * Custom validation messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'title.required' => "Le titre est obligatoire",
            'popularity.numeric' => "La popularité doit être un nombre",
            'popularity.min' => "La popularité doit être supérieure ou égale à 0",
            'vote_average.numeric' => "La note moyenne doit être un nombre",
            'vote_average.min' => "La note moyenne doit être supérieure ou égale à 0",
            'vote_average.max' => "La note moyenne doit être inférieure ou égale à 10",
            'vote_count.numeric' => "Le nombre de votes doit être un nombre",
            'vote_count.min' => "Le nombre de votes doit être supérieur ou égal à 0",
        ];
    }
}
