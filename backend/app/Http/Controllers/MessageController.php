<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageGetRequest;
use App\Http\Requests\MessageStoreRequest;
use App\Services\MessageService;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @param MessageStoreRequest $request
     * @param MessageService $messageService
     * @return Response
     * @throws Exception
     */
    public function store(MessageStoreRequest $request, MessageService $messageService)
    {
        $messageService->createMessage($request->validated('message'));

        return response('', 200);
    }

    /**
     * @param MessageGetRequest $request
     * @param MessageService $messageService
     * @return Collection
     * @throws Exception
     */
    public function get(MessageGetRequest $request, MessageService $messageService): Collection
    {
        return $messageService->getMessagesFromUser(Auth::user());
    }
}
