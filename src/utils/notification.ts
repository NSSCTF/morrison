import {ElNotification} from 'element-plus'

interface configType {
    title?: string;
    message: string;
    duration?: number;
    postion?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    offset?: number;
    isHtml?: boolean;
    type?: string;
    icon?: string;
    onClose?: () => void;
    onClick?: () => void;
}

export const closeAllNotify = () => {
    (ElNotification as any).closeAll();
}

const Notify = {
    success: (config: configType) => createNotification(Object.assign(config, {type: 'success'})),
    warning: (config: configType) => createNotification(Object.assign(config, {type: 'warning'})),
    info: (config: configType) => createNotification(Object.assign(config, {type: 'info'})),
    error: (config: configType) => createNotification(Object.assign(config, {type: 'error'})),
    new: (config: configType) => createNotification(config),
    closeAll: closeAllNotify 
}

const createNotification = (config: configType) => {
    let options: any = {
        title: config.title || "消息提醒",
        message: config.message,
        duration: config.duration || 4000,
        position: config.postion || "top-right",
        offset: config.offset || 0
    };

    if (config.isHtml) {
        options.dangerouslyUseHTMLString = true;
    }
    if (config.type) {
        options.type = config.type;
    }
    if (config.icon) {
        options.iconClass = config.icon;
    }
    if (config.onClose) {
        options.onClose = config.onClose;
    }
    if (config.onClick) {
        options.onClick = config.onClick;
    }
    ElNotification(options);
}

export default Notify;