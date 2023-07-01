import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Skeleton
} from "@mui/material";
import {fetchFriendList, getAvatarUrl} from "../logic/WebRequests";
import {Contacts, ExpandLess, ExpandMore} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {extractFriendId, FriendListEntry} from "../logic/model/FriendListResponse";

export interface FriendSelectionProps {
    botId: string | number;
    selectedContact: string | number;

    onFriendSelect: (x: string | number) => void;
}

export function FriendSelection(props: FriendSelectionProps) {
    const botId = props.botId;
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState<FriendListEntry[]>([]);

    useEffect(() => {
        if (botId == null) {
            return;
        }

        fetchFriendList(botId).then(result => {
            setFriends(result);
            setLoading(false);
        }).catch(console.error).finally(() => {
            setLoading(false);
        })
    }, [botId]);

    let friendEntries;
    if (loading) {
        friendEntries = (
            <ListItem disablePadding>
                <ListItemAvatar>
                    <Avatar>
                        <Skeleton/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={<Skeleton/>}/>
            </ListItem>
        );
    } else {
        friendEntries = friends.map((it, index) => <ListItem key={index} disablePadding>
            <ListItemButton sx={{pl: 4}} onClick={() => props.onFriendSelect(extractFriendId(it.uuid))}
                            selected={extractFriendId(it).toString() === props.selectedContact.toString()}>
                <ListItemAvatar>
                    <Avatar alt={`Avatar of ${it.remark}`} src={getAvatarUrl(extractFriendId(it))}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={it.remark} secondary={extractFriendId(it)}/>
            </ListItemButton>
        </ListItem>)
    }

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={() => {
                    setOpen(!open);
                }}>
                    <ListItemIcon>
                        <Contacts/>
                    </ListItemIcon>
                    <ListItemText primary={t('textFriends')}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout={'auto'} unmountOnExit>
                <List component={'div'} disablePadding>
                    {friendEntries}
                </List>
            </Collapse>
        </>
    );
}
