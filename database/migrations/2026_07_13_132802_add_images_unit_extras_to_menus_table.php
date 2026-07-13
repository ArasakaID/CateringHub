<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->json('images')->nullable()->after('image');
            $table->string('unit')->nullable()->after('price');
            $table->text('extras')->nullable()->after('ingredients');
        });
    }

    public function down(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn(['images', 'unit', 'extras']);
        });
    }
};
