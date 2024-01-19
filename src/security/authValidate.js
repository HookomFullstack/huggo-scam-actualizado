export const authValidate = ({
    values,
    errorUser = 'El campo correo es requerido',
    errorPassword = 'El campo clave del correo es requerido'
}) => {

    let errors = {}
    
    if (values.username == false) {
        errors.username = errorUser
    }

    if (values.password == false) {
        errors.password = errorPassword
    }

    return errors

}