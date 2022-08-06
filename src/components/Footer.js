import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/system';
import { IconButton, Link, Stack, Typography } from '@mui/material';
//img
import LogoImg from "../assets/logo.png"
import MailImg from "../assets/mail.png"
import TelegramImg from "../assets/telegram.png"
import TwitterImg from "../assets/twitter.png"
//img
import LogoImg1 from "../assets/dlogo.png"
import ScannerImg from "../assets/scanner.png"

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }} pt={10}>
            <AppBar position="static" className='header'>
                <Container>
                    <Stack alignItems="center" pt={5} >
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                            <Box component="img" sx={{ height: "100%" }} src={LogoImg1}></Box>
                            <Box component="img" sx={{ height: "100%" }} src={ScannerImg}></Box>
                        </Stack>
                        <Stack sx={{ textAlign: "center" }} pt={3}>
                            <Typography variant='h5' sx={{ fontWeight: 600 }}>Track the safety rating of a contract and avoid scams.</Typography>
                            <Typography variant='h6' sx={{ fontWeight: 600 }}>Disclaimer: This software is still in beta - This is just a tool to help you spot scams. There can be false positives and false negatives. Always DYOR before investing!
                                Scan Now
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" py={5} alignItems="center">
                        <Link href='https://cryptocatcher.io' target="_blank">
                            <Box component="img" src={LogoImg}>
                            </Box>
                        </Link>

                        <Stack direction="row" spacing={2}>

                            <Link href='https://twitter.com/cryptocatcherio ' target="_blank">
                                <IconButton>
                                    <Box component="img" src={TwitterImg} />
                                </IconButton>
                            </Link>
                            <Link href='mailto:support@cryptovoter.io ' target="_blank">
                                <IconButton>
                                    <Box component="img" src={MailImg} />
                                </IconButton>
                            </Link> 

                            <Link href='https://t.me/l2xdb ' target="_blank">
                                <IconButton>
                                    <Box component="img" src={TelegramImg} />
                                </IconButton>
                            </Link>

                        </Stack>
                    </Stack>


                </Container>
            </AppBar>
        </Box>
    );
}
