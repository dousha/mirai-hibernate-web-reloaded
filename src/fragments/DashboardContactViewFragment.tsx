import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {fetchFriendMessage, getCachedBotList} from "../logic/WebRequests";
import {nowUnix} from "../logic/model/UnixTimestamp";
import {MessageEntry} from "../logic/model/MessageListResponse";
import MessageLines from "../components/MessageLines";

export interface DashboardContactViewFragmentProps {
    botId: number | string;
}

export default function DashboardContactViewFragment(props: DashboardContactViewFragmentProps) {
    const {friendId} = useParams();
    const cachedBots = getCachedBotList();
    const currentBot = cachedBots.find(it => it.bot.toString() === props.botId.toString());

    const [startTime, setStartTime] = useState(currentBot ? currentBot.init : 0);
    const [endTime, setEndTime] = useState(nowUnix());
    const [committedStartTime, setCommittedStartTime] = useState(currentBot ? currentBot.init : 0);
    const [committedEndTime, setCommittedEndTime] = useState(nowUnix());
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

    return <MessageLines currentBot={currentBot} loading={loading} messages={messages}
                         hideRetractedMessages={hideRetracted} setHideRetractedMessages={setHideRetracted}
                         startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}
                         setCommittedStartTime={setCommittedStartTime} setCommittedEndTime={setCommittedEndTime}
                         refreshTrigger={refreshTrigger} setRefreshTrigger={setRefreshTrigger}/>
}