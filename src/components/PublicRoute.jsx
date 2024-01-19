export const PublicRoute = ({ Element, isAuth }) => {
  if(isAuth) window.location.pathname =  '/dashboard-huggo'
  return (Element)
}
