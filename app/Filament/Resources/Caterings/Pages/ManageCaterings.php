<?php

namespace App\Filament\Resources\Caterings\Pages;

use App\Filament\Resources\Caterings\CateringResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ManageRecords;

class ManageCaterings extends ManageRecords
{
    protected static string $resource = CateringResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
