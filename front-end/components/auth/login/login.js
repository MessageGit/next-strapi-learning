import { useState } from 'react'
import { useRouter } from 'next/router'
import Meta from '../../global/meta'
import style from '../auth.module.scss'

export default function Login() {

    const router = useRouter();

    const [focus, setFocus] = useState([false, false]);
    const [username, setUsername] = useState('');
    const [passwrd, setPasswrd] = useState('');
    const [error, setError] = useState('');
    const [errorTimer, setErrorTimer] = useState(null);

    function fetchLogin() {
        const data = { identifier: username, password: passwrd }

        if(username.length < 3)return authFailed('Veuillez saisir un identifiant.');
        if(passwrd.length < 3)return authFailed('Veuillez saisir un mot de passe.');

        fetch(process.env.NEXT_PUBLIC_API_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.confirmed && data.strapiToken != null) { // Auth (SUCCESS)
                router.push('/');
            } else { // Auth (FAILED)
                authFailed(data.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    function authFailed(errorTxt) {
        if(error.length != 0) { clearTimeout(errorTimer); }
        setError(errorTxt);
        setErrorTimer(setTimeout(() => { setError('') }, 4500));
    }

    function inputFocus(action, inputId) {
        let newState = [focus[0], focus[1]];
        if(action == 'focus') { newState[inputId] = true; }
        else { 
            if(inputId == 0 && !username 
            || inputId == 1 && !passwrd) { 
                newState[inputId] = false; 
            } 
        }
        setFocus([newState[0], newState[1]]);
    }

    function inputChange(e, inputId) {
        if(inputId == 0) { setUsername(e.target.value); }
        else { setPasswrd(e.target.value); }
    }

    return (
        <div className={style.auth_form}>
            <div className={style.login_form}>
                <Meta pageName="Connexion à votre compte - Social Project" description="It's a web social project"/>
                <h1>Connectez-vous à votre compte</h1>
                <br />
                <form onSubmit={(e) => e.preventDefault() } className={style.auth_form_ctn}>
                    {(error.length > 0) ? (
                    <div className={style.auth_form_error}>
                        <span>{error}</span>
                    </div> ) : ( null )}
                    <div className={style.input_box}>
                        <input type="text" name="login" value={username} id="login_input" className={style.input_style} 
                        onChange={(e) => inputChange(e, 0)} onFocus={() => inputFocus('focus', 0)} onBlur={() => inputFocus('reset', 0)} />
                        <label htmlFor="login_input" className={(focus[0] ? style.label_up : null)}>Identifiant</label>
                    </div>
                    <div className={style.input_box}>
                        <input type="password" name="passwrd" value={passwrd} id="passwrd_input" className={style.input_style} 
                        onChange={(e) => inputChange(e, 1)} onFocus={() => inputFocus('focus', 1)} onBlur={() => inputFocus('reset', 1)} />
                        <label htmlFor="passwrd_input" className={(focus[1] ? style.label_up : null)}>Mot de passe</label>
                    </div>
                    <input type="submit" onClick={fetchLogin} className={style.submit_button} value="Connexion" />
                </form>
                <div className={style.auth_bottom}>
                    <span className={style.span_question}>Vous n'avez pas de compte ?</span>
                    <br />
                    <a className={style.btn_alternative} onClick={() => router.push('/auth/signup')}>Créer mon compte.</a>
                </div>
            </div>
        </div>
    )
}