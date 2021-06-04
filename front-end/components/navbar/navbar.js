import style from './navbar.module.scss'
import Link from 'next/link'

export default function navbar() {
    
    return (
        <div className={style.navbar}>
            <div className="width-sizing">

                <div className={style.auth_buttons}>
                    <Link href={{ pathname: "auth/[type]", query: { type: "signup" } }} as={`auth/signup`}>
                        <div className={style.auth_btn}>
                            <a>Créer un compte</a>
                        </div>
                    </Link>
                    <Link href={{ pathname: "auth/[type]", query: { type: "login" } }} as={`auth/login`}>
                        <div className={`${style.full_border} ${style.auth_btn}`}>
                            <a>Connexion</a>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}