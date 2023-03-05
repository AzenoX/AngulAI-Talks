<?php

namespace App\Services;

use App\Events\NewMessage;
use App\Models\Message;
use App\Models\User;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use OpenAI\Laravel\Facades\OpenAI;

class MessageService
{
    /**
     * @throws Exception
     */
    public function createMessage(string $text): bool
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return false;
            }

            $message = Message::create([
                'sender_id' => Auth::user()->id,
                'message' => $text
            ]);

            $message = Message::with('user')->where('id', $message->id)->get()->first();
            event(new NewMessage($user, $message));

            // Create bot if not exists
            $bot = $user->bot;

            if (!$bot) {
                $bot = (new UserService())->createBot($user);
            }

            $response = OpenAI::chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $text
                    ]
                ],
            ]);

            $message = Message::create([
                'sender_id' => $bot->id,
                'message' => $response->choices[0]->message->content
            ]);

            $message = Message::with('user')->where('id', $message->id)->get()->first();
            event(new NewMessage($user, $message));
        } catch (Exception $e) {
            info($e->getMessage());
        }

        return true;
    }

    /**
     * @param User $user
     * @return Collection
     * @throws Exception
     */
    public function getMessagesFromUser(User $user): Collection
    {
        $bot = $user->bot;

        if (!$bot) {
            $bot = (new UserService())->createBot($user);
        }

        return Message::with('user')->whereIn('sender_id', [$user->id, $bot->id])->get();
    }
}
