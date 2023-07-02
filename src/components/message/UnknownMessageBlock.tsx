import {UnsupportedMessageComponent} from "../../logic/model/message/MessageBody";
import {Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

export interface UnknownMessageBlockProps {
    msg: UnsupportedMessageComponent;
}

export default function UnknownMessageBlock(props: UnknownMessageBlockProps) {
    const {t} = useTranslation();

    return (
        <>
            <Typography color={'info'}>{t('textUnsupportedMessage') + `#${props.msg.type}`}</Typography>
        </>
    );
}