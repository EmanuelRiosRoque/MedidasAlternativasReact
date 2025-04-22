<?php

namespace App\Http\Controllers;

use App\Models\Convenios;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConveniosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('convenios/index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Convenios $convenios)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Convenios $convenios)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Convenios $convenios)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Convenios $convenios)
    {
        //
    }
}
