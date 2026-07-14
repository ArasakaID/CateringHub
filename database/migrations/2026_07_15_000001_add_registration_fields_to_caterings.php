<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('caterings', function (Blueprint $table) {
            if (!Schema::hasColumn('caterings', 'slogan')) {
                $table->string('slogan')->nullable()->after('description');
            }
            if (!Schema::hasColumn('caterings', 'owner_name')) {
                $table->string('owner_name')->nullable()->after('phone');
            }
            if (!Schema::hasColumn('caterings', 'owner_nik')) {
                $table->string('owner_nik', 20)->nullable()->after('owner_name');
            }
            if (!Schema::hasColumn('caterings', 'owner_phone')) {
                $table->string('owner_phone', 20)->nullable()->after('owner_nik');
            }
            if (!Schema::hasColumn('caterings', 'owner_address')) {
                $table->text('owner_address')->nullable()->after('owner_phone');
            }
        });
    }

    public function down(): void
    {
        Schema::table('caterings', function (Blueprint $table) {
            $columns = ['slogan', 'owner_name', 'owner_nik', 'owner_phone', 'owner_address'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('caterings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
