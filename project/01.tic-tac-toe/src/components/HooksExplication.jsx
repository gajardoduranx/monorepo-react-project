import { useEffect, useState } from "react";

export function Components () {
    
    const [value, setValue] = useState(initialState)

    useEffect(() => {
        console.log('El codigo se ejecuta');
        // Cada vez que se renderiza
        // Si se le pasa un Array como dependencia se ejecutaria una vez
    })
}