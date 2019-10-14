@extends('layouts.default')

@section('content')
@include('auth._background_images')
<div class="Modal__overlay SelectionModal__overlay">
    <div class="Modal__content SelectionModal__content">
        <div class="AuthModal">
            <div class="AuthModal__action-register">


                <form class="AuthModal__register-form" method="POST" action="{{ route('password.email') }}"
                    aria-label="{{ __('Reset Password') }}">
                    @csrf
                    <fieldset class="AuthModal__register-fieldset">
                        <legend class="AuthModal__register-legend">Mot de passe oublié</legend>

                        @if ($errors->has('email'))
                        <div class="AuthModal__error-msg" role="alert">
                            {{ $errors->first('email') }}
                        </div>
                        @endif

                        @if (session('status'))
                        <div class="AuthModal__error-msg" role="alert">
                            {{ session('status') }}
                        </div>
                        @endif

                        <label
                            class="InputField AuthModal__register-input {{ $errors->has('email') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">e-mail</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__register-input" type="email" name="email"
                                    label="e-mail" required value="{{ old('email') }}">
                            </span>
                        </label>

                        <div class="AuthModal__switch-links">
                            <a href="{{ route('login') }}">S'identifier</a>
                            <a href="{{ route('register') }}">Pas encore inscrit ?</a>
                        </div>
                        <div class="AuthModal__register-info">Un lien pour réinitialiser votre mot de passe vous sera
                            envoyé par email.</div>
                        <button class="Button AuthModal__register-submit" type="submit">
                            <div class="Button__inner">
                                <div class="Button__label">Envoyer</div>
                            </div>
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection