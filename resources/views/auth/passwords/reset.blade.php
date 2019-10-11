@extends('layouts.default')

@section('content')
@include('auth._background_images')
<div class="Modal__overlay SelectionModal__overlay">
    <div class="Modal__content SelectionModal__content">
        <div class="AuthModal">
            <div class="AuthModal__action-register">
                <form class="AuthModal__register-form" method="POST" action="{{ route('password.request') }}"
                    aria-label="{{ __('Reset Password') }}">
                    @csrf

                    <input type="hidden" name="token" value="{{ $token }}">

                    <fieldset class="AuthModal__register-fieldset">
                        <legend class="AuthModal__register-legend">Réinitialisation du mot de passe</legend>

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

                        <label
                            class="InputField is-dirty AuthModal__login-input {{ $errors->has('password') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">mot de passe</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__login-input" type="password" name="password"
                                    label="mot de passe" required value="" data-togglable />
                            </span>
                            <button type="button" class="InputField__toggle-visibility " data-password-toggler>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M16.34 3L15 4.434" stroke="#fff" stroke-miterlimit="10"
                                        class="ToggleVisibility__non-strike" />
                                    <path d="M.415 15.341L16.17 2.903" stroke="#fff" class="ToggleVisibility__strike" />
                                    <path
                                        d="M16.42 9.039c-.167-.166-3.567-4.976-8.21-5.142C5.224 3.814 2.737 6.053 0 9.04c.166.166 3.566 4.478 8.21 4.726.083 0-.083 0 0 0 2.736 0 5.638-1.658 8.21-4.726zm-8.21 3.814c-2.737-.083-5.059-1.907-6.303-3.15a.902.902 0 0 1 0-1.245C3.98 6.302 6.054 4.81 8.293 4.892c2.736.083 5.14 2.24 6.385 3.566a.902.902 0 0 1 0 1.244c-2.24 2.073-4.23 3.234-6.468 3.151z"
                                        fill="#fff" />
                                    <path d="M8.21 10.78a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98z" fill="#fff" />
                                    <path
                                        d="M8.21 0v1.99M4.145.663l.663 1.825M.498 2.902l1.41 1.41M12.355.663l-.746 1.825"
                                        stroke="#fff" stroke-miterlimit="10" />
                                </svg>
                            </button>
                        </label>

                        <label
                            class="InputField is-dirty AuthModal__login-input {{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}">
                            <span class="InputField__label">confirmation mot de passe</span>
                            <span class="InputField__input-wrapper">
                                <input class="InputField__input AuthModal__login-input" type="password"
                                    name="password_confirmation" label="mot de passe" required value=""
                                    data-togglable />
                            </span>
                            <button type="button" class="InputField__toggle-visibility " data-password-toggler>
                                <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                                    <path d="M16.34 3L15 4.434" stroke="#fff" stroke-miterlimit="10"
                                        class="ToggleVisibility__non-strike" />
                                    <path d="M.415 15.341L16.17 2.903" stroke="#fff" class="ToggleVisibility__strike" />
                                    <path
                                        d="M16.42 9.039c-.167-.166-3.567-4.976-8.21-5.142C5.224 3.814 2.737 6.053 0 9.04c.166.166 3.566 4.478 8.21 4.726.083 0-.083 0 0 0 2.736 0 5.638-1.658 8.21-4.726zm-8.21 3.814c-2.737-.083-5.059-1.907-6.303-3.15a.902.902 0 0 1 0-1.245C3.98 6.302 6.054 4.81 8.293 4.892c2.736.083 5.14 2.24 6.385 3.566a.902.902 0 0 1 0 1.244c-2.24 2.073-4.23 3.234-6.468 3.151z"
                                        fill="#fff" />
                                    <path d="M8.21 10.78a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98z" fill="#fff" />
                                    <path
                                        d="M8.21 0v1.99M4.145.663l.663 1.825M.498 2.902l1.41 1.41M12.355.663l-.746 1.825"
                                        stroke="#fff" stroke-miterlimit="10" />
                                </svg>
                            </button>
                        </label>

                        <div class="AuthModal__switch-links">
                            <a href="{{ route('login') }}">S'identifier</a>
                            <a href="{{ route('register') }}">Pas encore inscrit ?</a>
                        </div>
                        <div class="AuthModal__register-info"></div>
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

<script>
    Array.from(document.querySelectorAll('[data-password-toggler]')).map((tog) => {
        tog.addEventListener('click', togglePasswordVisibility);
    });
    function togglePasswordVisibility(ev) {
        let input = ev.target.closest('label').querySelector('[data-togglable]');
        input.setAttribute('type', input.getAttribute('type').toLowerCase() === 'password' ? 'text' : 'password');
    }
</script>
@endsection