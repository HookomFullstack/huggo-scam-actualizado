import React from "react";
import {Navbar, Divider, Image, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import logo from "../../assets/logoWhite.png";

export const NavbarUser = () => {
  return (
    <Navbar isBordered>
        <NavbarContent justify="start" >
            <NavbarBrand className="mr-4">
            <Image src={logo} width={100} />
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="center" className="hidden sm:flex sm:items-center sm:justify-center gap-3">
          <NavbarItem>
            <Link aria-current="page" color="secondary  " href="#">
                Dashboard
            </Link>
          </NavbarItem>

          <Divider className="h-[30px]" orientation="vertical" />
          
          <NavbarItem>
            <Link href="#" color="foreground">
                Gestor de scams
            </Link>
          </NavbarItem>
          
          <Divider className="h-[30px]" orientation="vertical" />

          <NavbarItem>
            <Link color="foreground" href="#">
                Paneles colaborativos
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem>
              <Button>Cerrar sesión</Button>
            </NavbarItem>
        </NavbarContent>
    </Navbar>
  );
}
