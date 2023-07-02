import React from 'react';
import {FileMessageComponent} from "../../logic/model/message/MessageBody";
import {
    Apps,
    AudioFile, Code, CoPresent,
    FilePresent,
    FolderZip,
    Image,
    TableView,
    TextSnippet,
    VideoFile,
    ViewInAr
} from "@mui/icons-material";
import {Button, Grid, Icon, Paper, Typography} from '@mui/material';
import prettyBytes from "pretty-bytes";
import {useTranslation} from "react-i18next";

export interface FileMessageBlockProps {
    msg: FileMessageComponent;
}

function determineIcon(extension: string, size: "inherit" | "large" | "small" | "medium" = 'medium') {
    let icon;
    switch (extension) {
        case 'mp3':
        case 'wav':
        case 'ape':
        case 'ogg':
            icon = <AudioFile fontSize={size}/>;
            break;
        case 'mp4':
        case '3gp':
        case 'mov':
        case 'flv':
        case 'webm':
        case 'm4a':
        case 'm4b':
        case 'gif': // technically not a "video" video, but it moves, so it's motion picture
            icon = <VideoFile fontSize={size}/>;
            break;
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'svg':
        case 'webp':
            icon = <Image fontSize={size}/>;
            break;
        case 'fbx':
        case 'obj':
        case 'stl':
        case 'mdl':
            icon = <ViewInAr fontSize={size}/>;
            break;
        case 'apk':
        case 'exe':
        case 'ipa':
        case 'dmg':
            icon = <Apps fontSize={size}/>;
            break;
        case 'zip':
        case 'rar':
        case '7z':
        case 'tar':
        case 'gz':
        case 'xz':
            icon = <FolderZip fontSize={size}/>;
            break;
        case 'doc':
        case 'docx':
        case 'odt':
        case 'pdf':
        case 'mobi':
        case 'txt':
        case 'md':
        case 'rst':
            icon = <TextSnippet fontSize={size}/>;
            break;
        case 'xls':
        case 'xlsx':
        case 'ods':
            icon = <TableView fontSize={size}/>;
            break;
        case 'ppt':
        case 'pptx':
        case 'odp':
            icon = <CoPresent fontSize={size}/>
            break;
        case 'html':
        case 'css':
        case 'js':
        case 'ts':
        case 'json':
        case 'xml':
        case 'c':
        case 'cpp':
        case 'cxx':
        case 'h':
        case 'hpp':
        case 'hxx':
        case 'pl':
        case 'py':
        case 'pyc':
        case 'm':
        case 'sh':
        case 'vb':
        case 'vbs':
        case 'ps1':
            icon = <Code fontSize={size}/>;
            break;
        default:
            icon = <FilePresent fontSize={size}/>;
            break;
    }

    return icon;
}

export default function FileMessageBlock(props: FileMessageBlockProps) {
    let extension = (props.msg.name.split('.').pop() || '').toLowerCase();
    let icon = determineIcon(extension, 'large');
    const {t} = useTranslation();

    return (<Paper variant={'outlined'} sx={{p: 1}}>
        <Grid container alignItems={'center'} spacing={1}>
            <Grid item>
                {icon}
            </Grid>
            <Grid item xs>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Typography>{props.msg.name}</Typography>
                        <Typography color={'gray'}>{prettyBytes(props.msg.size)}</Typography>
                    </Grid>
                    <Grid item>
                        <Button>{t('btnDownload')}</Button>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    </Paper>);
}