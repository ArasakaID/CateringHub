<?php

namespace App\Filament\Resources\Caterings;

use App\Filament\Resources\Caterings\Pages\ManageCaterings;
use App\Models\Catering;
use BackedEnum;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class CateringResource extends Resource
{
    protected static ?string $model = Catering::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBuildingStorefront;

    protected static ?string $recordTitleAttribute = 'name';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('address')
                    ->maxLength(255)
                    ->columnSpanFull(),
                TextInput::make('phone')
                    ->tel()
                    ->maxLength(255),
                TextInput::make('delivery_type')
                    ->maxLength(255)
                    ->default('antar'),
                TextInput::make('delivery_time')
                    ->maxLength(255),
                TextInput::make('delivery_fee')
                    ->numeric()
                    ->prefix('Rp'),
                Toggle::make('is_active')
                    ->default(true),
                Toggle::make('is_featured'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                TextColumn::make('name')
                    ->searchable(),
                TextColumn::make('category.name')
                    ->label('Category')
                    ->sortable(),
                TextColumn::make('rating')
                    ->sortable(),
                TextColumn::make('delivery_fee')
                    ->money('IDR'),
                ToggleColumn::make('is_active'),
                ToggleColumn::make('is_featured'),
                TextColumn::make('menus_count')
                    ->counts('menus')
                    ->label('Menus'),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageCaterings::route('/'),
        ];
    }
}
