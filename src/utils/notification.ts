import {ElNotification} from 'element-plus'

export const closeAllNotify = () => {
    (ElNotification as any).closeAll();
}

const Notify = {
    success: (config: any) => createNotification(Object.assign(config, {type: 'success'})),
    warning: (config: any) => createNotification(Object.assign(config, {type: 'warning'})),
    info: (config: any) => createNotification(Object.assign(config, {type: 'info'})),
    error: (config: any) => createNotification(Object.assign(config, {type: 'error'})),
    new: (config: any) => createNotification(config),
    closeAll: closeAllNotify 
}

const createNotification = (config: any) => {
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