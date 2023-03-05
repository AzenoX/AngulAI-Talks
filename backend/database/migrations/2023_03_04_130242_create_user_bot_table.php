<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_bot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->integer('bot_id');
            $table->foreign('bot_id')->references('id')->on('users');
            $table->timestamps();

            $table->unique(['user_id', 'bot_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_bot');
    }
};
