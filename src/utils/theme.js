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

const theme = {
    containerBar,
    outlinedButton,
}

export const ContainerBar = styled.div(props => props.theme.containerBar);
export const OutlinedButton = styled.button(props => props.theme.outlinedButton);

export default theme;