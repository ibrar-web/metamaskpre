<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Storage;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Arr;
use DateTime;
use Exception;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\CssSelector\Node\FunctionNode;
use Illuminate\Http\Request;

class UserGamesController extends Controller
{
    public function findgame(Request $request)
    {
       try{
        $sequence = auth()->user()->id;
        if (Cache::has('user-is-online-' . $sequence) && $request->input('id') && auth()->user()->role == 'user') {
            $id = $request->input('id');
            $id = DB::table('gamescontrol')->where('GameID', $id)->pluck('id');
            if (count($id) > 0) {
                return View('game.index' . $id[0]);
            }
        } else {
            return View('unknown');
        }
       } 
       catch(Exception $exception){
           Log::info($exception);
       }
    }
}
