import { NavBarButton } from "../../Components/nav-bar-button"
console.log(localStorage.getItem('access_token'))
export const PaginaInicial = () => {
    return (
        <> 
        <NavBarButton buttonName="teste" navigateTo="/home" />
        <p>Logado</p>
        </>
    )
}