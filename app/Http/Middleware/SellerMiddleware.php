<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SellerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (! $request->user() || $request->user()->role !== 'seller') {
            return redirect()->route('dashboard')->with('error', 'Access denied.');
        }

        return $next($request);
    }
}
