import { ContainerFlag, ContainerLista } from "../../utils/theme";
import { Box, Container, Grid } from "@material-ui/core"
import { useState } from "react";

const Estados = () => {
    const [paises, setPaises] = useState();
    
    const carregaTodosPaises = async () => {
        const resultado = await fetch("https://restcountries.eu/rest/v2/all")
        .then(r=>r.json())
        .then(r=>r)
        
        setPaises(resultado);
    }

    if(!paises) carregaTodosPaises();

    return (
        <Container>
            <Grid component={ContainerLista} container justify="space-between">
                {paises ? paises.map( (pais, index) =>
                    <Grid item key={index} >
                        <Box
                            component={ContainerFlag}
                            style={{backgroundImage: `url(${pais.flag})`}}
                            title={pais.name}
                        />
                    </Grid>
                ) : ""}
            </Grid>

        </Container>
    )
}

export default Estados;