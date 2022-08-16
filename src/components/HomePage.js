//react
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

//material
import { Box, Container } from '@mui/system';
import { Alert, AlertTitle, Backdrop, Button, Chip, CircularProgress, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputAdornment, Link, Pagination, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Carousel from 'react-material-ui-carousel'
import axios from "axios"

//img
import HighRiskImg from "../assets/high.jpg"
import MediumRiskImg from "../assets/medium.jpg"
import LowRiskImg from "../assets/low.jpg"

const items = [
    {
        name: "1",
        img: "https://storage.top100token.com/images/b6612faf-7ab5-47a1-aba7-50466ee43023.gif",
        img1: "https://storage.top100token.com/images/4a5af9e3-6c2e-42eb-ae69-347403c15183.jpg",
        description: "1"
    },
    {
        name: "1",
        img: "https://storage.top100token.com/images/fe9c6953-ce29-49e9-9b15-2960bfe8b5e5.webp",
        img1: "https://storage.top100token.com/images/4a5af9e3-6c2e-42eb-ae69-347403c15183.jpg",
        description: "1"
    },
    {
        name: "1",
        img: "https://storage.top100token.com/images/fe9c6953-ce29-49e9-9b15-2960bfe8b5e5.webp",
        img1: "https://storage.top100token.com/images/b6612faf-7ab5-47a1-aba7-50466ee43023.gif",
        description: "1"
    },
]
export default function HomePage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ open: false, type: "success", text: "Alarm" })
    const [contract, setContract] = useState("0xff593cb838547700c565024c42ce9a2a24511b01")
    const [contractData, setContractData] = useState({})
    function Item(props) {
        return (
            <Stack direction="row" >
                <Box component="img" src={props.item.img}></Box>
                <Box component="img" src={props.item.img1}></Box>
            </Stack>
        )
    }

    const search = async () => {
        setLoading(true)
        try {
            const { data } = await axios.post('https://api.top100token.com/web3/erc20data', { address: contract, chainId: "binance" })
            const honeypot = await axios.post(`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=${contract}`)
            const dexData = await axios.post('https://api.dex.guru/v2/tokens', { ids: [`${contract}-bsc`] })
            console.log(dexData)
            // setContractData({ ...data._data, ...honeypot.data })
            setContractData({ ...data._data, ...honeypot.data, dexData: dexData.data.data[0] })
        } catch (e) {
            setContractData({})
            setMessage({ open: true, type: "error", text: "Contract is not correct." })
        }
        setLoading(false)
    }


    const view = async (address) => {
        setLoading(true)
        try {
            const { data } = await axios.post('https://api.top100token.com/web3/erc20data', { address: address, chainId: "binance" })
            const honeypot = await axios.post(`https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=bsc2&token=${address}`)
            const dexData = await axios.post('https://api.dex.guru/v2/tokens', { ids: [`${address}-bsc`] })
            console.log(dexData)
            // setContractData({ ...data._data, ...honeypot.data })
            setContractData({ ...data._data, ...honeypot.data, dexData: dexData.data.data[0] })
        } catch (e) {
            setContractData({})
            setMessage({ open: true, type: "error", text: "Contract is not correct." })
        }
        setLoading(false)
    }

    return (
        <Stack pt={5}>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Snackbar open={message.open} autoHideDuration={6000} onClose={() => setMessage({ ...message, open: false })}>
                <Alert onClose={() => setMessage({ ...message, open: false })} severity={message.type} sx={{ width: '100%' }}>
                    {message.text}
                </Alert>
            </Snackbar>
            <Container >
                <Stack justifyContent="center">

                    <Grid container justifyContent="center" pt={3}>
                        <Grid item md={12} sm={12} >
                            <Stack>
                                <Carousel>
                                    {
                                        items.map((item, i) => <Item key={i} item={item} />)
                                    }
                                </Carousel>
                            </Stack>
                            <Stack spacing={5}>

                                <Paper elevation={3}>
                                    <Stack p={5} spacing={3}>
                                        <Typography variant='h4' sx={{ fontWeight: 600 }}>Scan Token Contract</Typography>

                                        <TextField
                                            value={contract}
                                            onChange={(e) => setContract(e.target.value)}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <Button endIcon={<ZoomInIcon />} variant="contained" onClick={() => search()}>
                                                        Search
                                                    </Button>
                                                </InputAdornment>,
                                            }}
                                        />

                                    </Stack>
                                </Paper>

                                <Paper elevation={3}>
                                    <Stack p={5} spacing={3}>
                                        <Typography variant='h4' sx={{ fontWeight: 600 }}>Last Scans</Typography>
                                        <Stack direction="row" justifyContent="space-between" sx={{ background: "#d1d1d1", padding: "12px", borderRadius: "10px" }}>
                                            <Stack>
                                                <Typography variant='h5' sx={{ fontWeight: 600 }}>$PePe Coin ($PePe)</Typography>
                                                <Link href={`https://bscscan.com/address/0xff593cb838547700c565024c42ce9a2a24511b01`} target="_blank">
                                                    <Typography variant='h6' >0xff593c...24511b01</Typography>
                                                </Link>
                                                <Chip color="error" label="High Risk" />
                                            </Stack>
                                            <Stack justifyContent="flex-end">
                                                <Button variant='contained' onClick={() => view("0xff593cb838547700c565024c42ce9a2a24511b01")}>View</Button>
                                            </Stack>
                                        </Stack>

                                        <Stack direction="row" justifyContent="space-between" sx={{ background: "#d1d1d1", padding: "12px", borderRadius: "10px" }}>
                                            <Stack>
                                                <Typography variant='h5' sx={{ fontWeight: 600 }}>DontKYC (DKYC)</Typography>
                                                <Link href={`https://bscscan.com/address/0xdf5Fac537aa09e1eb0F3f8DD1d34CBdC42CA1076`} target="_blank">
                                                    <Typography variant='h6' >0xdf5Fac...C42CA1076</Typography>
                                                </Link>
                                                <Chip color="warning" label="Medium Risk" />

                                            </Stack>
                                            <Stack justifyContent="flex-end">
                                                <Button variant='contained' onClick={() => view("0xdf5Fac537aa09e1eb0F3f8DD1d34CBdC42CA1076")}>View</Button>
                                            </Stack>
                                        </Stack>

                                        <Stack direction="row" justifyContent="space-between" sx={{ background: "#d1d1d1", padding: "12px", borderRadius: "10px" }}>
                                            <Stack>
                                                <Typography variant='h5' sx={{ fontWeight: 600 }}>EOS Token (EOS)</Typography>
                                                <Link href={`https://bscscan.com/address/0x56b6fb708fc5732dec1afc8d8556423a2edccbd6`} target="_blank">
                                                    <Typography variant='h6' >0x56b6fb...2edccbd6</Typography>
                                                </Link>
                                                <Chip color="success" label="Low Risk" />
                                            </Stack>
                                            <Stack justifyContent="flex-end">
                                                <Button variant='contained' onClick={() => view("0x56b6fb708fc5732dec1afc8d8556423a2edccbd6")}>View</Button>
                                            </Stack>
                                        </Stack>


                                        <Stack direction="row" justifyContent="space-between" sx={{ background: "#d1d1d1", padding: "12px", borderRadius: "10px" }}>
                                            <Stack>
                                                <Typography variant='h5' sx={{ fontWeight: 600 }}>PancakeSwap Token (Cake)</Typography>
                                                <Link href={`https://bscscan.com/address/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82`} target="_blank">
                                                    <Typography variant='h6' >0x0e09f...e81ce82</Typography>
                                                </Link>
                                                <Chip color="success" label="Low Risk" />
                                            </Stack>
                                            <Stack justifyContent="flex-end">
                                                <Button variant='contained' onClick={() => view("0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82")}>View</Button>
                                            </Stack>
                                        </Stack>

                                    </Stack>
                                </Paper>

                                <Paper elevation={3}>
                                    <Stack p={5} spacing={3}>
                                        <Typography variant='h4' sx={{ fontWeight: 600 }}>Contract Information</Typography>
                                        {
                                            contractData.name ?
                                                <Stack spacing={3} >
                                                    <Stack >
                                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                            <Typography variant='h5' sx={{ fontWeight: 600 }}>{contractData?.name}</Typography>
                                                            <Typography variant='h5' sx={{ fontWeight: 600 }}>{contractData?.symbol}&nbsp;&nbsp;&nbsp;</Typography>
                                                        </Stack>

                                                        <Link href={`https://bscscan.com/address/${contract}`} target="_blank">
                                                            <Typography variant='h6' >{`${contract?.substr(0, 10)}...${contract?.substr(contract?.length - 10)}`}</Typography>
                                                        </Link>
                                                        <Stack pb={3}></Stack>
                                                        <Stack >
                                                            <Stack spacing={1}>
                                                                <Typography variant='h6'>
                                                                    This is just an indication. Please DYOR by clicking the detailed scans below and using your own judgement for the project as a whole.
                                                                </Typography>

                                                                <Stack alignItems="center" direction="row" justifyContent="center">
                                                                    <Box component="img" sx={{ height: "200px" }} src={Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ? LowRiskImg : Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                        MediumRiskImg
                                                                        :
                                                                        HighRiskImg
                                                                    }></Box>
                                                                </Stack>
                                                                <Box sx={{
                                                                    background: Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ? "green" : Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                        "orange"
                                                                        :
                                                                        "red", height: "50px", borderRadius: "10px"
                                                                }} alignItems="center" >
                                                                    <Typography textAlign="center" variant='h4' alignItems="center" >
                                                                        {
                                                                            Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                "LOW RISK"
                                                                                :
                                                                                Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                    "MEDIUM RISK"
                                                                                    :
                                                                                    "HIGH RISK"
                                                                        }

                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>
                                                    <Stack sx={{ boxShadow: "5px 4px 10px 1px #383838", borderRadius: "10px" }}>
                                                        <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} justifyContent="space-between">
                                                            <Typography variant='h6' >Total supply</Typography>
                                                            <Typography variant='h6'><strong>{contractData?.intTotalSupply}</strong></Typography>
                                                        </Stack>

                                                        <Stack direction="row" p={1} className="shade1" borderBottom="1px dashed grey" justifyContent="space-between">
                                                            <Typography variant='h6' >Network</Typography>
                                                            <Typography variant='h6'><strong>Binance Main Network</strong></Typography>
                                                        </Stack>

                                                        <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" justifyContent="space-between">
                                                            <Typography variant='h6' >Scanner Audit</Typography>
                                                            <Typography variant='h6' alignItems="center" display="flex"><strong>Proceed</strong>
                                                                {
                                                                    Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                        <CheckIcon sx={{
                                                                            color: Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ? "green" : Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                "orange"
                                                                                :
                                                                                "red"
                                                                        }} /> :
                                                                        Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                            <CheckIcon sx={{
                                                                                color: Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ? "green" : Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                    "orange"
                                                                                    :
                                                                                    "red"
                                                                            }} />
                                                                            :
                                                                            <WarningAmberIcon sx={{
                                                                                color: Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 && Number(contractData?.dexData?.liquidityETH) > 20 ? "green" : Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 || Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                    "orange"
                                                                                    :
                                                                                    "red"
                                                                            }} />
                                                                }

                                                            </Typography>
                                                        </Stack>

                                                        <Stack direction="row" p={1} className="shade1" borderBottom="1px dashed grey" justifyContent="space-between">
                                                            <Typography variant='h6' >Burned</Typography>
                                                            <Typography variant='h6'><strong>{contractData?.intBurned} ({(contractData?.intBurned * 100 / contractData?.intTotalSupply).toFixed(5)} % )</strong></Typography>
                                                        </Stack>

                                                        <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }} justifyContent="space-between">
                                                            <Typography variant='h6' >Circulating supply</Typography>
                                                            <Typography variant='h6'><strong>{contractData?.intTotalSupply - contractData?.intBurned}</strong></Typography>
                                                        </Stack>

                                                    </Stack>
                                                    <Stack>
                                                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Honeypot Check </Typography>
                                                        <Stack pt={3} spacing={1}>
                                                            <Typography variant='h6'>
                                                                This honeypot check simulates a buy/sell on PancakeSwap V2. Sufficient liquidity on PancakeSwap V2 with BNB trading pair is required, otherwise it may show a false positive.
                                                            </Typography>
                                                            <Stack sx={{ boxShadow: "5px 4px 10px 1px #383838", borderRadius: "10px" }}>
                                                                <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} justifyContent="space-between">
                                                                    <Typography variant='h6' >Honeypot Check</Typography>
                                                                    <Typography variant='h6' alignItems="center" display="flex" ><strong >Honeypot Check &nbsp;
                                                                        {Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 ?
                                                                            "Ok"
                                                                            :
                                                                            "Faild"
                                                                        }
                                                                    </strong>
                                                                        {Number(contractData?.BuyTax) === 0 && Number(contractData?.SellTax) === 0 ?
                                                                            <CheckIcon sx={{ color: "green" }}></CheckIcon>
                                                                            :
                                                                            <WarningAmberIcon sx={{ color: "red" }}></WarningAmberIcon>
                                                                        }
                                                                    </Typography>
                                                                </Stack>

                                                                <Stack direction="row" p={1} className="shade1" borderBottom="1px dashed grey" justifyContent="space-between">
                                                                    <Typography variant='h6' >Buy Tax </Typography>
                                                                    <Typography variant='h6'><strong>{Number(contractData?.BuyTax)} % buy tax</strong></Typography>
                                                                </Stack>

                                                                <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }} justifyContent="space-between">
                                                                    <Typography variant='h6' >Sell Tax</Typography>
                                                                    <Typography variant='h6'><strong>{Number(contractData?.SellTax)} % sell tax </strong></Typography>
                                                                </Stack>

                                                            </Stack>
                                                        </Stack>
                                                    </Stack>

                                                    <Stack>
                                                        <Typography variant='h5' sx={{ fontWeight: 600 }}>Liquidity Check </Typography>
                                                        <Stack pt={3} spacing={1}>
                                                            <Typography variant='h6'>
                                                                Checks for PancakeSwap V2 liquidity with BNB and BUSD trading pairs. This will show empty for presale tokens or if a different swap is used. If token has launched and has very low liquidity, please beware. Please check TokenSniffer for information about liquidity burn/lock to avoid rugs.
                                                            </Typography>
                                                            <Stack sx={{ boxShadow: "5px 4px 10px 1px #383838", borderRadius: "10px" }}>
                                                                <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} justifyContent="space-between">
                                                                    <Typography variant='h6' >Liquidity Check </Typography>
                                                                    <Typography variant='h6' alignItems="center" display="flex" ><strong>
                                                                        {
                                                                            Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                "Liquidity available"
                                                                                :
                                                                                "Low liquidity found"
                                                                        }
                                                                    </strong>
                                                                        {
                                                                            Number(contractData?.dexData?.liquidityETH) > 20 ?
                                                                                <CheckIcon sx={{ color: "green" }}></CheckIcon>
                                                                                :
                                                                                <WarningAmberIcon sx={{ color: "red" }}></WarningAmberIcon>
                                                                        }
                                                                    </Typography>
                                                                </Stack>

                                                                <Stack direction="row" p={1} className="shade1" borderBottom="1px dashed grey" justifyContent="space-between">
                                                                    <Typography variant='h6' >Message</Typography>
                                                                    <Typography variant='h6'>Please check for burned/locked liquidity to avoid rugs at
                                                                        <Link href={`https://tokensniffer.com/`} target="_blank">
                                                                            TokenSniffer
                                                                        </Link>
                                                                    </Typography>
                                                                </Stack>

                                                                <Stack direction="row" p={1} className="shade" borderBottom="1px dashed grey" sx={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }} justifyContent="space-between">
                                                                    <Typography variant='h6' >{contractData?.symbol} / BNB Pool </Typography>
                                                                    <Typography variant='h6'><strong>{contractData?.dexData?.liquidityETH?.toFixed(5)} BNB ($ {contractData?.dexData?.liquidityUSD})</strong></Typography>
                                                                </Stack>
                                                            </Stack>
                                                        </Stack>

                                                    </Stack>

                                                </Stack>

                                                :
                                                <Typography variant='h6'>No Data</Typography>
                                        }
                                    </Stack>
                                </Paper>
                            </Stack>

                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </Stack>
    );
}
