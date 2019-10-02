@extends('layouts.default')

@include('auth._background_images')

<div class="Modal__overlay SelectionModal__overlay">
    <div class="Modal__content SelectionModal__content">
        <div class="AuthModal">
            <div class="AuthModal__action-register">
                <form class="AuthModal__register-form" method="POST" action="{{ route('register') }}"
                    aria-label="{{ __('Register') }}">
                    @csrf
                    <fieldset class="AuthModal__register-fieldset">
                        <legend class="AuthModal__register-legend">Créer votre compte :</legend>
                        <label
                            class="InputField AuthModal__register-input {{ $errors->has('name') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">nom</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__register-input" type="text" name="name"
                                    label="nom" required maxlength="255" value="{{ old('name') }}">
                            </span>
                        </label>
                        <label
                            class="InputField AuthModal__register-input {{ $errors->has('email') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">e-mail</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__register-input" type="email" name="email"
                                    label="e-mail" required value="{{ old('email') }}">
                            </span>
                        </label>
                        <label
                            class="InputField AuthModal__register-input {{ $errors->has('password') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">mot de
                                passe</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__register-input" type="password"
                                    name="password" label="mot de passe" required value="">
                            </span>
                            <button type="button" class="InputField__toggle-visibility ">
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M16.34 3L15 4.434" stroke="#fff" stroke-miterlimit="10"
                                        class="ToggleVisibility__non-strike"></path>
                                    <path d="M.415 15.341L16.17 2.903" stroke="#fff" class="ToggleVisibility__strike">
                                    </path>
                                    <path
                                        d="M16.42 9.039c-.167-.166-3.567-4.976-8.21-5.142C5.224 3.814 2.737 6.053 0 9.04c.166.166 3.566 4.478 8.21 4.726.083 0-.083 0 0 0 2.736 0 5.638-1.658 8.21-4.726zm-8.21 3.814c-2.737-.083-5.059-1.907-6.303-3.15a.902.902 0 0 1 0-1.245C3.98 6.302 6.054 4.81 8.293 4.892c2.736.083 5.14 2.24 6.385 3.566a.902.902 0 0 1 0 1.244c-2.24 2.073-4.23 3.234-6.468 3.151z"
                                        fill="#fff"></path>
                                    <path d="M8.21 10.78a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98z" fill="#fff">
                                    </path>
                                    <path
                                        d="M8.21 0v1.99M4.145.663l.663 1.825M.498 2.902l1.41 1.41M12.355.663l-.746 1.825"
                                        stroke="#fff" stroke-miterlimit="10"></path>
                                </svg>
                            </button>
                        </label>
                        <div class="AuthModal__switch-links">
                            <a href="{{ route('login') }}">Déjà inscrit ?</a>
                        </div>
                        <div class="AuthModal__register-info">Ces informations seront seulement utilisées pour
                            accéder<br>aux fonctionnalités de ce site.</div>
                        <button class="Button AuthModal__register-submit" type="submit">
                            <div class="Button__inner">
                                <div class="Button__label">Valider</div>
                            </div>
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>