import React from 'react';
import {Avatar, Button, FormControlLabel, FormGroup, Grid, Paper, Skeleton, Switch, Typography} from "@mui/material";
import {MobileDateTimePicker} from "@mui/x-date-pickers";
import {toMoment} from "../logic/model/UnixTimestamp";
import {getAvatarUrl} from "../logic/WebRequests";
import MessageLine from "./MessageLine";
import {BotListEntry} from "../logic/model/BotListResponse";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {MessageEntry} from "../logic/model/MessageListResponse";
import moment, { now } from 'moment';

export interface MessageLineProps {
    currentBot: BotListEntry | null | undefined;
    loading: boolean;
    messages: MessageEntry[];

    startTime: number;
    setStartTime: (x: number) => void;
    endTime: number;
    setEndTime: (x: number) => void;
    setCommittedStartTime: (x: number) => void;
    setCommittedEndTime: (x: number) => void;
    refreshTrigger: number;
    setRefreshTrigger: (x: number) => void;
    hideRetractedMessages: boolean;
    setHideRetractedMessages: (x: boolean) => void;

    queryMemberName: (x: number | string) => string;
}

export default function MessageLines(props: MessageLineProps) {
    const {
        currentBot,
        loading,
        messages,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        setCommittedStartTime,
        setCommittedEndTime,
        refreshTrigger,
        setRefreshTrigger,
        hideRetractedMessages,
        setHideRetractedMessages,
        queryMemberName
    } = props;
    const {t} = useTranslation();
    const navigate = useNavigate();

    if (currentBot == null) {
        return (<>
            <Typography>{t('textBotCacheMissing')}</Typography>
            <Button onClick={() => navigate('/')}>{t('textBackToAccountSelection')}</Button>
        </>);
    }

    return (<>
        <Grid container direction={'column'} spacing={1}>
            <Grid item>
                <Paper elevation={1} sx={{p: 2}}>
                    <Grid container spacing={1} alignItems={'center'}>
                        <Grid item>
                            <MobileDateTimePicker label={t('labelStartTime')} value={toMoment(startTime)}
                                                  onChange={value => {
                                                      if (value) {
                                                          const endTimeObj = toMoment(endTime);
                                                          if (value.isAfter(endTimeObj)) {
                                                              setEndTime(value.add(1, 'hour').unix());
                                                          }
                                                          setStartTime(value.unix());
                                                      }
                                                  }}
                                                  onClose={() => {
                                                      setCommittedStartTime(Math.floor(startTime));
                                                      setCommittedEndTime(Math.floor(endTime));
                                                  }}
                            />
                        </Grid>

                        <Grid item>
                            <MobileDateTimePicker label={t('labelEndTime')} value={toMoment(endTime)}
                                                  onChange={value => {
                                                      if (value) {
                                                          const startTimeObj = toMoment(startTime);
                                                          if (value.isBefore(startTimeObj)) {
                                                              setStartTime(value.subtract(1, 'hour').unix())
                                                          }
                                                          setEndTime(value.unix());
                                                      }
                                                  }}
                                                  onClose={() => {
                                                      setCommittedStartTime(Math.floor(startTime));
                                                      setCommittedEndTime(Math.floor(endTime));
                                                  }}
                            />
                        </Grid>

                        <Grid item>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant={'outlined'} disabled={loading} onClick={() => {
                                        setRefreshTrigger(refreshTrigger + 1);
                                    }}>
                                        {t('btnRefresh')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant={'outlined'} disabled={loading} onClick={() => {
                                        let endTimeObj = moment(now());

                                        setEndTime(endTimeObj.unix());
                                        setCommittedEndTime(endTimeObj.unix());
                                    }}>
                                        {t('btnRecent')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item>
                            <FormGroup>
                                <FormControlLabel control={<Switch checked={hideRetractedMessages} onChange={e => {
                                    setHideRetractedMessages(e.target.checked);
                                }}></Switch>} label={t('labelHideRetracted')}/>
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            {loading ?
                <Grid item>
                    <Paper elevation={1} sx={{p: 2}}>
                        <Grid container direction={'row'} spacing={1}>
                            <Grid item>
                                <Avatar/>
                            </Grid>
                            <Grid item xs>
                                <Grid container direction={'column'} alignContent={'stretch'}>
                                    <Grid item>
                                        <Typography><Skeleton/></Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography><Skeleton/></Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid> : messages.map((it, index) => hideRetractedMessages && it.recalled ? null :
                    <Grid item key={index}>
                        <Paper elevation={1} sx={{p: 2}}>
                            <Grid container direction={'row'} spacing={1}>
                                <Grid item>
                                    <Avatar alt={`Avatar of ${it.fromId}`} src={getAvatarUrl(it.fromId)}/>
                                </Grid>
                                <Grid item xs>
                                    <Grid container direction={'column'} alignContent={'stretch'}>
                                        <Grid item>
                                            <Grid container direction={'row'} justifyContent={'space-between'}>
                                                <Grid item>
                                                    <Typography>{queryMemberName(it.fromId)}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    {it.recalled ?
                                                        <Typography>{t('textRetractedMessage')}</Typography> : null}
                                                </Grid>
                                                <Grid item>
                                                    <Typography
                                                        color={'gray'}>{toMoment(it.time).format('YYYY-MM-DD HH:mm')}</Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <MessageLine msg={it} queryMemberName={queryMemberName}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
        </Grid>
    </>);
}