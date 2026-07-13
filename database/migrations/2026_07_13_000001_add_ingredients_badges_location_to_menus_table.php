<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->json('ingredients')->nullable()->after('options');
            $table->json('badges')->nullable()->after('ingredients');
            $table->string('location')->nullable()->after('badges');
        });
    }

    public function down(): void
    {
        Schema::table('menus', function (Blueprint $table) {
            $table->dropColumn(['ingredients', 'badges', 'location']);
        });
    }
};
