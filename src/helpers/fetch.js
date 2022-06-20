const { REACT_APP_APIURL } = process.env;
export const fetchConToken = ( endpoint, data, method = 'GET' ) => {
    
    const url = `${ REACT_APP_APIURL }${ endpoint }`; 
    const token = localStorage.getItem('token') || ''; 
    //por si regresa null que devuelva vacío
    if ( method === 'GET'){
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
            
        } );
    }

}