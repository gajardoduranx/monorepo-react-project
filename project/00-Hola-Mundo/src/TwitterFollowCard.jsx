import { useState } from "react";


// COMPONENTE - CON CIERTOS PROPS
export function TwitterFollowCard({name, formatUserName, initialFollowing, userName = 'unknown', children}) {
    const [isFollowing, setIsFollowing] = useState(initialFollowing)
    // URL de avatares - endpoint userName
    const imageSrc = `https://unavatar.io/${userName}`

    // Render condicional en txto y estilo (className)
    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button'

    // Manejador de evento click - modifica el estado de isFollowing
    const handleCLick = () => {
        setIsFollowing(!isFollowing)
    }

    // Elementos renderizables DEL COMPONENTE 
    return (
        <article className='tw-followCard'>

            <header className='tw-followCard-header'>
                <img
                    className='tw-followCard-avatar'
                    alt="Avatar de midudev" 
                    src={imageSrc} 
                />
                <div className='tw-followCard-info'>
                    <strong>{children || name}</strong>
                    <span className='tw-followCard-infoUserName'>
                        {formatUserName(userName)}
                    </span>
                </div>
            </header>

            <aside>
                <button 
                    className={buttonClassName}
                    onClick={handleCLick}
                >
                    {text}
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>

        </article>
    )
}