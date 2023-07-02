import React, {useState} from 'react';
import {Route, Routes, useNavigate, useParams} from "react-router-dom";
import {
    AppBar, Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
    List,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {getAvatarUrl} from "../logic/WebRequests";
import {useTranslation} from "react-i18next";
import {GroupSelection} from "../components/GroupSelection";
import {FriendSelection} from "../components/FriendSelection";
import DashboardGroupViewFragment from "../fragments/DashboardGroupViewFragment";
import DashboardContactViewFragment from "../fragments/DashboardContactViewFragment";

export default function DashboardPage() {
    const {botId} = useParams();
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [title, setTitle] = useState(t('titleRecordSelection'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedContact, setSelectedContact] = useState('');

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawerWidth = '14rem';

    if (botId == null) {
        return <></>;
    }

    return (<>
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position={'fixed'} sx={{width: `calc(100% - ${drawerWidth})`, ml: drawerWidth}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant={'permanent'} anchor={'left'} sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {width: drawerWidth, boxSizing: 'border-box'}
            }}>
                <Toolbar>
                    <Grid container alignItems={'center'} spacing={1}>
                        <Grid item>
                            <Avatar alt={`Avatar of ${botId}`} src={getAvatarUrl(botId || '')}/>
                        </Grid>
                        <Grid item>
                            <Typography>{botId}</Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Divider/>
                <List>
                    <GroupSelection botId={botId} selectedGroup={selectedGroup} onGroupSelect={(group, name) => {
                        setSelectedGroup(group.toString());
                        setSelectedContact('');
                        setTitle(name);
                        navigate(`group/${group}`)
                    }}/>
                    <FriendSelection botId={botId} selectedContact={selectedContact} onFriendSelect={(friend, name) => {
                        setSelectedContact(friend.toString());
                        setSelectedGroup('');
                        setTitle(name);
                        navigate(`friend/${friend}`)
                    }}/>
                </List>
            </Drawer>
            <Box component={'main'} sx={{flexGrow: 1, p: 2}}>
                <Toolbar/>
                <Routes>
                    <Route index element={<Typography>{t('textSelectFromLeft')}</Typography>}/>
                    <Route path={'group/:groupId'} element={<DashboardGroupViewFragment botId={botId}/>}/>
                    <Route path={'friend/:friendId'} element={<DashboardContactViewFragment botId={botId}/>}/>
                </Routes>
            </Box>
        </Box>
    </>);
}
