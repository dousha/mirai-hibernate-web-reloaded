import React from 'react';
import {BotListEntry} from "../logic/model/BotListResponse";
import {Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton} from "@mui/material";
import {getAvatarUrl} from "../logic/WebRequests";

export interface BotListItemProps {
    bot?: BotListEntry;
    onClick: (bot: BotListEntry) => void;
}

export default function BotListItem(props: BotListItemProps) {
    if (!props.bot) {
        // return a skeleton
        return (<ListItem sx={{padding: 0}}>
            <ListItemAvatar>
                <Avatar>
                    <Skeleton/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Skeleton/>
            </ListItemText>
        </ListItem>);
    } else {
        // return a real one
        return (<ListItem sx={{padding: 0}}>
            <ListItemButton onClick={() => {
                props.onClick(props.bot!);
            }}>
                <ListItemAvatar>
                    <Avatar alt={`Avatar of ${props.bot.bot}`} src={getAvatarUrl(props.bot.bot)}/>
                </ListItemAvatar>
                <ListItemText primary={props.bot.name} secondary={props.bot.bot}/>
            </ListItemButton>
        </ListItem>);
    }
}
