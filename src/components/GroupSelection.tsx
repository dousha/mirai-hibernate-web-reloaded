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
import {fetchGroupList, getGroupAvatarUrl} from "../logic/WebRequests";
import {GroupListEntry} from "../logic/model/GroupListResponse";
import {ExpandLess, ExpandMore, Group} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

export interface GroupSelectionProps {
    botId: string | number;
    selectedGroup: string | number;

    onGroupSelect: (x: string | number) => void;
}

export function GroupSelection(props: GroupSelectionProps) {
    const botId = props.botId;
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<GroupListEntry[]>([]);

    useEffect(() => {
        if (botId == null) {
            return;
        }

        fetchGroupList(botId).then(result => {
            setGroups(result);
            setLoading(false);
        }).catch(console.error).finally(() => {
            setLoading(false);
        })
    }, [botId]);

    let groupEntries;
    if (loading) {
        groupEntries = (
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
        groupEntries = groups.map((it, index) => <ListItem key={index} disablePadding>
            <ListItemButton sx={{pl: 4}} onClick={() => props.onGroupSelect(it.group)}
                            selected={it.group.toString() === props.selectedGroup.toString()}>
                <ListItemAvatar>
                    <Avatar alt={`Avatar of ${it.name}`} src={getGroupAvatarUrl(it.group)}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={it.name} secondary={it.group}/>
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
                        <Group/>
                    </ListItemIcon>
                    <ListItemText primary={t('textGroups')}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout={'auto'} unmountOnExit>
                <List component={'div'} disablePadding>
                    {groupEntries}
                </List>
            </Collapse>
        </>
    );
}
