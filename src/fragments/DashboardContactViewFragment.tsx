import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchFriendMessage, getCachedBotList} from "../logic/WebRequests";
import {nowUnix} from "../logic/model/UnixTimestamp";
import {MessageEntry} from "../logic/model/MessageListResponse";
import MessageLines from "../components/MessageLines";
import moment, {now} from "moment";
import {Box} from "@mui/material";

export interface DashboardContactViewFragmentProps {
    botId: number | string;
}

export default function DashboardContactViewFragment(props: DashboardContactViewFragmentProps) {
    const {friendId} = useParams();
    const cachedBots = getCachedBotList();
    const currentBot = cachedBots.find(it => it.bot.toString() === props.botId.toString());

    const [startTime, setStartTime] = useState(moment(now()).startOf('day').unix());
    const [endTime, setEndTime] = useState(nowUnix());
    const [committedStartTime, setCommittedStartTime] = useState(startTime);
    const [committedEndTime, setCommittedEndTime] = useState(endTime);
    const [hideRetracted, setHideRetracted] = useState(false);

    const [messages, setMessages] = useState<MessageEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        if (currentBot == null || friendId == null) {
            return;
        }

        setLoading(true);
        fetchFriendMessage(currentBot.bot, friendId, committedStartTime, committedEndTime).then(xs => {
            setMessages(xs);
            setLoading(false);
        }).catch(console.error).finally(() => {
            setLoading(false);
        });
    }, [friendId, committedStartTime, committedEndTime, currentBot, refreshTrigger]);

    return (
        <Box sx={{height: '100%'}}>
            <MessageLines currentBot={currentBot} loading={loading} messages={messages}
                          hideRetractedMessages={hideRetracted} setHideRetractedMessages={setHideRetracted}
                          startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
                          setCommittedStartTime={setCommittedStartTime} setCommittedEndTime={setCommittedEndTime}
                          refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger}
                          queryMemberName={x => x.toString()}/>
        </Box>
    );
}