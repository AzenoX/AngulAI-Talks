<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserBot;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserService
{
    /**
     * @throws Exception
     */
    public function createBot(User $user): User
    {
        $bot = User::create([
            'name' => 'Open AI (' . substr(md5($this->generateRandomString(10)), 0, 5) . ')',
            'password' => Hash::make($this->generateRandomString(50)),
            'isBot' => 1
        ]);

        UserBot::create([
            'user_id' => $user->id,
            'bot_id' => $bot->id,
        ]);

        return $bot;
    }

    /**
     * @param int $length
     * @return string
     * @throws Exception
     */
    private function generateRandomString(int $length = 10): string
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[random_int(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}
