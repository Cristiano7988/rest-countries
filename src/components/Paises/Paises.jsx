import { ContainerFlag, ContainerLista, ContainerPagination, CustomButton, LabelText, GridSize } from "../../utils/theme";
import { Box, Button, Container, Grid, InputLabel, Link, MenuItem, TextField } from "@material-ui/core"
import { useState } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";

const estilo = {
    border: "unset",
    boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "2px"
}
const filtros = [
    {id: 0, propriedade: "region", recurso: "region", nome:"Região"},
    {id: 1, propriedade: "capital", recurso: "capital", nome:"Capital"},
    {id: 2, propriedade: "languages", recurso: "lang", nome:"Lingua"},
    {id: 3, propriedade: "name", recurso: "name", nome:"País"},
    {id: 4, propriedade: "callingCodes", recurso: "callingcode", nome:"Código de ligação"}
];


const Paises = () => {
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
        
        setPaises(data);
        setConteudo(resultado);
    }
    
    const [paises, setPaises] = useState(carregaTodosPaises);
    const [campos, setCampos] = useState({filtro: 3, especifico: 0});
    const [propriedades, setPropriedades] = useState();
    const [especificado, setEspecificado] = useState(false);
    const [conteudo, setConteudo] = useState(false);
    const {page, data, per_page, pages} = conteudo;
    
    
    const fetchData = async () => {
        const {propriedade, recurso} = propriedades;
        let iso = paises;

        if(recurso === "lang") {
            iso = iso.map(pais=>
                pais.languages.find(lang=> lang.name === propriedade)
            ).filter(Boolean);
        }
            
        const search = recurso === "lang" ? iso[0].iso639_1 : propriedade;
        
        const data = await
        fetch(`https://restcountries.eu/rest/v2/${recurso}/${search}`)
        .then(r=>r.json())
        .then(r=>r);
            
        setConteudo({
            ...conteudo,
            total: data.length,
            pages: parseInt(data.length / 3),
            page: 1,
            data
        });
    }
        
    const handleClick = (e) => {
        const target = e.target.closest('[data-page]');
        if(!target) return;
        
        let {page} = target.dataset;
        
        setConteudo({...conteudo, page});
    };
        
    const carregaEspecificacoes = (value) => {
        let {dados, propriedade} = defineEspecificacoes(filtros[value]);
        
        setEspecificado({ dados, propriedade })
        setPropriedades({
            propriedade: dados[0],
            recurso: filtros[value].recurso
        });
    };
        
    const defineEspecificacoes = (value) => {
        let {propriedade} = value;
        let dados =
            paises.map(pais => 
                value.id === 4
                    ? pais[propriedade].map(number=>number.replace(" ", ""))
                    : value.id !== 2
                        ? pais[propriedade]
                        : pais[propriedade].map(lang=>lang.name)
            );

        if(value.id === 2 || value.id === 4) dados = dados.join().split(',');

        dados = dados
            .filter((dado, i)=> dados.indexOf(dado) === i)
            .filter(Boolean)
            .sort();

        if(value.id === 4) dados = dados.map(n=>parseInt(n)).sort((a,b)=>a-b);

        return { dados, propriedade };
    }

    const definePropriedade = (value) => {
        setPropriedades({
            recurso: filtros[campos.filtro].recurso,
            propriedade: especificado.dados[value]
        });
    };
    
    const funcs = {
        filtro: carregaEspecificacoes,
        especifico: definePropriedade
    };

    const handle = async (e) => {
        const {value, name} = e.target;
        if(name === "filtro") setCampos({especifico: 0, [name]: value});
        else setCampos({...campos, [name]: value});
        funcs[name](value);
    }

    return (
        <Container>
            <Grid component={ContainerLista} container alignItems="flex-end" justify="space-between">
                <Grid item component={GridSize}>
                    <InputLabel component={LabelText} children="Filtra por" />
                    <TextField
                        id="standard-select-currency"
                        select
                        value={campos.filtro}
                        name="filtro"
                        onChange={handle}
                        fullWidth
                    >
                        {filtros.map( option =>
                            <MenuItem
                                key={option.id}
                                value={option.id}
                                children={option.nome}
                            />
                        )}
                    </TextField>
                </Grid>
                {especificado ?
                    <Grid item component={GridSize}>
                        <InputLabel component={LabelText} children={filtros[campos.filtro].nome} />
                        <TextField
                            id="standard-select-currency"
                            select
                            name="especifico"
                            value={campos.especifico}
                            onChange={handle}
                            fullWidth
                        >
                            {especificado.dados.map( (option, index) =>
                                <MenuItem
                                    key={index}
                                    value={index}
                                    children={option}
                                />
                            )}
                        </TextField>
                    </Grid>
                : ""}
                <Grid item component={GridSize}>
                    <Button component={CustomButton} onClick={fetchData}>Pesquisar</Button>
                </Grid>
            </Grid>
            {conteudo ? <>
                <Grid component={ContainerLista} container justify="space-between">
                    {data.map( (pais, index) => {
                        const limite = page * per_page;
                        const comeco = limite - 3;

                        return index < limite && index >= comeco ? <Grid item key={index} >
                            <Box
                                component={ContainerFlag}
                                style={{backgroundImage: `url(${pais.flag})`}}
                                title={pais.translations.pt}
                            />
                        </Grid> : ""

                    })}
                </Grid>
                    
                <Box component={ContainerPagination} justifyContent="center" display="flex">
                    <Pagination
                        count={pages}
                        variant="outlined"
                        onClick={handleClick}
                        shape="rounded"
                        renderItem={ item =>
                            <PaginationItem
                                style={item.selected
                                    ? { color: "#fff",
                                        backgroundColor: "rgba(109, 32, 128, 1)",
                                        ...estilo
                                    } : {color: "#8D8D8D", ...estilo}
                                }
                                data-page={item.page}
                                component={Link}
                                {...item}
                            />
                        }
                    />
                </Box>
            </> : "" }
        </Container>
    )
}

export default Paises;