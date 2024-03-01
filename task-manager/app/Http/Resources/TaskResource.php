<?php

namespace App\Http\Resources;

use App\Models\Priority;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'row' => $this->row_id,
            'priority' => (new PriorityResource($this->priority))->toArray($request),
            'position' => $this->position,
            'additional_info' => $this->mergeWhen($request->routeIs('tasks.show'), [
                'start_time' => $this->start_time,
                'end_time' => $this->end_time,
                'closed_at' => $this->closed_at,
                'elapsed_time' => $this->elapsed_time,
                'is_closed' => boolval($this->is_closed),
            ]),
        ];
    }
}
