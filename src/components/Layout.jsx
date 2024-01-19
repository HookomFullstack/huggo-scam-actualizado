import { NavbarUser } from "./dashboard/NavbarUser"

export const Layout = ({children}) => {
  return (
    <>
        <NavbarUser />
        {children} 
    </>
  )
}
