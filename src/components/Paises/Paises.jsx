import { ContainerFlag, ContainerLista } from "../../utils/theme";
import { Box, Container, Grid, Link } from "@material-ui/core"
import { useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";

const Paises = () => {
    const [paises, setPaises] = useState();
    const [page, setPage] = useState(1);
    
    const carregaTodosPaises = async () => {
        const data = await fetch("https://restcountries.eu/rest/v2/all")
        .then(r=>r.json())
        .then(r=>r);

        const resultado = {
            total: data.length,
            pages: parseInt(data.length / 3),
            per_page: 3,
            page: 1,
            data
        }

        setPaises(resultado);
    }

    const handleClick = (e) => {
        const target = e.target.closest('[data-page]');
        if(!target) return;
        
        const {page} = target.dataset;

        setPage(page);
    };

    if(!paises) carregaTodosPaises();

    return (
        <Container>
            {paises ? <>
                <Grid component={ContainerLista} container justify="space-between">
                    {paises.data.map( (pais, index) => {
                        const limite = page * paises.per_page;
                        const comeco = limite - 3;

                        return index < limite && index >= comeco ? <Grid item key={index} >
                            <Box
                                component={ContainerFlag}
                                style={{backgroundImage: `url(${pais.flag})`}}
                                title={pais.name}
                            />
                        </Grid> : ""

                    })}
                </Grid>
                <Box justifyContent="center" display="flex">
                    <Pagination
                        count={paises.pages}
                        variant="outlined"
                        onClick={handleClick}
                        shape="rounded"
                        renderItem={(item)=> (
                            <PaginationItem
                                data-page={item.page}
                                component={Link}
                                {...item}
                            />
                        )}
                    />
                </Box>
            </> : "" }
        </Container>
    )
}

export default Paises;