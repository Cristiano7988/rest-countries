import { AppBar, Box, Button, Container, Typography } from "@material-ui/core";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import logo from "../../img/logo.svg";
import { ContainerBar, OutlinedButton } from "../../utils/theme.js";

const Header = () =>
    <AppBar position="sticky" color="inherit">
        <Container component={ContainerBar}>

            <Box alignContent="center" display="flex">
                <img src={logo} alt="Logo Mova"/>
            </Box>

            <Box display="flex">
                <Button
                component={OutlinedButton}
                startIcon={<KeyboardReturnIcon />}
                children={<Typography children="Voltar" />}  
                />
            </Box>
        </Container>
    </AppBar>
;

export default Header;