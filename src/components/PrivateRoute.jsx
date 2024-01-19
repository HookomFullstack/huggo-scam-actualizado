export const PrivateRoute = ({ Element, isAuth }) => {
  if(!isAuth) window.location.pathname = '/'
  return (Element)
}
