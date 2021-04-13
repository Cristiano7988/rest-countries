import styled from "styled-components";

const containerBar = {
    paddingTop: "19px",
    paddingBottom: "19px",
    display: "flex",
    justifyContent: "space-between",
}

const outlinedButton = {
    textTransform: "capitalize",
    alignSelf: "center",
    width: "134px",
    color: "#6D2080",
    border: "1px solid #6D2080",
    borderRadius: "unset"
}

const containerLista = {
    marginTop: "40px",
    marginBottom: "70px",
}

const containerFlag = {
    width: "316px",
    height: "181px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginTop: "10px",
    marginBottom: "10px",
}

const theme = {
    containerBar,
    outlinedButton,
    containerFlag,
    containerLista
}

export const ContainerBar = styled.div(props => props.theme.containerBar);
export const OutlinedButton = styled.button(props => props.theme.outlinedButton);
export const ContainerFlag = styled.div(props => props.theme.containerFlag);
export const ContainerLista = styled.div(props => props.theme.containerLista);

export default theme;