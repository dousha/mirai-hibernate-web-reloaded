import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchGroupMembers, fetchGroupMessage, getCachedBotList} from "../logic/WebRequests";
import {nowUnix} from "../logic/model/UnixTimestamp";
import {MessageEntry} from "../logic/model/MessageListResponse";
import MessageLines from "../components/MessageLines";
import moment, {now} from "moment/moment";
import {GroupMemberEntry} from "../logic/model/GroupMemberListResponse";
import {extractFriendId} from "../logic/model/FriendListResponse";
import {Box} from "@mui/material";

export interface DashboardGroupViewFragmentProps {
    botId: number | string;
}

export default function DashboardGroupViewFragment(props: DashboardGroupViewFragmentProps) {
    const {groupId} = useParams();
    const cachedBots = getCachedBotList();
    const currentBot = cachedBots.find(it => it.bot.toString() === props.botId.toString());

    const [startTime, setStartTime] = useState(moment(now()).startOf('day').unix());
    const [endTime, setEndTime] = useState(nowUnix());
    const [committedStartTime, setCommittedStartTime] = useState(startTime);
    const [committedEndTime, setCommittedEndTime] = useState(endTime);
    const [hideRetracted, setHideRetracted] = useState(false);

    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [members, setMembers] = useState<GroupMemberEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (currentBot == null || groupId == null) {
            return;
        }

        setLoading(true);
        let groupMessageFetcher = fetchGroupMessage(currentBot.bot, groupId, committedStartTime, committedEndTime);
        let groupMemberFetcher = fetchGroupMembers(groupId);

        Promise.all([groupMessageFetcher, groupMemberFetcher]).then(xs => {
            setMessages(xs[0]);
            setMembers(xs[1]);
            setLoading(false);
        }).catch(console.error).finally(() => {
            setLoading(false);
        });
    }, [groupId, committedStartTime, committedEndTime, currentBot, refreshTrigger]);

    return (
        <Box sx={{height: '100%'}}>
            <MessageLines currentBot={currentBot} loading={loading} messages={messages}
                          hideRetractedMessages={hideRetracted} setHideRetractedMessages={setHideRetracted}
                          startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
                          setCommittedStartTime={setCommittedStartTime} setCommittedEndTime={setCommittedEndTime}
                          refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger}
                          queryMemberName={x => {
                              let member = members.find(it => extractFriendId(it.uuid) === x.toString());
                              return member ? member.name : x.toString()
                          }}
            />
        </Box>
    );
}