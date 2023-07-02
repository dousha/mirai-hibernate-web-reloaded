import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Dialog, DialogContent, DialogContentText, DialogTitle,
    Grid,
    List,
    Typography
} from "@mui/material";
import {useTranslation} from "react-i18next";
import {BotListEntry} from "../logic/model/BotListResponse";
import {fetchBotList} from "../logic/WebRequests";
import BotListItem from "../components/BotListItem";
import {useNavigate} from "react-router-dom";

export default function LandingPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState<BotListEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onDialogClosing = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        fetchBotList().then(response => {
            setAccounts(response);
            setLoading(false);
        }).catch(console.error).finally(() => {
            setLoading(false);
        });
    }, []);

    return (<>
        <Container>
            <Grid container direction={'column'} alignItems={'center'}>
                <Grid item xs sx={{marginTop: '1rem'}}>
                    <Card sx={{minWidth: '20rem'}}>
                        <CardHeader title={t('titleAccountSelection')}/>
                        <CardContent sx={{padding: loading || accounts.length > 0 ? 0 : null}}>
                            {
                                loading || accounts.length > 0 ?
                                    <List sx={{width: '100%'}}>
                                        {loading ? <BotListItem onClick={() => {
                                            }}/>
                                            : accounts.map((it, index) => <BotListItem onClick={(bot: BotListEntry) => {
                                                navigate(`/bot/${bot.bot}`);
                                            }} bot={it} key={index}/>)}
                                    </List>
                                    :
                                    <Grid container>
                                        <Grid item>
                                            <Typography>{t('textNoAccount')}</Typography>
                                        </Grid>
                                    </Grid>
                            }
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => setDialogOpen(true)}>{t('btnNoAccountListed')}</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
        <Dialog open={dialogOpen} onClose={onDialogClosing}>
            <DialogTitle>{t('btnNoAccountListed')}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {t('textNoAccountListed')}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </>);
}
